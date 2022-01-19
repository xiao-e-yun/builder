export default interface General{
  /** 調整顏色 */
  adjustdwmcolor: boolean
  /**調整顏色模式*/
  adjustdwmcolormode: string
  /**崩潰*/
  anticrash: unknown
  /**應用程式規則*/
  apprules: unknown
  /**音頻輸入裝置*/
  audioinputdevice: string
  /**音頻輸入門檻值*/
  audioinputthreshold: number
  /**音頻輸入音量*/
  audioinputvolume: number
  /**自動啟動*/
  autostart: false
  /**休眠後安全啟動*/
  autostartscheduler: false
  /**使用安全模式*/
  autostartx64: false
  /**反射效果*/
  bloom: boolean
  /**cef命令列*/
  cefcommandline: string
  /**cef開發工具埠*/
  cefdevtoolsport: number
  /**限制幀數*/
  fps: number
  /**圖形API*/
  graphicsapi: "dxgi"
  /**已顯示高優先權警告*/
  hasshownhighprioritywarning: true
  /**已顯示歡迎對話框*/
  hasshownwelcomedialog: true
  /**圖示不透明度*/
  iconopacity: 100
  /**↑↑↓↓←→←→BA*/
  konami: true
  /**語言*/
  language: "zh-cht"
  /**unknown*/
  location: { videoaudiooutput: boolean }
  /**日誌等級*/
  loglevel: "error"
  /**啟用日誌檔*/
  logtofileenabled: true
  /**顯示器檢測方式*/
  monitordetection: "devicepath"
  /**多重采樣*/
  msaa: false | "x2" | "x4" | "x8"
  /**覆蓋鎖定螢幕*/
  overridelockscreen: boolean
  /**覆蓋壁紙*/
  overridewallpaper: boolean
  /**暫停VRAM*/
  pausevram: boolean
  /**使用其他應用程式全螢幕時*/
  playbackfullscreen: "run" | "mute" | "pause" | "pauseall" | "stop"
  /**使用其他應用程式最大化時*/
  playbackmaximized: "run" | "mute" | "pause" | "pauseall" | "stop"
  /**使用其他應用程式小窗口時*/
  playbackfocus: "run" | "mute" | "pause" | "pauseall" | "stop"
  /**使用電池時*/
  playbackonbattery: "run" | "mute" | "pause" | "stop"
  /**使用其他應用程式播放音頻時*/
  playbackaudio: "run" | "pause" | "stop"
  /**螢幕休眠時*/
  playbacksleep: "run" | "pause" | "stop"
  /**插件延遲*/
  plugindelay: number
  /**插件*/
  plugins: { [plugin: string]: unknown }
  /**後處理*/
  postprocessing: "enabled" | "normal" | "ultra"
  /**預設畫質*/
  preset: "belownormal" | "medium" | "high" | "ultra"
  /**執行優先權*/
  processpriority: "belownormal" | "normal" 
  /**反射效果*/
  reflection: boolean
  /**重新載入音頻*/
  reloadaudio: boolean
  /**解析度*/
  resolution: "full" | "auto" | "half"
  /**安全模式*/
  safemode: boolean
  /**停止幻燈片?*/
  slideshowkiller: boolean
  /**軟體命令行*/
  uicmd: string
  /**UI效果*/
  uieffects: boolean
  /**UI硬體加速*/
  uihardwareacceleration: boolean
  /**UI品質*/
  uiquality: "low" | "medium" | "high"
  /**UI皮膚*/
  uiskin: string
  /**UI季節性皮膚*/
  uiskinseasonal: boolean
  /**啟用Aero*/
  unpauseaero: boolean
  /**使用者顯示器*/
  usermonitors: unknown
  /**音頻輸出*/
  videoaudiooutput: boolean
  /**視頻硬體加速*/
  videohardwareacceleration: boolean
  /**視頻重複播放*/
  videoloopmode: "default" | "syncclock" | "synctopo"
  /**視頻讀取模式*/
  videoreadmode: "fromdisk" | "frommemory"
  /**WebM框架*/
  webmframework: "native" | "chromium"
  /**Windows 7模式 */
  windows7mode: string
  /**視窗更新率*/
  windowupdaterate: number
}