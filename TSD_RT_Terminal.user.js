// ==UserScript==
// @name        TSD_RT_Terminal
// @author      Erik Steringer estering@uoregon.edu
// @namespace   tsdrtterm_erik
// @description Script that provides a command-line on RT for Helpdesk students
// @include     https://ithelp.uoregon.edu/*
// @exclude     https://ithelp.uoregon.edu/Ticket/Attachment/*
// @exclude     https://ithelp.uoregon.edu/Ticket/Update*
// @exclude     https://ithelp.uoregon.edu/Ticket/Display.html?id=help
// @exclude     https://ithelp.uoregon.edu/NoAuth*
// @exclude     https://ithelp.uoregon.edu/REST*
// @version     0.0.4
// @grant       none
// ==/UserScript==

/// DEVELOPMENT PLAN ///
// 0.0.1 - initial setup, inject console on top navbar with a textbox input
// COMPLETED: Erik Steringer
// 0.0.2 - accepting input, preventing form submission
// COMPLETED: Erik Steringer
// 0.0.3 - beginning command execution, starting with navigation
// COMPLETED: Erik Steringer
// 0.0.4 - beginning access to REST, starting with claiming tickets
// COMPLETED(w/modification): Erik Steringer - was forced to use URLs for taking tickets
// 0.0.5 - continued access to REST, replying to tickets
// 0.0.6 - continued access to REST, changing ticket status
// 0.1.0 - polish all previous feature additions
// 0.2.0 - add autocomplete for commands
// 0.3.0 - add autocomplete for ticket numbers in commands
// 0.4.0 - clean codebase
// 0.5.0 - additional error handling (suggest proper syntax? helppages (separate script)?)
// 1.0.0 - polish all previous feature additions

/// Permissions for use ///
/*

  This code can be used, copied or modified by any UO IS TSD student for work-related purposes with
  the provision that the person using/copying/modifying the script does not laugh too hard at my code
  since I've never coded in Javascript before.

*/

var terminal = document.createElement("div");
var form     = document.createElement("form");
var input    = document.createElement("input");
var rt       = "https://ithelp.uoregon.edu/REST/1.0/";

/*
  Create the textbox for which all stuff may go through
*/
function createTerminal() {
  // Configure terminal (div)
  terminal.setAttribute("id", "terminal");
  terminal.setAttribute("class", "terminal");
  terminal.style.position = "absolute";
  terminal.style.top = "0px";
  terminal.style.left = "430px";
  terminal.style.minHeight = "22px"; // 29 total height
  terminal.style.background = "#000000";
  terminal.style.zIndex = "100";
  terminal.style.color = "#FFFFFF";
  terminal.style.padding = "1px 1px 1px 1px";
  
  // Configure form (block form submissions to process terminal commands);
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    process(input.value.toLowerCase());
  }, true);
  
  // Configure input (textbox input)
  input.setAttribute("type", "text");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("tabindex", "0"); // hopefully should auto-assign focus to terminal
  input.style.padding = "8px 0px 0px 0px";
  input.style.width = "300px";
  input.style.fontSize = "14px";
  
  form.appendChild(input);
  terminal.appendChild(form);
  document.body.appendChild(terminal);
};

createTerminal();
input.focus();

// Grab the command and process it!
function process(str) {
  // Log the command
  console.log("> " + str);
  var args = str.split(" ");
  // Find out what command is being executed
  switch (args[0]) {
    case "nav":
      console.log("arg length: " + args.length);
      if (args.length == 1) {
        navigate();
      } else if (args.length == 2) {
        navigate(args[1]);
      } else {
        console.log("ERROR, command.nav only accepts zero or one argument(s)");
      }
      break;
    case "take":
      if (args.length == 2) {
       takeTicket(args[1]);
      } else {
        console.log("ERROR, command.take needs exactly one argument (ticket number)");
      }
      break;
    case "set":
      if(args.length == 4) {
        set(args[1], args[2], args[3]);
      } else {
        console.log("ERROR, command.set needs three arguments (ticket#, key, value)");
      }
    default:
      console.log("Command was not recognized!");
  }
};

// Navigate to a ticket or to the home
function navigate(num) {
  console.log("Navigating to " + num);
  if (typeof num !== "undefined" && num != "home") {
    window.location.href = "https://ithelp.uoregon.edu/Ticket/Display.html?id=" + num;
  } else {
    window.location.href = "https://ithelp.uoregon.edu";
  }
};

function takeTicket(num) {
  console.log("Taking ticket #" + num);
  if (typeof num !== "undefined") {
    var url = "https://ithelp.uoregon.edu/Ticket/Display.html?Action=Take;id=" + num;
    var win = window.open(url);
    if (win){
      win.focus();
    } else {
      // browser blocked it :(
      alert("Please allow popups on this site.");
    }
  }
};

function set(id, key, value) {
  console.log("Setting " + key + " to value: " + value);
  var change = key + ": " + value;
  var data   = {"content": key};
  $.ajax({
    type: "POST",
    context: document.body,
    url: rt + "/tickets/" + id + "/edit",
    data: data,
    error: function (reply) {
      console.log(reply);
    },
    success: function (reply) {
     console.log(reply);
    }
  });
}









