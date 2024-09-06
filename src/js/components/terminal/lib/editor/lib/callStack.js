import { ExecutableBlock } from './executableBlock.js'
import { MemoryHeap } from './memoryHeap.js'

/**
 * Represents a call stack. Holding references to executions to be made.
 * The call stack will operate on a fifo basis.
 *
 * @event CallStack#output - Dispatched when a return value should be output to console.
 */
export class CallStack extends EventTarget {
  /**
   * An array of executable blocks.
   *
   * @type {ExecutableBlock[]}
   */
  #executableBlocks

  /**
   * Constructs an instance of a call stack.
   */
  constructor () {
    super()

    this.#executableBlocks = []
  }

  /**
   * Adds an executable block to the call stack.
   *
   * @param {ExecutableBlock} executableBlock - The executable block to be added.
   */
  addExecutableBlock (executableBlock) {
    this.#executableBlocks.push(executableBlock)
  }

  /**
   * Executes every executable block in the call stack.
   *
   * @param {MemoryHeap} memoryHeap - The memory heap reference.
   */
  execute (memoryHeap) {
    for (const executable of this.#executableBlocks) {
      // Push return object into array.
      const returnObject = executable.execute()

      // Check if value should be output to console.
      if (returnObject.outputToConsole) {
        this.dispatchEvent(new CustomEvent('CallStack#output', {
          bubbles: true,
          detail: {
            value: returnObject.value
          }
        }))
      }
    }
  }

  /**
   * Clears the call stack.
   */
  clear () {
    this.#executableBlocks = []
  }
}
