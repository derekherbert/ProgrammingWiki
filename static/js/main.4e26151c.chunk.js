(this["webpackJsonpprogramming-wiki"]=this["webpackJsonpprogramming-wiki"]||[]).push([[0],[,,,,function(e,t,n){e.exports=n(12)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(2),l=n.n(i),o=(n(9),n(3)),d=(n(10),window.$);function c(e){var t=e.keyCode;if(9==t){e.preventDefault();var n=window.getSelection(),a=n.getRangeAt(0);a.deleteContents();var r=document.createElement("div");r.classList.add("CodeArea-code-segment"),a.insertNode(r),r.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;",d(r).appendTo(d(r).closest(".CodeArea-textarea"));for(var i=0;4!=i;i++)n.modify("move","right","character")}else if(13==t){e.preventDefault();var l=window.getSelection(),o=l.getRangeAt(0);o.deleteContents();var c=document.createElement("div");c.classList.add("CodeArea-code-segment"),c.innerHTML="&#8203;",o.insertNode(c),d(document.createElement("br")).appendTo(d(c).closest(".CodeArea-textarea")),d(c).appendTo(d(c).closest(".CodeArea-textarea")),l.modify("move","right","line")}else(32==t||8==t)&&console.log(e.keyCode)}var s=function(){var e=Object(a.useState)("\n                <div>import java.io.*;</div>\n                <div>public class MyClass {</div>\n                <div>public static void main(String args[]) throws Exception {</div>\n                <div>BufferedReader br = new BufferedReader(new InputStreamReader(System.in));</div>\n                <div>String s = br.readLine();</div>\n                <div>System.out.println(s);</div>\n                <div>}</div>\n            <div>}</div>\n        ");return Object(o.a)(e,1)[0],r.a.createElement("div",{className:"container"},r.a.createElement("code",null,r.a.createElement("div",{contentEditable:"true",className:"CodeArea-textarea",wrap:"off",spellCheck:"false",onKeyDown:c})))};n(11);var m=function(){return r.a.createElement("div",{className:"container"},r.a.createElement("header",null,r.a.createElement("h1",{style:{textAlign:"center"}},"App Header")),r.a.createElement("div",null,r.a.createElement("h1",{style:{textAlign:"center"}},"App Body"),r.a.createElement("h3",null,"React Components to Build:"),r.a.createElement("p",{style:{marginLeft:"0px"}},"Text"),r.a.createElement("p",{style:{marginLeft:"20px"}},"Code"),r.a.createElement("p",{style:{marginLeft:"20px"}},"Headings"),r.a.createElement("p",{style:{marginLeft:"20px"}},"Unordered Lists"),r.a.createElement("p",{style:{marginLeft:"20px"}},"Ordered Lists"),r.a.createElement("p",{style:{marginLeft:"0px"}},"Code Textarea"),r.a.createElement(s,null),r.a.createElement("p",{style:{marginLeft:"0px"}},"Console")),r.a.createElement("footer",null,r.a.createElement("h1",{style:{textAlign:"center"}},"App Footer")))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(m,null)),document.getElementById("root"))}],[[4,1,2]]]);
//# sourceMappingURL=main.4e26151c.chunk.js.map