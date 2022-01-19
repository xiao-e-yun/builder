import fs from "fs/promises"

import OutputConfig, { Config } from "./config"
import { Prop } from "./prop_type"
import load_prop from "./prop"

export default {
  builder,
}

type Options = {
  /** 修改配置檔案 */
  custom?: OutputConfig;
  /** 配置檔案位置 */
  out_config?: string;
  /** 型別檔案位置 */
  out_types?: string;
};

/**
 * @name 建立配置文件
 * @param config 配置基礎
 * @param property 屬性樹
 * @param options 選項
 * @returns 返回配置文件
 */
async function builder(
  config: Config,
  property: Prop[] = [],
  options?: Options
) {
  config = {
    // 默認配置
    tags: [],
    title: "NewProject",
    description: "hello world",
    type: "Web",
    audio: false,
    file: "index.html",
    visibility: "public",
    contentrating: "Everyone",
    ...config, // 合併配置
  }

  console.groupCollapsed("初始化配置檔案")

  const json = {
    // 定義輸出的配置檔案
    ...config,
    general: {
      properties: {},
      localization: {},
      supportsaudioprocessing: false,
    },
  } as OutputConfig

  if ("audio" in config)
    // 如果有音頻
    (json.general.supportsaudioprocessing = config.audio), delete config.audio // 將音頻設置為支持音頻，並刪除音頻
  if ("workshopid" in config)
    // 如果有工作坊ID
    json.workshopurl = "steam://url/CommunityFilePage/" + config.workshopid // 將workshopid設置為workshopurl

  const types = await load_prop(json.general, property) // 將屬性樹帶入函式

  console.log("添加自訂屬性")
  const output = options?.custom ? mergeDeep(json, options?.custom) : json // 配置

  console.log("編譯成功") // 編譯成功
  console.groupEnd() // 結束

  if (options?.out_types)
    // 如果有輸出型別檔案
    await fs.writeFile(options?.out_types, JSON.stringify(types)) // 將型別檔案寫入

  if (options?.out_config)
    // 如果有輸出配置檔案
    await fs.writeFile(options?.out_config, JSON.stringify(output)) // 將配置檔案寫入

  return {
    config: output, // 配置
    types, // 型別
  }
}

//
function mergeDeep<T>(target: T, ...sources: Partial<T>[]): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isObject = (item:any): item is object => item && typeof item === "object" && !Array.isArray(item) // 判斷是否為物件

  if (!sources.length) return target // 如果沒有資料
  const source = sources.shift() // 取得第一個資料

  if (isObject(target) && isObject(source)) // 如果是物件
    for (const key in source) // 遍歷資料
    if (isObject(source[key])) { // 如果是物件
      if (!target[key]) Object.assign(target, { [key]: {} }) // 如果沒有資料
      mergeDeep(target[key], source[key] as T[keyof T]) // 物件合併
    } else Object.assign(target, { [key]: source[key] }) // 普通合併

  return mergeDeep(target, ...sources) // 遞迴
}
