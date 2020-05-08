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

    //Comments -> // and /* and /** */

//BUGS:

    // if | else
        //Cursor between the if and else, hitting enter shoves else two lines down instead of one

    //Copy and pasting spans pastes a new <pre> tag with the span inside

    //When pasting content, it should paste without formatting, then update the colors
        //formatting meaning font-type, font-size, boldness, background-color, etc. 
            //keep the spaces and tabs and stuff
                //do I need to convert tabs to spaces??
                    // and update them to the corresponding tab-size selected?

    //Angle brackets treated as HTML

//NICE TO DO: 

function makeCodeAreaPretty(event) {
       
    if(!event.ctrlKey && !event.altKey) {

        let keyCode = event.keyCode;
        let key = event.key;
        
        //Delete any highlighted/selected text before processing the keydown event
        let clearedText = false;
        if(key.trim().length === 1 || keyCode === 32 || keyCode === 9 || keyCode === 13 || keyCode === 8 || keyCode === 46) { 
            clearedText = clearHighlightedText(event.target);
        }
        
        let eventTarget = $(event.target);
        let selection = window.getSelection();
        let cursorIndex = getCursorIndex(event.target, selection);
        let newCursorIndex = cursorIndex + 1;
        let insertChar = false;
        let characterToInsert = "";

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
                characterToInsert = selection.focusOffset >= selection.anchorNode.wholeText.length ? "\n\r": "\n"; //If cursor is at the end of the line, add carriage return
                insertChar = true;
            }
        } 

        //Backspace key pressed
        else if(keyCode === 8) {
            event.preventDefault();
            
            //If there was highlighted/selected text and the user pressed Backspace, clearHighlightedText() has handled this already
            if(!clearedText) {
                //Update html as text (removes all spans)
                eventTarget.html(
                    eventTarget.text().substring(0, cursorIndex - 1) + //All text up until the one character before cursor
                    eventTarget.text().substring(cursorIndex) //All text after the cursor
                );
                cursorIndex -= 1;
            }

            updateColors(eventTarget);
            moveCursorToNewPosition(selection, cursorIndex);
        }
        //Delete key pressed
        else if(keyCode === 46) {
            event.preventDefault();

            //If there was highlighted/selected text and the user pressed Delete, clearHighlightedText() has handled this already
            if(!clearedText) {
                //Update html as text (removes all spans)
                eventTarget.html(
                    eventTarget.text().substring(0, cursorIndex) + //All text up until the one character before cursor
                    eventTarget.text().substring(cursorIndex + 1) //All text after the cursor
                );
            }

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

/**
 * Cycles through the CodeArea's contents which have been converted to their text 
 * values (no html tags) prior to calling this method. Each word that matches a keyword
 * is added as a <span> with its corresponding colour. The keyword/color mappings are found
 * in separate files.  
 * 
 * @param {$(event.target)} eventTarget 
 */
function updateColors(eventTarget) { 
    let currentHTML = "", currentWord = "", currentComment = "//", text = eventTarget.html() + " "; //Add extra space so the last word is processed
    let processingComment = false;

    for(let i = 0; i < text.length; i++) {

        currentHTML += text.charAt(i);

        //Check for single-line comment (//)
        if(processingComment || (text.charAt(i-1) === "/" && text.charAt(i-2) === "/")) {
            
            if(text.charAt(i) === "\n" || i === text.length - 1) {
                currentHTML = currentHTML.substring(0, currentHTML.length - currentComment.length - 1) + 
                            "<span class='CodeArea-comment-span'>" + currentComment + "</span>\n";
                currentComment = "//";
                processingComment = false;
            }
            else {
                currentComment += text.charAt(i);
                processingComment = true;
            }
        }
        //Check for language keyword
        else if(text.charAt(i).match(/[^a-z_]/i)) { //character is not a letter (case-insensitive) or underscore
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

    eventTarget.html(currentHTML.substring(0, currentHTML.length-1)); //Remove the extra space that was added at the end
}

/**
 * Cycles through each node in the CodeArea (a series of text nodes and span tags) to 
 * find the "absolute" cursor position in the entire CodeArea. window.getSelection() only
 * gives the relative cursor position within the current node. 
 * 
 * @param {event.target} eventTarget 
 * @param {window.getSelection()} selection 
 */
function getCursorIndex(eventTarget, selection) {

    if(selection.anchorNode.nodeName === "PRE") return 0; //If selection 

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

/**
 * Moves the cursor caret from the beginning of the CodeArea to the 
 * specified "absolute" cursor index.
 * 
 * @param {window.getSelection()} selection 
 * @param {int} cursorIndex 
 */ 
function moveCursorToNewPosition(selection, cursorIndex) {
    for(let i = 0; i < cursorIndex; i++) {
        selection.modify("move", "right", "character");
    }
}

/**
 * If selection.isCollapsed === false, the user has some text highlighted/selected when 
 * they triggered the keydown event. All nodes between then anchorNode and focusNode (inclusive) 
 * are removed. This takes into account selections that are in the middle of a node, selections
 * that are within a single node, and selections that span multiple nodes. 
 * 
 * The anchorNode and focusNode mark the beginning and end of a selection:
 *    - If a user selects from left-to-right, the anchorNode will be on the left and the focusNode will be on the right. 
 *    - If a user selects from right-to-left, the anchorNode will be on the right and the focusNode will be on the left.  
 * 
 * @param {event.target} eventTarget 
 * @returns {boolean} true if selection is collapsed
 */
function clearHighlightedText(eventTarget) {
    let selection = window.getSelection();

    //There is text highlighted/selected
    if(!selection.isCollapsed) { 
        
        //anchorNode => node in which selection starts 
        let anchorNode = selection.anchorNode.parentNode.nodeName === "SPAN" ? selection.anchorNode.parentNode : selection.anchorNode;
        //focusNode => node in which selection ends
        let focusNode = selection.focusNode.parentNode.nodeName === "SPAN" ? selection.focusNode.parentNode : selection.focusNode;
        let currentText = "";
        let newCursorIndex;

        if(anchorNode === focusNode) {

            newCursorIndex = getCursorIndex(eventTarget, selection);
            
            if(selection.anchorOffset > selection.focusOffset) {
                currentText =  $(eventTarget).text().substring(0, newCursorIndex) + $(eventTarget).text().substring(selection.anchorOffset);
            }
            else {
                currentText =  $(eventTarget).text().substring(0, newCursorIndex) + $(eventTarget).text().substring(selection.focusOffset);
            }
        }
        else {
            
            let foundFirst = false;
            let foundSecond = false;
            document.querySelector('pre').childNodes.forEach( 
                function(currentNode) { 
                    
                    //Add everything to the left of the anchor offset
                    if(anchorNode === currentNode) {
                        
                        if(!foundFirst) {
                            currentText += anchorNode.textContent.substring(0, selection.anchorOffset);
                            newCursorIndex = currentText.length;
                            foundFirst = true;
                        }
                        else {
                            currentText += anchorNode.textContent.substring(selection.anchorOffset);
                            foundSecond = true;
                        }

                        return;
                    } 
                    //Add everything to the right of the focus offset
                    if(focusNode === currentNode) {
                        
                        if(!foundFirst) {
                            currentText += focusNode.textContent.substring(0, selection.focusOffset);
                            newCursorIndex = currentText.length;
                            foundFirst = true;
                        }
                        else {
                            currentText += focusNode.textContent.substring(selection.focusOffset);
                            foundSecond = true;
                        }
                        return;
                    } 

                    //Only add nodes to the left and right of the selected nodes (exclude nodes in between)
                    if(!foundFirst || foundSecond) {
                        currentText += currentNode.textContent;
                    }
                }
            );
        }
        $(eventTarget).html(currentText);
        moveCursorToNewPosition(selection, newCursorIndex);
        return true;
    }
    return false;
}

export default makeCodeAreaPretty;