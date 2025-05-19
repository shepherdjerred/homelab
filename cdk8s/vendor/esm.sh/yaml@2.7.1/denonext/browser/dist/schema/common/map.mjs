/* esm.sh - yaml@2.7.1/browser/dist/schema/common/map */
import{isMap as r}from"../../nodes/identity.mjs";import{YAMLMap as a}from"../../nodes/YAMLMap.mjs";var i={collection:"map",default:!0,nodeClass:a,tag:"tag:yaml.org,2002:map",resolve(o,t){return r(o)||t("Expected a mapping for this tag"),o},createNode:(o,t,e)=>a.from(o,t,e)};export{i as map};
//# sourceMappingURL=map.mjs.map