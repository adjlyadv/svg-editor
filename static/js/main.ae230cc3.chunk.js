(this["webpackJsonpsvg-editor"]=this["webpackJsonpsvg-editor"]||[]).push([[0],{16:function(t,n,e){},20:function(t,n,e){},21:function(t,n,e){"use strict";e.r(n);var c=e(0),o=e(1),r=e.n(o),s=e(10),a=e.n(s),i=(e(16),e(2)),j=e(3),u=e(5),p=e(4),l=function(t){var n=t.posX,e=t.posY;return Object(c.jsx)("circle",{onClick:function(t){return console.log(t)},cx:n,cy:e,stroke:"#55f",r:"4"})},b=e(7),O=e.n(b),f=function(t){Object(u.a)(e,t);var n=Object(p.a)(e);function e(t){var c;Object(i.a)(this,e),(c=n.call(this,t)).state={x:0,y:0,t:null,ctrX:0,ctrY:0,editing:!1};var o=new O.a(135.5,77.5,252.5,36.5,219.5,85.5);return console.log(o.project({x:135.5,y:77.5})),c}return Object(j.a)(e,[{key:"render",value:function(){new O.a(157.5,105.5,180,95,148,76.5);var t=[{posX:157.5,posY:105.5,ctrPosX:180,ctrPosY:95},{posX:148.8,posY:76.5,ctrPosX:227,ctrPosY:74}];if(!this.state.editing){return Object(c.jsxs)(o.Fragment,{children:[t.map((function(t){return Object(c.jsxs)(o.Fragment,{children:[Object(c.jsx)(l,{posX:t.posX,posY:t.posY}),Object(c.jsx)("line",{x1:t.posX,y1:t.posY,x2:t.ctrPosX,y2:t.ctrPosY,stroke:"#2440B3"}),Object(c.jsx)(l,{posX:t.ctrPosX,posY:t.ctrPosY})]})})),Object(c.jsx)("path",{d:function(t){for(var n="",e=0;e<t.length;e++)n+=0===e?"M ".concat(t[e].posX," ").concat(t[e].posY," C ").concat(t[e].ctrPosX," ").concat(t[e].ctrPosY," "):"".concat(t[e].posX," ").concat(t[e].posY," ").concat(t[e].ctrPosX," ").concat(t[e].ctrPosY);return console.log(n),n}(t),"stroke-width":"5",stroke:"#000000",fill:"none"})]})}}}]),e}(r.a.Component),h=function(t){Object(u.a)(e,t);var n=Object(p.a)(e);function e(){return Object(i.a)(this,e),n.apply(this,arguments)}return Object(j.a)(e,[{key:"render",value:function(){return Object(c.jsx)("svg",{width:"500",height:"500",children:Object(c.jsx)(f,{})})}}]),e}(r.a.Component),d=(e.p,function(t){Object(u.a)(e,t);var n=Object(p.a)(e);function e(){return Object(i.a)(this,e),n.apply(this,arguments)}return Object(j.a)(e,[{key:"render",value:function(){return Object(c.jsx)(o.Fragment,{children:Object(c.jsx)(h,{})})}}]),e}(r.a.Component));e(20);var x=function(){return Object(c.jsx)("div",{className:"App",children:Object(c.jsx)(d,{})})},g=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,22)).then((function(n){var e=n.getCLS,c=n.getFID,o=n.getFCP,r=n.getLCP,s=n.getTTFB;e(t),c(t),o(t),r(t),s(t)}))};a.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(x,{})}),document.getElementById("root")),g()}},[[21,1,2]]]);
//# sourceMappingURL=main.ae230cc3.chunk.js.map