(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var r=t.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var n=r.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})();var e=function(){function t(t,e){var r=this;this.worker=t,this.callback=e,this.worker=t,this.ready=new Promise((function(t){r.worker.onmessage=function(e){"ready"===e.data.type?t():r.callback(e.data)}}))}return t.prototype.postMessage=function(t){this.worker.postMessage(t)},t.prototype.destroy=function(){this.callback=function(){},this.worker.terminate()},t}(),r=function(){function t(t,r,n){this.con=t,this.callback=r,this.size=n,this.i=0,this.workers=Array(n).fill(0).map((function(){return new e(new t,r)}))}return t.create=function(e,r,n){return void 0===n&&(n=Math.min(navigator.hardwareConcurrency||4,64)),o=this,i=void 0,c=function(){var o;return function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}(this,(function(i){switch(i.label){case 0:return o=new t(e,r,n),[4,Promise.all(o.workers.map((function(t){return t.ready})))];case 1:return i.sent(),[2,o]}}))},new((a=void 0)||(a=Promise))((function(t,e){function r(t){try{s(c.next(t))}catch(t){e(t)}}function n(t){try{s(c.throw(t))}catch(t){e(t)}}function s(e){var o;e.done?t(e.value):(o=e.value,o instanceof a?o:new a((function(t){t(o)}))).then(r,n)}s((c=c.apply(o,i||[])).next())}));var o,i,a,c},t.prototype.postMessage=function(t){this.workers[this.i].postMessage(t),this.i=(this.i+1)%this.workers.length},t}(),n=225,o=document.createElement("canvas");o.id="render",o.width=400,o.height=n,document.body.appendChild(o);var i=o.getContext("2d");r.create((function(){return new Worker(t.p+"app.worker.js")}),(function(t){switch(t.type){case"image":i.putImageData(t.data,0,n-t.rows-t.row0)}})).then((function(t){for(var e=0;e<t.size;e++)t.postMessage({type:"test",width:400,height:n,row0:Math.floor(n/t.size*e),rows:Math.floor(n/t.size)})}))})();