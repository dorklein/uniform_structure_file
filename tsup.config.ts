import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: {
    entry: 'src/types.d.ts',
    resolve: true,
  },
})