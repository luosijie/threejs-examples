import{N as Pe,a9 as Le,av as Ee,aF as Ae,aw as Ie,aG as Re,p as ve,o as U,M as F,v as S,aH as j,aE as x,n as _e,R as ee,f as te,D as Ce,O as Te,a as oe,aI as ze,G as We,S as He,w as Oe,W as Ue,P as Fe}from"./three.module.bae226b2.js";import{O as je}from"./OrbitControls.ac425086.js";import{_ as Ve,o as Xe,c as De,p as Ye,b as $e,a as _}from"./index.3cdc4a8a.js";function C(e,t=!1){const r=e[0].index!==null,i=new Set(Object.keys(e[0].attributes)),f=new Set(Object.keys(e[0].morphAttributes)),u={},b={},M=e[0].morphTargetsRelative,p=new Pe;let c=0;for(let l=0;l<e.length;++l){const o=e[l];let s=0;if(r!==(o.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+l+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const a in o.attributes){if(!i.has(a))return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+l+'. All geometries must have compatible attributes; make sure "'+a+'" attribute exists among all geometries, or in none of them.'),null;u[a]===void 0&&(u[a]=[]),u[a].push(o.attributes[a]),s++}if(s!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+l+". Make sure all geometries have the same number of attributes."),null;if(M!==o.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+l+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const a in o.morphAttributes){if(!f.has(a))return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+l+".  .morphAttributes must be consistent throughout all geometries."),null;b[a]===void 0&&(b[a]=[]),b[a].push(o.morphAttributes[a])}if(t){let a;if(r)a=o.index.count;else if(o.attributes.position!==void 0)a=o.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+l+". The geometry must have either an index or a position attribute"),null;p.addGroup(c,a,l),c+=a}}if(r){let l=0;const o=[];for(let s=0;s<e.length;++s){const a=e[s].index;for(let h=0;h<a.count;++h)o.push(a.getX(h)+l);l+=e[s].attributes.position.count}p.setIndex(o)}for(const l in u){const o=re(u[l]);if(!o)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the "+l+" attribute."),null;p.setAttribute(l,o)}for(const l in b){const o=b[l][0].length;if(o===0)break;p.morphAttributes=p.morphAttributes||{},p.morphAttributes[l]=[];for(let s=0;s<o;++s){const a=[];for(let d=0;d<b[l].length;++d)a.push(b[l][d][s]);const h=re(a);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the "+l+" morphAttribute."),null;p.morphAttributes[l].push(h)}}return p}function re(e){let t,r,i,f=0;for(let M=0;M<e.length;++M){const p=e[M];if(p.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(t===void 0&&(t=p.array.constructor),t!==p.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(r===void 0&&(r=p.itemSize),r!==p.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=p.normalized),i!==p.normalized)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;f+=p.array.length}const u=new t(f);let b=0;for(let M=0;M<e.length;++M)u.set(e[M].array,b),b+=e[M].array.length;return new Le(u,r,i)}let n={makeShape:function(){let e;if(arguments.length){let t=arguments[0];e=new Ee,e.moveTo(t[0][0],t[0][1]);for(let r=1;r<t.length;r++)e.lineTo(t[r][0],t[r][1]);if(arguments.length>1)for(let r=1;r<arguments.length;r++){let i=arguments[r],f=new Ae;f.moveTo(i[0][0],i[0][1]);for(let u=1;u<i.length;u++)f.lineTo(i[u][0],i[u][1]);e.holes.push(f)}return e}else console.error("Something wrong!")},makeExtrudeGeometry:function(e,t){let r={steps:1,depth:t,bevelEnabled:!1},i=new Ie(e,r);return i.rotateX(-.5*Math.PI),i},makeShapeGeometry:function(e){let t=this.makeShape(e);return new Re(t)},makeMesh:function(e,t,r){let i,f;return e==="lambert"?i=new ve({color:r}):e==="phong"?i=new U({color:r}):console.error("unrecognized type!"),f=new F(t,i),f.castShadow=!0,f.receiveShadow=!0,f}};const V=function(e){let t=[2931378,4695808,14024704,556935,3648782,5066061,13532672,14721555,8895710],r=Math.floor(Math.random()*t.length);this.color=e||t[r],this.mesh=new S,this.wheels=[],this.startAngle=0;let i=this;M(),b(),u(),f();function f(){let c=a();c.position.set(8,3,-6),i.wheels.push(c),i.mesh.add(c);let l=a();l.position.set(8,3,6),i.wheels.push(l),i.mesh.add(l);let o=a();o.position.set(-8,3,6),i.wheels.push(o),i.mesh.add(o);let s=a();s.position.set(-8,3,-6),i.wheels.push(s),i.mesh.add(s);function a(){let h=new S,d=new j(3,3,3,32);d.rotateX(.5*Math.PI);let m=n.makeMesh("lambert",d,0);h.add(m);let g=n.makeMesh("lambert",d,14540253);g.castShadow=!1,g.scale.set(.8,.8,1.1),h.add(g);let w=new j(1,1,3.6,4);w.rotateX(.5*Math.PI);let B=n.makeMesh("lambert",w,10987431);return B.castShadow=!1,h.add(B),h}}function u(){let c=[],l=new x(2,2,2);[[12.5,7.1,6.1],[12.5,7.1,-6.1],[-14,7.1,6.1],[-14,7.1,-6.1]].forEach(function(m){let g=m[0],w=m[1],B=m[2],P=l.clone();P.translate(g,w,B),c.push(P)});let s=l.clone();s.scale(1,1.3,7.1),s.translate(12.1,3.3,0),c.push(s);let a=s.clone();a.translate(-26,0,0),c.push(a);const h=C(c);let d=n.makeMesh("phong",h,16777215);i.mesh.add(d)}function b(){let c=new S,l=new S,s=p([[-2,8],[4,8],[2.5,12],[-2,12]]);l.add(s);let h=p([[-9,8],[-3,8],[-3,12],[-7.5,12]]);l.add(h),l.position.z=7.1,c.add(l);let d=l.clone();d.position.z=-7.1,c.add(d);let m=new x(.1,5,12);m.rotateZ(.12*Math.PI),m.translate(4.2,10,0);let g=n.makeMesh("phong",m,0);c.add(g);let w=g.clone();w.rotation.z=-.24*Math.PI,w.position.x=-19,w.position.y=6,c.add(w),i.mesh.add(c)}function M(){let c=[[-13,2],[13,2],[13,8],[5,8],[3,13],[-8,13],[-10,8],[-13,8],[-13,2]],l=n.makeShape(c),o=n.makeExtrudeGeometry(l,14);o.translate(0,-7,0),o.rotateX(.5*Math.PI);let s=n.makeMesh("phong",o,i.color);i.mesh.add(s)}function p(c){let l=0,o=n.makeShape(c),s=n.makeExtrudeGeometry(o,.1);s.rotateX(.5*Math.PI);let a=n.makeMesh("phong",s,l);return a.castShadow=!1,a}};V.prototype={setPosition:function(e,t,r){this.mesh.position.set(e,t,r)},forward:function(e){e=e||1,this._moving(e,!0)},backward:function(e){e=e||1,this._moving(e,!1)},turnLeft:function(e,t){this._turn(e,!0,t)},turnRight:function(e,t){this._turn(e,!1,t)},_turn:function(e,t,r){if(t=t?1:-1,r){if(this.startAngle<e&&(this.mesh.rotation.y+=r,this.startAngle+=r,e-this.startAngle<r)){let i=this.mesh.rotation.y-this.startAngle;this.mesh.rotation.y=i+e,this.startAngle=0;return}}else this.mesh.rotation.y+=e*t},_moving:function(e,t){let r=this.mesh.rotation.y;t=t?1:-1;let i=e*Math.cos(r)*t,f=e*Math.sin(r)*t;this.mesh.position.x+=i,this.mesh.position.z-=f,this._rotateWheels(e)},_rotateWheels:function(e){this.wheels.forEach(function(t){t.rotation.z-=.1*e})}};let ae={window:function(){let e=document.createElement("canvas"),t=e.getContext("2d");e.width=32,e.height=32;let r={border:"#3c3443",top:"#9d94a7",bottom:"#796e8c"};t.fillStyle=r.border,t.fillRect(0,0,32,32),t.fillStyle=r.top,t.fillRect(2,2,13,13),t.fillStyle=r.top,t.fillRect(17,2,13,13),t.fillStyle=r.bottom,t.fillRect(2,17,13,13),t.fillStyle=r.bottom,t.fillRect(17,17,13,13);let i=new _e(e);return i.wrapS=ee,i.wrapT=ee,i.needsUpdate=!0,i}},qe=[[-110,-110],[-90,-110],[-70,-110],[-50,-110],[-30,-110],[-10,-110],[10,-110],[30,-110],[50,-110],[70,-110],[90,-110],[-110,110],[-110,90],[-110,70],[-110,50],[-110,30],[-110,10],[-110,-10],[-110,-30],[-110,-50],[-110,-70],[-110,-90],[110,110],[90,110],[70,110],[50,110],[30,110],[-30,110],[-50,110],[-70,110],[-90,110],[110,-110],[110,-90],[110,-70],[110,-50],[110,-30],[110,-10],[110,10],[110,30],[110,50],[110,70],[110,90]];let y;const Ne={name:"MiniCity",data(){return{camera:null,renderer:null,cars:[],width:"",height:"",config:{isMobile:!1,background:2631720}}},methods:{checkUserAgent(){let e=navigator.userAgent;(e.match(/Android/i)||e.match(/webOS/i)||e.match(/iPhone/i)||e.match(/iPad/i)||e.match(/iPod/i)||e.match(/BlackBerry/i))&&(this.config.isMobile=!0,this.camera.position.set(420,420,420),this.renderer.shadowMap.enabled=!1)},buildMovingCars(){[[-130,145,0],[10,145,0],[145,20,.5],[30,-145,1],[-145,-60,1.5]].forEach(t=>{let r=new V,i=t[0],f=t[1],u=t[2];r.setPosition(i,0,f),r.mesh.rotation.y=u*Math.PI,this.cars.push(r),y.add(r.mesh)})},buildStaticCars(){[[-84,82,1.5],[-58,82,1.5],[-32,82,1.5],[84,82,1.5]].forEach(t=>{let r=new V,i=t[0],f=t[1],u=t[2];r.setPosition(i,0,f),r.mesh.rotation.y=u*Math.PI,y.add(r.mesh)})},buildRoad(){let e=new S,t=16777215,r=[[-160,160],[160,160],[160,-160],[-160,-160]],i=[[-159,159],[-159,-159],[159,-159],[159,159]],f=n.makeShape(r,i),u=n.makeExtrudeGeometry(f,.1),b=n.makeMesh("phong",u,t);e.add(b);let M=[[-131,131],[-131,-131],[131,-131],[131,131],[19,131],[19,99],[99,99],[99,-99],[-99,-99],[-99,99],[-19,99],[-19,131]],p=n.makeShape(M),c=n.makeExtrudeGeometry(p,.1),l=n.makeMesh("phong",c,t);l.rotation.y=Math.PI,e.add(l);const o=[];let s=new x(20,.1,2);const a=[];for(let P=0;P<9;P++){let A=s.clone();A.translate(P*30,0,-1),a.push(A)}const h=C(a);h.translate(-120,0,145),o.push(h);let d=h.clone();d.translate(0,0,-290),o.push(d);let m=h.clone();m.rotateY(.5*Math.PI),o.push(m);let g=h.clone();g.rotateY(-.5*Math.PI),o.push(g);const w=C(o),B=n.makeMesh("phong",w,t);e.add(B),y.add(e)},buildbuilding(){let e=new x(320,6,320),t=n.makeMesh("lambert",e,7298922);t.position.y=-3,y.add(t),u(),f(),b(),i(),r();function r(){[[-12.5,12.5,1.25],[-7.5,12.5,-.5],[-2.5,12.5,-.5],[2.5,12.5,-.5],[7.5,12.5,-.5],[12.5,12.5,-.25],[12.5,7.5,0],[12.5,2.5,0],[12.5,-2.5,0],[12.5,-7.5,0],[12.5,-12.5,.25],[7.5,-12.5,.5],[2.5,-12.5,.5],[-2.5,-12.5,.5],[-7.5,-12.5,.5],[-12.5,-12.5,.75],[-12.5,-7.5,1],[-12.5,-2.5,1],[-12.5,2.5,1],[-12.5,7.5,1]].forEach(function(s){let a=s[0]*10,h=s[1]*10,d=s[2],m=M();m.rotation.y=d*Math.PI,m.position.set(a,0,h),y.add(m)})}function i(){let o=p();o.position.z=-20,y.add(o)}function f(){let o=[[-120,-120],[-120,120],[120,120],[120,-120],[20,-120],[20,-100],[100,-100],[100,100],[-100,100],[-100,-100],[-20,-100],[-20,-120],[-120,-120]],s=n.makeShape(o),a=n.makeExtrudeGeometry(s,3),h=n.makeMesh("lambert",a,12632170);y.add(h)}function u(){let o=[[-130,-130],[-130,130],[130,130],[130,-130],[20,-130],[20,-120],[120,-120],[120,120],[-120,120],[-120,-120],[-20,-120],[-20,-130],[-130,-130]],s=n.makeShape(o),a=n.makeExtrudeGeometry(s,3),h=n.makeMesh("lambert",a,15059647);y.add(h)}function b(){qe.forEach(function(o){let s=o[0],a=1,h=o[1],d=l(s,a,h);y.add(d)})}function M(){let o=new S,s=new x(2,30,2);s.translate(0,15,0);let a=n.makeMesh("phong",s,15454658);o.add(a);let h=new x(10,1,1),d=n.makeMesh("phong",h,2887182);d.position.set(3,30,0),o.add(d);let m=new x(6,2,4),g;return g=n.makeMesh("phong",m,15454658),g.position.set(10,30,0),o.add(g),o}function p(){let o=new S,s=new x(180,3,140),a=n.makeMesh("lambert",s,16777215);a.position.y=1,o.add(a);let h=[[-80,-30],[-80,20],[50,20],[50,0],[20,-30],[-80,-30]],d=n.makeShape(h),m=n.makeExtrudeGeometry(d,100),g=new U({map:ae.window()});g.map.repeat.set(.1,.08);let w=new F(m,g);w.castShadow=!0,w.receiveShadow=!0,o.add(w);let B=d,P=n.makeExtrudeGeometry(B,5),A=n.makeMesh("lambert",P,11642799);A.position.y=100,o.add(A);const I=[];let T=new x(2,2,40);for(let k=0;k<12;k++){let G=T.clone();G.translate(k*5,0,0),I.push(G)}for(let k=0;k<2;k++){let G=T.clone();G.rotateY(.5*Math.PI),G.scale(1.6,1,1),G.translate(27,0,-15+k*30),I.push(G)}let X=[[0,0],[1,0],[0,1],[1,1]];for(let k=0;k<X.length;k++){let G=X[k],L=T.clone();L.scale(1,1,.4),L.rotateX(.5*Math.PI),L.translate(G[0]*55,0,-15+G[1]*30),I.push(L)}const ne=C(I);let D=n.makeMesh("phong",ne,16777215);D.position.set(-70,115,5),o.add(D);let se=new x(150,3,90),Y=n.makeMesh("lambert",se,496293);Y.position.set(-3,18,25),o.add(Y);let le=new x(150,15,3),z=n.makeMesh("phong",le,496293);z.receiveShadow=!1,z.position.set(-3,24,68.5),o.add(z);let he=new x(150,3,3),$=n.makeMesh("phong",he,16777215);$.position.set(-3,33,68.5),o.add($);let de=new j(2,2,15,32),W=n.makeMesh("lambert",de,16777215);W.position.set(-60,10,55),o.add(W);let q=W.clone();q.position.set(55,10,55),o.add(q);let R=new S,fe=new x(4,106,4),H=n.makeMesh("phong",fe,16777215),N=H.clone();N.position.set(-80,52,30),R.add(N);let J=H.clone();J.position.set(-80,52,-20),R.add(J);let Z=H.clone();Z.position.set(50,52,-18),R.add(Z),o.add(R);let me=[[-82,-32],[20,-32],[52,0],[52,22],[-82,22],[-82,-32]],ce=[[-78,-28],[20,-28],[48,0],[48,18],[-78,18],[-78,-28]],ue=n.makeShape(me,ce),pe=n.makeExtrudeGeometry(ue,8),K=n.makeMesh("phong",pe,16777215);K.position.y=100,o.add(K);let ge=[[-80,20],[-80,60],[80,60],[80,20],[-80,20]],we=[[-78,22],[78,22],[78,58],[-78,58],[-78,22]],ye=n.makeShape(ge,we),be=n.makeExtrudeGeometry(ye,90),Me=n.makeMesh("lambert",be,15917595);o.add(Me);let xe=[[0,0],[36,0],[36,70],[0,70],[0,0]],ke=[[2,2],[34,2],[34,68],[2,68],[2,2]],Ge=n.makeShape(xe,ke),Be=n.makeExtrudeGeometry(Ge,165),E=n.makeMesh("lambert",Be,16777215);E.rotation.x=-.5*Math.PI,E.rotation.z=-.5*Math.PI,E.position.y=86,E.position.z=-58,E.position.x=-78,o.add(E);let Se=new te(32,66,1,1),Q=new U({map:ae.window()});Q.map.repeat.set(2,6);let O=new F(Se,Q);O.position.set(83,51,-40),O.rotation.y=.5*Math.PI,o.add(O);let v=c();v.scale.set(.6,.6,1),v.rotation.y=Math.PI,v.position.set(65,75,-61);for(let k=0;k<7;k++)for(let G=0;G<4;G++){let L=v.clone();L.position.x-=k*22,L.position.y-=G*20,o.add(L)}return o}function c(){let o=new S,s=new te(20,20),a=n.makeMesh("phong",s,6970996);o.add(a);let h=new x(22,2,2),d=n.makeMesh("phong",h,16777215),m=d.clone();m.position.y=10,o.add(m);let g=d.clone();g.position.y=-10,o.add(g);let w=d.clone();w.rotation.z=.5*Math.PI,w.position.x=-10,o.add(w);let B=w.clone();return B.position.x=10,o.add(B),o}function l(o,s,a){o=o||0,s=s||0,a=a||0;let h=new S,d=new x(2,16,2),m=n.makeMesh("lambert",d,9068858);m.position.y=8,h.add(m);let g=new x(8,8,8),w=n.makeMesh("lambert",g,10264157);return w.position.y=13,h.add(w),h.position.set(o,s,a),h}},buildLightSystem(){if(this.config.isMobile){let e=new ze(16777215,1);y.add(e);let t=new oe(16777215,.15);y.add(t)}else{let e=new Ce(16777215,1.1);e.position.set(300,1e3,500),e.target.position.set(0,0,0),e.castShadow=!0;let t=300;e.shadow.camera=new Te(-t,t,t,-t,500,1600),e.shadow.bias=1e-4,e.shadow.mapSize.width=e.shadow.mapSize.height=1024,y.add(e);let r=new oe(16777215,.3);y.add(r)}},buildAuxSystem(){let e=new We(320,32);y.add(e);let t=new je(this.camera,this.renderer.domElement);t.enableDamping=!0,t.dampingFactor=.25,t.rotateSpeed=.35},carMoving(e){let t=e.mesh.rotation.y,r=e.mesh.position.x,i=e.mesh.position.z;r<145&&i===145?e.forward():t<.5*Math.PI?e.turnLeft(.5*Math.PI,.1):r===145&&i>-145?e.forward():t<Math.PI?e.turnLeft(.5*Math.PI,.1):r>-145&&i==-145?e.forward():t<1.5*Math.PI?e.turnLeft(.5*Math.PI,.1):r===-145&&i<145?(e.mesh.rotation.y=1.5*Math.PI,e.forward()):t<2*Math.PI?e.turnLeft(.5*Math.PI,.1):(e.setPosition(-145,0,145),e.mesh.rotation.set(0,0,0))},onWindowResize(){window.addEventListener("resize",()=>{this.width=window.innerWidth,this.height=window.innerHeight,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)})},loop(){this.cars.forEach(e=>{this.carMoving(e)}),this.renderer.render(y,this.camera),requestAnimationFrame(this.loop)}},mounted(){this.width=window.innerWidth,this.height=window.innerHeight,y=new He,this.camera=new Oe(45,this.width/this.height,1,5e3),this.camera.position.set(330,330,330),this.camera.lookAt(y.position),this.renderer=new Ue({antialias:!0,canvas:document.querySelector("canvas")}),this.renderer.setSize(this.width,this.height),this.renderer.setClearColor(this.config.background),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Fe,this.checkUserAgent(),this.buildAuxSystem(),this.buildLightSystem(),this.buildbuilding(),this.buildRoad(),this.buildStaticCars(),this.buildMovingCars(),this.loop(),this.onWindowResize()}},ie=e=>(Ye("data-v-a4f1461c"),e=e(),$e(),e),Je={class:"container"},Ze=ie(()=>_("div",{class:"info"},[_("a",{class:"title",href:"https://github.com/luosijie/threejs-examples",target:"_blank"}," Mini City "),_("a",{class:"author",href:"https://luosijie.github.io/",target:"_blank"}," Created By Jesse Luo ")],-1)),Ke=ie(()=>_("canvas",null,null,-1)),Qe=[Ze,Ke];function et(e,t,r,i,f,u){return Xe(),De("div",Je,Qe)}const at=Ve(Ne,[["render",et],["__scopeId","data-v-a4f1461c"]]);export{at as default};
