import{p as o,t as l,m as c,a as g,j as p}from"./index.872b1012.js";import{D as f,b as v}from"./App.1e0b1a12.js";var y=["className","cssModule","tag","type","size"];function d(t,n){if(t==null)return{};var s=m(t,n),e,r;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)e=a[r],!(n.indexOf(e)>=0)&&(!Object.prototype.propertyIsEnumerable.call(t,e)||(s[e]=t[e]))}return s}function m(t,n){if(t==null)return{};var s={},e=Object.keys(t),r,a;for(a=0;a<e.length;a++)r=e[a],!(n.indexOf(r)>=0)&&(s[r]=t[r]);return s}var b={className:o.exports.string,cssModule:o.exports.object,size:o.exports.string,tag:l,type:o.exports.string};function j(t){var n=t.className,s=t.cssModule,e=t.tag,r=e===void 0?"div":e;t.type;var a=t.size,i=d(t,y),u=c(g(n,"input-group",a?"input-group-".concat(a):null),s);return t.type==="dropdown"?p(f,{...i,className:u}):p(v.Provider,{value:{insideInputGroup:!0},children:p(r,{...i,className:u})})}j.propTypes=b;var O=["className","cssModule","tag"];function x(t,n){if(t==null)return{};var s=N(t,n),e,r;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)e=a[r],!(n.indexOf(e)>=0)&&(!Object.prototype.propertyIsEnumerable.call(t,e)||(s[e]=t[e]))}return s}function N(t,n){if(t==null)return{};var s={},e=Object.keys(t),r,a;for(a=0;a<e.length;a++)r=e[a],!(n.indexOf(r)>=0)&&(s[r]=t[r]);return s}var P={className:o.exports.string,cssModule:o.exports.object,tag:l};function T(t){var n=t.className,s=t.cssModule,e=t.tag,r=e===void 0?"span":e,a=x(t,O),i=c(g(n,"input-group-text"),s);return p(r,{...a,className:i})}T.propTypes=P;export{j as I,T as a};
