import { build } from 'esbuild'
import { argv } from 'process'

const build_directory = 'dist'

async function main(args: string[]) {
  await build({
    entryPoints: ['src/index.ts'],
    outfile: `${build_directory}/index.js`,
    bundle: true,
    minify: args.slice(2)[0] !== 'test',
    platform: 'node',
  })
}

void main(argv)
