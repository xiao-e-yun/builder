export type Props = Prop<PropType>
export type PropType = Text|Divider|Bool|Slider|Color|Combo|Textinput|File|Directory

/** 純文字 */
export type Text = {
  text: string
  type?: "text"
}

/** 分割線 */
export type Divider = {
  type: "divider"
}

/** 勾選框 */
export type Bool = {
  type: "bool"
  value: boolean
}

/** 滑條 */
export type Slider = {
  type: "slider"
  value: number

  precision?: number
  step?: number
  max?: number
  min?: number
}

/** 顏色 */
export type Color = {
  type: "color"
  value: string
}

/** 選擇 */
export type Combo = {
  type: "combo"
  value: string | number | boolean

  options: {
    label: string
    value: string | number | boolean
  }[]
}

/** 文字輸入 */
export type Textinput = {
  type: "textinput"
  value: string
}

/** 檔案 */
export type File = {
  fileType ?: "video" | "image",
  value: string
  type: "file"
}

/** 資料夾 */
export type Directory = {
  mode : "fetchall" | "ondemand",
  type : "directory",
}

export type Prop<T> = T & {

  /** 描述 */
  text?: string
  /** 圖標 */
  icon?: string
  /** 索引 */
  order?: number
  /** 條件 */
  condition?: string

}