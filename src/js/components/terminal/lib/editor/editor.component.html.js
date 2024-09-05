/* eslint-disable spaced-comment */
export const htmlTemplate = document.createElement('template')

htmlTemplate.innerHTML = /*html*/`
  <div class="editor-container">
    <div class="editor-header">
      <button>Run</button>
      <button>Build</button>
    </div>
    <div class="editor-body">
      <div id="editor-input" contenteditable="true" spellcheck="false" wrap="off"></div>
    </div>
    <div class="editor-console">

    </div>
  </div>
`
