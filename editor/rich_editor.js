/**
 * Copyright (C) 2017 Wasabeef
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var RE = {};







RE.currentSelection = {
  "startContainer": 0,
  "startOffset": 0,
  "endContainer": 0,
  "endOffset": 0
};

RE.editor = document.getElementById('editor');

document.addEventListener("selectionchange", function() {
  RE.backuprange();
});

// Initializations
RE.callback = function() {
  window.location.href = "re-callback://" + encodeURI(RE.getHtml());
  // alert(RE.isBold());
  // alert(RE.isItalic());
  // alert(RE.isUnderline());

  callUpdateAll();
}

RE.setHtml = function(contents) {
  RE.editor.innerHTML = decodeURIComponent(contents.replace(/\+/g, '%20'));
}

RE.getHtml = function() {
  return RE.editor.innerHTML;
}

RE.getText = function() {
  return RE.editor.innerText;
}

RE.setBaseTextColor = function(color) {
  RE.editor.style.color = color;
}

RE.setBaseFontSize = function(size) {
  RE.editor.style.fontSize = size;
}

RE.setPadding = function(left, top, right, bottom) {
  RE.editor.style.paddingLeft = left;
  RE.editor.style.paddingTop = top;
  RE.editor.style.paddingRight = right;
  RE.editor.style.paddingBottom = bottom;
}

RE.setBackgroundColor = function(color) {
  document.body.style.backgroundColor = color;
}

RE.setBackgroundImage = function(image) {
  RE.editor.style.backgroundImage = image;
}

RE.setWidth = function(size) {
  RE.editor.style.minWidth = size;
}

RE.setHeight = function(size) {
  RE.editor.style.height = size;
}

RE.setTextAlign = function(align) {
  RE.editor.style.textAlign = align;
}

RE.setVerticalAlign = function(align) {
  RE.editor.style.verticalAlign = align;
}

RE.setPlaceholder = function(placeholder) {
  RE.editor.setAttribute("placeholder", placeholder);
}

RE.setInputEnabled = function(inputEnabled) {
  RE.editor.contentEditable = String(inputEnabled);
}

RE.undo = function() {
  document.execCommand('undo', false, null);
}

RE.redo = function() {
  document.execCommand('redo', false, null);
}

RE.setBold = function() {
  document.execCommand('bold', false, null);

  var formattingData = [RE.isBold()];
  callAndroidUpdate(formattingData);
  // alert(RE.isBold());
}

RE.setItalic = function() {
  document.execCommand('italic', false, null);

  var formattingData = [RE.isItalic()];
  callAndroidUpdate(formattingData);
  // alert(RE.isItalic());
}

RE.setUnderline = function() {
  document.execCommand('underline', false, null);

  var formattingData = [RE.isUnderline()];
  callAndroidUpdate(formattingData);
  // alert(RE.isUnderline());
}

RE.setSubscript = function() {
  document.execCommand('subscript', false, null);
}

RE.setSuperscript = function() {
  document.execCommand('superscript', false, null);
}

RE.setStrikeThrough = function() {
  document.execCommand('strikeThrough', false, null);
  var formattingData = [RE.isStrikeThrough()];
  callAndroidUpdate(formattingData);
}



RE.setBullets = function() {
  document.execCommand('insertUnorderedList', false, null);
  var formattingData = [RE.isUnorderedList()];
  callAndroidUpdate(formattingData);
}

RE.setNumbers = function() {
  document.execCommand('insertOrderedList', false, null);
  var formattingData = [RE.isOrderedList()];
  callAndroidUpdate(formattingData);
}

RE.setTextColor = function(color) {
  RE.restorerange();
  document.execCommand("styleWithCSS", null, true);
  document.execCommand('foreColor', false, color);
  document.execCommand("styleWithCSS", null, false);


  var formattingData = [RE.getColor()];
  callAndroidUpdate(formattingData);
  // alert(RE.getColor());
}

RE.setTextBackgroundColor = function(color) {
  RE.restorerange();
  document.execCommand("styleWithCSS", null, true);
  document.execCommand('hiliteColor', false, color);
  document.execCommand("styleWithCSS", null, false);
}

RE.setFontSize = function(fontSize) {
  document.execCommand("fontSize", false, fontSize);
}

RE.setHeading = function(heading) {
  document.execCommand('formatBlock', false, '<h' + heading + '>');
}

RE.setIndent = function() {
  document.execCommand('indent', false, null);
}

RE.setOutdent = function() {
  document.execCommand('outdent', false, null);
}

RE.setJustifyLeft = function() {
  document.execCommand('justifyLeft', false, null);
}

RE.setJustifyCenter = function() {
  document.execCommand('justifyCenter', false, null);
}

RE.setJustifyRight = function() {
  document.execCommand('justifyRight', false, null);
}

RE.setJustifyFull = function() {
  document.execCommand('justifyFull', false, null);
}

RE.setBlockquote = function() {
  document.execCommand('formatBlock', false, '<blockquote>');
}

RE.insertImage = function(url, alt) {
  var html = '<img src="' + url + '" alt="' + alt + '" />';
  RE.insertHTML(html);
}

RE.insertHTML = function(html) {
  RE.restorerange();
  document.execCommand('insertHTML', false, html);
}

RE.insertLink = function(url, title) {
  RE.restorerange();
  var sel = document.getSelection();
  if (sel.toString().length == 0) {
    document.execCommand("insertHTML", false, "<a href='" + url + "'>" + title + "</a>");
  } else if (sel.rangeCount) {
    var el = document.createElement("a");
    el.setAttribute("href", url);
    el.setAttribute("title", title);

    var range = sel.getRangeAt(0).cloneRange();
    range.surroundContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
  }
  RE.callback();
}

RE.setTodo = function(text) {
  var html = '<input type="checkbox" name="' + text + '" value="' + text + '"/> &nbsp;';
  document.execCommand('insertHTML', false, html);
}

RE.prepareInsert = function() {
  RE.backuprange();
}

RE.backuprange = function() {
  var selection = window.getSelection();
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0);
    RE.currentSelection = {
      "startContainer": range.startContainer,
      "startOffset": range.startOffset,
      "endContainer": range.endContainer,
      "endOffset": range.endOffset
    };
  }
}

RE.restorerange = function() {
  var selection = window.getSelection();
  selection.removeAllRanges();
  var range = document.createRange();
  range.setStart(RE.currentSelection.startContainer, RE.currentSelection.startOffset);
  range.setEnd(RE.currentSelection.endContainer, RE.currentSelection.endOffset);
  selection.addRange(range);
}

RE.enabledEditingItems = function(e) {
  var items = [];
  if (document.queryCommandState('bold')) {
    items.push('bold');
  }
  if (document.queryCommandState('italic')) {
    items.push('italic');
  }
  if (document.queryCommandState('subscript')) {
    items.push('subscript');
  }
  if (document.queryCommandState('superscript')) {
    items.push('superscript');
  }
  if (document.queryCommandState('strikeThrough')) {
    items.push('strikeThrough');
  }
  if (document.queryCommandState('underline')) {
    items.push('underline');
  }
  if (document.queryCommandState('insertOrderedList')) {
    items.push('orderedList');
  }
  if (document.queryCommandState('insertUnorderedList')) {
    items.push('unorderedList');
  }
  if (document.queryCommandState('justifyCenter')) {
    items.push('justifyCenter');
  }
  if (document.queryCommandState('justifyFull')) {
    items.push('justifyFull');
  }
  if (document.queryCommandState('justifyLeft')) {
    items.push('justifyLeft');
  }
  if (document.queryCommandState('justifyRight')) {
    items.push('justifyRight');
  }
  if (document.queryCommandState('insertHorizontalRule')) {
    items.push('horizontalRule');
  }
  var formatBlock = document.queryCommandValue('formatBlock');
  if (formatBlock.length > 0) {
    items.push(formatBlock);
  }

  window.location.href = "re-state://" + encodeURI(items.join(','));
}

RE.focus = function() {
  var range = document.createRange();
  range.selectNodeContents(RE.editor);
  range.collapse(false);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  RE.editor.focus();
}

RE.blurFocus = function() {
  RE.editor.blur();
}

RE.removeFormat = function() {
  document.execCommand('removeFormat', false, null);
}

// Event Listeners
RE.editor.addEventListener("input", RE.callback);
RE.editor.addEventListener("keyup", function(e) {
  var KEY_LEFT = 37,
    KEY_RIGHT = 39;
  if (e.which == KEY_LEFT || e.which == KEY_RIGHT) {
    RE.enabledEditingItems(e);
  }
});
RE.editor.addEventListener("click", RE.enabledEditingItems);






//23.12.2019 CherryDev
RE.isBold = function() {
  var isBold = "bold false";
  if (document.queryCommandState) {
    isBold = "bold " + document.queryCommandState("bold");
  }
  return isBold;
}

RE.isItalic = function() {
  var isItalic = "italic false";
  if (document.queryCommandState) {
    isItalic = "italic " + document.queryCommandState("italic");
  }
  return isItalic;
}

RE.isUnderline = function() {
  var underline = "underline false";
  if (document.queryCommandState) {
    underline = "underline " + document.queryCommandState("underline");
  }
  return underline;
}

RE.getColor = function() {
  var color = "color ";
  if (document.queryCommandValue) {
    var rgbString = document.queryCommandValue("ForeColor");
    colorValue = weeeeee(rgbString);

    color = "color " + colorValue;
  }
  return color;
}

RE.isStrikeThrough = function() {
  var strikethrough = "strikeThrough false";
  if (document.queryCommandState) {
    strikethrough = "strikeThrough " + document.queryCommandState("strikeThrough");
  }
  return strikethrough;
}
RE.isUnorderedList = function() {
  var unordered = "unordered false";
  if (document.queryCommandState) {
    unordered = "unordered " + document.queryCommandState("insertUnorderedList");
  }
  console.log(unordered);
  return unordered;
}
RE.isOrderedList = function() {
  var ordered = "ordered false";
  if (document.queryCommandState) {
    ordered = "ordered " + document.queryCommandState("insertOrderedList");
  }
  console.log(ordered);
  return ordered;
}

RE.getAlignment = function() {
  alignment = 'alignment ';

  if (document.queryCommandState('justifyCenter')) {
    alignment += 'justifyCenter';
  }
  if (document.queryCommandState('justifyFull')) {
    alignment += 'justifyFull';
  }
  if (document.queryCommandState('justifyLeft')) {
    alignment += 'justifyLeft';
  }
  if (document.queryCommandState('justifyRight')) {
    alignment += 'justifyRight';
  }

  // console.log(alignment);
  return alignment;
}



/*

if (document.queryCommandState('insertOrderedList')) {
  items.push('orderedList');
}
if (document.queryCommandState('insertUnorderedList')) {
  items.push('unorderedList');
}
if (document.queryCommandState('justifyCenter')) {
  items.push('justifyCenter');
}
if (document.queryCommandState('justifyFull')) {
  items.push('justifyFull');
}
if (document.queryCommandState('justifyLeft')) {
  items.push('justifyLeft');
}
if (document.queryCommandState('justifyRight')) {
  items.push('justifyRight');
}




*/


