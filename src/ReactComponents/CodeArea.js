import React, {useState} from "react";
import './CodeArea.css';
import makeCodeAreaPretty from "../scripts/makeCodeAreaPretty.js";

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
            <code>
                <pre 
                    contentEditable="true" 
                    className="CodeArea-textarea" 
                    wrap="off" 
                    tab-size="4"
                    spellCheck="false" 
                    onKeyDown={makeCodeAreaPretty}
                >
                </pre>
            </code>
        </div>
    );
}

export default CodeArea;