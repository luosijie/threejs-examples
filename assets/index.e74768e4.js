import{q as u,aB as A,aC as L,aa as P,aD as _,S as y,T as D,s as v,f as R,M as U,d as B,w as F,W as G,i as T}from"./three.module.bae226b2.js";import{O as z}from"./OrbitControls.ac425086.js";import{D as E,G as W}from"./DRACOLoader.1f2b5f62.js";import{_ as j,g as O,o as q,c as V}from"./index.3cdc4a8a.js";const H=`uniform sampler2D tBackground;\r
\r
varying vec2 vUv;\r
\r
void main()\r
{\r
    vec4 backgroundColor = texture2D(tBackground, vUv);\r
\r
    gl_FragColor = backgroundColor;\r
}\r
`,Y=`varying vec2 vUv;\r
\r
void main()\r
{\r
    vUv = uv;\r
\r
    vec3 newPosition = position;\r
    newPosition.z = 1.0;\r
    gl_Position = vec4(newPosition, 1.0);\r
}\r
`;function $(){const t=new u("#cfbfa7"),a=new u("#cfbfa7"),n=new u("#cbbda5"),s=new u("#ded5c8"),d=new Uint8Array([Math.round(s.r*255),Math.round(s.g*255),Math.round(s.b*255),1,Math.round(n.r*255),Math.round(n.g*255),Math.round(n.b*255),1,Math.round(t.r*255),Math.round(t.g*255),Math.round(t.b*255),1,Math.round(a.r*255),Math.round(a.g*255),Math.round(a.b*255),1]),o=new A(d,2,2,L);o.magFilter=P,o.needsUpdate=!0;const h={tBackground:{value:o}};return new _({wireframe:!1,transparent:!1,uniforms:h,vertexShader:Y,fragmentShader:H})}const I=`uniform sampler2D tShadow;\r
uniform vec3 uShadowColor;\r
uniform float uAlpha;\r
\r
varying vec2 vUv;\r
\r
void main()\r
{\r
    float shadowAlpha = 1.0 - texture2D(tShadow, vUv).r;\r
    shadowAlpha *= uAlpha;\r
\r
    gl_FragColor = vec4(uShadowColor, shadowAlpha);\r
}\r
`,J=`varying vec2 vUv;\r
\r
void main()\r
{\r
    vUv = uv;\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}\r
`;function K(){const t={tShadow:{value:null},uShadowColor:{value:null},uAlpha:{value:null}};return new _({wireframe:!1,transparent:!0,uniforms:t,vertexShader:J,fragmentShader:I})}const N={id:"canvas"},Q={__name:"index",setup(t){return O(()=>{const a=document.querySelector("#canvas"),n=new y,s=new D,d=s.load("resources/house-in-desert/textures/baked.jpg");d.flipY=!1,d.encoding=v;const o=s.load("resources/house-in-desert/textures/floor-shadow.jpg");o.flipY=!1,o.encoding=v;const h=new R(2,2,2,2),g=new $,l=new U(h,g);l.frustumCulled=!1,l.matrixAutoUpdate=!1,l.updateMatrix(),n.add(l);const p=new E;p.setDecoderPath("draco/");const f=new W;f.setDRACOLoader(p);const b=new B({map:d}),c=new K;c.depthWrite=!1,c.uniforms.uShadowColor.value=new u("#927044"),c.uniforms.tShadow.value=o,c.uniforms.uAlpha.value=.6,f.load("resources/house-in-desert/models/house.glb",w=>{const k=w.scene.children.find(m=>m.name==="baked");k.material=b;const C=w.scene.children.find(m=>m.name==="ground");C.material=c,n.add(w.scene)});const e={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,r.aspect=e.width/e.height,r.updateProjectionMatrix(),i.setSize(e.width,e.height),i.setPixelRatio(Math.min(window.devicePixelRatio,2))});const r=new F(45,e.width/e.height,.1,100);r.position.x=12,r.position.y=12,r.position.z=8,n.add(r);const M=new z(r,a);M.enableDamping=!0;const i=new G({canvas:a,antialias:!0});i.setSize(e.width,e.height),i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.outputEncoding=v;const S=new T,x=()=>{S.getElapsedTime(),M.update(),i.render(n,r),window.requestAnimationFrame(x)};x()}),(a,n)=>(q(),V("canvas",N))}},ae=j(Q,[["__scopeId","data-v-a2989d8e"]]);export{ae as default};
