import React, {useState} from "react";
import './CodeArea.css';
import javaDarkTheme from "../CodingLanguagePacks/javaDarkTheme.js";
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
            <code><pre contentEditable="true" className="CodeArea-textarea" wrap="off" tab-size="4"spellCheck="false" onKeyDown={makeCodePretty} onKeyUp={updateColors}></pre></code>
        </div>
    );
}

function makeCodePretty(event) {
    let keyCode = event.keyCode;

    //Tab key pressed
    if(keyCode == 9) {
        event.preventDefault();
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        let cursorIndex = range.startOffset + 1;
        let tab = "&#09;";

        $(event.target).html(
            range.startContainer.textContent.substring(0, range.startOffset) + //All text up until the cursor
            tab +
            range.startContainer.textContent.substring(range.startOffset) //All text after the cursor
        );

        for(let i = 0; i < cursorIndex; i++) {
            selection.modify("move", "right", "character");
        }
    }
    //Enter key pressed
    else if(keyCode == 13) {
        event.preventDefault();
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        let cursorIndex = range.startOffset + 1;
        let newLine = range.startContainer.textContent.charCodeAt(range.startOffset - 1) == 10 ? "&#10;" : "&#10;&#10;"; //Double line feed needed when text is present on current line
        
        $(event.target).html(
            range.startContainer.textContent.substring(0, range.startOffset) + //All text up until the cursor
            newLine + //line feed
            range.startContainer.textContent.substring(range.startOffset) //All text after the cursor
        );

        //Move the cursor caret to the new cursor index
        for(let i = 0; i < cursorIndex; i++) {
            selection.modify("move", "right", "character");
        }
    } 
}

function updateColors(event) {

    let currentHTML = "", currentWord = "", html = $(event.target).html();

    for(let i = 0; i < html.length; i++) {

        currentHTML += html.charAt(i);

        if((html.charAt(i) + "").trim() == "" && currentWord.length != 0) { //USE REGEX INSTEAD?????????????????????????
            //Check if currentWord is a keyword
            if(javaDarkTheme[currentWord + "KeyWord"]) {

                //Wrap in a <span> with its color 
                currentHTML += "<span style='color: " + javaDarkTheme[currentWord + "KeyWord"] + "'></span>";
            }
                //then change its color accordingly by enclosing it in a span
            

            currentWord = "";
        }
        else {
            currentWord += html.charAt(i);
            console.log("currentWord: " + currentWord);
            console.log("assert color: " + javaDarkTheme.assertKeyWord);
            console.log("asicbnia color: " + javaDarkTheme.asicbnia); //undefined
        }
    }

    $(event.target).html(currentHTML);
}

export default CodeArea;