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
            <code><div contentEditable="true" className="CodeArea-textarea" wrap="off" spellCheck="false" onKeyDown={makeCodePretty}></div></code>
        </div>
    );
}

function makeCodePretty(event) {
    let keyCode = event.keyCode;

    //TODO Make it so that when tab, space, or enter is pressed, a new div with class code-segment is created and the selection/cursor is moved appropriately
    

    //Tab key pressed
    if(keyCode == 9) {
        event.preventDefault();
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        range.deleteContents();
        let newNode = document.createElement("div");
        newNode.classList.add("CodeArea-code-segment");
        range.insertNode(newNode);

        newNode.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;"

        $(newNode).appendTo($(newNode).closest('.CodeArea-textarea'));

        for(let position = 0; position != 4; position++)
        {
            selection.modify("move", "right", "character");
        }
    }
    //Enter key pressed
    else if(keyCode == 13) {
        event.preventDefault();
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        range.deleteContents();
        let newNode = document.createElement("div");
        newNode.classList.add("CodeArea-code-segment");
        newNode.innerHTML = "&#8203;"; //Empty character
    
        range.insertNode(newNode);
        $(document.createElement("br")).appendTo($(newNode).closest('.CodeArea-textarea'));
        $(newNode).appendTo($(newNode).closest('.CodeArea-textarea'));
        
        selection.modify("move", "right", "line");
    } 
    //Space key pressed
    else if(keyCode == 32) {
        console.log(event.keyCode);
    }
    //Backspace key pressed
    else if(keyCode == 8) {
        
        //Make it so that if the current div is empty and the previous child is a <br>, then backspace twice
        console.log(event.keyCode);
    }
}

function updateCodeArea() {

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
    


export default CodeArea;