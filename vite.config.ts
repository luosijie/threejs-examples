import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import * as path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
// https://vitejs.dev/config/

const REPO = 'threejs-examples'

const root = path.resolve(__dirname, 'src')

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? `/${REPO}/` : '/',
    root,
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
        })
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                globe: resolve(root, 'globe', 'index.html'),
                jump: resolve(root, 'jump', 'index.html'),
                'sampler-particles': resolve(root, 'globe', 'index.html'),
                'carton-room': resolve(root, 'carton-room', 'index.html'),
                'house-in-desert': resolve(root, 'house-in-desert', 'index.html'),
                'china-map': resolve(root, 'china-map', 'index.html'),
                'mini-city': resolve(root, 'mini-city', 'index.html')
            }
        }
    }
})
