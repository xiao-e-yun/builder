/**
 * 類型  
 * 枚舉所有可能的值，但是只可能是 "Web"
*/
export type ConfigType = "Video" | "Web" | "Application" | "Scene"

/** 可見性 */
export type ConfigVisibility = "public" | "friends" | "hidden" 

/** 分級 */
export type ConfigContentrating = "Everyone" | "Questionable" | "Mature"

/** 標籤 */
export type ConfigTags = (
  "Abstract" |
  "Animal" |
  "Anime" |
  "Cartoon" |
  "CGI" |
  "Cyberpunk" |
  "Fantasy" |
  "Game" |
  "Girls" |
  "Guys" |
  "Landscape" |
  "Medieval" |
  "Memes" |
  "MMD" |
  "Music" |
  "Nature" |
  "Pixel art" |
  "Relaxing" |
  "Retro" |
  "Sci-Fi" |
  "Sports" |
  "Technology" |
  "Television" |
  "Vehicle" |
  "Unspecified"
)[]

/** 基礎屬性 */
export interface ConfigGeneral {
    /** 屬性 */
    properties: ConfigGeneralProperties
    /** 語言 */
    localization: ConfigGenerallocalization
    /** 支持音訊處理 */
    supportsaudioprocessing?: boolean
}

/**
 * 屬性
 * @example
 * properties: {
 *   a: {
 *     "text": "ui_a",
 *     "type": "bool",
 *     "value": true,
 *   }
 * }
 */
export type ConfigGeneralProperties = {
  [prop: string]: Record<string,unknown>
}

/**
 * 國際化
 * @example
 * localization: {
 *   "zh-cht":{
 *     ui_a: "名稱"
 *   }
 *   "zh-chs":{
 *     ui_a: "名称"
 *   }
 *   "en-us":{
 *     ui_a: "Name"
 *   }
 * }
 */
export type ConfigGenerallocalization = Record<string,Record<string,string>>