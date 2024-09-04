import { ExecutableBlock } from './executableBlock.js'
import { MemoryHeap } from './memoryHeap.js'

/**
 * Represents a call stack. Holding references to executions to be made.
 * The call stack will operate on a fifo basis.
 */
export class CallStack {
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
    // TODO - Later
  }
}