// RE.editor.addEventListener("input", function(){
//   alert(RE.isBold());
// });

// RE.editor.addEventListener("selectionchange", function() {
//   alert(RE.isBold());
//   alert(RE.isItalic());
//   alert(RE.isUnderline());
//   alert(RE.getColor());
// });

document.onselectionchange = function() {
  // alert(RE.isBold());
  // alert(RE.isItalic());
  // alert(RE.isUnderline());
  // alert(RE.getColor());

  callUpdateAll();
  // Android.leFormattingData(formattingData.toString());
};

function callUpdateAll() {
  var formattingData = [RE.isBold(), RE.isItalic(), RE.isUnderline(), RE.isStrikeThrough(), RE.getColor(), RE.getAlignment(), RE.isUnorderedList(), RE.isOrderedList()];

  callAndroidUpdate(formattingData);
}


function weeeeee(rgbString) {
  var a = rgbString.split("(")[1].split(")")[0];
  a = a.split(",");
  var b = a.map(function(x) { //For each array element
    x = parseInt(x).toString(16); //Convert to a base16 string
    return (x.length == 1) ? "0" + x : x; //Add zero if we get only one character
  })
  b = "#" + b.join("");
  return b;

  // function componentToHex(c) {
  //   var hex = c.toString(16);
  //   return hex.length == 1 ? "0" + hex : hex;
  // }
  //
  // function rgbToHex(r, g, b) {
  //   return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  // }
  //
  // alert(rgbToHex(0, 51, 255));
  // #0033ff
}

