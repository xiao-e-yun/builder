import { argv } from 'process'
import esbuild from 'esbuild'
import { exec } from 'child_process'
import fs from "fs/promises";
import path from 'path';


(async () => {
  const pkg = JSON.parse(await fs.readFile("package.json", "utf8"));
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];


  const mode = argv[2] || "build"
  if (mode !== "build" && mode !== "dev") return console.error("模式需要是 build | dev")
  const dev = mode === "dev"
  console.log(`模式: ${mode}`)
  
  if(!dev){
    await fs.rm(path.resolve(__dirname,"browser"), { recursive: true })
    await fs.mkdir(path.resolve(__dirname,"node"), { recursive: true })
  }

  const wait: Promise<any>[] = []

  wait.push(
    esbuild.build({
      entryPoints: ['src/browser/index.ts'],
      allowOverwrite: true,
      platform: 'browser',
      outdir: 'browser',
      format: 'esm',
      bundle: true,
      minify: !dev,
      sourcemap: dev,
      watch: dev,
    })
  )

  wait.push(
    esbuild.build({
      entryPoints: ['src/node/index.ts'],
      allowOverwrite: true,
      platform: 'node',
      outdir: 'node',
      bundle: true,
      minify: !dev,
      sourcemap: dev,
      watch: dev,
      external
    })
  )

  if (!dev) await fs.rm("tsconfig.tsbuildinfo").catch(console.warn)
  wait.push(new Promise((done) => exec(`tsc ${dev ? "-w" : ""}`, done)));
  await Promise.all(wait)
  fs.rm("build.d.ts")
})()