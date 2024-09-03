/* eslint-disable spaced-comment */
export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = /*css*/`
  <style>
    :host(editor-component) {
      display: block;
      height: 100%;
      width: 100%;
    }

    .editor-container {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      background: #202020;
      width: 100%;
      height: 100%;
    }

    .editor-header {
      height: 30px;
      width: 100%;
    }

    .editor-body {
      height: 100%;
      width: 100%;
      display: flex;
    }

    #editor-input {
      width: calc(100% - 32px);
      height: calc(100% - 40px);
      resize: none;
      margin: 5px auto;
      border: 2px solid #323232;
      background-color: #202020;
      border-radius: 10px;
      padding: 10px;
      color: #ffffff;
      font-size: 2em;
    }
  </style>
`
