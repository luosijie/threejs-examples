import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import * as path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import glsl from 'vite-plugin-glsl'
import { readdirSync } from 'fs'

// https://vitejs.dev/config/

const root = path.resolve(__dirname, 'src')
const pagesRoot = path.resolve(__dirname, 'src/pages')

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '' : '/',
    root,
    publicDir: path.resolve(__dirname, 'public'),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', 'ts', '.vue', '.css', '.scss']
    },
    plugins: [
        vue(),
        vueJsx(),
        eslintPlugin({
            include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
            exclude: ['src/**/draco/*.js']
        }),
        glsl({ watch: true })
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                ...Object.fromEntries(readdirSync(pagesRoot).map(dir => {
                    return [
                        dir,
                        resolve(pagesRoot, dir, 'index.html')
                    ]
                }))
            }
        },
        outDir: path.resolve(__dirname, './dist')
    }
})
