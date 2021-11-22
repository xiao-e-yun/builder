import fs from "fs/promises";

import { config } from "./config";
import { prop } from "./prop_type";
import load_prop from "./prop";

export default {
  builder,
}

const root_prop = [
  "contentrating",
  "description",
  "visibility",
  "preview",
  "builder",
  "title",
  "file",
  "tags",
]

/**
 * @name 建立配置文件
 * @param config 配置文件 
 * @param path 保存位置
 * @returns 返回配置文件
 */
async function builder(config: config, property: prop[] = [], path?: string): Promise<string> {
  const $config: config = {
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
    config: {
      general: {
        properties: {},
        localization: {}
      }
    } as {
      general: {
        supportsaudioprocessing: boolean
        properties: { [key: string]: any }
        localization: { [lang: string]: { [ui_key: string]: string } }
      }, [key: string]: any
    },
    str: ""
  }

  console.groupCollapsed("初始化配置檔案")
  Object.keys($config).forEach(key => {
    const value = $config[key as keyof config]
    if (root_prop.indexOf(key) !== -1)
      return json.config[key] = value
    if (key === "audio")
      return json.config.general.supportsaudioprocessing = value as boolean
  })

  const props_mapping = await load_prop(json.config.general, property)

  console.log("添加自訂屬性")
  json.config._builder = {
    name: "wallpaperEngineBuilder",
    author: "xiao-e-yun",
    mapping: props_mapping,
  }

  console.log("編譯成功")
  console.groupEnd()
  json.str = JSON.stringify(json.config)
  if (path) await fs.writeFile(path, json.str)
  return json.str
}