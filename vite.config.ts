import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import * as path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
    base: '/threejs-example/',
    server: {
        port: 8080
    },
    build: {
        outDir: 'docs'
    },
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
            include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
        })
    ]
})
