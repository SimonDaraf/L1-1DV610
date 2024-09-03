import { MemoryBlock } from './memoryBlock.js'

/**
 * Represents a code engine.
 *
 * @event CodeEngine#output - Dispatched when the code engine has new output that can be fed to a terminal output.
 * @event CodeEngine#error - Dispatched when an error has occurred.
 */
export class CodeEngine {
  /**
   * The memory heap.
   * Each time the engine parses the code the memory heap will be populated with logical instructions to execute.
   * If the heap is empty the code has not been parsed or an error has occurred.
   *
   * @type {MemoryBlock[]}
   */
  #memoryHeap

  /**
   * Parses the text content into executable logic and then.
   *
   * @param {string} codeBlock - The code block to be parsed.
   */
  build (codeBlock) {
    this.#cleanMemoryHeap()
    this.#buildMemoryHeap(this.#parse(codeBlock))
  }

  /**
   * Cleans the memory heap.
   */
  #cleanMemoryHeap () {
    this.#memoryHeap = []
  }

  /**
   * Builds the memory heap.
   *
   * @param {string[]} parsedData - An array of logical statements.
   */
  #buildMemoryHeap (parsedData) {
    console.log(parsedData)
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
