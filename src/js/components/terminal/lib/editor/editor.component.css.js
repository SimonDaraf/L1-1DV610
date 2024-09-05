/* eslint-disable spaced-comment */
export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = /*css*/`
  <style>
    :host(editor-component) {
      display: block;
      height: 100%;
      width: 100%;
    }

    .console-error {
      color: red;
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
      height: 40px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    button {
      font-family: "Source Code Pro", monospace;
      font-optical-sizing: auto;
      font-weight: 400;
      font-style: normal;
      margin: 0 5px;
      background: #393939;
      color: #fff;
    }

    .editor-body {
      height: 60%;
      width: 100%;
      display: flex;
    }

    .editor-console {
      height: 30%;
      width: calc(100% - 32px);
      margin: 5px auto;
      border: 2px solid #323232;
      background-color: #202020;
      border-radius: 10px;
      padding: 10px;
      color: #ffffff;
      font-size: 18px;
      overflow-y: auto;
    }

    #editor-input {
      width: calc(100% - 32px);
      height: calc(100% - 40px);
      resize: none;
      margin: 0% auto 5px auto;
      border: 2px solid #323232;
      background-color: #202020;
      border-radius: 10px;
      padding: 10px;
      color: #ffffff;
      font-size: 18px;
      overflow-y: auto;
    }
  </style>
`
