import { prop } from "./prop_type";
import fs from "fs/promises";

const state = {
  index: 0,
  used: {} as { [key: string]: string },
  langs: {} as { [lang: string]: { [ui_key: string]: string } },
}

export default async function (
  general: {
    supportsaudioprocessing: boolean;
    properties: {
      [key: string]: any;
    };
    localization: {
      [lang: string]: {
        [ui_key: string]: string
      }
    };
  },
  props: prop[],
) {
  const cache_file = (await read())
  const cache = cache_file.props
  console.groupCollapsed("設定屬性中")
  console.log(`繼承 ${cache.length} 個屬性`)

  const config = general.properties
  state.langs = general.localization


  for (const prop of props)
    insert(config, prop, cache)

  console.groupEnd()
  console.log(`創建 ${Object.keys(cache.index).length} 個屬性`)

  if (!Object.keys(general.localization).length) general.localization = undefined as any
  await fs.writeFile("project.cache.json", JSON.stringify(cache_file))
  return state.used
}



function insert(config: { [key: string]: any }, prop: prop, cache: { length: number; index: { [id: string]: string } }, $condition: string[] = []) {
  const condition = $condition.concat(prop.condition || [])
  if ("type" in prop && (prop.type === "menu" || prop.type === "item")) {
    console.groupCollapsed(`|${prop.id.split("/").at(-1)}|${prop.type}|`)
    switch (prop.type) {
      case "menu": {
        const options: { label: string; value: number }[] = []
        if (prop.all) options.push({ label: prop.all, value: -1 }) && console.debug(`|-允許 ALL`)

        let wait_list = []
        for (const index in prop.options) {
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
          type: "combo",
          text: prop.text,
          id: prop.id,
          value: prop.value,
          condition,
          options,
        }, cache)

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
          type: "bool",
          text: prop.text,
          id: prop.id,
          value: prop.value,
          condition,
        }, cache)

        done()
        break
      }
    }

    console.groupEnd()
  } else {

    const id = prop.id
    console.log(`|${id.split("/").at(-1)}|${"type" in prop ? prop.type : "text"}|`)
    const key: string = cache.index[id] || (cache.index[id] = string_index(cache.length++))
    state.used[id] = key


    const export_prop: any = prop
    export_prop.id = undefined
    export_prop.condition = condition.length === 0 ? undefined : condition.join("&&")



    //處理翻譯
    if ("text" in prop && typeof prop.text === "object") {
      const ui_key = "ui_" + key
      for (const lang in prop.text) {
        if (!state.langs[lang]) state.langs[lang] = {} as { [key: string]: string }
        state.langs[lang][ui_key] = prop.text[lang]
      }

      prop.text = ui_key
    }



    config[key] = {
      ...export_prop,
      order: state.index++,
    }

    return key
  }
}

function string_index(str: number): string
function string_index(str: string): number
function string_index(str: string | number): string | number {
  const anum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const anum_len = 52 // anum.length as 52

  if (typeof str === "string") {
    if (str.length == 1) return anum.indexOf(str);

    let num = 0
    let times = 0
    const list = str.split('').reverse()
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
    return list.join('')
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