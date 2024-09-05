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
  }

  /**
   * Parses the text content into executable logic and then.
   *
   * @param {string} codeBlock - The code block to be parsed.
   */
  build (codeBlock) {
    this.#buildMemoryHeap(this.#parse(codeBlock))
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
      console.log(e)
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
}
