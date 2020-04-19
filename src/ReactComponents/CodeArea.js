// import React, {useState} from "react";
// import './CodeArea.css';

// function CodeArea() {
//     const [code] = useState(
//         "import java.io.*;\npublic class MyClass {\n\tpublic static void main(String args[]) throws Exception {\n\t\tBufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n\t\tString s = br.readLine();\n\t\tSystem.out.println(s);\n\t}\n}"
//         );
//     return (
//         <div className="CodeArea-code-div">
//             <code><textarea className="CodeArea-textarea" wrap="off" spellcheck="false" onChange={makeCodePretty}>{code}</textarea></code>
//         </div>
//     );
// }

// function makeCodePretty() {

    
// }

// export default CodeArea;

import React, {useState} from "react";
import './CodeArea.css';
const $ = window.$;

function CodeArea() {
    const [code] = useState(`
                <div>import java.io.*;</div>
                <div>public class MyClass {</div>
                <div>public static void main(String args[]) throws Exception {</div>
                <div>BufferedReader br = new BufferedReader(new InputStreamReader(System.in));</div>
                <div>String s = br.readLine();</div>
                <div>System.out.println(s);</div>
                <div>}</div>
            <div>}</div>
        `);
    return (
        <div className="container">
            <code><div contentEditable="true" className="CodeArea-textarea" wrap="off" spellCheck="false" onKeyUp={makeCodePretty}></div></code>
        </div>
    );
}

function makeCodePretty(event) {
    let keyCode = event.keyCode;
    
    
    if(keyCode == 13 || keyCode == 32 || keyCode == 8) {
        console.log(event.keyCode);
    }
    


//     document.querySelector('.CodeArea-textarea').innerHTML = `
//     <div>import java.io.*;</div>
//     <div>public class MyClass {</div>
//     <div>public static void main(String args[]) throws Exception {</div>
//     <div>BufferedReader br = new BufferedReader(new InputStreamReader(System.in));</div>
//     <div>String s = br.readLine();</div>
//     <div>System.out.println(s);</div>
//     <div>}</div>
// <div>}</div>
// `;
    
}

export default CodeArea;