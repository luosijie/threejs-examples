var R=Object.defineProperty;var k=(c,t,i)=>t in c?R(c,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):c[t]=i;var f=(c,t,i)=>(k(c,typeof t!="symbol"?t+"":t,i),i);import{aJ as z,V as x,aD as E,aK as L,N as V,Q as _,ah as W,W as G,s as C,S as H,w as X,i as q}from"./three.module.bae226b2.js";import{O as D}from"./OrbitControls.ac425086.js";import{g as m,a as N,L as y}from"./index.7fa36608.js";import{_ as O,f as j,g as I,c as b,a as w,F as A,r as J,o as v,e as K,t as Q,p as Y,b as $}from"./index.a0c79707.js";import"./DRACOLoader.1f2b5f62.js";const s=new z,p=new x;class U{constructor(t){let i=t.geometry;if(!i.isBufferGeometry||i.attributes.position.itemSize!==3)throw new Error("THREE.MeshSurfaceSampler: Requires BufferGeometry triangle mesh.");i.index&&(console.warn("THREE.MeshSurfaceSampler: Converting geometry to non-indexed BufferGeometry."),i=i.toNonIndexed()),this.geometry=i,this.randomFunction=Math.random,this.positionAttribute=this.geometry.getAttribute("position"),this.colorAttribute=this.geometry.getAttribute("color"),this.weightAttribute=null,this.distribution=null}setWeightAttribute(t){return this.weightAttribute=t?this.geometry.getAttribute(t):null,this}build(){const t=this.positionAttribute,i=this.weightAttribute,n=new Float32Array(t.count/3);for(let o=0;o<t.count;o+=3){let e=1;i&&(e=i.getX(o)+i.getX(o+1)+i.getX(o+2)),s.a.fromBufferAttribute(t,o),s.b.fromBufferAttribute(t,o+1),s.c.fromBufferAttribute(t,o+2),e*=s.getArea(),n[o/3]=e}this.distribution=new Float32Array(t.count/3);let r=0;for(let o=0;o<n.length;o++)r+=n[o],this.distribution[o]=r;return this}setRandomGenerator(t){return this.randomFunction=t,this}sample(t,i,n){const r=this.distribution[this.distribution.length-1],o=this.binarySearch(this.randomFunction()*r);return this.sampleFace(o,t,i,n)}binarySearch(t){const i=this.distribution;let n=0,r=i.length-1,o=-1;for(;n<=r;){const e=Math.ceil((n+r)/2);if(e===0||i[e-1]<=t&&i[e]>t){o=e;break}else t<i[e]?r=e-1:n=e+1}return o}sampleFace(t,i,n,r){let o=this.randomFunction(),e=this.randomFunction();return o+e>1&&(o=1-o,e=1-e),s.a.fromBufferAttribute(this.positionAttribute,t*3),s.b.fromBufferAttribute(this.positionAttribute,t*3+1),s.c.fromBufferAttribute(this.positionAttribute,t*3+2),i.set(0,0,0).addScaledVector(s.a,o).addScaledVector(s.b,e).addScaledVector(s.c,1-(o+e)),n!==void 0&&s.getNormal(n),r!==void 0&&this.colorAttribute!==void 0&&(s.a.fromBufferAttribute(this.colorAttribute,t*3),s.b.fromBufferAttribute(this.colorAttribute,t*3+1),s.c.fromBufferAttribute(this.colorAttribute,t*3+2),p.set(0,0,0).addScaledVector(s.a,o).addScaledVector(s.b,e).addScaledVector(s.c,1-(o+e)),r.r=p.x,r.g=p.y,r.b=p.z),this}}const Z=`uniform float uTime;\r
uniform float uScale;\r
attribute vec3 aRandom;\r
varying vec3 vPosition;\r
\r
void main() {\r
    float time = uTime * 4.0;\r
    vPosition = position;\r
\r
    vPosition.x += sin(time * aRandom.x) * 0.01;\r
    vPosition.y += sin(time * aRandom.y) * 0.01;\r
    vPosition.z += sin(time * aRandom.z) * 0.01;\r
\r
    vPosition.x *= uScale;\r
    vPosition.y *= uScale;\r
    vPosition.z *= uScale;\r
\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);\r
    gl_PointSize = 8.0 / -gl_Position.z;\r
}\r
`,tt=`\r
\r
uniform float uScale;\r
varying vec3 vPosition;\r
\r
void main() {\r
    vec3 color = vec3(1.0);\r
\r
    float depth = vPosition.z * 0.5 + 0.5;\r
    float alpha = depth * uScale;\r
    gl_FragColor = vec4(color, alpha);\r
}\r
`;class P{constructor(t,i){f(this,"scene");f(this,"mesh");f(this,"material");this.scene=i,this.material=this.setMaterial(),this.mesh=this.setMesh(t)}setMaterial(){return new E({uniforms:{uTime:{value:0},uScale:{value:0}},transparent:!0,depthTest:!1,depthWrite:!1,blending:L,vertexShader:Z,fragmentShader:tt})}setMesh(t){const i=t.scene.children[0],n=new U(i);n.build();const r=2e4,o=[],e=[],l=new x;for(let u=0;u<r;u++)n.sample(l),o.push(l.x,l.y,l.z),e.push(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1);const a=new V;return a.setAttribute("position",new _(o,3)),a.setAttribute("aRandom",new _(e,3)),new W(a,this.material)}show(){this.scene.add(this.mesh),setTimeout(()=>{m.to(this.material.uniforms.uScale,{duration:.8,value:1,ease:"power3.out"})},800)}hide(){m.to(this.material.uniforms.uScale,{value:0,duration:.8,ease:"power3.out",onComplete:()=>{this.scene.remove(this.mesh)}})}}const M=c=>(Y("data-v-9094ad61"),c=c(),$(),c),et={class:"actions"},it=["onClick"],ot=M(()=>w("div",{class:"info"},[w("a",{href:"https://www.awwwards.com/academy/course/impress-everyone-with-a-3d-particle-scene-starting-from-bad-models",class:"",target:"_blank"},"Tutorial From Fabio Ottaviani")],-1)),nt=M(()=>w("canvas",{id:"canvas"},null,-1)),rt={__name:"index",setup(c){const t=new N;t.load([{name:"horse",type:y.GLTF,path:"/resources/sampler-particles/horse.glb"},{name:"skull",type:y.GLTF,path:"/resources/sampler-particles/skull.glb"}]);let i,n;const r=j({options:["horse","skull"],active:"horse"}),o=e=>{e!==r.active&&(r.active=e,e==="horse"?(i.show(),n.hide()):(i.hide(),n.show()))};return I(()=>{const e={width:window.innerWidth,height:window.innerHeight},l=document.querySelector("#canvas"),a=new G({canvas:l,antialias:!0,alpha:!0});a.setSize(e.width,e.height),a.setPixelRatio(Math.min(window.devicePixelRatio,2)),a.outputEncoding=C;const u=new H,d=new X(50,e.width/e.height,.1,100);d.position.z=5,d.position.y=1,t.onLoadEnd(()=>{i=new P(t.resources.horse,u),n=new P(t.resources.skull,u),i.show()}),window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,d.aspect=e.width/e.height,d.updateProjectionMatrix(),a.setSize(e.width,e.height),a.setPixelRatio(Math.min(window.devicePixelRatio,2))}),window.addEventListener("mousemove",h=>{const F=h.clientX,T=h.clientY;m.to(u.rotation,{y:m.utils.mapRange(0,window.innerWidth,.5,-.5,F),x:m.utils.mapRange(0,window.innerHeight,.5,-.5,T)})});const g=new D(d,l);g.enableDamping=!0,g.enabled=!1;const B=new q,S=()=>{const h=B.getElapsedTime();i&&(i.material.uniforms.uTime.value=h),n&&(n.material.uniforms.uTime.value=h),g.update(),a.render(u,d),window.requestAnimationFrame(S)};S()}),(e,l)=>(v(),b(A,null,[w("div",et,[(v(!0),b(A,null,J(r.options,a=>(v(),b("button",{onClick:u=>o(a),key:a,class:K({active:a===r.active})},Q(a),11,it))),128))]),ot,nt],64))}},ht=O(rt,[["__scopeId","data-v-9094ad61"]]);export{ht as default};
