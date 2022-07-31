import { ConfigContentrating, ConfigGeneral, ConfigTags, ConfigType, ConfigVisibility } from "./types"

export default class ConfigBuilder {
  constructor() {
    this.inner = {
      title: "",
      description: "",
      preview: "",
      tags: [],
      type: "Web",
      contentrating: "Everyone",
      visibility: "hidden",
      workshopurl: "", //unknown
      workshopid: "", //unknown
      general: {
        properties: {},
        localization: {},
        supportsaudioprocessing: false
      }
    }
    this.types = {}
  }



  /** 音訊處理 */
  public audio = false
  
  //build
  private inner: Config
  private types: Types
  /** 打包所有檔案  
   * @returns-project` project.json 檔案
   * @returns-types` 型別支持檔案 
  */
  build(): {
    project: string
    types: string
  } {

    this.inner.general.supportsaudioprocessing = this.audio

    //from object to json
    return {
      project: JSON.stringify(this.inner),
      types: JSON.stringify(this.types)
    }
  }
}

export interface Config {
  /** 名稱 */
  title: string
  /** 描述 */
  description: string
  /** 縮圖 */
  preview: string
  /** 標籤 */
  tags: ConfigTags[]
  /** 類型 */
  type: ConfigType & "Web"
  /** 分級 */
  contentrating: ConfigContentrating
  /** 能見度 */
  visibility: ConfigVisibility
  /** 工作坊連結 */
  workshopurl : string
  /** 工作坊ID */
  workshopid : string
  /** 基礎設定 */
  general: ConfigGeneral
}

export interface Types {


}