(this["webpackJsonpsvg-editor"]=this["webpackJsonpsvg-editor"]||[]).push([[0],{26:function(t,e,o){},32:function(t,e,o){},33:function(t,e,o){},34:function(t,e,o){},35:function(t,e,o){},36:function(t,e,o){},37:function(t,e,o){},38:function(t,e,o){},39:function(t,e,o){"use strict";o.r(e);var s=o(0),c=o(1),n=o.n(c),r=o(17),a=o.n(r),i=(o(26),o(3)),u=o(4),l=o(12),d=o.n(l),p=o(18),h=o(8),j=o(19),b=o(13),f=o(2),m=0,P=1,O=2,v=new function t(){var e=this;Object(h.a)(this,t),this.editorInfo={width:800,height:600,left:0,top:0},this.mouseState={type:m,drugging:!1,pathid:-1,nodeid:-1},this.pathList=[],this.initPathList=function(t,o){e.pathList[t]=o},this.addPath=function(){return e.pathList.push({id:e.pathList.length,nodes:[],strokeWidth:5,stroke:"#000000",fill:"#ffffff"}),e.pathList.length-1},this.deletePath=function(t){e.pathList=e.pathList.splice(t,1),g.remove(t)},this.setNodes=function(t,o,s){if(e.pathList[t]){e.pathList[t].nodes[o]=s;var c=Object(f.m)(e.pathList[t]);g.update(c)}},this.addNodes=function(t,o,s,c,n,r,a,i){var u=e.pathList[t].nodes.length;if(0===u){e.pathList[t].nodes.push({posX:o,posY:s,ctrPosX:c||o,ctrPosY:n||s});var l=Object(f.m)(e.pathList[t]);g.add(l)}else{e.pathList[t].nodes=[].concat(Object(b.a)(e.pathList[t].nodes.slice(0,i||u-1)),[{posX:o,posY:s,ctrPosX:c||o,ctrPosY:n||s,ctr2PosX:r,ctr2PosY:a}],Object(b.a)(e.pathList[t].nodes.slice(i||u-1)));var d=Object(f.m)(e.pathList[t]);g.update(d)}},this.setMouseState=function(t,o,s,c){e.mouseState.pathid=s,e.mouseState.nodeid=c,e.mouseState.type=t,e.mouseState.drugging=o},this.movePath=function(t,o,s){var c,n=Object(j.a)(e.pathList[t].nodes);try{for(n.s();!(c=n.n()).done;){var r=c.value;r.posX+=o,r.posY+=s,r.ctrPosX+=o,r.ctrPosY+=s,r.ctr2PosY&&r.ctr2PosX&&(r.ctr2PosX+=o,r.ctr2PosY+=s)}}catch(i){n.e(i)}finally{n.f()}var a=Object(f.m)(e.pathList[t]);g.update(a)},this.setStateInfo=function(t,o,s){switch(o){case"X":var c=e.pathList[t].nodes[0].posX;e.movePath(t,Number(s)-c,0);break;case"Y":var n=e.pathList[t].nodes[0].posY;e.movePath(t,0,Number(s)-n);break;case"fill":e.pathList[t].fill=s;break;case"strokeWidth":e.pathList[t].strokeWidth=Number(s);break;case"stroke":e.pathList[t].stroke=s}var r=Object(f.m)(e.pathList[t]);g.update(r)},Object(f.k)(this)},g=new function t(){var e=this;Object(h.a)(this,t),this.dbName="svgData",this.version=1,this.tableName="svgPath",this.db=null,this.openDB=function(){return new Promise((function(t,o){var s=window.indexedDB.open(e.dbName,e.version);s.onsuccess=function(o){console.log("\u6210\u529f\u6253\u5f00\u6570\u636e\u5e93"),e.db=o.target.result,t(1)},s.onupgradeneeded=function(t){console.log("\u6210\u529f\u65b0\u5efa\u6570\u636e\u5e93"),e.db=t.target.result,e.create_table(e.db)},s.onerror=function(t){console.log("\u6570\u636e\u5e93\u6253\u5f00\u62a5\u9519"),o(1)}}))},this.create_table=function(t){t.objectStoreNames.contains(e.tableName)||t.createObjectStore(e.tableName,{keyPath:"id"}).createIndex("id","id",{unique:!0})},this.add=function(t){if(e.db){var o=e.db.transaction([e.tableName],"readwrite").objectStore(e.tableName).add(t);o.onsuccess=function(t){console.log("\u6570\u636e\u5199\u5165\u6210\u529f")},o.onerror=function(t){console.log("\u6570\u636e\u5199\u5165\u5931\u8d25")}}},this.readAll=function(){return new Promise((function(t,o){e.db?e.db.transaction(e.tableName).objectStore(e.tableName).openCursor().onsuccess=function(e){var o=e.target.result;o?(v.initPathList(o.key,o.value),o.continue()):(console.log("\u6ca1\u6709\u66f4\u591a\u6570\u636e\u4e86\uff01"),t(1))}:o()}))},this.update=function(t){if(e.db){var o=e.db.transaction([e.tableName],"readwrite").objectStore(e.tableName).put(t);o.onsuccess=function(t){console.log("\u6570\u636e\u66f4\u65b0\u6210\u529f")},o.onerror=function(t){console.log("\u6570\u636e\u66f4\u65b0\u5931\u8d25")}}},this.remove=function(t){e.db&&(e.db.transaction([e.tableName],"readwrite").objectStore(e.tableName).delete(t).onsuccess=function(t){console.log("\u6570\u636e\u5220\u9664\u6210\u529f")})}};function x(t){var e=v.editorInfo;return{x:t.clientX-e.left,y:t.clientY-e.top}}var X=o(6),Y=Object(X.a)((function(t){if(-1===t.id)return Object(s.jsx)("circle",{onClick:t.onClick,onMouseLeave:t.onMouseLeave,className:"point-control-add",cx:t.node.posX,cy:t.node.posY});var e=v.pathList[t.pathId].nodes[t.id],o=function(e,o){switch(e){case m:v.setMouseState(m,!0,t.pathId,t.id);break;case P:v.setMouseState(P,!0,t.pathId,t.id);break;case O:v.setMouseState(O,!0,t.pathId,t.id)}};return Object(s.jsxs)(c.Fragment,{children:[Object(s.jsx)("circle",{className:"point-control",onMouseDown:function(t){return o(m)},cx:e.posX,cy:e.posY}),Object(s.jsx)("line",{x1:e.posX,y1:e.posY,x2:e.ctrPosX,y2:e.ctrPosY,stroke:"#555",strokeWidth:"1"}),Object(s.jsx)("circle",{className:"point-control",onMouseDown:function(t){return o(P)},cx:e.ctrPosX,cy:e.ctrPosY}),e.ctr2PosX&&e.ctr2PosY&&Object(s.jsx)("circle",{className:"point-control",onMouseDown:function(t){return o(O)},cx:e.ctr2PosX,cy:e.ctr2PosY}),e.ctr2PosX&&e.ctr2PosY&&Object(s.jsx)("line",{x1:e.posX,y1:e.posY,x2:e.ctr2PosX,y2:e.ctr2PosY,stroke:"#555",strokeWidth:"1"})]})})),k=o(9),N=o.n(k),S=o(20),L=o.n(S),y=Object(X.a)((function(t){var e=function(t){var e="";if(1===t.length)return e;for(var o=0;o<t.length;o++)0===o?e+="M ".concat(t[o].posX," ").concat(t[o].posY," C ").concat(t[o].ctrPosX," ").concat(t[o].ctrPosY," "):o+1<=t.length-1?e+="".concat(t[o].ctrPosX," ").concat(t[o].ctrPosY," ").concat(t[o].posX," ").concat(t[o].posY," C ").concat(t[o].ctr2PosX," ").concat(t[o].ctr2PosY," "):e+="".concat(t[o].ctrPosX," ").concat(t[o].ctrPosY," ").concat(t[o].posX," ").concat(t[o].posY);return console.log(e),e},o=function(e){e.stopPropagation(),t.setPathid(t.path.id)},n=N.a.throttle((function(e,o){if(e.stopPropagation(),"mouse_add_node"===t.currentTool){var s=x(e),c=s.x,n=s.y,r=o.nodes.reduce((function(t,e,s){return s===o.nodes.length-1?t.push(e.ctrPosX,e.ctrPosY,e.posX,e.posY):t.push(e.posX,e.posY,e.ctrPosX,e.ctrPosY),t}),[]).flat(1),a=new L.a(r);P(a);var i=a.project({x:c,y:n});j({posX:i.x,posY:i.y,ctrPosX:i.x,ctrPosY:i.y,t:i.t})}}),50),r=Object(c.useState)(!1),a=Object(i.a)(r,2),u=a[0],l=a[1],d=Object(c.useState)(),p=Object(i.a)(d,2),h=p[0],j=p[1],b=Object(c.useState)(),f=Object(i.a)(b,2),m=f[0],P=f[1],O=t.path,g=O.id,X=O.nodes;if(!u)return Object(s.jsx)(c.Fragment,{children:Object(s.jsx)("path",{onDoubleClick:function(e){e.stopPropagation(),-1!==t.currentTool.indexOf("mouse")&&l(!0)},onClick:o,d:e(X),strokeWidth:t.path.strokeWidth,stroke:t.path.stroke,fill:t.path.fill})});var k=function(){for(var t=[],o=null,s=0;s+1<X.length;s++){if(0!==s&&s+1!==X.length){var c=X[s];o={posX:c.posX,posY:c.posY,ctrPosX:c.ctr2PosX,ctrPosY:c.ctr2PosY}}var n=e([o||X[s],X[s+1]]);t.push({attrD:n,nodes:[o||X[s],X[s+1]]})}return t}();return Object(s.jsxs)(c.Fragment,{children:[k.map((function(e){return Object(s.jsx)(c.Fragment,{children:Object(s.jsx)("path",{onClick:o,d:e.attrD,onMouseOver:function(t){return n(t,e)},strokeWidth:t.path.strokeWidth,stroke:t.path.stroke,fill:t.path.fill},e.attrD)})})),X.map((function(t,e){return Object(s.jsx)(Y,{node:t,id:e,pathId:g})})),h&&Object(s.jsx)(Y,{node:h,id:-1,pathId:-1,onClick:function(){if("mouse_add_node"===t.currentTool){var e=null===m||void 0===m?void 0:m.split(h.t),o=null===e||void 0===e?void 0:e.left.points;if(e&&o){var s=X.findIndex((function(t){return t.posX===(null===m||void 0===m?void 0:m.points[0].x)&&t.posY===(null===m||void 0===m?void 0:m.points[0].y)})),c={posX:o[0].x,posY:o[0].y,ctrPosX:s?v.pathList[g].nodes[s].ctrPosX:o[1].x,ctrPosY:s?v.pathList[g].nodes[s].ctrPosY:o[1].y,ctr2PosX:s?o[1].x:void 0,ctr2PosY:s?o[1].y:void 0},n={posX:o[3].x,posY:o[3].y,ctrPosX:o[2].x,ctrPosY:o[2].y,ctr2PosX:0,ctr2PosY:0};v.setNodes(g,s,c),c={posX:(o=null===e||void 0===e?void 0:e.right.points)[3].x,posY:o[3].y,ctrPosX:o[2].x,ctrPosY:o[2].y,ctr2PosX:v.pathList[g].nodes[s+1].ctr2PosX||void 0,ctr2PosY:v.pathList[g].nodes[s+1].ctr2PosY||void 0},n.ctr2PosX=o[1].x,n.ctr2PosY=o[1].y,v.setNodes(g,s+1,c),v.addNodes(g,n.posX,n.posY,n.ctrPosX,n.ctrPosY,n.ctr2PosX,n.ctr2PosY,s+1),j(null)}}},onMouseLeave:function(){return j(null)}})]})})),I=(o(32),function(t){Object(c.useEffect)((function(){var t;if(e){var o=null===e||void 0===e||null===(t=e.current)||void 0===t?void 0:t.getBoundingClientRect();o&&(v.editorInfo.top=o.top,v.editorInfo.left=o.left,f(o)),function(){var t=Object(p.a)(d.a.mark((function t(){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g.openDB().then((function(){return g.readAll()})).then((function(){M({posX:-1,posY:-1,ctrPosX:-1,ctrPosY:-1}),console.log("\u66f4\u65b0\u6210\u529f")}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()}}),[]);var e=Object(c.useRef)(null),o=Object(c.useRef)(!1),n=Object(c.useState)(-1),r=Object(i.a)(n,2),a=r[0],l=r[1],h=Object(c.useState)(v.editorInfo),j=Object(i.a)(h,2),b=j[0],f=j[1],X=Object(c.useState)(!1),Y=Object(i.a)(X,2),N=Y[0],S=Y[1],L=v.pathList,I=v.mouseState.pathid,_=v.mouseState.nodeid,C=Object(c.useState)({posX:-1,posY:-1,ctrPosX:-1,ctrPosY:-1}),w=Object(i.a)(C,2),T=w[0],M=w[1];Object(c.useEffect)((function(){v.setNodes(v.mouseState.pathid,v.mouseState.nodeid,T)}),[T]),Object(c.useEffect)((function(){if("pen"!==t.currentTool){var e=a;-1!==e&&v.pathList[e].nodes.length<2?(v.deletePath(e),o.current=!1,l(-1)):-1!==e&&v.pathList[e].nodes.length>=2&&(o.current=!1,l(-1))}}),[t.currentTool,a]);var D,W=Object(c.useState)({posX:-1,posY:-1,ctrPosX:-1,ctrPosY:-1}),F=Object(i.a)(W,2),B=F[0],A=F[1],E=Object(c.useState)({posX:-1,posY:-1,ctrPosX:-1,ctrPosY:-1}),R=Object(i.a)(E,2),J=R[0],q=R[1],U=Object(c.useState)({posX:-1,posY:-1}),z=Object(i.a)(U,2),G=z[0],H=z[1],K=Object(c.useState)(!1),Q=Object(i.a)(K,2),V=Q[0],Z=Q[1],$=k.throttle((function(e){e.stopPropagation();var s=x(e),c=s.x,n=s.y;switch(t.currentTool){case"mouse_drag_node":if(!v.mouseState.drugging)return;switch(v.mouseState.type){case m:M(Object(u.a)(Object(u.a)({},T),{},{posX:c,posY:n}));break;case P:M(Object(u.a)(Object(u.a)({},T),{},{ctrPosX:c,ctrPosY:n}));break;case O:M(Object(u.a)(Object(u.a)({},T),{},{ctr2PosX:c,ctr2PosY:n}))}break;case"mouse_drag_path":if(!V)return;var r=c-G.posX,a=n-G.posY;v.movePath(t.currentPathid,r,a),H({posX:c,posY:n});break;case"pen":o.current&&A(Object(u.a)(Object(u.a)({},B),{},{ctrPosX:c,ctrPosY:n}))}}),5,{trailing:!0});return Object(s.jsx)("div",{className:"editor-container",children:Object(s.jsxs)("svg",{ref:e,className:"editor-svg",width:b.width,height:b.height,onMouseDown:function(e){e.stopPropagation();var s=x(e),c=s.x,n=s.y;switch(t.currentTool){case"mouse_drag_node":if(I=v.mouseState.pathid,_=v.mouseState.nodeid,-1!==I&&-1!==_){var r=v.pathList[I].nodes[_];M(Object(u.a)({},r))}break;case"mouse_drag_path":-1!==t.currentPathid&&(Z(!0),H({posX:c,posY:n}));break;case"pen":o.current||(o.current=!0,S(!0),q({posX:c,posY:n,ctrPosX:c,ctrPosY:n,ctr2PosX:c,ctr2PosY:n})),A({posX:c,posY:n,ctrPosX:c,ctrPosY:n,ctr2PosX:c,ctr2PosY:n})}},onMouseMove:$,onMouseUp:function(e){e.stopPropagation(),clearTimeout(D),D=setTimeout((function(){switch(t.currentTool){case"mouse_drag_node":v.setMouseState(m,!1,I,_);break;case"mouse_drag_path":Z(!1);break;case"pen":if(!o.current)return;var e=a;-1===a&&(e=v.addPath(),l(e));var s=v.pathList[e].nodes.length,c=2*B.posX-B.ctrPosX,n=2*B.posY-B.ctrPosY;v.addNodes(e,B.posX,B.posY,B.ctrPosX,B.ctrPosY,c,n,s),N?(q(Object(u.a)(Object(u.a)({},B),{},{ctrPosX:c,ctrPosY:n})),S(!1)):q(Object(u.a)({},B))}}),250)},onDoubleClick:function(){clearTimeout(D),o.current=!1,l(-1)},children:[L.map((function(e){return Object(s.jsx)(y,{path:e,setPathid:t.set,currentTool:t.currentTool},e.id)})),function(){if(o.current){var t=2*J.posX-J.ctrPosX,e=2*J.posY-J.ctrPosY,n="M ".concat(J.posX," ").concat(J.posY," C ").concat(t," ").concat(e," ").concat(B.ctrPosX," ").concat(B.ctrPosY),r=0;return J.posX!==B.posX&&J.posY!==B.posY?(n+=" ".concat(B.posX," ").concat(B.posY),r=1):(n+=" ".concat(B.ctrPosX," ").concat(B.ctrPosY),r=0),Object(s.jsxs)(c.Fragment,{children:[Object(s.jsx)("path",{d:n,fill:"none",stroke:"#000",strokeWidth:"1"}),Object(s.jsx)("circle",{className:"point-control",cx:B.posX,cy:B.posY,stroke:"#55f",r:"10"}),Object(s.jsx)("line",{x1:B.posX,y1:B.posY,x2:B.ctrPosX,y2:B.ctrPosY,stroke:"#555",strokeWidth:r}),Object(s.jsx)("circle",{className:"point-control",cx:B.ctrPosX,cy:B.ctrPosY,stroke:"#000",r:"10"})]})}}()]})})}),_=(o(33),Object(X.a)((function(t){var e,o,n,r,a,i,u=function(e){var o=e.target.name,s=e.target.value;-1!==t.currentPathid&&v.setStateInfo(t.currentPathid,o,s)};return-1!==t.currentPathid&&(i=v.pathList[t.currentPathid]),Object(s.jsx)(c.Fragment,{children:Object(s.jsxs)("div",{className:"statusContainer",children:[Object(s.jsx)("h4",{children:"\u72b6\u6001\u680f"}),Object(s.jsxs)("label",{className:"statusinput",children:[Object(s.jsx)("span",{children:"PositionX:"}),Object(s.jsx)("input",{type:"number",name:"X",value:null===(e=i)||void 0===e?void 0:e.nodes[0].posX,onChange:u})]}),Object(s.jsxs)("label",{className:"statusinput",children:[Object(s.jsx)("span",{children:"PositionY:"}),Object(s.jsx)("input",{type:"number",name:"Y",value:null===(o=i)||void 0===o?void 0:o.nodes[0].posY,onChange:u})]}),Object(s.jsxs)("label",{className:"statusinput",children:[Object(s.jsx)("span",{children:"fill:"}),Object(s.jsx)("input",{type:"color",name:"fill",value:null===(n=i)||void 0===n?void 0:n.fill,onChange:u})]}),Object(s.jsxs)("label",{className:"statusinput",children:[Object(s.jsx)("span",{children:"stroke Width:"}),Object(s.jsx)("input",{type:"number",name:"strokeWidth",value:null===(r=i)||void 0===r?void 0:r.strokeWidth,min:"0",max:"40",onChange:u})]}),Object(s.jsxs)("label",{className:"statusinput",children:[Object(s.jsx)("span",{children:"stroke:"}),Object(s.jsx)("input",{type:"color",name:"stroke",value:null===(a=i)||void 0===a?void 0:a.stroke,onChange:u})]})]})})}))),C=(o(34),function(t){function e(e){t.set(e.target.id)}return Object(s.jsxs)("div",{className:"function",children:[Object(s.jsx)("div",{className:"mouse_add_node"===t.currentTool?"functionItemSelect":"functionItem",onClick:e,id:"mouse_add_node",children:"Add Node"}),Object(s.jsx)("div",{className:"mouse_drag_node"===t.currentTool?"functionItemSelect":"functionItem",onClick:e,id:"mouse_drag_node",children:"Drag Node"}),Object(s.jsx)("div",{className:"mouse_drag_path"===t.currentTool?"functionItemSelect":"functionItem",onClick:e,id:"mouse_drag_path",children:"Drag Path"})]})}),w=(o(35),o(36),o.p+"static/media/circle.292ce4e1.svg"),T=o.p+"static/media/pen.4de46a1c.svg",M=o.p+"static/media/mouse.dfeff54d.svg",D=o.p+"static/media/line.86048c7a.svg",W=o.p+"static/media/rectangle.d8ea8f58.svg",F=function(t){function e(e){t.set(e.target.id)}return Object(s.jsxs)("div",{className:"toolbar",children:[Object(s.jsx)("div",{className:"toolitem",onClick:e,children:Object(s.jsx)("img",{className:-1!==t.currentTool.indexOf("mouse")?"itmeIconselect":"itmeIcon",id:"mouse",alt:"mouse",src:M})}),Object(s.jsx)("div",{className:"toolitem",onClick:e,children:Object(s.jsx)("img",{className:"circle"===t.currentTool?"itmeIconselect":"itmeIcon",id:"circle",alt:"circle",src:w})}),Object(s.jsx)("div",{className:"toolitem",onClick:e,children:Object(s.jsx)("img",{className:"rectangle"===t.currentTool?"itmeIconselect":"itmeIcon",id:"rectangle",alt:"rectangle",src:W})}),Object(s.jsx)("div",{className:"toolitem",onClick:e,children:Object(s.jsx)("img",{className:"line"===t.currentTool?"itmeIconselect":"itmeIcon",id:"line",alt:"line",src:D})}),Object(s.jsx)("div",{className:"toolitem",onClick:e,children:Object(s.jsx)("img",{className:"pen"===t.currentTool?"itmeIconselect":"itmeIcon",id:"pen",alt:"pen",src:T})})]})},B=(o(37),function(){var t=Object(c.useState)("mouse"),e=Object(i.a)(t,2),o=e[0],n=e[1],r=Object(c.useState)(-1),a=Object(i.a)(r,2),u=a[0],l=a[1];return Object(s.jsxs)("div",{className:"basic-container",children:[Object(s.jsx)(F,{currentTool:o,set:n}),-1===o.indexOf("mouse")?null:Object(s.jsx)(C,{currentTool:o,set:n}),Object(s.jsx)(I,{currentTool:o,currentPathid:u,set:l}),Object(s.jsx)(_,{currentPathid:u})]})});o(38);var A=function(){return Object(s.jsx)("div",{className:"App",children:Object(s.jsx)(B,{})})},E=function(t){t&&t instanceof Function&&o.e(3).then(o.bind(null,40)).then((function(e){var o=e.getCLS,s=e.getFID,c=e.getFCP,n=e.getLCP,r=e.getTTFB;o(t),s(t),c(t),n(t),r(t)}))};a.a.render(Object(s.jsx)(n.a.StrictMode,{children:Object(s.jsx)(A,{})}),document.getElementById("root")),E()}},[[39,1,2]]]);
//# sourceMappingURL=main.7b02d396.chunk.js.map