/**
 * @description The terminal web component.
 * @module terminal.component
 * @author Simon Danielsson <sd223ah@student.lnu.se>
 * @version 1.0.0
 */

// --- Template Elements --- //
import { cssTemplate } from './editor.component.css.js'
import { htmlTemplate } from './editor.component.html.js'

// --- Sub Components --- //

customElements.define('editor-component',
  /**
   * Represents a terminal component element.
   */
  class extends HTMLElement {
    /**
     * A abortController used to remove event listeners.
     *
     * @type {AbortController}
     */
    #abortController

    /**
     * The editor input element.
     *
     * @type {HTMLElement}
     */
    #editorInput

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

      this.#editorInput = this.shadowRoot.querySelector('#editor-input')

      this.#abortController = new AbortController()
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#editorInput.addEventListener('keyup', (event) => {
        event.stopPropagation()
        event.preventDefault()
        console.log('changed')
      }, { signal: this.#abortController.signal })
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }
  }
)
