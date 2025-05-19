/* esm.sh - yaml@2.8.0/browser/dist/stringify/stringifyString */
import{Scalar as g}from"../nodes/Scalar.mjs";import{foldFlowLines as D,FOLD_FLOW as U,FOLD_QUOTED as A,FOLD_BLOCK as I}from"./foldFlowLines.mjs";var y=(s,e)=>({indentAtStart:e?s.indent.length:s.indentAtStart,lineWidth:s.options.lineWidth,minContentWidth:s.options.minContentWidth}),F=s=>/^(%|---|\.\.\.)/m.test(s);function P(s,e,n){if(!e||e<0)return!1;let r=e-n,c=s.length;if(c<=r)return!1;for(let l=0,t=0;l<c;++l)if(s[l]===`
`){if(l-t>r)return!0;if(t=l+1,c-t<=r)return!1}return!0}function S(s,e){let n=JSON.stringify(s);if(e.options.doubleQuotedAsJSON)return n;let{implicitKey:r}=e,c=e.options.doubleQuotedMinMultiLineLength,l=e.indent||(F(s)?"  ":""),t="",f=0;for(let i=0,o=n[i];o;o=n[++i])if(o===" "&&n[i+1]==="\\"&&n[i+2]==="n"&&(t+=n.slice(f,i)+"\\ ",i+=1,f=i,o="\\"),o==="\\")switch(n[i+1]){case"u":{t+=n.slice(f,i);let u=n.substr(i+2,4);switch(u){case"0000":t+="\\0";break;case"0007":t+="\\a";break;case"000b":t+="\\v";break;case"001b":t+="\\e";break;case"0085":t+="\\N";break;case"00a0":t+="\\_";break;case"2028":t+="\\L";break;case"2029":t+="\\P";break;default:u.substr(0,2)==="00"?t+="\\x"+u.substr(2):t+=n.substr(i,6)}i+=5,f=i+1}break;case"n":if(r||n[i+2]==='"'||n.length<c)i+=1;else{for(t+=n.slice(f,i)+`

`;n[i+2]==="\\"&&n[i+3]==="n"&&n[i+4]!=='"';)t+=`
`,i+=2;t+=l,n[i+2]===" "&&(t+="\\"),i+=1,f=i+1}break;default:i+=1}return t=f?t+n.slice(f):n,r?t:D(t,l,A,y(e,!1))}function Q(s,e){if(e.options.singleQuote===!1||e.implicitKey&&s.includes(`
`)||/[ \t]\n|\n[ \t]/.test(s))return S(s,e);let n=e.indent||(F(s)?"  ":""),r="'"+s.replace(/'/g,"''").replace(/\n+/g,`$&
${n}`)+"'";return e.implicitKey?r:D(r,n,U,y(e,!1))}function h(s,e){let{singleQuote:n}=e.options,r;if(n===!1)r=S;else{let c=s.includes('"'),l=s.includes("'");c&&!l?r=Q:l&&!c?r=S:r=n?Q:S}return r(s,e)}var B;try{B=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{B=/\n+(?!\n|$)/g}function E({comment:s,type:e,value:n},r,c,l){let{blockQuote:t,commentString:f,lineWidth:i}=r.options;if(!t||/\n[\t ]+$/.test(n)||/^\s*$/.test(n))return h(n,r);let o=r.indent||(r.forceBlockIndent||F(n)?"  ":""),u=t==="literal"?!0:t==="folded"||e===g.BLOCK_FOLDED?!1:e===g.BLOCK_LITERAL?!0:!P(n,i,o.length);if(!n)return u?`|
`:`>
`;let $,d;for(d=n.length;d>0;--d){let b=n[d-1];if(b!==`
`&&b!=="	"&&b!==" ")break}let a=n.substring(d),k=a.indexOf(`
`);k===-1?$="-":n===a||k!==a.length-1?($="+",l&&l()):$="",a&&(n=n.slice(0,-a.length),a[a.length-1]===`
`&&(a=a.slice(0,-1)),a=a.replace(B,`$&${o}`));let L=!1,p,_=-1;for(p=0;p<n.length;++p){let b=n[p];if(b===" ")L=!0;else if(b===`
`)_=p;else break}let O=n.substring(0,_<p?_+1:p);O&&(n=n.substring(O.length),O=O.replace(/\n+/g,`$&${o}`));let w=(L?o?"2":"1":"")+$;if(s&&(w+=" "+f(s.replace(/ ?[\r\n]+/g," ")),c&&c()),!u){let b=n.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${o}`),N=!1,T=y(r,!0);t!=="folded"&&e!==g.BLOCK_FOLDED&&(T.onOverflow=()=>{N=!0});let K=D(`${O}${b}${a}`,o,I,T);if(!N)return`>${w}
${o}${K}`}return n=n.replace(/\n+/g,`$&${o}`),`|${w}
${o}${O}${n}${a}`}function W(s,e,n,r){let{type:c,value:l}=s,{actualString:t,implicitKey:f,indent:i,indentStep:o,inFlow:u}=e;if(f&&l.includes(`
`)||u&&/[[\]{},]/.test(l))return h(l,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(l))return f||u||!l.includes(`
`)?h(l,e):E(s,e,n,r);if(!f&&!u&&c!==g.PLAIN&&l.includes(`
`))return E(s,e,n,r);if(F(l)){if(i==="")return e.forceBlockIndent=!0,E(s,e,n,r);if(f&&i===o)return h(l,e)}let $=l.replace(/\n+/g,`$&
${i}`);if(t){let d=L=>L.default&&L.tag!=="tag:yaml.org,2002:str"&&L.test?.test($),{compat:a,tags:k}=e.doc.schema;if(k.some(d)||a?.some(d))return h(l,e)}return f?$:D($,i,U,y(e,!1))}function j(s,e,n,r){let{implicitKey:c,inFlow:l}=e,t=typeof s.value=="string"?s:Object.assign({},s,{value:String(s.value)}),{type:f}=s;f!==g.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(t.value)&&(f=g.QUOTE_DOUBLE);let i=u=>{switch(u){case g.BLOCK_FOLDED:case g.BLOCK_LITERAL:return c||l?h(t.value,e):E(t,e,n,r);case g.QUOTE_DOUBLE:return S(t.value,e);case g.QUOTE_SINGLE:return Q(t.value,e);case g.PLAIN:return W(t,e,n,r);default:return null}},o=i(f);if(o===null){let{defaultKeyType:u,defaultStringType:$}=e.options,d=c&&u||$;if(o=i(d),o===null)throw new Error(`Unsupported default string type ${d}`)}return o}export{j as stringifyString};
//# sourceMappingURL=stringifyString.mjs.map