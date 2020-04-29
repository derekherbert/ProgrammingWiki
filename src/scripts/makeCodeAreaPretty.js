import javaDarkTheme from "../CodingLanguagePacks/javaDarkTheme.js";
const $ = window.$;

//TODO:
    //Update the backspace & delete key to check for a tab-sized sequence of spaces?
        //only if numSpaces%tabsize==0, otherwise delete a single space
    //Tab size should be determined from the toolbar selection
    //Parentheses and brackets
        //ghost brackets that fully appear when you hit enter?
        //Go down an extra line and auto-tab to the same spot as the previous line
    //Auto-Tabbing 
        //When you hit enter, the next line gets auto-tabbed to the same position as the previous line
            //if the last real character in the previous line is an open bracket, tab in one extra
    //If a word starts with a capital, update the color (it is a class)

//BUGS:

    //I did a hack in which I set the default codearea value to be \n
        //if(eventTarget.text() == "") eventTarget.text("\n");
        //This causes an issue when I backspace into the beginning of the textarea but still have text to my right. It shoves everything on a new line.
        //I should fix updateColors to work properly on the first line


    //if some text is selected, then you type, it should type over it, but instead appends
        //same if you hit delete or backspace

    //Copy and pasting spans pastes a new <pre> tag with the span inside

    //When pasting content, it should paste without formatting, then update the colors
        //formatting meaning font-type, font-size, boldness, background-color, etc. 
            //keep the spaces and tabs and stuff
                //do I need to convert tabs to spaces??
                    // and update them to the corresponding tab-size selected?

    //Angle brackets treated as HTML

//NICE TO DO: 
    //Change updateColors to run every keydown and click event?
        //Right now if I type a full keyword, it only updates when I hit space, tab, or enter. Would be nice if it updated when I moved arrow keys, or more generally updated the cursor position
            //Or even nicer if it updated as soon as a keydown event occurs and the keyword is formed

function makeCodeAreaPretty(event) {
       
    if(!event.ctrlKey && !event.altKey) {

        let keyCode = event.keyCode;
        let key = event.key;
        let eventTarget = $(event.target);
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        let cursorIndex = getCursorIndex(event.target, selection);
        let newCursorIndex = cursorIndex + 1;
        let insertChar = false;
        let characterToInsert = "";

        if(eventTarget.text() == "") eventTarget.text("\n"); //Default text value is \n. This makes the updateColors() logic a bit simpler

        //Space key pressed
        if(keyCode === 32) {
            characterToInsert = " ";
            insertChar = true;
        }    
        //Tab key pressed
        else if(keyCode === 9) {
            characterToInsert = "    "; //BUILD THIS FROM THE TAB SIZE SELECTED
            newCursorIndex = cursorIndex + characterToInsert.length;
            insertChar = true;
        }
        //Enter key pressed
        else if(keyCode === 13) {
            if(eventTarget.text().length > 0) {
                characterToInsert = range.startOffset >= range.startContainer.wholeText.length ? "\n\r": "\n"; //If cursor is at the end of the line, add carriage return
                insertChar = true;
            }
        } 

        //Backspace key pressed
        else if(keyCode === 8) {
            event.preventDefault();
            
            //Update html as text (removes all spans)
            eventTarget.html(
                eventTarget.text().substring(0, cursorIndex - 1) + //All text up until the one character before cursor
                eventTarget.text().substring(cursorIndex) //All text after the cursor
            );

            updateColors(eventTarget);
            moveCursorToNewPosition(selection, cursorIndex - 1);
        }
        //Delete key pressed
        else if(keyCode === 46) {
            event.preventDefault();
            
            //Update html as text (removes all spans)
            eventTarget.html(
                eventTarget.text().substring(0, cursorIndex) + //All text up until the one character before cursor
                eventTarget.text().substring(cursorIndex + 1) //All text after the cursor
            );

            updateColors(eventTarget);
            moveCursorToNewPosition(selection, cursorIndex);
        }
        
        //Any character/symbol (excluding special keys like ALT, CTRL, SPACE, PGDOWN, etc)
        if(key.trim().length === 1 || insertChar) {
            event.preventDefault();

            if(characterToInsert === "") {
                characterToInsert = key;
            }

            //Update html as text (removes all spans)
            eventTarget.html(
                eventTarget.text().substring(0, cursorIndex) + //All text up until the cursor
                characterToInsert +
                eventTarget.text().substring(cursorIndex) //All text after the cursor
            );

            updateColors(eventTarget);
            moveCursorToNewPosition(selection, newCursorIndex);
        }
    }
}

function updateColors(eventTarget) { 
    
    let currentHTML = "", currentWord = "", text = eventTarget.html();

    for(let i = 0; i <= text.length; i++) {

        currentHTML += text.charAt(i);

        if(text.charAt(i).match(/[^a-z_]/i)) { //character is not a letter (case-insensitive) or underscore
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