import { CustomType, Prop, PropType, TextLang } from "./prop_type"
import fs from "fs/promises"
import OutputConfig from "./config"

type map_list = { [key: string]: string }
const state = {
  index: -1,
  used: {
    ignore: {} as map_list,
    mapping: {} as map_list,
    directory: {
      demand: {} as map_list,
      fetch: {} as map_list,
    }
  },
  langs: {} as { [lang: string]: { [ui_key: string]: string } },
  translate: {
    _: [] as string[],
    length: 0,
  },
}

export default async function (
  general: OutputConfig["general"],
  props: Prop[],
) {
  const cache_file = (await read())
  const cache = cache_file.props
  console.groupCollapsed("設定屬性中")
  console.log(`繼承 ${cache.length} 個屬性`)

  if(!general.localization) return //僅縮小TypeScript範圍
  const config = general.properties
  state.langs = general.localization


  for (const prop of props)
    insert(config, prop, cache)

  console.groupEnd()
  console.log(`創建 ${Object.keys(cache.index).length} 個屬性`)

  if (!Object.keys(general.localization).length) general.localization = undefined
  await fs.writeFile("project.cache.json", JSON.stringify(cache_file))

  return state.used
}



function insert(
    config: {[prop: string]: Record<string, unknown>},
    prop: Prop,
    cache: {
      length: number;
      index: { [id: string]: string }
    },
    $condition: (string|((key:string)=>string))[] = []
  ) {
  if(prop.type === undefined) prop.type = "text"
  const condition = $condition.concat(prop.condition || [])

  const custom = ["menu","item","tips"]
  const is_custom = (prop:Prop):prop is CustomType[keyof CustomType] => "type" in prop && custom.includes(prop.type as string)
  if (is_custom(prop)) {
    console.groupCollapsed(`|${prop.id.split("/").at(-1)}|${prop.type}|`)
    switch (prop.type)  {
      case "menu": {
        const options: { label: TextLang; value: string | number | boolean }[] = []



        if (prop.all) options.push({ label: prop.all, value: -1 }) && console.debug("|-允許 ALL")

        const wait_list = []
        for (const index in prop.options) {
          const condition = $condition.concat(prop.condition || [])
          const option = prop.options[index]
          options.push({
            label: option.label,
            value: parseInt(index)
          })

          wait_list.push(() => {
            const base_cond = `${id}.value===${index}`
            const cond = (prop.all ? `(${id}.value===-1||${base_cond})` : base_cond)
            condition.push(cond)
            for (const $prop of option.value) {
              $prop.id = `${prop.id}/${$prop.id}`
              insert(config, $prop, cache, condition)
            }
          })
        }

        const id = insert(config, {
          options,
          condition,
          id: prop.id,
          type: "combo",
          text: prop.text,
          icon: prop.icon,
          value: prop.value,
          ignore: prop.ignore,
          fixed_order: prop.fixed_order,
        } as PropType["combo"], cache)

        wait_list.forEach(f => f())
        break
      }
      case "item": {
        const done = () => {
          condition.push(`${id}.value`)
          for (const $prop of prop.list) {
            $prop.id = `${prop.id}/${$prop.id}`
            insert(config, $prop, cache, condition)
          }
        }


        const id = insert(config, {
          condition,
          id: prop.id,
          type: "bool",
          text: prop.text,
          value: prop.value,
          ignore: prop.ignore,
          ...prop.custom,
        } as Prop, cache)
        
        done()
        break
      }
      case "tips": {
        let list = prop.list
        list = list.map(text=>{
          if(typeof text === "string") text = {"en-us":text}
          const res:TextLang = {}
          for (const key in text) {
            const title = typeof prop.text === "string" ? prop.text : (key in prop.text ? prop.text[key] : prop.text["en-us"])
            res[key] = `<h2>${title}</h2>` + text[key]
          }
          return translate(res)
        })


        if(list.length===1){
          insert(config,{
            ignore:true,
            id: `${prop.id}`,
            text: list[0],
          },cache)
          break
        }

        const keys:string[] = []
        let frist = true
        list.forEach((text, index) => {
          keys.push(insert(config,{
            ignore:true,
            id: `${prop.id}/${index}`,
            type: "bool",
            value: frist,
            fixed_order: !frist,

            text: text,
          },cache,[(key)=>`${key}.value${frist?"===":"!=="}{{}}.value`]) as string)
          if(frist) frist = false
        })
        keys.forEach((key, index) =>
          config[key].condition = (config[key].condition as string).replace("{{}}", keys.at(--index) || "")
        )
        break
      }
    }

    console.groupEnd()
  } else {
    //設置名稱
    const id = prop.id
    console.log(`|${id.split("/").at(-1)}|${"type" in prop ? prop.type : "text"}|`)
    const key: string = cache.index[id] || (cache.index[id] = string_index(cache.length++))

    state.used[prop.ignore ? "ignore" : "mapping"][id] = key


    //轉義值
    if ("type" in prop) {
      switch (prop.type) {
        case "color": {
          prop.value = prop.value.split(" ").map(v => parseInt(v) / 255).join(" ")
          break
        }

        case "directory": {
          state.used.directory[prop.mode === "fetchall" ? "fetch" : "demand"][id] = key
          break
        }
      }
    }

    //combo 翻譯
    ("options" in prop) && prop.options.map(v => {
      v.label = translate(v.label)
      return v
    })

    const order = prop.fixed_order ? state.index : ++state.index
    const export_prop:Partial<Prop> = prop
    export_prop.id = undefined
    export_prop.ignore = undefined
    export_prop.fixed_order = undefined
    const export_condition:string[] = condition.map(val => typeof val === "string" ? val : val(key))

    export_prop.condition = condition.length === 0 ? undefined : export_condition.join("&&")


    if (prop.text) export_prop.text = translate(prop.text)

    config[key] = {
      ...export_prop,
      order,
    }

    return key
  }
}

//處理翻譯
function translate(text: TextLang): string {
  if (typeof text !== "object"){
    if (text.indexOf("ui_")===0) return text
    text = { "en-us": text }
  }

  let ui_key = ""
  const text_json = JSON.stringify(text)
  const index = state.translate._.indexOf(text_json)

  if (index !== -1) return "ui_" + string_index(index)
  else {
    state.translate._.push(text_json)
    ui_key = ("ui_" + string_index(state.translate.length++))
  }

  for (const lang in text) {
    if (!state.langs[lang]) state.langs[lang] = {} as { [key: string]: string }
    state.langs[lang][ui_key] = text[lang].replace(/ /yg, "&emsp;")
  }

  return ui_key
}

function string_index(str: number): string
function string_index(str: string): number
function string_index(str: string | number): string | number {
  const anum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const anum_len = 52 // anum.length as 52

  if (typeof str === "string") {
    if (str.length == 1) return anum.indexOf(str)

    let num = 0
    let times = 0
    const list = str.split("").reverse()
    for (const i of list) num += anum.indexOf(i) * (anum_len ** times++)
    return num
  } else {
    const list = []
    if (str === 0) return anum[str]
    while (str) {
      const i: number = str % anum_len
      list.unshift(anum[i])
      str = (str - i) / anum_len
    }
    return list.join("")
  }
}



async function read(): Promise<{ props: { length: number, index: { [id: string]: string } } }> {
  const json: string | false = await fs.readFile("project.cache.json", "utf8").catch(() => false)
  const def = { props: { length: 0, index: {} } }
  if (json === false) return def
  try {
    const obj = JSON.parse(json)
    if ("length" in obj.props && "index" in obj.props) return obj
    return { ...obj, ...def }
  } catch (e) {
    return def
  }
}