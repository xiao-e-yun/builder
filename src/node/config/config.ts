export default interface OutputConfig extends BaseConfig {
  tags?:string[]|unknown[]
  type?:string
  visibility?:string
  contentrating?:string
  workshopurl ?: string
  general:{
    properties: {
      [prop: string]: {[key:string]:any}
    }
    localization: {
      [lang: string]: {
        [ui_key:string]:string
      }
    }
    supportsaudioprocessing?: boolean
  }
}

export interface Config extends BaseConfig {
  /** 標籤 */
  tags?: Tags[]
  /** 類型 */
  type?: "Video" | "Web" | "Application" | "Scene"
  /** 分級 */
  contentrating?: "Everyone" | "Questionable" | "Mature"
  /** 可見性 */
  visibility?: "public" | "friends" | "hidden" | "unlisted"
}

export interface BaseConfig {
  /** 標題 */
  title?: string
  /** 縮圖 */
  preview?: string
  /** 描述 */
  description?: string
  /** 檔案 */
  file?: string
  /** 監聽音效 */
  audio?: boolean
  /** Workshop ID */
  workshopid?:string
}

export type Tags =
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