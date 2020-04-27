import javaDarkTheme from "../CodingLanguagePacks/javaDarkTheme.js";
const $ = window.$;

//TODO:
    //Update the backspace & delete key to check for a tab-sized sequence of spaces?
        //only if numSpaces%tabsize==0, otherwise delete a single space
    //Tab size should be determined from the toolbar selection
    //Parentheses and brackets
        //ghost brackets that fully appear when you hit enter?
        //Go down an extra line and auto-tab to the same spot as the previous line

//BUGS:

    //colors don't update when brackets are touching the keywords
        //Ex: if() else{}

    //When pasting content, it should paste without formatting, then update the colors
        //formatting meaning font-type, font-size, boldness, background-color, etc. 
            //keep the spaces and tabs and stuff
                //do I need to convert tabs to spaces??
                    // and update them to the corresponding tab-size selected?

    //Angle brackets treated as HTML

//NICE TO DO: 
    //Change updateColors to run every keydown and click event?
        //Right now if I type a full keyword, it only updates when I hit space, tab, or enter. Would be nice if it updated when I moved arrow keys, or more generally updated the cursor position


function makeCodeAreaPretty(event) {
    let keyCode = event.keyCode;
    let eventTarget = $(event.target);
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let cursorIndex = getCursorIndex(event.target, selection);

    //Space key pressed
    if(keyCode === 32) {
        event.preventDefault();
        
        let space = " ";

        eventTarget.html(
            eventTarget.text().substring(0, cursorIndex) + //All text up until the cursor
            space +
            eventTarget.text().substring(cursorIndex) //All text after the cursor
        );
        updateColors(eventTarget);
        moveCursorToNewPosition(selection, cursorIndex + 1);
    }    
    //Tab key pressed
    else if(keyCode === 9) {
        event.preventDefault();
        
        let tab = "    "; //BUILD THIS FROM THE TAB SIZE SELECTED

        eventTarget.html(
            eventTarget.text().substring(0, cursorIndex) + //All text up until the cursor
            tab +
            eventTarget.text().substring(cursorIndex) //All text after the cursor
        );

        updateColors(eventTarget);
        moveCursorToNewPosition(selection, cursorIndex + tab.length);
    }
    //Enter key pressed
    else if(keyCode === 13) {
        
        if(eventTarget.text().length > 0) {
            event.preventDefault();

            let newLine = range.startOffset >= range.startContainer.wholeText.length ? "\n\r": "\n"; //If cursor is at the end of the line, add carriage return

            eventTarget.html(
                eventTarget.text().substring(0, cursorIndex) + //All text up until the cursor
                newLine + 
                eventTarget.text().substring(cursorIndex) //All text after the cursor
            );

            updateColors(eventTarget);
            moveCursorToNewPosition(selection, cursorIndex + 1);
        }
    } 

    //Backspace key pressed
    else if(keyCode === 8) {

    }
    //Delete key pressed
    else if(keyCode === 46) {

    }
    //Left arrow, up arrow, right arrow, down arrow, end key, home key, page up key, page down key
    // else if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40 
    //          || keyCode === 35 || keyCode === 36 || keyCode === 33 || keyCode === 34) {
    //     updateColors(eventTarget);
    // }
}

function updateColors(eventTarget) { 
    
    let currentHTML = "", currentWord = "", text = eventTarget.html();

    for(let i = 0; i < text.length; i++) {

        currentHTML += text.charAt(i);

        if((text.charAt(i) + "").trim() === "") { //USE REGEX INSTEAD?????????????????????????
            //Check if currentWord is a keyword
            if(javaDarkTheme[currentWord + "KeyWord"]) {

                //Wrap in a <span> with its color 
                currentHTML = currentHTML.substring(0, currentHTML.length - currentWord.length - 1) + 
                              "<span style='color: " + javaDarkTheme[currentWord + "KeyWord"] + "'>" + currentWord + "</span>" +
                              currentHTML.charAt(currentHTML.length-1);
            }
            currentWord = "";
        }
        else {
            currentWord += text.charAt(i);
        }
    }

    eventTarget.html(currentHTML);
}

function getCursorIndex(eventTarget, selection) {

    let nodeCtr = 0;
    let charCtr = 0;
    let selectionNode = selection.anchorNode.parentNode.nodeName === "SPAN" ? selection.anchorNode.parentNode : selection.anchorNode;
    let currentNode = eventTarget.childNodes[0];

    while(currentNode !== undefined && currentNode !== selectionNode) {
        nodeCtr++;
        charCtr += currentNode.textContent.length;
        currentNode = eventTarget.childNodes[nodeCtr];
    }

    return charCtr + selection.getRangeAt(0).startOffset;
}

//Move the cursor caret to the new cursor index
function moveCursorToNewPosition(selection, cursorIndex) {
    for(let i = 0; i < cursorIndex; i++) {
        selection.modify("move", "right", "character");
    }
}

export default makeCodeAreaPretty;