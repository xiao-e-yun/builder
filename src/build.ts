import { argv } from 'process'
import esbuild from 'esbuild'
import { exec } from 'child_process'
import { resolve } from 'path';
import fs from "fs/promises";

const pkg = require(resolve("./package.json"));
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
];

(async ()=>{


  const mode = argv[2]||"build"
  if(mode!=="build"&&mode!=="dev") return console.error("模式需要是 build | dev")
  const dev = mode==="dev"
  console.log(`模式: ${mode}`)

  const wait:Promise<any>[] = []

  wait.push(
    esbuild.build({
      entryPoints: ['src/browser/index.ts'],
      allowOverwrite: true,
      platform: 'browser',
      outdir: 'browser',
      bundle: true,
      minify: !dev,
      watch:dev,
      
    })
  )

  wait.push(
    esbuild.build({
      entryPoints: ['src/server/index.ts'],
      allowOverwrite: true,
      platform: 'node',
      outdir: 'server',
      bundle: true,
      minify: !dev,
      watch:dev,
      external
    })
  )

  if(!dev) await fs.rm("tsconfig.tsbuildinfo").catch(console.warn)
  wait.push(new Promise((done)=>exec(`tsc ${dev?"-w":""}`,done)));
  await Promise.all(wait)
  fs.rm("build.d.ts")
})()