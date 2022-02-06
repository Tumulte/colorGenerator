(function(x,G){typeof exports=="object"&&typeof module!="undefined"?G(exports):typeof define=="function"&&define.amd?define(["exports"],G):(x=typeof globalThis!="undefined"?globalThis:x||self,G(x.colorGenerator={}))})(this,function(x){"use strict";function G(){this.colorToObject=function(t){return typeof t!="string"?t:this.getValueCollection(t)};const r=function(t){return parseInt(t,16)},e=function(t){let n=t.toString(16);return n.length===1&&(n=`0${n}`),n.toUpperCase()};this.hexToRgb=function(t){if(this.color=t,this.color.red!==void 0)return this;let n=this.color.replace("#","");n.length===3&&(n=n.split("").map(function(i){return`${i+i}`}).join(""));const o=r(n.substring(0,2)),u=r(n.substring(2,4)),l=r(n.substring(4,6));return this.color={red:o,green:u,blue:l},this},this.rgbToHex=function(t){if(this.color=this.colorToObject(t),typeof this.color.red!="undefined")this.color=`#${e(this.color.red)}${e(this.color.green)}${e(this.color.blue)}`;else throw new Error('The rgbToHex method require a "{red: XXX, green: YYY, blue: ZZZ}" object as input value');return this},this.rgbToHsl=function(t){this.color=this.colorToObject(t);const n=[this.color.red/255,this.color.green/255,this.color.blue/255];n.sort(function(T,a){return T-a});const o=n[0],u=n[1],l=n[2],i=Math.round((o+l)*100/2);if(l===o&&u===o)return this.color={light:i,saturation:0,hue:0},this;let h;i>50?h=(l-o)/(2-l-o):h=(l-o)/(l+o),h=Math.round(h*100);let f;return l===this.color.red/255?f=(this.color.green-this.color.blue)/255/(l-o):l===this.color.green/255?f=2+(this.color.blue-this.color.red)/255/(l-o):f=4+(this.color.red-this.color.green)/255/(l-o),f<0?f=Math.round(f*60)+360:f=Math.round(f*60),this.color={light:i,saturation:h,hue:f},this},this.hslToRgb=function(t){this.color=this.colorToObject(t);const n=this.color.light/100,o=this.color.saturation/100,u=this.color.hue/360;if(this.color.saturation===0){const s=Math.round(n*255);return this.color={red:s,green:s,blue:s},this}let l;n<.5?l=n*(1+o):l=n+o-n*o;const i=2*n-l,h=function(s,v,c){return c<0?c+=1:c>1&&(c-=1),c<1/6?s+(v-s)*6*c:c<1/2?v:c<2/3?s+(v-s)*(2/3-c)*6:s},f=h(i,l,u+1/3),T=h(i,l,u),a=h(i,l,u-1/3);return this.color={red:Math.round(f*255),green:Math.round(T*255),blue:Math.round(a*255)},this},this.hexToHsl=function(t){return t=this.hexToRgb(t).getValueCollection(),t=this.rgbToHsl(t).getValueCollection(),this.color=t,this},this.hslToHex=function(t){return t=this.hslToRgb(t).getValueCollection(),t=this.rgbToHex(t).getValueCollection(),this.color=t,this},this.getString=function(t){if(t&&(this.color=t),typeof this.color=="string")return this.color;if(this.color.red!==void 0)return`rgb(${this.color.red},${this.color.green},${this.color.blue})`;if(this.color.hue!==void 0)return`hsl(${this.color.hue},${this.color.saturation}%,${this.color.light}%)`;if(this.color.hexred!==void 0)return`#${this.color.hexred}${this.color.hexgreen}${this.color.hexblue}`;throw new Error('The getString method only takes Objects with the following keys : "hue, saturation, light" (with HSL values) - "hexblue, hexgreen, hexred" (with Hexadecimal RGB), "red, green, blue" (with base 256 RGB)')},this.getValueCollection=function(t){typeof t!="undefined"&&(this.color=t);const n=new RegExp(/^#([0-9a-f]{3}){1,2}$/i);if(typeof this.color=="object")return this.color;if(this.color.indexOf("rgb(")>-1){let o=this.color.split("(")[1].split(" ");return{red:parseInt(o[0]),green:parseInt(o[1]),blue:parseInt(o[2])}}else if(this.color.indexOf("hsl(")>-1){const o=this.color.split("(")[1].split(" ");return{hue:parseInt(o[0]),saturation:parseInt(o[1]),light:parseInt(o[2])}}else if(n.test(this.color)){const o=this.color;return{hexred:o.substring(1,3),hexgreen:o.substring(3,5),hexblue:o.substring(5,7)}}}}var Nr=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},K=function(r){return r&&r.Math==Math&&r},b=K(typeof globalThis=="object"&&globalThis)||K(typeof window=="object"&&window)||K(typeof self=="object"&&self)||K(typeof Nr=="object"&&Nr)||function(){return this}()||Function("return this")(),er={},E=function(r){try{return!!r()}catch{return!0}},Je=E,M=!Je(function(){return Object.defineProperty({},1,{get:function(){return 7}})[1]!=7}),Ye=E,tr=!Ye(function(){var r=function(){}.bind();return typeof r!="function"||r.hasOwnProperty("prototype")}),Qe=tr,U=Function.prototype.call,nr=Qe?U.bind(U):function(){return U.apply(U,arguments)},or={},Fr={}.propertyIsEnumerable,Ar=Object.getOwnPropertyDescriptor,rt=Ar&&!Fr.call({1:2},1);or.f=rt?function(e){var t=Ar(this,e);return!!t&&t.enumerable}:Fr;var Gr=function(r,e){return{enumerable:!(r&1),configurable:!(r&2),writable:!(r&4),value:e}},Lr=tr,Vr=Function.prototype,et=Vr.bind,ar=Vr.call,tt=Lr&&et.bind(ar,ar),S=Lr?function(r){return r&&tt(r)}:function(r){return r&&function(){return ar.apply(r,arguments)}},Br=S,nt=Br({}.toString),ot=Br("".slice),ir=function(r){return ot(nt(r),8,-1)},at=b,it=S,lt=E,st=ir,lr=at.Object,ct=it("".split),Hr=lt(function(){return!lr("z").propertyIsEnumerable(0)})?function(r){return st(r)=="String"?ct(r,""):lr(r)}:lr,ut=b,vt=ut.TypeError,Kr=function(r){if(r==null)throw vt("Can't call method on "+r);return r},ht=Hr,ft=Kr,k=function(r){return ht(ft(r))},C=function(r){return typeof r=="function"},gt=C,N=function(r){return typeof r=="object"?r!==null:gt(r)},sr=b,bt=C,dt=function(r){return bt(r)?r:void 0},z=function(r,e){return arguments.length<2?dt(sr[r]):sr[r]&&sr[r][e]},yt=S,pt=yt({}.isPrototypeOf),$t=z,St=$t("navigator","userAgent")||"",Ur=b,cr=St,kr=Ur.process,zr=Ur.Deno,Wr=kr&&kr.versions||zr&&zr.version,Xr=Wr&&Wr.v8,I,W;Xr&&(I=Xr.split("."),W=I[0]>0&&I[0]<4?1:+(I[0]+I[1])),!W&&cr&&(I=cr.match(/Edge\/(\d+)/),(!I||I[1]>=74)&&(I=cr.match(/Chrome\/(\d+)/),I&&(W=+I[1])));var Ot=W,qr=Ot,Ct=E,Zr=!!Object.getOwnPropertySymbols&&!Ct(function(){var r=Symbol();return!String(r)||!(Object(r)instanceof Symbol)||!Symbol.sham&&qr&&qr<41}),It=Zr,Jr=It&&!Symbol.sham&&typeof Symbol.iterator=="symbol",Tt=b,mt=z,wt=C,Et=pt,jt=Jr,xt=Tt.Object,Yr=jt?function(r){return typeof r=="symbol"}:function(r){var e=mt("Symbol");return wt(e)&&Et(e.prototype,xt(r))},Mt=b,Pt=Mt.String,Rt=function(r){try{return Pt(r)}catch{return"Object"}},_t=b,Dt=C,Nt=Rt,Ft=_t.TypeError,Qr=function(r){if(Dt(r))return r;throw Ft(Nt(r)+" is not a function")},At=Qr,Gt=function(r,e){var t=r[e];return t==null?void 0:At(t)},Lt=b,ur=nr,vr=C,hr=N,Vt=Lt.TypeError,Bt=function(r,e){var t,n;if(e==="string"&&vr(t=r.toString)&&!hr(n=ur(t,r))||vr(t=r.valueOf)&&!hr(n=ur(t,r))||e!=="string"&&vr(t=r.toString)&&!hr(n=ur(t,r)))return n;throw Vt("Can't convert object to primitive value")},fr={exports:{}},re=b,Ht=Object.defineProperty,gr=function(r,e){try{Ht(re,r,{value:e,configurable:!0,writable:!0})}catch{re[r]=e}return e},Kt=b,Ut=gr,ee="__core-js_shared__",kt=Kt[ee]||Ut(ee,{}),br=kt,te=br;(fr.exports=function(r,e){return te[r]||(te[r]=e!==void 0?e:{})})("versions",[]).push({version:"3.20.3",mode:"global",copyright:"\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.20.3/LICENSE",source:"https://github.com/zloirock/core-js"});var zt=b,Wt=Kr,Xt=zt.Object,ne=function(r){return Xt(Wt(r))},qt=S,Zt=ne,Jt=qt({}.hasOwnProperty),P=Object.hasOwn||function(e,t){return Jt(Zt(e),t)},Yt=S,Qt=0,rn=Math.random(),en=Yt(1 .toString),oe=function(r){return"Symbol("+(r===void 0?"":r)+")_"+en(++Qt+rn,36)},tn=b,nn=fr.exports,ae=P,on=oe,ie=Zr,le=Jr,F=nn("wks"),R=tn.Symbol,se=R&&R.for,an=le?R:R&&R.withoutSetter||on,X=function(r){if(!ae(F,r)||!(ie||typeof F[r]=="string")){var e="Symbol."+r;ie&&ae(R,r)?F[r]=R[r]:le&&se?F[r]=se(e):F[r]=an(e)}return F[r]},ln=b,sn=nr,ce=N,ue=Yr,cn=Gt,un=Bt,vn=X,hn=ln.TypeError,fn=vn("toPrimitive"),gn=function(r,e){if(!ce(r)||ue(r))return r;var t=cn(r,fn),n;if(t){if(e===void 0&&(e="default"),n=sn(t,r,e),!ce(n)||ue(n))return n;throw hn("Can't convert object to primitive value")}return e===void 0&&(e="number"),un(r,e)},bn=gn,dn=Yr,ve=function(r){var e=bn(r,"string");return dn(e)?e:e+""},yn=b,he=N,dr=yn.document,pn=he(dr)&&he(dr.createElement),$n=function(r){return pn?dr.createElement(r):{}},Sn=M,On=E,Cn=$n,fe=!Sn&&!On(function(){return Object.defineProperty(Cn("div"),"a",{get:function(){return 7}}).a!=7}),In=M,Tn=nr,mn=or,wn=Gr,En=k,jn=ve,xn=P,Mn=fe,ge=Object.getOwnPropertyDescriptor;er.f=In?ge:function(e,t){if(e=En(e),t=jn(t),Mn)try{return ge(e,t)}catch{}if(xn(e,t))return wn(!Tn(mn.f,e,t),e[t])};var yr={},Pn=M,Rn=E,_n=Pn&&Rn(function(){return Object.defineProperty(function(){},"prototype",{value:42,writable:!1}).prototype!=42}),be=b,Dn=N,Nn=be.String,Fn=be.TypeError,de=function(r){if(Dn(r))return r;throw Fn(Nn(r)+" is not an object")},An=b,Gn=M,Ln=fe,Vn=_n,q=de,ye=ve,Bn=An.TypeError,pr=Object.defineProperty,Hn=Object.getOwnPropertyDescriptor,$r="enumerable",Sr="configurable",Or="writable";yr.f=Gn?Vn?function(e,t,n){if(q(e),t=ye(t),q(n),typeof e=="function"&&t==="prototype"&&"value"in n&&Or in n&&!n[Or]){var o=Hn(e,t);o&&o[Or]&&(e[t]=n.value,n={configurable:Sr in n?n[Sr]:o[Sr],enumerable:$r in n?n[$r]:o[$r],writable:!1})}return pr(e,t,n)}:pr:function(e,t,n){if(q(e),t=ye(t),q(n),Ln)try{return pr(e,t,n)}catch{}if("get"in n||"set"in n)throw Bn("Accessors not supported");return"value"in n&&(e[t]=n.value),e};var Kn=M,Un=yr,kn=Gr,Cr=Kn?function(r,e,t){return Un.f(r,e,kn(1,t))}:function(r,e,t){return r[e]=t,r},pe={exports:{}},zn=S,Wn=C,Ir=br,Xn=zn(Function.toString);Wn(Ir.inspectSource)||(Ir.inspectSource=function(r){return Xn(r)});var Tr=Ir.inspectSource,qn=b,Zn=C,Jn=Tr,$e=qn.WeakMap,Yn=Zn($e)&&/native code/.test(Jn($e)),Qn=fr.exports,ro=oe,Se=Qn("keys"),eo=function(r){return Se[r]||(Se[r]=ro(r))},Oe={},to=Yn,Ce=b,mr=S,no=N,oo=Cr,wr=P,Er=br,ao=eo,io=Oe,Ie="Object already initialized",jr=Ce.TypeError,lo=Ce.WeakMap,Z,L,J,so=function(r){return J(r)?L(r):Z(r,{})},co=function(r){return function(e){var t;if(!no(e)||(t=L(e)).type!==r)throw jr("Incompatible receiver, "+r+" required");return t}};if(to||Er.state){var _=Er.state||(Er.state=new lo),uo=mr(_.get),Te=mr(_.has),vo=mr(_.set);Z=function(r,e){if(Te(_,r))throw new jr(Ie);return e.facade=r,vo(_,r,e),e},L=function(r){return uo(_,r)||{}},J=function(r){return Te(_,r)}}else{var A=ao("state");io[A]=!0,Z=function(r,e){if(wr(r,A))throw new jr(Ie);return e.facade=r,oo(r,A,e),e},L=function(r){return wr(r,A)?r[A]:{}},J=function(r){return wr(r,A)}}var ho={set:Z,get:L,has:J,enforce:so,getterFor:co},xr=M,fo=P,me=Function.prototype,go=xr&&Object.getOwnPropertyDescriptor,Mr=fo(me,"name"),bo=Mr&&function(){}.name==="something",yo=Mr&&(!xr||xr&&go(me,"name").configurable),po={EXISTS:Mr,PROPER:bo,CONFIGURABLE:yo},$o=b,we=C,So=P,Ee=Cr,Oo=gr,Co=Tr,je=ho,Io=po.CONFIGURABLE,To=je.get,mo=je.enforce,wo=String(String).split("String");(pe.exports=function(r,e,t,n){var o=n?!!n.unsafe:!1,u=n?!!n.enumerable:!1,l=n?!!n.noTargetGet:!1,i=n&&n.name!==void 0?n.name:e,h;if(we(t)&&(String(i).slice(0,7)==="Symbol("&&(i="["+String(i).replace(/^Symbol\(([^)]*)\)/,"$1")+"]"),(!So(t,"name")||Io&&t.name!==i)&&Ee(t,"name",i),h=mo(t),h.source||(h.source=wo.join(typeof i=="string"?i:""))),r===$o){u?r[e]=t:Oo(e,t);return}else o?!l&&r[e]&&(u=!0):delete r[e];u?r[e]=t:Ee(r,e,t)})(Function.prototype,"toString",function(){return we(this)&&To(this).source||Co(this)});var xe={},Eo=Math.ceil,jo=Math.floor,Me=function(r){var e=+r;return e!==e||e===0?0:(e>0?jo:Eo)(e)},xo=Me,Mo=Math.max,Po=Math.min,Ro=function(r,e){var t=xo(r);return t<0?Mo(t+e,0):Po(t,e)},_o=Me,Do=Math.min,No=function(r){return r>0?Do(_o(r),9007199254740991):0},Fo=No,Pe=function(r){return Fo(r.length)},Ao=k,Go=Ro,Lo=Pe,Re=function(r){return function(e,t,n){var o=Ao(e),u=Lo(o),l=Go(n,u),i;if(r&&t!=t){for(;u>l;)if(i=o[l++],i!=i)return!0}else for(;u>l;l++)if((r||l in o)&&o[l]===t)return r||l||0;return!r&&-1}},Vo={includes:Re(!0),indexOf:Re(!1)},Bo=S,Pr=P,Ho=k,Ko=Vo.indexOf,Uo=Oe,_e=Bo([].push),De=function(r,e){var t=Ho(r),n=0,o=[],u;for(u in t)!Pr(Uo,u)&&Pr(t,u)&&_e(o,u);for(;e.length>n;)Pr(t,u=e[n++])&&(~Ko(o,u)||_e(o,u));return o},Ne=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],ko=De,zo=Ne,Wo=zo.concat("length","prototype");xe.f=Object.getOwnPropertyNames||function(e){return ko(e,Wo)};var Fe={};Fe.f=Object.getOwnPropertySymbols;var Xo=z,qo=S,Zo=xe,Jo=Fe,Yo=de,Qo=qo([].concat),ra=Xo("Reflect","ownKeys")||function(e){var t=Zo.f(Yo(e)),n=Jo.f;return n?Qo(t,n(e)):t},Ae=P,ea=ra,ta=er,na=yr,oa=function(r,e,t){for(var n=ea(e),o=na.f,u=ta.f,l=0;l<n.length;l++){var i=n[l];!Ae(r,i)&&!(t&&Ae(t,i))&&o(r,i,u(e,i))}},aa=E,ia=C,la=/#|\.prototype\./,V=function(r,e){var t=ca[sa(r)];return t==va?!0:t==ua?!1:ia(e)?aa(e):!!e},sa=V.normalize=function(r){return String(r).replace(la,".").toLowerCase()},ca=V.data={},ua=V.NATIVE="N",va=V.POLYFILL="P",ha=V,Rr=b,fa=er.f,ga=Cr,ba=pe.exports,da=gr,ya=oa,pa=ha,Ge=function(r,e){var t=r.target,n=r.global,o=r.stat,u,l,i,h,f,T;if(n?l=Rr:o?l=Rr[t]||da(t,{}):l=(Rr[t]||{}).prototype,l)for(i in e){if(f=e[i],r.noTargetGet?(T=fa(l,i),h=T&&T.value):h=l[i],u=pa(n?i:t+(o?".":"#")+i,r.forced),!u&&h!==void 0){if(typeof f==typeof h)continue;ya(f,h)}(r.sham||h&&h.sham)&&ga(f,"sham",!0),ba(l,i,f,r)}},Le=S,$a=Qr,Sa=tr,Oa=Le(Le.bind),Ca=function(r,e){return $a(r),e===void 0?r:Sa?Oa(r,e):function(){return r.apply(e,arguments)}},Ia=ir,Ta=Array.isArray||function(e){return Ia(e)=="Array"},ma=X,wa=ma("toStringTag"),Ve={};Ve[wa]="z";var Ea=String(Ve)==="[object z]",ja=b,xa=Ea,Ma=C,Y=ir,Pa=X,Ra=Pa("toStringTag"),_a=ja.Object,Da=Y(function(){return arguments}())=="Arguments",Na=function(r,e){try{return r[e]}catch{}},Fa=xa?Y:function(r){var e,t,n;return r===void 0?"Undefined":r===null?"Null":typeof(t=Na(e=_a(r),Ra))=="string"?t:Da?Y(e):(n=Y(e))=="Object"&&Ma(e.callee)?"Arguments":n},Aa=S,Ga=E,Be=C,La=Fa,Va=z,Ba=Tr,He=function(){},Ha=[],Ke=Va("Reflect","construct"),_r=/^\s*(?:class|function)\b/,Ka=Aa(_r.exec),Ua=!_r.exec(He),B=function(e){if(!Be(e))return!1;try{return Ke(He,Ha,e),!0}catch{return!1}},Ue=function(e){if(!Be(e))return!1;switch(La(e)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return Ua||!!Ka(_r,Ba(e))}catch{return!0}};Ue.sham=!0;var ka=!Ke||Ga(function(){var r;return B(B.call)||!B(Object)||!B(function(){r=!0})||r})?Ue:B,za=b,ke=Ta,Wa=ka,Xa=N,qa=X,Za=qa("species"),ze=za.Array,Ja=function(r){var e;return ke(r)&&(e=r.constructor,Wa(e)&&(e===ze||ke(e.prototype))?e=void 0:Xa(e)&&(e=e[Za],e===null&&(e=void 0))),e===void 0?ze:e},Ya=Ja,Qa=function(r,e){return new(Ya(r))(e===0?0:e)},ri=Ca,ei=S,ti=Hr,ni=ne,oi=Pe,ai=Qa,We=ei([].push),j=function(r){var e=r==1,t=r==2,n=r==3,o=r==4,u=r==6,l=r==7,i=r==5||u;return function(h,f,T,a){for(var s=ni(h),v=ti(s),c=ri(f,T),y=oi(v),g=0,d=a||ai,p=e?d(h,y):t||l?d(h,0):void 0,$,w;y>g;g++)if((i||g in v)&&($=v[g],w=c($,g,s),r))if(e)p[g]=w;else if(w)switch(r){case 3:return!0;case 5:return $;case 6:return g;case 2:We(p,$)}else switch(r){case 4:return!1;case 7:We(p,$)}return u?-1:n||o?o:p}},ii={forEach:j(0),map:j(1),filter:j(2),some:j(3),every:j(4),find:j(5),findIndex:j(6),filterReject:j(7)},li=E,si=function(r,e){var t=[][r];return!!t&&li(function(){t.call(null,e||function(){throw 1},1)})},ci=ii.forEach,ui=si,vi=ui("forEach"),hi=vi?[].forEach:function(e){return ci(this,e,arguments.length>1?arguments[1]:void 0)},fi=Ge,Xe=hi;fi({target:"Array",proto:!0,forced:[].forEach!=Xe},{forEach:Xe});var gi=b,bi=S,di=function(r,e){return bi(gi[r].prototype[e])},yi=di;yi("Array","forEach");var pi=De,$i=Ne,Si=Object.keys||function(e){return pi(e,$i)},Oi=M,qe=S,Ci=Si,Ii=k,Ti=or.f,mi=qe(Ti),wi=qe([].push),Ze=function(r){return function(e){for(var t=Ii(e),n=Ci(t),o=n.length,u=0,l=[],i;o>u;)i=n[u++],(!Oi||mi(t,i))&&wi(l,r?[i,t[i]]:t[i]);return l}},Ei={entries:Ze(!0),values:Ze(!1)},ji=Ge,xi=Ei.entries;ji({target:"Object",stat:!0},{entries:function(e){return xi(e)}});var Mi=b,Pi=Mi,Ri=Pi;Ri.Object.entries;const H=new G;let Q={linear(r){return r},easeIn(r){return 1-Math.cos(r*3.1415/2)},easeInHard(r){return r*r},easeInHarder(r){return r*r*r},easeOut(r){return Math.sin(r*3.1415/2)},easeOutHard(r){return 1-(1-r)*(1-r)},easeOutHarder(r){return 1-Math.pow(1-r,3)},easeInOut(r){return-(Math.cos(3.1415*r)-1)/2},easeInOutHard(r){return r<.5?2*r*r:1-Math.pow(-2*r+2,2)/2},easeInOutHarder(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}};Q=Object.entries(Q);const _i=function(r){let e=[];for(let t=0;t<10;t++){const n=Math.floor(t*r.length/10);e[t]=r[n]}return e};function Di(r){this.lightVariation=0,this.satVariation=10,this.hsl=H.hexToHsl(r).getValueCollection(),this.colorCollection={dominant:r,combinationCollection:[]};const e=this,t=function(a,s=0,v=100){return a<s?s:a>v?v:a},n=function(a){return a>360?a-360:a<0?a+360:a},o=function(a,s,v=10,c=0,y=0){let g=0;const d=Math.round(v/2);for(let O=1;O<=5;O++)a+(O-1)*s>100?g+=1:a-O*s<0&&(g-=1);const $=g*s+c;let w=[];for(let O=0;O<v;O++){let m;O<d?m=a-(v/2-O)*s-$:m=a+(O-v/2)*s-$,m=Math.round(Q[y][1](m/100)*100),m=Math.max(m,0),m=Math.min(m,100),w[O]=m}return w},u=function(a,s=10){const v=e.hueVariation,c=e.hueCurve,y=Math.round(s/2),g=[];for(let d=0;d<s;d++){let p;const $=Q[c][1](d/10)*10,w=v*$;d<y?p=a-v*y+w:p=a+v*($-y),g.push(n(p)+e.hueMove)}return g},l=function(a){a.hue=n(a.hue);const s=H.hslToHex(a).getString(),v=e.colorCollection.combinationCollection;v.push({hex:s,hue:a.hue,light:a.light,saturation:a.saturation}),T();const c=v[v.length-1];c.textSubCombination=f(c.subCombination)},i=function(a,s){const v=o(a.light,e.lightVariation,e.count,e.lightMove,e.lightCurve),c=o(a.saturation,e.satVariation,e.count,e.satMove,e.satCurve),y=u(a.hue,e.count);let g=[];for(let d=0;d<e.count;d++)g[d]={hue:y[d]||a.hue,light:v[d],saturation:s?0:c[d],hex:H.hslToHex({hue:y[d]||a.hue,light:t(v[d]),saturation:s?0:t(c[d])},s).getString()};return e.full?_i(g):g},h=function(a,s,v,c){let y=0,g=50;return c==="light"&&(g=60),c==="light"&&s.hue>=200&&s.hue<=300&&(g=75),Math.abs(s[c]-v[c])>a?y=v[c]:s[c]<g?y=s[c]+a>100?100:s[c]+a:y=s[c]-a<0?0:s[c]-a,y},f=function(a){Math.round(a.length/2);const s=[...a].reverse(),v=[];return a.forEach((c,y)=>{const g=h(e.textLight,c,s[y],"light"),d=h(e.textSaturation,c,s[y],"saturation"),p={hue:s[y].hue,saturation:d,light:g},$=H.hslToHex(p).getString();p.hex=$,v.push(p)}),v},T=function(){const a=e.colorCollection.combinationCollection,s=a[a.length-1];s.subCombination=i(s)};this.updateColor=function(a){return this.colorCollection.dominant=a,a.hue!==void 0?this.hsl=a:this.hsl=H.hexToHsl(a).getValueCollection(),this},this.generate=function(a=[],{count:s=10,text:{light:v=50,saturation:c=0,hue:y=0}={},hue:{variation:g=0,curve:d=0,move:p=0}={},light:{variation:$=5,move:w=0,curve:O=0}={},saturation:{variation:m=0,move:Ni=0,curve:Fi=0}={},full:Ai=!0}={}){this.count=parseInt(s,10),this.hueVariation=parseInt(g,10),this.hueCurve=parseInt(d,10),this.hueMove=parseInt(p,10),this.satVariation=parseInt(m,10),this.satMove=parseInt(Ni,10),this.satCurve=parseInt(Fi,10),this.lightVariation=parseInt($,10),this.lightMove=parseInt(w,10),this.lightCurve=parseInt(O,10),this.full=Ai,this.textLight=parseInt(v,10),this.textSaturation=parseInt(c,10),this.textHue=parseInt(y,10),this.colorCollection.dominantSubCollection=i(this.hsl),this.colorCollection.dominantTextSubCollection=f(this.colorCollection.dominantSubCollection),this.colorCollection.combinationCollection=[],a.forEach(D=>{const Dr=D.saturation!==void 0?D.saturation:this.hsl.saturation,Gi=D.light!==void 0?D.light:this.hsl.light,Li={hue:this.hsl.hue+D.hueVariation,saturation:Dr,light:Gi};l(Li)}),this.colorCollection.graySubCollection=i({hue:this.hsl.hue,saturation:0,light:this.hsl.light},!0),this.colorCollection.grayTextSubCollection=f(this.colorCollection.graySubCollection);const rr=(()=>{const D=Math.round(this.hsl.hue/60),Dr=60*D;return Math.round((this.hsl.hue-Dr)/2)})();return this.colorCollection.alertSubCollection=i({hue:0+rr,saturation:this.hsl.saturation,light:this.hsl.light}),this.colorCollection.alertTextSubCollection=f(this.colorCollection.alertSubCollection),this.colorCollection.warningSubCollection=i({hue:60+rr,saturation:this.hsl.saturation,light:this.hsl.light}),this.colorCollection.warningTextSubCollection=f(this.colorCollection.warningSubCollection),this.colorCollection.successSubCollection=i({hue:120+rr*2,saturation:this.hsl.saturation,light:this.hsl.light}),this.colorCollection.successTextSubCollection=f(this.colorCollection.successSubCollection),this.colorCollection.infoSubCollection=i({hue:240+rr,saturation:this.hsl.saturation,light:this.hsl.light}),this.colorCollection.infoTextSubCollection=f(this.colorCollection.infoSubCollection),this.colorCollection}}x.generateColorSet=Di,Object.defineProperty(x,"__esModule",{value:!0}),x[Symbol.toStringTag]="Module"});
