(()=>{var e,t,r,n,o,i,a,s,c,u={855:(e,t,r)=>{r.e(984).then(r.bind(r,984)).then((e=>{e.init(),self.addEventListener("message",(t=>{if("test"===t.data.type){const r=new ImageData(new Uint8ClampedArray(e.get_buffer(t.data.width,t.data.height).buffer),t.data.width,t.data.height);self.postMessage({type:"image",data:r})}})),self.postMessage({type:"ready"})}))}},f={};function p(e){var t=f[e];if(void 0!==t)return t.exports;var r=f[e]={id:e,loaded:!1,exports:{}};return u[e](r,r.exports,p),r.loaded=!0,r.exports}p.m=u,p.c=f,p.d=(e,t)=>{for(var r in t)p.o(t,r)&&!p.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},p.f={},p.e=e=>Promise.all(Object.keys(p.f).reduce(((t,r)=>(p.f[r](e,t),t)),[])),p.u=e=>e+".worker.js",p.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),p.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),p.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),p.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;p.g.importScripts&&(e=p.g.location+"");var t=p.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),p.p=e})(),(()=>{var e={179:1};p.f.i=(t,r)=>{e[t]||importScripts(p.p+p.u(t))};var t=self.webpackChunklucifer=self.webpackChunklucifer||[],r=t.push.bind(t);t.push=t=>{var[n,o,i]=t;for(var a in o)p.o(o,a)&&(p.m[a]=o[a]);for(i&&i(p);n.length;)e[n.pop()]=1;r(t)}})(),a={},s={217:function(){return{"./index_bg.js":{__wbg_new_59cb74e423758ede:function(){return void 0===e&&(e=p.c[41].exports),e.h9()},__wbg_stack_558ba5917b466edd:function(e,r){return void 0===t&&(t=p.c[41].exports),t.Dz(e,r)},__wbg_error_4bb6c2a97407129a:function(e,t){return void 0===r&&(r=p.c[41].exports),r.kF(e,t)},__wbindgen_object_drop_ref:function(e){return void 0===n&&(n=p.c[41].exports),n.ug(e)},__wbg_random_bdb6828f228fc4b0:function(){return void 0===o&&(o=p.c[41].exports),o.NZ()},__wbindgen_throw:function(e,t){return void 0===i&&(i=p.c[41].exports),i.Or(e,t)}}}}},c={984:[217]},p.w={},p.f.wasm=function(e,t){(c[e]||[]).forEach((function(r,n){var o=a[r];if(o)t.push(o);else{var i,c=s[r](),u=fetch(p.p+""+{984:{217:"f922ef37a3b2695f496a"}}[e][r]+".module.wasm");i=c&&"function"==typeof c.then&&"function"==typeof WebAssembly.compileStreaming?Promise.all([WebAssembly.compileStreaming(u),c]).then((function(e){return WebAssembly.instantiate(e[0],e[1])})):"function"==typeof WebAssembly.instantiateStreaming?WebAssembly.instantiateStreaming(u,c):u.then((function(e){return e.arrayBuffer()})).then((function(e){return WebAssembly.instantiate(e,c)})),t.push(a[r]=i.then((function(e){return p.w[r]=(e.instance||e).exports})))}}))},p(855)})();