(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3],{3911:function(e,t,s){Promise.resolve().then(s.bind(s,4028))},4028:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return w}});var n=s(7437),o=s(7775),a=s(2265);let l=["Index","Axes","Buttons"];var c=e=>{let{axes:t,buttons:s,last_message:o,dead_man_switch:a,gamepadType:c}=e;if(!t||!s)return null;let r=Array.from({length:Math.max(t.length,s.length)},(e,t)=>t);return(0,n.jsxs)("table",{className:"min-w-full table-auto font-mono text-lg",children:[(0,n.jsx)("thead",{children:(0,n.jsx)("tr",{children:l.map(e=>(0,n.jsx)("th",{className:"border p-2 w-20",children:e},e))})}),(0,n.jsxs)("tbody",{children:[r.map(e=>{var o,a;return(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{className:"border p-2",children:e}),(0,n.jsx)("td",{className:"border p-2",children:null===(o=t[e])||void 0===o?void 0:o.toFixed(4)}),(0,n.jsx)("td",{className:"border p-2",children:null===(a=s[e])||void 0===a?void 0:a.value.toFixed(4)})]},e)}),(0,n.jsxs)("tr",{children:[(0,n.jsxs)("td",{className:"border p-2",children:["Gamepad Type: ",c]}),(0,n.jsxs)("td",{className:"border p-2",children:["Last message to websocket: ",o]}),(0,n.jsxs)("td",{className:"border p-2",children:["Dead man's switch: ",a?"True":"False"]})]})]})]})},r=s(3572),i=s(4883),d=s(2801);class u{connect(e){this.websocket=new WebSocket(e),this.websocket.onopen=()=>{console.log("Websocket client connected to server.")},this.websocket.onclose=()=>{console.log("Websocket client closed."),this.isConnected=!1},this.websocket.onerror=e=>{console.error("WebSocket error:",e),this.isConnected=!1,this.setIsError(!0)},this.isConnected=!0}disconnect(){this.websocket&&this.websocket.close()}send(e){this.websocket&&this.websocket.readyState===WebSocket.OPEN?this.websocket.send(e):console.error("WebSocket is not open. Cannot send message.")}constructor(e){this.websocket=null,this.isConnected=!1,this.setIsError=e}}var h=s(1698);let m="M0000000000000000\n",b=[0,0,0,0];var x=()=>{let[e,t]=(0,a.useState)(null),[s,o]=(0,a.useState)("joy"),[l,x]=(0,a.useState)(m),[w,f]=(0,a.useState)(!1),[g,v]=(0,a.useState)(m),[p,j]=(0,a.useState)(null),[k,C]=(0,a.useState)(!1),[N,S]=(0,a.useState)(!1),[y,E]=(0,a.useState)(!1),[F,M]=(0,a.useState)(null),[A,Z]=(0,a.useState)(!1),[B,_]=(0,a.useState)(!1),[D,L]=(0,a.useState)(!1),[O,W]=(0,a.useState)(new u(L)),I=(0,a.useCallback)((e,t,s,n)=>{.2>Math.abs(e)&&(e=0),.2>Math.abs(t)&&(t=0);let o=t*e,a="",l="",c=-1*(e+o),r=-1*(e-o);c<.01?a+="0":a+="1",r<.01?l+="0":l+="1",(c=Math.abs(c))>1&&(c=1),(r=Math.abs(r))>1&&(r=1);let i=Math.round(255*r);a+=Math.round(255*c).toString().padStart(3,"0");let d=l+=i.toString().padStart(3,"0"),u=l,h=a,b=a;if(B){d=l,u=a,h=a,b=l;let e=h.split("");e[0]="0"===e[0]?"1":"0";let t=(h=e.join("")).split("");t[0]="0"===t[0]?"1":"0",h=t.join("");let n=b.split("");n[0]="0"===n[0]?"1":"0",b=n.join(""),1==s[0]?(d="1200",u="0200",h="1200",b="0200"):1==s[1]?(d="0200",u="1200",h="0200",b="1200"):1==s[2]?(d="1200",u="1200",h="0200",b="0200"):1==s[3]&&(d="0200",u="0200",h="1200",b="1200")}else 1==s[0]?(d="0200",u="1200",h="0200",b="1200"):1==s[1]?(d="1200",u="0200",h="1200",b="0200"):1==s[2]?(d="1200",u="1200",h="1200",b="1200"):1==s[3]&&(d="0200",u="0200",h="0200",b="0200");let x="M"+d+u+h+b+"\n";return n||(x=m),x},[B]),P=(0,a.useCallback)(()=>{O.disconnect(),E(!1),Z(!1),_(!1)},[O]),T=e=>{O.isConnected&&P(),"Bert"==e?(null==O||O.connect("ws://192.168.1.16:1235"),Z(!0)):"DemoBot"==e&&(null==O||O.connect("ws://192.168.1.4:1235"),_(!0))},q=e=>{j(e)},G=(0,a.useCallback)((e,s)=>{if(s){let s=e.gamepad.id;s.includes("09cc")?o("ps4"):s.includes("c215")&&o("joy"),t(e.gamepad),S(!1)}else t(null)},[]);return(0,a.useEffect)(()=>{if(!p)return;let e=I(-1*p.y,p.x,b,!0);console.log(e),console.log(l),e!==l&&x(e)},[p,l,I]),(0,a.useEffect)(()=>{D&&(Z(!1),E(!1),_(!1),L(e=>!e))},[D]),(0,a.useEffect)(()=>{O.isConnected&&(O.send(l),v(l))},[l,O]),(0,a.useEffect)(()=>{if(e){if("joy"==s){let t=parseFloat(e.axes[1].toFixed(3)),s=parseFloat(e.axes[0].toFixed(3)),n=[e.buttons[2].value,e.buttons[3].value,0,0],o=e.buttons[0].pressed||e.buttons[1].pressed;f(o);let a=I(t,s,n,o);a!=l&&x(a)}else if("ps4"==s){let t=parseFloat(e.axes[3].toFixed(3)),s=parseFloat(e.axes[2].toFixed(3)),n=[e.buttons[14].value,e.buttons[15].value,e.buttons[12].value,e.buttons[13].value],o=e.buttons[7].pressed;f(o);let a=I(t,s,n,o);a!=l&&x(a)}}},[e,s,l,I]),(0,a.useEffect)(()=>{let e=e=>{G(e,!0),C(!1),O.isConnected&&P()},t=e=>{G(e,!1)};return window.addEventListener("gamepadconnected",e,!1),window.addEventListener("gamepaddisconnected",t,!1),()=>{window.removeEventListener("gamepadconnected",e),window.removeEventListener("gamepaddisconnected",t)}},[G,P,O]),(0,a.useEffect)(()=>{let e=0,s=n=>{let o=n-e;o>76.92307692307692?(t(function(e){for(let t=0;t<e.length;t++)if(null!==e[t]&&void 0!==e[t])return e[t];return null}(navigator.getGamepads())),e=n,requestAnimationFrame(s)):setTimeout(()=>{requestAnimationFrame(s)},76.92307692307692-o)},n=requestAnimationFrame(s);return()=>{cancelAnimationFrame(n)}},[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"flex justify-center items-center mt-[10vh] lg:absolute lg:left-1/2 lg:bottom-32 ".concat(k?"":"invisible"),children:(0,n.jsx)(h.Tj,{size:175,sticky:!1,baseColor:"white",stickColor:"blue",move:e=>q(e),stop:()=>O.isConnected?O.send(m):null,throttle:150})}),(0,n.jsxs)("div",{className:"absolute bottom-6 left-4 flex flex-col",children:[(0,n.jsx)(r.Z,{variant:"danger",className:"m-2 h-32 w-52",onClick:()=>{if(O.isConnected){let e=0,t=setInterval(()=>{O.send(m),30==++e&&clearInterval(t)},100)}},children:"E-STOP"}),(0,n.jsxs)("div",{className:"m-2 w-52 flex flex-row",children:[(0,n.jsx)(r.Z,{className:"w-24 ".concat(A?"connected":"disconnected"),onClick:A?P:()=>T("Bert"),children:"Bert"}),(0,n.jsx)(r.Z,{className:"ml-4 w-24 ".concat(B?"connected":"disconnected"),onClick:B?P:()=>T("DemoBot"),children:"DemoBot"})]}),(0,n.jsxs)(d.Z,{className:"m-2 max-w-72",children:[(0,n.jsx)(i.Z.Control,{placeholder:"ws://localhost:1234","aria-label":"Websocket address","aria-describedby":"basic-addon2",onChange:e=>M(e.target.value)}),(0,n.jsx)(r.Z,{variant:"secondary",id:"button-addon2",className:"w-28 ".concat(y?"connected":"disconnected"),onClick:y?P:()=>{F&&(O.isConnected&&P(),O.connect(F),E(O.isConnected))},children:y?"Disconnect":"Connect"})]}),(0,n.jsx)(r.Z,{variant:"warning",className:"m-2 w-52",onClick:()=>{S(e=>!e)},children:N?"Hide Controller Debug":"Show Controller Debug"}),"undefined"!=typeof navigator&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(0,n.jsx)(r.Z,{variant:"secondary",className:"m-2 w-52",onClick:()=>{if(e){alert("Diconnect gamepad before using touch joystick.");return}C(e=>!e)},children:k?"Hide Joystick":"Show Joystick"}):(0,n.jsx)(n.Fragment,{}),(0,n.jsxs)("p",{className:"my-0 ml-2",children:["Last message to websocket: ",g]})]}),N?(0,n.jsx)("div",{className:"flex flex-col min-w-80 w-3/4",children:(0,n.jsx)(c,{axes:null==e?void 0:e.axes,buttons:null==e?void 0:e.buttons,last_message:g,dead_man_switch:w,gamepadType:s})}):null]})};function w(){let[e,t]=(0,a.useState)(0),[s,l]=(0,a.useState)("Forward");return(0,n.jsxs)("div",{className:"h-screen w-screen bg-bluegrass",children:[(0,n.jsx)(o.Z,{title:"Admin"}),(0,n.jsx)(x,{})]})}s(1068)},7775:function(e,t,s){"use strict";var n=s(7437);s(2265);var o=s(6691),a=s.n(o);t.Z=e=>{let{title:t}=e;return(0,n.jsx)("div",{className:"top-bar container-center bg-midnight shadow-lg text-white p-4 w-full h-[10%]",children:(0,n.jsxs)("div",{className:"flex flex-row",children:[(0,n.jsx)(a(),{className:"w-auto h-auto",src:"/kora-logo.png",alt:"KORA Logo",width:100,height:50}),(0,n.jsxs)("h1",{className:"text-4xl italic font-bold ml-3",children:[" ",t," "]})]})})}}},function(e){e.O(0,[344,986,243,971,938,744],function(){return e(e.s=3911)}),_N_E=e.O()}]);