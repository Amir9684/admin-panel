import{p as o,t as c,m as l,a as f,j as u}from"./index.872b1012.js";var y=["className","cssModule","innerRef","tag"];function g(e,n){if(e==null)return{};var s=d(e,n),r,t;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],!(n.indexOf(r)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,r)||(s[r]=e[r]))}return s}function d(e,n){if(e==null)return{};var s={},r=Object.keys(e),t,a;for(a=0;a<r.length;a++)t=r[a],!(n.indexOf(t)>=0)&&(s[t]=e[t]);return s}var b={className:o.exports.string,cssModule:o.exports.object,innerRef:o.exports.oneOfType([o.exports.object,o.exports.string,o.exports.func]),tag:c};function m(e){var n=e.className,s=e.cssModule,r=e.innerRef,t=e.tag,a=t===void 0?"div":t,i=g(e,y),p=l(f(n,"card-body"),s);return u(a,{...i,className:p,ref:r})}m.propTypes=b;export{m as C};
