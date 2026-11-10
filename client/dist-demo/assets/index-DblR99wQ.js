var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=1e3,u=1001,d=1002,f=1003,p=1004,m=1005,h=1006,g=1007,_=1008,v=1009,y=1010,b=1011,x=1012,S=1013,C=1014,w=1015,T=1016,E=1017,D=1018,O=1020,k=35902,A=35899,j=1021,ee=1022,M=1023,te=1026,ne=1027,re=1028,ie=1029,ae=1030,oe=1031,se=1033,ce=33776,le=33777,ue=33778,N=33779,de=35840,fe=35841,pe=35842,me=35843,he=36196,ge=37492,_e=37496,ve=37488,ye=37489,be=37490,xe=37491,Se=37808,Ce=37809,we=37810,Te=37811,Ee=37812,De=37813,Oe=37814,ke=37815,Ae=37816,je=37817,Me=37818,Ne=37819,Pe=37820,Fe=37821,P=36492,Ie=36494,Le=36495,Re=36283,F=36284,ze=36285,I=36286,L=2300,Be=2301,Ve=2302,He=2303,Ue=2400,We=2401,Ge=2402,Ke=3200,qe=`srgb`,Je=`srgb-linear`,Ye=`linear`,Xe=`srgb`,Ze=7680,Qe=35044,$e=2e3;function et(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function tt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function nt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function rt(){let e=nt(`canvas`);return e.style.display=`block`,e}var it={};function at(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function ot(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function R(...e){e=ot(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function z(...e){e=ot(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function st(...e){let t=e.join(` `);t in it||(it[t]=!0,R(...e))}function ct(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var lt={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},ut=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},dt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),ft=Math.PI/180,pt=180/Math.PI;function mt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(dt[e&255]+dt[e>>8&255]+dt[e>>16&255]+dt[e>>24&255]+`-`+dt[t&255]+dt[t>>8&255]+`-`+dt[t>>16&15|64]+dt[t>>24&255]+`-`+dt[n&63|128]+dt[n>>8&255]+`-`+dt[n>>16&255]+dt[n>>24&255]+dt[r&255]+dt[r>>8&255]+dt[r>>16&255]+dt[r>>24&255]).toLowerCase()}function ht(e,t,n){return Math.max(t,Math.min(n,e))}function gt(e,t){return(e%t+t)%t}function _t(e,t,n){return(1-n)*e+n*t}function vt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function yt(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function bt(e,t){if(t.constructor===Float32Array)return e;let n=yt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function xt(e,t){if(t.constructor===Float32Array)return e;let n=yt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var B=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},St=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:R(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},V=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ct.copy(this).projectOnVector(e),this.sub(Ct)}reflect(e){return this.sub(Ct.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ct=new V,wt=new St,H=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return st(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Tt.makeScale(e,t)),this}rotate(e){return st(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Tt.makeRotation(-e)),this}translate(e,t){return st(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Tt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Tt=new H,Et=new H().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dt=new H().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ot(){let e={enabled:!0,workingColorSpace:Je,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=At(e.r),e.g=At(e.g),e.b=At(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=jt(e.r),e.g=jt(e.g),e.b=jt(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ye:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Je]:{primaries:t,whitePoint:r,transfer:Ye,toXYZ:Et,fromXYZ:Dt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:qe},outputColorSpaceConfig:{drawingBufferColorSpace:qe}},[qe]:{primaries:t,whitePoint:r,transfer:Xe,toXYZ:Et,fromXYZ:Dt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:qe}}}),e}var kt=Ot();function At(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function jt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Mt,Nt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Mt===void 0&&(Mt=nt(`canvas`)),Mt.width=e.width,Mt.height=e.height;let t=Mt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Mt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=nt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=At(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(At(t[e]/255)*255):t[e]=At(t[e]);return{data:t,width:e.width,height:e.height}}return R(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Pt=0,Ft=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Pt++}),this.uuid=mt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(It(r[t].image)):e.push(It(r[t]))}else e=It(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function It(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Nt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(R(`Texture: Unable to serialize Texture.`),{})}var Lt=0,Rt=new V,zt=class e extends ut{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=u,i=u,a=h,o=_,s=M,c=v,l=e.DEFAULT_ANISOTROPY,d=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lt++}),this.uuid=mt(),this.name=``,this.source=new Ft(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new B(0,0),this.repeat=new B(1,1),this.center=new B(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new H,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Rt).x}get height(){return this.source.getSize(Rt).y}get depth(){return this.source.getSize(Rt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){R(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?R(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case l:e.x-=Math.floor(e.x);break;case u:e.x=e.x<0?0:1;break;case d:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case l:e.y-=Math.floor(e.y);break;case u:e.y=e.y<0?0:1;break;case d:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};zt.DEFAULT_IMAGE=null,zt.DEFAULT_MAPPING=300,zt.DEFAULT_ANISOTROPY=1;var Bt=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Vt=class extends ut{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:h,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Bt(0,0,e,t),this.scissorTest=!1,this.viewport=new Bt(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new zt({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:h,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ft(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ht=class extends Vt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ut=class extends zt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Wt=class extends zt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Gt=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Kt.setFromMatrixColumn(e,0).length(),i=1/Kt.setFromMatrixColumn(e,1).length(),a=1/Kt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jt,e,Yt)}lookAt(e,t,n){let r=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),Xt.crossVectors(n,Qt),Xt.lengthSq()===0&&(Math.abs(n.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),Xt.crossVectors(n,Qt)),Xt.normalize(),Zt.crossVectors(Qt,Xt),r[0]=Xt.x,r[4]=Zt.x,r[8]=Qt.x,r[1]=Xt.y,r[5]=Zt.y,r[9]=Qt.y,r[2]=Xt.z,r[6]=Zt.z,r[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],te=r[7],ne=r[11],re=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*te,i[8]=a*C+o*D+s*j+c*ne,i[12]=a*w+o*O+s*ee+c*re,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*te,i[9]=l*C+u*D+d*j+f*ne,i[13]=l*w+u*O+d*ee+f*re,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*te,i[10]=p*C+m*D+h*j+g*ne,i[14]=p*w+m*O+h*ee+g*re,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*te,i[11]=_*C+v*D+y*j+b*ne,i[15]=_*w+v*O+y*ee+b*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Kt.set(r[0],r[1],r[2]).length(),o=Kt.set(r[4],r[5],r[6]).length(),s=Kt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),qt.copy(this);let c=1/a,l=1/o,u=1/s;return qt.elements[0]*=c,qt.elements[1]*=c,qt.elements[2]*=c,qt.elements[4]*=l,qt.elements[5]*=l,qt.elements[6]*=l,qt.elements[8]*=u,qt.elements[9]*=u,qt.elements[10]*=u,t.setFromRotationMatrix(qt),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=$e,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=$e,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Kt=new V,qt=new Gt,Jt=new V(0,0,0),Yt=new V(1,1,1),Xt=new V,Zt=new V,Qt=new V,$t=new Gt,en=new St,tn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-ht(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(ht(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:R(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $t.makeRotationFromQuaternion(e),this.setFromRotationMatrix($t,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return en.setFromEuler(this),this.setFromQuaternion(en,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};tn.DEFAULT_ORDER=`XYZ`;var nn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},rn=0,an=new V,on=new St,sn=new Gt,cn=new V,ln=new V,un=new V,dn=new St,fn=new V(1,0,0),pn=new V(0,1,0),mn=new V(0,0,1),hn={type:`added`},gn={type:`removed`},_n={type:`childadded`,child:null},vn={type:`childremoved`,child:null},yn=class e extends ut{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rn++}),this.uuid=mt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new V,n=new tn,r=new St,i=new V(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Gt},normalMatrix:{value:new H}}),this.matrix=new Gt,this.matrixWorld=new Gt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return on.setFromAxisAngle(e,t),this.quaternion.multiply(on),this}rotateOnWorldAxis(e,t){return on.setFromAxisAngle(e,t),this.quaternion.premultiply(on),this}rotateX(e){return this.rotateOnAxis(fn,e)}rotateY(e){return this.rotateOnAxis(pn,e)}rotateZ(e){return this.rotateOnAxis(mn,e)}translateOnAxis(e,t){return an.copy(e).applyQuaternion(this.quaternion),this.position.add(an.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fn,e)}translateY(e){return this.translateOnAxis(pn,e)}translateZ(e){return this.translateOnAxis(mn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(sn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?cn.copy(e):cn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ln.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sn.lookAt(ln,cn,this.up):sn.lookAt(cn,ln,this.up),this.quaternion.setFromRotationMatrix(sn),r&&(sn.extractRotation(r.matrixWorld),on.setFromRotationMatrix(sn),this.quaternion.premultiply(on.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(z(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hn),_n.child=e,this.dispatchEvent(_n),_n.child=null):z(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gn),vn.child=e,this.dispatchEvent(vn),vn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),sn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),sn.multiply(e.parent.matrixWorld)),e.applyMatrix4(sn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hn),_n.child=e,this.dispatchEvent(_n),_n.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ln,e,un),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ln,dn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};yn.DEFAULT_UP=new V(0,1,0),yn.DEFAULT_MATRIX_AUTO_UPDATE=!0,yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var bn=class extends yn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},xn={type:`move`},Sn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(xn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new bn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Cn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},Tn={h:0,s:0,l:0};function En(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Dn=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qe){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,kt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=kt.workingColorSpace){return this.r=e,this.g=t,this.b=n,kt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=kt.workingColorSpace){if(e=gt(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=En(i,r,e+1/3),this.g=En(i,r,e),this.b=En(i,r,e-1/3)}return kt.colorSpaceToWorking(this,r),this}setStyle(e,t=qe){function n(t){t!==void 0&&parseFloat(t)<1&&R(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:R(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);R(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qe){let n=Cn[e.toLowerCase()];return n===void 0?R(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=At(e.r),this.g=At(e.g),this.b=At(e.b),this}copyLinearToSRGB(e){return this.r=jt(e.r),this.g=jt(e.g),this.b=jt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qe){return kt.workingToColorSpace(On.copy(this),e),Math.round(ht(On.r*255,0,255))*65536+Math.round(ht(On.g*255,0,255))*256+Math.round(ht(On.b*255,0,255))}getHexString(e=qe){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=kt.workingColorSpace){kt.workingToColorSpace(On.copy(this),t);let n=On.r,r=On.g,i=On.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=kt.workingColorSpace){return kt.workingToColorSpace(On.copy(this),t),e.r=On.r,e.g=On.g,e.b=On.b,e}getStyle(e=qe){kt.workingToColorSpace(On.copy(this),e);let t=On.r,n=On.g,r=On.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(wn),this.setHSL(wn.h+e,wn.s+t,wn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(wn),e.getHSL(Tn);let n=_t(wn.h,Tn.h,t),r=_t(wn.s,Tn.s,t),i=_t(wn.l,Tn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},On=new Dn;Dn.NAMES=Cn;var kn=class extends yn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},An=new V,jn=new V,Mn=new V,Nn=new V,Pn=new V,Fn=new V,In=new V,Ln=new V,Rn=new V,zn=new V,Bn=new Bt,Vn=new Bt,Hn=new Bt,Un=class e{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),An.subVectors(e,t),r.cross(An);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){An.subVectors(r,t),jn.subVectors(n,t),Mn.subVectors(e,t);let a=An.dot(An),o=An.dot(jn),s=An.dot(Mn),c=jn.dot(jn),l=jn.dot(Mn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Nn)!==null&&Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Nn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Nn.x),s.addScaledVector(a,Nn.y),s.addScaledVector(o,Nn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Bn.setScalar(0),Vn.setScalar(0),Hn.setScalar(0),Bn.fromBufferAttribute(e,t),Vn.fromBufferAttribute(e,n),Hn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Bn,i.x),a.addScaledVector(Vn,i.y),a.addScaledVector(Hn,i.z),a}static isFrontFacing(e,t,n,r){return An.subVectors(n,t),jn.subVectors(e,t),An.cross(jn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),An.cross(jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Pn.subVectors(r,n),Fn.subVectors(i,n),Ln.subVectors(e,n);let s=Pn.dot(Ln),c=Fn.dot(Ln);if(s<=0&&c<=0)return t.copy(n);Rn.subVectors(e,r);let l=Pn.dot(Rn),u=Fn.dot(Rn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(Pn,a);zn.subVectors(e,i);let f=Pn.dot(zn),p=Fn.dot(zn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Fn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return In.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(In,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Pn,a).addScaledVector(Fn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Wn=class{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Kn):Kn.fromBufferAttribute(r,t),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),qn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),qn.copy(e.boundingBox)),qn.applyMatrix4(e.matrixWorld),this.union(qn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(er),tr.subVectors(this.max,er),Jn.subVectors(e.a,er),Yn.subVectors(e.b,er),Xn.subVectors(e.c,er),Zn.subVectors(Yn,Jn),Qn.subVectors(Xn,Yn),$n.subVectors(Jn,Xn);let t=[0,-Zn.z,Zn.y,0,-Qn.z,Qn.y,0,-$n.z,$n.y,Zn.z,0,-Zn.x,Qn.z,0,-Qn.x,$n.z,0,-$n.x,-Zn.y,Zn.x,0,-Qn.y,Qn.x,0,-$n.y,$n.x,0];return!ir(t,Jn,Yn,Xn,tr)||(t=[1,0,0,0,1,0,0,0,1],!ir(t,Jn,Yn,Xn,tr))?!1:(nr.crossVectors(Zn,Qn),t=[nr.x,nr.y,nr.z],ir(t,Jn,Yn,Xn,tr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Gn=[new V,new V,new V,new V,new V,new V,new V,new V],Kn=new V,qn=new Wn,Jn=new V,Yn=new V,Xn=new V,Zn=new V,Qn=new V,$n=new V,er=new V,tr=new V,nr=new V,rr=new V;function ir(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){rr.fromArray(e,a);let o=i.x*Math.abs(rr.x)+i.y*Math.abs(rr.y)+i.z*Math.abs(rr.z),s=t.dot(rr),c=n.dot(rr),l=r.dot(rr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var ar=new V,or=new B,sr=0,cr=class extends ut{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Qe,this.updateRanges=[],this.gpuType=w,this.version=0,this._normalizationScale=e===void 0?void 0:yt(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)or.fromBufferAttribute(this,t),or.applyMatrix3(e),this.setXY(t,or.x,or.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ar.fromBufferAttribute(this,t),ar.applyMatrix3(e),this.setXYZ(t,ar.x,ar.y,ar.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ar.fromBufferAttribute(this,t),ar.applyMatrix4(e),this.setXYZ(t,ar.x,ar.y,ar.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ar.fromBufferAttribute(this,t),ar.applyNormalMatrix(e),this.setXYZ(t,ar.x,ar.y,ar.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ar.fromBufferAttribute(this,t),ar.transformDirection(e),this.setXYZ(t,ar.x,ar.y,ar.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?bt(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?xt(e,this.array):Math.round(e*t)}},lr=class extends cr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ur=class extends cr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},dr=class extends cr{constructor(e,t,n){super(new Float32Array(e),t,n)}},fr=new Wn,pr=new V,mr=new V,hr=class{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?fr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pr.subVectors(e,this.center);let t=pr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(pr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(mr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pr.copy(e.center).add(mr)),this.expandByPoint(pr.copy(e.center).sub(mr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},gr=0,_r=new Gt,vr=new yn,yr=new V,br=new Wn,xr=new Wn,Sr=new V,Cr=class e extends ut{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gr++}),this.uuid=mt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(et(e)?ur:lr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new H().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return _r.makeRotationFromQuaternion(e),this.applyMatrix4(_r),this}rotateX(e){return _r.makeRotationX(e),this.applyMatrix4(_r),this}rotateY(e){return _r.makeRotationY(e),this.applyMatrix4(_r),this}rotateZ(e){return _r.makeRotationZ(e),this.applyMatrix4(_r),this}translate(e,t,n){return _r.makeTranslation(e,t,n),this.applyMatrix4(_r),this}scale(e,t,n){return _r.makeScale(e,t,n),this.applyMatrix4(_r),this}lookAt(e){return vr.lookAt(e),vr.updateMatrix(),this.applyMatrix4(vr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yr).negate(),this.translate(yr.x,yr.y,yr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new dr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&R(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)z(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];br.setFromBufferAttribute(n),this.morphTargetsRelative?(Sr.addVectors(this.boundingBox.min,br.min),this.boundingBox.expandByPoint(Sr),Sr.addVectors(this.boundingBox.max,br.max),this.boundingBox.expandByPoint(Sr)):(this.boundingBox.expandByPoint(br.min),this.boundingBox.expandByPoint(br.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&z(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)z(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new V,1/0);else if(e){let n=this.boundingSphere.center;if(br.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];xr.setFromBufferAttribute(n),this.morphTargetsRelative?(Sr.addVectors(br.min,xr.min),br.expandByPoint(Sr),Sr.addVectors(br.max,xr.max),br.expandByPoint(Sr)):(br.expandByPoint(xr.min),br.expandByPoint(xr.max))}br.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Sr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Sr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Sr.fromBufferAttribute(a,t),o&&(yr.fromBufferAttribute(e,t),Sr.add(yr)),r=Math.max(r,n.distanceToSquared(Sr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&z(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){z(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new cr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new V,s[e]=new V;let l=new V,u=new V,d=new V,f=new B,p=new B,m=new B,h=new V,g=new V;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new V,b=new V,x=new V,S=new V;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new cr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new V,i=new V,a=new V,o=new V,s=new V,c=new V,l=new V,u=new V;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Sr.fromBufferAttribute(e,t),Sr.normalize(),e.setXYZ(t,Sr.x,Sr.y,Sr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new cr(a,r,i)}if(this.index===null)return R(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},wr=new V,Tr=new V,Er=new H,Dr=class{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=wr.subVectors(n,t).cross(Tr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(wr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Er.getNormalMatrix(e),r=this.coplanarPoint(wr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Or=0,kr=class extends ut{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Or++}),this.uuid=mt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dn(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ze,this.stencilZFail=Ze,this.stencilZPass=Ze,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){R(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?R(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Dn().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Dr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new B().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new B().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Ar=new V,jr=new V,Mr=new V,Nr=new V,Pr=class{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ar)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ar.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ar.copy(this.origin).addScaledVector(this.direction,t),Ar.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){jr.copy(e).add(t).multiplyScalar(.5),Mr.copy(t).sub(e).normalize(),Nr.copy(this.origin).sub(jr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Mr),o=Nr.dot(this.direction),s=-Nr.dot(Mr),c=Nr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(jr).addScaledVector(Mr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Ar.subVectors(e.center,this.origin);let n=Ar.dot(this.direction),r=Ar.dot(Ar)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Ar)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,M;if(y>=b&&y>=x?(w=s,D=u,A=p,M=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,M=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,M=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let te=S/w,ne=C/w,re=1/w,ie=T-te*D,ae=E-ne*D,oe=O-te*A,se=k-ne*A,ce=j-te*M,le=ee-ne*M,ue=ce*se-le*oe,N=ie*le-ae*ce,de=oe*ae-se*ie;if(r){if(ue<0||N<0||de<0)return null}else if((ue<0||N<0||de<0)&&(ue>0||N>0||de>0))return null;let fe=ue+N+de;if(fe===0)return null;let pe=re*(ue*D+N*A+de*M);return(fe>0?pe<0:pe>0)?null:this.at(pe/fe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Fr=class extends kr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Dn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ir=new Gt,Lr=new Pr,Rr=new hr,zr=new V,Br=new V,Vr=new V,Hr=new V,Ur=new V,Wr=new V,Gr=new V,Kr=new V,qr=class extends yn{constructor(e=new Cr,t=new Fr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Wr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Ur.fromBufferAttribute(s,e),a?Wr.addScaledVector(Ur,r):Wr.addScaledVector(Ur.sub(t),r))}t.add(Wr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(i),Lr.copy(e.ray).recast(e.near),Rr.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere(Rr,zr)===null||Lr.origin.distanceToSquared(zr)>(e.far-e.near)**2)||(Ir.copy(i).invert(),Lr.copy(e.ray).applyMatrix4(Ir),(n.boundingBox===null||Lr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Lr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Yr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Yr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Yr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Yr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Jr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Kr.copy(s),Kr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Kr);return l<n.near||l>n.far?null:{distance:l,point:Kr.clone(),object:e}}function Yr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Br),e.getVertexPosition(c,Vr),e.getVertexPosition(l,Hr);let u=Jr(e,t,n,r,Br,Vr,Hr,Gr);if(u){let e=new V;Un.getBarycoord(Gr,Br,Vr,Hr,e),i&&(u.uv=Un.getInterpolatedAttribute(i,s,c,l,e,new B)),a&&(u.uv1=Un.getInterpolatedAttribute(a,s,c,l,e,new B)),o&&(u.normal=Un.getInterpolatedAttribute(o,s,c,l,e,new V),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new V,materialIndex:0};Un.getNormal(Br,Vr,Hr,t.normal),u.face=t,u.barycoord=e}return u}var Xr=class extends zt{constructor(e=null,t=1,n=1,r,i,a,o,s,c=f,l=f,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Zr=new hr,Qr=new B(.5,.5),$r=new V,ei=class{constructor(e=new Dr,t=new Dr,n=new Dr,r=new Dr,i=new Dr,a=new Dr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=$e,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zr)}intersectsSprite(e){return Zr.center.set(0,0,0),Zr.radius=.7071067811865476+Qr.distanceTo(e.center),Zr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if($r.x=r.normal.x>0?e.max.x:e.min.x,$r.y=r.normal.y>0?e.max.y:e.min.y,$r.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint($r)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},ti=new Gt,ni=class e{constructor(){this.coordinateSystem=$e,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];ti.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new ei),n[e].setFromProjectionMatrix(ti,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new ei),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},ri=class extends zt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ii=class extends zt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ai=class extends zt{constructor(e,t,n=C,r,i,a,o=f,s=f,c,l=te,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ft(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},oi=class extends ai{constructor(e,t=C,n=301,r,i,a=f,o=f,s,c=te){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},si=class extends zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ci=class e extends Cr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new dr(c,3)),this.setAttribute(`normal`,new dr(l,3)),this.setAttribute(`uv`,new dr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new V;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},li=class e extends Cr{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new V,g=new V;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new dr(o,3)),this.setAttribute(`normal`,new dr(s,3)),this.setAttribute(`uv`,new dr(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},ui=class e extends Cr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new V,l=new B;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new dr(a,3)),this.setAttribute(`normal`,new dr(o,3)),this.setAttribute(`uv`,new dr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},di=class e extends Cr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new dr(u,3)),this.setAttribute(`normal`,new dr(d,3)),this.setAttribute(`uv`,new dr(f,2));function _(){let a=new V,_=new V,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new B,m=new V,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},fi=class e extends di{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},pi=class e extends Cr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new dr(p,3)),this.setAttribute(`normal`,new dr(m,3)),this.setAttribute(`uv`,new dr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},mi=class e extends Cr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new V,p=new B;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new dr(s,3)),this.setAttribute(`normal`,new dr(c,3)),this.setAttribute(`uv`,new dr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},hi=class e extends Cr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new V,d=new V,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new dr(p,3)),this.setAttribute(`normal`,new dr(m,3)),this.setAttribute(`uv`,new dr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function gi(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(vi(i))i.isRenderTargetTexture?(R(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(vi(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function _i(e){let t={};for(let n=0;n<e.length;n++){let r=gi(e[n]);for(let e in r)t[e]=r[e]}return t}function vi(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function yi(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function bi(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:kt.workingColorSpace}var xi={clone:gi,merge:_i},Si=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ci=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,wi=class extends kr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Si,this.fragmentShader=Ci,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=gi(e.uniforms),this.uniformsGroups=yi(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Dn().setHex(r.value);break;case`v2`:this.uniforms[n].value=new B().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new V().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Bt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new H().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Gt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ti=class extends wi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Ei=class extends kr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new Dn(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new B(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Di=class extends kr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ke,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Oi=class extends kr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ki(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Ai(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var ji=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Mi=class extends ji{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ue,endingEnd:Ue}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case We:i=e,o=2*t-n;break;case Ge:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case We:a=e,s=2*n-t;break;case Ge:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ni=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Pi=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Fi=class extends ji{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Ri(n,t,g,y,r);i[p]=Ii(x,o,_,b,m)}return i}};function Ii(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Li(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Ri(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Ii(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Li(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var zi=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ki(t,this.TimeBufferType),this.values=ki(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ki(e.times,Array),values:ki(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Ai(e.settings)&&(n.settings={inTangents:ki(e.settings.inTangents,Array),outTangents:ki(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Pi(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ni(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mi(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Fi(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case L:t=this.InterpolantFactoryMethodDiscrete;break;case Be:t=this.InterpolantFactoryMethodLinear;break;case Ve:t=this.InterpolantFactoryMethodSmooth;break;case He:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return R(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return L;case this.InterpolantFactoryMethodLinear:return Be;case this.InterpolantFactoryMethodSmooth:return Ve;case this.InterpolantFactoryMethodBezier:return He}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Ai(this.settings)&&(Bi(this.settings.inTangents,e),Bi(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ai(this.settings)&&(Vi(this.settings.inTangents,e),Vi(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(z(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(z(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){z(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){z(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&tt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){z(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ve,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ai(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Bi(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function Vi(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}zi.prototype.ValueTypeName=``,zi.prototype.TimeBufferType=Float32Array,zi.prototype.ValueBufferType=Float32Array,zi.prototype.DefaultInterpolation=Be;var Hi=class extends zi{constructor(e,t,n){super(e,t,n)}};Hi.prototype.ValueTypeName=`bool`,Hi.prototype.ValueBufferType=Array,Hi.prototype.DefaultInterpolation=L,Hi.prototype.InterpolantFactoryMethodLinear=void 0,Hi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ui=class extends zi{constructor(e,t,n,r){super(e,t,n,r)}};Ui.prototype.ValueTypeName=`color`;var Wi=class extends zi{constructor(e,t,n,r){super(e,t,n,r)}};Wi.prototype.ValueTypeName=`number`;var Gi=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)St.slerpFlat(i,0,a,c-o,a,c,s);return i}},Ki=class extends zi{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Gi(this.times,this.values,this.getValueSize(),e)}};Ki.prototype.ValueTypeName=`quaternion`,Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var qi=class extends zi{constructor(e,t,n){super(e,t,n)}};qi.prototype.ValueTypeName=`string`,qi.prototype.ValueBufferType=Array,qi.prototype.DefaultInterpolation=L,qi.prototype.InterpolantFactoryMethodLinear=void 0,qi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ji=class extends zi{constructor(e,t,n,r){super(e,t,n,r)}};Ji.prototype.ValueTypeName=`vector`;var Yi={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Xi(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Xi(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Xi(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Zi=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Qi=class{constructor(e){this.manager=e===void 0?Zi:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},this.priority=`auto`,this.cache=`default`,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Qi.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var $i=new WeakMap,ea=class extends Qi{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Yi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=$i.get(a);e===void 0&&(e=[],$i.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=nt(`img`);function s(){l(),t&&t(this);let n=$i.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}$i.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Yi.remove(`image:${e}`);let n=$i.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}$i.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Yi.add(`image:${e}`,o),i.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}},ta=class extends Qi{constructor(e){super(e)}load(e,t,n,r){let i=new zt,a=new ea(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},na=class extends yn{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Dn(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},ra=class extends na{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(yn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Dn(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ia=new Gt,aa=new V,oa=new V,sa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new B(512,512),this.mapType=v,this.map=null,this.mapPass=null,this.matrix=new Gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ei,this._frameExtents=new B(1,1),this._viewportCount=1,this._viewports=[new Bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;aa.setFromMatrixPosition(e.matrixWorld),t.position.copy(aa),oa.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(oa),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){ia.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ia,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ia)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},ca=new V,la=new St,ua=new V,da=class extends yn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Gt,this.projectionMatrix=new Gt,this.projectionMatrixInverse=new Gt,this.coordinateSystem=$e,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ca,la,ua),ua.x===1&&ua.y===1&&ua.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ca,la,ua.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ca,la,ua),ua.x===1&&ua.y===1&&ua.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ca,la,ua.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},fa=new V,pa=new B,ma=new B,ha=class extends da{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=pt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ft*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pt*2*Math.atan(Math.tan(ft*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){fa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fa.x,fa.y).multiplyScalar(-e/fa.z),fa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(fa.x,fa.y).multiplyScalar(-e/fa.z)}getViewSize(e,t){return this.getViewBounds(e,pa,ma),t.subVectors(ma,pa)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ft*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ga=class extends da{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},_a=class extends sa{constructor(){super(new ga(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},va=class extends na{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(yn.DEFAULT_UP),this.updateMatrix(),this.target=new yn,this.shadow=new _a}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ya=class extends na{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},ba=-90,xa=1,Sa=class extends yn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ha(ba,xa,e,t);r.layers=this.layers,this.add(r);let i=new ha(ba,xa,e,t);i.layers=this.layers,this.add(i);let a=new ha(ba,xa,e,t);a.layers=this.layers,this.add(a);let o=new ha(ba,xa,e,t);o.layers=this.layers,this.add(o);let s=new ha(ba,xa,e,t);s.layers=this.layers,this.add(s);let c=new ha(ba,xa,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ca=class extends ha{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},wa=`\\[\\]\\.:\\/`,Ta=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ea=`[^\\[\\]\\.:\\/]`,Da=`[^`+wa.replace(`\\.`,``)+`]`,Oa=`((?:WC+[\\/:])*)`.replace(`WC`,Ea),ka=`(WCOD+)?`.replace(`WCOD`,Da),Aa=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ea),ja=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ea),Ma=RegExp(`^`+Oa+ka+Aa+ja+`$`),Na=[`material`,`materials`,`bones`,`map`],Pa=class{constructor(e,t,n){let r=n||Fa.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Fa=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Ta,``)}static parseTrackName(e){let t=Ma.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Na.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){R(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){z(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){z(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){z(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){z(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){z(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;z(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Fa.Composite=Pa,Fa.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Fa.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Fa.prototype.GetterByBindingType=[Fa.prototype._getValue_direct,Fa.prototype._getValue_array,Fa.prototype._getValue_arrayElement,Fa.prototype._getValue_toArray],Fa.prototype.SetterByBindingTypeAndVersioning=[[Fa.prototype._setValue_direct,Fa.prototype._setValue_direct_setNeedsUpdate,Fa.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Fa.prototype._setValue_array,Fa.prototype._setValue_array_setNeedsUpdate,Fa.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Fa.prototype._setValue_arrayElement,Fa.prototype._setValue_arrayElement_setNeedsUpdate,Fa.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Fa.prototype._setValue_fromArray,Fa.prototype._setValue_fromArray_setNeedsUpdate,Fa.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ia=new Gt,La=class{constructor(e,t,n=0,r=1/0){this.ray=new Pr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new nn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):z(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Ia.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ia),this}intersectObject(e,t=!0,n=[]){return za(e,this,n,t),n.sort(Ra),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)za(e[r],this,n,t);return n.sort(Ra),n}};function Ra(e,t){return e.distance-t.distance}function za(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)za(r[e],t,n,!0)}}(class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function Ba(e,t,n,r){let i=Va(r);switch(n){case j:return e*t;case re:return e*t/i.components*i.byteLength;case ie:return e*t/i.components*i.byteLength;case ae:return e*t*2/i.components*i.byteLength;case oe:return e*t*2/i.components*i.byteLength;case ee:return e*t*3/i.components*i.byteLength;case M:return e*t*4/i.components*i.byteLength;case se:return e*t*4/i.components*i.byteLength;case ce:case le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ue:case N:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case fe:case me:return Math.max(e,16)*Math.max(t,8)/4;case de:case pe:return Math.max(e,8)*Math.max(t,8)/2;case he:case ge:case ve:case ye:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case _e:case be:case xe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ce:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case we:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Te:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Ee:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case De:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Oe:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ke:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ae:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case je:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Me:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Ne:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Pe:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Fe:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case P:case Ie:case Le:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Re:case F:return Math.ceil(e/4)*Math.ceil(t/4)*8;case ze:case I:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Va(e){switch(e){case v:case y:return{byteLength:1,components:1};case x:case b:case T:return{byteLength:2,components:1};case E:case D:return{byteLength:2,components:4};case C:case S:case w:return{byteLength:4,components:1};case k:case A:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?R(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function Ha(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Ua(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var U={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},W={common:{diffuse:{value:new Dn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new H},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new H}},envmap:{envMap:{value:null},envMapRotation:{value:new H},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new H}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new H}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new H},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new H},normalScale:{value:new B(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new H},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new H}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new H}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new H}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Dn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0},uvTransform:{value:new H}},sprite:{diffuse:{value:new Dn(16777215)},opacity:{value:1},center:{value:new B(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new H},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0}}},Wa={basic:{uniforms:_i([W.common,W.specularmap,W.envmap,W.aomap,W.lightmap,W.fog]),vertexShader:U.meshbasic_vert,fragmentShader:U.meshbasic_frag},lambert:{uniforms:_i([W.common,W.specularmap,W.envmap,W.aomap,W.lightmap,W.emissivemap,W.bumpmap,W.normalmap,W.displacementmap,W.fog,W.lights,{emissive:{value:new Dn(0)},envMapIntensity:{value:1}}]),vertexShader:U.meshlambert_vert,fragmentShader:U.meshlambert_frag},phong:{uniforms:_i([W.common,W.specularmap,W.envmap,W.aomap,W.lightmap,W.emissivemap,W.bumpmap,W.normalmap,W.displacementmap,W.fog,W.lights,{emissive:{value:new Dn(0)},specular:{value:new Dn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:U.meshphong_vert,fragmentShader:U.meshphong_frag},standard:{uniforms:_i([W.common,W.envmap,W.aomap,W.lightmap,W.emissivemap,W.bumpmap,W.normalmap,W.displacementmap,W.roughnessmap,W.metalnessmap,W.fog,W.lights,{emissive:{value:new Dn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:U.meshphysical_vert,fragmentShader:U.meshphysical_frag},toon:{uniforms:_i([W.common,W.aomap,W.lightmap,W.emissivemap,W.bumpmap,W.normalmap,W.displacementmap,W.gradientmap,W.fog,W.lights,{emissive:{value:new Dn(0)}}]),vertexShader:U.meshtoon_vert,fragmentShader:U.meshtoon_frag},matcap:{uniforms:_i([W.common,W.bumpmap,W.normalmap,W.displacementmap,W.fog,{matcap:{value:null}}]),vertexShader:U.meshmatcap_vert,fragmentShader:U.meshmatcap_frag},points:{uniforms:_i([W.points,W.fog]),vertexShader:U.points_vert,fragmentShader:U.points_frag},dashed:{uniforms:_i([W.common,W.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:U.linedashed_vert,fragmentShader:U.linedashed_frag},depth:{uniforms:_i([W.common,W.displacementmap]),vertexShader:U.depth_vert,fragmentShader:U.depth_frag},normal:{uniforms:_i([W.common,W.bumpmap,W.normalmap,W.displacementmap,{opacity:{value:1}}]),vertexShader:U.meshnormal_vert,fragmentShader:U.meshnormal_frag},sprite:{uniforms:_i([W.sprite,W.fog]),vertexShader:U.sprite_vert,fragmentShader:U.sprite_frag},background:{uniforms:{uvTransform:{value:new H},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:U.background_vert,fragmentShader:U.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new H}},vertexShader:U.backgroundCube_vert,fragmentShader:U.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:U.cube_vert,fragmentShader:U.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:U.equirect_vert,fragmentShader:U.equirect_frag},distance:{uniforms:_i([W.common,W.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:U.distance_vert,fragmentShader:U.distance_frag},shadow:{uniforms:_i([W.lights,W.fog,{color:{value:new Dn(0)},opacity:{value:1}}]),vertexShader:U.shadow_vert,fragmentShader:U.shadow_frag}};Wa.physical={uniforms:_i([Wa.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new H},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new H},clearcoatNormalScale:{value:new B(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new H},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new H},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new H},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new H},sheen:{value:0},sheenColor:{value:new Dn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new H},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new H},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new H},transmissionSamplerSize:{value:new B},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new H},attenuationDistance:{value:0},attenuationColor:{value:new Dn(0)},specularColor:{value:new Dn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new H},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new H},anisotropyVector:{value:new B},anisotropyMap:{value:null},anisotropyMapTransform:{value:new H}}]),vertexShader:U.meshphysical_vert,fragmentShader:U.meshphysical_frag};var Ga={r:0,b:0,g:0},Ka=new Gt,qa=new H;qa.set(-1,0,0,0,1,0,0,0,1);function Ja(e,t,n,r,i,a){let o=new Dn(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new qr(new ci(1,1,1),new wi({name:`BackgroundCubeMaterial`,uniforms:gi(Wa.backgroundCube.uniforms),vertexShader:Wa.backgroundCube.vertexShader,fragmentShader:Wa.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ka.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(qa),l.material.toneMapped=kt.getTransfer(i.colorSpace)!==Xe,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new qr(new pi(2,2),new wi({name:`BackgroundMaterial`,uniforms:gi(Wa.background.uniforms),vertexShader:Wa.background.vertexShader,fragmentShader:Wa.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=kt.getTransfer(i.colorSpace)!==Xe,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Ga,bi(e)),n.buffers.color.setClear(Ga.r,Ga.g,Ga.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Ya(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Xa(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Za(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(R(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&R(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&R(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Qa(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Dr,s=new H,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var $a=class extends Ht{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ri(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ci(5,5,5),i=new wi({name:`CubemapFromEquirect`,uniforms:gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new qr(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=h),new Sa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},eo=256,to=3,no=20,ro=256,io=16,ao=3,oo=new V,so=new Dn,co=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Sa(1,10,null),this._boxMesh=new qr(new ci(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=oo}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(so));let h=new Sa(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=go(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ho(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(eo,vt(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?eo:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=lo(e,!1,!1),n=Math.log2(e)-to;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=lo(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=go()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=ho()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=fo(),this._integrationMaterial=po());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/io);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-ao)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(ro*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=mo());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function lo(e,t,n){return new $a(e,{minFilter:_,generateMipmaps:t,type:T,colorSpace:Je,depthBuffer:n})}function uo(e,t,n){return new wi({name:e,uniforms:t,vertexShader:U.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function fo(){return uo(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${ro}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function po(){return uo(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:io}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function mo(){return uo(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${no}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function ho(){return uo(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function go(){return uo(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function _o(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new $a(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new co(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new co(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function vo(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&st(`WebGLRenderer: `+e+` extension not supported.`),t}}}function yo(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?ur:lr)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function bo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function xo(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:z(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function So(e,t,n){let r=new WeakMap,i=new Bt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Ut(h,p,m,u);g.type=w,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new B(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Co(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var wo={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function To(e,t,n,r,i,a){let o=new Ht(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new Cr;u.setAttribute(`position`,new dr([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new dr([0,2,0,0,2,0],2));let d=new Ti({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new qr(u,d),p=new ga(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Ht(t,n,{type:T,depthBuffer:!1,stencilBuffer:!1}),c=new Ht(t,n,{type:T,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new ai(t,n),a===!0&&(l.format=ne,l.type=O)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},kt.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=wo[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var Eo=new zt,Do=new ai(1,1),Oo=new oi(1),ko=new Ut,Ao=new Wt,jo=new ri,Mo=[],No=[],Po=new Float32Array(16),Fo=new Float32Array(9),Io=new Float32Array(4);function Lo(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Mo[i];if(a===void 0&&(a=new Float32Array(i),Mo[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Ro(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function zo(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Bo(e,t){let n=No[t];n===void 0&&(n=new Int32Array(t),No[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Vo(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Ho(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ro(n,t))return;e.uniform2fv(this.addr,t),zo(n,t)}}function Uo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ro(n,t))return;e.uniform3fv(this.addr,t),zo(n,t)}}function Wo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ro(n,t))return;e.uniform4fv(this.addr,t),zo(n,t)}}function Go(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ro(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),zo(n,t)}else{if(Ro(n,r))return;Io.set(r),e.uniformMatrix2fv(this.addr,!1,Io),zo(n,r)}}function Ko(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ro(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),zo(n,t)}else{if(Ro(n,r))return;Fo.set(r),e.uniformMatrix3fv(this.addr,!1,Fo),zo(n,r)}}function qo(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ro(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),zo(n,t)}else{if(Ro(n,r))return;Po.set(r),e.uniformMatrix4fv(this.addr,!1,Po),zo(n,r)}}function Jo(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Yo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ro(n,t))return;e.uniform2iv(this.addr,t),zo(n,t)}}function Xo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ro(n,t))return;e.uniform3iv(this.addr,t),zo(n,t)}}function Zo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ro(n,t))return;e.uniform4iv(this.addr,t),zo(n,t)}}function Qo(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function $o(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ro(n,t))return;e.uniform2uiv(this.addr,t),zo(n,t)}}function es(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ro(n,t))return;e.uniform3uiv(this.addr,t),zo(n,t)}}function ts(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ro(n,t))return;e.uniform4uiv(this.addr,t),zo(n,t)}}function ns(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function rs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?ns(Do):Eo,n.setTexture2D(t||a,i)}function is(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Ao,i)}function as(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?ns(Oo):jo,n.setTextureCube(t||a,i)}function os(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||ko,i)}function ss(e){switch(e){case 5126:return Vo;case 35664:return Ho;case 35665:return Uo;case 35666:return Wo;case 35674:return Go;case 35675:return Ko;case 35676:return qo;case 5124:case 35670:return Jo;case 35667:case 35671:return Yo;case 35668:case 35672:return Xo;case 35669:case 35673:return Zo;case 5125:return Qo;case 36294:return $o;case 36295:return es;case 36296:return ts;case 35678:case 36198:case 36298:case 36306:case 35682:return rs;case 35679:case 36299:case 36307:return is;case 35680:case 36300:case 36308:case 36293:return as;case 36289:case 36303:case 36311:case 36292:return os}}function cs(e,t){e.uniform1fv(this.addr,t)}function ls(e,t){let n=Lo(t,this.size,2);e.uniform2fv(this.addr,n)}function us(e,t){let n=Lo(t,this.size,3);e.uniform3fv(this.addr,n)}function ds(e,t){let n=Lo(t,this.size,4);e.uniform4fv(this.addr,n)}function fs(e,t){let n=Lo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ps(e,t){let n=Lo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ms(e,t){let n=Lo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function hs(e,t){e.uniform1iv(this.addr,t)}function gs(e,t){e.uniform2iv(this.addr,t)}function _s(e,t){e.uniform3iv(this.addr,t)}function vs(e,t){e.uniform4iv(this.addr,t)}function ys(e,t){e.uniform1uiv(this.addr,t)}function bs(e,t){e.uniform2uiv(this.addr,t)}function xs(e,t){e.uniform3uiv(this.addr,t)}function Ss(e,t){e.uniform4uiv(this.addr,t)}function Cs(e,t,n){let r=this.cache,i=t.length,a=Bo(n,i);Ro(r,a)||(e.uniform1iv(this.addr,a),zo(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?ns(Do):Eo;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function ws(e,t,n){let r=this.cache,i=t.length,a=Bo(n,i);Ro(r,a)||(e.uniform1iv(this.addr,a),zo(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Ao,a[e])}function Ts(e,t,n){let r=this.cache,i=t.length,a=Bo(n,i);Ro(r,a)||(e.uniform1iv(this.addr,a),zo(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?ns(Oo):jo;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function Es(e,t,n){let r=this.cache,i=t.length,a=Bo(n,i);Ro(r,a)||(e.uniform1iv(this.addr,a),zo(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||ko,a[e])}function Ds(e){switch(e){case 5126:return cs;case 35664:return ls;case 35665:return us;case 35666:return ds;case 35674:return fs;case 35675:return ps;case 35676:return ms;case 5124:case 35670:return hs;case 35667:case 35671:return gs;case 35668:case 35672:return _s;case 35669:case 35673:return vs;case 5125:return ys;case 36294:return bs;case 36295:return xs;case 36296:return Ss;case 35678:case 36198:case 36298:case 36306:case 35682:return Cs;case 35679:case 36299:case 36307:return ws;case 35680:case 36300:case 36308:case 36293:return Ts;case 36289:case 36303:case 36311:case 36292:return Es}}var Os=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ss(t.type)}},ks=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ds(t.type)}},As=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},js=/(\w+)(\])?(\[|\.)?/g;function Ms(e,t){e.seq.push(t),e.map[t.id]=t}function Ns(e,t,n){let r=e.name,i=r.length;for(js.lastIndex=0;;){let a=js.exec(r),o=js.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Ms(n,l===void 0?new Os(s,e,t):new ks(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new As(s),Ms(n,e)),n=e}}}var Ps=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Ns(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Fs(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Is=37297,Ls=0;function Rs(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var zs=new H;function Bs(e){kt._getMatrix(zs,kt.workingColorSpace,e);let t=`mat3( ${zs.elements.map(e=>e.toFixed(4))} )`;switch(kt.getTransfer(e)){case Ye:return[t,`LinearTransferOETF`];case Xe:return[t,`sRGBTransferOETF`];default:return R(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Vs(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Rs(e.getShaderSource(t),r)}return i}function Hs(e,t){let n=Bs(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Us={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Ws(e,t){let n=Us[t];return n===void 0?(R(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Gs=new V;function Ks(){return kt.getLuminanceCoefficients(Gs),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Gs.x.toFixed(4)}, ${Gs.y.toFixed(4)}, ${Gs.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function qs(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Xs).join(`
`)}function Js(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Ys(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Xs(e){return e!==``}function Zs(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Qs(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var $s=/^[ \t]*#include +<([\w\d./]+)>/gm;function ec(e){return e.replace($s,tc)}function tc(e,t){let n=U[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return ec(n)}var nc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rc(e){return e.replace(nc,ic)}function ic(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function ac(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var oc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function sc(e){return oc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var cc={302:`ENVMAP_MODE_REFRACTION`};function lc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:cc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var uc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function dc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:uc[e.combine]||`ENVMAP_BLENDING_NONE`}function fc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=sc(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=lc(n),d=dc(n),f=qs(n),p=Js(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Xs).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Xs).join(`
`),g.length>0&&(g+=`
`)):(h=[ac(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Xs).join(`
`),g=[ac(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:U.tonemapping_pars_fragment,n.toneMapping===0?``:Ws(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,U.colorspace_pars_fragment,Hs(`linearToOutputTexel`,n.outputColorSpace),Ks(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Xs).join(`
`)),o=ec(o),o=Zs(o,n),o=Qs(o,n),s=ec(s),s=Zs(s,n),s=Qs(s,n),o=rc(o),s=rc(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=Fs(i,i.VERTEX_SHADER,v),x=Fs(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Vs(i,b,`vertex`),n=Vs(i,x,`fragment`);z(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):R(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new Ps(i,m),w=Ys(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,Is)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ls++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var pc=0,mc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new hc(e),t.set(e,n)),n}},hc=class{constructor(e){this.id=pc++,this.code=e,this.usedTimes=0}};function gc(e){return e===1030||e===37490||e===36285}function _c(e,t,n,r,i,a){let o=new nn,s=new mc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&R(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=Wa[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),ee=m.isInstancedMesh===!0,M=m.isBatchedMesh===!0,te=!!i.map,ne=!!i.matcap,re=!!b,ie=re&&b.isPMREMTexture===!0,ae=!!i.aoMap,oe=!!i.lightMap,se=!!i.bumpMap&&i.wireframe===!1,ce=!!i.normalMap,le=!!i.displacementMap,ue=!!i.emissiveMap,N=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.diffuseRoughness>0,he=i.dispersion>0,ge=i.retroreflectivity>0,_e=i.iridescence>0,ve=i.sheen>0,ye=i.transmission>0,be=fe&&!!i.anisotropyMap,xe=pe&&!!i.clearcoatMap,Se=pe&&!!i.clearcoatNormalMap,Ce=pe&&!!i.clearcoatRoughnessMap,we=me&&!!i.diffuseRoughnessMap,Te=_e&&!!i.iridescenceMap,Ee=_e&&!!i.iridescenceThicknessMap,De=ve&&!!i.sheenColorMap,Oe=ve&&!!i.sheenRoughnessMap,ke=!!i.specularMap,Ae=!!i.specularColorMap,je=!!i.specularIntensityMap,Me=ye&&!!i.transmissionMap,Ne=ye&&!!i.thicknessMap,Pe=!!i.gradientMap,Fe=!!i.alphaMap,P=i.alphaTest>0,Ie=!!i.alphaHash,Le=!!i.extensions,Re=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Re=e.toneMapping);let F=ie?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,ze={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:M,batchingColor:M&&m._colorsTexture!==null,instancing:ee,instancingColor:ee&&m.instanceColor!==null,instancingMorph:ee&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:kt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:ne,envMap:re,envMapMode:re&&b.mapping,envMapPMREM:ie,envMapMaxLod:ie?F.length-1:null,envMapSize:ie?F[0].width:null,aoMap:ae,lightMap:oe,bumpMap:se,normalMap:ce,displacementMap:le,emissiveMap:ue,normalMapObjectSpace:ce&&i.normalMapType===1,normalMapTangentSpace:ce&&i.normalMapType===0,packedNormalMap:ce&&i.normalMapType===0&&gc(i.normalMap.format),metalnessMap:N,roughnessMap:de,anisotropy:fe,anisotropyMap:be,clearcoat:pe,clearcoatMap:xe,clearcoatNormalMap:Se,clearcoatRoughnessMap:Ce,diffuseRoughness:me,diffuseRoughnessMap:we,dispersion:he,retroreflection:ge,iridescence:_e,iridescenceMap:Te,iridescenceThicknessMap:Ee,sheen:ve,sheenColorMap:De,sheenRoughnessMap:Oe,specularMap:ke,specularColorMap:Ae,specularIntensityMap:je,transmission:ye,transmissionMap:Me,thicknessMap:Ne,gradientMap:Pe,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Fe,alphaTest:P,alphaHash:Ie,combine:i.combine,mapUv:te&&p(i.map.channel),aoMapUv:ae&&p(i.aoMap.channel),lightMapUv:oe&&p(i.lightMap.channel),bumpMapUv:se&&p(i.bumpMap.channel),normalMapUv:ce&&p(i.normalMap.channel),displacementMapUv:le&&p(i.displacementMap.channel),emissiveMapUv:ue&&p(i.emissiveMap.channel),metalnessMapUv:N&&p(i.metalnessMap.channel),roughnessMapUv:de&&p(i.roughnessMap.channel),anisotropyMapUv:be&&p(i.anisotropyMap.channel),clearcoatMapUv:xe&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:Se&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:we&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:Te&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ee&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:De&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&p(i.sheenRoughnessMap.channel),specularMapUv:ke&&p(i.specularMap.channel),specularColorMapUv:Ae&&p(i.specularColorMap.channel),specularIntensityMapUv:je&&p(i.specularIntensityMap.channel),transmissionMapUv:Me&&p(i.transmissionMap.channel),thicknessMapUv:Ne&&p(i.thicknessMap.channel),alphaMapUv:Fe&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(ce||fe),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(te||Fe),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&ce===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Re,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&kt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ue&&i.emissiveMap.isVideoTexture===!0&&kt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Le&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Le&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return ze.vertexUv1s=c.has(1),ze.vertexUv2s=c.has(2),ze.vertexUv3s=c.has(3),c.clear(),ze}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=Wa[t];n=xi.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new fc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function vc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function yc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function bc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function xc(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||yc),r.length>1&&r.sort(t||bc),i.length>1&&i.sort(t||bc)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Sc(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new xc,e.set(t,[i])):n>=r.length?(i=new xc,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Cc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new V,color:new Dn};break;case`SpotLight`:n={position:new V,direction:new V,color:new Dn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new V,color:new Dn,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new V,skyColor:new Dn,groundColor:new Dn};break;case`RectAreaLight`:n={color:new Dn,position:new V,halfWidth:new V,halfHeight:new V}}return e[t.id]=n,n}}}function wc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Tc=0;function Ec(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Dc(e){let t=new Cc,n=wc(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new V);let i=new V,a=new Gt,o=new Gt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Ec);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=W.LTC_FLOAT_1,r.rectAreaLTC2=W.LTC_FLOAT_2):(r.rectAreaLTC1=W.LTC_HALF_1,r.rectAreaLTC2=W.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Tc++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Oc(e){let t=new Dc(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function kc(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Oc(e),t.set(n,[a])):r>=i.length?(a=new Oc(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Ac=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jc=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Mc=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],Nc=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],Pc=new Gt,Fc=new V,Ic=new V;function Lc(e,t,n){let r=new ei,i=new B,a=new B,o=new Bt,s=new Di,c=new Oi,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},p=new wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new B},radius:{value:4}},vertexShader:Ac,fragmentShader:jc}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let g=new Cr;g.setAttribute(`position`,new cr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new qr(g,p),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let y=this.type;this.render=function(t,n,s){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||t.length===0)return;this.type===2&&(R(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=y!==this.type;m&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){R(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let g=d.getFrameExtents();i.multiply(g),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/g.x),i.x=a.x*g.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/g.y),i.y=a.y*g.y,d.mapSize.y=a.y));let _=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=_,d.map===null||m===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){R(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Ht(i.x,i.y,{format:ae,type:T,minFilter:h,magFilter:h,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new ai(i.x,i.y,w),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=te,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f}else l.isPointLight?(d.map=new $a(i.x),d.map.depthTexture=new oi(i.x,C)):(d.map=new Ht(i.x,i.y),d.map.depthTexture=new ai(i.x,i.y,C)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=te,this.type===1?(d.map.depthTexture.compareFunction=_?518:515,d.map.depthTexture.minFilter=h,d.map.depthTexture.magFilter=h):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let v=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let y=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<v;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Fc.setFromMatrixPosition(l.matrixWorld),e.position.copy(Fc),Ic.copy(e.position),Ic.add(Mc[t]),e.up.copy(Nc[t]),e.lookAt(Ic),e.updateMatrixWorld(),n.makeTranslation(-Fc.x,-Fc.y,-Fc.z),Pc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Pc,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),p.viewport(o)}r=d.getFrustum(t),S(n,s,i,l,y,this.type)}d.isPointLightShadow!==!0&&this.type===3&&b(d,s),d.needsUpdate=!1}y=this.type,v.needsUpdate=!1,e.setRenderTarget(c,l,d)};function b(n,r){let a=t.update(_);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null?n.mapPass=new Ht(i.x,i.y,{format:ae,type:T}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),p.uniforms.shadow_pass.value=n.map.depthTexture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,p,_,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,m,_,null)}function x(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function S(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=x(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=x(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)S(l[e],i,a,o,s,c)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Rc(e,t){function n(){let t=!1,n=new Bt,r=null,i=new Bt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?N(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=lt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?N(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Dn(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,te=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),M=te>=2):(te=parseFloat(/^WebGL (\d)/.exec(ne)[1]),M=te>=1);let re=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),se=new Bt().fromArray(ae),ce=new Bt().fromArray(oe);function le(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ue={};ue[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),N(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),N(e.CULL_FACE),_e(0);function N(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h!==t&&(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(de(e.BLEND),g=!1);else if(g===!1&&(N(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:z(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:z(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:z(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:z(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?de(e.CULL_FACE):N(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?N(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?de(e.CULL_FACE):(N(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function xe(t){t!==k&&(M&&e.lineWidth(t),k=t)}function Se(t,n,r){t?(N(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function Ce(t){t?N(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+ee-1),re!==t&&(e.activeTexture(t),re=t)}function Te(t,n,r){r===void 0&&(r=re===null?e.TEXTURE0+ee-1:re);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(re!==r&&(e.activeTexture(r),re=r),e.bindTexture(t,n||ue[t]),i.type=t,i.texture=n)}function Ee(){let t=ie[re];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Oe(){try{e.compressedTexImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function ke(){try{e.texSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ae(){try{e.texSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ne(){try{e.texStorage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Pe(){try{e.texStorage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Fe(){try{e.texImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function P(){try{e.texImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ie(t){return d[t]===void 0?e.getParameter(t):d[t]}function Le(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Re(t){se.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),se.copy(t))}function F(t){ce.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ce.copy(t))}function ze(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function I(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function L(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},re=null,ie={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Dn(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,se.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:N,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:we,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:Fe,texImage3D:P,pixelStorei:Le,getParameter:Ie,updateUBOMapping:ze,uniformBlockBinding:I,texStorage2D:Ne,texStorage3D:Pe,texSubImage2D:ke,texSubImage3D:Ae,compressedTexSubImage2D:je,compressedTexSubImage3D:Me,scissor:Re,viewport:F,reset:L}}function zc(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new B,y=new WeakMap,b=new Set,x,S=new WeakMap,C=new Set,w=new FinalizationRegistry(e=>C.delete(e)),T=!1;try{T=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function E(e,t){return T?new OffscreenCanvas(e,t):nt(`canvas`)}function D(e,t,n){let r=1,i=L(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=E(n,a));let o=t?E(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),R(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&R(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function O(e){return e.generateMipmaps}function k(t){e.generateMipmap(t)}function A(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function j(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];R(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||R(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ye:kt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function ee(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,R(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function M(e,t){return O(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function te(e){let t=new WeakRef(e);r.get(e).__ref=t,C.add(t),w.register(e,t,t)}function re(e){let t=r.get(e).__ref;t!==void 0&&(C.delete(t),w.unregister(t))}function ie(e){oe(e.target)}function ae(e){se(e.target)}function oe(e){e.removeEventListener(`dispose`,ie),re(e),le(e),e.isVideoTexture&&y.delete(e),e.isHTMLTexture&&b.delete(e)}function se(e){e.removeEventListener(`dispose`,ae),re(e),N(e)}function ce(){for(let e of C){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?se(t):oe(t))}C.clear(),b.clear()}function le(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=S.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&ue(e),Object.keys(i).length===0&&S.delete(n)}r.remove(e)}function ue(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=S.get(i);delete a[n.__cacheKey],o.memory.textures--}function N(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&oe(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let de=0;function fe(){de=0}function pe(){return de}function me(e){de=e}function he(){let e=de;return e>=i.maxTextures&&R(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),de+=1,e}function ge(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function _e(t,i){let a=r.get(t);if(t.isVideoTexture&&ze(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)R(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)R(`WebGLRenderer: Texture marked for update but image is incomplete`);else{Oe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ve(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?Oe(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function ye(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?Oe(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function be(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?ke(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let xe={[l]:e.REPEAT,[u]:e.CLAMP_TO_EDGE,[d]:e.MIRRORED_REPEAT},Se={[f]:e.NEAREST,[p]:e.NEAREST_MIPMAP_NEAREST,[m]:e.NEAREST_MIPMAP_LINEAR,[h]:e.LINEAR,[g]:e.LINEAR_MIPMAP_NEAREST,[_]:e.LINEAR_MIPMAP_LINEAR},Ce={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function we(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&R(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,xe[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,xe[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,xe[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,Se[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,Se[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,Ce[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function Te(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,ie),te(n));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let s=ge(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&ue(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function Ee(e,t,n){return Math.floor(Math.floor(e/n)/t)}function De(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=Ee(n.start,r.width,4),c=Ee(t.start,r.width,4);n.start<=i+1&&a===c&&Ee(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function Oe(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=Te(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let d=r.get(u);if(u.version!==d.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=kt.getPrimaries(kt.workingColorSpace),r=o.colorSpace===``?null:kt.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=D(o.image,!1,i.maxTextureSize);t=I(o,t);let r=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=j(o.internalFormat,r,f,o.normalized,o.colorSpace,o.isVideoTexture);we(c,o);let m,h=o.mipmaps,g=o.isVideoTexture!==!0,_=d.__version===void 0||l===!0,v=u.dataReady,y=M(o,t);if(o.isDepthTexture)p=ee(o.format===ne,o.type),_&&(g?n.texStorage2D(e.TEXTURE_2D,1,p,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,null));else if(o.isDataTexture){if(h.length>0){g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data);o.generateMipmaps=!1}else g?(_&&n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height),v&&De(o,t,r,f)):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){g&&_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,h[0].width,h[0].height,t.depth);for(let i=0,a=h.length;i<a;i++)if(m=h[i],o.format!==1023){if(r!==null){if(g){if(v){if(o.layerUpdates.size>0){let t=Ba(m.width,m.height,o.format,o.type);for(let a of o.layerUpdates){let o=m.data.subarray(a*t/m.data.BYTES_PER_ELEMENT,(a+1)*t/m.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,m.width,m.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,m.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,m.data,0,0)}else R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,f,m.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,r,f,m.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],o.format===1023?g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data):r===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,m.data):n.compressedTexImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,m.data)}}else if(o.isDataArrayTexture){if(g){if(_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,t.width,t.height,t.depth),v){if(o.layerUpdates.size>0){let i=Ba(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,f,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,p,t.width,t.height,t.depth,0,r,f,t.data)}else if(o.isData3DTexture)g?(_&&n.texStorage3D(e.TEXTURE_3D,y,p,t.width,t.height,t.depth),v&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)):n.texImage3D(e.TEXTURE_3D,0,p,t.width,t.height,t.depth,0,r,f,t.data);else if(o.isFramebufferTexture){if(_){if(g)n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<y;t++)n.texImage2D(e.TEXTURE_2D,t,p,i,a,0,r,f,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),b.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=L(h[0]);n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height)}for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,f,m):n.texImage2D(e.TEXTURE_2D,t,p,r,f,m);o.generateMipmaps=!1}else if(g){if(_){let r=L(t);n.texStorage2D(e.TEXTURE_2D,y,p,r.width,r.height)}v&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,f,t)}else n.texImage2D(e.TEXTURE_2D,0,p,r,f,t);O(o)&&o.mipmapsAutoUpdate===!0&&k(c),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ke(t,o,s){if(o.image.length!==6)return;let c=Te(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=kt.getPrimaries(kt.workingColorSpace),r=o.colorSpace===``?null:kt.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=D(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=I(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),v=j(o.internalFormat,g,_,o.normalized,o.colorSpace),y=o.isVideoTexture!==!0,b=u.__version===void 0||c===!0,x=l.dataReady,S=M(o,h);we(e.TEXTURE_CUBE_MAP,o);let C;if(o.isDepthTexture){if(v=ee(o.format===ne,o.type),b){if(y)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,v,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,h.width,h.height,0,g,_,null)}}else if(f){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=m[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];o.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=o.mipmaps,y&&b){C.length>0&&S++;let t=L(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(p){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,m[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}O(o)&&o.mipmapsAutoUpdate===!0&&k(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Ae(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=j(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),F(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Re(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function je(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=ee(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;F(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Re(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Re(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=j(o.internalFormat,c,l,o.normalized,o.colorSpace);F(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Re(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Re(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Me(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?be(i.depthTexture,0):_e(i.depthTexture,0);let u=c.__webglTexture,d=Re(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)F(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)F(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ne(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Me(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?Me(i.__webglFramebuffer[0],t,0):Me(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),je(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),je(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Pe(t,n,i){let a=r.get(t);n!==void 0&&Ae(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Ne(t)}function Fe(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,ae),te(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&F(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=j(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Re(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),je(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),we(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Ae(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Ae(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);O(i)?k(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),we(c,a),Ae(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),O(a)&&k(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),we(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Ae(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Ae(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);O(i)?k(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&Ne(t)}function P(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(O(a)&&a.mipmapsAutoUpdate===!0){let t=A(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),k(t),n.unbindTexture()}}}let Ie=[];function Le(t){if(t.samples>0){if(F(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ie.length=0,Ie.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Ie.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ie))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Re(e){return Math.min(i.maxSamples,e.samples)}function F(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function ze(e){let t=o.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function I(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(kt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&R(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):z(`WebGLTextures: Unsupported texture color space:`,n)),t}function L(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=he,this.resetTextureUnits=fe,this.getTextureUnits=pe,this.setTextureUnits=me,this.setTexture2D=_e,this.setTexture2DArray=ve,this.setTexture3D=ye,this.setTextureCube=be,this.rebindTextures=Pe,this.setupRenderTarget=Fe,this.updateRenderTargetMipmap=P,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=F,this.dispose=ce}function Bc(e,t){function n(n,r=``){let i,a=kt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Vc=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hc=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Uc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new si(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new wi({vertexShader:Vc,fragmentShader:Hc,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qr(new pi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Wc=class extends ut{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Uc,g={},_=t.getContextAttributes(),y=null,b=null,x=[],S=[],w=new B,T=null,E=null,D=new ha;D.viewport=new Bt;let k=new ha;k.viewport=new Bt;let A=[D,k],j=new Ca,ee=null,re=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=x[e];return t===void 0&&(t=new Sn,x[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=x[e];return t===void 0&&(t=new Sn,x[e]=t),t.getGripSpace()},this.getHand=function(e){let t=x[e];return t===void 0&&(t=new Sn,x[e]=t),t.getHandSpace()};function ie(e){let t=S.indexOf(e.inputSource);if(t===-1)return;let n=x[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ae(){r.removeEventListener(`select`,ie),r.removeEventListener(`selectstart`,ie),r.removeEventListener(`selectend`,ie),r.removeEventListener(`squeeze`,ie),r.removeEventListener(`squeezestart`,ie),r.removeEventListener(`squeezeend`,ie),r.removeEventListener(`end`,ae),r.removeEventListener(`inputsourceschange`,oe);for(let e=0;e<x.length;e++){let t=S[e];t!==null&&(S[e]=null,x[e].disconnect(t))}ee=null,re=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(y),f=null,d=null,u=null,r=null,b=null,N.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(w.width,w.height,!1),E!==null){let e=E.camera;e.fov=E.fov,e.zoom=E.zoom,e.updateProjectionMatrix(),E=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(y=e.getRenderTarget(),r.addEventListener(`select`,ie),r.addEventListener(`selectstart`,ie),r.addEventListener(`selectend`,ie),r.addEventListener(`squeeze`,ie),r.addEventListener(`squeezestart`,ie),r.addEventListener(`squeezeend`,ie),r.addEventListener(`end`,ae),r.addEventListener(`inputsourceschange`,oe),_.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(w),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?ne:te,a=_.stencil?O:C);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Ht(d.textureWidth,d.textureHeight,{format:M,type:v,depthTexture:new ai(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Ht(f.framebufferWidth,f.framebufferHeight,{format:M,type:v,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),N.setContext(r),N.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function oe(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=S.indexOf(n);r>=0&&(S[r]=null,x[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=S.indexOf(n);if(r===-1){for(let e=0;e<x.length;e++)if(e>=S.length){S.push(n),r=e;break}else if(S[e]===null){S[e]=n,r=e;break}if(r===-1)break}let i=x[r];i&&i.connect(n)}}function se(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),j.near=k.near=D.near=t,j.far=k.far=D.far=n,(ee!==j.near||re!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),ee=j.near,re=j.far),j.layers.mask=e.layers.mask|6,D.layers.mask=j.layers.mask&-5,k.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;se(j,i);for(let e=0;e<a.length;e++)se(a[e],i);j.projectionMatrix.copy(D.projectionMatrix),j.projectionMatrixInverse.copy(D.projectionMatrixInverse),E===null&&e.isPerspectiveCamera&&(E={camera:e,fov:e.fov,zoom:e.zoom}),ce(e,j,i)};function ce(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=pt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(j)},this.getCameraTexture=function(e){return g[e]};let le=null;function ue(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(b,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(b))}let o=A[n];o===void 0&&(o=new ha,o.layers.enable(n),o.viewport=new Bt,A[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new si,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<x.length;e++){let t=S[e],n=x[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}le&&le(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let N=new Ha;N.setAnimationLoop(ue),this.setAnimationLoop=function(e){le=e},this.dispose=function(){}}},Gc=new Gt,Kc=new H;Kc.set(-1,0,0,0,1,0,0,0,1);function qc(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,bi(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Gc.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Kc),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Jc(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?R(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):R(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var Yc=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Xc=null;function Zc(){return Xc===null&&(Xc=new Xr(Yc,16,16,ae,T),Xc.name=`DFG_LUT`,Xc.minFilter=h,Xc.magFilter=h,Xc.wrapS=u,Xc.wrapT=u,Xc.generateMipmaps=!1,Xc.needsUpdate=!0),Xc}var Qc=class{constructor(e={}){let{canvas:t=rt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=v}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([se,oe,ie]),g=new Set([v,C,x,O,E,D]),y=new Uint32Array(4),b=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]},w=null,k=null,A=[],j=[],ee=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,te=!1,ne=null,re=null,ae=null,ce=null;this._outputColorSpace=qe;let le=0,ue=0,N=null,de=-1,fe=null,pe=new Bt,me=new Bt,he=null,ge=new Dn(0),_e=0,ve=t.width,ye=t.height,be=1,xe=null,Se=null,Ce=new Bt(0,0,ve,ye),we=new Bt(0,0,ve,ye),Te=!1,Ee=new ei,De=new ni,Oe=!1,ke=!1,Ae=new Gt,je=new V,Me=new Bt,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Pe=!1;function Fe(){return N===null?be:1}let P=n;function Ie(e,n){return t.getContext(e,n)}let Le,Re,F,ze,I,L,Be,Ve,He,Ue,We,Ge,Ke,Je,Ye,Xe,Ze,Qe,et,tt,nt,it,ot;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,ut,!1),t.addEventListener(`webglcontextrestored`,dt,!1),t.addEventListener(`webglcontextcreationerror`,ft,!1),P===null){let t=`webgl2`;if(P=Ie(t,e),P===null)throw Ie(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}st()}catch(e){throw t.removeEventListener(`webglcontextlost`,ut,!1),t.removeEventListener(`webglcontextrestored`,dt,!1),t.removeEventListener(`webglcontextcreationerror`,ft,!1),z(`WebGLRenderer: `+e.message),e}function st(){Le=new vo(P),Le.init(),nt=new Bc(P,Le),Re=new Za(P,Le,e,nt),F=new Rc(P,Le),Re.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),re=P.createFramebuffer(),ae=P.createFramebuffer(),ce=P.createFramebuffer(),ze=new xo(P),I=new vc,L=new zc(P,Le,F,I,Re,nt,ze),Be=new _o(M),Ve=new Ua(P),it=new Ya(P,Ve),He=new yo(P,Ve,ze,it),Ue=new Co(P,He,Ve,it,ze),Qe=new So(P,Re,L),Ye=new Qa(I),We=new _c(M,Be,Le,Re,it,Ye),Ge=new qc(M,I),Ke=new Sc,Je=new kc(Le),Ze=new Ja(M,Be,F,Ue,p,s),Xe=new Lc(M,Ue,Re),ot=new Jc(P,ze,Re,F),et=new Xa(P,Le,ze),tt=new bo(P,Le,ze),ze.programs=We.programs,M.capabilities=Re,M.extensions=Le,M.properties=I,M.renderLists=Ke,M.shadowMap=Xe,M.state=F,M.info=ze}m!==1009&&(ee=new To(m,t.width,t.height,o,r,i));let lt=new Wc(M,P);this.xr=lt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Le.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Le.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return be},this.setPixelRatio=function(e){e!==void 0&&(be=e,this.setSize(ve,ye,!1))},this.getSize=function(e){return e.set(ve,ye)},this.setSize=function(e,n,r=!0){lt.isPresenting?R(`WebGLRenderer: Can't change size while VR device is presenting.`):(ve=e,ye=n,t.width=Math.floor(e*be),t.height=Math.floor(n*be),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),ee!==null&&ee.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ve*be,ye*be).floor()},this.setDrawingBufferSize=function(e,n,r){ve=e,ye=n,be=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)z(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){R(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}ee.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(pe)},this.getViewport=function(e){return e.copy(Ce)},this.setViewport=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),F.viewport(pe.copy(Ce).multiplyScalar(Fe()).round())},this.getScissor=function(e){return e.copy(we)},this.setScissor=function(e,t,n,r){e.isVector4?we.set(e.x,e.y,e.z,e.w):we.set(e,t,n,r),F.scissor(me.copy(we).multiplyScalar(Fe()).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(e){F.setScissorTest(Te=e)},this.setOpaqueSort=function(e){xe=e},this.setTransparentSort=function(e){Se=e},this.getClearColor=function(e){return e.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor(...arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Ze.getClearColor(),r=Ze.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(y[0]=i,y[1]=a,y[2]=o,y[3]=r,P.clearBufferuiv(P.COLOR,0,y)):(b[0]=i,b[1]=a,b[2]=o,b[3]=r,P.clearBufferiv(P.COLOR,0,b))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),ne=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ut,!1),t.removeEventListener(`webglcontextrestored`,dt,!1),t.removeEventListener(`webglcontextcreationerror`,ft,!1),Ze.dispose(),Ke.dispose(),Je.dispose(),L.dispose(),I.dispose(),Be.dispose(),Ue.dispose(),He.dispose(),it.dispose(),ot.dispose(),We.dispose(),lt.dispose(),lt.removeEventListener(`sessionstart`,yt),lt.removeEventListener(`sessionend`,bt),xt.stop()};function ut(e){e.preventDefault(),at(`WebGLRenderer: Context Lost.`),te=!0}function dt(){at(`WebGLRenderer: Context Restored.`),te=!1;let e=ze.autoReset,t=Xe.enabled,n=Xe.autoUpdate,r=Xe.needsUpdate,i=Xe.type;st(),ze.autoReset=e,Xe.enabled=t,Xe.autoUpdate=n,Xe.needsUpdate=r,Xe.type=i}function ft(e){z(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function pt(e){let t=e.target;t.removeEventListener(`dispose`,pt),mt(t)}function mt(e){ht(e),I.remove(e)}function ht(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){We.releaseProgram(e)}),e.isShaderMaterial&&We.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Ne);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=jt(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=He.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;it.setup(i,r,s,n,c);let h,g=et;if(c!==null&&(h=Ve.get(c),g=tt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*Fe()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*Fe()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh){if(Le.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ve.get(c).bytesPerElement:1,o=I.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function gt(e,t,n,r){ne!==null&&e.isNodeMaterial&&ne.setObject(r,e),Oe===!0&&Ye.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Et(e,t,r),e.side=0,e.needsUpdate=!0,Et(e,t,r),e.side=2):Et(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),ne!==null&&ne.renderStart(e,t,n),k=Je.get(n),k.init(t),j.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),ne!==null&&ne.updateLights(k.state.lightsArray),ke=this.localClippingEnabled,Oe=Ye.init(this.clippingPlanes,ke),Oe===!0&&Ye.setGlobalState(this.clippingPlanes,t),ne!==null&&Xe.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];gt(o,n,t,e),r.add(o)}else gt(i,n,t,e),r.add(i)}}),k=j.pop(),ne!==null&&ne.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=I.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Le.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let _t=null;function vt(e){_t&&_t(e)}function yt(){xt.stop()}function bt(){xt.start()}let xt=new Ha;xt.setAnimationLoop(vt),typeof self<`u`&&xt.setContext(self),this.setAnimationLoop=function(e){_t=e,lt.setAnimationLoop(e),e===null?xt.stop():xt.start()},lt.addEventListener(`sessionstart`,yt),lt.addEventListener(`sessionend`,bt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){z(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(te===!0)return;ne!==null&&ne.renderStart(e,t);let n=lt.enabled===!0&&lt.isPresenting===!0,r=ee!==null&&(N===null||n)&&ee.begin(M,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(ee===null||ee.isCompositing()===!1)&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(t),t=lt.getCamera()),e.isScene===!0&&e.onBeforeRender(M,e,t,N),k=Je.get(e,j.length),k.init(t),k.state.textureUnits=L.getTextureUnits(),j.push(k),Ae.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?De.setFromArrayCamera(t):Ee.setFromProjectionMatrix(Ae,$e,t.reversedDepth),ke=this.localClippingEnabled,Oe=Ye.init(this.clippingPlanes,ke),w=Ke.get(e,A.length),w.init(),A.push(w),this.info.render.frame++,lt.enabled===!0&&lt.isPresenting===!0){let e=M.xr.getDepthSensingMesh();e!==null&&B(e,t,-1/0,M.sortObjects)}B(e,t,0,M.sortObjects),w.finish(),ne!==null&&ne.updateLights(k.state.lightsArray),M.sortObjects===!0&&w.sort(xe,Se),Pe=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,Pe&&Ze.addToRenderList(w,e),this.info.autoReset===!0&&this.info.reset(),Oe===!0&&Ye.beginShadows();let i=k.state.shadowsArray;if(Xe.render(i,e,t),Oe===!0&&Ye.endShadows(),(r&&ee.hasRenderPass())===!1){let n=w.opaque,r=w.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Ct(n,r,e,a)}Pe&&Ze.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];St(w,e,n,n.viewport)}}else r.length>0&&Ct(n,r,e,t),Pe&&Ze.render(e),St(w,e,t)}N!==null&&ue===0&&(L.updateMultisampleRenderTarget(N),L.updateRenderTargetMipmap(N)),r&&ee.end(M),e.isScene===!0&&e.onAfterRender(M,e,t),it.resetDefaultState(),de=-1,fe=null,j.pop(),j.length>0?(k=j[j.length-1],L.setTextureUnits(k.state.textureUnits),Oe===!0&&Ye.setGlobalState(M.clippingPlanes,k.state.camera)):k=null,A.pop(),w=A.length>0?A[A.length-1]:null,ne!==null&&ne.renderEnd()};function B(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?De:Ee;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&Me.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ae);let i=Ue.update(e),a=e.material;a.visible&&w.push(e,i,a,n,Me.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?De:Ee;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Ue.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Me.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Me.copy(e.boundingSphere.center)),Me.applyMatrix4(e.matrixWorld).applyMatrix4(Ae)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&w.push(e,i,c,n,Me.z,s,t)}}else a.visible&&w.push(e,i,a,n,Me.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)B(i[e],t,n,r)}function St(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),Oe===!0&&Ye.setGlobalState(M.clippingPlanes,n),r&&F.viewport(pe.copy(r)),i.length>0&&wt(i,t,n),a.length>0&&wt(a,t,n),o.length>0&&wt(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function Ct(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Le.has(`EXT_color_buffer_half_float`)||Le.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new Ht(1,1,{generateMipmaps:!0,type:e?T:v,minFilter:_,samples:Math.max(4,Re.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:kt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||pe;a.setSize(o.z*M.transmissionResolutionScale,o.w*M.transmissionResolutionScale);let s=M.getRenderTarget(),c=M.getActiveCubeFace(),l=M.getActiveMipmapLevel();M.setRenderTarget(a),M.getClearColor(ge),_e=M.getClearAlpha(),_e<1&&M.setClearColor(16777215,.5),M.clear(),Pe&&Ze.render(n);let u=M.toneMapping;M.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),Oe===!0&&Ye.setGlobalState(M.clippingPlanes,r),wt(e,n,r),L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a),Le.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,H(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a))}M.setRenderTarget(s,c,l),M.setClearColor(ge,_e),d!==void 0&&(r.viewport=d),M.toneMapping=u}function wt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&H(o,t,n,s,l,c)}}function H(e,t,n,r,i,a){ne!==null&&i.isNodeMaterial&&ne.setObject(e,i),e.onBeforeRender(M,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(M,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,M.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,M.renderBufferDirect(n,t,r,i,e,a),i.side=2):M.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(M,t,n,r,i,a)}function Tt(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function Et(e,t,n){t.isScene!==!0&&(t=Ne);let r=I.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=We.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=We.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Be.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,pt),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return At(e,s),d}else s.uniforms=We.getUniforms(e),ne!==null&&e.isNodeMaterial&&ne.build(e,n,s),e.onBeforeCompile(s,M),d=We.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ye.uniform),At(e,s),r.needsLights=Nt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=Tt(k.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function Dt(e,t,n,r,i){let a=I.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=Et(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function Ot(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Ps.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function At(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function jt(e,t,n,r,i){t.isScene!==!0&&(t=Ne),L.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?M.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:kt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Be.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=M.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=I.get(r),y=k.state.lights;if(Oe===!0&&(ke===!0||e!==fe)){let t=e===fe&&r.id===de;Ye.setState(r,e,t)}let b=!1,x=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ye.numPlanes||v.numIntersection!==Ye.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===Tt(k.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(x=!0):b=!0:b=!0:(b=!0,v.__version=r.version);let C=v.currentProgram;(b===!0||x===!0)&&(C=x===!0?Dt(r,t,i,s,h):Et(r,t,i),ne&&r.isNodeMaterial&&ne.onUpdateProgram(r,C,v));let w=!1,T=!1,E=!1,D=C.getUniforms(),O=v.uniforms;if(F.useProgram(C.program)&&(w=!0,T=!0,E=!0),r.id!==de&&(de=r.id,T=!0),w||fe!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),D.setValue(P,`projectionMatrix`,e.projectionMatrix),D.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=D.map.cameraPosition;t!==void 0&&t.setValue(P,je.setFromMatrixPosition(e.matrixWorld)),Re.logarithmicDepthBuffer&&D.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&D.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),fe!==e&&(fe=e,T=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&D.setValue(P,`sunShadowMap`,y.state.sunShadowMap,L),y.state.directionalShadowMap.length>0&&D.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,L),y.state.spotShadowMap.length>0&&D.setValue(P,`spotShadowMap`,y.state.spotShadowMap,L),y.state.pointShadowMap.length>0&&D.setValue(P,`pointShadowMap`,y.state.pointShadowMap,L)),i.isSkinnedMesh){D.setOptional(P,i,`bindMatrix`),D.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),D.setValue(P,`boneTexture`,e.boneTexture,L))}i.isBatchedMesh&&(D.setOptional(P,i,`batchingTexture`),D.setValue(P,`batchingTexture`,i._matricesTexture,L),D.setOptional(P,i,`batchingIdTexture`),D.setValue(P,`batchingIdTexture`,i._indirectTexture,L),D.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&D.setValue(P,`batchingColorTexture`,i._colorsTexture,L));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Qe.update(i,n,C),(T||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,D.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(O.envMapIntensity.value=t.environmentIntensity),O.dfgLUT!==void 0&&(O.dfgLUT.value=Zc()),T){if(D.setValue(P,`toneMappingExposure`,M.toneMappingExposure),v.needsLights&&Mt(O,E),a&&r.fog===!0&&Ge.refreshFogUniforms(O,a),Ge.refreshMaterialUniforms(O,r,be,ye,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=S,t=0;for(let n of k.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;O.probesSH.value=e.textures,O.probesMin.value=e.min,O.probesMax.value=e.max,O.probesResolution.value=e.resolution}Ps.upload(P,Ot(v),O,L)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Ps.upload(P,Ot(v),O,L),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&D.setValue(P,`center`,i.center),D.setValue(P,`modelViewMatrix`,i.modelViewMatrix),D.setValue(P,`normalMatrix`,i.normalMatrix),D.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];ot.update(n,C),ot.bind(n,C)}}return C}function Mt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Nt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return le},this.getActiveMipmapLevel=function(){return ue},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=I.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,le=t,ue=n;let r=null,i=!1,a=!1;if(e){let o=I.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),pe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest,F.viewport(pe),F.scissor(me),F.setScissorTest(he),de=-1;return}if(o.__webglFramebuffer===void 0)L.setupRenderTarget(e);else if(o.__hasExternalTextures)L.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&I.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);L.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&L.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,pe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest}else pe.copy(Ce).multiplyScalar(be).floor(),me.copy(we).multiplyScalar(be).floor(),he=Te;if(n!==0&&(r=re),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(pe),F.scissor(me),F.setScissorTest(he),i){let r=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=I.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}de=-1};function Pt(e){let t=I.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Re.textureFormatReadable(e.format),t.__typeReadable=Re.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let u=Pt(o);if(u.__formatReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,nt.convert(c),nt.convert(l),a)}finally{let e=N===null?null:I.get(N).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let d=Pt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,nt.convert(l),nt.convert(u),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let p=N===null?null:I.get(N).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,p);let m=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await ct(P,m,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(f),P.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;L.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=nt.convert(t.format),_=nt.convert(t.type),v;t.isData3DTexture?(L.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(L.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(L.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=I.get(e),r=I.get(t),h=I.get(n.__renderTarget),g=I.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||I.has(e)){let n=I.get(e),r=I.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,ae),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,ce);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){I.get(e).__webglFramebuffer===void 0&&L.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?L.setTextureCube(e,0):e.isData3DTexture?L.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?L.setTexture2DArray(e,0):L.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){le=0,ue=0,N=null,F.reset(),it.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return $e}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=kt._getDrawingBufferColorSpace(e),t.unpackColorSpace=kt._getUnpackColorSpace()}},$c=4.5,el=3e4,tl=2.6,nl=.35,rl=[`cheers`,`laugh`,`clap`,`heart`,`wow`,`wave`],il={cheers:`🥂`,laugh:`😂`,clap:`👏`,heart:`❤️`,wow:`😮`,wave:`👋`},al=[`bear`,`cat`,`penguin`,`rabbit`],ol={bear:`녹초 된 곰`,cat:`졸린 고양이`,penguin:`퇴근한 펭귄`,rabbit:`야근한 토끼`},sl=[`#c98b5a`,`#f2e6d0`,`#5b5f6b`,`#e9a8b8`,`#8fb8a0`,`#9fb4e0`,`#f0c75e`,`#3a3236`],cl=[`none`,`wine`,`beret`,`ribbon`],ll={none:`없음`,wine:`와인잔`,beret:`베레모`,ribbon:`리본`},ul={kind:`bear`,color:0,prop:`none`},dl={charging:`충전 중 · 말 걸어도 돼요`,low:`방전 · 구경만 할래요`},fl=[`lobby`,`garden`,`face`,`toy`,`pond`],pl={x0:0,x1:12*fl.length,z0:-5,z1:5},ml=[12,24,36,48],hl=[{x0:3.2,x1:8.8,z0:-3.9,z1:-3.1},...[1,2,3,4].map(e=>({x0:e*12+4.6,x1:e*12+7.4,z0:.9,z1:1.6}))],gl={x:6,z:1.5};function _l(e){return fl[Math.max(0,Math.min(fl.length-1,Math.floor(e/12)))]}function vl(e,t,n){return e.x>t.x0-n&&e.x<t.x1+n&&e.z>t.z0-n&&e.z<t.z1+n}function yl(e,t=nl){if(!Number.isFinite(e.x)||!Number.isFinite(e.z)||e.x<pl.x0+t||e.x>pl.x1-t||e.z<pl.z0+t||e.z>pl.z1-t)return!1;for(let n of ml)if(Math.abs(e.x-n)<t+.1/2&&Math.abs(e.z)>2-t)return!1;for(let n of hl)if(vl(e,n,t))return!1;return!0}function bl(e,t,n=nl){let r=yl(e,n)?{...e}:xl(e,n),i=t.x-r.x,a=t.z-r.z,o=Math.max(1,Math.ceil(Math.hypot(i,a)/(n*.5))),s=i/o,c=a/o;for(let e=0;e<o;e++){let e={x:r.x+s,z:r.z};yl(e,n)&&(r=e);let t={x:r.x,z:r.z+c};yl(t,n)&&(r=t)}return r}function xl(e,t=nl){let n=(e,t,n)=>Math.min(n,Math.max(t,e)),r={x:n(Number.isFinite(e.x)?e.x:gl.x,pl.x0+t,pl.x1-t),z:n(Number.isFinite(e.z)?e.z:gl.z,pl.z0+t,pl.z1-t)};if(yl(r,t))return r;for(let e=.25;e<6;e+=.25)for(let n=0;n<16;n++){let i=n/16*Math.PI*2,a={x:r.x+Math.cos(i)*e,z:r.z+Math.sin(i)*e};if(yl(a,t))return a}return{...gl}}function Sl(e,t,n=$c){let r=e.x-t.x,i=e.z-t.z;return r*r+i*i<=n*n}function Cl(e,t){if(typeof e!=`string`)return null;let n=e.replace(/[\u0000-\u001f\u007f]+/g,` `).replace(/\s+/g,` `).trim();return n?Array.from(n).slice(0,t).join(``):null}var wl=e=>Cl(e,12);function Tl(e){let t=e&&typeof e==`object`?e:{};return{kind:al.includes(t.kind)?t.kind:ul.kind,color:Number.isInteger(t.color)&&t.color>=0&&t.color<sl.length?t.color:ul.color,prop:cl.includes(t.prop)?t.prop:ul.prop}}var El=JSON.parse(`[{"i":17,"room":"garden","title":"민들레와 발","w":1800,"h":1343,"desc":"거대한 발 아래 핀 민들레. 솜털 공에서 새 홀씨가 하나씩 돋아나 바람을 타고 액자 밖으로 날아갑니다.","doc":"화면 대부분을 차지한 건 비늘이 겹겹이 그려진 거대한 초록 발이에요. 그런데 눈은 자꾸 발치의 작은 민들레로 갑니다. 크기 차이가 클수록 홀씨 하나하나가 또렷해지고, 오른쪽 위로 이어지는 씨앗들이 화면에 바람의 방향을 만들어 줘요."},{"i":1,"room":"garden","title":"해바라기 밭","w":1400,"h":1007,"desc":"바람이 지날 때마다 꽃과 잎이 함께 흔들리고 잎사귀가 바스락거리며, 하늘은 낮에서 노을, 밤, 새벽으로 바뀝니다. 밤에는 꽃가루가 반딧불처럼 빛나요.","doc":"검은 선으로 잡은 꽃잎 위에 노란색이 번지듯 올라가 있어요. 활짝 핀 꽃과 고개 숙인 꽃, 시들어 가는 꽃이 한 화면에 섞여 있어서 밭 전체가 시간의 흐름처럼 보입니다. 아래쪽 회색 번짐은 꽃들이 안개 속에서 솟아오르는 느낌을 줘요."},{"i":2,"room":"garden","title":"튤립을 든 고릴라","w":1400,"h":1089,"desc":"고릴라가 튤립을 내려다보는 사이, 나비들이 그림 밖으로 날아오릅니다.","doc":"커다란 몸집과 달리 고릴라의 표정은 부드럽고, 시선은 품에 안은 빨간 튤립에 머물러요. 가는 선을 쌓아 올린 털과 가볍게 떠 있는 나비가 무게의 대비를 만듭니다. 분홍과 노랑이 은은하게 번진 배경이 장면을 조용히 감싸요."},{"i":5,"room":"garden","title":"세 마리 플라밍고","w":1088,"h":1400,"desc":"검은 물 위 플라밍고. 수면이 출렁이며 물그림자가 흔들리고 잔물결에 빛이 반짝여요. 바람이 지나가면 대나무가 휘청이고, 잎이 떨어져 물 위에 떠다니며, 깃털이 부풀어요.","doc":"검은 배경 덕분에 분홍 깃털의 결이 더 밝게 떠오릅니다. 세 마리가 각자 다른 자세로 몸을 다듬고 있고, 물에 비친 그림자는 형태가 흐트러져 물의 움직임을 보여 줘요. 위쪽 대나무 잎의 초록이 분홍과 맞서며 화면을 붙잡아 줍니다."},{"i":15,"room":"garden","title":"녹아내리는 크레파스","w":1400,"h":1061,"desc":"위에 붙은 크레파스 끝이 말랑하게 녹아 방울로 부풀고, 떨어져 화면을 타고 흘러내립니다.","doc":"화면 위쪽에 크레파스가 나란히 붙어 있고, 그 아래로 녹은 색이 흘러내려 무지개 띠를 만들었어요. 그 위에 검은 난초 실루엣이 얹혀 있어 흐르는 색과 멈춘 선이 한 화면에서 부딪힙니다. 익숙한 난초 그림을 전혀 다른 재료로 다시 그린 셈이에요."},{"i":0,"room":"face","title":"노란 방의 침팬지","w":1400,"h":1102,"desc":"얼굴은 그린 그대로 두고 방이 움직여요. 구겨진 종이 주름 위로 빛이 지나가고, 털끝이 살랑이고, 노란 방이 팝아트처럼 다른 색으로 바뀝니다.","doc":"새노란 배경이 검은 털을 더 진하게 보이게 하고, 시선은 자연스럽게 얼굴로 모여요. 주름을 따라간 붓질과 살짝 내민 입술이 표정에 장난기를 더합니다. 배경을 단순하게 비워 둬서 한 사람의 초상화처럼 읽히는 그림이에요."},{"i":4,"room":"face","title":"네온 고릴라","w":1392,"h":1400,"desc":"검은 바탕에 형광 선으로 그린 얼굴. 선들이 맥박처럼 빛납니다.","doc":"검은 바탕 위에 노랑, 하늘색, 흰색 선만으로 얼굴의 주름을 그려 냈어요. 빨간 붓 자국이 얼굴 둘레로 퍼져 털이면서 동시에 뿜어져 나오는 에너지처럼 보입니다. 정면을 똑바로 보는 눈이 관람객을 붙잡아요."},{"i":6,"room":"face","title":"먹 고릴라","w":1400,"h":1391,"desc":"굵은 먹선의 얼굴 뒤로 물감이 흘러갑니다. 어두운 전시실, 커서가 조명이에요.","doc":"굵고 검은 선이 얼굴의 주름과 근육을 조각하듯 깎아 냈어요. 얼굴 뒤로는 초록, 빨강, 노랑이 번지고 튀어 있어 먹빛의 무게감과 대비를 이룹니다. 콧등을 중심으로 좌우가 거의 대칭이라 정면성이 강하게 느껴져요."},{"i":7,"room":"face","title":"눈","w":1400,"h":1009,"desc":"오일파스텔로 그린 커다란 눈. 이 눈은 관람객을 따라봅니다.","doc":"화면을 가득 채운 하나의 눈이에요. 파랑, 노랑, 분홍이 겹친 홍채에서 시작해 초록과 주황의 굵은 선이 비늘처럼 퍼져 나갑니다. 나무 결이 비치는 바탕 위에 짙은 색을 꾹꾹 눌러 올려서 손의 힘이 그대로 남아 있어요."},{"i":8,"room":"toy","title":"Got cha","w":1400,"h":1211,"desc":"곰 탈을 쓴 아이와 가챠 기계. 오늘의 캡슐이 쏟아집니다.","doc":"만화 말풍선처럼 ‘Got cha’라는 글자가 화면 위아래를 가르고, 그 사이로 곰 탈을 쓴 아이와 가챠 기계가 대각선으로 놓여 있어요. 동그란 껌볼과 캡슐의 반복이 화면을 경쾌하게 만들고, 놀란 표정의 아이가 이야기의 순간을 붙잡아 줍니다."},{"i":3,"room":"toy","title":"깨진 스노우볼","w":1111,"h":1400,"desc":"금이 간 스노우볼 안에서 홀로그램 조각이 떠다닙니다.","doc":"투명한 유리구 안에 캐릭터 인형들이 모여 있지만, 앞쪽 유리에는 금이 가 있어요. 홀로그램처럼 반짝이는 조각들이 유리구 안을 떠다니고, ‘JUST FOR YOU’ 리본 글씨와 깨진 유리가 묘한 긴장을 만듭니다. 선물인데 깨져 있다는 점을 오래 보게 돼요."},{"i":16,"room":"toy","title":"곰 인형 더미","w":1201,"h":1400,"desc":"금빛 바탕 위에 쌓인 곰 인형들. 들썩이며 하트를 피워 올려요.","doc":"금빛 바탕 위에 알록달록한 곰 인형들이 탑처럼 쌓여 있어요. 배에 그려진 무지개, 하트, 해 같은 무늬가 반복되며 리듬을 만들고, 뒤엉킨 자세들이 귀여우면서도 조금 쓸쓸한 더미로 보이기도 합니다."},{"i":9,"room":"pond","title":"둥근 연못","w":1400,"h":1400,"desc":"수십 마리 잉어가 모인 둥근 연못. 물빛이 일렁이고 가끔 빗방울이 떨어져요.","doc":"원 안을 수십 마리 잉어가 빽빽하게 채우고 있어요. 주황, 흰색, 노랑 잉어 사이로 검은 잉어 두 마리가 대각선 흐름을 만들어 시선을 이끕니다. 위에서 내려다본 구도라 둥근 화면 자체가 연못처럼 느껴져요."},{"i":18,"room":"pond","title":"먹빛 메기","w":1400,"h":1391,"desc":"마름모 한지 위의 먹 메기. 먹이 물처럼 번지고 은빛 수염이 빛납니다.","doc":"마름모로 놓인 종이 위에서 메기가 몸을 비틀며 솟아오르고 있어요. 먹의 짙고 옅음만으로 비늘과 지느러미의 투명함을 표현했고, 입가의 수염에는 은빛 선이 더해져 있습니다. 바깥의 얽힌 선 무늬가 그물처럼 화면을 감싸요."},{"i":10,"room":"pond","title":"금빛 잉어 I","w":808,"h":1400,"desc":"대리석 같은 검은 바탕 위 금박 잉어 두 마리. 각자 몸을 물결치며 헤엄치다 액자 밖으로 나갔다 돌아옵니다.","doc":"구겨진 듯한 흰 결이 있는 검은 바탕 위에 금빛 선으로 잉어를 그렸어요. 세로로 긴 화면을 따라 잉어가 몸을 S자로 휘며 내려옵니다. 금빛 선은 보는 각도에 따라 빛이 달라져서 같은 그림도 다르게 보여요."},{"i":12,"room":"pond","title":"금빛 잉어 II","w":1400,"h":1386,"desc":"구긴 종이 결 위를 헤엄치는 금박 잉어. 잉어가 꼬리를 흔들며 종이 위를 천천히 한 바퀴 돌아요.","doc":"검은 바탕에 흰 균열 무늬가 퍼져 있어 깊은 물속이나 대리석처럼 보입니다. 그 위로 금빛 잉어가 크게 원을 그리며 헤엄쳐요. 비늘과 지느러미를 가는 선으로 촘촘히 새겨 넣어 장식적인 힘이 강해요."},{"i":13,"room":"pond","title":"금빛 잉어 III","w":1389,"h":1400,"desc":"연둣빛 종이 위의 금박 잉어. 꼬리를 흔들며 종이 위를 둥글게 돌아요.","doc":"연둣빛이 번진 밝은 종이 위에 금빛 잉어가 있어요. 앞의 두 금빛 잉어와 같은 주제지만 바탕이 밝아 분위기가 훨씬 가볍습니다. 네 귀퉁이를 고정한 종이 한 장이 벽에 걸린 듯한 모습이에요."},{"i":11,"room":"pond","title":"꿈꾸는 잉어","w":889,"h":1400,"desc":"번진 색 속을 도는 하얀 잉어. 화면 전체가 물속처럼 흔들려요.","doc":"흐릿하게 번진 분홍, 보라, 초록 사이로 하얀 잉어가 돌아 나옵니다. 배경은 일부러 흐리게 두고 잉어만 또렷하게 그려서 물속 깊은 곳을 들여다보는 느낌이에요. 작은 물방울들이 고요한 움직임을 더합니다."},{"i":14,"room":"pond","title":"녹는 얼음","w":1400,"h":1189,"desc":"얼음에 갇힌 물고기. 얼음이 녹아 물방울이 웅덩이로 떨어집니다.","doc":"각얼음 속에 물고기가 갇혀 있고, 아래로는 녹은 물이 웅덩이를 이뤄요. 파랑과 초록 붓질로 얼음의 굴절을 표현했고, 머리와 꼬리만 밖으로 나온 물고기가 상황의 아이러니를 만듭니다. 얼음이 다 녹으면 물고기는 자유로워질까요?"}]`),Dl=e=>String(e).padStart(2,`0`),Ol=e=>`art/wall/${Dl(e.i)}.jpg`,kl=e=>`art/${Dl(e.i)}.jpg`,Al={lobby:{name:`로비`,color:`#3d2c24`,note:`와인 한 잔 받아 들고 천천히 둘러보세요.`},garden:{name:`정원관`,color:`#4a5a43`,note:`바람과 숨결이 지나가는 방.`},face:{name:`얼굴관`,color:`#6b2727`,note:`정면을 바라보는 얼굴들.`},toy:{name:`장난감관`,color:`#28324f`,note:`유리구와 가챠, 곰 인형 더미.`},pond:{name:`연못관`,color:`#22434a`,note:`먹과 금박, 얼음 속 물고기들.`}},jl=(e,t=2.6)=>({x:e,y:2.15,z:-4.94,face:{x:0,z:1},maxW:t,maxH:2.1}),Ml=(e,t,n=-3.5,r=2.2)=>({x:e+t*.11,y:2.1,z:n,face:{x:t,z:0},maxW:r,maxH:2});function Nl(e){let t=[`lobby`,`garden`,`face`,`toy`,`pond`].indexOf(e)*12;switch(e){case`garden`:return[jl(t+2.4),jl(t+6),jl(t+9.6),Ml(t,1),Ml(t+12,-1)];case`face`:return[jl(t+2.4),jl(t+6),jl(t+9.6),Ml(t,1)];case`toy`:return[jl(t+2.4),jl(t+6),jl(t+9.6)];case`pond`:return[jl(t+1.8,2.3),jl(t+4.6,2.3),jl(t+7.4,2.3),jl(t+10.2,2.3),Ml(t,1),Ml(60,-1,-3.3),Ml(60,-1,0,2)];default:return[]}}var Pl=(e,t)=>e+Math.random()*(t-e);function Fl(e,t,n,r){let i=document.createElement(`canvas`);i.width=e,i.height=t,n(i.getContext(`2d`),e,t);let a=new ii(i);return a.colorSpace=qe,a.anisotropy=4,r&&(a.wrapS=a.wrapT=l,a.repeat.set(r[0],r[1])),a}function Il(e,t,n,r){let i=e.getImageData(0,0,t,n),a=i.data;for(let e=0;e<a.length;e+=4){let t=(Math.random()-.5)*r;a[e]+=t,a[e+1]+=t,a[e+2]+=t}e.putImageData(i,0,0)}function Ll(e,t){return`#`+new Dn(e).multiplyScalar(t).getHexString()}function Rl(){return Fl(512,512,(e,t,n)=>{for(let r=0;r<n/24;r++)for(let n=-1;n<t/128+1;n++){let t=n*128+(r%2?64:0),i=r*24;e.fillStyle=`rgb(${[[96,62,38],[108,70,42],[88,56,33],[114,76,46],[100,65,40]][Math.random()*5|0]})`,e.fillRect(t,i,128,24),e.strokeStyle=`rgba(40,24,12,.22)`;for(let n=0;n<4;n++){e.lineWidth=Math.random()+.4,e.beginPath();let n=i+Math.random()*24;e.moveTo(t,n),e.bezierCurveTo(t+38.4,n+Pl(-3,3),t+89.6,n+Pl(-3,3),t+128,n+Pl(-2,2)),e.stroke()}e.fillStyle=`rgba(25,14,6,.7)`,e.fillRect(t,i,128,1.5),e.fillRect(t,i,1.5,24)}Il(e,t,n,12)},[1,1])}function zl(e){return Fl(256,256,(t,n,r)=>{t.fillStyle=e,t.fillRect(0,0,n,r);let i=(e,n,r)=>{t.save(),t.translate(e,n),t.scale(r,r),t.beginPath(),t.moveTo(0,-55),t.bezierCurveTo(30,-40,35,-10,15,5),t.bezierCurveTo(35,15,30,45,0,55),t.bezierCurveTo(-30,45,-35,15,-15,5),t.bezierCurveTo(-35,-10,-30,-40,0,-55),t.restore()};t.globalAlpha=.08,t.fillStyle=Ll(e,1.6);for(let[e,n]of[[64,64],[192,192],[192,-64],[64,320],[-64,192],[320,64]])i(e,n,1),t.fill();t.globalAlpha=.04,t.fillStyle=`#000`;for(let e=0;e<n;e+=3)t.fillRect(e,0,1,r);t.globalAlpha=1,Il(t,n,r,8)},[1,1])}function Bl(){return Fl(512,128,(e,t,n)=>{e.fillStyle=`#5c1c22`,e.fillRect(0,0,t,n),e.strokeStyle=`#b8893f`,e.lineWidth=6,e.strokeRect(10,10,t-20,n-20),e.lineWidth=2,e.strokeRect(22,22,t-44,n-44),e.globalAlpha=.22,e.fillStyle=`#d9a85a`;for(let t=0;t<6;t++)e.beginPath(),e.ellipse(52+t*82,n/2,12,22,0,0,7),e.fill();e.globalAlpha=1,Il(e,t,n,14)})}function Vl(e,t,n,r){return Fl(t,n,i=>{r&&(i.fillStyle=r,i.fillRect(0,0,t,n)),i.textAlign=`center`,i.textBaseline=`middle`;for(let n of e)i.font=n.font,i.fillStyle=n.color,i.fillText(n.text,t/2,n.y)})}var Hl=null;function Ul(){return Hl||(Hl=Fl(64,64,(e,t,n)=>{let r=e.createRadialGradient(t/2,n/2,2,t/2,n/2,t/2);r.addColorStop(0,`rgba(0,0,0,.55)`),r.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=r,e.fillRect(0,0,t,n)}),Hl)}var Wl=[{h:0,top:`#0b1026`,bottom:`#2a2340`,sun:`#7f8fd6`,sunI:.25,hemi:.55,stars:1},{h:5,top:`#141a3a`,bottom:`#4a3550`,sun:`#9a8fd0`,sunI:.3,hemi:.6,stars:.8},{h:6.3,top:`#3c5a8c`,bottom:`#f0a878`,sun:`#ffc596`,sunI:.9,hemi:.85,stars:.1},{h:8,top:`#6fa6d8`,bottom:`#d9ecf5`,sun:`#fff1dc`,sunI:1.3,hemi:1.05,stars:0},{h:16,top:`#5f9ad3`,bottom:`#cfe6f2`,sun:`#fff0d6`,sunI:1.3,hemi:1.05,stars:0},{h:18.2,top:`#40528f`,bottom:`#f39a6b`,sun:`#ffab73`,sunI:.95,hemi:.85,stars:.15},{h:19.6,top:`#1a2050`,bottom:`#5b3a5e`,sun:`#a28bd8`,sunI:.45,hemi:.65,stars:.7},{h:24,top:`#0b1026`,bottom:`#2a2340`,sun:`#7f8fd6`,sunI:.25,hemi:.55,stars:1}];function Gl(e){let t=e.getHours()+e.getMinutes()/60,n=0;for(;n<Wl.length-2&&t>=Wl[n+1].h;)n++;let r=Wl[n],i=Wl[n+1],a=(t-r.h)/(i.h-r.h),o=(e,t)=>new Dn(e).lerp(new Dn(t),a),s=r.sunI+(i.sunI-r.sunI)*a;return{top:o(r.top,i.top),bottom:o(r.bottom,i.bottom),sun:o(r.sun,i.sun),sunI:s,hemi:r.hemi+(i.hemi-r.hemi)*a,stars:r.stars+(i.stars-r.stars)*a,hour:t,phase:Kl(t),night:Math.max(0,Math.min(1,(1.3-s)/1.05))}}function Kl(e){return e<5?`밤`:e<7?`새벽`:e<11?`아침`:e<17.5?`낮`:e<19.5?`노을`:`밤`}var ql={새벽:`🌅`,아침:`🌤️`,낮:`☀️`,노을:`🌇`,밤:`🌙`},Jl=class{canvas=document.createElement(`canvas`);texture;stars=[];constructor(){this.canvas.width=64,this.canvas.height=256,this.texture=new ii(this.canvas),this.texture.colorSpace=qe;for(let e=0;e<40;e++)this.stars.push({x:Math.random()*64,y:Math.random()*150,r:Math.random()<.15?1.2:.6})}paint(e){let t=this.canvas.getContext(`2d`),n=this.canvas.width,r=this.canvas.height,i=t.createLinearGradient(0,0,0,r);if(i.addColorStop(0,`#`+e.top.getHexString()),i.addColorStop(1,`#`+e.bottom.getHexString()),t.fillStyle=i,t.fillRect(0,0,n,r),e.stars>.02){t.fillStyle=`rgba(255,248,230,${.85*e.stars})`;for(let e of this.stars)t.beginPath(),t.arc(e.x,e.y,e.r,0,7),t.fill()}this.texture.needsUpdate=!0}},Yl=4.2,Xl=1,Zl=pl.z0;function Ql(e,t){let n=t.capabilities.getMaxAnisotropy(),r={floor:new Ei({map:Rl(),roughness:.55}),walnut:new Ei({color:3875862,roughness:.55}),cream:new Ei({color:15327178,roughness:.7}),gold:new Ei({color:13214302,metalness:.75,roughness:.35}),brass:new Ei({color:11832396,metalness:.6,roughness:.4}),marble:new Ei({color:15525595,roughness:.3}),velvet:new Ei({color:4857386,roughness:.95}),runner:new Ei({map:Bl(),roughness:.95})};r.floor.map.repeat.set(pl.x1/2,5),r.floor.map.anisotropy=Math.min(8,n);let i=new bn;e.add(i);let a=(e,t,n,r,a,o=0)=>{let s=new qr(e,t);return s.position.set(n,r,a),s.rotation.y=o,i.add(s),s},o=(e,t,n,r,i,o,s)=>a(new ci(e,t,n),r,i,o,s),s=a(new pi(pl.x1,10),r.floor,pl.x1/2,0,0);s.rotation.x=-Math.PI/2,s.name=`floor`;let c=a(new pi(pl.x1-1,1.6),r.runner,pl.x1/2,.005,.2);c.rotation.x=-Math.PI/2,r.runner.map.wrapS=l,r.runner.map.repeat.set(12,1);let u=a(new pi(400,200),new Fr({color:1708564}),pl.x1/2,-.3,pl.z1+100);u.rotation.x=-Math.PI/2,o(pl.x1+.4,.3,.3,r.walnut,pl.x1/2,-.12,pl.z1+.15);let d=fl.map(e=>new Ei({map:zl(Al[e].color),roughness:.92}));fl.forEach((e,t)=>{let n=t*12+6,i=d[t];i.map.repeat.set(12/1.6,Yl/1.6);let s=a(new pi(12,Yl),i,n,Yl/2,Zl);s.receiveShadow=!1,o(12,1,.05,r.walnut,n,.5,Zl+.03),o(12,.06,.1,r.gold,n,1.02,Zl+.05),o(12,.22,.2,r.cream,n,4.09,Zl+.1)});let f=(e,t,n,i)=>{let s=i?3:6.5,c=Zl+s/2,l=i?2:1.5,u=pl.z1-l,f=l+u/2,p=(t,n,r,i)=>a(new pi(t,Yl),r,e+i*.065,Yl/2,n,i*Math.PI/2);n>=0&&p(s,c,d[n],1),t>=0&&p(s,c,d[t],-1),o(.12,Yl,s,r.cream,e,Yl/2,c).scale.set(1,1,1),o(.14,Xl,u,r.walnut,e,Xl/2,f),o(.2,.05,u,r.gold,e,1.025,f),i&&(o(.16,.5,4.2,r.cream,e,3.95,0),o(.2,.06,4.2,r.gold,e,3.67,0))};f(0,-1,0,!1),ml.forEach((e,t)=>f(e,t,t+1,!0)),f(pl.x1,fl.length-1,-1,!1),fl.forEach((e,t)=>{if(e===`lobby`)return;let n=Vl([{text:Al[e].name,font:`600 54px "Gowun Batang", serif`,color:`#efe2c4`,y:64}],512,128),r=a(new pi(2.4,.6),new Fr({map:n,transparent:!0}),t*12+6,3.62,Zl+.08);r.renderOrder=1});{let e=Vl([{text:`액자 밖으로`,font:`700 120px "Gowun Batang", serif`,color:`#f1e2bd`,y:150},{text:`정유진 개인전 오프닝 파티`,font:`500 44px "IBM Plex Sans KR", sans-serif`,color:`#d8bf8f`,y:260}],1024,340);a(new pi(4.6,1.53),new Fr({map:e,transparent:!0}),.08,2.75,-2.2,Math.PI/2)}let p=new Jl;{let e=2.45,t=3.6,n=2.6;a(new pi(t,n),new Fr({map:p.texture}),6,e,Zl+.04),o(3.84,.12,.1,r.gold,6,e-n/2,Zl+.08),o(3.84,.12,.1,r.gold,6,3.75,Zl+.08),o(.12,n,.1,r.gold,6-t/2,e,Zl+.08),o(.12,n,.1,r.gold,7.8,e,Zl+.08),o(.05,n,.06,r.walnut,6,e,Zl+.07),o(t,.05,.06,r.walnut,6,2.75,Zl+.07);let i=hl[0],s=i.x1-i.x0,c=i.z1-i.z0,l=(i.x0+i.x1)/2,u=(i.z0+i.z1)/2;o(s,1.05,c,r.walnut,l,.525,u),o(s+.1,.06,c+.1,r.marble,l,1.08,u),o(s,.05,.02,r.gold,l,.3,i.z1+.01);let d=new di(.06,.07,.34,8),f=new di(.022,.03,.12,6),m=[3099178,5903906,3811860].map(e=>new Ei({color:e,roughness:.2,metalness:.1}));for(let e=0;e<7;e++){let t=i.x0+.5+e*.75,n=m[e%3];a(d,n,t,1.28,u-.15),a(f,n,t,1.51,u-.15)}let h=new fi(.06,.1,8,1,!0),g=new Ei({color:14674156,transparent:!0,opacity:.45,roughness:.05,side:2});for(let e=0;e<8;e++){let t=a(h,g,i.x0+.35+e*.68,1.2,u+.2);t.rotation.x=Math.PI}}for(let e of hl.slice(1)){let t=e.x1-e.x0,n=e.z1-e.z0;o(t,.42,n,r.velvet,(e.x0+e.x1)/2,.21,(e.z0+e.z1)/2);for(let i of[-1,1])for(let a of[-1,1])o(.08,.08,.08,r.brass,(e.x0+e.x1)/2+i*(t/2-.1),.04,(e.z0+e.z1)/2+a*(n/2-.08))}let m=[],h=[];for(let e of fl){let t=Nl(e);El.filter(t=>t.room===e).forEach((e,n)=>{let a=t[n];if(!a)return;let o=e.w/e.h,s=a.maxW,c=s/o;c>a.maxH&&(c=a.maxH,s=c*o);let l=Math.atan2(a.face.x,a.face.z),u=new bn;u.position.set(a.x,a.y,a.z),u.rotation.y=l,i.add(u);let d=.09,f=(e,t,n,i)=>{let a=new qr(new ci(e,t,.07),r.gold);a.position.set(n,i,.035),u.add(a)};f(s+d*2,d,0,c/2+d/2),f(s+d*2,d,0,-c/2-d/2),f(d,c,-s/2-d/2,0),f(d,c,s/2+d/2,0);let p=new Fr({color:3814448});h.push(p);let g=new qr(new pi(s,c),p);g.position.z=.02,g.userData.art=e,u.add(g);let _=new qr(new di(.035,.035,Math.min(.9,s*.5),8),r.brass);_.rotation.z=Math.PI/2,_.position.set(0,c/2+.22,.2),u.add(_);let v=Vl([{text:e.title,font:`600 30px "Gowun Batang", serif`,color:`#2a2024`,y:44},{text:`정유진`,font:`400 20px "IBM Plex Sans KR", sans-serif`,color:`#6d5f57`,y:82}],256,112,`#f1e7d3`),y=new qr(new pi(.42,.18),new Fr({map:v}));y.position.set(s/2+.38,-c/2+.2,.02),u.add(y);let b={x:a.x+a.face.x*1.6,z:a.z+a.face.z*1.6};m.push({art:e,slot:a,mesh:g,stand:b})})}let g=new ra(16774112,3811872,1);e.add(g);let _=new va(16777215,1);_.position.set(-8,14,10),e.add(_);let v=new ya(16767400,.35);return e.add(v),{paintings:m,floor:s,setTime:t=>{let n=Gl(t);p.paint(n),e.background=n.top.clone().lerp(n.bottom,.35),g.intensity=n.hemi,_.color.copy(n.sun),_.intensity=n.sunI,v.intensity=.3+.55*n.night;for(let e of h)e.map&&e.color.setScalar(.92+.08*(1-n.night));return n},loadArt:async e=>{let t=new ta,r=0;await Promise.all(m.map(async(i,a)=>{try{let e=await t.loadAsync(Ol(i.art));e.colorSpace=qe,e.anisotropy=Math.min(4,n);let r=h[a];r.map=e,r.color.setScalar(1),r.needsUpdate=!0}catch{}e?.(++r,m.length)}))}}}var $l=class{joystickEl;keys=new Set;joy={x:0,z:0,active:!1};target=null;enabled=!0;constructor(e){this.joystickEl=e,addEventListener(`keydown`,e=>{if(tu(e))return;let t=eu(e.key);t&&(this.keys.add(t),this.target=null,e.preventDefault())}),addEventListener(`keyup`,e=>{let t=eu(e.key);t&&this.keys.delete(t)}),addEventListener(`blur`,()=>this.keys.clear()),this.setupJoystick()}direction(){if(!this.enabled)return{x:0,z:0};let e=0,t=0;this.keys.has(`left`)&&--e,this.keys.has(`right`)&&(e+=1),this.keys.has(`up`)&&--t,this.keys.has(`down`)&&(t+=1),this.joy.active&&(e=this.joy.x,t=this.joy.z);let n=Math.hypot(e,t);return n>1&&(e/=n,t/=n),{x:e,z:t}}setupJoystick(){let e=this.joystickEl,t=e.querySelector(`.knob`),n=null,r=n=>{let r=e.getBoundingClientRect(),i=n.clientX-(r.left+r.width/2),a=n.clientY-(r.top+r.height/2),o=Math.hypot(i,a);o>46&&(i=i/o*46,a=a/o*46),t.style.transform=`translate(${i}px, ${a}px)`;let s=Math.hypot(i,a)/46;this.joy={x:s<.15?0:i/46,z:s<.15?0:a/46,active:!0}};e.addEventListener(`pointerdown`,t=>{n=t.pointerId,e.setPointerCapture(n),this.target=null,r(t),e.classList.add(`on`)}),e.addEventListener(`pointermove`,e=>{e.pointerId===n&&r(e)});let i=r=>{r.pointerId===n&&(n=null,this.joy={x:0,z:0,active:!1},t.style.transform=``,e.classList.remove(`on`))};e.addEventListener(`pointerup`,i),e.addEventListener(`pointercancel`,i)}};function eu(e){switch(e){case`ArrowUp`:case`w`:case`W`:return`up`;case`ArrowDown`:case`s`:case`S`:return`down`;case`ArrowLeft`:case`a`:case`A`:return`left`;case`ArrowRight`:case`d`:case`D`:return`right`;default:return null}}function tu(e){let t=e.target;return!!t&&(t.tagName===`INPUT`||t.tagName===`TEXTAREA`||t.isContentEditable)}var nu={body:new hi(.4,10,8),head:new hi(.34,12,9),limb:new li(.085,.22,3,6),leg:new li(.1,.14,3,6),roundEar:new hi(.11,8,6),coneEar:new fi(.12,.22,4),longEar:new li(.07,.32,3,6),eye:new hi(.045,8,6),lid:new hi(.052,8,6,0,Math.PI*2,0,Math.PI/2),muzzle:new hi(.13,8,6),nose:new hi(.035,6,5),beak:new fi(.07,.16,6),tail:new hi(.09,6,5),catTail:new li(.045,.42,3,5),cheek:new ui(.045,10),shadow:new pi(1.1,1.1)},ru=new Map;function iu(e,t={}){let n=e+JSON.stringify(t),r=ru.get(n);return r||(r=new Ei({color:e,roughness:.75,flatShading:!0,...t}),ru.set(n,r)),r}var au=(e,t)=>`#`+new Dn(e).lerp(new Dn(t>0?`#ffffff`:`#000000`),Math.abs(t)).getHexString();function ou(e){let t=sl[e.color]??sl[0],n=e.kind===`penguin`,r=iu(n?au(t,-.35):t),i=iu(n?`#f6f1e6`:au(t,.55)),a=iu(`#231a1c`,{roughness:.4}),o=iu(au(t,n?-.25:-.12)),s=iu(`#f19aa8`,{roughness:.9}),c=new bn,l=new qr(nu.shadow,new Fr({map:Ul(),transparent:!0,depthWrite:!1}));l.rotation.x=-Math.PI/2,l.position.y=.01,l.renderOrder=2,c.add(l);let u=new bn;c.add(u);let d=(e,t,n,r,i,a,o)=>{let s=new qr(t,n);return s.position.set(r,i,a),o&&s.scale.set(...o),e.add(s),s},f=e=>{let t=new bn;return t.position.set(e*.16,.3,0),c.add(t),d(t,nu.leg,r,0,-.17,0),t},p=f(-1),m=f(1);d(u,nu.body,r,0,.62,0,[1,n?1.2:1.05,.92]),d(u,nu.body,i,0,.6,.12,[.72,n?1.02:.8,.7]);let h=e=>{let t=new bn;t.position.set(e*.36,.86,0),u.add(t);let i=d(t,nu.limb,r,0,-.17,0);return n&&i.scale.set(.7,1.1,1.4),t.rotation.z=e*.18,t},g=h(-1),_=h(1),v=new bn;v.position.set(0,1.22,.02),u.add(v),d(v,nu.head,r,0,0,0,[1.05,.96,1]),n&&d(v,nu.head,i,0,-.04,.1,[.78,.72,.82]);let y=[];for(let e of[-1,1]){d(v,nu.eye,a,e*.13,.03,.3);let t=d(v,nu.lid,o,e*.13,.03,.302);t.rotation.x=-.2,y.push(t);let n=d(v,nu.cheek,s,e*.2,-.07,.29);n.lookAt(v.position.clone().add(new V(e*.6,-.2,2))),n.material.transparent=!0}switch(e.kind){case`bear`:for(let e of[-1,1])d(v,nu.roundEar,r,e*.24,.25,-.02),d(v,nu.roundEar,i,e*.24,.25,.04,[.55,.55,.3]);d(v,nu.muzzle,i,0,-.1,.27,[1,.78,.8]),d(v,nu.nose,a,0,-.05,.37),d(u,nu.tail,r,0,.45,-.38);break;case`cat`:{for(let e of[-1,1]){let t=d(v,nu.coneEar,r,e*.2,.3,0);t.rotation.z=-e*.25}d(v,nu.muzzle,i,0,-.1,.26,[.8,.6,.7]),d(v,nu.nose,s,0,-.06,.35);let e=d(u,nu.catTail,r,0,.62,-.42);e.rotation.x=-.9;break}case`rabbit`:for(let e of[-1,1]){let t=d(v,nu.longEar,r,e*.12,.42,-.04);t.rotation.z=-e*.15,e>0&&(t.rotation.x=.5),d(t,nu.longEar,s,0,0,.03,[.5,.82,.4])}d(v,nu.muzzle,i,0,-.1,.26,[.75,.6,.7]),d(v,nu.nose,s,0,-.06,.35),d(u,nu.tail,i,0,.42,-.38,[1.3,1.3,1.3]);break;case`penguin`:{let e=d(v,nu.beak,iu(`#f0a43a`),0,-.06,.36);e.rotation.x=Math.PI/2,p.children[0].scale.set(1.2,.5,1.6),m.children[0].scale.set(1.2,.5,1.6),p.children[0].material=iu(`#f0a43a`),m.children[0].material=iu(`#f0a43a`);break}}return su(e,v,_),c.traverse(e=>{e.isMesh&&(e.castShadow=!1)}),{root:c,bodyPivot:u,head:v,armL:g,armR:_,legL:p,legR:m,lids:y,look:e,dispose(){c.removeFromParent(),l.material.dispose()}}}function su(e,t,n){switch(e.prop){case`wine`:{let e=new bn;e.position.set(0,-.36,.08),n.add(e);let t=iu(`#e6eef0`,{transparent:!0,opacity:.5,roughness:.05,flatShading:!1}),r=new qr(new di(.012,.012,.14,5),t);r.position.y=.07;let i=new qr(new di(.05,.05,.01,8),t),a=new qr(new hi(.075,10,7,0,Math.PI*2,Math.PI/2.4,Math.PI/1.7),t);a.position.y=.2,a.rotation.x=Math.PI;let o=new qr(new hi(.06,10,6,0,Math.PI*2,Math.PI/2,Math.PI/2),iu(`#7c1d2c`,{roughness:.3,flatShading:!1}));o.position.y=.19,o.rotation.x=Math.PI,e.add(r,i,a,o);break}case`beret`:{let e=new qr(new di(.3,.27,.09,12),iu(`#7a2232`));e.position.set(.04,.3,-.02),e.rotation.z=-.22;let n=new qr(new hi(.03,6,4),iu(`#7a2232`));n.position.set(.02,.06,0),e.add(n),t.add(e);break}case`ribbon`:{let e=new bn;e.position.set(.18,.28,.08),e.rotation.z=-.4,t.add(e);let n=iu(`#e85d75`);for(let t of[-1,1]){let r=new qr(new fi(.07,.14,4),n);r.rotation.z=t*Math.PI/2,r.position.x=t*.07,e.add(r)}e.add(new qr(new hi(.035,6,4),n));break}}}var cu=class e{rig;t=Math.random()*10;walk=0;emote=null;emoteT=0;static EMOTE_TIME=1.5;constructor(e){this.rig=e}play(e){this.emote=e,this.emoteT=0}update(t,n,r){let i=this.rig;this.t+=t,this.walk+=(+!!n-this.walk)*Math.min(1,t*8);let a=this.walk,o=this.t,s=Math.sin(o*9);i.legL.rotation.x=s*.6*a,i.legR.rotation.x=-s*.6*a,i.armL.rotation.x=-s*.5*a,i.armR.rotation.x=s*.5*a,i.armL.rotation.z=-.18,i.armR.rotation.z=.18,i.bodyPivot.position.y=Math.abs(Math.cos(o*9))*.05*a;let c=r===`low`?1:.35,l=Math.sin(o*1.6)*.012*(1-a);i.bodyPivot.scale.set(1,1+l,1),i.head.rotation.z=Math.sin(o*.7)*.06*c*(1-a),i.head.rotation.x=.12*c*(1-a),i.bodyPivot.rotation.x=0,i.bodyPivot.rotation.z=0,i.root.position.y=0;let u=+(o%4.3<.18),d=r===`low`?.15:.55;for(let e of i.lids)e.rotation.x=-.2+(1-d)*1.3+u*1.2;if(!this.emote)return;this.emoteT+=t;let f=this.emoteT/e.EMOTE_TIME;if(f>=1){this.emote=null;return}let p=Math.sin(Math.PI*Math.min(1,f*1.15));switch(this.emote){case`cheers`:i.armR.rotation.x=-2.3*p,i.armR.rotation.z=.1;break;case`wave`:i.armR.rotation.x=-.3*p,i.armR.rotation.z=2.6*p+Math.sin(this.emoteT*16)*.35*p;break;case`clap`:{let e=Math.abs(Math.sin(this.emoteT*14))*p;i.armL.rotation.x=-1.2*p,i.armR.rotation.x=-1.2*p,i.armL.rotation.z=-.5*e,i.armR.rotation.z=.5*e;break}case`laugh`:i.bodyPivot.rotation.z=Math.sin(this.emoteT*22)*.08*p,i.head.rotation.x=-.35*p,i.bodyPivot.position.y+=Math.abs(Math.sin(this.emoteT*22))*.04*p;break;case`heart`:i.root.position.y=Math.max(0,Math.sin(f*Math.PI*2))*.35,i.armL.rotation.z=-2.2*p,i.armR.rotation.z=2.2*p;break;case`wow`:i.bodyPivot.rotation.x=-.3*p,i.head.rotation.x=-.25*p,i.armL.rotation.z=-1.1*p,i.armR.rotation.z=1.1*p}}},lu=class{el=document.createElement(`div`);stack=document.createElement(`div`);plate=document.createElement(`div`);nameEl=document.createElement(`b`);batEl=document.createElement(`span`);constructor(e,t,n){this.el.className=`tag`+(n?` self`:``),this.stack.className=`stack`,this.plate.className=`plate`,this.batEl.className=`bat`,this.nameEl.textContent=t,this.plate.append(this.batEl,this.nameEl),this.el.append(this.stack,this.plate),e.append(this.el)}setName(e){this.nameEl.textContent!==e&&(this.nameEl.textContent=e)}setBattery(e){let t=e===`low`?`🪫`:`🔋`;this.batEl.textContent!==t&&(this.batEl.textContent=t,this.batEl.title=e===`low`?`방전 · 구경만 할래요`:`충전 중 · 말 걸어도 돼요`,this.el.classList.toggle(`low`,e===`low`))}setNear(e){this.el.classList.toggle(`near`,e)}place(e,t,n,r){this.el.style.display=n?``:`none`,n&&(this.el.style.transform=`translate3d(${e.toFixed(1)}px, ${t.toFixed(1)}px, 0)`,this.el.style.zIndex=String(1e3-Math.round(r*10)))}stackBox(){return this.stack.childElementCount?{w:this.stack.offsetWidth,h:this.stack.offsetHeight}:(this.lifted&&(this.lifted=0,this.stack.style.bottom=``),null)}lifted=0;lift(e){let t=Math.round(e);t!==this.lifted&&(this.lifted=t,this.stack.style.bottom=`${26+t}px`)}say(e){let t=document.createElement(`div`);t.className=`bubble say`,t.textContent=e,this.push(t,6500)}voice(e,t,n){let r=document.createElement(`button`);r.type=`button`,r.className=`bubble voice`;let i=Math.max(1,Math.round(t/1e3));r.innerHTML=`<span class="play" aria-hidden="true">▶</span><span class="wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><span class="len">${i}초</span>`,r.setAttribute(`aria-label`,`음성 메시지 ${i}초 듣기`);let a=URL.createObjectURL(e),o=new Audio(a);o.preload=`auto`,r.addEventListener(`click`,e=>{e.stopPropagation(),o.paused?o.play().catch(()=>r.classList.add(`err`)):(o.pause(),o.currentTime=0)}),o.addEventListener(`play`,()=>{r.classList.add(`playing`),r.querySelector(`.play`).textContent=`■`});let s=()=>{r.classList.remove(`playing`),r.querySelector(`.play`).textContent=`▶`};o.addEventListener(`pause`,s),o.addEventListener(`ended`,s),n&&r.classList.add(`mine`),this.push(r,2e4,()=>{o.pause(),URL.revokeObjectURL(a)})}emote(e){let t=document.createElement(`span`);t.className=`float`,t.textContent=il[e],t.style.setProperty(`--dx`,`${(Math.random()-.5)*30}px`),this.el.append(t),setTimeout(()=>t.remove(),1800)}push(e,t,n){for(this.stack.append(e);this.stack.children.length>3;){let e=this.stack.firstElementChild;e._gone?.(),e.remove()}e._gone=n,setTimeout(()=>{e.classList.add(`out`),setTimeout(()=>{e.isConnected&&(n?.(),e.remove())},400)},t)}dispose(){this.el.remove()}},uu=new V(0,9.4,11),du=class{scene;camera;dom;gallery;conn;controls;tagLayer;hooks;guests=new Map;muted=new Set;sendT=0;lastSent={x:0,z:0,dir:0,moving:!1};room=null;painting=null;walkTo=null;ring;targetMark;zoom=1;camTarget=new V;ray=new La;listDirty=!0;listT=0;disposed=!1;constructor(e,t,n,r,i,a,o,s){this.scene=e,this.camera=t,this.dom=n,this.gallery=r,this.conn=i,this.controls=a,this.tagLayer=o,this.hooks=s;let c=new mi($c-.04,$c,64);this.ring=new qr(c,new Fr({color:14728570,transparent:!0,opacity:.28,depthWrite:!1})),this.ring.rotation.x=-Math.PI/2,this.ring.position.y=.015,this.ring.renderOrder=3,e.add(this.ring),this.targetMark=new qr(new mi(.16,.24,24),new Fr({color:15852221,transparent:!0,opacity:.8,depthWrite:!1})),this.targetMark.rotation.x=-Math.PI/2,this.targetMark.position.y=.02,this.targetMark.visible=!1,e.add(this.targetMark),i.on({add:e=>this.addGuest(e),change:e=>this.updateGuest(e),remove:e=>this.removeGuest(e),chat:(e,t)=>{this.muted.has(e)||this.guests.get(e)?.tag.say(t)},emote:(e,t)=>{this.muted.has(e)||this.playEmote(e,t)},voice:(e,t,n)=>{this.muted.has(e)||this.guests.get(e)?.tag.voice(t,n,e===i.selfId)},snap:(e,t)=>{let n=this.self();n&&(n.pos.set(e,t),n.net.x=e,n.net.z=t)}}),n.addEventListener(`pointerup`,this.onTap),n.addEventListener(`wheel`,this.onWheel,{passive:!0})}self(){return this.guests.get(this.conn.selfId)}mute(e,t){t?this.muted.add(e):this.muted.delete(e),this.listDirty=!0}emote(e){this.conn.emote(e)}goTo(e){this.walkTo=e,this.controls.target={...e.stand}}addGuest(e){if(this.guests.has(e.id)){this.updateGuest(e);return}let t=ou(e.look);t.root.position.set(e.x,0,e.z),t.root.rotation.y=e.dir,this.scene.add(t.root);let n=e.id===this.conn.selfId,r=new lu(this.tagLayer,e.name,n);r.setBattery(e.battery),this.guests.set(e.id,{net:{...e},rig:t,anim:new cu(t),tag:r,pos:new B(e.x,e.z),dir:e.dir,lookKey:JSON.stringify(e.look)}),n&&(this.camTarget.set(e.x,0,e.z),this.snapCamera()),this.listDirty=!0}updateGuest(e){let t=this.guests.get(e.id);if(!t){this.addGuest(e);return}t.net=e.id===this.conn.selfId?{...e,x:t.net.x,z:t.net.z,dir:t.net.dir,moving:t.net.moving}:{...e},t.tag.setName(e.name),t.tag.setBattery(e.battery);let n=JSON.stringify(e.look);if(n!==t.lookKey){let r=ou(e.look);r.root.position.copy(t.rig.root.position),r.root.rotation.y=t.rig.root.rotation.y,t.rig.dispose(),this.scene.add(r.root),t.rig=r,t.anim=new cu(r),t.lookKey=n}this.listDirty=!0}removeGuest(e){let t=this.guests.get(e);t&&(t.rig.dispose(),t.tag.dispose(),this.guests.delete(e),this.listDirty=!0)}playEmote(e,t){let n=this.guests.get(e);n&&(n.anim.play(t),n.tag.emote(t))}onTap=e=>{if(e.button!==0&&e.pointerType===`mouse`)return;let t=this.dom.getBoundingClientRect(),n=new B((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1);this.ray.setFromCamera(n,this.camera);let r=this.ray.intersectObjects(this.gallery.paintings.map(e=>e.mesh),!1)[0];if(r){let e=this.gallery.paintings.find(e=>e.mesh===r.object);if(e){this.goTo(e);return}}let i=this.ray.intersectObject(this.gallery.floor,!1)[0];i&&(this.walkTo=null,this.controls.target={x:i.point.x,z:i.point.z},this.targetMark.position.set(i.point.x,.02,i.point.z),this.targetMark.visible=!0)};onWheel=e=>{this.zoom=Math.min(1.45,Math.max(.65,this.zoom*(e.deltaY>0?1.08:.93)))};snapCamera(){let e=uu.clone().multiplyScalar(this.zoomFactor());this.camera.position.copy(this.camTarget).add(e),this.camera.lookAt(this.camTarget.x,.6,this.camTarget.z-.6)}zoomFactor(){let e=this.dom.clientWidth/Math.max(1,this.dom.clientHeight),t=e<1?Math.min(62,40+(1-e)*40):40;return Math.abs(this.camera.fov-t)>.1&&(this.camera.fov=t,this.camera.updateProjectionMatrix()),this.zoom*(e<1?1.2:1)}update(e){if(this.disposed)return;let t=this.self();t&&this.moveSelf(t,e);for(let[t,n]of this.guests){if(t!==this.conn.selfId){let t=1-Math.exp(-e*10);n.pos.x+=(n.net.x-n.pos.x)*t,n.pos.y+=(n.net.z-n.pos.y)*t,n.dir=fu(n.dir,n.net.dir,e*10)}n.rig.root.position.x=n.pos.x,n.rig.root.position.z=n.pos.y,n.rig.root.rotation.y=n.dir;let r=t===this.conn.selfId?n.net.moving:n.net.moving||Math.hypot(n.net.x-n.pos.x,n.net.z-n.pos.y)>.05;n.anim.update(e,r,n.net.battery)}if(t){let n=Math.min(pl.x1-4.5,Math.max(4.5,t.pos.x)),r=1-Math.exp(-e*4);this.camTarget.x+=(n-this.camTarget.x)*r,this.camTarget.z+=(Math.max(-1.5,Math.min(1.5,t.pos.y*.5))-this.camTarget.z)*r,this.snapCamera(),this.ring.position.set(t.pos.x,.015,t.pos.y)}this.placeTags(),this.listT-=e,(this.listDirty||this.listT<=0)&&this.emitList()}moveSelf(e,t){let{x:n,z:r}=this.controls.direction(),i=this.controls.target;if(n===0&&r===0&&i){let t=i.x-e.pos.x,a=i.z-e.pos.y,o=Math.hypot(t,a);o<.12?(this.controls.target=null,this.targetMark.visible=!1,this.walkTo&&=(e.dir=Math.atan2(-this.walkTo.slot.face.x,-this.walkTo.slot.face.z),this.hooks.arrived(this.walkTo),null)):(n=t/o,r=a/o,o<.5&&(n*=o/.5+.3,r*=o/.5+.3))}else(n!==0||r!==0)&&(this.targetMark.visible=!1,this.walkTo=null);let a=n!==0||r!==0;if(a){let i=tl*t,a=bl({x:e.pos.x,z:e.pos.y},{x:e.pos.x+n*i,z:e.pos.y+r*i});Math.hypot(a.x-e.pos.x,a.z-e.pos.y)<i*.1&&this.controls.target&&(this.controls.target=null,this.targetMark.visible=!1,this.walkTo=null),e.pos.set(a.x,a.z),e.dir=fu(e.dir,Math.atan2(n,r),t*12)}e.net.x=e.pos.x,e.net.z=e.pos.y,e.net.dir=e.dir,e.net.moving=a,this.sendT-=t,(a!==this.lastSent.moving||Math.abs(e.pos.x-this.lastSent.x)>.01||Math.abs(e.pos.y-this.lastSent.z)>.01)&&this.sendT<=0&&(this.sendT=1/10,this.conn.move(e.pos.x,e.pos.y,e.dir,a),this.lastSent={x:e.pos.x,z:e.pos.y,dir:e.dir,moving:a});let o=_l(e.pos.x);o!==this.room&&(this.room=o,this.hooks.room(o));let s=null,c=2.3;for(let t of this.gallery.paintings){let n=Math.hypot(t.stand.x-e.pos.x,t.stand.z-e.pos.y);n<c&&(c=n,s=t)}s!==this.painting&&(this.painting=s,this.hooks.painting(s))}placeTags(){let e=this.dom.clientWidth,t=this.dom.clientHeight,n=new V,r=this.self(),i=[],a=[];for(let[o,s]of this.guests){n.set(s.pos.x,1.85+s.rig.root.position.y,s.pos.y).project(this.camera);let c=n.z<1&&n.x>-1.2&&n.x<1.2&&n.y>-1.2&&n.y<1.3,l=(n.x*.5+.5)*e,u=(-n.y*.5+.5)*t;if(s.tag.place(l,u,c,n.z),r&&o!==this.conn.selfId&&s.tag.setNear(Sl(r.net,s.net)),c){a.push({l:l-45,r:l+45,t:u-22,b:u});let e=s.tag.stackBox();e&&i.push({tag:s.tag,x:l,y:u,bw:e.w,bh:e.h})}}i.sort((e,t)=>t.y-e.y);let o=[];for(let e of i){let t=a.filter(t=>Math.abs(t.b-e.y)>1||Math.abs((t.l+t.r)/2-e.x)>1),n=0;for(let r=0;r<6;r++){let r=e.y-26-n,i=r-e.bh,a=e.x-e.bw/2,s=e.x+e.bw/2,c=o.find(e=>a<e.r&&s>e.l&&i<e.b&&r>e.t)??t.find(e=>a<e.r&&s>e.l&&i<e.b&&r>e.t);if(!c)break;n+=r-c.t+4}e.tag.lift(n);let r=e.y-26-n;o.push({l:e.x-e.bw/2,r:e.x+e.bw/2,t:r-e.bh,b:r})}}emitList(){this.listDirty=!1,this.listT=1;let e=this.self();this.hooks.guests([...this.guests.values()].map(t=>({id:t.net.id,name:t.net.name,battery:t.net.battery,self:t.net.id===this.conn.selfId,near:!!e&&t.net.id!==e.net.id&&Sl(e.net,t.net),muted:this.muted.has(t.net.id)})))}dispose(){this.disposed=!0,this.dom.removeEventListener(`pointerup`,this.onTap),this.dom.removeEventListener(`wheel`,this.onWheel);for(let e of[...this.guests.keys()])this.removeGuest(e);this.ring.removeFromParent(),this.targetMark.removeFromParent()}};function fu(e,t,n){let r=t-e;for(;r>Math.PI;)r-=Math.PI*2;for(;r<-Math.PI;)r+=Math.PI*2;return e+r*Math.min(1,n)}var pu=class{hs=[];on(e){this.hs.push(e)}emit(e,...t){for(let n of this.hs)n[e]?.(...t)}},mu=[{name:`월요병`,battery:`low`,lines:[`오늘 회의만 네 개였어요…`,`그냥 구경만 할게요 ㅎㅎ`,`이 방 조명 좋네요`]},{name:`소금빵`,battery:`charging`,lines:[`와인 맛있어요 🍷`,`이 그림 색감 진짜 좋다`,`어느 방이 제일 좋았어요?`]},{name:`야근요정`,battery:`charging`,lines:[`방금 퇴근했어요 ㅠㅠ`,`여기 오니까 좀 살 것 같다`,`연못관 꼭 가보세요`]},{name:`꿀잠`,battery:`low`,lines:[`졸려요… zZ`,`의자 있는 데서 쉬어야지`,`말 걸어줘서 고마워요`]},{name:`하루`,battery:`charging`,lines:[`처음 와봤어요!`,`고릴라 그림 좋아해요`,`같이 둘러볼래요?`]}],hu=[`ㅋㅋㅋ 맞아요`,`오 그래요?`,`저도요!`,`와 공감해요`,`좋네요 🥂`,`천천히 쉬다 가요`],gu=()=>{let e=[];for(let t of[`garden`,`face`,`toy`,`pond`])for(let n of Nl(t))e.push({x:n.x+n.face.x*1.7,z:n.z+n.face.z*1.7});return e.push({x:5,z:-2.3},{x:7,z:-2.3},{x:3,z:1}),e},_u=class{selfId=`me`;roomId=`demo`;title=`혼자 체험하기`;isPrivate=!1;demo=!0;ev=new pu;me;bots=[];timer;spots=gu();constructor(e,t){let n=xl(gl);this.me={id:`me`,name:e,look:t,x:n.x,z:n.z,dir:0,moving:!1,battery:`charging`},mu.forEach((e,t)=>{let n={kind:al[(t+1)%al.length],color:(t*3+1)%8,prop:cl[(t+1)%cl.length]},r=xl(t<2?{x:4+t*2.5,z:-.5+t}:this.spots[t*5%this.spots.length]);this.bots.push({id:`bot${t}`,name:e.name,look:n,x:r.x,z:r.z,dir:Math.random()*6,moving:!1,battery:e.battery,target:null,wait:2+Math.random()*6,lines:e.lines,nextLine:3+Math.random()*6})}),this.timer=window.setInterval(()=>this.tick(1/10),100)}on(e){this.ev.on(e),e.add?.({...this.me});for(let t of this.bots)e.add?.(vu(t))}move(e,t,n,r){let i=bl({x:this.me.x,z:this.me.z},{x:e,z:t});Object.assign(this.me,{x:i.x,z:i.z,dir:n,moving:r})}chat(e){this.ev.emit(`chat`,`me`,e);let t=this.bots.filter(e=>Sl(e,this.me));if(!t.length)return;let n=t[Math.random()*t.length|0];window.setTimeout(()=>this.ev.emit(`chat`,n.id,hu[Math.random()*hu.length|0]),1100+Math.random()*1400)}emote(e){this.ev.emit(`emote`,`me`,e);for(let t of this.bots)if(Sl(t,this.me)&&Math.random()<.7){let n=e===`cheers`?`cheers`:rl[Math.random()*rl.length|0];window.setTimeout(()=>this.ev.emit(`emote`,t.id,n),400+Math.random()*900)}}async voice(e,t){this.ev.emit(`voice`,`me`,e,t)}battery(e){this.me.battery=e,this.ev.emit(`change`,{...this.me})}leave(){window.clearInterval(this.timer),this.ev.emit(`closed`,`left`)}tick(e){for(let t of this.bots){if(t.target){let n=t.target.x-t.x,r=t.target.z-t.z,i=Math.hypot(n,r);if(i<.15)t.target=null,t.moving=!1,t.wait=3+Math.random()*9;else{let a=Math.min(i,tl*.75*e),o=bl(t,{x:t.x+n/i*a,z:t.z+r/i*a});Math.hypot(o.x-t.x,o.z-t.z)<a*.2?(t.target=null,t.moving=!1,t.wait=1):(t.dir=Math.atan2(n,r),t.x=o.x,t.z=o.z,t.moving=!0)}}else if((t.wait-=e)<=0){if(t.battery===`low`&&Math.random()<.6)t.wait=6+Math.random()*8;else{let e=this.spots[Math.random()*this.spots.length|0];t.target=xl({x:e.x+(Math.random()-.5),z:e.z+(Math.random()-.5)*.6})}}Sl(t,this.me)&&(t.nextLine-=e,t.nextLine<=0&&(t.nextLine=9+Math.random()*12,t.battery===`charging`||Math.random()<.3?(this.ev.emit(`chat`,t.id,t.lines[Math.random()*t.lines.length|0]),t.moving||(t.dir=Math.atan2(this.me.x-t.x,this.me.z-t.z))):this.ev.emit(`emote`,t.id,`wave`))),this.ev.emit(`change`,vu(t))}if(Math.random()<.004){let e=this.bots[Math.random()*this.bots.length|0];Sl(e,this.me)&&this.ev.emit(`emote`,e.id,`cheers`)}}},vu=e=>({id:e.id,name:e.name,look:e.look,x:e.x,z:e.z,dir:e.dir,moving:e.moving,battery:e.battery});ArrayBuffer.isView||(ArrayBuffer.isView=e=>typeof e==`object`&&!!e&&e.buffer instanceof ArrayBuffer),typeof globalThis>`u`&&typeof window<`u`&&(window.globalThis=window),typeof FormData>`u`&&(globalThis.FormData=class{});var yu=255,bu=213,G;(function(e){e[e.ADD=128]=`ADD`,e[e.REPLACE=0]=`REPLACE`,e[e.DELETE=64]=`DELETE`,e[e.DELETE_AND_MOVE=96]=`DELETE_AND_MOVE`,e[e.MOVE_AND_ADD=160]=`MOVE_AND_ADD`,e[e.DELETE_AND_ADD=192]=`DELETE_AND_ADD`,e[e.CLEAR=10]=`CLEAR`,e[e.REVERSE=15]=`REVERSE`,e[e.MOVE=32]=`MOVE`,e[e.DELETE_BY_REFID=33]=`DELETE_BY_REFID`,e[e.ADD_BY_REFID=129]=`ADD_BY_REFID`})(G||={}),Symbol.metadata??=Symbol.for(`Symbol.metadata`);function xu(e){Object.defineProperty(e,Symbol.metadata,{value:void 0,writable:!0,configurable:!0,enumerable:!1})}var Su=(function(){return typeof globalThis<`u`?globalThis:typeof global<`u`?global:typeof self<`u`?self:typeof window<`u`?window:{}})();if(typeof Symbol==`function`&&typeof Symbol.for!=`function`){let e=`colyseus.symbolRegistry`,t=Su[e]||(Su[e]=Object.create(null));Symbol.for=function(e){return t[e]||(t[e]=Symbol(e))},Symbol.keyFor=function(e){for(let n in t)if(t[n]===e)return n}}var K=Symbol.for(`$refId`),Cu=`~track`,wu=`~encoder`,Tu=`~decoder`,Eu=`~filter`,Du=`~getByIndex`,Ou=`~deleteByIndex`,ku=`~resyncPrune`,q=Symbol.for(`$changes`),J=Symbol.for(`$childType`),Au=Symbol.for(`$proxyTarget`),ju=`~onEncodeEnd`,Mu=`~reset`,Nu=`~onDecodeEnd`,Pu=Symbol.for(`$values`),Fu=`~builder`,Iu=`~descriptors`,Lu=`~__encodeDescriptor`,Ru=`~encoders`,zu=`~__numFields`,Bu=`~__refTypeFieldIndexes`,Vu=`~__viewFieldIndexes`,Hu=`$__fieldIndexesByViewTag`,Uu=`~__unreliableFieldIndexes`,Wu=`~__patchOnlyFieldIndexes`,Gu=`~__fullSyncSkipIndexes`,Ku=`~__fullStateOnlyFieldIndexes`,qu=`~__streamFieldIndexes`,Ju=`~__streamPriorities`;try{new TextEncoder}catch{}var Yu=new ArrayBuffer(8),Xu=new Int32Array(Yu),Zu=new Float32Array(Yu),Qu=new Float64Array(Yu),$u=new BigInt64Array(Yu),ed=typeof Buffer<`u`&&Buffer.byteLength?Buffer.byteLength:function(e,t){for(var n=0,r=0,i=0,a=e.length;i<a;i++)n=e.charCodeAt(i),n<128?r+=1:n<2048?r+=2:n<55296||n>=57344?r+=3:(i++,r+=4);return r};function td(e,t,n){for(var r=0,i=0,a=t.length;i<a;i++)r=t.charCodeAt(i),r<128?e[n.offset++]=r:r<2048?(e[n.offset]=192|r>>6,e[n.offset+1]=128|r&63,n.offset+=2):r<55296||r>=57344?(e[n.offset]=224|r>>12,e[n.offset+1]=128|r>>6&63,e[n.offset+2]=128|r&63,n.offset+=3):(i++,r=65536+((r&1023)<<10|t.charCodeAt(i)&1023),e[n.offset]=240|r>>18,e[n.offset+1]=128|r>>12&63,e[n.offset+2]=128|r>>6&63,e[n.offset+3]=128|r&63,n.offset+=4)}function nd(e,t,n){e[n.offset++]=t&255}function rd(e,t,n){e[n.offset++]=t&255}function id(e,t,n){e[n.offset++]=t&255,e[n.offset++]=t>>8&255}function ad(e,t,n){e[n.offset++]=t&255,e[n.offset++]=t>>8&255}function od(e,t,n){e[n.offset++]=t&255,e[n.offset++]=t>>8&255,e[n.offset++]=t>>16&255,e[n.offset++]=t>>24&255}function sd(e,t,n){let r=t>>24,i=t>>16,a=t>>8,o=t;e[n.offset++]=o&255,e[n.offset++]=a&255,e[n.offset++]=i&255,e[n.offset++]=r&255}function cd(e,t,n){let r=Math.floor(t/2**32);sd(e,t>>>0,n),sd(e,r,n)}function ld(e,t,n){let r=t/2**32|0;sd(e,t>>>0,n),sd(e,r,n)}function ud(e,t,n){$u[0]=BigInt.asIntN(64,t),od(e,Xu[0],n),od(e,Xu[1],n)}function dd(e,t,n){$u[0]=BigInt.asIntN(64,t),od(e,Xu[0],n),od(e,Xu[1],n)}function fd(e,t,n){Zu[0]=t,od(e,Xu[0],n)}function pd(e,t,n){Qu[0]=t,od(e,Xu[0],n),od(e,Xu[1],n)}function md(e,t,n){e[n.offset++]=+!!t}function hd(e,t,n){t||=``;let r=ed(t,`utf8`),i=0;if(r<32)e[n.offset++]=r|160,i=1;else if(r<256)e[n.offset++]=217,e[n.offset++]=r,i=2;else if(r<65536)e[n.offset++]=218,ad(e,r,n),i=3;else if(r<4294967296)e[n.offset++]=219,sd(e,r,n),i=5;else throw Error(`String too long`);return td(e,t,n),i+r}function gd(e,t,n){return isNaN(t)?gd(e,0,n):isFinite(t)?t===(t|0)?t>=0?t<128?(e[n.offset++]=t&255,1):t<256?(e[n.offset++]=204,e[n.offset++]=t&255,2):t<65536?(e[n.offset++]=205,ad(e,t,n),3):t<4294967296?(e[n.offset++]=206,sd(e,t,n),5):(e[n.offset++]=207,ld(e,t,n),9):t>=-32?(e[n.offset++]=224|t+32,1):t>=-128?(e[n.offset++]=208,nd(e,t,n),2):t>=-32768?(e[n.offset++]=209,id(e,t,n),3):t>=-2147483648?(e[n.offset++]=210,od(e,t,n),5):(e[n.offset++]=211,cd(e,t,n),9):Math.abs(t)<=34028235e31&&(Zu[0]=t,Math.abs(Math.abs(Zu[0])-Math.abs(t))<1e-4)?(e[n.offset++]=202,fd(e,t,n),5):(e[n.offset++]=203,pd(e,t,n),9):gd(e,t>0?2**53-1:-(2**53-1),n)}var _d={int8:nd,uint8:rd,int16:id,uint16:ad,int32:od,uint32:sd,int64:cd,uint64:ld,bigint64:ud,biguint64:dd,float32:fd,float64:pd,boolean:md,string:hd,number:gd,utf8Write:td,utf8Length:ed},vd=new ArrayBuffer(8),yd=new Int32Array(vd),bd=new Float32Array(vd),xd=new Float64Array(vd),Sd=new BigUint64Array(vd),Cd=new BigInt64Array(vd);function wd(e,t,n){n>e.length-t.offset&&(n=e.length-t.offset);for(var r=``,i=0,a=t.offset,o=t.offset+n;a<o;a++){var s=e[a];if(!(s&128))r+=String.fromCharCode(s);else if((s&224)==192)r+=String.fromCharCode((s&31)<<6|e[++a]&63);else if((s&240)==224)r+=String.fromCharCode((s&15)<<12|(e[++a]&63)<<6|e[++a]&63);else if((s&248)==240)i=(s&7)<<18|(e[++a]&63)<<12|(e[++a]&63)<<6|e[++a]&63,i>=65536?(i-=65536,r+=String.fromCharCode((i>>>10)+55296,(i&1023)+56320)):r+=String.fromCharCode(i);else{console.error(`decode.utf8Read(): Invalid byte `+s+` at offset `+a+`. Skip to end of string: `+(t.offset+n));break}}return t.offset+=n,r}function Td(e,t){return Ed(e,t)<<24>>24}function Ed(e,t){return e[t.offset++]}function Dd(e,t){return Od(e,t)<<16>>16}function Od(e,t){return e[t.offset++]|e[t.offset++]<<8}function kd(e,t){return e[t.offset++]|e[t.offset++]<<8|e[t.offset++]<<16|e[t.offset++]<<24}function Ad(e,t){return kd(e,t)>>>0}function jd(e,t){return yd[0]=kd(e,t),bd[0]}function Md(e,t){return yd[0]=kd(e,t),yd[1]=kd(e,t),xd[0]}function Nd(e,t){let n=Ad(e,t);return kd(e,t)*2**32+n}function Pd(e,t){let n=Ad(e,t);return Ad(e,t)*2**32+n}function Fd(e,t){return yd[0]=kd(e,t),yd[1]=kd(e,t),Cd[0]}function Id(e,t){return yd[0]=kd(e,t),yd[1]=kd(e,t),Sd[0]}function Ld(e,t){return Ed(e,t)>0}function Rd(e,t){let n=e[t.offset++],r;return n<192?r=n&31:n===217?r=Ed(e,t):n===218?r=Od(e,t):n===219&&(r=Ad(e,t)),wd(e,t,r)}function zd(e,t){let n=e[t.offset++];if(n<128)return n;if(n===202)return jd(e,t);if(n===203)return Md(e,t);if(n===204)return Ed(e,t);if(n===205)return Od(e,t);if(n===206)return Ad(e,t);if(n===207)return Pd(e,t);if(n===208)return Td(e,t);if(n===209)return Dd(e,t);if(n===210)return kd(e,t);if(n===211)return Nd(e,t);if(n>223)return(255-n+1)*-1}function Bd(e,t){let n=e[t.offset];return n<192&&n>160||n===217||n===218||n===219}var Vd={utf8Read:wd,int8:Td,uint8:Ed,int16:Dd,uint16:Od,int32:kd,uint32:Ad,float32:jd,float64:Md,int64:Nd,uint64:Pd,bigint64:Fd,biguint64:Id,boolean:Ld,string:Rd,number:zd,stringCheck:Bd},Hd={},Ud=new Map;function Wd(e,t){t.constructor&&(Object.prototype.hasOwnProperty.call(t,`constructor`)&&t.constructor[Symbol.metadata]==null&&xu(t.constructor),Ud.set(t.constructor,e),Hd[e]=t),t.encode&&(_d[e]=t.encode),t.decode&&(Vd[e]=t.decode)}function Gd(e){return Hd[e]}var Kd="ArraySchema does not support streaming — positional ops (splice / unshift / reverse) shift subsequent indexes, so holding ADDs back for a later tick under `maxPerTick` would desync the decoder. Use `t.stream(X)` (stable monotonic positions) or `t.map(X).stream()` (stable keys) instead.";function qd(){return{pendingByView:new Map,sentByView:new Map,broadcastPending:new Set,sentBroadcast:new Set,broadcastDeletes:new Set,maxPerTick:32}}function Jd(e){return e._stream??=qd()}function Yd(e,t,n){t.activeViews.size===0&&Jd(e).broadcastPending.add(n)}function Xd(e,t,n,r){let i=e._stream;if(i===void 0)return!0;let a=!1;return i.broadcastPending.delete(r)?a=!0:i.sentBroadcast.delete(r)&&i.broadcastDeletes.add(r),t.forEachActiveView(e=>{let t=i.pendingByView.get(e.id);if(t?.has(r)){t.delete(r),a=!0;return}let o=i.sentByView.get(e.id);if(o?.has(r)){o.delete(r);let t=e.changes.get(n);t===void 0&&(t=new Map,e.changes.set(n,t)),t.set(r,G.DELETE)}}),a}function Zd(e,t,n){let r=e._stream;if(r!==void 0){r.broadcastPending.clear();for(let e of r.sentBroadcast)r.broadcastDeletes.add(e);r.sentBroadcast.clear(),t.forEachActiveView(e=>{r.pendingByView.get(e.id)?.clear();let t=r.sentByView.get(e.id);if(t!==void 0&&t.size>0){let r=e.changes.get(n);r===void 0&&(r=new Map,e.changes.set(n,r));for(let e of t)r.set(e,G.DELETE);t.clear()}})}}function Qd(e,t){let n=e._stream?.pendingByView;if(n===void 0)return!1;for(let[e,r]of n)if(r.size>0&&t.activeViews.get(e)?.deref()!==void 0)return!0;return!1}function $d(e){let t=e._stream;return t!==void 0&&(t.broadcastPending.size>0||t.broadcastDeletes.size>0)}function ef(e,t,n){let r=Jd(e),i=r.pendingByView.get(t);i===void 0&&(i=new Set,r.pendingByView.set(t,i)),i.add(n)}function tf(e,t){let n=e._stream;n!==void 0&&(n.pendingByView.delete(t),n.sentByView.delete(t),n.priorityByView?.delete(t))}var nf={8:`uint8`,16:`uint16`,32:`uint32`};function rf(e){if(typeof e!=`object`||!e)throw Error(`t.quantized(): options object with { min, max } is required.`);let{min:t,max:n}=e;if(typeof t!=`number`||typeof n!=`number`||!(n>t)||!Number.isFinite(t)||!Number.isFinite(n))throw Error(`t.quantized(): require finite min < max (got min=${t}, max=${n}).`);let r=e.bits??16;if(r!==8&&r!==16&&r!==32)throw Error(`t.quantized(): bits must be 8, 16 or 32 (got ${r}).`);let i=e.mode??`clamp`;if(i!==`clamp`&&i!==`wrap`)throw Error(`t.quantized(): mode must be "clamp" or "wrap" (got ${JSON.stringify(i)}).`);let a=i===`wrap`,o=2**r;return{min:t,max:n,bits:r,wrap:a,wire:nf[r],range:n-t,span:a?o:t===-n?o-2:o-1}}function af(e){return typeof e==`object`&&!!e&&e.quantized!==void 0}function of(e,t){if(e.wrap){if(!Number.isFinite(t))return 0;let n=e.range,r=(t-e.min)%n;r<0&&(r+=n);let i=e.span;return Math.floor(r/n*i+.5)%i}if(t!==t)return 0;let n=t<e.min?e.min:t>e.max?e.max:t;return Math.floor((n-e.min)/e.range*e.span+.5)}function sf(e,t){return e.min+t/e.span*e.range}function cf(e){let t=_d[e.wire];return(n,r,i)=>t(n,of(e,r),i)}function lf(e,t,n){let r=Vd[e.wire];return sf(e,r(t,n))}var uf=class e{types={};schemas=new Map;hasFilters=!1;static inheritedTypes=new WeakMap;static cachedContexts=new WeakMap;static register(t){let n=Object.getPrototypeOf(t);if(n!==Tm){let r=e.inheritedTypes.get(n);r||(r=new Set,e.inheritedTypes.set(n,r)),r.add(t)}}static cache(t){let n=e.cachedContexts.get(t);return n||(n=new e(t),e.cachedContexts.set(t,n)),n}constructor(e){e&&this.discoverTypes(e)}has(e){return this.schemas.has(e)}get(e){return this.types[e]}add(e,t=this.schemas.size){return!this.schemas.has(e)&&(this.types[t]=e,e[Symbol.metadata]??yf.initialize(e),this.schemas.set(e,t),!0)}getTypeId(e){return this.schemas.get(e)}discoverTypes(t){if(!this.add(t))return;e.inheritedTypes.get(t)?.forEach(e=>{this.discoverTypes(e)});let n=t;for(;(n=Object.getPrototypeOf(n))&&n!==Tm&&n!==Function.prototype;)this.discoverTypes(n);let r=t[Symbol.metadata];(r[Vu]||r[qu])&&(this.hasFilters=!0);for(let e in r){let t=r[e].type;if(typeof t!=`string`&&!af(t)){if(typeof t==`function`)this.discoverTypes(t);else{let e=Object.values(t)[0];if(typeof e==`string`)continue;this.discoverTypes(e)}}}}debug(){return`TypeContext ->\n\tSchema types: ${this.schemas.size}\n\thasFilters: ${this.hasFilters}`}},df=63;function ff(e){let t=mf(e);return t?{complexTypeKlass:Hd[t],childType:e[t]}:{complexTypeKlass:!1,childType:e}}function pf(e,t){let n=hf(e),r=mf(n),i=r&&mf(n[r]);if(i)throw Error(`${t?`${t}: `:``}@colyseus/schema: nested collections are not supported ("${r}" of "${i}"). Collections can only hold primitive types or Schema classes, wrap the inner ${i} in a Schema class.`);return n}function mf(e){return typeof e==`object`&&e?Object.keys(e).find(e=>Hd[e]!==void 0):void 0}function hf(e){if(typeof e!=`object`||!e)return e;if(Array.isArray(e))return{array:hf(e[0])};let t=gf(e);if(t)return t;if(af(e))return typeof e.quantized.wire==`string`?e:{quantized:rf(e.quantized)};if(e.type!==void 0)return hf(e.type);let n=mf(e);return n&&(e[n]=hf(e[n])),e}function gf(e){let t=Object.keys(e),n=t.filter(e=>/\d+/.test(e));if(n.length>0&&n.length===t.length/2&&e[e[n[0]]]==n[0])return`number`;if(t.length>0&&t.every(t=>e[t]===t))return`string`}var _f=[Bu,Uu,Wu,Gu,Ku,qu,Ru];function vf(e,t,n){e[t]||Object.defineProperty(e,t,{value:[],enumerable:!1,configurable:!0,writable:!0}),e[t].push(n)}var yf={addField(e,t,n,r,i){if(t>=df)throw Error(`Can't define field '${n}'.\nSchema instances may only have up to ${df} fields.`);e[t]=Object.assign(e[t]||{},{type:r,index:t,name:n}),Object.defineProperty(e,Iu,{value:e[Iu]||{},enumerable:!1,configurable:!0}),i?e[Iu][n]=i:e[Iu][n]={value:void 0,writable:!0,enumerable:!0,configurable:!0},Object.defineProperty(e,zu,{value:t,enumerable:!1,configurable:!0}),Object.defineProperty(e,n,{value:t,enumerable:!1,configurable:!0}),typeof e[t].type!=`string`&&!af(e[t].type)&&(e[Bu]===void 0&&Object.defineProperty(e,Bu,{value:[],enumerable:!1,configurable:!0}),e[Bu].push(t));let a=e[t].type;if(a&&typeof a==`object`&&a.stream!==void 0){if(a.array!==void 0)throw Error(Kd);e[t].stream=!0,e[qu]||Object.defineProperty(e,qu,{value:[],enumerable:!1,configurable:!0,writable:!0}),e[qu].includes(t)||e[qu].push(t);let i=r?.priority;typeof i==`function`&&yf.setStreamPriority(e,n,i)}},setTag(e,t,n){let r=e[t],i=e[r];if(i.tag=n,e[Vu]||(Object.defineProperty(e,Vu,{value:[],enumerable:!1,configurable:!0}),Object.defineProperty(e,Hu,{value:{},enumerable:!1,configurable:!0})),e[Vu].push(r),n<0)e[Hu][n]||(e[Hu][n]=[]),e[Hu][n].push(r);else for(let t=n;t>0;t&=t-1){let n=t&-t;e[Hu][n]||(e[Hu][n]=[]),e[Hu][n].push(r)}},setUnreliable(e,t){let n=e[t];if(typeof e[n].type!=`string`)throw Error(`@unreliable cannot be applied to ref-type field "${t}". For ref-type fields, mark each primitive sub-field with @unreliable instead. See README "Limitations and best practices".`);e[n].unreliable=!0,e[Uu]||Object.defineProperty(e,Uu,{value:[],enumerable:!1,configurable:!0,writable:!0}),e[Uu].push(n)},setPatchOnly(e,t){let n=e[t];if(e[n].fullStateOnly)throw Error(`field "${t}" cannot be both patchOnly and fullStateOnly — those are the only two delivery channels, so the field would never reach a client.`);e[n].patchOnly=!0,vf(e,Wu,n),vf(e,Gu,n)},setDeprecated(e,t){let n=e[t];e[n].deprecated=!0,vf(e,Gu,n),Object.defineProperty(e,n,{value:e[n],enumerable:!1,configurable:!0})},setFullStateOnly(e,t){let n=e[t];if(e[n].patchOnly)throw Error(`field "${t}" cannot be both patchOnly and fullStateOnly — those are the only two delivery channels, so the field would never reach a client.`);e[n].fullStateOnly=!0,vf(e,Ku,n)},setStream(e,t){let n=e[t];e[n].stream=!0,e[qu]||Object.defineProperty(e,qu,{value:[],enumerable:!1,configurable:!0,writable:!0}),e[qu].push(n)},setStreamPriority(e,t,n){let r=e[t];e[Ju]||Object.defineProperty(e,Ju,{value:{},enumerable:!1,configurable:!0,writable:!0}),e[Ju][r]=n},getStreamPriority(e,t){return e?.[Ju]?.[t]},defineField(e,t,n,r,i){let a=pf(i,`${e.name}.${r}`),{complexTypeKlass:o,childType:s}=ff(a);yf.addField(t,n,r,a,bm(r,n,s,o)),t[Iu][r]&&Object.defineProperty(e.prototype,r,t[Iu][r]),(typeof a==`string`||af(a))&&(t[Ru]||Object.defineProperty(t,Ru,{value:[],enumerable:!1,configurable:!0,writable:!0}),t[Ru][n]=typeof a==`string`?_d[a]:cf(a.quantized))},setFields(e,t){let n=e.prototype.constructor;uf.register(n);let r=Object.getPrototypeOf(n),i=r&&r[Symbol.metadata],a=yf.initialize(n);n[`~track`]||(n[Cu]=Tm[Cu]),n[`~encoder`]||(n[wu]=Tm[wu]),n[`~decoder`]||(n[Tu]=Tm[Tu]),n.prototype.toJSON||(n.prototype.toJSON=Tm.prototype.toJSON);let o=a[`~__numFields`]??(i&&i[`~__numFields`])??-1;o++,a[Ru]||Object.defineProperty(a,Ru,{value:i?.[Ru]?[...i[Ru]]:[],enumerable:!1,configurable:!0,writable:!0});for(let e in t){if(a[e]!==void 0)throw Error(`@colyseus/schema: Duplicate '${e}' definition on '${n.name||`(anonymous)`}'.`);yf.defineField(n,a,o,e,t[e]),o++}return e},isDeprecated(e,t){return e[t].deprecated===!0},initialize(e){let t=Object.getPrototypeOf(e),n=t[Symbol.metadata],r=e[Symbol.metadata]??Object.create(null);if(t!==Tm&&r===n&&(r=Object.create(null),n)){Object.setPrototypeOf(r,n),Object.defineProperty(r,zu,{value:n[zu],enumerable:!1,configurable:!0,writable:!0}),n[Vu]!==void 0&&(Object.defineProperty(r,Vu,{value:[...n[Vu]],enumerable:!1,configurable:!0,writable:!0}),Object.defineProperty(r,Hu,{value:{...n[Hu]},enumerable:!1,configurable:!0,writable:!0}));for(let e of _f){let t=n[e];t!==void 0&&Object.defineProperty(r,e,{value:[...t],enumerable:!1,configurable:!0,writable:!0})}Object.defineProperty(r,Iu,{value:{...n[Iu]},enumerable:!1,configurable:!0,writable:!0})}return Object.defineProperty(e,Symbol.metadata,{value:r,writable:!1,configurable:!0}),r},isValidInstance(e){return e.constructor[Symbol.metadata]&&Object.prototype.hasOwnProperty.call(e.constructor[Symbol.metadata],`~__numFields`)},getFields(e){let t=e[Symbol.metadata],n={};for(let e=0;e<=t[zu];e++)n[t[e].name]=t[e].type;return n},hasViewTagAtIndex(e,t){return e?.[Vu]?.includes(t)},hasUnreliableAtIndex(e,t){return e?.[Uu]?.includes(t)},hasPatchOnlyAtIndex(e,t){return e?.[Wu]?.includes(t)},hasFullStateOnlyAtIndex(e,t){return e?.[Ku]?.includes(t)},hasStreamAtIndex(e,t){return e?.[qu]?.includes(t)}},bf=(e,t,n)=>e(t,n),xf=class{dirtyLow=0;dirtyHigh=0;ops;constructor(e){this.ops=new Uint8Array(Math.max(e+1,1))}record(e,t){let n=this.ops[e];n===0?this.ops[e]=t:(n===G.DELETE||n===G.ADD&&t===G.DELETE_AND_ADD)&&(this.ops[e]=G.DELETE_AND_ADD),e<32?this.dirtyLow|=1<<e:this.dirtyHigh|=1<<e-32}recordDelete(e,t){this.ops[e]=t,e<32?this.dirtyLow|=1<<e:this.dirtyHigh|=1<<e-32}recordRaw(e,t){this.record(e,t)}operationAt(e){let t=this.ops[e];return t===0?void 0:t}setOperationAt(e,t){this.ops[e]=t}forEach(e){this.forEachWithCtx(e,bf)}forEachWithCtx(e,t){let n=this.dirtyLow,r=this.dirtyHigh,i=this.ops;for(;n!==0;){let r=n&-n,a=31-Math.clz32(r);n^=r,t(e,a,i[a])}for(;r!==0;){let n=r&-r,a=31-Math.clz32(n)+32;r^=n,t(e,a,i[a])}}size(){return Cf(this.dirtyLow)+Cf(this.dirtyHigh)}has(){return(this.dirtyLow|this.dirtyHigh)!==0}reset(){this.dirtyLow=0,this.dirtyHigh=0,this.ops.fill(0)}},Sf=class{dirty=new Map;pureOps=[];record(e,t){let n=this.dirty.get(e);n===void 0?this.dirty.set(e,t):(n===G.DELETE||n===G.ADD&&t===G.DELETE_AND_ADD)&&this.dirty.set(e,G.DELETE_AND_ADD)}recordDelete(e,t){this.dirty.set(e,t)}recordRaw(e,t){this.dirty.set(e,t)}recordPure(e){this.pureOps.push([this.dirty.size,e])}operationAt(e){return this.dirty.get(e)}setOperationAt(e,t){this.dirty.has(e)&&this.dirty.set(e,t)}forEach(e){this.forEachWithCtx(e,bf)}forEachWithCtx(e,t){let n=this.pureOps;if(n.length>0){let r=0,i=0;for(let[a,o]of this.dirty){for(;r<n.length&&n[r][0]<=i;){let i=n[r++][1];t(e,-i,i)}t(e,a,o),i++}for(;r<n.length;){let i=n[r++][1];t(e,-i,i)}}else for(let[n,r]of this.dirty)t(e,n,r)}size(){return this.dirty.size+this.pureOps.length}has(){return this.dirty.size>0||this.pureOps.length>0}reset(){this.dirty.clear(),this.pureOps.length=0}shift(e){let t=new Map;for(let[n,r]of this.dirty)t.set(n+e,r);this.dirty=t}};function Cf(e){return e-=e>>>1&1431655765,e=(e&858993459)+(e>>>2&858993459),(e+(e>>>4)&252645135)*16843009>>>24}function wf(e){if(e===void 0)return 0;let t=0;for(let n=0,r=e.length;n<r;n++){let r=e[n];r<32&&(t|=1<<r)}return t}function Tf(e){let t=[],n=[],r=[],i=[],a=e?.[zu];if(a===void 0)return{names:t,types:n,tags:r,encoders:i};let o=e[Ru];for(let s=0;s<=a;s++){let a=e[s];a===void 0?(t[s]=void 0,n[s]=void 0,r[s]=void 0,i[s]=void 0):(t[s]=a.name,n[s]=a.type,r[s]=a.tag,i[s]=o?.[s])}return{names:t,types:n,tags:r,encoders:i}}function Ef(e){let t=e.constructor;if(Object.prototype.hasOwnProperty.call(t,Lu))return t[Lu];let n=t[Symbol.metadata],r=yf.isValidInstance(e),i=(n?.[Vu]?.length??0)>0,a=Tf(n),o=r&&!i?void 0:t[Eu],s={encoder:t[wu],filter:o,metadata:n,isSchema:r,filterBitmask:r?wf(n?.[Vu]):0,hasAnyFullStateOnly:(n?.[Ku]?.length??0)>0,hasAnyUnreliable:(n?.[Uu]?.length??0)>0,hasAnyStream:(n?.[qu]?.length??0)>0,hasAnyView:i,fullStateOnlyBitmask:wf(n?.[Ku]),unreliableBitmask:wf(n?.[Uu]),streamBitmask:wf(n?.[qu]),names:a.names,types:a.types,tags:a.tags,encoders:a.encoders};return Object.defineProperty(t,Lu,{value:s,enumerable:!1,writable:!0,configurable:!0}),s}function Df(e,t,n){return e.parentRef&&(e.parentRef[q]===t[q]||jf(e,(e,n)=>e[q]===t[q]))?(e._parentIndex=n,!0):(e.parentRef===void 0?(e.parentRef=t,e._parentIndex=n):(e.extraParents={ref:e.parentRef,index:e._parentIndex,next:e.extraParents},e.parentRef=t,e._parentIndex=n),!1)}function Of(e,t,n){if(e.extraParents===void 0)e._parentIndex=n;else if(e.parentRef[q]===t[q])e._parentIndex=n;else for(let r=e.extraParents;r!==void 0;r=r.next)if(r.ref[q]===t[q]){r.index=n;return}}function kf(e,t){if(e.parentRef&&e.parentRef[q]===t[q])return e.extraParents?(e.parentRef=e.extraParents.ref,e._parentIndex=e.extraParents.index,e.extraParents=e.extraParents.next):(e.parentRef=void 0,e._parentIndex=void 0),!0;let n=e.extraParents,r=null;for(;n;){if(n.ref[q]===t[q])return r?r.next=n.next:e.extraParents=n.next,!0;r=n,n=n.next}return e.parentRef===void 0}function Af(e,t){if(e.parentRef!==void 0&&t(e.parentRef,e._parentIndex))return{ref:e.parentRef,index:e._parentIndex};for(let n=e.extraParents;n!==void 0;n=n.next)if(t(n.ref,n.index))return{ref:n.ref,index:n.index}}function jf(e,t){if(e.parentRef!==void 0&&t(e.parentRef,e._parentIndex))return!0;for(let n=e.extraParents;n!==void 0;n=n.next)if(t(n.ref,n.index))return!0;return!1}function Mf(e,t){if(e.parentRef&&e.parentRef[q]===t[q])return e._parentIndex;for(let n=e.extraParents;n!==void 0;n=n.next)if(n.ref[q]===t[q])return n.index}function Nf(e){let t=[];e.parentRef&&t.push({ref:e.parentRef,index:e._parentIndex});let n=e.extraParents;for(;n;)t.push({ref:n.ref,index:n.index}),n=n.next;return t}function Pf(e,t,n){let r=t.refTarget;if(t.isArray){let t=r.items,i=t[n];if(i!==void 0&&i[q]===e)return!0;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r!==void 0&&r[q]===e)return!0}return!1}let i=t.getValue(n);return i!==void 0&&i[q]===e}var Ff=(e,t)=>{e.isFieldUnreliable(t)?e.ensureUnreliableRecorder().record(t,G.ADD):e.record(t,G.ADD)},If=(e,t)=>e(t);function Lf(e,t){Rf(e,t,If)}function Rf(e,t,n){let r=e.refTarget;if(r[J]!==void 0){if(e.isPatchOnly)return;if(Array.isArray(r.items)){let e=r.items;for(let r=0,i=e.length;r<i;r++)e[r]!==void 0&&n(t,r)}else if(r.journal!==void 0)for(let[e,i]of r.journal.keyByIndex)r.$items.has(i)&&n(t,e);else if(r.$items!==void 0)for(let e of r.$items.keys())n(t,e)}else{let i=e.metadata;if(!i)return;let a=i[`~__numFields`]??-1,o=i[Gu],s=e.encDescriptor.names;for(let e=0;e<=a;e++){let i=s[e];i===void 0||o&&o.includes(e)||r[i]!=null&&n(t,e)}}}function zf(e,t,n,r){Bf(e,t,n),e.isFullStateOnly||(e.has()&&e.root?.enqueueChangeTree(e),e.unreliableRecorder?.has()&&e.root?.enqueueUnreliable(e),!e.has()&&!e.unreliableRecorder?.has()&&e.root?.enqueueChangeTree(e))}function Bf(e,t,n){if(!t)return;let r=t[q],i=!r._isSchema,a;i?(t=r.parent,n=r.parentIndex,a=t?.[q].metadata):a=r.metadata;let o=(a?.[Wu]?.includes(n)?pp:0)|(a?.[Ku]?.includes(n)?mp:0),s=r.flags&bp|o,c=e.flags;if(e.flags=c|s,s&~c&mp&&(e.reset(),e.unreliableRecorder?.reset()),!e.root?.types?.hasFilters)return;let l=a?.[Vu]?.includes(n)??!1,u=a?.[qu]?.includes(n)??!1,d=r.isFiltered||l||u;if(e.isFiltered=d,u&&!i){e.isStreamCollection=!0;let t=Jd(e.ref);if(t.priority===void 0){let e=yf.getStreamPriority(a,n);e!==void 0&&(t.priority=e)}e.root?.registerStream(e.ref)}if(d){let t=Hf(e);e.isVisibilitySharedWithParent=r.isFiltered&&t&&!u&&(!l||i&&a[n].tag!==dm)}}function Vf(e){let t=e.pendingFilterRefresh;for(let e=0;e<t.length;e++){let n=t[e];(n.flags&_p)!==0&&Uf(n)}t.length=0}function Hf(e){return e._isSchema||typeof e.refTarget[J]!=`string`}function Uf(e){e.flags&=~_p;let t=e.root;if(t===void 0||e.parentRef===void 0)return;let n=Hf(e),r=Jf(e,e.parentRef,e._parentIndex,n);for(let t=e.extraParents;t!==void 0&&r!==qf;t=t.next)r|=Jf(e,t.ref,t.index,n);if(r===0)return;e.isVisibilitySharedWithParent=(r&Kf)!==0;let i=(r&Gf)===0;i!==e.isFiltered&&(e.isFiltered=i,!i&&!e.isFullStateOnly&&(e.forEachLiveWithCtx(e,Ff),e.has()&&t.enqueueChangeTree(e),e.unreliableRecorder?.has()&&t.enqueueUnreliable(e)),e.forEachChildWithCtx(e,Yf))}var Wf=1,Gf=2,Kf=4,qf=7;function Jf(e,t,n,r){let i=t[q];if(i.root!==e.root||!Pf(e,i,n))return 0;i.flags&_p&&Uf(i);let a=Wf;if(i._isSchema)i.encDescriptor.tags[n]!==void 0||i.isFieldStream(n)||(i.isFiltered?r&&(a|=Kf):a|=Gf);else if(!i.isFiltered)a|=Gf;else if(r&&!i.isStreamCollection){let e=i.parent?.[q];(e?._isSchema?e.encDescriptor.tags[i.parentIndex]:void 0)!==dm&&(a|=Kf)}return a}var Yf=(e,t,n)=>{Uf(t)};function Xf(e,t,n,r){let i=e.subscribedViews;if(i===void 0)return;let a=e.isStreamCollection,o=a?e.ref:void 0,s=a?void 0:n[q];for(let e=0,n=i.length;e<n;e++){let n=i[e];for(;n!==0;){let c=n&-n;n^=c;let l=e*32+(31-Math.clz32(c)),u=r.activeViews.get(l)?.deref();u===void 0?i[e]&=~c:a?ef(o,l,t):s!==void 0&&u.markVisible(s)}}}function Zf(e,t){e.root=t;let n=t.add(e);zf(e,e.parent,e.parentIndex),n&&tp(e,t,np)}function Qf(e,t,n,r){let i=e.addParent(t,r);if(!n)return i;let a=n.add(e);n!==e.root&&(e.root=n,zf(e,t,r));let o=t?.[q];if(o!==void 0&&o.subscribedViews!==void 0&&t[J]!==void 0&&Xf(o,r,e.ref,n),a){let t=rp[ip];t===void 0&&(t={parentRef:void 0,root:void 0},rp[ip]=t),t.parentRef=e.ref,t.root=n,ip++,tp(e,t,ap),ip--}return i}function $f(e,t){tp(e,t,ep)}function ep(e,t,n){e(t,n)}function tp(e,t,n){let r=e.refTarget;if(r[J]){if(typeof r[J]!=`string`){let e=r.items;if(e!==void 0)for(let r=0,i=e.length;r<i;r++){let i=e[r];i&&n(t,i[q],r)}else{let e=r.$items,i=r._collectionIndexes;for(let r of e.keys()){let a=e.get(r);a&&n(t,a[q],i?.[r]??r)}}}}else{let i=e.metadata?.[Bu];if(!i)return;let a=e.encDescriptor.names;for(let e=0,o=i.length;e<o;e++){let o=i[e],s=r[a[o]];s&&n(t,s[q],o)}}}function np(e,t,n){t.root===e?e.add(t):t.setRoot(e)}var rp=[],ip=0;function ap(e,t,n){t.root===e.root?(e.root.add(t),e.root.moveNextToParent(t)):t.setParent(e.parentRef,e.root,n)}function op(e,t,n){let r=(n&3)<<3;return n<4?e>>>r&255:t>>>r&255}var sp=(e,t,n)=>e(t,n);function cp(){return{next:void 0,tail:void 0,nextPosition:0}}var lp=1,up=2,dp=4,fp=8,pp=16,mp=32,hp=64,gp=128,_p=256,vp=512,yp=1024,bp=48,xp=class{ref;refTarget;get isArray(){return this.refTarget!==this.ref}metadata;encDescriptor;root;parentRef;_parentIndex;extraParents;flags=dp;refCount=0;_fullSyncGen=0;_isSchema=!1;dirtyLow=0;dirtyHigh=0;opsLow=0;opsHigh=0;ops;collDirty;collPureOps;unreliableRecorder;paused=!1;changesNode;unreliableChangesNode;visibleViews;tagViews;subscribedViews;get isFiltered(){return(this.flags&lp)!==0}set isFiltered(e){this.flags=e?this.flags|lp:this.flags&-2}get isVisibilitySharedWithParent(){return(this.flags&up)!==0}set isVisibilitySharedWithParent(e){this.flags=e?this.flags|up:this.flags&-3}get isNew(){return(this.flags&dp)!==0}set isNew(e){this.flags=e?this.flags|dp:this.flags&-5}get isUnreliable(){return(this.flags&fp)!==0}set isUnreliable(e){this.flags=e?this.flags|fp:this.flags&-9}get isPatchOnly(){return(this.flags&pp)!==0}set isPatchOnly(e){this.flags=e?this.flags|pp:this.flags&-17}get isFullStateOnly(){return(this.flags&mp)!==0}set isFullStateOnly(e){this.flags=e?this.flags|mp:this.flags&-33}get isStreamCollection(){return(this.flags&hp)!==0}set isStreamCollection(e){this.flags=e?this.flags|hp:this.flags&-65}get needsRestage(){return(this.flags&gp)!==0}set needsRestage(e){this.flags=e?this.flags|gp:this.flags&-129}get hasFilteredFields(){return this.isFiltered||this.encDescriptor.hasAnyView}ensureUnreliableRecorder(){return this.unreliableRecorder===void 0&&(this.unreliableRecorder=this._isSchema?new xf(this.metadata?.[`~__numFields`]??0):new Sf),this.unreliableRecorder}isFieldUnreliable(e){let t=this.encDescriptor;return t.hasAnyUnreliable?e<32?!!(t.unreliableBitmask&1<<e):yf.hasUnreliableAtIndex(this.metadata,e):!1}isFieldFullStateOnly(e){if(this.isFullStateOnly)return!0;let t=this.encDescriptor;return t.hasAnyFullStateOnly?e<32?!!(t.fullStateOnlyBitmask&1<<e):yf.hasFullStateOnlyAtIndex(this.metadata,e):!1}isFieldStream(e){let t=this.encDescriptor;return t.hasAnyStream?e<32?!!(t.streamBitmask&1<<e):yf.hasStreamAtIndex(this.metadata,e):!1}constructor(e,t=e){this.ref=e,this.refTarget=t;let n=Ef(e);this.encDescriptor=n,this.metadata=n.metadata;let r=n.isSchema;if(this._isSchema=r,this.ops=void 0,this.collDirty=void 0,this.collPureOps=void 0,r){let e=this.metadata?.[`~__numFields`]??0;e>7&&(this.ops=new Uint8Array(e+1))}else this.collDirty=new Map}_opAt(e){let t=this.ops;if(t!==void 0)return t[e];let n=(e&3)<<3;return e<4?this.opsLow>>>n&255:this.opsHigh>>>n&255}_opPut(e,t){let n=this.ops;if(n!==void 0){n[e]=t;return}let r=(e&3)<<3,i=~(255<<r);e<4?this.opsLow=this.opsLow&i|t<<r:this.opsHigh=this.opsHigh&i|t<<r}_markDirty(e){e<32?this.dirtyLow|=1<<e:this.dirtyHigh|=1<<e-32}record(e,t){if(this._isSchema){let n=this._opAt(e);n===0?this._opPut(e,t):(n===G.DELETE||n===G.ADD&&t===G.DELETE_AND_ADD)&&this._opPut(e,G.DELETE_AND_ADD),this._markDirty(e)}else{let n=this.collDirty,r=n.get(e),i;i=r===void 0?t:r===G.DELETE||r===G.ADD&&t===G.DELETE_AND_ADD?G.DELETE_AND_ADD:r,n.set(e,i)}}recordDelete(e,t){this._isSchema?(this._opPut(e,t),this._markDirty(e)):this.collDirty.set(e,t)}recordRaw(e,t){this._isSchema?(this._opPut(e,t),this._markDirty(e)):this.collDirty.set(e,t)}recordPure(e){if(this._isSchema)throw Error(`ChangeTree (Schema): pure operations are not supported`);(this.collPureOps??=[]).push([this.collDirty.size,e])}operationAt(e){if(this._isSchema){let t=this._opAt(e);return t===0?void 0:t}return this.collDirty.get(e)}setOperationAt(e,t){if(this._isSchema)this._opPut(e,t);else{let n=this.collDirty;n.has(e)&&n.set(e,t)}}forEach(e){this.forEachWithCtx(e,sp)}forEachWithCtx(e,t){if(this._isSchema){let n=this.dirtyLow,r=this.dirtyHigh,i=this.ops;if(i!==void 0){for(;n!==0;){let r=n&-n,a=31-Math.clz32(r);n^=r,t(e,a,i[a])}for(;r!==0;){let n=r&-r,a=31-Math.clz32(n)+32;r^=n,t(e,a,i[a])}}else{let r=this.opsLow,i=this.opsHigh;for(;n!==0;){let a=n&-n,o=31-Math.clz32(a);n^=a,t(e,o,op(r,i,o))}}return}let n=this.collDirty,r=this.collPureOps;if(r!==void 0&&r.length>0){let i=0,a=0;for(let[o,s]of n){for(;i<r.length&&r[i][0]<=a;){let n=r[i++][1];t(e,-n,n)}t(e,o,s),a++}for(;i<r.length;){let n=r[i++][1];t(e,-n,n)}}else for(let[r,i]of n)t(e,r,i)}size(){return this._isSchema?Cf(this.dirtyLow)+Cf(this.dirtyHigh):this.collDirty.size+(this.collPureOps?.length??0)}has(){return this._isSchema?(this.dirtyLow|this.dirtyHigh)!==0:this.collDirty.size>0||this.collPureOps!==void 0&&this.collPureOps.length>0}reset(){this._isSchema?(this.dirtyLow=0,this.dirtyHigh=0,this.ops===void 0?(this.opsLow=0,this.opsHigh=0):this.ops.fill(0)):(this.collDirty.clear(),this.collPureOps!==void 0&&(this.collPureOps.length=0),this.flags&=-513)}recycle(){if(this.root!==void 0)throw Error(`@colyseus/schema: cannot recycle an attached ChangeTree (${this.ref?.constructor?.name}). Remove the instance from its parent collection before releasing it to a pool.`);this.reset(),this.unreliableRecorder?.reset(),this.flags=132,this._fullSyncGen=0,this.parentRef=void 0,this._parentIndex=void 0,this.extraParents=void 0,this.changesNode=void 0,this.unreliableChangesNode=void 0,this.paused=!1,this.visibleViews=void 0,this.tagViews=void 0,this.subscribedViews=void 0}insertAt(e,t){if(this._isSchema)throw Error(`ChangeTree (Schema): insertAt is not supported`);let n=this.collDirty,r=new Map,i=!this.paused&&!this.isFullStateOnly;if(e>0)for(let[t,i]of n)t<e&&r.set(t,i);if(i)for(let n=0;n<t;n++)r.set(e+n,G.ADD);for(let[i,a]of n)i>=e&&r.set(i+t,a);this.collDirty=r,i&&this.root?.enqueueChangeTree(this)}removeAt(e,t){if(this._isSchema)throw Error(`ChangeTree (Schema): removeAt is not supported`);let n=this.collDirty,r=e+t,i=!1;for(let e of n.keys())if(e>=r){i=!0;break}if(!i){for(let t=e;t<r;t++)n.delete(t);return}let a=new Map;for(let[i,o]of n)i<e?a.set(i,o):i>=r&&a.set(i-t,o);this.collDirty=a}setRoot(e){Zf(this,e)}setParent(e,t,n){return Qf(this,e,t,n)}forEachChild(e){$f(this,e)}forEachChildWithCtx(e,t){tp(this,e,t)}forEachLive(e){Lf(this,e)}forEachLiveWithCtx(e,t){Rf(this,e,t)}operation(e){this.paused||this.isFullStateOnly||(this.recordPure(e),this.root?.enqueueChangeTree(this))}_routeAndRecord(e,t,n){if(!(this.paused||this.isFieldFullStateOnly(e))){if(this.isFieldUnreliable(e)&&!this.isNew){let r=this.ensureUnreliableRecorder();n?r.recordRaw(e,t):r.record(e,t),this.root?.enqueueUnreliable(this)}else n?this.recordRaw(e,t):this.record(e,t),this.root?.enqueueChangeTree(this)}}change(e,t=G.ADD){this._routeAndRecord(e,t,!1)}indexedOperation(e,t){this._routeAndRecord(e,t,!0)}getChange(e){return this.operationAt(e)}pause(){this.paused=!0}resume(){this.paused=!1}untracked(e){let t=this.paused;this.paused=!0;try{return e()}finally{this.paused=t}}markDirty(e,t=G.ADD){let n=this.paused;this.paused=!1;try{this.change(e,t)}finally{this.paused=n}}getValue(e,t=!1){return this.refTarget[Du](e,t)}delete(e,t){if(e===void 0){try{throw Error(`@colyseus/schema ${this.ref.constructor.name}: trying to delete non-existing index '${e}'`)}catch(e){console.warn(e)}return}if(this.paused||this.isFieldFullStateOnly(e))return this.getValue(e);let n=this.isFieldUnreliable(e)&&!this.isNew;n?this.ensureUnreliableRecorder().recordDelete(e,t??G.DELETE):this.recordDelete(e,t??G.DELETE);let r=this.getValue(e);return r&&r[q]&&this.root?.remove(r[q]),n?this.root?.enqueueUnreliable(this):this.root?.enqueueChangeTree(this),r}endEncode(){this.reset(),this.changesNode=void 0,this._isSchema||this.refTarget[ju]?.(),this.isNew=!1}endEncodeUnreliable(){this.unreliableRecorder?.reset(),this.unreliableChangesNode=void 0,this._isSchema||this.refTarget[ju]?.()}discard(){this._isSchema||this.refTarget[ju]?.(),this.reset(),this.unreliableRecorder?.reset()}discardAll(){let e=e=>{if(e<0)return;let t=this.getValue(e);t&&t[q]&&t[q].discardAll()};this.forEach(e),this.unreliableRecorder?.forEach(e),this.discard()}get changed(){return this.has()||(this.unreliableRecorder?.has()??!1)}get parent(){return this.parentRef}get parentIndex(){return this._parentIndex}addParent(e,t){return Df(this,e,t)}setParentIndex(e,t){Of(this,e,t)}removeParent(e=this.parent){return kf(this,e)}findParent(e){return Af(this,e)}hasParent(e){return jf(this,e)}indexInParent(e){return Mf(this,e)}getAllParents(){return Nf(this)}},Sp=class{ref;root=void 0;parentRef=void 0;paused=!1;isNew=!1;flags=0;constructor(e){this.ref=e}change(){}delete(){}indexedOperation(){}operation(){}setParent(){return!1}addParent(){return!1}setParentIndex(){}removeParent(){return!1}getChange(){return 0}discard(){}discardAll(){}pause(){}resume(){}untracked(e){return e()}markDirty(){}forEachChild(e){let t=this.ref;if(t[J]){if(typeof t[J]!=`string`)for(let[n,r]of t.entries())r&&e(r[q],t._collectionIndexes?.[n]??n);return}let n=t.constructor?.[Symbol.metadata];if(!n)return;let r=n[Bu]??[];for(let i=0;i<r.length;i++){let a=r[i],o=t[n[a].name];o&&e(o[q],a)}}forEachChildWithCtx(e,t){this.forEachChild((n,r)=>t(e,n,r))}forEachLive(){}forEachLiveWithCtx(){}forEach(){}};function Cp(e){return new Sp(e)}function wp(e,t=e){Object.defineProperty(e,q,{value:Cp(t),enumerable:!1,writable:!0})}function Tp(e,t,n,r,i,a,o){o===void 0?typeof n==`string`?_d[n]?.(t,r,a):n[Symbol.metadata]==null?_d.number(t,r[K],a):(_d.number(t,r[K],a),(i&G.ADD)===G.ADD&&e.tryEncodeTypeId(t,n,r.constructor,a)):o(t,r,a)}var Ep=function(e,t,n,r,i,a,o,s){if(t[a.offset++]=(r|i)&255,i===G.DELETE)return;let c=n.encDescriptor,l=n.ref,u=l[Pu][r]??l[c.names[r]];Tp(e,t,c.types[r],u,i,a,c.encoders[r])},Dp=function(e,t,n,r,i,a){if(t[a.offset++]=i&255,_d.number(t,r,a),i===G.DELETE)return;let o=n.ref;if((i&G.ADD)===G.ADD){let e=o.$indexes.get(r);_d.string(t,e,a)}Tp(e,t,o[J],o[Du](r),i,a)},Op=function(e,t,n,r,i,a){if(t[a.offset++]=i&255,_d.number(t,r,a),i===G.DELETE)return;let o=n.ref;Tp(e,t,o[J],o[Du](r),i,a)};function kp(e,t){return e.replacedItems?.[t]??e.tmpItems[t]}function Ap(e,t,n){let r=e.tmpItems.indexOf(t);if(r!==-1&&r<n)return!0;let i=e.replacedItems?.indexOf(t)??-1;return i!==-1&&i<n}var jp=function(e,t,n,r,i,a,o,s){let c=n.refTarget,l=c[J],u=typeof l!=`string`,d=s&&n.isFiltered&&u,f;if(d){let e=i===G.DELETE?kp(c,r):c.tmpItems[r];if(!e)return;if(f=e[K],i===G.DELETE)i=G.DELETE_BY_REFID;else if((i&G.ADD)===G.ADD)i=G.ADD_BY_REFID;else return}else if(i===G.DELETE&&u){let e=kp(c,r);if(!e)return;(n.flags&yp)!==0&&e[q].root!==void 0&&Ap(c,e,r)?f=r:(f=e[K],i=G.DELETE_BY_REFID)}else f=r;t[a.offset++]=i&255,_d.number(t,f,a),i!==G.DELETE&&i!==G.DELETE_BY_REFID&&Tp(e,t,l,c[Du](r,o),i,a)};function Mp(e,t,n,r,i,a,o){let s=e.resyncVisited,c=s.get(e.currentRefId);if(c===void 0&&s.set(e.currentRefId,c=new Set),c.add(r),i!==void 0&&n===G.ADD&&i!==a){let n=i[K];n!==void 0&&(e.root.removeRef(n),o?.push({ref:t,refId:e.currentRefId,op:G.DELETE,dynamicIndex:r,value:void 0,previousValue:i}))}}function Np(e,t){let n=e.resyncVisited;n.has(t)||n.set(t,new Set)}function Pp(e,t){e.resyncDamaged?console.warn(`@colyseus/schema: resync sweep skipped — parts of the payload could not be decoded. Stale entries may persist until the next resync.`):Fp(e,e.state,new Set,t)}function Fp(e,t,n,r){let i=t[K];if(i===void 0||n.has(i))return;n.add(i);let a=t.constructor[Symbol.metadata],o=a?.[Bu];if(o===void 0)return;let s=a[Wu];for(let i=0;i<o.length;i++){let c=o[i];if(s!==void 0&&s.includes(c))continue;let l=a[c],u=t[l.name];u&&(Tm.is(l.type)?Fp(e,u,n,r):Ip(e,u,n,r))}}function Ip(e,t,n,r){let i=t[Au]??t,a=i[K];if(a===void 0||n.has(a))return;n.add(a);let o=e.resyncVisited.get(a);if(o===void 0)return;let s=e.root;i[ku](o,(e,n)=>{r?.push({ref:t,refId:a,op:G.DELETE,dynamicIndex:n,value:void 0,previousValue:e});let i=e?.[K];i!==void 0&&s.removeRef(i)},t=>{Tm.isSchema(t)&&Fp(e,t,n,r)})}var Lp=-1,Rp={Map:1,Array:2,Set:3,Collection:4,Stream:5};function zp(e,t,n,r,i,a,o,s,c){let l=e.root,u;if((t&G.DELETE)===G.DELETE){let e=i?.[K];e!==void 0&&l.removeRef(e),t!==G.DELETE_AND_ADD&&n[Ou](r),u=void 0}if(t!==G.DELETE){if(typeof a==`string`)u=Vd[a](o,s);else if(af(a))u=lf(a.quantized,o,s);else if(Tm.is(a)){let n=Vd.number(o,s);if(u=l.refs.get(n),(t&G.ADD)===G.ADD){let r=e.getInstanceType(o,s,a);u||=e.createInstanceOfType(r),l.addRef(n,u,u!==i||t===G.DELETE_AND_ADD&&u===i)}}else{let n=Gd(Object.keys(a)[0]),r=Vd.number(o,s);e.resyncVisited!==null&&Np(e,r);let d=l.refs.has(r)?i||l.refs.get(r):n.constructor.initializeForDecoder();if(u=d.clone(!0),u[J]=Object.values(a)[0],i){let e=i[K];if(e!==void 0&&r!==e){(t&G.DELETE)!==G.DELETE&&l.removeRef(e);let n=i.entries(),r;for(;(r=n.next())&&!r.done;){let[t,n]=r.value;typeof n==`object`&&(e=n[K]),c?.push({ref:i,refId:e,op:G.DELETE,field:t,value:void 0,previousValue:n})}}}l.addRef(r,u,d!==i||t===G.DELETE_AND_ADD&&d===i)}}return u}var Bp=function(e,t,n,r,i){let a=t[n.offset++],o=r.constructor[Symbol.metadata],s=a>>6<<6,c=a%(s||255),l=o[c];if(l===void 0)return console.warn(`@colyseus/schema: field not defined at`,{index:c,ref:r.constructor.name,metadata:o}),Lp;let u=l.deprecated===!0,d=u?void 0:r[Du](c),f=zp(e,s,r,c,d,l.type,t,n,i);u||(f!=null&&(r[l.name]=f),d!==f&&i?.push({ref:r,refId:e.currentRefId,op:s,field:l.name,value:f,previousValue:d}))},Vp=function(e,t,n,r,i){let a=r[Au]??r,o=t[n.offset++];if(o===G.CLEAR){e.removeChildRefs(a,i),a.clear();return}let s=Vd.number(t,n),c=a[J],l=a.constructor.COLLECTION_KIND,u;(o&G.ADD)===G.ADD?l===Rp.Map?(u=Vd.string(t,n),a.setIndex(s,u)):u=s:u=a.getIndex(s);let d=a[Du](s),f=zp(e,o,r,s,d,c,t,n,i);if(e.resyncVisited!==null&&Mp(e,r,o,u,d,f,i),f!=null)switch(l){case Rp.Map:a.$items.set(u,f);break;case Rp.Array:a.$setAt(s,f,e.resyncVisited!==null&&o===G.ADD?G.REPLACE:o);break;case Rp.Set:case Rp.Collection:case Rp.Stream:a.$items.has(s)||(a.$items.set(s,f),typeof a.$refId==`number`&&s>=a.$refId&&(a.$refId=s+1));break;default:console.warn(`@colyseus/schema: missing COLLECTION_KIND on ${a.constructor?.name} — item at index ${s} was not stored.`)}d!==f&&i?.push({ref:r,refId:e.currentRefId,op:o,dynamicIndex:u,value:f,previousValue:d})},Hp=function(e,t,n,r,i){let a=r[Au]??r,o=t[n.offset++],s;if(o===G.CLEAR){e.removeChildRefs(a,i),a.clear();return}if(o===G.REVERSE){a.items.reverse();return}if(o===G.DELETE_BY_REFID){let o=Vd.number(t,n),c=e.root.refs.get(o);if(c===void 0||(e.root.removeRef(o),s=a.findIndex(e=>e===c),s===-1))return;a[Ou](s),i?.push({ref:r,refId:e.currentRefId,op:G.DELETE,dynamicIndex:s,value:void 0,previousValue:c});return}if(o===G.ADD_BY_REFID){let r=Vd.number(t,n),i=e.root.refs.get(r);i&&(s=a.findIndex(e=>e===i)),(s===-1||s===void 0)&&(s=a.length)}else s=Vd.number(t,n);let c=a[J],l=s,u=a.items[s],d=zp(e,o,r,s,u,c,t,n,i);e.resyncVisited!==null&&Mp(e,r,o,s,u,d,i),d!=null&&d!==u&&a.$setAt(s,d,e.resyncVisited!==null&&o===G.ADD?G.REPLACE:o),u!==d&&i?.push({ref:r,refId:e.currentRefId,op:o,dynamicIndex:l,value:d,previousValue:u})},Up=class extends Error{};function Wp(e,t,n,r){if(!(e instanceof t))throw new Up(`a '${t.name}' was expected, but '${e&&e.constructor.name}' was provided in ${n.constructor.name}#${r}`)}var Gp=(e,t)=>{let n=e.toString(),r=t.toString();return n<r?-1:+(n>r)},Kp={get:(e,t)=>typeof t!=`symbol`&&!isNaN(t)?e.items[t]:Reflect.get(e,t),set:(e,t,n)=>{if(typeof t!=`symbol`&&!isNaN(t)){if(n==null)e.$deleteAt(t);else{let r;if(n[q]){Wp(n,e[J],e,t);let i=e.items[t];e.isMovingItems?(r=e.$wireIndex(Number(t)),i===void 0?n[q].isNew&&e[q].indexedOperation(r,G.ADD):n[q].isNew?e[q].indexedOperation(r,G.MOVE_AND_ADD):(e[q].getChange(r)&G.DELETE)===G.DELETE?e[q].indexedOperation(r,G.DELETE_AND_MOVE):e[q].indexedOperation(r,G.MOVE),n[q].setParent(e,e[q].root,r)):r=e.$changeAt(Number(t),n),i!==void 0&&i[q].root?.remove(i[q])}else r=e.$changeAt(Number(t),n);e.items[t]=n,r!==void 0&&(e.tmpItems[r]=n)}return!0}return Reflect.set(e,t,n)},deleteProperty:(e,t)=>(typeof t==`number`?e.$deleteAt(t):delete e[t],!0),has:(e,t)=>typeof t!=`symbol`&&!isNaN(Number(t))?Reflect.has(e.items,t):Reflect.has(e,t)},qp=class e{[q];[K];[Au];[J];items=[];tmpItems=[];deletedIndexes=[];replacedItems=void 0;isMovingItems=!1;_needsCompaction=!1;static[wu]=jp;static[Tu]=Hp;static COLLECTION_KIND=Rp.Array;static[Eu](e,t,n){if(!n)return!0;let r=e[Au]??e;return typeof r[J]==`string`||n.isChangeTreeVisible(r.tmpItems[t]?.[q])}static is(e){return Array.isArray(e)||e.array!==void 0}static from(t){return new e(...Array.from(t))}constructor(...e){this[J]=void 0,this[Au]=this;let t=new Proxy(this,Kp);return Object.defineProperty(this,q,{value:new xp(t,this),enumerable:!1,writable:!0}),e.length>0&&this.push(...e),t}static initializeForDecoder(){let t=Object.create(e.prototype);t.items=[],t.isMovingItems=!1,t._needsCompaction=!1,t[J]=void 0,t[Au]=t;let n=new Proxy(t,Kp);return wp(t,n),n}set length(e){e===0?this.clear():e<this.items.length?this.splice(e,this.length-e):console.warn(`ArraySchema: can't set .length to a higher value than its length.`)}get length(){return this.items.length}pauseTracking(){this[q].pause()}resumeTracking(){this[q].resume()}untracked(e){return this[q].untracked(e)}get isTrackingPaused(){return this[q].paused}push(...e){let t=this[Au],n=t.items,r=t.tmpItems,i=t[q],a=t[J],o=r.length;for(let s=0,c=e.length;s<c;s++,o++){let c=e[s];if(c==null)return;typeof c==`object`&&a&&Wp(c,a,t,s),i.indexedOperation(o,G.ADD),n.push(c),r.push(c),c[q]?.setParent(this,i.root,o)&&(i.flags|=yp)}return o}pop(){let e=this[Au],t=e.tmpItems,n=e.deletedIndexes,r=-1;for(let e=t.length-1;e>=0;e--)if(n[e]!==!0){r=e;break}if(r<0)return;if(e.$settleReorder(r))return this.pop();let i=e.$isUnsentAdd(r);return e[q].delete(r),i?e.$cancelAdd(r):n[r]=!0,e.items.pop()}at(e){return e<0&&(e+=this.length),this.items[e]}$wireIndex(e){let t=this.deletedIndexes;if(t.length===0)return e;let n=this.tmpItems,r=0;for(let i=0;i<n.length;i++)if(t[i]!==!0){if(r===e)return i;r++}return n.length+(e-r)}$canReorderInPlace(){if(this.deletedIndexes.length>0)return!1;if(typeof this[J]==`string`)return!0;for(let e of this[q].collDirty.values())if((e&(G.ADD|G.DELETE))!==0)return!1;return!0}$settleReorder(e){if(typeof this[J]==`string`)return!1;let t=this[q];return t.paused||t.operationAt(e)!==G.REPLACE?!1:(this.$restate(this.items.slice()),!0)}$restate(e){let t=this[q].ref;t.clear(),t.push(...e)}$isUnsentAdd(e){let t=this[q];return!(t.flags&576)&&!t.paused&&t.operationAt(e)===G.ADD}$cancelAdd(e,t=!0){let n=this[q],r=this.tmpItems[e];this.tmpItems.splice(e,1),this.deletedIndexes.length>0&&this.deletedIndexes.splice(e,1),n.removeAt(e,1),this.replacedItems?.splice(e,1);let i=r?.[q];i!==void 0&&i.root===void 0&&i.removeParent(this),t&&this.$reindexChildren(e)}$stashReplaced(e){if(typeof this[J]==`string`)return;let t=this[q];if(t.paused||t.isFullStateOnly)return;let n=this.replacedItems??=[];n[e]===void 0&&(n[e]=this.tmpItems[e])}$insertSlots(e,t,n){let r=this[q],i=n.length;r.insertAt(t,i);for(let a=0;a<i;a++)n[a]?.[q]?.setParent(e,r.root,t+a)&&(r.flags|=yp);t===0?this.tmpItems.unshift(...n):this.tmpItems.splice(t,0,...n),this.deletedIndexes.length>0&&this.deletedIndexes.splice(t,0,...Array(i).fill(!1)),this.replacedItems?.splice(t,0,...Array(i)),this.$reindexChildren(t+i)}$reindexChildren(e,t){if(!this[q].hasFilteredFields||typeof this[J]==`string`)return;let n=this.tmpItems,r=n.length;if(t!==void 0)for(;e<r&&n[e]===t[e];)e++;for(let t=e;t<r;t++)n[t]?.[q]?.setParentIndex(this,t)}$changeAt(e,t){if(t==null){console.error("ArraySchema items cannot be null nor undefined; Use `splice(index, 1)` instead.");return}if(this.items[e]===t)return;let n=this.$wireIndex(e);if(this.$settleReorder(n))return this.$changeAt(e,t);let r=this[q],i=this.items[e]!==void 0,a=G.ADD;return i&&typeof t!=`object`?a=G.REPLACE:i&&r.operationAt(n)!==G.ADD&&(this.$stashReplaced(n),a=G.DELETE_AND_ADD),r.change(n,a),t[q]?.setParent(this,r.root,n)&&(r.flags|=yp),n}$deleteAt(e,t){this[q].delete(this.$wireIndex(e),t)}$setAt(e,t,n){n===G.ADD&&this.items[e]!==void 0?this.items.splice(e,0,t):n===G.DELETE_AND_MOVE?(this.items.splice(e,1),this.items[e]=t):(e>this.items.length&&(this._needsCompaction=!0),this.items[e]=t)}clear(){let e=this[Au];if(e.items.length===0)return;let t=e[q];t.forEachChild((n,r)=>{t.root?.remove(n),n.removeParent(e)}),t.flags&=-1025,t.discard(),t.operation(G.CLEAR),e.items.length=0,e.tmpItems.length=0,e.replacedItems=void 0}[Mu](){let e=this[Au]??this,t=e[q];if(t.isStreamCollection)throw Error(`@colyseus/schema: cannot reset a streamed ArraySchema (pooling not supported).`);let n=e.items;for(let e=0;e<n.length;e++)n[e]?.[Mu]?.();e.items.length=0,e.tmpItems.length=0,e.deletedIndexes.length=0,e.replacedItems=void 0,t.recycle(),e[K]=void 0}concat(...t){return new e(...this.items.concat(...t))}join(e){return this.items.join(e)}reverse(){let e=this[Au],t=e[q];return t.paused?(e.items.reverse(),this):t.has()||e.deletedIndexes.length>0?(e.$restate(e.items.slice().reverse()),this):(t.operation(G.REVERSE),e.items.reverse(),e.tmpItems.reverse(),e.$reindexChildren(0),this)}shift(){let e=this[Au],t=e.items;if(t.length===0)return;let n=e[q],r=e.deletedIndexes,i=0;for(;r[i]===!0;)i++;if(e.$settleReorder(i))return this.shift();let a=e.$isUnsentAdd(i);return n.delete(i,G.DELETE),a?e.$cancelAdd(i):r[i]=!0,t.shift()}slice(t,n){let r=new e;return r.push(...this.items.slice(t,n)),r}sort(e=Gp){let t=this[Au],n=t.items,r=t[q];if(r.paused)return n.sort(e),this;if(!t.$canReorderInPlace())return t.$restate(n.slice().sort(e)),this;let i=t.tmpItems,a=typeof t[J]==`string`&&r.has();n.sort(e);let o=-1;for(let e=0,t=n.length;e<t;e++){let t=i[e]!==n[e];(t||a)&&(t&&o<0&&(o=e),r.change(e,G.REPLACE),i[e]=n[e])}return o>=0&&t.$reindexChildren(o),this}splice(e,t,...n){let r=this[Au],i=r[q],a=r.items,o=r.tmpItems,s=r.deletedIndexes,c=a.length,l=o.length,u=n.length,d=Math.trunc(e)||0;e=d<0?Math.max(c+d,0):Math.min(d,c),t=arguments.length===1?c-e:Math.min(Math.max(Math.trunc(t)||0,0),c-e);let f=[];for(let e=0;e<l;e++)s[e]!==!0&&f.push(e);let p,m=e+t;for(let i=e;i<m;i++)if(r.$settleReorder(f[i]))return this.splice(e,t,...n);for(let t=e;t<m;t++){let e=f[t],n=r.$isUnsentAdd(e);i.delete(e,G.DELETE),n?(p??=[]).push(e):s[e]=!0}if(u>0){let a=f[e]??l,c=Math.min(u,t);for(let e=0;e<c;e++){let t=a+e,c=p===void 0?-1:p.indexOf(t);c!==-1&&p.splice(c,1);let l=G.ADD;s[t]&&(r.$stashReplaced(t),l=G.DELETE_AND_ADD),i.indexedOperation(t,l),o[t]=n[e],s[t]=!1,n[e][q]?.setParent(this,i.root,t)&&(i.flags|=yp)}u>c&&r.$insertSlots(this,a+c,n.slice(c))}if(p!==void 0&&p.length>0){for(let e=p.length-1;e>=0;e--)r.$cancelAdd(p[e],!1);r.$reindexChildren(p[0])}return i.root?.enqueueChangeTree(i),a.splice(e,t,...n)}unshift(...e){let t=this[Au];return t.$insertSlots(this,t.$wireIndex(0),e),t.items.unshift(...e)}indexOf(e,t){return this.items.indexOf(e,t)}lastIndexOf(e,t=this.length-1){return this.items.lastIndexOf(e,t)}every(e,t){return this.items.every(e,t)}some(e,t){return this.items.some(e,t)}forEach(e,t){return this.items.forEach(e,t)}map(e,t){return this.items.map(e,t)}filter(e,t){return this.items.filter(e,t)}reduce(e,t){return this.items.reduce.apply(this.items,arguments)}reduceRight(e,t){return this.items.reduceRight.apply(this.items,arguments)}find(e,t){return this.items.find(e,t)}findIndex(e,t){return this.items.findIndex(e,t)}fill(e,t,n){throw Error(`ArraySchema#fill() not implemented`)}copyWithin(e,t,n){throw Error(`ArraySchema#copyWithin() not implemented`)}toString(){return this.items.toString()}toLocaleString(){return this.items.toLocaleString()}[Symbol.iterator](){return this.items[Symbol.iterator]()}static get[Symbol.species](){return e}[Symbol.unscopables];entries(){return this.items.entries()}keys(){return this.items.keys()}values(){return this.items.values()}includes(e,t){return this.items.includes(e,t)}flatMap(e,t){throw Error(`ArraySchema#flatMap() is not supported.`)}flat(e){throw Error(`ArraySchema#flat() is not supported.`)}findLast(){return this.items.findLast.apply(this.items,arguments)}findLastIndex(...e){return this.items.findLastIndex.apply(this.items,arguments)}with(t,n){let r=this.items.slice();return t<0&&(t+=this.length),r[t]=n,new e(...r)}toReversed(){return this.items.slice().reverse()}toSorted(e){return this.items.slice().sort(e)}toSpliced(e,t,...n){let r=this.items.slice();return r.splice.apply(r,arguments),r}shuffle(){return this.move(e=>{let t=this.items.length;for(;t!=0;){let e=Math.floor(Math.random()*t);t--,[this[t],this[e]]=[this[e],this[t]]}})}move(e){return this.isMovingItems=!0,e(this),this.isMovingItems=!1,this}[Du](e,t=!1){let n=this[Au]??this;return t||n.deletedIndexes[e]?n.items[e]:n.tmpItems[e]||n.items[e]}[Ou](e){let t=this[Au]??this;t.items[e]=void 0,t._needsCompaction=!0}[ju](){let e=this.tmpItems;this.tmpItems=this.items.slice(),this.replacedItems=void 0,this.deletedIndexes.length>0&&(this.$reindexChildren(0,e),this.deletedIndexes.length=0)}[Nu](){let e=this[Au]??this;e._needsCompaction&&(e._needsCompaction=!1,e.items=e.items.filter(e=>e!==void 0))}[ku](e,t,n){let r=this[Au]??this,i=r.items,a=!1;for(let o=0;o<i.length;o++){let s=i[o];e.has(o)?n(s):(a=!0,t(s,o),r[Ou](o))}a&&r[Nu]()}toArray(){return this.items.slice(0)}toJSON(){return this.toArray().map(e=>typeof e.toJSON==`function`?e.toJSON():e)}clone(t){let n;return t?(n=new e,n.push(...this.items)):n=new e(...this.map(e=>e[q]?e.clone():e)),n}};Wd(`array`,{constructor:qp});var Jp=class{keyByIndex=new Map;indexByKey=Object.create(null);nextIndex=0;snapshots;indexOf(e){let t=this.indexByKey[e];return t===void 0?void 0:t}assign(e){let t=this.nextIndex++;return this.indexByKey[e]=t,this.keyByIndex.set(t,e),t}snapshot(e,t){(this.snapshots??=new Map).set(e,t)}forgetSnapshot(e){this.snapshots?.delete(e)}snapshotAt(e){return this.snapshots?.get(e)}setIndex(e,t){this.keyByIndex.set(e,t),this.indexByKey[t]=e}keyOf(e){return this.keyByIndex.get(e)}cleanupAfterEncode(){if(this.snapshots!==void 0){for(let[e]of this.snapshots){let t=this.keyByIndex.get(e);t!==void 0&&(delete this.indexByKey[t],this.keyByIndex.delete(e))}this.snapshots.clear()}}reset(){this.indexByKey=Object.create(null),this.keyByIndex.clear(),this.snapshots?.clear(),this.nextIndex=0}},Yp=class e{[q];[K];childType;[J];$items=new Map;journal=new Jp;_stream;get maxPerTick(){return this._stream?.maxPerTick??32}set maxPerTick(e){(this._stream??=qd()).maxPerTick=e}get priority(){return this._stream?.priority}set priority(e){(this._stream??=qd()).priority=e}get $indexes(){return this.journal.keyByIndex}get _collectionIndexes(){return this.journal.indexByKey}static[wu]=Dp;static[Tu]=Vp;static COLLECTION_KIND=Rp.Map;static[Eu](e,t,n){if(!n||typeof e[J]==`string`)return!0;let r=e[`~getByIndex`](t)??e.journal.snapshotAt(t);return n.isChangeTreeVisible(r[q])}static is(e){return e.map!==void 0}constructor(t){if(Object.defineProperty(this,q,{value:new xp(this),enumerable:!1,writable:!0}),this[J]=void 0,t){if(t instanceof Map||t instanceof e)t.forEach((e,t)=>this.set(t,e));else for(let e in t)this.set(e,t[e])}}static initializeForDecoder(){let t=Object.create(e.prototype);return t.$items=new Map,t.journal=new Jp,t[J]=void 0,wp(t),t}[Symbol.iterator](){return this.$items[Symbol.iterator]()}get[Symbol.toStringTag](){return this.$items[Symbol.toStringTag]}static get[Symbol.species](){return e}set(e,t){if(t==null)throw Error(`MapSchema#set('${e}', ${t}): trying to set ${t} value on '${e}'.`);typeof t==`object`&&this[J]&&Wp(t,this[J],this,e),e=e.toString();let n=this[q],r=t[q]!==void 0,i=this.journal,a=i.indexOf(e),o;if(a!==void 0){o=G.REPLACE;let n=this.$items.get(e);if(n===t)return;r&&(o=G.DELETE_AND_ADD,n!==void 0&&n[q].root?.remove(n[q])),i.snapshotAt(a)!==void 0&&i.forgetSnapshot(a)}else a=i.assign(e),o=G.ADD;return this.$items.set(e,t),o===G.ADD&&n.isStreamCollection?n.root!==void 0&&Yd(this,n.root,a):n.change(a,o),r&&t[q].setParent(this,n.root,a),this}get(e){return this.$items.get(e)}getOrInsert(e,t){return this.$items.has(e)?this.$items.get(e):(this.set(e,t),t)}getOrInsertComputed(e,t){if(this.$items.has(e))return this.$items.get(e);let n=t(e);return this.set(e,n),n}delete(e){if(!this.$items.has(e))return!1;let t=this.journal.indexOf(e),n=this.$items.get(e),r=this[q];if(r.isStreamCollection){let i=r.root,a=!1;return i!==void 0&&(a=Xd(this,i,this[K],t)),n?.[q]!==void 0&&i?.remove(n[q]),this.$items.delete(e),a||this.journal.snapshot(t,n),!0}return this.journal.snapshot(t,n),r.delete(t),this.$items.delete(e)}clear(){let e=this[q];e.discard(),e.forEachChild((t,n)=>{e.root?.remove(t)}),this.journal.reset(),this.$items.clear(),e.operation(G.CLEAR)}[Mu](){let e=this[q];if(e.isStreamCollection)throw Error(`@colyseus/schema: cannot reset a streamed MapSchema (pooling not supported).`);this.$items.forEach(e=>e?.[Mu]?.()),this.$items.clear(),this.journal.reset(),e.recycle(),this[K]=void 0}has(e){return this.$items.has(e)}forEach(e){this.$items.forEach(e)}entries(){return this.$items.entries()}keys(){return this.$items.keys()}values(){return this.$items.values()}get size(){return this.$items.size}pauseTracking(){this[q].pause()}resumeTracking(){this[q].resume()}untracked(e){return this[q].untracked(e)}get isTrackingPaused(){return this[q].paused}setIndex(e,t){this.journal.setIndex(e,t)}getIndex(e){return this.journal.keyOf(e)}[Du](e){let t=this.journal.keyOf(e);return t===void 0?void 0:this.$items.get(t)}[Ou](e){let t=this.journal.keyOf(e);t!==void 0&&(this.$items.delete(t),this.journal.keyByIndex.delete(e))}[ku](e,t,n){let r=null;if(this.$items.forEach((i,a)=>{e.has(a)?n(i):((r??=new Set).add(a),t(i,a))}),r!==null){r.forEach(e=>{this.$items.delete(e),delete this.journal.indexByKey[e]});let e=[];this.journal.keyByIndex.forEach((t,n)=>{r.has(t)&&e.push(n)});for(let t=0;t<e.length;t++)this.journal.keyByIndex.delete(e[t])}}[ju](){this.journal.cleanupAfterEncode()}_dropView(e){tf(this,e)}_unregister(){}toJSON(){return Object.fromEntries(Array.from(this,([e,t])=>[e,typeof t.toJSON==`function`?t.toJSON():t]))}clone(t){let n;return t?n=Object.assign(new e,this):(n=new e,this.forEach((e,t)=>{e[q]?n.set(t,e.clone()):n.set(t,e)})),n}};Wd(`map`,{constructor:Yp});var Xp=class e{[q];[K];[J];$items=new Map;deletedItems={};$refId=0;_stream;get maxPerTick(){return this._stream?.maxPerTick??32}set maxPerTick(e){(this._stream??=qd()).maxPerTick=e}get priority(){return this._stream?.priority}set priority(e){(this._stream??=qd()).priority=e}static[wu]=Op;static[Tu]=Vp;static COLLECTION_KIND=Rp.Collection;static[Eu](e,t,n){return!n||typeof e[J]==`string`||n.isChangeTreeVisible((e[`~getByIndex`](t)??e.deletedItems[t])[q])}static is(e){return e.collection!==void 0}constructor(e){Object.defineProperty(this,q,{value:new xp(this),enumerable:!1,writable:!0}),this[J]=void 0,e&&e.forEach(e=>this.add(e))}static initializeForDecoder(){let t=Object.create(e.prototype);return t.$items=new Map,t.deletedItems={},t.$refId=0,t[J]=void 0,wp(t),t}add(e){let t=this.$refId++,n=this[q];return this.$items.set(t,e),n.isStreamCollection?n.root!==void 0&&Yd(this,n.root,t):n.change(t),e[q]!==void 0&&e[q].setParent(this,n.root,t),t}at(e){let t=Array.from(this.$items.keys())[e];return this.$items.get(t)}entries(){return this.$items.entries()}delete(e){let t=this.$items.entries(),n,r;for(;(r=t.next())&&!r.done;)if(e===r.value[1]){n=r.value[0];break}if(n===void 0)return!1;let i=this[q];if(i.isStreamCollection){let e=i.root,t=this.$items.get(n);return e!==void 0&&Xd(this,e,this[K],n),t?.[q]!==void 0&&e?.remove(t[q]),this.deletedItems[n]=t,this.$items.delete(n)}return this.deletedItems[n]=i.delete(n),this.$items.delete(n)}clear(){let e=this[q];e.discard(),e.forEachChild((t,n)=>{e.root?.remove(t)}),this.$items.clear(),e.operation(G.CLEAR)}[Mu](){let e=this[q];if(e.isStreamCollection)throw Error(`@colyseus/schema: cannot reset a streamed CollectionSchema (pooling not supported).`);this.$items.forEach(e=>e?.[Mu]?.()),this.$items.clear(),this.deletedItems={},this.$refId=0,e.recycle(),this[K]=void 0}has(e){return Array.from(this.$items.values()).some(t=>t===e)}forEach(e){this.$items.forEach((t,n,r)=>e(t,n,this))}values(){return this.$items.values()}get size(){return this.$items.size}pauseTracking(){this[q].pause()}resumeTracking(){this[q].resume()}untracked(e){return this[q].untracked(e)}get isTrackingPaused(){return this[q].paused}[Symbol.iterator](){return this.$items.values()}setIndex(e,t){}getIndex(e){return e}[Du](e){return this.$items.get(e)}[Ou](e){this.$items.delete(e)}[ku](e,t,n){let r=null;if(this.$items.forEach((i,a)=>{e.has(a)?n(i):((r??=[]).push(a),t(i,a))}),r!==null)for(let e=0;e<r.length;e++)this[Ou](r[e])}[ju](){for(let e in this.deletedItems)delete this.deletedItems[e]}_dropView(e){tf(this,e)}_unregister(){}toArray(){return Array.from(this.$items.values())}toJSON(){let e=[];return this.forEach((t,n)=>{e.push(typeof t.toJSON==`function`?t.toJSON():t)}),e}clone(t){let n;return t?n=Object.assign(new e,this):(n=new e,this.forEach(e=>{e[q]?n.add(e.clone()):n.add(e)})),n}};Wd(`collection`,{constructor:Xp});var Zp=class e{[q];[K];[J];$items=new Map;deletedItems={};$refId=0;_stream;get maxPerTick(){return this._stream?.maxPerTick??32}set maxPerTick(e){(this._stream??=qd()).maxPerTick=e}get priority(){return this._stream?.priority}set priority(e){(this._stream??=qd()).priority=e}static[wu]=Op;static[Tu]=Vp;static COLLECTION_KIND=Rp.Set;static[Eu](e,t,n){return!n||typeof e[J]==`string`||n.isVisible((e[`~getByIndex`](t)??e.deletedItems[t])[q])}static is(e){return e.set!==void 0}constructor(e){Object.defineProperty(this,q,{value:new xp(this),enumerable:!1,writable:!0}),this[J]=void 0,e&&e.forEach(e=>this.add(e))}static initializeForDecoder(){let t=Object.create(e.prototype);return t.$items=new Map,t.deletedItems={},t.$refId=0,t[J]=void 0,wp(t),t}add(e){if(this.has(e))return!1;let t=this.$refId++,n=this[q];return this.$items.set(t,e),n.isStreamCollection?n.root!==void 0&&Yd(this,n.root,t):n.change(t,G.ADD),e[q]!==void 0&&e[q].setParent(this,n.root,t),t}entries(){return this.$items.entries()}delete(e){let t=this.$items.entries(),n,r;for(;(r=t.next())&&!r.done;)if(e===r.value[1]){n=r.value[0];break}if(n===void 0)return!1;let i=this[q];if(i.isStreamCollection){let e=i.root,t=this.$items.get(n);return e!==void 0&&Xd(this,e,this[K],n),t?.[q]!==void 0&&e?.remove(t[q]),this.deletedItems[n]=t,this.$items.delete(n)}return this.deletedItems[n]=i.delete(n),this.$items.delete(n)}clear(){let e=this[q];e.discard(),this.$items.clear(),e.operation(G.CLEAR)}[Mu](){let e=this[q];if(e.isStreamCollection)throw Error(`@colyseus/schema: cannot reset a streamed SetSchema (pooling not supported).`);this.$items.forEach(e=>e?.[Mu]?.()),this.$items.clear(),this.deletedItems={},this.$refId=0,e.recycle(),this[K]=void 0}has(e){let t=this.$items.values(),n=!1,r;for(;(r=t.next())&&!r.done;)if(e===r.value){n=!0;break}return n}forEach(e){this.$items.forEach((t,n,r)=>e(t,n,this))}values(){return this.$items.values()}get size(){return this.$items.size}pauseTracking(){this[q].pause()}resumeTracking(){this[q].resume()}untracked(e){return this[q].untracked(e)}get isTrackingPaused(){return this[q].paused}[Symbol.iterator](){return this.$items.values()}setIndex(e,t){}getIndex(e){return e}[Du](e){return this.$items.get(e)}[Ou](e){this.$items.delete(e)}[ku](e,t,n){let r=null;if(this.$items.forEach((i,a)=>{e.has(a)?n(i):((r??=[]).push(a),t(i,a))}),r!==null)for(let e=0;e<r.length;e++)this[Ou](r[e])}[ju](){for(let e in this.deletedItems)delete this.deletedItems[e]}_dropView(e){tf(this,e)}_unregister(){}toArray(){return Array.from(this.$items.values())}toJSON(){let e=[];return this.forEach((t,n)=>{e.push(typeof t.toJSON==`function`?t.toJSON():t)}),e}clone(t){let n;return t?n=Object.assign(new e,this):(n=new e,this.forEach(e=>{e[q]?n.add(e.clone()):n.add(e)})),n}};Wd(`set`,{constructor:Zp});var Qp=class e{[q];[K];[J];$items=new Map;$nextPosition=0;_itemIndex=new Map;_stream;get maxPerTick(){return this._stream?.maxPerTick??32}set maxPerTick(e){(this._stream??=qd()).maxPerTick=e}get priority(){return this._stream?.priority}set priority(e){(this._stream??=qd()).priority=e}static $isStream=!0;static[wu]=Op;static[Tu]=Vp;static COLLECTION_KIND=Rp.Stream;static[Eu](e,t,n){if(!n)return!0;let r=e[Du](t);return r!==void 0&&n.isVisible(r[q])}static is(e){return e&&e.stream!==void 0}constructor(){Object.defineProperty(this,q,{value:new xp(this),enumerable:!1,writable:!0}),this[J]=void 0}static initializeForDecoder(){let t=Object.create(e.prototype);return t.$items=new Map,t.$nextPosition=0,t._itemIndex=new Map,t[J]=void 0,wp(t),t}add(e){if(this._itemIndex.has(e))return-1;let t=this.$nextPosition++;this.$items.set(t,e),this._itemIndex.set(e,t);let n=this[q].root;return e[q]!==void 0&&e[q].setParent(this,n,t),n!==void 0&&Yd(this,n,t),t}remove(e){let t=this._itemIndex.get(e);if(t===void 0)return!1;this._itemIndex.delete(e),this.$items.delete(t);let n=this[q].root;return n!==void 0&&(Xd(this,n,this[K],t),e[q]!==void 0&&n.remove(e[q])),!0}has(e){return this._itemIndex.has(e)}clear(){let e=this[q].root;if(e!==void 0){Zd(this,e,this[K]);for(let t of this.$items.values())t[q]!==void 0&&e.remove(t[q])}this.$items.clear(),this._itemIndex.clear()}forEach(e){for(let[t,n]of this.$items)e(n,t,this)}values(){return this.$items.values()}entries(){return this.$items.entries()}[Symbol.iterator](){return this.$items.values()}get size(){return this.$items.size}get length(){return this.$items.size}setIndex(e,t){}getIndex(e){return e}[Du](e){return this.$items.get(e)}[Ou](e){let t=this.$items.get(e);t!==void 0&&(this._itemIndex.delete(t),this.$items.delete(e))}[ku](){}[ju](){}toArray(){return Array.from(this.$items.values())}toJSON(){let e=[];return this.forEach(t=>{e.push(typeof t?.toJSON==`function`?t.toJSON():t)}),e}clone(t){if(t)return Object.assign(new e,this);let n=new e;return n.maxPerTick=this.maxPerTick,this.forEach(e=>{n.add(typeof e?.clone==`function`?e.clone():e)}),n}_dropView(e){tf(this,e)}_unregister(){}};Wd(`stream`,{constructor:Qp});var $p=class{[Fu]=!0;_type;_default=void 0;_hasDefault=!1;_view=void 0;_unreliable=!1;_patchOnly=!1;_deprecated=!1;_deprecatedThrows=!0;_fullStateOnly=!1;_stream=!1;_optional=!1;_noSync=!1;_streamPriority=void 0;constructor(e){this._type=e}default(e){return this._default=e,this._hasDefault=!0,this}view(e){return this._view=e??-1,this}unreliable(){return this._unreliable=!0,this}patchOnly(){return this._patchOnly=!0,this}fullStateOnly(){return this._fullStateOnly=!0,this}noSync(){return this._noSync=!0,this}stream(){let e=this._type;if(e&&typeof e==`object`&&e.array!==void 0)throw Error(Kd);return this._stream=!0,this}priority(e){return this._streamPriority=e,this}deprecated(e=!0){return this._deprecated=!0,this._deprecatedThrows=e,this}optional(){return this._optional=!0,this}toDefinition(){return{type:this._type,default:this._default,hasDefault:this._hasDefault,view:this._view,unreliable:this._unreliable,patchOnly:this._patchOnly,deprecated:this._deprecated,deprecatedThrows:this._deprecatedThrows,fullStateOnly:this._fullStateOnly,stream:this._stream,optional:this._optional,noSync:this._noSync,streamPriority:this._streamPriority}}};function em(e){return e!=null&&e[Fu]===!0}function tm(e){return(()=>new $p(e))}function nm(e){if(em(e)){let t=e._type,n=typeof t==`string`?`use the type name instead: t.array("${t}")`:`collections accept a Schema class or a primitive type name ("string", "number", …)`;throw Error(`t.array/map/set/collection(): a t.* builder is not a valid element type — ${n}.`)}return e}var rm=(e=>new $p({array:nm(e)})),im=(e=>new $p({map:nm(e)})),am=(e=>new $p({set:nm(e)})),om=(e=>new $p({collection:nm(e)})),sm=(e=>{let t=new $p({stream:nm(e)});return t._stream=!0,t}),cm=(e=>new $p(e));function lm(e){return new $p({quantized:rf(e)})}var um=Object.freeze({string:tm(`string`),number:tm(`number`),boolean:tm(`boolean`),int8:tm(`int8`),uint8:tm(`uint8`),int16:tm(`int16`),uint16:tm(`uint16`),int32:tm(`int32`),uint32:tm(`uint32`),int64:tm(`int64`),uint64:tm(`uint64`),float32:tm(`float32`),float64:tm(`float64`),bigint64:tm(`bigint64`),biguint64:tm(`biguint64`),ref:cm,array:rm,map:im,set:am,collection:om,stream:sm,quantized:lm,angle:e=>lm({min:0,max:Math.PI*2,mode:`wrap`,bits:e?.bits??16})}),dm=-1;function fm(e=dm){return function(t,n){let r=yf.initialize(t.constructor);yf.setTag(r,n,e)}}function pm(e,t){let n=yf.initialize(e.constructor);yf.setUnreliable(n,t)}function mm(e,t){let n=yf.initialize(e.constructor);yf.setPatchOnly(n,t)}var hm={number:`number`,int8:`number`,uint8:`number`,int16:`number`,uint16:`number`,int32:`number`,uint32:`number`,int64:`number`,uint64:`number`,float32:`number`,float64:`number`,bigint64:`bigint`,biguint64:`bigint`,string:`string`,boolean:`boolean`};function gm(e,t,n){let r=hm[n],i=n===`string`,a=n===`boolean`;return function(n){let o=this[Pu],s=o[t];if(n!==s){if(n!=null){if(!a&&r!==void 0&&typeof n!==r&&!(i&&n===null)){let t=n&&n.constructor?` (${n.constructor.name})`:``;throw new Up(`a '${r}' was expected, but '${JSON.stringify(n)}'${t} was provided in ${this.constructor.name}#${e}`)}this.constructor[Cu](this[q],t,G.ADD)}else s!=null&&this[q].delete(t);o[t]=n}}}function _m(e,t,n){return function(r){let i=this[Pu],a=i[t];if(r!==a){if(r!=null){Wp(r,n,this,e);let i=this[q],o=this.constructor;a!=null&&a[q]?(i.root?.remove(a[q]),o[Cu](i,t,G.DELETE_AND_ADD)):o[Cu](i,t,G.ADD),r[q]?.setParent(this,i.root,t)}else a!=null&&this[q].delete(t);i[t]=r}}}function vm(e,t,n,r){let i=r.constructor===qp,a=r.constructor===Yp;return function(e){let r=this[Pu],o=r[t];if(e!==o){if(e!=null){if(i&&!(e instanceof qp)){let t=new qp;t[J]=n,t.push(...e),e=t}else if(a&&!(e instanceof Yp)){let t=new Yp;if(t[J]=n,e instanceof Map)e.forEach((e,n)=>t.set(n,e));else for(let n in e)t.set(n,e[n]);e=t}else e[J]=n;let r=this[q],s=this.constructor;o!=null&&o[q]?(r.root?.remove(o[q]),s[Cu](r,t,G.DELETE_AND_ADD)):s[Cu](r,t,G.ADD),e[q]?.setParent(this,r.root,t)}else o!=null&&this[q].delete(t);r[t]=e}}}function ym(e,t,n){return function(r){let i=this[Pu],a=i[t];if(r!=null){if(typeof r!=`number`)throw new Up(`a 'number' was expected, but '${JSON.stringify(r)}' was provided in ${this.constructor.name}#${e}`);if(r=sf(n,of(n,r)),r===a)return;this.constructor[Cu](this[q],t,G.ADD)}else{if(r===a)return;a!=null&&this[q].delete(t)}i[t]=r}}function bm(e,t,n,r){let i;return i=r?vm(e,t,n,r):typeof n==`string`?gm(e,t,n):af(n)?ym(e,t,n.quantized):_m(e,t,n),{get:function(){return this[Pu][t]},set:i,enumerable:!0,configurable:!0}}function xm(e=!0){return function(t,n){let r=yf.initialize(t.constructor);yf.setDeprecated(r,n),e&&(r[Iu]??={},r[Iu][n]={get:function(){throw Error(`${n} is deprecated.`)},set:function(e){},enumerable:!1,configurable:!0},Object.defineProperty(t,n,r[Iu][n]))}}function Sm(e){if(e&&typeof e==`object`){if(e.array!==void 0)return()=>new qp;if(e.map!==void 0)return()=>new Yp;if(e.set!==void 0)return()=>new Zp;if(e.collection!==void 0)return()=>new Xp;if(e.stream!==void 0)return()=>new Qp}else if(typeof e==`function`&&Tm.is(e)&&(!e.prototype.initialize||e.prototype.initialize.length===0))return()=>new e}function Cm(e,t,n=Tm){if(typeof e!=`object`||!e)throw Error(`schema(): first argument must be a fields object (got ${typeof e}).`);let r={},i={},a={},o={},s=(e,t)=>{typeof t==`function`?o[e]=t:t&&typeof t.clone==`function`?o[e]=()=>t.clone():a[e]=t},c=(e,t)=>{if(t.hasDefault)s(e,t.default);else if(!t.optional){let n=Sm(t.type);n&&(o[e]=n)}},l={},u=[],d=[],f={},p=[],m=[],h={},g=[];for(let n in e){let a=e[n],s=`schema(${t?`'${t}'`:``}): field '${n}'`;if(em(a)){let e=a.toDefinition();if(e.noSync){if(e.view!==void 0||e.unreliable||e.patchOnly||e.fullStateOnly||e.stream)throw Error(`${s} uses .noSync() together with a sync-only modifier (.view/.unreliable/.patchOnly/.fullStateOnly/.stream). A local-only field cannot be synchronized.`);c(n,e);continue}if(e.patchOnly&&e.fullStateOnly)throw Error(`${s} uses .patchOnly() together with .fullStateOnly(). Those are the only two delivery channels, so the field would never reach a client — use .noSync() if that is intended.`);let t=pf(e.type,s);if(typeof t==`function`&&!Tm.is(t))throw Error(`${s} is a synced ref to non-Schema class '${t.name||`(anonymous)`}' — use .noSync(), or Metadata.setFields().`);r[n]=t,e.view!==void 0&&(l[n]=e.view),e.unreliable&&u.push(n),e.patchOnly&&d.push(n),e.deprecated&&(f[n]=e.deprecatedThrows),e.fullStateOnly&&p.push(n),e.stream&&m.push(n),e.streamPriority!==void 0&&(h[n]=e.streamPriority),e.optional&&g.push(n),c(n,e)}else if(typeof a==`function`)Tm.is(a)?(r[n]=a,a.prototype.initialize&&a.prototype.initialize.length!==0||(o[n]=()=>new a)):i[n]=a;else throw Error(`${s} must be a t.* builder, Schema subclass, or method (got ${typeof a}).`)}let _=e=>{for(let t in a)e[t]=a[t];for(let t in o)e[t]=o[t]()},v=()=>{let e={};return _(e),e},y=e=>{let t=Object.keys(r),n={};for(let r in e)t.includes(r)||(n[r]=e[r]);return n},b=typeof i.initialize==`function`,x=i.initialize??n._initialize,S=class extends n{constructor(...e){let t=e[0];t===void 0?(super(),_(this)):super(Object.assign(v(),b?y(t):t)),x&&new.target===S&&x.apply(this,e)}};t&&Object.defineProperty(S,"name",{value:t}),yf.setFields(S,r),S._getDefaultValues=v,S._initialize=x,Object.assign(S.prototype,i);for(let e in l)fm(l[e])(S.prototype,e);for(let e of u)pm(S.prototype,e);for(let e of d)mm(S.prototype,e);for(let e in f)xm(f[e])(S.prototype,e);if(p.length>0||m.length>0){let e=S[Symbol.metadata];for(let t of p)yf.setFullStateOnly(e,t);for(let t of m)yf.setStream(e,t);for(let t in h)yf.setStreamPriority(e,t,h[t])}if(g.length>0){let e=S[Symbol.metadata];for(let t of g)e[e[t]].optional=!0}return S.extend=(e,t)=>Cm(e,t,S),S}function wm(e){return Array(e).fill(0).map((t,n)=>n===e-1?`└─ `:`   `).join(``)}var Tm=class e{static[wu]=Ep;static[Tu]=Bp;[K];[Pu];static initialize(e){Object.defineProperty(e,q,{value:new xp(e),enumerable:!1,writable:!0}),e[Pu]=[]}static initializeForDecoder(){let e=Object.create(this.prototype);return wp(e),e[Pu]=[],e}static reset(e){let t=e?.[q];if(t===void 0||typeof t.recycle!=`function`)throw Error(`@colyseus/schema: Schema.reset() requires a tracked (encoder-side) instance.`);if(t.extraParents!==void 0)throw Error(`@colyseus/schema: cannot reset a shared instance (${e.constructor.name}) with multiple parents.`);e[Mu]()}[Mu](){let e=this.constructor[Symbol.metadata]?.[Bu]??[],t=this[Pu];for(let n=0;n<e.length;n++)t[e[n]]?.[Mu]?.();this[q].recycle(),this[K]=void 0}static is(e){let t=e[Symbol.metadata];return typeof t==`object`&&!!t}static isSchema(e){return typeof e?.assign==`function`}static[Cu](e,t,n=G.ADD){e.change(t,n)}static[Eu](e,t,n){let r=e.constructor[Symbol.metadata][t]?.tag;return n===void 0?r===void 0:r===void 0?!0:r===dm?n.isChangeTreeVisible(e[q]):n.hasTagOnTree(e[q],r)}constructor(t){e.initialize(this),t&&e.assignProps(this,t)}assign(t){return e.assignProps(this,t),this}static assignProps(e,t){let n=e.constructor[Symbol.metadata];if(n&&n[`~__numFields`]!==void 0)for(let r=0;r<=n[zu];r++){let i=n[r];if(!i)continue;let a=t[i.name];a!==void 0&&(e[i.name]=a)}let r=Object.keys(t);for(let i=0;i<r.length;i++){let a=r[i];n&&n[a]!==void 0||(e[a]=t[a])}}restore(t){let n=this.constructor[Symbol.metadata];for(let r in n){let i=n[r],a=i.name,o=i.type,s=t[a];if(s!=null){if(typeof o==`string`)this[a]=s;else if(e.is(o)){let e=new o;e.restore(s),this[a]=e}else if(typeof o==`object`){let t=Object.keys(o)[0],n=o[t];if(t===`map`){let t=this[a];for(let r in s)if(e.is(n)){let e=new n;e.restore(s[r]),t.set(r,e)}else t.set(r,s[r])}else if(t===`array`){let t=this[a];for(let r=0;r<s.length;r++)if(e.is(n)){let e=new n;e.restore(s[r]),t.push(e)}else t.push(s[r])}}}}return this}setDirty(e,t){let n=this.constructor[Symbol.metadata];this[q].change(n[n[e]].index,t)}pauseTracking(){this[q].pause()}resumeTracking(){this[q].resume()}untracked(e){return this[q].untracked(e)}get isTrackingPaused(){return this[q].paused}clone(){let t=Object.create(this.constructor.prototype);e.initialize(t);let n=this.constructor[Symbol.metadata];for(let e in n){let r=n[e].name;t[r]=typeof this[r]==`object`&&typeof this[r]?.clone==`function`?this[r].clone():this[r]}return t}toJSON(){let e={},t=this.constructor[Symbol.metadata];for(let n in t){let r=t[n],i=r.name;!r.deprecated&&this[i]!==null&&this[i]!==void 0&&(e[i]=typeof this[i].toJSON==`function`?this[i].toJSON():this[i])}return e}discardAllChanges(){this[q].discardAll()}[Du](e){let t=this.constructor[Symbol.metadata];return this[t[e].name]}[Ou](e){let t=this.constructor[Symbol.metadata];this[t[e].name]=void 0}static debugRefIds(e,t=!1,n=0,r,i=``){let a=t?` - ${JSON.stringify(e.toJSON())}`:``,o=e[q],s=e[K],c=r?r.root.refCount[s]:o.refCount,l=c>1?` [×${c}]`:``,u=`${wm(n)}${i}${e.constructor.name} (refId: ${s})${l}${a}\n`;return o.forEachChild((i,a)=>{let o=a;typeof a==`number`&&e.$indexes&&(o=e.$indexes.get(a)??a);let s=e.forEach!==void 0&&o!==void 0?`["${o}"]: `:``;u+=this.debugRefIds(i.ref,t,n+1,r,s)}),u}static debugRefIdEncodingOrder(e,t=`allChanges`){let n=[],r=e[q];if(t===`changes`){let e=r.root.changes?.next;for(;e;)e.changeTree&&n.push(e.changeTree.ref[K]),e=e.next;return n}let i=t===`allFilteredChanges`,a=new Set,o=e=>{a.has(e)||(a.add(e),e.isFiltered===i&&n.push(e.ref[K]),e.forEachChild((e,t)=>o(e)))};return o(r),n}static debugRefIdsFromDecoder(e){return this.debugRefIds(e.state,!1,0,e)}static debugChanges(e,t=!1){let n=e[q],r=t?`allChanges`:`changes`,i=`${e.constructor.name} (${e[K]}) -> .${r}:\n`;return t?n.forEachLive(e=>{i+=`- [${e}]: ADD (${JSON.stringify(n.getValue(Number(e),!0))})\n`}):n.forEach((e,t)=>{e<0||!t||(i+=`- [${e}]: ${G[t]} (${JSON.stringify(n.getValue(Number(e),!1))})\n`)}),i}};xu(Tm);var Em={value:0,enumerable:!1,writable:!0},Dm=class{types;nextUniqueId=0;changeTrees={};get refCount(){let e={};for(let t in this.changeTrees)e[t]=this.changeTrees[t].refCount;return e}changes=cp();unreliableChanges=cp();pendingFilterRefresh=[];enqueueFilterRefresh(e){this.types.hasFilters&&(e.flags&_p||(e.flags|=_p,this.pendingFilterRefresh.push(e)))}_nodePool=[];_nextViewId=0;_freeViewIds=[];acquireViewId(){return this._freeViewIds.length>0?this._freeViewIds.pop():this._nextViewId++}releaseViewId(e){this._freeViewIds.push(e)}activeViews=new Map;streamTrees=new Set;registerView(e){this.activeViews.set(e.id,new WeakRef(e))}unregisterView(e){this.activeViews.delete(e.id);let t=e.id;for(let e of this.streamTrees)e._dropView(t)}forEachActiveView(e){for(let[t,n]of this.activeViews){let r=n.deref();if(r===void 0){this.activeViews.delete(t);for(let e of this.streamTrees)e._dropView(t)}else e(r)}}registerStream(e){this.streamTrees.add(e)}unregisterStream(e){this.streamTrees.delete(e)}constructor(e,t=0){this.types=e,this.nextUniqueId=t}add(e){let t=e.ref;t[K]===void 0&&(Em.value=this.nextUniqueId++,Object.defineProperty(t,K,Em));let n=t[K],r=this.changeTrees[n]===void 0;r&&(this.changeTrees[n]=e),e.needsRestage&&(e.needsRestage=!1,e.forEachLiveWithCtx(e,Ff));let i=r?0:e.refCount;return e.refCount=i+1,i>0&&this.enqueueFilterRefresh(e),r}remove(e){let t=e.refCount-1;if(t<=0){if(e.root=void 0,delete this.changeTrees[e.ref[K]],e.isStreamCollection){let t=e.ref;t._unregister?.(),this.unregisterStream(t)}this.removeFromQueue(e),this.removeFromUnreliableQueue(e),e.refCount=0,e.needsRestage=!0,e.forEachChild((t,n)=>{t.removeParent(e.ref)&&(t.parentRef===void 0||t.refCount>0?this.remove(t):this.moveNextToParent(t))})}else e.refCount=t,this.enqueueFilterRefresh(e),this.recursivelyMoveNextToParent(e);return t}recursivelyMoveNextToParent(e){this.moveNextToParent(e),e.forEachChild((e,t)=>this.recursivelyMoveNextToParent(e))}moveNextToParent(e){e.changesNode&&this._moveNextToParentInList(this.changes,e,e.changesNode,`changesNode`),e.unreliableChangesNode&&this._moveNextToParentInList(this.unreliableChanges,e,e.unreliableChangesNode,`unreliableChangesNode`)}_moveNextToParentInList(e,t,n,r){let i=t.parent;if(!i||!i[q])return;let a=i[q][r];a&&a!==n&&(n.position>a.position||(n.prev?n.prev.next=n.next:e.next=n.next,n.next?n.next.prev=n.prev:e.tail=n.prev,n.prev=e.tail,n.next=void 0,e.tail.next=n,e.tail=n,n.position=e.nextPosition++))}enqueueChangeTree(e,t=e.changesNode){t||(e.changesNode=this._appendToList(this.changes,e))}enqueueUnreliable(e,t=e.unreliableChangesNode){t||(e.unreliableChangesNode=this._appendToList(this.unreliableChanges,e))}_appendToList(e,t){let n=this._nodePool,r;return n.length>0?(r=n.pop(),r.changeTree=t,r.next=void 0,r.prev=void 0):r={changeTree:t,next:void 0,prev:void 0,position:0},e.next?(r.prev=e.tail,e.tail.next=r,e.tail=r):(e.nextPosition=0,e.next=r,e.tail=r),r.position=e.nextPosition++,r}releaseNode(e){e.changeTree=void 0,e.prev=void 0,e.next=void 0,this._nodePool.push(e)}removeFromQueue(e){return this._removeNode(this.changes,e,e.changesNode,`changesNode`)}removeFromUnreliableQueue(e){return this._removeNode(this.unreliableChanges,e,e.unreliableChangesNode,`unreliableChangesNode`)}_removeNode(e,t,n,r){return!n||n.changeTree!==t?!1:(n.prev?n.prev.next=n.next:e.next=n.next,n.next?n.next.prev=n.prev:e.tail=n.prev,t[r]=void 0,this.releaseNode(n),!0)}};function Om(e,t){if(t===-1||t>=e.length)return!1;let n=e.length-1;for(let r=t;r<n;r++)e[r]=e[r+1];return e.length=n,!0}function km(e,t,n){let r=~n,i=e.changeTrees;for(let e in i){let n=i[e],a=n.visibleViews;a!==void 0&&t<a.length&&(a[t]&=r);let o=n.subscribedViews;o!==void 0&&t<o.length&&(o[t]&=r);let s=n.tagViews;s!==void 0&&s.forEach(e=>{t<e.length&&(e[t]&=r)})}}new FinalizationRegistry(({root:e,id:t,slot:n,bit:r})=>{km(e,n,r),e.activeViews.delete(t);for(let n of e.streamTrees)n._dropView(t);e.releaseViewId(t)});var Am=-1;function jm(e){e.structSwitchEmitted||=(e.shouldEmitSwitch&&(e.buffer[e.it.offset++]=255,_d.number(e.buffer,e.ref[K],e.it)),!0)}function Mm(e,t){Fm(e,t,G.ADD)}function Nm(e,t){if(t._fullSyncGen!==e.gen){if(t._fullSyncGen=e.gen,!e.hasView||e.view.isChangeTreeVisible(t)){let n=t.encDescriptor;e.changeTree=t,e.ref=t.ref,e.encoder=n.encoder,e.filter=n.filter,e.metadata=n.metadata,e.treeIsFiltered=t.isFiltered,e.isSchema=n.isSchema,e.filterBitmask=n.filterBitmask,e.tags=n.tags,e.structSwitchEmitted=!1,e.shouldEmitSwitch=e.hasView||e.it.offset>e.initialOffset||t!==e.rootChangeTree,t.isArray&&t.collDirty.size>0&&(t.flags|=vp),Rf(t,e,Mm)}tp(t,e,Pm)}}function Pm(e,t,n){Nm(e,t)}function Fm(e,t,n){if(t<0){if(e.treeIsFiltered!==e.emitFiltered)return;jm(e),e.buffer[e.it.offset++]=Math.abs(t)&255;return}if((e.isSchema?e.treeIsFiltered||(t<32?!!(e.filterBitmask&1<<t):e.tags[t]!==void 0):e.treeIsFiltered)!==e.emitFiltered)return;let r=e.isEncodeAll?G.ADD:n;r!==void 0&&(e.filter===void 0||e.filter(e.ref,t,e.view))&&(jm(e),e.encoder(e.self,e.buffer,e.changeTree,t,r,e.it,e.isEncodeAll,e.hasView,e.metadata))}function Im(e,t){let n=new Uint8Array(e.length+t.length);return n.set(e,0),n.set(t,e.length),n}var Lm=class e{static BUFFER_SIZE=16384;sharedBuffer=new Uint8Array(e.BUFFER_SIZE);context;state;root;constructor(e,t){this.context=uf.cache(e.constructor),this.root=t??new Dm(this.context),this.setState(e)}setState(e){this.state=e,this.state[q].setRoot(this.root)}_encodeCtx={self:void 0,buffer:void 0,it:void 0,changeTree:void 0,ref:void 0,encoder:void 0,filter:void 0,metadata:void 0,view:void 0,isEncodeAll:!1,hasView:!1,treeIsFiltered:!1,isSchema:!1,emitFiltered:!1,filterBitmask:0,tags:void 0,structSwitchEmitted:!1,isRootTree:!1,shouldEmitSwitch:!1,gen:0,initialOffset:0,rootChangeTree:void 0};_fullSyncGen=0;encode(e={offset:0},t,n=this.sharedBuffer,r=e.offset){return this._encodeChannel(e,t,n,r,!1)}encodeUnreliable(e={offset:0},t,n=this.sharedBuffer,r=e.offset){return this._encodeChannel(e,t,n,r,!0)}_encodeChannel(e,t,n,r,i){this.root.pendingFilterRefresh.length>0&&Vf(this.root);let a=t!==void 0,o=this.state[q],s=this._encodeCtx;s.self=this,s.buffer=n,s.it=e,s.view=t,s.isEncodeAll=!1,s.hasView=a,s.emitFiltered=a;let c=i?this.root.unreliableChanges:this.root.changes;for(;c=c.next;){let n=c.changeTree;if(a&&!t.isChangeTreeVisible(n))continue;let l=i?n.unreliableRecorder:n;if(!l||!l.has())continue;let u=n.encDescriptor;s.changeTree=n,s.ref=n.ref,s.encoder=u.encoder,s.filter=u.filter,s.metadata=u.metadata,s.treeIsFiltered=n.isFiltered,s.isSchema=u.isSchema,s.filterBitmask=u.filterBitmask,s.tags=u.tags,s.structSwitchEmitted=!1,s.isRootTree=n===o,s.shouldEmitSwitch=a||e.offset>r||!s.isRootTree,l.forEachWithCtx(s,Fm)}return!i&&!a&&this._isStreamBroadcastMode&&this._emitStreamBroadcast(n,e),e.offset>n.byteLength?(n=this._resizeBuffer(n,e.offset),e.offset=r,this._encodeChannel(e,t,n,r,i)):n.subarray(0,e.offset)}encodeFullSync(e,t,n,r,i=e.offset){this.root.pendingFilterRefresh.length>0&&Vf(this.root);let a=r!==void 0,o=this.state[q],s=this._encodeCtx;return s.self=this,s.buffer=t,s.it=e,s.view=r,s.isEncodeAll=!0,s.hasView=a,s.emitFiltered=n,s.gen=++this._fullSyncGen,s.initialOffset=i,s.rootChangeTree=o,Nm(s,o),e.offset>t.byteLength?(t=this._resizeBuffer(t,e.offset),e.offset=i,this.encodeFullSync(e,t,n,r,i)):t.subarray(0,e.offset)}_resizeBuffer(t,n){let r=Math.ceil(n/e.BUFFER_SIZE)*e.BUFFER_SIZE;console.warn(`@colyseus/schema buffer overflow. Encoded state is higher than default BUFFER_SIZE. Use the following to increase default BUFFER_SIZE:

    import { Encoder } from "@colyseus/schema";
    Encoder.BUFFER_SIZE = ${Math.round(r/1024)} * 1024; // ${Math.round(r/1024)} KB
`);let i=new Uint8Array(r);return i.set(t),t===this.sharedBuffer&&(this.sharedBuffer=i),i}encodeAll(e={offset:0},t=this.sharedBuffer){return this.encodeFullSync(e,t,!1)}encodeAllView(e,t,n,r=this.sharedBuffer){let i=n.offset;return r=this.encodeFullSync(n,r,!0,e,i),Im(r.subarray(0,t),r.subarray(i,n.offset))}ensureCapacity(t,n){if(n+e.BUFFER_SIZE<=t.byteLength)return t;let r=Math.ceil((n+e.BUFFER_SIZE)/e.BUFFER_SIZE)*e.BUFFER_SIZE,i=new Uint8Array(r);return i.set(t.subarray(0,n)),t===this.sharedBuffer&&(this.sharedBuffer=i),i}encodeView(e,t,n,r=this.sharedBuffer){let i=n.offset;this._emitStreamPriority(e);for(let t of e.changes.keys()){let i=e.changes.get(t),a=this.root.changeTrees[t];if(a===void 0){e.changes.delete(t);continue}if(i.size===0)continue;let o=a.encDescriptor,s=o.encoder,c=o.metadata,l=a.ref,u=a.refTarget;r=this.ensureCapacity(r,n.offset),r[n.offset++]=255,_d.number(r,l[K],n);for(let[t,o]of i){let i;if(t===Am){let e=u.tmpItems,t=u.deletedIndexes;for(let i=0;i<e.length;i++)e[i]!==void 0&&t[i]!==!0&&s(this,r,a,i,G.ADD,n,!1,!0,c);continue}if(typeof t==`number`)i=t;else{let n=t.indexInParent(l);if(n===void 0)continue;if(i=n,o===G.ADD&&a.getChange(i)===G.DELETE){e.changes.delete(t.ref[K]);continue}}let d=u[`~getByIndex`](i)!==void 0&&o||G.DELETE;s(this,r,a,i,d,n,!1,!0,c)}}return e.changes.clear(),r=this.encode(n,e,r),Im(r.subarray(0,t),r.subarray(i,n.offset))}encodeUnreliableView(e,t,n,r=this.sharedBuffer){let i=n.offset;return r=this.encodeUnreliable(n,e,r,i),Im(r.subarray(0,t),r.subarray(i,n.offset))}_emitStreamBroadcast(e,t){let n=this.root.streamTrees;for(let r of n){let n=r,i=n[q],a=n[K];if(a===void 0)continue;let o=n._stream,s=o.broadcastDeletes,c=o.broadcastPending,l=o.sentBroadcast,u=s.size>0,d=c.size>0,f=i.encDescriptor,p=f.encoder,m=f.metadata;if(u||d){if(e[t.offset++]=255,_d.number(e,a,t),u){for(let n of s)p(this,e,i,n,G.DELETE,t,!1,!1,m);s.clear()}let r=o.maxPerTick,d=[],f=0,h=[];for(let a of c){if(f>=r)break;let o=n[Du](a);o===void 0?h.push(a):(p(this,e,i,a,G.ADD,t,!1,!1,m),l.add(a),d.push(o),h.push(a),f++)}for(let e of h)c.delete(e);for(let n of d){let r=n[q];if(r===void 0)continue;let i=n[K];if(i===void 0)continue;e[t.offset++]=255,_d.number(e,i,t);let a=r.encDescriptor,o=a.encoder,s=a.metadata;r.forEachLive(n=>{yf.hasUnreliableAtIndex(s,n)||o(this,e,r,n,G.ADD,t,!1,!1,s)})}}for(let r of l){let i=n[Du](r);if(i===void 0)continue;let a=i[q];if(a===void 0||!a.has())continue;let o=i[K];if(o===void 0)continue;e[t.offset++]=255,_d.number(e,o,t);let s=a.encDescriptor,c=s.encoder,l=s.metadata;a.forEach((n,r)=>{n<0||yf.hasUnreliableAtIndex(l,n)||c(this,e,a,n,r,t,!1,!1,l)})}}}_emitStreamPriority(e){let t=this.root.streamTrees;if(t.size===0)return;let n=e.id;for(let r of t){let t=r,i=t._stream,a=i.pendingByView.get(n);if(a===void 0||a.size===0)continue;let o=i.priorityByView?.get(n),s=o!==void 0,c=i.priority,l=i.maxPerTick,u=[],d=[];if(s||c!==void 0){let n=[],r=[],i=0;for(let u of a){let a=t[Du](u);if(a===void 0){d.push(u);continue}let f=s?o(a):c(e,a);if(i<l){let e=i++;for(;e>0&&r[e-1]<f;)r[e]=r[e-1],n[e]=n[e-1],e--;r[e]=f,n[e]=u}else if(f>r[l-1]){let e=l-1;for(;e>0&&r[e-1]<f;)r[e]=r[e-1],n[e]=n[e-1],e--;r[e]=f,n[e]=u}}for(let e=0;e<i;e++)u.push(n[e])}else for(let e of a){if(u.length>=l)break;u.push(e)}for(let e of d)a.delete(e);let f=u.length,p=i.sentByView.get(n);p===void 0&&(p=new Set,i.sentByView.set(n,p));for(let n=0;n<f;n++){let r=u[n],i=t[Du](r);if(i===void 0){a.delete(r);continue}e._addImmediate(i);let o=i[q];if(o!==void 0){let t=i[K],n=e.changes.get(t);n===void 0&&(n=new Map,e.changes.set(t,n));let r=o.metadata;o.forEachLive(e=>{yf.hasUnreliableAtIndex(r,e)||n.set(e,G.ADD)})}a.delete(r),p.add(r)}}}discardChanges(){let e=this.root.changes,t=e.next,n=this.root;for(;t;){let e=t.next;t.changeTree.endEncode(),n.releaseNode(t),t=e}e.next=void 0,e.tail=void 0}discardUnreliableChanges(){let e=this.root.unreliableChanges,t=e.next,n=this.root;for(;t;){let e=t.next;t.changeTree.endEncodeUnreliable(),n.releaseNode(t),t=e}e.next=void 0,e.tail=void 0}tryEncodeTypeId(e,t,n,r){let i=this.context.getTypeId(t),a=this.context.getTypeId(n);a===void 0?console.warn(`@colyseus/schema WARNING: Class "${n.name}" is not registered on TypeRegistry - Please either tag the class with @entity or define a @type() field.`):i!==a&&(e[r.offset++]=213,_d.number(e,a,r))}get hasChanges(){return this.root.changes.next!==void 0||this._hasStreamBacklog()}get _isStreamBroadcastMode(){return this.root.activeViews.size===0&&this.root.streamTrees.size>0}_hasStreamBacklog(){let e=this.root;if(e.streamTrees.size===0)return!1;let t=e.activeViews.size===0;for(let n of e.streamTrees)if(t?$d(n):Qd(n,e))return!0;return!1}get hasUnreliableChanges(){return this.root.unreliableChanges.next!==void 0}},Rm=class extends Error{constructor(e){super(e),this.name=`DecodingWarning`}},zm={value:0,enumerable:!1,writable:!0},Bm=class{refs=new Map;refCount={};deletedRefs=new Set;callbacks={};nextUniqueId=0;getNextUniqueId(){return this.nextUniqueId++}addRef(e,t,n=!0){this.refs.set(e,t),t[K]===void 0?(zm.value=e,Object.defineProperty(t,K,zm)):t[K]!==e&&(t[K]=e),n&&(this.refCount[e]=(this.refCount[e]||0)+1),this.deletedRefs.has(e)&&this.deletedRefs.delete(e)}removeRef(e){let t=this.refCount[e];if(t===void 0)try{throw new Rm(`trying to remove refId that doesn't exist: `+e)}catch(e){console.warn(e)}else if(t===0)try{let t=this.refs.get(e);throw new Rm(`trying to remove refId '${e}' with 0 refCount (${t.constructor.name}: ${JSON.stringify(t)})`)}catch(e){console.warn(e)}else(this.refCount[e]=t-1)<=0&&this.deletedRefs.add(e)}clearRefs(){this.refs.clear(),this.deletedRefs.clear(),this.callbacks={},this.refCount={}}garbageCollectDeletedRefs(){this.deletedRefs.forEach(e=>{if(this.refCount[e]>0)return;let t=this.refs.get(e),n=t.constructor[Symbol.metadata];if(n!=null)for(let e in n){let r=t[n[e].name];if(typeof r==`object`&&r){let e=r[K];e!==void 0&&!this.deletedRefs.has(e)&&this.removeRef(e)}}else typeof t[J]==`function`&&Array.from(t.values()).forEach(e=>{let t=e[K];t!==void 0&&!this.deletedRefs.has(t)&&this.removeRef(t)});this.refs.delete(e),delete this.refCount[e],delete this.callbacks[e]}),this.deletedRefs.clear()}addCallback(e,t,n){if(e===void 0){let e=typeof t==`number`?G[t]:t;throw Error(`Can't addCallback on '${e}' (refId is undefined)`)}return this.callbacks[e]||(this.callbacks[e]={}),this.callbacks[e][t]||(this.callbacks[e][t]=[]),this.callbacks[e][t].push(n),()=>this.removeCallback(e,t,n)}removeCallback(e,t,n){let r=this.callbacks?.[e]?.[t]?.indexOf(n);r!==void 0&&r!==-1&&Om(this.callbacks[e][t],r)}},Vm=class{context;state;root;currentRefId=0;triggerChanges;resyncVisited=null;resyncDamaged=!1;constructor(e,t){this.setState(e),this.context=t||new uf(e.constructor)}setState(e){this.state=e,this.root=new Bm,this.root.addRef(0,e)}decode(e,t={offset:0},n=this.state){let r=this.triggerChanges===void 0?null:[],i=this.root,a=e.byteLength,o=n.constructor[Tu];for(this.currentRefId=0;t.offset<a;)if(e[t.offset]==yu){t.offset++,n[Nu]?.();let r=Vd.number(e,t),s=i.refs.get(r);s?(n=s,o=n.constructor[Tu],this.currentRefId=r):(console.error(`"refId" not found: ${r}`,{previousRef:n,previousRefId:this.currentRefId}),console.warn(`Please report this issue to the developers.`),this.skipCurrentStructure(e,t,a))}else o(this,e,t,n,r)===Lp&&(console.warn(`@colyseus/schema: definition mismatch`),this.skipCurrentStructure(e,t,a));return n[Nu]?.(),this.resyncVisited!==null&&Pp(this,r),r!==null&&this.triggerChanges?.(r),i.garbageCollectDeletedRefs(),r}decodeResync(e,t={offset:0}){this.resyncVisited=new Map,this.resyncDamaged=!1;try{return this.decode(e,t)}finally{this.resyncVisited=null}}skipCurrentStructure(e,t,n){this.resyncVisited!==null&&(this.resyncDamaged=!0);let r={offset:t.offset};for(;t.offset<n&&!(e[t.offset]===yu&&(r.offset=t.offset+1,this.root.refs.has(Vd.number(e,r))));)t.offset++}getInstanceType(e,t,n){let r;if(e[t.offset]===bu){t.offset++;let n=Vd.number(e,t);r=this.context.get(n)}return r||n}createInstanceOfType(e){return e.initializeForDecoder()}removeChildRefs(e,t){let n=typeof e[J]!=`string`,r=e[K];e.forEach((i,a)=>{t?.push({ref:e,refId:r,op:G.DELETE,field:a,value:void 0,previousValue:i}),n&&this.root.removeRef(i[K])})}},Hm=Cm({min:um.float64(),max:um.float64(),bits:um.uint8(),mode:um.uint8()},`QuantizedDescriptor`),Um=Cm({name:um.string(),type:um.string(),referencedType:um.number(),childPrimitive:um.string(),quantized:um.ref(Hm).optional()},`ReflectionField`),Wm=Cm({id:um.number(),extendsId:um.number(),fields:um.array(Um)},`ReflectionType`),Gm=Cm({types:um.array(Wm),rootType:um.number()},`Reflection`);Gm.encode=function(e,t={offset:0}){let n=e.context,r=new Gm,i=new Lm(r),a=n.schemas.get(e.state.constructor);a>0&&(r.rootType=a);let o=new Set,s={},c=e=>{if(e.extendsId===void 0||o.has(e.extendsId)){o.add(e.id),r.types.push(e);let t=s[e.id];t!==void 0&&(delete s[e.id],t.forEach(e=>c(e)))}else s[e.extendsId]===void 0&&(s[e.extendsId]=[]),s[e.extendsId].push(e)};n.schemas.forEach((e,t)=>{let r=new Wm;r.id=Number(e);let i=Object.getPrototypeOf(t);i!==Tm&&(r.extendsId=n.schemas.get(i));let a=t[Symbol.metadata];if(a!==i[Symbol.metadata]){let e=a[`~__numFields`]??-1;for(let t=0;t<=e;t++){let e=a[t];if(e===void 0)continue;let i=e.name;if(!Object.prototype.hasOwnProperty.call(a,i))continue;let o=new Um;o.name=i;let s;if(typeof e.type==`string`)s=e.type;else if(af(e.type)){let t=e.type.quantized;s=`quantized`;let n=new Hm;n.min=t.min,n.max=t.max,n.bits=t.bits,n.mode=+!!t.wrap,o.quantized=n}else{let t;Tm.is(e.type)?(s=`ref`,t=e.type):(s=Object.keys(e.type)[0],typeof e.type[s]==`string`?o.childPrimitive=e.type[s]:t=e.type[s]),o.referencedType=t?n.getTypeId(t):-1}o.type=s,r.fields.push(o)}}c(r)});for(let e in s)s[e].forEach(e=>r.types.push(e));return i.encodeAll(t).slice(0,t.offset)},Gm.decode=function(e,t){let n=new Gm;new Vm(n).decode(e,t);let r=new uf;n.types.forEach(e=>{let t=r.get(e.extendsId)??Tm,n=class extends t{};uf.register(n),r.add(n,e.id)},{});let i=(e,t,n)=>{t.fields.forEach((t,i)=>{let a=n+i;if(t.quantized!==void 0){let n=t.quantized;yf.addField(e,a,t.name,{quantized:rf({min:n.min,max:n.max,bits:n.bits,mode:n.mode===1?`wrap`:`clamp`})})}else if(t.referencedType!==void 0){let n=t.type,i=r.get(t.referencedType)??t.childPrimitive;n===`ref`?yf.addField(e,a,t.name,i):yf.addField(e,a,t.name,{[n]:i})}else yf.addField(e,a,t.name,t.type)})};return n.types.forEach(e=>{let t=r.get(e.id),a=yf.initialize(t),o=[],s=e;do o.push(s),s=n.types.find(e=>e.id===s.extendsId);while(s);let c=0;o.reverse().forEach(e=>{i(a,e,c),c+=e.fields.length})}),new Vm(new(r.get(n.rootType||0)),r)},Gm.makeEncodable=function(e){let t=e[Symbol.metadata];if(!t)return e;let n=t[zu];if(n===void 0)return e;for(let r=0;r<=n;r++){let n=t[r];n&&yf.defineField(e,t,r,n.name,n.type)}return Object.prototype.hasOwnProperty.call(e,Lu)&&delete e[Lu],e},Wd(`map`,{constructor:Yp}),Wd(`array`,{constructor:qp}),Wd(`set`,{constructor:Zp}),Wd(`collection`,{constructor:Xp});function Km(){return typeof performance<`u`?performance.now():Date.now()}Symbol.metadata,Object.freeze({now:()=>Km(),serverNow:()=>Km(),renderNow:()=>Km(),rtt:()=>0,smoothedRtt:()=>0,jitter:()=>0,lastServerTime:()=>0,patchInterval:()=>0,setPatchInterval:e=>{},sample:(e,t)=>{}});var qm;try{qm=new TextDecoder}catch{}var Y,Jm,X=0,Ym=[],Xm=Ym,Zm=0,Qm={},$m,eh,th=0,nh=0,rh,ih,ah=[],oh,sh,ch=0,lh={useRecords:!1,mapsAsObjects:!0},uh=class{},dh=new uh;dh.name=`MessagePack 0xC1`;var fh=!1,ph=2,mh=class e{constructor(e){e&&(e.useRecords===!1&&e.mapsAsObjects===void 0&&(e.mapsAsObjects=!0),e.sequential&&e.trusted!==!1&&(e.trusted=!0,!e.structures&&e.useRecords!=0&&(e.structures=[],e.maxSharedStructures||=0)),e.structures?e.structures.sharedLength=e.structures.length:e.getStructures&&((e.structures=[]).uninitialized=!0,e.structures.sharedLength=0),e.int64AsNumber&&(e.int64AsType=`number`)),Object.assign(this,e)}unpack(t,n){if(Y)return Kh(()=>{qh();try{return this?this.unpack(t,n):e.prototype.unpack.call(lh,t,n)}catch(e){throw e&&typeof e==`object`&&hh.add(e),e}});!t.buffer&&t.constructor===ArrayBuffer&&(t=typeof Buffer<`u`?Buffer.from(t):new Uint8Array(t)),typeof n==`object`?(Jm=n.end||t.length,X=n.start||0):(X=0,Jm=n>-1?n:t.length),Jm>t.length&&(Jm=t.length),Zm=0,nh=0,eh=null,Xm=Ym,rh=null,Y=t;try{oh=t.dataView||(t.dataView=new DataView(t.buffer,t.byteOffset,t.byteLength))}catch(e){throw Y=null,t instanceof Uint8Array?e:Error(`Source must be a Uint8Array or Buffer but was a `+(t&&typeof t==`object`?t.constructor.name:typeof t))}if(this instanceof e){if(Qm=this,this.structures)return $m=this.structures,gh(n);(!$m||$m.length>0)&&($m=[])}else Qm=lh,(!$m||$m.length>0)&&($m=[]);return gh(n)}unpackMultiple(e,t){if(Y)return Kh(()=>{qh();try{return this?this.unpackMultiple(e,t):Yh.unpackMultiple(e,t)}catch(e){throw e&&typeof e==`object`&&hh.add(e),e}});let n,r=0;try{fh=!0;let i=e.length,a=this?this.unpack(e,i):Yh.unpack(e,i);if(t){let e=X;if(t(a,r,e)===!1)return;for(;e<i;)if(r=e,a=gh(),e=X,t(a,r,e)===!1)return}else{for(n=[a];X<i;)r=X,n.push(gh());return n}}catch(e){throw e&&typeof e==`object`&&(e.lastPosition=r,e.values=n),e}finally{fh=!1,qh()}}_mergeStructures(e,t){this._onLoadedStructures&&(e=this._onLoadedStructures(e)),e||=[],Object.isFrozen(e)&&(e=e.map(e=>e.slice(0)));for(let t=0,n=e.length;t<n;t++){let n=e[t];n&&(n.isShared=!0,t>=32&&(n.highByte=t-32>>5))}e.sharedLength=e.length;for(let n in t||[])if(n>=0){let r=e[n],i=t[n];i&&(r&&((e.restoreStructures||(e.restoreStructures=[]))[n]=r),e[n]=i)}return this.structures=e}decode(e,t){return this.unpack(e,t)}},hh=new WeakSet;function gh(e){try{if(!Qm.trusted&&!fh){let e=$m.sharedLength||0;e<$m.length&&($m.length=e)}let t;if(sh=Jm-X,Qm._readStruct&&Y[X]<64&&Y[X]>=32?(t=Qm._readStruct(Y,X,Jm),Y=null,!(e&&e.lazy)&&t&&(t=t.toJSON()),X=Jm):t=yh(),rh&&=(X=rh.postBundlePosition,null),fh&&X<=Jm&&($m.restoreStructures=null),X==Jm)$m&&$m.restoreStructures&&vh(),$m=null,Y=null,ih&&=null;else if(X>Jm)throw Error(`Unexpected end of MessagePack data`);else if(!fh){let e;try{e=JSON.stringify(t,(e,t)=>typeof t==`bigint`?`${t}n`:t).slice(0,100)}catch(t){e=`(JSON view not available `+t+`)`}throw Error(`Data read, but end of buffer not reached `+e)}return t}catch(e){throw $m&&$m.restoreStructures&&vh(),qh(),_h(e),e}}function _h(e){e&&typeof e==`object`&&(X>Jm?e.incomplete=!0:hh.has(e)?e.incomplete&&=!1:(e instanceof RangeError&&X+8>Jm||typeof e.message==`string`&&e.message.startsWith(`Unexpected end of buffer`))&&(e.incomplete=!0))}function vh(){for(let e in $m.restoreStructures)$m[e]=$m.restoreStructures[e];$m.restoreStructures=null}function yh(){let e=Y[X++];if(e<160){if(e<128){if(e<64)return e;{let t=$m[e&63]||Qm.getStructures&&Ch()[e&63];return t?(t.read||=xh(t,e&63),t.read()):e}}if(e<144){if(e-=128,Qm.mapsAsObjects){let t={};for(let n=0;n<e;n++){let e=zh();e===`__proto__`&&(e=`__proto_`),t[e]=yh()}return t}{let t=new Map;for(let n=0;n<e;n++)t.set(yh(),yh());return t}}{e-=144;let t=Array(e);for(let n=0;n<e;n++)t[n]=yh();return Qm.freezeData?Object.freeze(t):t}}if(e<192){let t=e-160;if(nh>=X)return eh.slice(X-th,(X+=t)-th);if(nh==0&&Jm<140){let e=t<16?Ph(t):Nh(t);if(e!=null)return e}return wh(t)}{let t;switch(e){case 192:return null;case 193:return rh?(t=yh(),t>0?rh[1].slice(rh.position1,rh.position1+=t):rh[0].slice(rh.position0,rh.position0-=t)):dh;case 194:return!1;case 195:return!0;case 196:if(t=Y[X++],t===void 0)throw Error(`Unexpected end of buffer`);return Ih(t);case 197:if(t=oh.getUint16(X),X+=2,t>Jm-X)throw kh(X+t);return Ih(t);case 198:if(t=oh.getUint32(X),X+=4,t>Jm-X)throw kh(X+t);return Ih(t);case 199:return Lh(Y[X++]);case 200:return t=oh.getUint16(X),X+=2,Lh(t);case 201:return t=oh.getUint32(X),X+=4,Lh(t);case 202:if(t=oh.getFloat32(X),Qm.useFloat32>2){let e=Jh[(Y[X]&127)<<1|Y[X+1]>>7];return X+=4,(e*t+(t>0?.5:-.5)|0)/e}return X+=4,t;case 203:return t=oh.getFloat64(X),X+=8,t;case 204:return Y[X++];case 205:return t=oh.getUint16(X),X+=2,t;case 206:return t=oh.getUint32(X),X+=4,t;case 207:return Qm.int64AsType===`number`?(t=oh.getUint32(X)*4294967296,t+=oh.getUint32(X+4)):Qm.int64AsType===`string`?t=oh.getBigUint64(X).toString():Qm.int64AsType===`auto`?(t=oh.getBigUint64(X),t<=BigInt(2)<<BigInt(52)&&(t=Number(t))):t=oh.getBigUint64(X),X+=8,t;case 208:return oh.getInt8(X++);case 209:return t=oh.getInt16(X),X+=2,t;case 210:return t=oh.getInt32(X),X+=4,t;case 211:return Qm.int64AsType===`number`?(t=oh.getInt32(X)*4294967296,t+=oh.getUint32(X+4)):Qm.int64AsType===`string`?t=oh.getBigInt64(X).toString():Qm.int64AsType===`auto`?(t=oh.getBigInt64(X),t>=BigInt(-2)<<BigInt(52)&&t<=BigInt(2)<<BigInt(52)&&(t=Number(t))):t=oh.getBigInt64(X),X+=8,t;case 212:if(t=Y[X++],t==114)return Vh(Y[X++]&63);{let e=ah[t];if(e){if(e.read)return X++,e.read(yh());if(e.noBuffer)return X++,e();if(X>=Jm)throw kh();return e(Y.subarray(X,++X))}throw Error(`Unknown extension `+t)}case 213:return t=Y[X],t==114?(X++,Vh(Y[X++]&63,Y[X++])):Lh(2);case 214:return Lh(4);case 215:return Lh(8);case 216:return Lh(16);case 217:return t=Y[X++],nh>=X?eh.slice(X-th,(X+=t)-th):Th(t);case 218:if(t=oh.getUint16(X),X+=2,t>Jm-X)throw kh(X+t);return nh>=X?eh.slice(X-th,(X+=t)-th):Eh(t);case 219:if(t=oh.getUint32(X),X+=4,t>Jm-X)throw kh(X+t);return nh>=X?eh.slice(X-th,(X+=t)-th):Dh(t);case 220:return t=oh.getUint16(X),X+=2,Ah(t);case 221:return t=oh.getUint32(X),X+=4,Ah(t);case 222:return t=oh.getUint16(X),X+=2,jh(t);case 223:return t=oh.getUint32(X),X+=4,jh(t);default:if(e>=224)return e-256;throw e===void 0?kh():Error(`Unknown MessagePack token `+e)}}}var bh=/^[a-zA-Z_$][a-zA-Z\d_$]*$/;function xh(e,t){function n(){if(n.count++>ph){let r;try{r=e.read=Function(`r`,`return function(){return `+(Qm.freezeData?`Object.freeze`:``)+`({`+e.map(e=>e===`__proto__`?`__proto_:r()`:bh.test(e)?e+`:r()`:`[`+JSON.stringify(e)+`]:r()`).join(`,`)+`})}`)(yh)}catch{return ph=1/0,n()}return e.read0=r,e.highByte===0&&(e.read=Sh(t,e.read)),r()}let r={};for(let t=0,n=e.length;t<n;t++){let n=e[t];n===`__proto__`&&(n=`__proto_`),r[n]=yh()}return Qm.freezeData?Object.freeze(r):r}return n.count=0,e.read0=n,e.highByte===0?Sh(t,n):n}var Sh=(e,t)=>function(){let n=Y[X++];if(n===0)return t();let r=e<32?-(e+(n<<5)):e+(n<<5),i=$m[r]||Ch()[r];if(!i)throw Error(`Record id is not defined for `+r);return i.read||=xh(i,e),i.read()};function Ch(){let e=Kh(()=>(Y=null,Qm.getStructures()));return $m=Qm._mergeStructures(e,$m)}var wh=Oh,Th=Oh,Eh=Oh,Dh=Oh;function Oh(e){let t;if(e<16&&(t=Ph(e)))return t;if(e>64&&qm)return qm.decode(Y.subarray(X,X+=e));let n=X+e,r=[];for(t=``;X<n;){let e=Y[X++];if(!(e&128))r.push(e);else if((e&224)==192){if(e<194||X>=n||(Y[X]&192)!=128)r.push(65533);else{let t=Y[X++]&63;r.push((e&31)<<6|t)}}else if((e&240)==224){let t=X<n?Y[X]:0;if(X>=n||(t&192)!=128||e===224&&t<160||e===237&&t>=160)r.push(65533);else if(X++,X>=n||(Y[X]&192)!=128)r.push(65533);else{let n=Y[X++]&63;r.push((e&31)<<12|(t&63)<<6|n)}}else if((e&248)==240){let t=X<n?Y[X]:0;if(e>244||X>=n||(t&192)!=128||e===240&&t<144||e===244&&t>=144)r.push(65533);else if(X++,X>=n||(Y[X]&192)!=128)r.push(65533);else{let i=Y[X++]&63;if(X>=n||(Y[X]&192)!=128)r.push(65533);else{let n=Y[X++]&63,a=(e&7)<<18|(t&63)<<12|i<<6|n;a-=65536,r.push(a>>>10&1023|55296),r.push(56320|a&1023)}}}else r.push(65533);r.length>=4096&&(t+=Mh.apply(String,r),r.length=0)}return r.length>0&&(t+=Mh.apply(String,r)),t}function kh(e){let t=Error(`Unexpected end of MessagePack data`);return t.incomplete=!0,e>Jm&&X<=Jm&&(t.missingBytes=e-Jm),t}function Ah(e){if(e>Jm-X||(sh-=e)<0)throw kh(X+e);let t=Array(e);for(let n=0;n<e;n++)t[n]=yh();return Qm.freezeData?Object.freeze(t):t}function jh(e){if(e>(Jm-X)/2)throw kh(X+2*e);if(Qm.mapsAsObjects){let t={};for(let n=0;n<e;n++){let e=zh();e===`__proto__`&&(e=`__proto_`),t[e]=yh()}return t}{let t=new Map;for(let n=0;n<e;n++)t.set(yh(),yh());return t}}var Mh=String.fromCharCode;function Nh(e){let t=X;if(Y.latin1Slice){let n=t+e;if(n>Jm)return;for(let e=t;e<n;e++)if((Y[e]&128)>0)return;return X=n,Y.latin1Slice(t,n)}let n=Array(e);for(let r=0;r<e;r++){let e=Y[X++];if((e&128)>0){X=t;return}n[r]=e}return Mh.apply(String,n)}function Ph(e){if(e<4){if(e<2){if(e===0)return``;{let e=Y[X++];if((e&128)>1){--X;return}return Mh(e)}}{let t=Y[X++],n=Y[X++];if((t&128)>0||(n&128)>0){X-=2;return}if(e<3)return Mh(t,n);let r=Y[X++];if((r&128)>0){X-=3;return}return Mh(t,n,r)}}{let t=Y[X++],n=Y[X++],r=Y[X++],i=Y[X++];if((t&128)>0||(n&128)>0||(r&128)>0||(i&128)>0){X-=4;return}if(e<6){if(e===4)return Mh(t,n,r,i);{let e=Y[X++];if((e&128)>0){X-=5;return}return Mh(t,n,r,i,e)}}if(e<8){let a=Y[X++],o=Y[X++];if((a&128)>0||(o&128)>0){X-=6;return}if(e<7)return Mh(t,n,r,i,a,o);let s=Y[X++];if((s&128)>0){X-=7;return}return Mh(t,n,r,i,a,o,s)}{let a=Y[X++],o=Y[X++],s=Y[X++],c=Y[X++];if((a&128)>0||(o&128)>0||(s&128)>0||(c&128)>0){X-=8;return}if(e<10){if(e===8)return Mh(t,n,r,i,a,o,s,c);{let e=Y[X++];if((e&128)>0){X-=9;return}return Mh(t,n,r,i,a,o,s,c,e)}}if(e<12){let l=Y[X++],u=Y[X++];if((l&128)>0||(u&128)>0){X-=10;return}if(e<11)return Mh(t,n,r,i,a,o,s,c,l,u);let d=Y[X++];if((d&128)>0){X-=11;return}return Mh(t,n,r,i,a,o,s,c,l,u,d)}{let l=Y[X++],u=Y[X++],d=Y[X++],f=Y[X++];if((l&128)>0||(u&128)>0||(d&128)>0||(f&128)>0){X-=12;return}if(e<14){if(e===12)return Mh(t,n,r,i,a,o,s,c,l,u,d,f);{let e=Y[X++];if((e&128)>0){X-=13;return}return Mh(t,n,r,i,a,o,s,c,l,u,d,f,e)}}{let p=Y[X++],m=Y[X++];if((p&128)>0||(m&128)>0){X-=14;return}if(e<15)return Mh(t,n,r,i,a,o,s,c,l,u,d,f,p,m);let h=Y[X++];if((h&128)>0){X-=15;return}return Mh(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}}}}}function Fh(){let e=Y[X++],t;if(e<192)t=e-160;else switch(e){case 217:t=Y[X++];break;case 218:t=oh.getUint16(X),X+=2;break;case 219:t=oh.getUint32(X),X+=4;break;default:throw Error(`Expected string`)}return Oh(t)}function Ih(e){return Qm.copyBuffers?Uint8Array.prototype.slice.call(Y,X,X+=e):Y.subarray(X,X+=e)}function Lh(e){if(e>=Jm-X)throw kh(X+1+e);let t=Y[X++];if(ah[t]){let n;return ah[t](Y.subarray(X,n=X+=e),e=>{X=e;try{return yh()}finally{X=n}})}throw Error(`Unknown extension type `+t)}var Rh=Array(4096);function zh(){let e=Y[X++];if(e>=160&&e<192){if(e-=160,nh>=X)return eh.slice(X-th,(X+=e)-th);if(!(nh==0&&Jm<180))return wh(e)}else return X--,Bh(yh());if(e>Jm-X)throw kh(X+e);let t=(e<<5^(e>1?oh.getUint16(X):e>0?Y[X]:0))&4095,n=Rh[t],r=X,i=X+e-3,a,o=0;if(n&&n.bytes==e){for(;r<i;){if(a=oh.getUint32(r),a!=n[o++]){r=1879048192;break}r+=4}for(i+=3;r<i;)if(a=Y[r++],a!=n[o++]){r=1879048192;break}if(r===i)return X=r,n.string;i-=3,r=X}for(n=[],Rh[t]=n,n.bytes=e;r<i;)a=oh.getUint32(r),n.push(a),r+=4;for(i+=3;r<i;)a=Y[r++],n.push(a);let s=e<16?Ph(e):Nh(e);return s==null?n.string=wh(e):n.string=s}function Bh(e){if(typeof e==`string`)return e;if(typeof e==`number`||typeof e==`boolean`||typeof e==`bigint`)return e.toString();if(e==null)return e+``;if(Qm.allowArraysInMapKeys&&Array.isArray(e)&&e.flat().every(e=>[`string`,`number`,`boolean`,`bigint`].includes(typeof e)))return e.flat().toString();throw Error(`Invalid property type for record: ${typeof e}. A MessagePack map with non-string keys can be decoded as a Map with mapsAsObjects: false`)}var Vh=(e,t)=>{let n=yh().map(Bh),r=e;t!==void 0&&(e=e<32?-((t<<5)+e):(t<<5)+e,n.highByte=t);let i=$m[e];if(fh||i&&i.isShared){let t=$m.restoreStructures||($m.restoreStructures=[]);e in t||(t[e]=i)}return $m[e]=n,n.read=xh(n,r),(n.read0||n.read)()};ah[0]=()=>{},ah[0].noBuffer=!0,ah[66]=e=>{let t=e.byteLength%8||8,n=BigInt(e[0]&128?e[0]-256:e[0]);for(let r=1;r<t;r++)n<<=BigInt(8),n+=BigInt(e[r]);if(e.byteLength!==t){let r=new DataView(e.buffer,e.byteOffset,e.byteLength),i=(e,t)=>{let n=t-e;if(n<=40){let n=r.getBigUint64(e);for(let i=e+8;i<t;i+=8)n<<=BigInt(64),n|=r.getBigUint64(i);return n}let a=e+(n>>4<<3),o=i(e,a),s=i(a,t);return o<<BigInt((t-a)*8)|s};n=n<<BigInt((r.byteLength-t)*8)|i(t,r.byteLength)}return n};var Hh={Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError,AggregateError:typeof AggregateError==`function`?AggregateError:null};ah[101]=()=>{let e=yh();if(e[0]===`AggregateError`&&Hh.AggregateError)return new Hh.AggregateError(e[3]||[],e[1],{cause:e[2]});if(!Hh[e[0]]){let t=Error(e[1],{cause:e[2]});return t.name=e[0],t}return Hh[e[0]](e[1],{cause:e[2]})},ah[105]=e=>{if(Qm.structuredClone===!1)throw Error(`Structured clone extension is disabled`);let t=oh.getUint32(X-4);ih||=new Map;let n=Y[X],r;r=n>=144&&n<160||n==220||n==221?[]:n>=128&&n<144||n==222||n==223?new Map:(n>=199&&n<=201||n>=212&&n<=216)&&Y[X+1]===115?new Set:{};let i={target:r};ih.set(t,i);let a=yh();if(i.used)Object.assign(r,a);else return i.target=a;if(r instanceof Map)for(let[e,t]of a.entries())r.set(e,t);if(r instanceof Set)for(let e of Array.from(a))r.add(e);return r},ah[112]=e=>{if(Qm.structuredClone===!1)throw Error(`Structured clone extension is disabled`);let t=oh.getUint32(X-4),n=ih.get(t);return n.used=!0,n.target},ah[115]=()=>new Set(yh());var Uh=[`Int8`,`Uint8`,`Uint8Clamped`,`Int16`,`Uint16`,`Int32`,`Uint32`,`Float32`,`Float64`,`BigInt64`,`BigUint64`].map(e=>e+`Array`),Wh=typeof globalThis==`object`?globalThis:window;ah[116]=e=>{let t=e[0],n=Uint8Array.prototype.slice.call(e,1).buffer,r=Uh[t];if(!r){if(t===16)return n;if(t===17)return new DataView(n);throw Error(`Could not find typed array for code `+t)}return new Wh[r](n)},ah[120]=()=>{let e=yh();return new RegExp(e[0],e[1])};var Gh=[];ah[98]=e=>{let t=(e[0]<<24)+(e[1]<<16)+(e[2]<<8)+e[3],n=X;return X+=t-e.length,rh=Gh,rh=[Fh(),Fh()],rh.position0=0,rh.position1=0,rh.postBundlePosition=X,X=n,yh()},ah[255]=e=>e.length==4?new Date((e[0]*16777216+(e[1]<<16)+(e[2]<<8)+e[3])*1e3):e.length==8?new Date(((e[0]<<22)+(e[1]<<14)+(e[2]<<6)+(e[3]>>2))/1e6+((e[3]&3)*4294967296+e[4]*16777216+(e[5]<<16)+(e[6]<<8)+e[7])*1e3):e.length==12?new Date(((e[0]<<24)+(e[1]<<16)+(e[2]<<8)+e[3])/1e6+((e[4]&128?-281474976710656:0)+e[6]*1099511627776+e[7]*4294967296+e[8]*16777216+(e[9]<<16)+(e[10]<<8)+e[11])*1e3):new Date(`invalid`);function Kh(e){Qm&&Qm._onSaveState&&Qm._onSaveState();let t=Jm,n=X,r=Zm,i=th,a=nh,o=eh,s=Xm,c=ih,l=rh,u=sh,d=new Uint8Array(Y.slice(0,Jm)),f=$m,p=$m.slice(0,$m.length),m=Qm,h=fh,g=ch;ch=0;try{return e()}catch(e){throw e&&typeof e==`object`&&hh.add(e),e}finally{Jm=t,X=n,Zm=r,th=i,nh=a,eh=o,Xm=s,ih=c,rh=l,sh=u,Y=d,fh=h,ch=g,$m=f,$m.splice(0,$m.length,...p),Qm=m,oh=new DataView(Y.buffer,Y.byteOffset,Y.byteLength)}}function qh(){Y=null,ih=null,$m=null}ah.slice(0);var Jh=Array(147);for(let e=0;e<256;e++)Jh[e]=+(`1e`+Math.floor(45.15-e*.30103));var Yh=new mh({useRecords:!1});Yh.unpack,Yh.unpackMultiple,Yh.unpack;var Xh={NEVER:0,ALWAYS:1,DECIMAL_ROUND:3,DECIMAL_FIT:4};new Uint8Array(new Float32Array(1).buffer,0,4),mh.SUPPORTS_STRUCT_HOOKS=!0;var Zh;try{Zh=new TextEncoder}catch{}var Qh,$h,eg=typeof Buffer<`u`,tg=eg?function(e){return Buffer.allocUnsafeSlow(e)}:Uint8Array,ng=eg?Buffer:Uint8Array,rg=eg?4294967296:2144337920,Z,ig,ag,Q=0,og,sg=null,cg=!1,lg=21760,ug=/[\u0080-\uFFFF]/,dg=Symbol(`record-id`),fg=class extends mh{constructor(e){super(e),this.offset=0;let t,n,r,i,a=ng.prototype.utf8Write?function(e,t){return Z.utf8Write(e,t,Z.byteLength-t)}:Zh&&Zh.encodeInto?function(e,t){return Zh.encodeInto(e,Z.subarray(t)).written}:!1,o=this;e||={};let s=e&&e.sequential,c=e.structures||e.saveStructures,l=e.maxSharedStructures;if(l??=c?32:0,l>8160)throw Error(`Maximum maxSharedStructure is 8160`);e.structuredClone&&e.moreTypes==null&&(this.moreTypes=!0);let u=e.maxOwnStructures;u??=c?32:64,!this.structures&&e.useRecords!=0&&(this.structures=[]);let d=l>32||u+l>64,f=l+64,p=l+u+64;if(p>8256)throw Error(`Maximum maxSharedStructure + maxOwnStructure is 8192`);let m=[],h=0,g=0,_=!1,v=0,y=null;this.pack=this.encode=function(e,a){if(cg)return x(e,a);if(Z||(Z=new tg(8192),ag=Z.dataView||(Z.dataView=new DataView(Z.buffer,0,8192)),Q=0),og=Z.length-10,og-Q<2048?(Z=new tg(Z.length),ag=Z.dataView||(Z.dataView=new DataView(Z.buffer,0,Z.length)),og=Z.length-10,Q=0):Q=Q+7&2147483640,t=Q,a&2048&&(Q+=a&255),i=o.structuredClone?new Map:null,o.bundleStrings&&typeof e!=`string`?(sg=[],sg.size=1/0):sg=null,r=o.structures,r){r.uninitialized&&(r=o._mergeStructures(o.getStructures()));let e=r.sharedLength||0;if(e>l)throw Error(`Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to `+r.sharedLength);r.transitions||(b(v&&o.saveStructures?Math.min(e,o.lastNamedStructuresLength||0):e),v||(o.lastNamedStructuresLength=e)),s&&r.nextId>=e+64||(r.nextId=e+64)}n&&=!1,!v&&y&&(y=null);let c;cg=!0,_=!0;try{o._writeStruct&&!(v&&o.saveStructures)&&e&&typeof e==`object`?e.constructor===Object?k(e):e.constructor!==Map&&!Array.isArray(e)&&!$h.some(t=>e instanceof t)?k(o.useToJSON!==!1&&e.toJSON?e.toJSON():e):w(e):w(e);let n=sg;if(sg&&yg(t,w,0),i&&i.idsToInsert){let e=i.idsToInsert.sort((e,t)=>e.offset>t.offset?1:-1),r=e.length,a=-1;for(;n&&r>0;){let i=e[--r].offset+t;i<n.stringsPosition+t&&a===-1&&(a=0),i>n.position+t?a>=0&&(a+=6):(a>=0&&(ag.setUint32(n.position+t,ag.getUint32(n.position+t)+a),a=-1),n=n.previous,r++)}a>=0&&n&&ag.setUint32(n.position+t,ag.getUint32(n.position+t)+a),Q+=e.length*6,Q>og&&A(Q),o.offset=Q;let s=vg(Z.subarray(t,Q),e);return i=null,s}return o.offset=Q,a&512?(Z.start=t,Z.end=Q,Z):Z.subarray(t,Q)}catch(e){throw c=e,e}finally{if(_=!1,r){if(S(),y&&!v){let e=y;if(y=null,!c&&o.saveStructures){let t=r.sharedLength||0;r.transitions||b(t);for(let i=0,a=e.length;i<a&&t<l;i++){let a=e[i],o,s=r.transitions;for(let e=0,t=a.length;e<t;e++){let t=a[e];o=s[t],o||=s[t]=Object.create(null),s=o}if(!s[dg]){let e=t+64;a.highByte=e>=96&&d?e-96>>5:-1,a.isShared=!0,s[dg]=e,s.__keys__=a,r[t++]=a,r.sharedLength=t,n=!0}}s&&r.nextId>=t+64||(r.nextId=t+64)}}if(n&&!v&&o.saveStructures){let n=r.sharedLength||0,i=Z.subarray(t,Q);if(!c){let t=!1;try{let n=(o._prepareStructures||bg)(r,o);if(o.saveStructures(n,n.isCompatible)===!1)return r.uninitialized=!0,t=!0,cg=!1,o.pack(e,a);t=!0}finally{cg=!1,t||(r=o.structures,o.getStructures&&(r.uninitialized=!0),r.length=r.sharedLength=o.lastNamedStructuresLength||0,r.transitions=null)}return o.lastNamedStructuresLength=n,Z.length>1073741824&&(Z=null),i}o.getStructures&&(r.uninitialized=!0),r.length=r.sharedLength=o.lastNamedStructuresLength||0,r.transitions=null}}cg=!1,Z.length>1073741824&&(Z=null),a&1024&&(Q=t)}};let b=e=>{r.transitions=Object.create(null);for(let t=0;t<e;t++){let e=r[t];if(!e)continue;let n,i=r.transitions;for(let t=0,r=e.length;t<r;t++){let r=e[t];n=i[r],n||=i[r]=Object.create(null),i=n}i[dg]=t+64}},x=(e,a)=>{let s=Z,c=ag,l=Q,u=og,d=sg,f=t,p=i,g=n,x=_,S,C,w,T,E,D,O,k,A,j,ee,M,te=!1;x&&(M=y?y.length:0,v++);try{if(x&&r){S=r,C=r.transitions,w=r.nextId,T=r.nextOwnId,A=o.lastNamedStructuresLength,k=r.sharedLength||0,O=r.slice(k),E=m,D=[];for(let e=0,t=m.length;e<t;e++){let t=m[e],n=t[dg];D[e]=n,t[dg]=0,n>=k+64&&t.__keys__&&(O[n-k-64]=t.__keys__)}if(m=[],g&&o.saveStructures&&C){j=[];for(let e=A||0;e<k;e++){let t=r[e];if(!t)continue;let n=C;for(let e=0,r=t.length;e<r&&n;e++)n=n[t[e]];n&&n[dg]===e+64&&(j.push(n,e+64,n.__keys__),n[dg]=0,n.__keys__=null)}}r.length=k,r.nextId=k+64,r.nextOwnId=void 0,ee=h,h=0}Z=null,cg=!1,_=!1;let t=o.pack(e,a);return te=!0,t}finally{if(!te&&x&&y&&(y.length=M),cg=!0,_=x,Z=s,ag=c,Q=l,og=u,sg=d,t=f,i=p,x){if(v--,n=g||n,r=o.structures,r&&O){if(m!==E)for(let e=0,t=m.length;e<t;e++)m[e][dg]=0;let e=r.sharedLength||0;if(r!==S){if(g||O.length>0){for(let e=0;e<k;e++)S[e]!==void 0&&(r[e]=S[e]);e=r.sharedLength=r.length=k,o.lastNamedStructuresLength=A}else!v&&!n&&(o.lastNamedStructuresLength=e)}r.length=Math.max(e,k+O.length);for(let t=Math.max(0,e-k),n=O.length;t<n;t++)O[t]!==void 0&&(r[k+t]=O[t]);if(r.transitions!==C||r!==S){if(r===S&&!r.transitions&&e===k)r.transitions=C;else{b(v&&o.saveStructures?Math.min(e,o.lastNamedStructuresLength||0):e),j=null,E=[],D=[];for(let t=Math.max(0,e-k),n=O.length;t<n;t++){let e=O[t];if(!e)continue;let n,i=r.transitions;for(let t=0,r=e.length;t<r;t++){let r=e[t];n=i[r],n||=i[r]=Object.create(null),i=n}i[dg]||(E.push(i),D.push(k+t+64))}}}if(j)for(let e=0,t=j.length;e<t;e+=3)j[e][dg]=j[e+1],j[e].__keys__=j[e+2];m=E;for(let e=0,t=D.length;e<t;e++)m[e][dg]||(m[e][dg]=D[e]);r.nextId=w>=e+64?w:e+64,r.nextOwnId=T,ee!==void 0&&(h+=ee)}}else n=g}},S=()=>{g<10&&g++;let e=r.sharedLength||0;if(r.length>e&&!s&&(r.length=e),h>1e4&&!v)r.transitions=null,g=0,h=0,m.length>0&&(m=[]);else if(m.length>0&&!s){for(let e=0,t=m.length;e<t;e++)m[e][dg]=0;m=[]}},C=e=>{var t=e.length;t<16?Z[Q++]=144|t:t<65536?(Z[Q++]=220,Z[Q++]=t>>8,Z[Q++]=t&255):(Z[Q++]=221,ag.setUint32(Q,t),Q+=4);for(let n=0;n<t;n++)w(e[n])},w=e=>{Q>og&&(Z=A(Q));var n=typeof e,r;if(n===`string`){let n=e.length;if(sg&&n>=4&&n<4096){if((sg.size+=n)>lg){let e,n=(sg[0]?sg[0].length*3+sg[1].length:0)+10;Q+n>og&&(Z=A(Q+n));let r;sg.position?(r=sg,Z[Q]=200,Q+=3,Z[Q++]=98,e=Q-t,Q+=4,yg(t,w,0),ag.setUint16(e+t-3,Q-t-e)):(Z[Q++]=214,Z[Q++]=98,e=Q-t,Q+=4),sg=[``,``],sg.previous=r,sg.size=0,sg.position=e}let r=ug.test(e);sg[+!r]+=e,Z[Q++]=193,w(r?-n:n);return}let i;i=n<32?1:n<256?2:n<65536?3:5;let o=n*3;if(Q+o>og&&(Z=A(Q+o)),n<64||!a){let t,a,o,s=Q+i;for(t=0;t<n;t++)a=e.charCodeAt(t),a<128?Z[s++]=a:a<2048?(Z[s++]=a>>6|192,Z[s++]=a&63|128):(a&64512)==55296&&((o=e.charCodeAt(t+1))&64512)==56320?(a=65536+((a&1023)<<10)+(o&1023),t++,Z[s++]=a>>18|240,Z[s++]=a>>12&63|128,Z[s++]=a>>6&63|128,Z[s++]=a&63|128):(a&63488)==55296?(Z[s++]=239,Z[s++]=191,Z[s++]=189):(Z[s++]=a>>12|224,Z[s++]=a>>6&63|128,Z[s++]=a&63|128);r=s-Q-i}else r=a(e,Q+i);r<32?Z[Q++]=160|r:r<256?(i<2&&Z.copyWithin(Q+2,Q+1,Q+1+r),Z[Q++]=217,Z[Q++]=r):r<65536?(i<3&&Z.copyWithin(Q+3,Q+2,Q+2+r),Z[Q++]=218,Z[Q++]=r>>8,Z[Q++]=r&255):(i<5&&Z.copyWithin(Q+5,Q+3,Q+3+r),Z[Q++]=219,ag.setUint32(Q,r),Q+=4),Q+=r}else if(n===`number`){if(e>>>0===e)e<32||e<128&&this.useRecords===!1||e<64&&!this._writeStruct?Z[Q++]=e:e<256?(Z[Q++]=204,Z[Q++]=e):e<65536?(Z[Q++]=205,Z[Q++]=e>>8,Z[Q++]=e&255):(Z[Q++]=206,ag.setUint32(Q,e),Q+=4);else if((e|0)===e)e>=-32?Z[Q++]=256+e:e>=-128?(Z[Q++]=208,Z[Q++]=e+256):e>=-32768?(Z[Q++]=209,ag.setInt16(Q,e),Q+=2):(Z[Q++]=210,ag.setInt32(Q,e),Q+=4);else{let t;if((t=this.useFloat32)>0&&e<4294967296&&e>=-2147483648){Z[Q++]=202,ag.setFloat32(Q,e);let n;if(t<4||((n=e*Jh[(Z[Q]&127)<<1|Z[Q+1]>>7])|0)===n){Q+=4;return}Q--}Z[Q++]=203,ag.setFloat64(Q,e),Q+=8}}else if(n===`object`||n===`function`){if(!e)Z[Q++]=192;else{if(i){let n=i.get(e);if(n){n.id||=(i.idsToInsert||(i.idsToInsert=[])).push(n),Z[Q++]=214,Z[Q++]=112,ag.setUint32(Q,n.id),Q+=4;return}i.set(e,{offset:Q-t})}let a=e.constructor;if(a===Object)O(e);else if(a===Array)C(e);else if(a===Map){if(this.mapAsEmptyObject)Z[Q++]=128;else{r=e.size,r<16?Z[Q++]=128|r:r<65536?(Z[Q++]=222,Z[Q++]=r>>8,Z[Q++]=r&255):(Z[Q++]=223,ag.setUint32(Q,r),Q+=4);for(let[t,n]of e)w(t),w(n)}}else{for(let t=0,n=Qh.length;t<n;t++){let r=$h[t];if(e instanceof r){if(e.constructor!==r&&t>=n-mg&&o.useToJSON!==!1&&e.toJSON!==void 0&&e.toJSON!==pg&&!ArrayBuffer.isView(e))break;let i=Qh[t];if(i.write){i.type&&(Z[Q++]=212,Z[Q++]=i.type,Z[Q++]=0);let t=i.write.call(this,e);t===e?Array.isArray(e)?C(e):O(e):w(t);return}let a=Z,s=ag,c=Q,l=sg;Z=null;let u;try{u=i.pack.call(this,e,e=>(Z=a,a=null,Q+=e,Q>og&&A(Q),{target:Z,targetView:ag,position:Q-e}),w)}finally{a&&(Z=a,ag=s,Q=c,sg=l,og=Z.length-10)}u&&(u.length+Q>og&&A(u.length+Q),Q=_g(u,Z,Q,i.type));return}}if(Array.isArray(e))C(e);else{if(o.useToJSON!==!1&&e.toJSON){let t=e.toJSON();if(t!==e)return w(t)}if(n===`function`)return w(this.writeFunction&&this.writeFunction(e));O(e)}}}}else if(n===`boolean`)Z[Q++]=e?195:194;else if(n===`bigint`){if(e<0x8000000000000000&&e>=-0x8000000000000000)Z[Q++]=211,ag.setBigInt64(Q,e);else if(e<0x10000000000000000&&e>0)Z[Q++]=207,ag.setBigUint64(Q,e);else if(this.largeBigIntToFloat)Z[Q++]=203,ag.setFloat64(Q,Number(e));else if(this.largeBigIntToString)return w(e.toString());else if(this.useBigIntExtension||this.moreTypes){let t=BigInt(e<0?-1:0),n;if(e>>BigInt(65536)===t){let r=BigInt(0x10000000000000000)-BigInt(1),i=[];for(;i.push(e&r),e>>BigInt(63)!==t;)e>>=BigInt(64);n=new Uint8Array(new BigUint64Array(i).buffer),n.reverse()}else{let t=e<0,r=(t?~e:e).toString(16);if(r.length%2?r=`0`+r:parseInt(r.charAt(0),16)>=8&&(r=`00`+r),eg)n=Buffer.from(r,`hex`);else{n=new Uint8Array(r.length/2);for(let e=0;e<n.length;e++)n[e]=parseInt(r.slice(e*2,e*2+2),16)}if(t)for(let e=0;e<n.length;e++)n[e]=~n[e]}n.length+Q>og&&A(n.length+Q),Q=_g(n,Z,Q,66);return}else throw RangeError(e+` was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string`);Q+=8}else if(n===`undefined`)this.encodeUndefinedAsNil?Z[Q++]=192:(Z[Q++]=212,Z[Q++]=0,Z[Q++]=0);else throw Error(`Unknown type: `+n)},T=this.variableMapSize||this.coercibleKeyAsNumber||this.skipValues?e=>{let t;if(this.skipValues){t=[];for(let n in e)(typeof e.hasOwnProperty!=`function`||e.hasOwnProperty(n))&&!this.skipValues.includes(e[n])&&t.push(n)}else t=Object.keys(e);let n=t.length;n<16?Z[Q++]=128|n:n<65536?(Z[Q++]=222,Z[Q++]=n>>8,Z[Q++]=n&255):(Z[Q++]=223,ag.setUint32(Q,n),Q+=4);let r;if(this.coercibleKeyAsNumber)for(let i=0;i<n;i++){r=t[i];let n=Number(r);w(isNaN(n)?r:n),w(e[r])}else for(let i=0;i<n;i++)w(r=t[i]),w(e[r])}:e=>{Z[Q++]=222;let n=Q-t;Q+=2;let r=0;for(let t in e)(typeof e.hasOwnProperty!=`function`||e.hasOwnProperty(t))&&(w(t),w(e[t]),r++);if(r>65535)throw Error(`Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object`);Z[n+++t]=r>>8,Z[n+t]=r&255},E=this.useRecords===!1?T:e.progressiveRecords&&!d&&u>0?e=>{let n,i=r.transitions||(r.transitions=Object.create(null)),a=Q++-t,o;for(let s in e)if(typeof e.hasOwnProperty!=`function`||e.hasOwnProperty(s)){if(n=i[s],n)i=n;else{let c=Object.keys(e),l=i;i=r.transitions;let u=0;for(let e=0,t=c.length;e<t;e++){let t=c[e];n=i[t],n||(n=i[t]=Object.create(null),u++),i=n}a+t+1==Q?(Q--,j(i,c,u)):ee(i,c,a,u),o=!0,i=l[s]}w(e[s])}if(!o){let n=i[dg];n?Z[a+t]=n:ee(i,Object.keys(e),a,0)}}:e=>{let t,n=r.transitions||(r.transitions=Object.create(null)),i=0;for(let r in e)(typeof e.hasOwnProperty!=`function`||e.hasOwnProperty(r))&&(t=n[r],t||(t=n[r]=Object.create(null),i++),n=t);let a=n[dg];if(a)a>=96&&d?(Z[Q++]=((a-=96)&31)+96,Z[Q++]=a>>5):Z[Q++]=a;else if(j(n,n.__keys__||Object.keys(e),i)===!1)return T(e);for(let t in e)(typeof e.hasOwnProperty!=`function`||e.hasOwnProperty(t))&&w(e[t])},D=typeof this.useRecords==`function`&&this.useRecords,O=D?e=>{D(e)?E(e):T(e)}:E,k=e=>{let i=o._writeStruct(e,Z,t,Q,r,A,(e,t,r)=>{if(r)return n=!0;Q=t;let i=Z;return w(e),S(),i===Z?Q:{position:Q,targetView:ag,target:Z}});if(i===0)return O(e);Q=i},A=e=>{let n;if(e>16777216){if(e-t>rg)throw Error(`Packed buffer would be larger than maximum buffer size`);n=Math.min(rg,Math.round(Math.max((e-t)*(e>67108864?1.25:2),4194304)/4096)*4096)}else n=(Math.max(e-t<<2,Z.length-1)>>12)+1<<12;let r=new tg(n);return ag=r.dataView||=new DataView(r.buffer,0,n),e=Math.min(e,Z.length),Z.copy?Z.copy(r,0,t,e):r.set(Z.slice(t,e)),Q-=t,t=0,og=r.length-10,Z=r},j=(e,t,i)=>{let a=r.nextId;if(a||=64,a<f&&(v&&this.saveStructures||this.shouldShareStructure&&!this.shouldShareStructure(t))){if(v&&this.saveStructures&&(!this.shouldShareStructure||this.shouldShareStructure(t))&&(y||=[]).push(t),!u)return!1;a=r.nextOwnId,a<p||(a=f),r.nextOwnId=a+1}else{if(a>=p){if(!u)return!1;a=f}r.nextId=a+1}let o=t.highByte=a>=96&&d?a-96>>5:-1;e[dg]=a,e.__keys__=t,r[a-64]=t,a<f?(t.isShared=!0,r.sharedLength=a-63,n=!0,o>=0?(Z[Q++]=(a&31)+96,Z[Q++]=o):Z[Q++]=a):(o>=0?(Z[Q++]=213,Z[Q++]=114,Z[Q++]=(a&31)+96,Z[Q++]=o):(Z[Q++]=212,Z[Q++]=114,Z[Q++]=a),i&&(h+=g*i),m.length>=u&&(m.shift()[dg]=0),m.push(e),w(t))},ee=(e,n,r,i)=>{let a=Z,o=Q,s=og,c=t;Z=ig,Q=0,t=0,Z||(ig=Z=new tg(8192)),og=Z.length-10,j(e,n,i),ig=Z;let l=Q;if(Z=a,Q=o,og=s,t=c,l>1){let e=Q+l-1;e>og&&A(e);let n=r+t;Z.copyWithin(n+l,n+1,Q),Z.set(ig.slice(0,l),n),Q=e}else Z[r+t]=ig[0]}}useBuffer(e){Z=e,Z.dataView||(Z.dataView=new DataView(Z.buffer,Z.byteOffset,Z.byteLength)),ag=Z.dataView,Q=0}set position(e){Q=e}get position(){return Q}clearSharedData(){this.structures&&(this.structures=[],this.lastNamedStructuresLength=0),this.typedStructs&&=[]}},pg=Date.prototype.toJSON;$h=[Date,Set,Error,RegExp,ArrayBuffer,Object.getPrototypeOf(Uint8Array.prototype).constructor,DataView,uh],Qh=[{pack(e,t,n){let r=e.getTime()/1e3;if((this.useTimestamp32||e.getMilliseconds()===0)&&r>=0&&r<4294967296){let{target:e,targetView:n,position:i}=t(6);e[i++]=214,e[i++]=255,n.setUint32(i,r)}else if(r>0&&r<17179869184){let{target:n,targetView:i,position:a}=t(10);n[a++]=215,n[a++]=255,i.setUint32(a,e.getMilliseconds()*4e6+(r/4294967296|0)),i.setUint32(a+4,r)}else if(isNaN(r)){if(this.onInvalidDate)return t(0),n(this.onInvalidDate());let{target:e,targetView:r,position:i}=t(3);e[i++]=212,e[i++]=255,e[i++]=255}else{let{target:n,targetView:i,position:a}=t(15);n[a++]=199,n[a++]=12,n[a++]=255,i.setUint32(a,e.getMilliseconds()*1e6),i.setBigInt64(a+4,BigInt(Math.floor(r)))}}},{pack(e,t,n){if(this.setAsEmptyObject)return t(0),n({});let r=Array.from(e),{target:i,position:a}=t(this.moreTypes?3:0);this.moreTypes&&(i[a++]=212,i[a++]=115,i[a++]=0),n(r)}},{pack(e,t,n){let{target:r,position:i}=t(this.moreTypes?3:0);this.moreTypes&&(r[i++]=212,r[i++]=101,r[i++]=0);let a=[e.name,e.message,e.cause];typeof AggregateError==`function`&&e instanceof AggregateError&&a.push(e.errors),n(a)}},{pack(e,t,n){let{target:r,position:i}=t(this.moreTypes?3:0);this.moreTypes&&(r[i++]=212,r[i++]=120,r[i++]=0),n([e.source,e.flags])}},{pack(e,t){this.moreTypes?hg(e,16,t):gg(e,t)}},{pack(e,t){let n=e.constructor;n!==ng&&this.moreTypes?hg(e,Uh.indexOf(n.name),t):gg(e,t)}},{pack(e,t){this.moreTypes?hg(e,17,t):gg(e,t)}},{pack(e,t){let{target:n,position:r}=t(1);n[r]=193}}];var mg=Qh.length;function hg(e,t,n,r){let i=e.byteLength;if(i+1<256){var{target:a,position:o}=n(4+i);a[o++]=199,a[o++]=i+1}else if(i+1<65536){var{target:a,position:o}=n(5+i);a[o++]=200,a[o++]=i+1>>8,a[o++]=i+1&255}else{var{target:a,position:o,targetView:s}=n(7+i);a[o++]=201,s.setUint32(o,i+1),o+=4}a[o++]=116,a[o++]=t,e.buffer||(e=new Uint8Array(e)),a.set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength),o)}function gg(e,t){e.BYTES_PER_ELEMENT!==1&&(e=e.buffer?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e));let n=e.byteLength;var r,i;if(n<256){var{target:r,position:i}=t(n+2);r[i++]=196,r[i++]=n}else if(n<65536){var{target:r,position:i}=t(n+3);r[i++]=197,r[i++]=n>>8,r[i++]=n&255}else{var{target:r,position:i,targetView:a}=t(n+5);r[i++]=198,a.setUint32(i,n),i+=4}r.set(e,i)}function _g(e,t,n,r){let i=e.length;switch(i){case 1:t[n++]=212;break;case 2:t[n++]=213;break;case 4:t[n++]=214;break;case 8:t[n++]=215;break;case 16:t[n++]=216;break;default:i<256?(t[n++]=199,t[n++]=i):i<65536?(t[n++]=200,t[n++]=i>>8,t[n++]=i&255):(t[n++]=201,t[n++]=i>>24,t[n++]=i>>16&255,t[n++]=i>>8&255,t[n++]=i&255)}return t[n++]=r,t.set(e,n),n+=i,n}function vg(e,t){let n,r=t.length*6,i=e.length-r;for(;n=t.pop();){let t=n.offset,a=n.id;e.copyWithin(t+r,t,i),r-=6;let o=t+r;e[o++]=214,e[o++]=105,e[o++]=a>>24,e[o++]=a>>16&255,e[o++]=a>>8&255,e[o++]=a&255,i=t}return e}function yg(e,t,n){if(sg.length>0){ag.setUint32(sg.position+e,Q+n-sg.position-e),sg.stringsPosition=Q-e;let r=sg;sg=null,t(r[0]),t(r[1])}}function bg(e,t){return e.isCompatible=e=>{let n=!e||(t.lastNamedStructuresLength||0)===e.length;return n||t._mergeStructures(e),n},e}fg.SUPPORTS_STRUCT_HOOKS=!0;var xg=new fg({useRecords:!1});xg.pack,xg.pack;var{NEVER:Sg,ALWAYS:Cg,DECIMAL_ROUND:wg,DECIMAL_FIT:Tg}=Xh,Eg=c(o(((e,t)=>{t.exports=function(){throw Error(`ws does not work in the browser. Browser clients must use the native WebSocket object`)}}))(),1);globalThis.WebSocket||Eg.default;var Dg=[];typeof addEventListener==`function`&&typeof removeEventListener==`function`&&addEventListener(`offline`,()=>{console.warn(`@colyseus/sdk: 🛑 Network offline. Closing ${Dg.length} connection(s)`),Dg.slice().forEach(e=>e())},!1);var Og={};function kg(e,t){Og[e]=t}var Ag=class{state;decoder;setState(e,t){this.decoder.root.refs.size>1&&typeof this.decoder.decodeResync==`function`?this.decoder.decodeResync(e,t):this.decoder.decode(e,t)}getState(){return this.state}patch(e,t){return this.decoder.decode(e,t)}teardown(){this.decoder.root.clearRefs()}handshake(e,t){this.state?(Gm.decode(e,t),this.decoder=new Vm(this.state)):(this.decoder=Gm.decode(e,t),this.state=this.decoder.state)}};typeof window<`u`&&window?.location?.hostname!==void 0&&`${window.location.protocol.replace(`http`,`ws`)}${window.location.hostname}${window.location.port&&`:${window.location.port}`}`;var jg=class{setState(e){}getState(){return null}patch(e){}teardown(){}handshake(e){}};kg(`schema`,Ag),kg(`none`,jg);var $=e=>document.getElementById(e);function Mg(e){try{let t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function Ng(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}var Pg=0;function Fg(e,t=2400){let n=$(`toast`);n.textContent=e,n.classList.add(`on`),clearTimeout(Pg),Pg=window.setTimeout(()=>n.classList.remove(`on`),t)}var Ig=e=>e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function Lg(){let e=$(`start`);e.hidden=!1;let t=Mg(`party.me`)??{},n=Tl(t.look??{kind:al[Math.random()*4|0],color:Math.random()*8|0,prop:`wine`}),r=$(`name`);r.value=t.name??``;let i=new Qc({canvas:$(`preview`),antialias:!0,alpha:!0});i.setPixelRatio(Math.min(2,devicePixelRatio)),i.setSize(170,187,!1);let a=new kn;a.add(new ra(16774112,7033920,1.6));let o=new va(16777215,1.4);o.position.set(2,4,3),a.add(o);let s=new ha(30,170/187,.1,20);s.position.set(0,1.25,4.4),s.lookAt(0,.8,0);let c=ou(n),l=new cu(c);a.add(c.root);let u=0,d=performance.now(),f=.4,p=e=>{let t=Math.min(.05,(e-d)/1e3);d=e,f+=t*.6,c.root.rotation.y=Math.sin(f)*.6,l.update(t,!1,`charging`),i.render(a,s),u=requestAnimationFrame(p)};u=requestAnimationFrame(p);let m=(e=!0)=>{c.dispose(),c=ou(n),l=new cu(c),a.add(c.root),e&&l.play(`wave`)},h=$(`pick-kind`),g=$(`pick-color`),_=$(`pick-prop`),v=()=>{h.innerHTML=al.map(e=>`<button type="button" data-k="${e}" aria-pressed="${n.kind===e}">${ol[e]}</button>`).join(``),g.innerHTML=sl.map((e,t)=>`<button type="button" data-c="${t}" aria-pressed="${n.color===t}" aria-label="색 ${t+1}" style="background:${e}"></button>`).join(``),_.innerHTML=cl.map(e=>`<button type="button" data-p="${e}" aria-pressed="${n.prop===e}">${ll[e]}</button>`).join(``)};v();let y=e=>{let t=e.target.closest(`button`);if(t){if(t.dataset.k)n={...n,kind:t.dataset.k};else if(t.dataset.c)n={...n,color:Number(t.dataset.c)};else if(t.dataset.p)n={...n,prop:t.dataset.p};else return;v(),m()}};return[h,g,_].forEach(e=>e.addEventListener(`click`,y)),m(!0),new Promise(t=>{let a=$(`start-form`),o=s=>{s.preventDefault();let l=wl(r.value);l?(Ng(`party.me`,{name:l,look:n}),cancelAnimationFrame(u),c.dispose(),i.dispose(),a.removeEventListener(`submit`,o),[h,g,_].forEach(e=>e.removeEventListener(`click`,y)),e.hidden=!0,t({name:l,look:n})):(r.focus(),r.setCustomValidity(`이름을 적어 주세요`),r.reportValidity())};r.addEventListener(`input`,()=>r.setCustomValidity(``)),a.addEventListener(`submit`,o),r.value||setTimeout(()=>r.focus(),300)})}function Rg(e){let t=e.trim();if(!t)return null;try{let e=new URL(t).searchParams.get(`room`);if(e)return e}catch{}return/^[\w-]{4,40}$/.test(t)?t:null}var zg=class{rec=null;stream=null;chunks=[];started=0;stopTimer=0;resolve=null;static supported(){return window.MediaRecorder!==void 0&&!!navigator.mediaDevices?.getUserMedia}get recording(){return!!this.rec&&this.rec.state===`recording`}elapsed(){return this.recording?Date.now()-this.started:0}async start(){this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0}});let e=[`audio/webm;codecs=opus`,`audio/ogg;codecs=opus`,`audio/mp4`,`audio/webm`].find(e=>MediaRecorder.isTypeSupported?.(e));this.rec=new MediaRecorder(this.stream,{...e?{mimeType:e}:{},audioBitsPerSecond:32e3}),this.chunks=[],this.rec.ondataavailable=e=>{e.data.size&&this.chunks.push(e.data)},this.rec.onstop=()=>{let t=Math.min(el,Date.now()-this.started),n=new Blob(this.chunks,{type:(this.rec?.mimeType||e||`audio/webm`).split(`;`)[0]});this.cleanup();let r=n.size>0&&n.size<=4e5&&t>=400;this.resolve?.(r?{blob:n,ms:t}:null),this.resolve=null},this.started=Date.now(),this.rec.start(250),this.stopTimer=window.setTimeout(()=>this.rec?.state===`recording`&&this.rec.stop(),el)}stop(){return new Promise(e=>{!this.rec||this.rec.state!==`recording`?e(null):(this.resolve=e,this.rec.stop())})}cancel(){this.resolve=null,this.rec&&this.rec.state===`recording`?(this.rec.onstop=()=>this.cleanup(),this.rec.stop()):this.cleanup()}cleanup(){window.clearTimeout(this.stopTimer),this.stream?.getTracks().forEach(e=>e.stop()),this.stream=null,this.rec=null}},Bg={cheers:`건배`,laugh:`웃음`,clap:`박수`,heart:`좋아요`,wow:`놀람`,wave:`손 흔들기`};function Vg(e,t){let n=$(`hud`);n.hidden=!1,$(`party-title`).textContent=e.title,$(`party-private`).hidden=!e.isPrivate,$(`demo-banner`).hidden=!e.demo,$(`invite-btn`).hidden=e.demo;let r=null,i=null,a=`charging`,o=[],s=(e,t,n)=>{e.addEventListener(t,n),o.push(()=>e.removeEventListener(t,n))};if(!Mg(`party.helped`)){let e=$(`help`);e.textContent=matchMedia(`(pointer: coarse)`).matches?`바닥을 누르거나 조이스틱으로 걸어요. 빛나는 원 안의 사람에게만 말이 들려요.`:`방향키나 바닥 클릭으로 걸어요. 발밑의 빛나는 원 안에 있는 사람에게만 말이 들려요.`,e.hidden=!1;let t=()=>{e.hidden=!0,Ng(`party.helped`,1)};setTimeout(t,9e3),s(e,`click`,t)}let c=()=>{let e=new Date,t=e.getHours(),n=e.getMinutes(),r=Kl(t+n/60),i=t<12?`오전`:`오후`,a=t%12==0?12:t%12;$(`clock`).textContent=`${ql[r]} 내 시각 ${i} ${a}:${String(n).padStart(2,`0`)}`};c();let l=setInterval(c,2e4);o.push(()=>clearInterval(l));let u=$(`chat-input`);s($(`chat-form`),`submit`,t=>{t.preventDefault();let n=u.value.trim();n&&(e.chat(n),u.value=``)}),s(window,`keydown`,e=>{e.key===`Enter`&&!tu(e)&&$(`art`).hidden&&(u.focus(),e.preventDefault()),e.key===`Escape`&&($(`art`).hidden?document.activeElement===u&&u.blur():k())}),s(u,`focus`,()=>{t.enabled=!1}),s(u,`blur`,()=>{t.enabled=!0});let d=$(`emotes`);d.innerHTML=rl.map(e=>`<button type="button" data-e="${e}" title="${Bg[e]}" aria-label="${Bg[e]}">${il[e]}</button>`).join(``),s(d,`click`,e=>{let t=e.target.closest(`button[data-e]`);t&&r&&r.emote(t.dataset.e)});let f=$(`battery-btn`),p=e=>{a=e,f.setAttribute(`aria-pressed`,String(e===`low`)),f.querySelector(`.bi`).textContent=e===`low`?`🪫`:`🔋`,f.querySelector(`.bl`).textContent=e===`low`?`방전`:`충전 중`,f.title=`${dl[e]} (눌러서 바꾸기)`};p(`charging`),s(f,`click`,()=>{p(a===`charging`?`low`:`charging`),e.battery(a),Fg(a===`low`?`방전 상태로 바꿨어요. 다들 구경만 하고 싶은 걸 알 수 있어요.`:`충전 중으로 바꿨어요. 말 걸어도 된다는 표시예요.`)});let m=$(`mic-btn`),h=$(`dock`),g=$(`recbar`),_=$(`rec-time`),v=new zg,y=0;zg.supported()||(m.hidden=!0);let b=e=>`${Math.floor(e/6e4)}:${String(Math.floor(e/1e3)%60).padStart(2,`0`)}`,x=()=>{clearInterval(y),g.hidden=!0,h.hidden=!1};s(m,`click`,async()=>{try{await v.start()}catch{Fg(`마이크를 쓸 수 없어요. 브라우저 주소창 옆에서 마이크 권한을 허용해 주세요.`,4e3);return}h.hidden=!0,g.hidden=!1,_.textContent=`0:00`,y=window.setInterval(()=>{let e=v.elapsed();_.textContent=b(e),e>=29900&&S()},200)});let S=async()=>{x();let t=await v.stop();if(!t)Fg(`너무 짧거나 커서 보내지 못했어요. 다시 녹음해 주세요.`);else try{await e.voice(t.blob,t.ms)}catch{Fg(`음성 메시지를 보내지 못했어요.`)}};s($(`rec-send`),`click`,()=>void S()),s($(`rec-cancel`),`click`,()=>{x(),v.cancel()}),o.push(()=>{v.cancel(),x()});let C=$(`people-btn`),w=$(`people`),T=$(`people-list`);s(C,`click`,()=>{w.hidden=!w.hidden,C.setAttribute(`aria-expanded`,String(!w.hidden))}),s(T,`click`,e=>{let t=e.target.closest(`button[data-mute]`);if(!t||!r)return;let n=t.getAttribute(`aria-pressed`)!==`true`;r.mute(t.dataset.mute,n),Fg(n?`이 사람의 말과 음성이 이제 안 보여요.`:`다시 보이게 했어요.`)}),s($(`invite-btn`),`click`,async()=>{let t=new URL(location.href);t.search=``,t.searchParams.set(`room`,e.roomId);let n=t.toString();try{await navigator.clipboard.writeText(n),Fg(`초대 링크를 복사했어요. 친구에게 보내 주세요.`)}catch{prompt(`이 링크를 친구에게 보내 주세요`,n)}});let E=$(`art`),D=$(`art-chip`),O=e=>{$(`art-img`).src=kl(e),$(`art-img`).alt=e.title,$(`art-room`).textContent=Al[e.room].name,$(`art-title`).textContent=e.title,$(`art-doc`).textContent=e.doc,E.hidden=!1,$(`art-close`).focus()},k=()=>{E.hidden=!0};return s($(`art-close`),`click`,k),s(D,`click`,()=>{i&&O(i.art)}),{hooks:{room:e=>{$(`where`).textContent=Al[e].name},painting:e=>{i=e,D.hidden=!e,e&&(D.textContent=`「${e.art.title}」 보기`)},arrived:e=>O(e.art),guests:e=>{let t=e.filter(e=>e.near).length;$(`who`).textContent=t?`${e.length}명 있어요, 근처에 ${t}명`:`${e.length}명 있어요`,w.hidden||(T.innerHTML=e.sort((e,t)=>Number(t.self)-Number(e.self)||Number(t.near)-Number(e.near)).map(e=>`<li><span>${e.battery===`low`?`🪫`:`🔋`}</span>
          <span>${Ig(e.name)}${e.self?`<span class="me">나</span>`:e.near?`<span class="near">근처</span>`:``}</span>
          ${e.self?`<span></span>`:`<button type="button" data-mute="${Ig(e.id)}" aria-pressed="${e.muted}">${e.muted?`다시 보기`:`안 보기`}</button>`}</li>`).join(``))}},attach(e){r=e},closed:new Promise(t=>{s($(`leave-btn`),`click`,()=>{e.leave(),t(`left`)}),e.on({closed:e=>t(e===`left`?`left`:`lost`)})}),dispose(){o.forEach(e=>e()),n.hidden=!0,E.hidden=!0,w.hidden=!0,D.hidden=!0,$(`help`).hidden=!0}}}matchMedia(`(pointer: coarse)`).matches&&document.documentElement.classList.add(`touch`);var Hg=$(`view`),Ug=matchMedia(`(pointer: coarse)`).matches,Wg=new Qc({canvas:Hg,antialias:!Ug,powerPreference:`high-performance`});Wg.setPixelRatio(Math.min(devicePixelRatio,Ug?1.5:2)),Wg.outputColorSpace=qe,Wg.toneMapping=4,Wg.toneMappingExposure=1.05;var Gg=new kn,Kg=new ha(40,1,.1,120),qg=Ql(Gg,Wg);qg.setTime(new Date),setInterval(()=>qg.setTime(new Date),6e4);var Jg=()=>{let e=innerWidth,t=innerHeight;Wg.setSize(e,t,!1),Kg.aspect=e/t,Kg.updateProjectionMatrix()};addEventListener(`resize`,Jg),Jg();var Yg=new $l($(`joystick`)),Xg=null,Zg=0;function Qg(e){Zg+=e*.05;let t=30+Math.sin(Zg)*24;Kg.position.set(t,7.5,9.5),Kg.lookAt(t,1.4,-2)}var $g=performance.now();Wg.setAnimationLoop(e=>{let t=Math.min(.1,(e-$g)/1e3);$g=e,Xg?Xg.update(t):Qg(t),Wg.render(Gg,Kg)}),(document.fonts?.ready??Promise.resolve()).then(()=>{qg.loadArt().then(()=>$(`loading`).classList.add(`done`)),setTimeout(()=>$(`loading`).classList.add(`done`),4e3)});async function e_(){let e=await Lg();for(Rg(new URLSearchParams(location.search).get(`room`)??``);;){let t;t=new _u(e.name,e.look);let n=Vg(t,Yg);Xg=new du(Gg,Kg,Hg,qg,t,Yg,$(`tags`),n.hooks),n.attach(Xg),!t.demo&&t.isPrivate&&Fg(`친구만 들어오는 파티예요. 위의 "초대하기"로 링크를 보내 주세요.`,4e3),history.replaceState(null,``,t.demo?location.pathname:`?room=${encodeURIComponent(t.roomId)}`),await n.closed,Xg.dispose(),Xg=null,n.dispose(),history.replaceState(null,``,location.pathname),e=await Lg()}}e_();