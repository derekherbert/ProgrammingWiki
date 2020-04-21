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
            <code><pre contentEditable="true" className="CodeArea-textarea" wrap="off" tab-size="4"spellCheck="false" onKeyDown={makeCodePretty}></pre></code>
        </div>
    );
}

function makeCodePretty(event) {
    let keyCode = event.keyCode;

    //TODO:
        //Can I have tabs and spaces on the same line?
            //Maybe switch the tab character out for 4[tab-size] spaces? 
                //Also update the backspace to check for a tab-sized sequence of spaces?

    //Space key pressed
    if(keyCode == 32) {
        event.preventDefault();
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        let cursorIndex = $(event.target).text().length - range.startContainer.wholeText.length + range.startOffset;
        let space = " ";

        $(event.target).html(
            $(event.target).text().substring(0, cursorIndex) + //All text up until the cursor
            space +
            $(event.target).text().substring(cursorIndex) //All text after the cursor
        );

        updateColors($(event.target), selection, range, cursorIndex + 1, space);
    }    
    //Tab key pressed
    else if(keyCode == 9) {
        event.preventDefault();
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        let cursorIndex = $(event.target).text().length - range.startContainer.wholeText.length + range.startOffset;
        let tab = "&#09;"; //HTML code for tab

        $(event.target).html(
            $(event.target).text().substring(0, cursorIndex) + //All text up until the cursor
            tab +
            $(event.target).text().substring(cursorIndex) //All text after the cursor
        );

        updateColors($(event.target), selection, range, cursorIndex + 1, tab);
    }
    //Enter key pressed
    else if(keyCode == 13) {
        
        if($(event.target).text().length > 0) {
            event.preventDefault();
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let cursorIndex = $(event.target).text().length - range.startContainer.wholeText.length + range.startOffset;
            let newLine = $(event.target).text().charCodeAt(cursorIndex) == 10 ? "&#10;" : "&#10;&#10;"; //Double line feed needed when text is present on current line
            
            $(event.target).html(
                $(event.target).text().substring(0, cursorIndex) + //All text up until the cursor
                newLine + //line feed
                $(event.target).text().substring(cursorIndex) //All text after the cursor
            );

            updateColors($(event.target), selection, range, cursorIndex + 1, newLine);
        }
    } 
}

function updateColors(eventTarget, selection, range, cursorIndex, character) {

    let currentHTML = "", currentWord = "", html = eventTarget.html();

    for(let i = 0; i < html.length; i++) {

        currentHTML += html.charAt(i);

        if((html.charAt(i) + "").trim() == "" && currentWord.length != 0) { //USE REGEX INSTEAD?????????????????????????
            //Check if currentWord is a keyword
            if(javaDarkTheme[currentWord + "KeyWord"]) {

                //Wrap in a <span> with its color 
                currentHTML = currentHTML.substring(0, currentHTML.length - currentWord.length - 1) + 
                              "<span style='color: " + javaDarkTheme[currentWord + "KeyWord"] + "'>" + currentWord + "</span>" + 
                              character;
            }
            
            currentWord = "";
        }
        else {
            currentWord += html.charAt(i);
        }
    }

    eventTarget.html(currentHTML);

    //Move the cursor caret to the new cursor index
    for(let i = 0; i < cursorIndex; i++) {
        selection.modify("move", "right", "character");
    }
}

export default CodeArea;