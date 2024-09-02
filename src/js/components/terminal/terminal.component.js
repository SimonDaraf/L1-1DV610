/**
 * @description The terminal web component.
 * @module terminal.component
 * @author Simon Danielsson <sd223ah@student.lnu.se>
 * @version 1.0.0
 */

// --- Template Elements --- //
import { cssTemplate } from './terminal.component.css.js'
import { htmlTemplate } from './terminal.component.html.js'

// --- Sub Components --- //

customElements.define('terminal-component',
  /**
   * Represents a terminal component element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the terminal-component element.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this custom element and
      // append the templates to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    }
  }
)
