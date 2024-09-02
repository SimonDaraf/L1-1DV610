/**
 * The main script file of the application.
 * 
 * @author Simon Danielsson <sd223ah@student.lnu.se>
 * @version 1.0.0
 */

import './components/terminal/terminal.component.js'

// Append terminal component element to the body.
const terminalComp = document.createElement('terminal-component')
document.querySelector('body').appendChild(terminalComp)