/* esm.sh - yaml@2.8.0/browser/dist/schema/common/seq */
import{isSeq as s}from"../../nodes/identity.mjs";import{YAMLSeq as t}from"../../nodes/YAMLSeq.mjs";var f={collection:"seq",default:!0,nodeClass:t,tag:"tag:yaml.org,2002:seq",resolve(e,o){return s(e)||o("Expected a sequence for this tag"),e},createNode:(e,o,r)=>t.from(e,o,r)};export{f as seq};
//# sourceMappingURL=seq.mjs.map