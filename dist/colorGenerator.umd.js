(function(j,A){typeof exports=="object"&&typeof module!="undefined"?A(exports):typeof define=="function"&&define.amd?define(["exports"],A):(j=typeof globalThis!="undefined"?globalThis:j||self,A(j.colorGenerator={}))})(this,function(j){"use strict";function A(){this.colorToObject=function(t){return typeof t!="string"?t:this.getValueCollection(t)};const r=function(t){return parseInt(t,16)},e=function(t){let n=t.toString(16);return n.length===1&&(n=`0${n}`),n.toUpperCase()};this.hexToRgb=function(t){if(this.color=t,this.color.red!==void 0)return this;let n=this.color.replace("#","");n.length===3&&(n=n.split("").map(function(s){return`${s+s}`}).join(""));const a=r(n.substring(0,2)),v=r(n.substring(2,4)),l=r(n.substring(4,6));return this.color={red:a,green:v,blue:l},this},this.rgbToHex=function(t){if(this.color=this.colorToObject(t),typeof this.color.red!="undefined")this.color=`#${e(this.color.red)}${e(this.color.green)}${e(this.color.blue)}`;else throw new Error('The rgbToHex method require a "{red: XXX, green: YYY, blue: ZZZ}" object as input value');return this},this.rgbToHsl=function(t){this.color=this.colorToObject(t);const n=[this.color.red/255,this.color.green/255,this.color.blue/255];n.sort(function(T,o){return T-o});const a=n[0],v=n[1],l=n[2],s=Math.round((a+l)*100/2);if(l===a&&v===a)return this.color={light:s,saturation:0,hue:0},this;let h;s>50?h=(l-a)/(2-l-a):h=(l-a)/(l+a),h=Math.round(h*100);let f;return l===this.color.red/255?f=(this.color.green-this.color.blue)/255/(l-a):l===this.color.green/255?f=2+(this.color.blue-this.color.red)/255/(l-a):f=4+(this.color.red-this.color.green)/255/(l-a),f<0?f=Math.round(f*60)+360:f=Math.round(f*60),this.color={light:s,saturation:h,hue:f},this},this.hslToRgb=function(t){this.color=this.colorToObject(t);const n=this.color.light/100,a=this.color.saturation/100,v=this.color.hue/360;if(this.color.saturation===0){const i=Math.round(n*255);return this.color={red:i,green:i,blue:i},this}let l;n<.5?l=n*(1+a):l=n+a-n*a;const s=2*n-l,h=function(i,c,u){return u<0?u+=1:u>1&&(u-=1),u<1/6?i+(c-i)*6*u:u<1/2?c:u<2/3?i+(c-i)*(2/3-u)*6:i},f=h(s,l,v+1/3),T=h(s,l,v),o=h(s,l,v-1/3);return this.color={red:Math.round(f*255),green:Math.round(T*255),blue:Math.round(o*255)},this},this.hexToHsl=function(t){return t=this.hexToRgb(t).getValueCollection(),t=this.rgbToHsl(t).getValueCollection(),this.color=t,this},this.hslToHex=function(t){return t=this.hslToRgb(t).getValueCollection(),t=this.rgbToHex(t).getValueCollection(),this.color=t,this},this.getString=function(t){if(t&&(this.color=t),typeof this.color=="string")return this.color;if(this.color.red!==void 0)return`rgb(${this.color.red},${this.color.green},${this.color.blue})`;if(this.color.hue!==void 0)return`hsl(${this.color.hue},${this.color.saturation}%,${this.color.light}%)`;if(this.color.hexred!==void 0)return`#${this.color.hexred}${this.color.hexgreen}${this.color.hexblue}`;throw new Error('The getString method only takes Objects with the following keys : "hue, saturation, light" (with HSL values) - "hexblue, hexgreen, hexred" (with Hexadecimal RGB), "red, green, blue" (with base 256 RGB)')},this.getValueCollection=function(t){typeof t!="undefined"&&(this.color=t);const n=new RegExp(/^#([0-9a-f]{3}){1,2}$/i);if(typeof this.color=="object")return this.color;if(this.color.indexOf("rgb(")>-1){let a=this.color.split("(")[1].split(" ");return{red:parseInt(a[0]),green:parseInt(a[1]),blue:parseInt(a[2])}}else if(this.color.indexOf("hsl(")>-1){const a=this.color.split("(")[1].split(" ");return{hue:parseInt(a[0]),saturation:parseInt(a[1]),light:parseInt(a[2])}}else if(n.test(this.color)){const a=this.color;return{hexred:a.substring(1,3),hexgreen:a.substring(3,5),hexblue:a.substring(5,7)}}}}var Nr=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},K=function(r){return r&&r.Math==Math&&r},g=K(typeof globalThis=="object"&&globalThis)||K(typeof window=="object"&&window)||K(typeof self=="object"&&self)||K(typeof Nr=="object"&&Nr)||function(){return this}()||Function("return this")(),er={},w=function(r){try{return!!r()}catch{return!0}},Je=w,x=!Je(function(){return Object.defineProperty({},1,{get:function(){return 7}})[1]!=7}),Ye=w,tr=!Ye(function(){var r=function(){}.bind();return typeof r!="function"||r.hasOwnProperty("prototype")}),Qe=tr,U=Function.prototype.call,nr=Qe?U.bind(U):function(){return U.apply(U,arguments)},or={},Fr={}.propertyIsEnumerable,Ar=Object.getOwnPropertyDescriptor,rt=Ar&&!Fr.call({1:2},1);or.f=rt?function(e){var t=Ar(this,e);return!!t&&t.enumerable}:Fr;var Gr=function(r,e){return{enumerable:!(r&1),configurable:!(r&2),writable:!(r&4),value:e}},Lr=tr,Vr=Function.prototype,et=Vr.bind,ar=Vr.call,tt=Lr&&et.bind(ar,ar),S=Lr?function(r){return r&&tt(r)}:function(r){return r&&function(){return ar.apply(r,arguments)}},Br=S,nt=Br({}.toString),ot=Br("".slice),ir=function(r){return ot(nt(r),8,-1)},at=g,it=S,lt=w,st=ir,lr=at.Object,ct=it("".split),Hr=lt(function(){return!lr("z").propertyIsEnumerable(0)})?function(r){return st(r)=="String"?ct(r,""):lr(r)}:lr,ut=g,vt=ut.TypeError,Kr=function(r){if(r==null)throw vt("Can't call method on "+r);return r},ht=Hr,ft=Kr,k=function(r){return ht(ft(r))},C=function(r){return typeof r=="function"},bt=C,D=function(r){return typeof r=="object"?r!==null:bt(r)},sr=g,gt=C,dt=function(r){return gt(r)?r:void 0},z=function(r,e){return arguments.length<2?dt(sr[r]):sr[r]&&sr[r][e]},yt=S,pt=yt({}.isPrototypeOf),$t=z,St=$t("navigator","userAgent")||"",Ur=g,cr=St,kr=Ur.process,zr=Ur.Deno,Wr=kr&&kr.versions||zr&&zr.version,Xr=Wr&&Wr.v8,I,W;Xr&&(I=Xr.split("."),W=I[0]>0&&I[0]<4?1:+(I[0]+I[1])),!W&&cr&&(I=cr.match(/Edge\/(\d+)/),(!I||I[1]>=74)&&(I=cr.match(/Chrome\/(\d+)/),I&&(W=+I[1])));var Ot=W,qr=Ot,Ct=w,Zr=!!Object.getOwnPropertySymbols&&!Ct(function(){var r=Symbol();return!String(r)||!(Object(r)instanceof Symbol)||!Symbol.sham&&qr&&qr<41}),It=Zr,Jr=It&&!Symbol.sham&&typeof Symbol.iterator=="symbol",Tt=g,mt=z,wt=C,Et=pt,jt=Jr,xt=Tt.Object,Yr=jt?function(r){return typeof r=="symbol"}:function(r){var e=mt("Symbol");return wt(e)&&Et(e.prototype,xt(r))},Mt=g,Pt=Mt.String,Rt=function(r){try{return Pt(r)}catch{return"Object"}},_t=g,Dt=C,Nt=Rt,Ft=_t.TypeError,Qr=function(r){if(Dt(r))return r;throw Ft(Nt(r)+" is not a function")},At=Qr,Gt=function(r,e){var t=r[e];return t==null?void 0:At(t)},Lt=g,ur=nr,vr=C,hr=D,Vt=Lt.TypeError,Bt=function(r,e){var t,n;if(e==="string"&&vr(t=r.toString)&&!hr(n=ur(t,r))||vr(t=r.valueOf)&&!hr(n=ur(t,r))||e!=="string"&&vr(t=r.toString)&&!hr(n=ur(t,r)))return n;throw Vt("Can't convert object to primitive value")},fr={exports:{}},re=g,Ht=Object.defineProperty,br=function(r,e){try{Ht(re,r,{value:e,configurable:!0,writable:!0})}catch{re[r]=e}return e},Kt=g,Ut=br,ee="__core-js_shared__",kt=Kt[ee]||Ut(ee,{}),gr=kt,te=gr;(fr.exports=function(r,e){return te[r]||(te[r]=e!==void 0?e:{})})("versions",[]).push({version:"3.20.3",mode:"global",copyright:"\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.20.3/LICENSE",source:"https://github.com/zloirock/core-js"});var zt=g,Wt=Kr,Xt=zt.Object,ne=function(r){return Xt(Wt(r))},qt=S,Zt=ne,Jt=qt({}.hasOwnProperty),M=Object.hasOwn||function(e,t){return Jt(Zt(e),t)},Yt=S,Qt=0,rn=Math.random(),en=Yt(1 .toString),oe=function(r){return"Symbol("+(r===void 0?"":r)+")_"+en(++Qt+rn,36)},tn=g,nn=fr.exports,ae=M,on=oe,ie=Zr,le=Jr,N=nn("wks"),P=tn.Symbol,se=P&&P.for,an=le?P:P&&P.withoutSetter||on,X=function(r){if(!ae(N,r)||!(ie||typeof N[r]=="string")){var e="Symbol."+r;ie&&ae(P,r)?N[r]=P[r]:le&&se?N[r]=se(e):N[r]=an(e)}return N[r]},ln=g,sn=nr,ce=D,ue=Yr,cn=Gt,un=Bt,vn=X,hn=ln.TypeError,fn=vn("toPrimitive"),bn=function(r,e){if(!ce(r)||ue(r))return r;var t=cn(r,fn),n;if(t){if(e===void 0&&(e="default"),n=sn(t,r,e),!ce(n)||ue(n))return n;throw hn("Can't convert object to primitive value")}return e===void 0&&(e="number"),un(r,e)},gn=bn,dn=Yr,ve=function(r){var e=gn(r,"string");return dn(e)?e:e+""},yn=g,he=D,dr=yn.document,pn=he(dr)&&he(dr.createElement),$n=function(r){return pn?dr.createElement(r):{}},Sn=x,On=w,Cn=$n,fe=!Sn&&!On(function(){return Object.defineProperty(Cn("div"),"a",{get:function(){return 7}}).a!=7}),In=x,Tn=nr,mn=or,wn=Gr,En=k,jn=ve,xn=M,Mn=fe,be=Object.getOwnPropertyDescriptor;er.f=In?be:function(e,t){if(e=En(e),t=jn(t),Mn)try{return be(e,t)}catch{}if(xn(e,t))return wn(!Tn(mn.f,e,t),e[t])};var yr={},Pn=x,Rn=w,_n=Pn&&Rn(function(){return Object.defineProperty(function(){},"prototype",{value:42,writable:!1}).prototype!=42}),ge=g,Dn=D,Nn=ge.String,Fn=ge.TypeError,de=function(r){if(Dn(r))return r;throw Fn(Nn(r)+" is not an object")},An=g,Gn=x,Ln=fe,Vn=_n,q=de,ye=ve,Bn=An.TypeError,pr=Object.defineProperty,Hn=Object.getOwnPropertyDescriptor,$r="enumerable",Sr="configurable",Or="writable";yr.f=Gn?Vn?function(e,t,n){if(q(e),t=ye(t),q(n),typeof e=="function"&&t==="prototype"&&"value"in n&&Or in n&&!n[Or]){var a=Hn(e,t);a&&a[Or]&&(e[t]=n.value,n={configurable:Sr in n?n[Sr]:a[Sr],enumerable:$r in n?n[$r]:a[$r],writable:!1})}return pr(e,t,n)}:pr:function(e,t,n){if(q(e),t=ye(t),q(n),Ln)try{return pr(e,t,n)}catch{}if("get"in n||"set"in n)throw Bn("Accessors not supported");return"value"in n&&(e[t]=n.value),e};var Kn=x,Un=yr,kn=Gr,Cr=Kn?function(r,e,t){return Un.f(r,e,kn(1,t))}:function(r,e,t){return r[e]=t,r},pe={exports:{}},zn=S,Wn=C,Ir=gr,Xn=zn(Function.toString);Wn(Ir.inspectSource)||(Ir.inspectSource=function(r){return Xn(r)});var Tr=Ir.inspectSource,qn=g,Zn=C,Jn=Tr,$e=qn.WeakMap,Yn=Zn($e)&&/native code/.test(Jn($e)),Qn=fr.exports,ro=oe,Se=Qn("keys"),eo=function(r){return Se[r]||(Se[r]=ro(r))},Oe={},to=Yn,Ce=g,mr=S,no=D,oo=Cr,wr=M,Er=gr,ao=eo,io=Oe,Ie="Object already initialized",jr=Ce.TypeError,lo=Ce.WeakMap,Z,G,J,so=function(r){return J(r)?G(r):Z(r,{})},co=function(r){return function(e){var t;if(!no(e)||(t=G(e)).type!==r)throw jr("Incompatible receiver, "+r+" required");return t}};if(to||Er.state){var R=Er.state||(Er.state=new lo),uo=mr(R.get),Te=mr(R.has),vo=mr(R.set);Z=function(r,e){if(Te(R,r))throw new jr(Ie);return e.facade=r,vo(R,r,e),e},G=function(r){return uo(R,r)||{}},J=function(r){return Te(R,r)}}else{var F=ao("state");io[F]=!0,Z=function(r,e){if(wr(r,F))throw new jr(Ie);return e.facade=r,oo(r,F,e),e},G=function(r){return wr(r,F)?r[F]:{}},J=function(r){return wr(r,F)}}var ho={set:Z,get:G,has:J,enforce:so,getterFor:co},xr=x,fo=M,me=Function.prototype,bo=xr&&Object.getOwnPropertyDescriptor,Mr=fo(me,"name"),go=Mr&&function(){}.name==="something",yo=Mr&&(!xr||xr&&bo(me,"name").configurable),po={EXISTS:Mr,PROPER:go,CONFIGURABLE:yo},$o=g,we=C,So=M,Ee=Cr,Oo=br,Co=Tr,je=ho,Io=po.CONFIGURABLE,To=je.get,mo=je.enforce,wo=String(String).split("String");(pe.exports=function(r,e,t,n){var a=n?!!n.unsafe:!1,v=n?!!n.enumerable:!1,l=n?!!n.noTargetGet:!1,s=n&&n.name!==void 0?n.name:e,h;if(we(t)&&(String(s).slice(0,7)==="Symbol("&&(s="["+String(s).replace(/^Symbol\(([^)]*)\)/,"$1")+"]"),(!So(t,"name")||Io&&t.name!==s)&&Ee(t,"name",s),h=mo(t),h.source||(h.source=wo.join(typeof s=="string"?s:""))),r===$o){v?r[e]=t:Oo(e,t);return}else a?!l&&r[e]&&(v=!0):delete r[e];v?r[e]=t:Ee(r,e,t)})(Function.prototype,"toString",function(){return we(this)&&To(this).source||Co(this)});var xe={},Eo=Math.ceil,jo=Math.floor,Me=function(r){var e=+r;return e!==e||e===0?0:(e>0?jo:Eo)(e)},xo=Me,Mo=Math.max,Po=Math.min,Ro=function(r,e){var t=xo(r);return t<0?Mo(t+e,0):Po(t,e)},_o=Me,Do=Math.min,No=function(r){return r>0?Do(_o(r),9007199254740991):0},Fo=No,Pe=function(r){return Fo(r.length)},Ao=k,Go=Ro,Lo=Pe,Re=function(r){return function(e,t,n){var a=Ao(e),v=Lo(a),l=Go(n,v),s;if(r&&t!=t){for(;v>l;)if(s=a[l++],s!=s)return!0}else for(;v>l;l++)if((r||l in a)&&a[l]===t)return r||l||0;return!r&&-1}},Vo={includes:Re(!0),indexOf:Re(!1)},Bo=S,Pr=M,Ho=k,Ko=Vo.indexOf,Uo=Oe,_e=Bo([].push),De=function(r,e){var t=Ho(r),n=0,a=[],v;for(v in t)!Pr(Uo,v)&&Pr(t,v)&&_e(a,v);for(;e.length>n;)Pr(t,v=e[n++])&&(~Ko(a,v)||_e(a,v));return a},Ne=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],ko=De,zo=Ne,Wo=zo.concat("length","prototype");xe.f=Object.getOwnPropertyNames||function(e){return ko(e,Wo)};var Fe={};Fe.f=Object.getOwnPropertySymbols;var Xo=z,qo=S,Zo=xe,Jo=Fe,Yo=de,Qo=qo([].concat),ra=Xo("Reflect","ownKeys")||function(e){var t=Zo.f(Yo(e)),n=Jo.f;return n?Qo(t,n(e)):t},Ae=M,ea=ra,ta=er,na=yr,oa=function(r,e,t){for(var n=ea(e),a=na.f,v=ta.f,l=0;l<n.length;l++){var s=n[l];!Ae(r,s)&&!(t&&Ae(t,s))&&a(r,s,v(e,s))}},aa=w,ia=C,la=/#|\.prototype\./,L=function(r,e){var t=ca[sa(r)];return t==va?!0:t==ua?!1:ia(e)?aa(e):!!e},sa=L.normalize=function(r){return String(r).replace(la,".").toLowerCase()},ca=L.data={},ua=L.NATIVE="N",va=L.POLYFILL="P",ha=L,Rr=g,fa=er.f,ba=Cr,ga=pe.exports,da=br,ya=oa,pa=ha,Ge=function(r,e){var t=r.target,n=r.global,a=r.stat,v,l,s,h,f,T;if(n?l=Rr:a?l=Rr[t]||da(t,{}):l=(Rr[t]||{}).prototype,l)for(s in e){if(f=e[s],r.noTargetGet?(T=fa(l,s),h=T&&T.value):h=l[s],v=pa(n?s:t+(a?".":"#")+s,r.forced),!v&&h!==void 0){if(typeof f==typeof h)continue;ya(f,h)}(r.sham||h&&h.sham)&&ba(f,"sham",!0),ga(l,s,f,r)}},Le=S,$a=Qr,Sa=tr,Oa=Le(Le.bind),Ca=function(r,e){return $a(r),e===void 0?r:Sa?Oa(r,e):function(){return r.apply(e,arguments)}},Ia=ir,Ta=Array.isArray||function(e){return Ia(e)=="Array"},ma=X,wa=ma("toStringTag"),Ve={};Ve[wa]="z";var Ea=String(Ve)==="[object z]",ja=g,xa=Ea,Ma=C,Y=ir,Pa=X,Ra=Pa("toStringTag"),_a=ja.Object,Da=Y(function(){return arguments}())=="Arguments",Na=function(r,e){try{return r[e]}catch{}},Fa=xa?Y:function(r){var e,t,n;return r===void 0?"Undefined":r===null?"Null":typeof(t=Na(e=_a(r),Ra))=="string"?t:Da?Y(e):(n=Y(e))=="Object"&&Ma(e.callee)?"Arguments":n},Aa=S,Ga=w,Be=C,La=Fa,Va=z,Ba=Tr,He=function(){},Ha=[],Ke=Va("Reflect","construct"),_r=/^\s*(?:class|function)\b/,Ka=Aa(_r.exec),Ua=!_r.exec(He),V=function(e){if(!Be(e))return!1;try{return Ke(He,Ha,e),!0}catch{return!1}},Ue=function(e){if(!Be(e))return!1;switch(La(e)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return Ua||!!Ka(_r,Ba(e))}catch{return!0}};Ue.sham=!0;var ka=!Ke||Ga(function(){var r;return V(V.call)||!V(Object)||!V(function(){r=!0})||r})?Ue:V,za=g,ke=Ta,Wa=ka,Xa=D,qa=X,Za=qa("species"),ze=za.Array,Ja=function(r){var e;return ke(r)&&(e=r.constructor,Wa(e)&&(e===ze||ke(e.prototype))?e=void 0:Xa(e)&&(e=e[Za],e===null&&(e=void 0))),e===void 0?ze:e},Ya=Ja,Qa=function(r,e){return new(Ya(r))(e===0?0:e)},ri=Ca,ei=S,ti=Hr,ni=ne,oi=Pe,ai=Qa,We=ei([].push),E=function(r){var e=r==1,t=r==2,n=r==3,a=r==4,v=r==6,l=r==7,s=r==5||v;return function(h,f,T,o){for(var i=ni(h),c=ti(i),u=ri(f,T),y=oi(c),b=0,d=o||ai,p=e?d(h,y):t||l?d(h,0):void 0,$,m;y>b;b++)if((s||b in c)&&($=c[b],m=u($,b,i),r))if(e)p[b]=m;else if(m)switch(r){case 3:return!0;case 5:return $;case 6:return b;case 2:We(p,$)}else switch(r){case 4:return!1;case 7:We(p,$)}return v?-1:n||a?a:p}},ii={forEach:E(0),map:E(1),filter:E(2),some:E(3),every:E(4),find:E(5),findIndex:E(6),filterReject:E(7)},li=w,si=function(r,e){var t=[][r];return!!t&&li(function(){t.call(null,e||function(){throw 1},1)})},ci=ii.forEach,ui=si,vi=ui("forEach"),hi=vi?[].forEach:function(e){return ci(this,e,arguments.length>1?arguments[1]:void 0)},fi=Ge,Xe=hi;fi({target:"Array",proto:!0,forced:[].forEach!=Xe},{forEach:Xe});var bi=g,gi=S,di=function(r,e){return gi(bi[r].prototype[e])},yi=di;yi("Array","forEach");var pi=De,$i=Ne,Si=Object.keys||function(e){return pi(e,$i)},Oi=x,qe=S,Ci=Si,Ii=k,Ti=or.f,mi=qe(Ti),wi=qe([].push),Ze=function(r){return function(e){for(var t=Ii(e),n=Ci(t),a=n.length,v=0,l=[],s;a>v;)s=n[v++],(!Oi||mi(t,s))&&wi(l,r?[s,t[s]]:t[s]);return l}},Ei={entries:Ze(!0),values:Ze(!1)},ji=Ge,xi=Ei.entries;ji({target:"Object",stat:!0},{entries:function(e){return xi(e)}});var Mi=g,Pi=Mi,Ri=Pi;Ri.Object.entries;const B=new A;let Q={linear(r){return r},easeIn(r){return 1-Math.cos(r*3.1415/2)},easeInHard(r){return r*r},easeInHarder(r){return r*r*r},easeOut(r){return Math.sin(r*3.1415/2)},easeOutHard(r){return 1-(1-r)*(1-r)},easeOutHarder(r){return 1-Math.pow(1-r,3)},easeInOut(r){return-(Math.cos(3.1415*r)-1)/2},easeInOutHard(r){return r<.5?2*r*r:1-Math.pow(-2*r+2,2)/2},easeInOutHarder(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}};Q=Object.entries(Q);const _i=function(r){let e=[];for(let t=0;t<10;t++){const n=Math.floor(t*r.length/10);e[t]=r[n]}return e};function Di(r){this.lightVariation=0,this.satVariation=10,this.hsl=B.hexToHsl(r).getValueCollection(),this.colorCollection={dominant:r,combinationCollection:[]};const e=this,t=function(o,i=0,c=100){return o<i?i:o>c?c:o},n=function(o){return o>360?o-360:o<0?o+360:o},a=function(o,i,c=10,u=0,y=0){let b=0;const d=Math.round(c/2);for(let O=1;O<=5;O++)o+(O-1)*i>100?b+=1:o-O*i<0&&(b-=1);const $=b*i+u;let m=[];for(let O=0;O<c;O++){let H;O<d?H=o-(c/2-O)*i-$:H=o+(O-c/2)*i-$,m[O]=Math.round(Q[y][1](H/100)*100)}return m},v=function(o,i=10){const c=e.hueVariation,u=e.hueCurve,y=Math.round(i/2),b=[];for(let d=0;d<i;d++){let p;const $=Q[u][1](d/10)*10,m=c*$;d<y?p=o-c*y+m:p=o+c*($-y),b.push(n(p)+e.hueMove)}return b},l=function(o){o.hue=n(o.hue);const i=B.hslToHex(o).getString(),c=e.colorCollection.combinationCollection;c.push({hex:i,hue:o.hue,light:o.light,saturation:o.saturation}),T();const u=c[c.length-1];u.textSubCombination=f(u.subCombination)},s=function(o,i){const c=a(o.light,e.lightVariation,e.count,e.lightMove,e.lightCurve),u=a(o.saturation,e.satVariation,e.count,e.satMove,e.satCurve),y=v(o.hue,e.count);let b=[];for(let d=0;d<e.count;d++)b[d]={hue:y[d]||o.hue,light:c[d],saturation:i?0:u[d],hex:B.hslToHex({hue:y[d]||o.hue,light:t(c[d]),saturation:i?0:t(u[d])},i).getString()};return e.full?_i(b):b},h=function(o,i,c,u){let y=0,b=50;return u==="light"&&(b=60),u==="light"&&i.hue>=200&&i.hue<=300&&(b=75),Math.abs(i[u]-c[u])>o?y=c[u]:i[u]<b?y=i[u]+o>100?100:i[u]+o:y=i[u]-o<0?0:i[u]-o,y},f=function(o){Math.round(o.length/2);const i=[...o].reverse(),c=[];return o.forEach((u,y)=>{const b=h(e.textLight,u,i[y],"light"),d=h(e.textSaturation,u,i[y],"saturation"),p={hue:i[y].hue,saturation:d,light:b},$=B.hslToHex(p).getString();p.hex=$,c.push(p)}),c},T=function(){const o=e.colorCollection.combinationCollection,i=o[o.length-1];i.subCombination=s(i)};this.updateColor=function(o){return this.colorCollection.dominant=o,o.hue?this.hsl=o:this.hsl=B.hexToHsl(o).getValueCollection(),this},this.combination=function(){const o=this.hsl;return o.hue=this.hsl.hue+180,l(o),this.colorCollection},this.splitCombination=function(){const o=this.hsl.hue,i=this.hsl,c=30;return i.hue=this.hsl.hue+(180+c),l(i),i.hue=o,i.hue=this.hsl.hue+(180-c),l(i),this.colorCollection},this.generate=function(o=[],{count:i=10,text:{light:c=50,saturation:u=0,hue:y=0}={},hue:{variation:b=0,curve:d=0,move:p=0}={},light:{variation:$=5,move:m=0,curve:O=0}={},saturation:{variation:H=0,move:Ni=0,curve:Fi=0}={},full:Ai=!0}={}){this.count=parseInt(i,10),this.hueVariation=parseInt(b,10),this.hueCurve=parseInt(d,10),this.hueMove=parseInt(p,10),this.satVariation=parseInt(H,10),this.satMove=parseInt(Ni,10),this.satCurve=parseInt(Fi,10),this.lightVariation=parseInt($,10),this.lightMove=parseInt(m,10),this.lightCurve=parseInt(O,10),this.full=Ai,this.textLight=parseInt(c,10),this.textSaturation=parseInt(u,10),this.textHue=parseInt(y,10),this.colorCollection.dominantSubCollection=s(this.hsl),this.colorCollection.dominantTextSubCollection=f(this.colorCollection.dominantSubCollection),this.colorCollection.combinationCollection=[],o.forEach(_=>{const Dr=_.saturation!==void 0?_.saturation:this.hsl.saturation,Gi=_.light!==void 0?_.light:this.hsl.light,Li={hue:this.hsl.hue+_.hueVariation,saturation:Dr,light:Gi};l(Li)}),this.colorCollection.graySubCollection=s({hue:this.hsl.hue,saturation:0,light:this.hsl.light},!0),this.colorCollection.grayTextSubCollection=f(this.colorCollection.graySubCollection);const rr=(()=>{const _=Math.round(this.hsl.hue/60),Dr=60*_;return Math.round((this.hsl.hue-Dr)/2)})();return this.colorCollection.alertSubCollection=s({hue:0+rr,saturation:this.hsl.saturation,light:this.hsl.light}),this.colorCollection.alertTextSubCollection=f(this.colorCollection.alertSubCollection),this.colorCollection.warningSubCollection=s({hue:60+rr,saturation:this.hsl.saturation,light:this.hsl.light}),this.colorCollection.warningTextSubCollection=f(this.colorCollection.warningSubCollection),this.colorCollection.successSubCollection=s({hue:120+rr*2,saturation:this.hsl.saturation,light:this.hsl.light}),this.colorCollection.successTextSubCollection=f(this.colorCollection.successSubCollection),this.colorCollection.infoSubCollection=s({hue:240+rr,saturation:this.hsl.saturation,light:this.hsl.light}),this.colorCollection.infoTextSubCollection=f(this.colorCollection.infoSubCollection),this.colorCollection}}j.generateColorSet=Di,Object.defineProperty(j,"__esModule",{value:!0}),j[Symbol.toStringTag]="Module"});
