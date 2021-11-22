var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
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
var import_process = __toModule(require("process"));
var import_esbuild = __toModule(require("esbuild"));
var import_child_process = __toModule(require("child_process"));
var import_path = __toModule(require("path"));
var import_promises = __toModule(require("fs/promises"));
const pkg = require((0, import_path.resolve)("./package.json"));
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {})
];
(async () => {
  const mode = import_process.argv[2] || "build";
  if (mode !== "build" && mode !== "dev")
    return console.error("\u6A21\u5F0F\u9700\u8981\u662F build | dev");
  const dev = mode === "dev";
  console.log(`\u6A21\u5F0F: ${mode}`);
  const wait = [];
  wait.push(import_esbuild.default.build({
    entryPoints: ["src/browser/index.ts"],
    allowOverwrite: true,
    platform: "browser",
    outdir: "browser",
    bundle: true,
    minify: !dev,
    watch: dev
  }));
  wait.push(import_esbuild.default.build({
    entryPoints: ["src/server/index.ts"],
    allowOverwrite: true,
    platform: "node",
    outdir: "server",
    bundle: true,
    minify: !dev,
    watch: dev,
    external
  }));
  if (!dev)
    await import_promises.default.rm("tsconfig.tsbuildinfo").catch(console.warn);
  wait.push(new Promise((done) => (0, import_child_process.exec)(`tsc ${dev ? "-w" : ""}`, done)));
  await Promise.all(wait);
  import_promises.default.rm("build.d.ts");
})();
