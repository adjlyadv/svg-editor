(this["webpackJsonpsvg-editor"]=this["webpackJsonpsvg-editor"]||[]).push([[0],{24:function(t,e,o){},29:function(t,e,o){},30:function(t,e,o){},31:function(t,e,o){},32:function(t,e,o){},33:function(t,e,o){},34:function(t,e,o){},35:function(t,e,o){},36:function(t,e,o){"use strict";o.r(e);var s=o(0),c=o(1),n=o.n(c),r=o(15),a=o.n(r),i=(o(24),o(3)),d=o(4),u=o(16),l=o(11),p=o(17),h=o(2),j=0,b=1,f=2,m=new function t(){var e=this;Object(p.a)(this,t),this.editorInfo={width:800,height:600,left:0,top:0},this.mouseState={type:j,drugging:!1,pathid:0,nodeid:0},this.pathList=[],this.addPath=function(){return e.pathList.push({id:e.pathList.length,nodes:[],strokeWidth:5,stroke:"#000000",fill:"#ffffff"}),e.pathList.length-1},this.deletePath=function(t){delete e.pathList[t]},this.setNodes=function(t,o,s){e.pathList[t].nodes[o]=s},this.addNodes=function(t,o,s,c,n,r,a,i){var d=e.pathList[t].nodes.length;0===d?e.pathList[t].nodes.push({posX:o,posY:s,ctrPosX:c||o,ctrPosY:n||s}):e.pathList[t].nodes=[].concat(Object(l.a)(e.pathList[t].nodes.slice(0,i||d-1)),[{posX:o,posY:s,ctrPosX:c||o,ctrPosY:n||s,ctr2PosX:r,ctr2PosY:a}],Object(l.a)(e.pathList[t].nodes.slice(i||d-1)))},this.setMouseState=function(t,o,s,c){e.mouseState.pathid=s,e.mouseState.nodeid=c,e.mouseState.type=t,e.mouseState.drugging=o},this.movePath=function(t,o,s){var c,n=Object(u.a)(e.pathList[t].nodes);try{for(n.s();!(c=n.n()).done;){var r=c.value;r.posX+=o,r.posY+=s,r.ctrPosX+=o,r.ctrPosY+=s,r.ctr2PosY&&r.ctr2PosX&&(r.ctr2PosX+=o,r.ctr2PosY+=s)}}catch(a){n.e(a)}finally{n.f()}},this.setStateInfo=function(t,o,s){switch(o){case"X":var c=e.pathList[0].nodes[0];c.posX=Number(s),e.setNodes(0,0,c);break;case"Y":var n=e.pathList[0].nodes[0];n.posY=Number(s),e.setNodes(0,0,n);break;case"fill":e.pathList[t].fill=s;break;case"strokeWidth":e.pathList[t].strokeWidth=Number(s);break;case"stroke":e.pathList[t].stroke=s}},Object(h.k)(this),this.pathList.push({id:0,nodes:[{posX:125.5,posY:171.5,ctrPosX:194.5,ctrPosY:85.5},{posX:246.5,posY:140.5,ctrPosX:288.5,ctrPosY:95.5,ctr2PosX:204.5,ctr2PosY:185.5},{posX:210,posY:261,ctrPosX:309.5,ctrPosY:309.5}],strokeWidth:5,stroke:"#000000",fill:"#ffffff"})};function P(t){var e=m.editorInfo;return{x:t.clientX-e.left,y:t.clientY-e.top}}var O=o(6),x=Object(O.a)((function(t){if(-1===t.id)return Object(s.jsx)("circle",{onClick:t.onClick,onMouseLeave:t.onMouseLeave,className:"point-control-add",cx:t.node.posX,cy:t.node.posY});var e=m.pathList[t.pathId].nodes[t.id],o=function(e,o){switch(e){case j:m.setMouseState(j,!0,t.pathId,t.id);break;case b:m.setMouseState(b,!0,t.pathId,t.id);break;case f:m.setMouseState(f,!0,t.pathId,t.id)}};return Object(s.jsxs)(c.Fragment,{children:[Object(s.jsx)("circle",{className:"point-control",onMouseDown:function(t){return o(j)},cx:e.posX,cy:e.posY}),Object(s.jsx)("line",{x1:e.posX,y1:e.posY,x2:e.ctrPosX,y2:e.ctrPosY,stroke:"#555",strokeWidth:"1"}),Object(s.jsx)("circle",{className:"point-control",onMouseDown:function(t){return o(b)},cx:e.ctrPosX,cy:e.ctrPosY}),e.ctr2PosX&&e.ctr2PosY&&Object(s.jsx)("circle",{className:"point-control",onMouseDown:function(t){return o(f)},cx:e.ctr2PosX,cy:e.ctr2PosY}),e.ctr2PosX&&e.ctr2PosY&&Object(s.jsx)("line",{x1:e.posX,y1:e.posY,x2:e.ctr2PosX,y2:e.ctr2PosY,stroke:"#555",strokeWidth:"1"})]})})),X=o(8),Y=o.n(X),v=o(18),g=o.n(v),k=Object(O.a)((function(t){var e=function(t){var e="";if(1===t.length)return e;for(var o=0;o<t.length;o++)0===o?e+="M ".concat(t[o].posX," ").concat(t[o].posY," C ").concat(t[o].ctrPosX," ").concat(t[o].ctrPosY," "):o+1<=t.length-1?e+="".concat(t[o].ctrPosX," ").concat(t[o].ctrPosY," ").concat(t[o].posX," ").concat(t[o].posY," C ").concat(t[o].ctr2PosX," ").concat(t[o].ctr2PosY," "):e+="".concat(t[o].ctrPosX," ").concat(t[o].ctrPosY," ").concat(t[o].posX," ").concat(t[o].posY);return console.log(e),e},o=function(e){e.stopPropagation(),t.setPathid(t.path.id)},n=Y.a.throttle((function(e,o){if(e.stopPropagation(),"mouse_add_node"===t.currentTool){var s=P(e),c=s.x,n=s.y,r=o.nodes.reduce((function(t,e,s){return s===o.nodes.length-1?t.push(e.ctrPosX,e.ctrPosY,e.posX,e.posY):t.push(e.posX,e.posY,e.ctrPosX,e.ctrPosY),t}),[]).flat(1),a=new g.a(r);X(a);var i=a.project({x:c,y:n});j({posX:i.x,posY:i.y,ctrPosX:i.x,ctrPosY:i.y,t:i.t})}}),50),r=Object(c.useState)(!1),a=Object(i.a)(r,2),d=a[0],u=a[1],l=Object(c.useState)(),p=Object(i.a)(l,2),h=p[0],j=p[1],b=Object(c.useState)(),f=Object(i.a)(b,2),O=f[0],X=f[1],v=t.path,k=v.id,N=v.nodes;if(!d)return Object(s.jsx)(c.Fragment,{children:Object(s.jsx)("path",{onDoubleClick:function(e){e.stopPropagation(),-1!==t.currentTool.indexOf("mouse")&&u(!0)},onClick:o,d:e(N),strokeWidth:t.path.strokeWidth,stroke:t.path.stroke,fill:t.path.fill})});var S=function(){for(var t=[],o=null,s=0;s+1<N.length;s++){if(0!==s&&s+1!==N.length){var c=N[s];o={posX:c.posX,posY:c.posY,ctrPosX:c.ctr2PosX,ctrPosY:c.ctr2PosY}}var n=e([o||N[s],N[s+1]]);t.push({attrD:n,nodes:[o||N[s],N[s+1]]})}return t}();return Object(s.jsxs)(c.Fragment,{children:[S.map((function(e){return Object(s.jsx)(c.Fragment,{children:Object(s.jsx)("path",{onClick:o,d:e.attrD,onMouseOver:function(t){return n(t,e)},strokeWidth:t.path.strokeWidth,stroke:t.path.stroke,fill:t.path.fill},e.attrD)})})),N.map((function(t,e){return Object(s.jsx)(x,{node:t,id:e,pathId:k})})),h&&Object(s.jsx)(x,{node:h,id:-1,pathId:-1,onClick:function(){if("mouse_add_node"===t.currentTool){var e=null===O||void 0===O?void 0:O.split(h.t),o=null===e||void 0===e?void 0:e.left.points;if(e&&o){var s=N.findIndex((function(t){return t.posX===(null===O||void 0===O?void 0:O.points[0].x)&&t.posY===(null===O||void 0===O?void 0:O.points[0].y)})),c={posX:o[0].x,posY:o[0].y,ctrPosX:s?m.pathList[k].nodes[s].ctrPosX:o[1].x,ctrPosY:s?m.pathList[k].nodes[s].ctrPosY:o[1].y,ctr2PosX:s?o[1].x:void 0,ctr2PosY:s?o[1].y:void 0},n={posX:o[3].x,posY:o[3].y,ctrPosX:o[2].x,ctrPosY:o[2].y,ctr2PosX:0,ctr2PosY:0};m.setNodes(k,s,c),c={posX:(o=null===e||void 0===e?void 0:e.right.points)[3].x,posY:o[3].y,ctrPosX:o[2].x,ctrPosY:o[2].y,ctr2PosX:m.pathList[k].nodes[s+1].ctr2PosX||void 0,ctr2PosY:m.pathList[k].nodes[s+1].ctr2PosY||void 0},n.ctr2PosX=o[1].x,n.ctr2PosY=o[1].y,m.setNodes(k,s+1,c),m.addNodes(k,n.posX,n.posY,n.ctrPosX,n.ctrPosY,n.ctr2PosX,n.ctr2PosY,s+1),j(null)}}},onMouseLeave:function(){return j(null)}})]})})),N=(o(29),function(t){Object(c.useEffect)((function(){var t;if(e){var o=null===e||void 0===e||null===(t=e.current)||void 0===t?void 0:t.getBoundingClientRect();o&&(m.editorInfo.top=o.top,m.editorInfo.left=o.left,O(o))}}),[]);var e=Object(c.useRef)(null),o=Object(c.useRef)(!1),n=Object(c.useState)(-1),r=Object(i.a)(n,2),a=r[0],u=r[1],l=Object(c.useState)(m.editorInfo),p=Object(i.a)(l,2),h=p[0],O=p[1],x=Object(c.useState)(!1),Y=Object(i.a)(x,2),v=Y[0],g=Y[1],N=m.pathList,S=m.mouseState.pathid,y=m.mouseState.nodeid,L=Object(c.useState)(N[m.mouseState.pathid].nodes[m.mouseState.nodeid]),I=Object(i.a)(L,2),C=I[0],_=I[1];Object(c.useEffect)((function(){m.setNodes(m.mouseState.pathid,m.mouseState.nodeid,C)}),[C]),Object(c.useEffect)((function(){if("pen"!==t.currentTool){var e=a;-1!==e&&m.pathList[e].nodes.length<2?(m.deletePath(e),o.current=!1,u(-1)):-1!==e&&m.pathList[e].nodes.length>=2&&(o.current=!1,u(-1))}}),[t.currentTool,a]);var T,M=Object(c.useState)(N[S].nodes[y]),w=Object(i.a)(M,2),W=w[0],D=w[1],F=Object(c.useState)(N[S].nodes[y]),E=Object(i.a)(F,2),B=E[0],R=E[1],A=Object(c.useState)({posX:-1,posY:-1}),J=Object(i.a)(A,2),U=J[0],q=J[1],z=Object(c.useState)(!1),G=Object(i.a)(z,2),H=G[0],K=G[1],Q=X.throttle((function(e){e.stopPropagation();var s=P(e),c=s.x,n=s.y;switch(t.currentTool){case"mouse_drag_node":if(!m.mouseState.drugging)return;switch(m.mouseState.type){case j:_(Object(d.a)(Object(d.a)({},C),{},{posX:c,posY:n}));break;case b:_(Object(d.a)(Object(d.a)({},C),{},{ctrPosX:c,ctrPosY:n}));break;case f:_(Object(d.a)(Object(d.a)({},C),{},{ctr2PosX:c,ctr2PosY:n}))}break;case"mouse_drag_path":if(!H)return;var r=c-U.posX,a=n-U.posY;m.movePath(t.currentPathid,r,a),q({posX:c,posY:n});break;case"pen":o.current&&D(Object(d.a)(Object(d.a)({},W),{},{ctrPosX:c,ctrPosY:n}))}}),5,{trailing:!0});return Object(s.jsx)("div",{className:"editor-container",children:Object(s.jsxs)("svg",{ref:e,className:"editor-svg",width:h.width,height:h.height,onMouseDown:function(e){e.stopPropagation();var s=P(e),c=s.x,n=s.y;switch(t.currentTool){case"mouse_drag_node":S=m.mouseState.pathid,y=m.mouseState.nodeid;var r=m.pathList[S].nodes[y];_(Object(d.a)({},r));break;case"mouse_drag_path":K(!0),q({posX:c,posY:n});break;case"pen":o.current||(o.current=!0,g(!0),R({posX:c,posY:n,ctrPosX:c,ctrPosY:n,ctr2PosX:c,ctr2PosY:n})),D({posX:c,posY:n,ctrPosX:c,ctrPosY:n,ctr2PosX:c,ctr2PosY:n})}},onMouseMove:Q,onMouseUp:function(e){e.stopPropagation(),clearTimeout(T),T=setTimeout((function(){switch(t.currentTool){case"mouse_drag_node":m.setMouseState(j,!1,S,y);break;case"mouse_drag_path":K(!1);break;case"pen":if(!o.current)return;var e=a;-1===a&&(e=m.addPath(),u(e));var s=m.pathList[e].nodes.length,c=2*W.posX-W.ctrPosX,n=2*W.posY-W.ctrPosY;m.addNodes(e,W.posX,W.posY,W.ctrPosX,W.ctrPosY,c,n,s),v?(R(Object(d.a)(Object(d.a)({},W),{},{ctrPosX:c,ctrPosY:n})),g(!1)):R(Object(d.a)({},W))}}),250)},onDoubleClick:function(){clearTimeout(T),o.current=!1,u(-1)},children:[N.map((function(e){return Object(s.jsx)(k,{path:e,setPathid:t.set,currentTool:t.currentTool},e.id)})),function(){if(o.current){var t=2*B.posX-B.ctrPosX,e=2*B.posY-B.ctrPosY,n="M ".concat(B.posX," ").concat(B.posY," C ").concat(t," ").concat(e," ").concat(W.ctrPosX," ").concat(W.ctrPosY),r=0;return B.posX!==W.posX&&B.posY!==W.posY?(n+=" ".concat(W.posX," ").concat(W.posY),r=1):(n+=" ".concat(W.ctrPosX," ").concat(W.ctrPosY),r=0),Object(s.jsxs)(c.Fragment,{children:[Object(s.jsx)("path",{d:n,fill:"none",stroke:"#000",strokeWidth:"1"}),Object(s.jsx)("circle",{className:"point-control",cx:W.posX,cy:W.posY,stroke:"#55f",r:"10"}),Object(s.jsx)("line",{x1:W.posX,y1:W.posY,x2:W.ctrPosX,y2:W.ctrPosY,stroke:"#555",strokeWidth:r}),Object(s.jsx)("circle",{className:"point-control",cx:W.ctrPosX,cy:W.ctrPosY,stroke:"#000",r:"10"})]})}}()]})})}),S=(o(30),Object(O.a)((function(t){var e=function(e){var o=e.target.name,s=e.target.value;m.setStateInfo(t.currentPathid,o,s)},o=m.pathList[t.currentPathid];return Object(s.jsx)(c.Fragment,{children:Object(s.jsxs)("div",{className:"statusContainer",children:[Object(s.jsx)("h4",{children:"\u72b6\u6001\u680f"}),Object(s.jsxs)("label",{className:"statusinput",children:[Object(s.jsx)("span",{children:"PositionX:"}),Object(s.jsx)("input",{type:"number",name:"X",value:o.nodes[0].posX,onChange:e})]}),Object(s.jsxs)("label",{className:"statusinput",children:[Object(s.jsx)("span",{children:"PositionY:"}),Object(s.jsx)("input",{type:"number",name:"Y",value:o.nodes[0].posY,onChange:e})]}),Object(s.jsxs)("label",{className:"statusinput",children:[Object(s.jsx)("span",{children:"fill:"}),Object(s.jsx)("input",{type:"color",name:"fill",value:o.fill,onChange:e})]}),Object(s.jsxs)("label",{className:"statusinput",children:[Object(s.jsx)("span",{children:"stroke Width:"}),Object(s.jsx)("input",{type:"number",name:"strokeWidth",min:"0",max:"40",value:o.strokeWidth,onChange:e})]}),Object(s.jsxs)("label",{className:"statusinput",children:[Object(s.jsx)("span",{children:"stroke:"}),Object(s.jsx)("input",{type:"color",name:"stroke",value:o.stroke,onChange:e})]})]})})}))),y=(o(31),function(t){function e(e){t.set(e.target.id)}return Object(s.jsxs)("div",{className:"function",children:[Object(s.jsx)("div",{className:"mouse_add_node"===t.currentTool?"functionItemSelect":"functionItem",onClick:e,id:"mouse_add_node",children:"Add Node"}),Object(s.jsx)("div",{className:"mouse_drag_node"===t.currentTool?"functionItemSelect":"functionItem",onClick:e,id:"mouse_drag_node",children:"Drag Node"}),Object(s.jsx)("div",{className:"mouse_drag_path"===t.currentTool?"functionItemSelect":"functionItem",onClick:e,id:"mouse_drag_path",children:"Drag Path"})]})}),L=(o(32),o(33),o.p+"static/media/circle.292ce4e1.svg"),I=o.p+"static/media/pen.4de46a1c.svg",C=o.p+"static/media/mouse.dfeff54d.svg",_=o.p+"static/media/line.86048c7a.svg",T=o.p+"static/media/rectangle.d8ea8f58.svg",M=function(t){function e(e){t.set(e.target.id)}return Object(s.jsxs)("div",{className:"toolbar",children:[Object(s.jsx)("div",{className:"toolitem",onClick:e,children:Object(s.jsx)("img",{className:-1!==t.currentTool.indexOf("mouse")?"itmeIconselect":"itmeIcon",id:"mouse",alt:"mouse",src:C})}),Object(s.jsx)("div",{className:"toolitem",onClick:e,children:Object(s.jsx)("img",{className:"circle"===t.currentTool?"itmeIconselect":"itmeIcon",id:"circle",alt:"circle",src:L})}),Object(s.jsx)("div",{className:"toolitem",onClick:e,children:Object(s.jsx)("img",{className:"rectangle"===t.currentTool?"itmeIconselect":"itmeIcon",id:"rectangle",alt:"rectangle",src:T})}),Object(s.jsx)("div",{className:"toolitem",onClick:e,children:Object(s.jsx)("img",{className:"line"===t.currentTool?"itmeIconselect":"itmeIcon",id:"line",alt:"line",src:_})}),Object(s.jsx)("div",{className:"toolitem",onClick:e,children:Object(s.jsx)("img",{className:"pen"===t.currentTool?"itmeIconselect":"itmeIcon",id:"pen",alt:"pen",src:I})})]})},w=(o(34),function(){var t=Object(c.useState)("mouse"),e=Object(i.a)(t,2),o=e[0],n=e[1],r=Object(c.useState)(0),a=Object(i.a)(r,2),d=a[0],u=a[1];return Object(s.jsxs)("div",{className:"basic-container",children:[Object(s.jsx)(M,{currentTool:o,set:n}),-1===o.indexOf("mouse")?null:Object(s.jsx)(y,{currentTool:o,set:n}),Object(s.jsx)(N,{currentTool:o,currentPathid:d,set:u}),Object(s.jsx)(S,{currentPathid:d})]})});o(35);var W=function(){return Object(s.jsx)("div",{className:"App",children:Object(s.jsx)(w,{})})},D=function(t){t&&t instanceof Function&&o.e(3).then(o.bind(null,37)).then((function(e){var o=e.getCLS,s=e.getFID,c=e.getFCP,n=e.getLCP,r=e.getTTFB;o(t),s(t),c(t),n(t),r(t)}))};a.a.render(Object(s.jsx)(n.a.StrictMode,{children:Object(s.jsx)(W,{})}),document.getElementById("root")),D()}},[[36,1,2]]]);
//# sourceMappingURL=main.b962b8ad.chunk.js.map