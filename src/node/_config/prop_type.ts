export type NomalProp = PropType[keyof PropType]
export type Prop = NomalProp | CustomType[keyof CustomType]
export interface IProp extends PropType,CustomType {}
export type KeyProp = keyof PropType | keyof CustomType

export interface PropType {
  text:{
    type?: "text",
  } & BaseProp
  divider: {
    type: "divider"
  } & BaseProp
  bool: {
    type: "bool"
    value: boolean
  } & BaseProp
  slider: {
    type: "slider"
    value: number

    precision?: number
    step?: number
    max?: number
    min?: number
  } & BaseProp
  color: {
    type: "color"
    value: string
  } & BaseProp
  combo: {
    type: "combo"
    value: string | number | boolean

    options: {
      label: TextLang
      value: string | number | boolean
    }[]
  } & BaseProp
  textinput: {
    type: "textinput"
    value: string
  } & BaseProp
  file: {
    fileType ?: "video",
    type: "file"
  } & BaseProp
  directory: {
    mode : "fetchall" | "ondemand",
    type : "directory",
  } & BaseProp
}

export interface CustomType {
  /** 菜單 */
  menu: {
    type: "menu"
    value: number

    all?: TextLang | false
    options: {
      label: TextLang
      value: Prop[]
    }[]
  } & BaseProp

  /** 項目 */
  item: {
    type: "item"
    custom?: Partial<NomalProp>
    value?: boolean
    list: Prop[]
  } & BaseProp
  /** 提示 */
  tips: {
    type: "tips"
    list: TextLang[]
  } & BaseProp
}

export type TextLang = string | { [lang: string]: string }

type BaseProp = {
  id: string
  text: TextLang
  /** @link https://fontawesome.com/v5.15/icons */
  icon?: string
  ignore?: boolean
  condition?: string[] | string;
  fixed_order?: boolean;
}