//done: even better: why update all fields if bold1,italic0,under0 and after change bold1,italic0,under1. only need to update under0 to 1
// var lastData;
//
// function callIfDifferent(data) {
//   if (lastData) {
//     console.log("last data " + lastData + " new " + data); //if not null, compare. only if different, send update. equal - ignore.
//     if (data.toString() != lastData.toString()) {
//       // console.log(data.toString() + " last: " + lastData.toString());
//
//       let difference = data.diff(lastData);
//       console.log("difference " + difference);
//
//       callAndroidUpdate(difference.toString());
//
//       lastData = data.toString();
//     }
//
//   } else { //it's null, so we haven't called this function yet. send update and subsequent call data will be compared to one sent this time.
//     console.log("last data null");
//     callAndroidUpdate(data.toString());
//
//     lastData = data.toString();
//   }
//
//
// }


// listeners call function, which is debounced = cannot call too often. all but the latest call are ignored (if calls happen too often)
// if call is ok, get difference between last format and current.
// if there is a difference, only send the change to Android Java
// Android Java calls adapter.notifyItemChanged for changed item. e.g., bold0 --> bold1, B is updated.

Array.prototype.diff = function(a) {
  //https://stackoverflow.com/a/4026828/4673960
  return this.filter(function(i) {
    return a.indexOf(i) < 0;
  });
};


