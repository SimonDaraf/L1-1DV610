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
import { CodeEngine } from './lib/codeEngine.js'

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
     * The editor console element.
     *
     * @type {HTMLElement}
     */
    #editorConsole

    /**
     * The run button.
     *
     * @type {HTMLElement}
     */
    #runButton

    /**
     * The build button.
     *
     * @type {HTMLElement}
     */
    #buildButton

    /**
     * The code engine.
     *
     * @type {CodeEngine}
     */
    #codeEngine

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
      this.#editorConsole = this.shadowRoot.querySelector('.editor-console')
      this.#runButton = this.shadowRoot.querySelector('#button-run')
      this.#buildButton = this.shadowRoot.querySelector('#button-build')

      this.#abortController = new AbortController()

      this.#codeEngine = new CodeEngine()
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#runButton.addEventListener('click', (event) => {
        event.stopPropagation()
        event.preventDefault()

        this.#codeEngine.run()
      }, { signal: this.#abortController.signal })

      this.#buildButton.addEventListener('click', (event) => {
        event.stopPropagation()
        event.preventDefault()

        this.#editorConsole.textContent = ''
        this.#codeEngine.build(this.#editorInput.textContent)
      }, { signal: this.#abortController.signal })

      this.#codeEngine.addEventListener('CodeEngine#error', (event) => {
        event.stopPropagation()

        const errorElem = document.createElement('div')
        errorElem.textContent = event.detail.error
        errorElem.classList.add('console-error')

        this.#editorConsole.appendChild(errorElem)
      })

      this.#codeEngine.addEventListener('CodeEngine#output', (event) => {
        event.stopPropagation()

        const outputElem = document.createElement('div')
        outputElem.textContent = event.detail.message

        this.#editorConsole.appendChild(outputElem)
      })
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }
  }
)
