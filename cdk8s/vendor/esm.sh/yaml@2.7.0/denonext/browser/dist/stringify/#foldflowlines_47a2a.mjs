/* esm.sh - yaml@2.7.0/browser/dist/stringify/foldFlowLines */
var E="flow",M="block",F="quoted";function U(e,l,a="flow",{indentAtStart:g,lineWidth:c=80,minContentWidth:r=20,onFold:O,onOverflow:$}={}){if(!c||c<0)return e;c<r&&(r=0);let p=Math.max(1+r,1+c-l.length);if(e.length<=p)return e;let u=[],L={},i=c-l.length;typeof g=="number"&&(g>c-Math.max(2,r)?u.push(0):i=c-g);let h,o,b=!1,f=-1,k=-1,D=-1;a===M&&(f=_(e,f,l.length),f!==-1&&(i=f+p));for(let n;n=e[f+=1];){if(a===F&&n==="\\"){switch(k=f,e[f+1]){case"x":f+=3;break;case"u":f+=5;break;case"U":f+=9;break;default:f+=1}D=f}if(n===`
`)a===M&&(f=_(e,f,l.length)),i=f+l.length+p,h=void 0;else{if(n===" "&&o&&o!==" "&&o!==`
`&&o!=="	"){let s=e[f+1];s&&s!==" "&&s!==`
`&&s!=="	"&&(h=f)}if(f>=i)if(h)u.push(h),i=h+p,h=void 0;else if(a===F){for(;o===" "||o==="	";)o=n,n=e[f+=1],b=!0;let s=f>D+1?f-2:k-1;if(L[s])return e;u.push(s),L[s]=!0,i=s+p,h=void 0}else b=!0}o=n}if(b&&$&&$(),u.length===0)return e;O&&O();let w=e.slice(0,u[0]);for(let n=0;n<u.length;++n){let s=u[n],d=u[n+1]||e.length;s===0?w=`
${l}${e.slice(0,d)}`:(a===F&&L[s]&&(w+=`${e[s]}\\`),w+=`
${l}${e.slice(s+1,d)}`)}return w}function _(e,l,a){let g=l,c=l+1,r=e[c];for(;r===" "||r==="	";)if(l<c+a)r=e[++l];else{do r=e[++l];while(r&&r!==`
`);g=l,c=l+1,r=e[c]}return g}export{M as FOLD_BLOCK,E as FOLD_FLOW,F as FOLD_QUOTED,U as foldFlowLines};
//# sourceMappingURL=foldFlowLines.mjs.map