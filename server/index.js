var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/server/index.ts
__export(exports, {
  default: () => server_default
});

// src/server/config_builder/index.ts
var import_promises2 = __toModule(require("fs/promises"));

// src/server/config_builder/prop.ts
var import_promises = __toModule(require("fs/promises"));
var state = {
  index: 0,
  used: {},
  langs: {}
};
async function prop_default(general, props) {
  const cache_file = await read();
  const cache = cache_file.props;
  console.groupCollapsed("\u8A2D\u5B9A\u5C6C\u6027\u4E2D");
  console.log(`\u7E7C\u627F ${cache.length} \u500B\u5C6C\u6027`);
  const config = general.properties;
  state.langs = general.localization;
  for (const prop of props)
    insert(config, prop, cache);
  console.groupEnd();
  console.log(`\u5275\u5EFA ${Object.keys(cache.index).length} \u500B\u5C6C\u6027`);
  if (!Object.keys(general.localization).length)
    general.localization = void 0;
  await import_promises.default.writeFile("project.cache.json", JSON.stringify(cache_file));
  return state.used;
}
function insert(config, prop, cache, $condition = []) {
  const condition = $condition.concat(prop.condition || []);
  if ("type" in prop && (prop.type === "menu" || prop.type === "item")) {
    console.groupCollapsed(`|${prop.id.split("/").at(-1)}|${prop.type}|`);
    switch (prop.type) {
      case "menu": {
        const options = [];
        if (prop.all)
          options.push({ label: prop.all, value: -1 }) && console.debug(`|-\u5141\u8A31 ALL`);
        let wait_list = [];
        for (const index in prop.options) {
          const option = prop.options[index];
          options.push({
            label: option.label,
            value: parseInt(index)
          });
          wait_list.push(() => {
            const base_cond = `${id}.value===${index}`;
            const cond = prop.all ? `(${id}.value===-1||${base_cond})` : base_cond;
            condition.push(cond);
            for (const $prop of option.value) {
              $prop.id = `${prop.id}/${$prop.id}`;
              insert(config, $prop, cache, condition);
            }
          });
        }
        const id = insert(config, {
          type: "combo",
          text: prop.text,
          id: prop.id,
          value: prop.value,
          condition,
          options
        }, cache);
        wait_list.forEach((f) => f());
        break;
      }
      case "item": {
        const done = () => {
          condition.push(`${id}.value`);
          for (const $prop of prop.list) {
            $prop.id = `${prop.id}/${$prop.id}`;
            insert(config, $prop, cache, condition);
          }
        };
        const id = insert(config, {
          type: "bool",
          text: prop.text,
          id: prop.id,
          value: prop.value,
          condition
        }, cache);
        done();
        break;
      }
    }
    console.groupEnd();
  } else {
    const id = prop.id;
    console.log(`|${id.split("/").at(-1)}|${"type" in prop ? prop.type : "text"}|`);
    const key = cache.index[id] || (cache.index[id] = string_index(cache.length++));
    state.used[id] = key;
    const export_prop = prop;
    export_prop.id = void 0;
    export_prop.condition = condition.length === 0 ? void 0 : condition.join("&&");
    if ("text" in prop && typeof prop.text === "object") {
      const ui_key = "ui_" + key;
      for (const lang in prop.text) {
        if (!state.langs[lang])
          state.langs[lang] = {};
        state.langs[lang][ui_key] = prop.text[lang];
      }
      prop.text = ui_key;
    }
    config[key] = {
      ...export_prop,
      order: state.index++
    };
    return key;
  }
}
function string_index(str) {
  const anum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const anum_len = 52;
  if (typeof str === "string") {
    if (str.length == 1)
      return anum.indexOf(str);
    let num = 0;
    let times = 0;
    const list = str.split("").reverse();
    for (const i of list)
      num += anum.indexOf(i) * anum_len ** times++;
    return num;
  } else {
    const list = [];
    if (str === 0)
      return anum[str];
    while (str) {
      const i = str % anum_len;
      list.unshift(anum[i]);
      str = (str - i) / anum_len;
    }
    return list.join("");
  }
}
async function read() {
  const json = await import_promises.default.readFile("project.cache.json", "utf8").catch(() => false);
  const def = { props: { length: 0, index: {} } };
  if (json === false)
    return def;
  try {
    const obj = JSON.parse(json);
    if ("length" in obj.props && "index" in obj.props)
      return obj;
    return { ...obj, ...def };
  } catch (e) {
    return def;
  }
}

// src/server/config_builder/index.ts
var config_builder_default = {
  builder
};
var root_prop = [
  "contentrating",
  "description",
  "visibility",
  "preview",
  "builder",
  "title",
  "file",
  "tags"
];
async function builder(config, property = [], path) {
  const $config = {
    tags: [],
    title: "NewProject",
    description: "hello world",
    type: "Web",
    audio: false,
    file: "index.html",
    visibility: "public",
    contentrating: "Everyone",
    ...config
  };
  const json = {
    config: {
      general: {
        properties: {},
        localization: {}
      }
    },
    str: ""
  };
  console.groupCollapsed("\u521D\u59CB\u5316\u914D\u7F6E\u6A94\u6848");
  Object.keys($config).forEach((key) => {
    const value = $config[key];
    if (root_prop.indexOf(key) !== -1)
      return json.config[key] = value;
    if (key === "audio")
      return json.config.general.supportsaudioprocessing = value;
  });
  const props_mapping = await prop_default(json.config.general, property);
  console.log("\u6DFB\u52A0\u81EA\u8A02\u5C6C\u6027");
  json.config._builder = {
    name: "wallpaperEngineBuilder",
    author: "xiao-e-yun",
    mapping: props_mapping
  };
  console.log("\u7DE8\u8B6F\u6210\u529F");
  console.groupEnd();
  json.str = JSON.stringify(json.config);
  if (path)
    await import_promises2.default.writeFile(path, json.str);
  return json.str;
}

// src/server/index.ts
var server_default = { config: config_builder_default };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
