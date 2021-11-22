export type nomal_prop = prop_type[keyof prop_type]
export type prop = nomal_prop | custom_type[keyof custom_type]

export interface prop_type {
  text: {
    text: text_lang
    icon?: string
    id: string
    condition?: string[]
  }
  divider: {
    type: "divider"
    id: string
    condition?: string[]
  }
  bool: {
    type: "bool"
    id: string
    text: text_lang
    icon?: string
    value: boolean
    condition?: string[]
  }
  slider: {
    type: "slider"
    id: string
    text: text_lang
    icon?: string
    value: number
    condition?: string[]

    precision: number
    step: number
    max: number
    min: number
  }
  color: {
    type: "color"
    id: string
    text: text_lang
    icon?: string
    value: string
    condition?: string[]
  }
  combo: {
    type: "combo"
    id: string
    text: text_lang
    icon?: string
    value: string | number | boolean
    condition?: string[]

    options: {
      label: string
      value: string | number | boolean
    }[]
  }
  textinput: {
    type: "textinput"
    id: string
    text: text_lang
    icon?: string
    value: string
    condition?: string[]
  }
  file: {
    type: "file"
    id: string
    text: text_lang
    icon?: string
    condition?: string[]
  }
}

export interface custom_type {
  menu: {
    type: "menu"
    id: string
    text: text_lang
    icon?: string
    value: number
    condition?: string[]
    all?: string | false
    options: {
      label: string
      value: prop[]
    }[]

  }

  item: {
    type: "item"
    id: string
    text: text_lang
    icon?: string
    value: boolean
    condition?: string[]
    list: prop[]
  }
}

type text_lang = string | { [lang: string]: string }