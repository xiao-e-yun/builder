import General from "./wallpaper"
import { NomalProp } from "../node/_config/prop_type"

export type Types = {
  ignore: {
    [key: string]: string;
  }
  mapping: {
    [key: string]: string;
  }
  directory: {
    demand: {
      [key: string]: string;
    },
    fetch: {
      [key: string]: string;
    },
  }
}

export type Prop<TypesJson extends Types> = TypesJson["mapping"]

type List = { [key: string]: string}

interface Mapping<T extends List, U extends List> extends Types {
  mapping: T,
  directory:{
    demand: List,
    fetch: U
  }
}

export default function <T extends List,U extends List>(
  win: Window,
  types_json: Mapping<T,U>,
  config: Config<T,U>,
) {
  const mapping = { ...types_json.mapping, ...types_json.ignore }
  const props_map = {} as { [key: string]: string }
  for (const prop in mapping) props_map[mapping[prop]] = prop

  type PropListener = {
    wallpaperRegisterAudioListener: (fn:(audio:number[]) => void) => void;
    wallpaperRequestRandomFileForProperty: (name: string, prop: string) => void;
    wallpaperPropertyListener: {
      setPaused?(paused: boolean): void
      applyUserProperties?(user: unknown): void
      applyGeneralProperties?(properties: General): void
      userDirectoryFilesAddedOrChanged?(name: string, files: string[]): void
      userDirectoryFilesRemoved?(name: string, files: string[]): void
    }
  }

  const listener: PropListener["wallpaperPropertyListener"]
    = (win as unknown as PropListener).wallpaperPropertyListener =
    {
      setPaused: config.paused,
      applyGeneralProperties: config.general
    }



  if (config.props) {
    const props = config.props
    listener.applyUserProperties = (items: Record<string,Extract<NomalProp,{value:string}>>) => {
      //Config基礎屬性
      for (const item in items) {
        const prop = items[item]
        if(prop === null) continue
        const val = prop.value

        const filter = {
          "color": () => val.split(" ").map((v) => parseFloat(v) * 255).join(","),
          "file": () => val && (typeof val === "string" && "file:///" + val) || "",
        }

        const type = prop.type as keyof typeof filter
        prop.value = type in filter ? filter[type]() : val

        if(item in props_map) props(props_map[item], prop.value, prop)
        else props("$"+item, prop.value, prop)
      }
    }
  }

  //監聽資料夾
  if (config.fetch && Object.keys(types_json.directory.fetch).length) {
    const send = (name:string)=>{ fetch(props_map[name], state[name].map((v)=>"file:///" + v)) }

    const mapping = types_json.directory.fetch
    const props_map = {} as { [key: string]: string }
    for (const prop in mapping) props_map[mapping[prop]] = prop


    const state = {} as { [name: string]: string[] }
    const fetch = config.fetch

    listener.userDirectoryFilesAddedOrChanged = (name, files) => {
      if(!state[name]) state[name] = files
      else for (const file of files) state[name].push(file)
      send(name)
    }
    listener.userDirectoryFilesRemoved = (name, files) => {
      for (const file of files)  state[name].splice(state[name].indexOf(file), 1)
      send(name)
    }

  }

  if(config.audio) (win as unknown as PropListener).wallpaperRegisterAudioListener(config.audio)
}


interface Config<T,U> {
  paused?(): void
  general?(name: General): void
  props?(name: keyof T, value: boolean | string | number, prop: NomalProp): void
  fetch?(name: keyof U, files: string[]): void
  audio?(audio: number[]): void
}