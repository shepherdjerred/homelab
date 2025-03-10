/* esm.sh - yaml@2.7.0/browser/dist/stringify/stringifyComment */
var s=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function r(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}var t=(n,e,i)=>n.endsWith(`
`)?r(i,e):i.includes(`
`)?`
`+r(i,e):(n.endsWith(" ")?"":" ")+i;export{r as indentComment,t as lineComment,s as stringifyComment};
//# sourceMappingURL=stringifyComment.mjs.map