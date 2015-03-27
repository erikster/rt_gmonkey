// ==UserScript==
// @name        TSD_RT_Terminal_Help
// @namespace   tsdrtterm_erik
// @description Script that injects a help page for all included URLs
// @include     https://ithelp.uoregon.edu/Ticket/Display.html?id=help
// @version     0.0.1
// @grant       none
// ==/UserScript==

// Version number should have enough documentation for the equivalent version of TSD_RT_Terminal

// Change titles
document.title = "Help Page";
var titletext = document.getElementById("header").childNodes[0];
titletext.innerHTML = "Help Page for Terminal Greasemonkey Script";

// replace the div with class=error (since the "help page" is really just an error page from RT)
var divtoreplace = document.querySelectorAll(".error")[0];
divtoreplace.innerHTML = "<h1>Available Commands</h1>" + 
  "<h2>nav</h2>" + "<code>Usage: nav (ticket#)</code>" + 
  "<p>Navigates this browser tab/window to the ticket number if provided or to the home page of RT if not.</p>" +
  "<h2>take</h2>" + "<code>Usage: take [ticket#]</code>" +
  "<p>Calls the take method on the provided ticket number</p>";