(this["webpackJsonpprogramming-wiki"]=this["webpackJsonpprogramming-wiki"]||[]).push([[0],[,,,,function(e,t,r){e.exports=r(12)},,,,,function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(2),o=r.n(c),d=(r(9),r(3)),i=(r(10),{abstractKeyWord:"#569cd6",classKeyWord:"#569cd6",constKeyWord:"#569cd6",enumKeyWord:"#569cd6",extendsKeyWord:"#569cd6",falseKeyWord:"#569cd6",finalKeyWord:"#569cd6",gotoKeyWord:"#569cd6",implementsKeyWord:"#569cd6",importKeyWord:"#569cd6",instanceofKeyWord:"#569cd6",interfaceKeyWord:"#569cd6",nativeKeyWord:"#569cd6",nullKeyWord:"#569cd6",packageKeyWord:"#569cd6",privateKeyWord:"#569cd6",protectedKeyWord:"#569cd6",publicKeyWord:"#569cd6",staticKeyWord:"#569cd6",strictfpKeyWord:"#569cd6",superKeyWord:"#569cd6",synchronizedKeyWord:"#569cd6",thisKeyWord:"#569cd6",throwsKeyWord:"#569cd6",transientKeyWord:"#569cd6",trueKeyWord:"#569cd6",volatileKeyWord:"#569cd6",assertKeyWord:"#c586c0",breakKeyWord:"#c586c0",caseKeyWord:"#c586c0",catchKeyWord:"#c586c0",continueKeyWord:"#c586c0",defaultKeyWord:"#c586c0",doKeyWord:"#c586c0",elseKeyWord:"#c586c0",finallyKeyWord:"#c586c0",forKeyWord:"#c586c0",ifKeyWord:"#c586c0",newKeyWord:"#c586c0",returnKeyWord:"#c586c0",switchKeyWord:"#c586c0",throwKeyWord:"#c586c0",tryKeyWord:"#c586c0",voidKeyWord:"#c586c0",whileKeyWord:"#c586c0",booleanKeyWord:"#4ec9b0",byteKeyWord:"#4ec9b0",charKeyWord:"#4ec9b0",doubleKeyWord:"#4ec9b0",floatKeyWord:"#4ec9b0",intKeyWord:"#4ec9b0",longKeyWord:"#4ec9b0",shortKeyWord:"#4ec9b0"}),l=window.$;function s(e){var t=e.keyCode;if(32==t){e.preventDefault();var r=window.getSelection(),n=r.getRangeAt(0),a=l(e.target).text().length-n.startContainer.wholeText.length+n.startOffset;l(e.target).html(l(e.target).text().substring(0,a)+" "+l(e.target).text().substring(a)),y(l(e.target),r,n,a+1," ")}else if(9==t){e.preventDefault();var c=window.getSelection(),o=c.getRangeAt(0),d=l(e.target).text().length-o.startContainer.wholeText.length+o.startOffset;l(e.target).html(l(e.target).text().substring(0,d)+"&#09;"+l(e.target).text().substring(d)),y(l(e.target),c,o,d+1,"&#09;")}else if(13==t&&l(e.target).text().length>0){e.preventDefault();var i=window.getSelection(),s=i.getRangeAt(0),g=l(e.target).text().length-s.startContainer.wholeText.length+s.startOffset,K=10==l(e.target).text().charCodeAt(g)?"&#10;":"&#10;&#10;";l(e.target).html(l(e.target).text().substring(0,g)+K+l(e.target).text().substring(g)),y(l(e.target),i,s,g+1,K)}}function y(e,t,r,n,a){for(var c="",o="",d=e.html(),l=0;l<d.length;l++)c+=d.charAt(l),""==(d.charAt(l)+"").trim()&&0!=o.length?(i[o+"KeyWord"]&&(c=c.substring(0,c.length-o.length-1)+"<span style='color: "+i[o+"KeyWord"]+"'>"+o+"</span>"+a),o=""):o+=d.charAt(l);e.html(c);for(var s=0;s<n;s++)t.modify("move","right","character")}var g=function(){var e=Object(n.useState)("\n                <div>import java.io.*;</div>\n                <div>public class MyClass {</div>\n                <div>public static void main(String args[]) throws Exception {</div>\n                <div>BufferedReader br = new BufferedReader(new InputStreamReader(System.in));</div>\n                <div>String s = br.readLine();</div>\n                <div>System.out.println(s);</div>\n                <div>}</div>\n            <div>}</div>\n        ");return Object(d.a)(e,1)[0],a.a.createElement("div",{className:"container"},a.a.createElement("code",null,a.a.createElement("pre",{contentEditable:"true",className:"CodeArea-textarea",wrap:"off","tab-size":"4",spellCheck:"false",onKeyDown:s})))};r(11);var K=function(){return a.a.createElement("div",{className:"container"},a.a.createElement("header",null,a.a.createElement("h1",{style:{textAlign:"center"}},"App Header")),a.a.createElement("div",null,a.a.createElement("h1",{style:{textAlign:"center"}},"App Body"),a.a.createElement("h3",null,"React Components to Build:"),a.a.createElement("p",{style:{marginLeft:"0px"}},"Text"),a.a.createElement("p",{style:{marginLeft:"20px"}},"Code"),a.a.createElement("p",{style:{marginLeft:"20px"}},"Headings"),a.a.createElement("p",{style:{marginLeft:"20px"}},"Unordered Lists"),a.a.createElement("p",{style:{marginLeft:"20px"}},"Ordered Lists"),a.a.createElement("p",{style:{marginLeft:"0px"}},"Code Textarea"),a.a.createElement(g,null),a.a.createElement("p",{style:{marginLeft:"0px"}},"Console")),a.a.createElement("footer",null,a.a.createElement("h1",{style:{textAlign:"center"}},"App Footer")))};o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(K,null)),document.getElementById("root"))}],[[4,1,2]]]);
//# sourceMappingURL=main.13f0f087.chunk.js.map