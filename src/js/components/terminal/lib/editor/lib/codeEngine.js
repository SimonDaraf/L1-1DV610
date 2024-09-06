import { CallStack } from './callStack.js'
import { MemoryHeap } from './memoryHeap.js'
import { EngineCompiler } from './engineCompiler.js'

/**
 * Represents a code engine.
 *
 * @event CodeEngine#output - Dispatched when the code engine has new output that can be fed to a terminal output.
 * @event CodeEngine#error - Dispatched when an error has occurred.
 */
export class CodeEngine extends EventTarget {
  /**
   * The memory heap.
   * Each time the engine parses the code the memory heap will be populated with logical instructions to execute.
   * If the heap is empty the code has not been parsed or an error has occurred.
   *
   * @type {MemoryHeap}
   */
  #memoryHeap

  /**
   * A call stack containing every executable operation.
   *
   * @type {CallStack}
   */
  #callStack

  /**
   * The engine compiler.
   *
   * @type {EngineCompiler}
   */
  #engineCompiler

  /**
   * Constructs an instance of a code engine.
   */
  constructor () {
    super()

    this.#memoryHeap = new MemoryHeap()
    this.#callStack = new CallStack()
    this.#engineCompiler = new EngineCompiler()

    this.#engineCompiler.addEventListener('EngineCompiler#memoryAllocationRequest', (event) => {
      event.stopPropagation()

      console.log(event.detail.pointer)

      this.#memoryHeap.addMemoryReference(event.detail.pointer)
    })

    this.#engineCompiler.addEventListener('EngineCompiler#addToCallStack', (event) => {
      event.stopPropagation()

      console.log(event.detail.executionBlock)

      this.#callStack.addExecutableBlock(event.detail.executionBlock)
    })

    this.#engineCompiler.addEventListener('EngineCompiler#requestMemoryReference', (event) => {
      event.stopPropagation()

      // We get the pointer reference and push it into the holder. This way we avoid exposing the heap to the compiler.
      const pointer = this.#memoryHeap.getMemoryReference(event.detail.requestID)
      event.detail.memoryHolder.push(pointer)
    })

    this.#callStack.addEventListener('CallStack#output', (event) => {
      event.stopPropagation()

      // Forward output to listeners.
      this.dispatchEvent(new CustomEvent('CodeEngine#output', {
        bubbles: true,
        detail: {
          message: `Output: ${event.detail.value}`
        }
      }))
    })
  }

  /**
   * Parses the text content into executable logic and then.
   *
   * @param {string} codeBlock - The code block to be parsed.
   */
  build (codeBlock) {
    this.#dispatchConsoleOutput('Build started...')
    this.#memoryHeap.clearMemory()
    this.#buildMemoryHeap(this.#parse(codeBlock))
    this.#dispatchConsoleOutput('Build finished...')
  }

  /**
   * Executes the call stack.
   */
  run () {
    try {
      this.#dispatchConsoleOutput('Executing...')
      this.#callStack.execute(this.#memoryHeap)
      this.#dispatchConsoleOutput('Done executing...')
    } catch (e) {
      this.#dispatchError(e)
    }
  }

  /**
   * Builds the memory heap.
   *
   * @param {string[]} parsedData - An array of logical statements.
   */
  #buildMemoryHeap (parsedData) {
    try {
      this.#engineCompiler.compile(parsedData)
    } catch (e) {
      this.#dispatchError(e)
    }
  }

  /**
   * Parses a code block into separated logical statements.
   *
   * @param {string} codeBlock - The code block to be parsed.
   * @returns {string[]} - An array of logical statements.
   */
  #parse (codeBlock) {
    return codeBlock.split(/(?=<)|(?<=>)/)
      .filter(str => /^<.*>$/.test(str))
      .map(str => str.replace(/[<>]/g, ''))
  }

  /**
   * Dispatches a console output event.
   *
   * @param {string} str - The message to be output.
   */
  #dispatchConsoleOutput (str) {
    this.dispatchEvent(new CustomEvent('CodeEngine#output', {
      detail: {
        message: str
      }
    }))
  }

  /**
   * Dispatches an error event.
   *
   * @param {Error} e - The error interface.
   */
  #dispatchError (e) {
    this.dispatchEvent(new CustomEvent('CodeEngine#error', {
      detail: {
        error: e
      }
    }))
  }
}