//https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
function debounce(fn, time) {
  var timer;
  return function() {
    // if more than one call comes tin before 350ms has expired,
    // drop the prior fn call
    clearTimeout(timer)
    // after 350ms, call the debounced fn wtth the origtnal arguments
    // save timeout as ‘timer’ so we can cancel tt
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}
var callAndroidUpdate = debounce(wrapperFunction, 400);


var lastData;

function wrapperFunction(fakedata) {
  // Android.leFormattingData(fakedata);

  if (lastData) {
    console.log("LAST DATA: " + lastData + " ; NEW: " + fakedata); //if not null, compare. only if different, send update. equal - ignore.
    if (fakedata.toString() != lastData.toString()) {
      // console.log(data.toString() + " last: " + lastData.toString());

      let difference = fakedata.diff(lastData);
      console.log("DIFFERENCE " + difference);

      Android.leFormattingData(difference.toString());

      lastData = fakedata;
    }

  } else { //it's null, so we haven't called this function yet. send update and subsequent call data will be compared to one sent this time.
    // console.log("last data null");
    Android.leFormattingData(fakedata.toString());

    lastData = fakedata;
  }





}

// function (data) {
//   updateOnce(data);
// }

// custom debounce functton

// very simple test case
// function _shouldFireOnlyOnce(i) {
//   console.log('hello ' + i)
// }
// var shouldFireOnlyOnce = debounce(_shouldFireOnlyOnce, 350)
// // this wtll quickly run 10 times. Thanks to debounce(), only the Last
// // one wtll execute —shouldFtireOnlyOnce( }
// for (var i = 0; i < 10; i++) {
//   shouldFireOnlyOnce(i);
// }


// Android.jsCallback();
//
// Android.jsCallbackTwo('hello test');
