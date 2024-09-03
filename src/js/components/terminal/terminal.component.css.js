export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
  <style>
    :host(terminal-component) {
      display: block;
      height: 100%;
      width: 100%;
    }
  </style>
`
