# wallpaper-engine-builder
run `npm install ; npm run tools_build ; npm run build`  

then write in project.ts
  
    import builder from './builder/node';
    builder.config.builder({
      title: 'WallpaperName',
      audio: true,
      type: "Web",
      contentrating: "Everyone",
      visibility: "friends",
      description: 'HelloWorld',
      preview: "preview.jpg",
      tags: ["Relaxing"],
      workshopid: "IF_YOU_HAVE_INPUT_THIS",
    },[ 
    
        { //example Prop
          id: "style",
          type: 'combo',
          icon: "fa-desktop",
          value: "",
          text: {
            "zh-cht": "桌布風格",
            "zh-chs": "桌布风格",
            "en-us": "Desktop Style",
          },
        },
        
    ],{
      out_config: "wallpaper/project.json",
      out_types: "types.json"
    })
    
then write in src/index.ts

    import builder from '../builder/browser'
    import types_json from "../types.json"
    builder(window, types_json, {
      props(key, val) {
        //Props
      },
      general(props) {
        //Settings
      },
    })
