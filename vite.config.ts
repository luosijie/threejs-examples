import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import * as path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/

console.log('process-env', process.env)
export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/threejs-example/' : '',
    server: {
        port: 8080
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
