/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*glsl' {
  const content: string
  export default content
}

declare module 'three/addons/libs/stats.module.js'