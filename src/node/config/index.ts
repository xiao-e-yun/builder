import fs from "fs/promises";

import OutputConfig, { Config } from "./config";
import { Prop } from "./prop_type";
import load_prop from "./prop";

export default {
  builder,
}

const root_prop = [
  "contentrating",
  "description",
  "visibility",
  "workshopid",
  "preview",
  "builder",
  "title",
  "file",
  "tags",
]

type Options = {
  custom?: OutputConfig,
  out_config?: string,
  out_types?: string,
}

/**
 * @name 建立配置文件
 * @param config 配置文件 
 * @param path 保存位置
 * @returns 返回配置文件
 */
async function builder(config: Config, property: Prop[] = [], options?: Options) {
  const $config: Config = {
    tags: [],
    title: "NewProject",
    description: "hello world",
    type: "Web",
    audio: false,
    file: "index.html",
    visibility: "public",
    contentrating: "Everyone",
    ...config
  };

  const json = {
    general: {
      properties: {},
      localization: {}
    }
  } as OutputConfig

  console.groupCollapsed("初始化配置檔案")
  Object.keys($config).forEach(key => {
    type KeyConfig = keyof Config
    const value = $config[key as KeyConfig]
    if (root_prop.indexOf(key) !== -1) json[key as KeyConfig] = value as any
    if (key === "audio") json.general.supportsaudioprocessing = value as boolean
    if (key === "workshopid") json.workshopurl = "steam://url/CommunityFilePage/" + value
  })

  const types = await load_prop(json.general as any, property)
  const res = {
    config: options?.custom ? mergeDeep(json, options?.custom) : json,
    types,
  }

  console.log("添加自訂屬性")
  if (options?.out_types) await fs.writeFile(options?.out_types, JSON.stringify(res.types))


  console.log("編譯成功")
  console.groupEnd()
  if (options?.out_config) await fs.writeFile(options?.out_config, JSON.stringify(res.config))

  return res
}





function isObject(item:any):item is object {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep<T>(target:T, ...sources:Partial<T>[]):T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key] as any);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}