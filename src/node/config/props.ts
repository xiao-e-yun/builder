import { Prop as PropTypes, PropType } from "../../props/types"
import { ConfigGenerallocalization } from "./types"

export default class Prop<T extends PropType> {
  constructor(
    id: string,
    type: T["type"],
    config: Config<T>,
    text: Record<string,string>,
    condition?: (curr:string)=>string,
  ) {

    this.hash = ""

    this.id = id
    this.type = type
    this.text = text
    this.config = config

    this.condition = condition

  }

  defined(store: Record<string,string>): string {
    //cache
    if(store[this.id]) return this.hash = store[this.id]

    let length = Object.keys(store).length

    const anum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const anum_len = 52 // anum.length as 52

    const list: string[] = []
    if (length < anum_len) return anum[length]
    while (length) {
      const i: number = length % anum_len
      list.unshift(anum[i])
      length = (length - i) / anum_len
    }
    return list.join("")
  }

  id: string
  hash: string
  type: string|undefined
  text: Record<string,string>
  config: Config<T>
  condition?: (curr:string)=>string

  instantiate(index:number,localization:ConfigGenerallocalization): [string,PropTypes<T>] {

    this.text

    const condition = this.condition && this.condition((index++).toString())
    
    return [
      this.hash
      ,{
        ...this.config,
        type: this.type,
        text: this.text,
        order: 0,
        condition: condition,
      }
    ]

  }

}

type Config<T extends PropType> = {
  text: undefined,
  order: undefined,
  condition: undefined,
} & PropTypes<T>