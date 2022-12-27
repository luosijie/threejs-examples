var p=Object.defineProperty;var g=(s,e,r)=>e in s?p(s,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[e]=r;var t=(s,e,r)=>(g(s,typeof e!="symbol"?e+"":e,r),r);import{g as w,a as _,L as y}from"./index.b74e7d57.js";import{aB as h,aC as c,M as d,aD as f,B as x,N as z,ac as S,Q as b,ah as M,S as C,b as V,w as N,W as P}from"./three.module.aa667966.js";import{O as B}from"./OrbitControls.179b081c.js";import{_ as L,g as T,c as U,o as k,p as A,b as G,a as o}from"./index.ca067ba1.js";import"./DRACOLoader.2af43901.js";const R=`\r
varying vec2 vUV;\r
varying vec3 vNormal;\r
\r
void main() {\r
    vUV = uv;\r
    vNormal = normalize(normalMatrix * normal);\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}\r
`,W=`uniform sampler2D uTexture; \r
varying vec2 vUV;\r
varying vec3 vNormal;\r
\r
void main() {\r
    float intensity = 1.05 - dot(vNormal, vec3(.0, .0, 1.0));\r
    vec3 atmosphere = vec3(.3, .6, 1.0) * pow(intensity, 2.0) ;\r
\r
    vec3 color = texture2D(uTexture, vUV).xyz;\r
    color += atmosphere;\r
    gl_FragColor = vec4(color, 1.0);\r
}\r
`;class j{constructor(e){t(this,"mesh");this.mesh=this.setMesh(e)}setMesh(e){const r=new h(5,50,50),n=new c({vertexShader:R,fragmentShader:W,uniforms:{uTexture:{value:e}}});return new d(r,n)}}const D=`\r
varying vec2 vUV;\r
varying vec3 vNormal;\r
\r
void main() {\r
    vUV = uv;\r
    vNormal = normal;\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}\r
`,E=`uniform sampler2D uTexture; \r
varying vec2 vUV;\r
varying vec3 vNormal;\r
\r
void main() {\r
    float intensity = 0.8 - dot(vNormal, vec3(.0, .0, 1.0));\r
    intensity = pow(intensity, 2.0);\r
\r
    gl_FragColor = vec4(.3, .6, 1.0, 1.0) * intensity;\r
}\r
`;class F{constructor(){t(this,"mesh");this.mesh=this.setMesh()}setMesh(){const e=new h(5,50,50),r=new c({vertexShader:D,fragmentShader:E,blending:f,side:x}),n=new d(e,r);return n.scale.set(1.1,1.1,1.1),n}}class I{constructor(){t(this,"points");this.points=this.setPoints()}setPoints(){const e=new z,r=new S,n=1e3,i=[];for(let a=0;a<n;a++){const l=(Math.random()-.5)*2e3,v=(Math.random()-.5)*2e3,u=-Math.random()*2e3;i.push(l,v,u)}return e.setAttribute("position",new b(i,3)),new M(e,r)}}class H{constructor(e){t(this,"config");t(this,"size");t(this,"mouse");t(this,"controls");t(this,"canvas");t(this,"renderer");t(this,"scene");t(this,"camera");t(this,"group");t(this,"globe");t(this,"atmosphere");t(this,"stars");this.config=e,this.size={width:window.innerWidth,height:window.innerHeight},this.mouse={x:0,y:0},this.canvas=e.canvas,this.renderer=this.setRenderer(),this.scene=new C,this.camera=this.setCamera(),this.controls=new B(this.camera,this.canvas),this.group=new V,this.globe=new j(e.resources.globe),this.atmosphere=new F,this.stars=new I,this.updateCamera(),this.init()}init(){this.scene.add(this.atmosphere.mesh),this.group.add(this.globe.mesh),this.scene.add(this.group),this.scene.add(this.stars.points),window.addEventListener("resize",()=>{this.updateSize()}),window.addEventListener("mousemove",e=>{this.mouse.x=e.clientX/this.size.width*2-1,this.mouse.y=e.clientY/this.size.height*2-1})}render(){this.globe.mesh.rotation.y+=.002,w.to(this.group.rotation,{y:this.mouse.x}),this.controls.update(),this.renderer.render(this.scene,this.camera)}setCamera(){const e=new N(70,this.size.width/this.size.height,.01,1e3);return e.position.z=15,e}updateCamera(){this.camera.aspect=this.size.width/this.size.height,this.camera.updateProjectionMatrix()}setRenderer(){const e=new P({antialias:!0,canvas:this.canvas,alpha:!0});return e.setSize(this.size.width,this.size.height),e.setAnimationLoop(this.render.bind(this)),e}updateSize(){this.size.width=window.innerWidth,this.size.height=window.innerHeight,this.updateCamera(),this.renderer.setSize(this.size.width,this.size.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}}const m=s=>(A("data-v-bfce5f71"),s=s(),G(),s),O={class:"container"},Q=m(()=>o("div",{class:"info"},[o("a",{href:"https://www.youtube.com/watch?v=vM8M4QloVL0",class:"",target:"_blank"}," Tutorial From Chris Courses ")],-1)),$=m(()=>o("canvas",{id:"canvas"},null,-1)),q=[Q,$],X={__name:"index",setup(s){const e=new _;return e.load([{name:"globe",type:y.Texture,path:"/resources/globe/globe.jpg"}]),T(()=>{const r=document.querySelector("#canvas");e.onLoadEnd(()=>{const n={canvas:r,resources:e.resources};new H(n)})}),(r,n)=>(k(),U("div",O,q))}},re=L(X,[["__scopeId","data-v-bfce5f71"]]);export{re as default};
