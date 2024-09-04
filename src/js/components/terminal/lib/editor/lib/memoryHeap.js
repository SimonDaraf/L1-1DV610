import { Pointer } from './dataTypes.js'

/**
 * A container class to hold a memory block and relevant parameters for executing a set logic.
 */
export class MemoryHeap {
  /**
   * A collection of variable dependencies in memory block.
   *
   * key["id"] -> value["Variable Object"]
   *
   * @type {Pointer[]}
   */
  #memoryPointers

  /**
   * Constructs a new instance of a memory heap.
   */
  constructor () {
    this.#memoryPointers = []
  }

  /**
   * Adds a memory reference to the heap.
   *
   * @param {Pointer} memoryPointer - The memory reference.
   */
  addMemoryReference (memoryPointer) {
    this.#memoryPointers.push(memoryPointer)
  }

  /**
   * Removes a memory reference from the heap.
   *
   * @param {string} pointerID - The pointer id.
   */
  removeMemoryReference (pointerID) {
    for (let i = 0; i < this.#memoryPointers.length; i++) {
      if (this.#memoryPointers[i].getID() === pointerID) {
        this.#memoryPointers.splice(i, 1) // Remove pointer reference from the memory.
      }
    }
  }

  /**
   * Returns a memory reference from given pointer id.
   *
   * @param {string} pointerID - The pointer id.
   * @throws {Error} - If no memory reference with the given id was found.
   * @returns {Pointer} - The memory reference.
   */
  getMemoryReference (pointerID) {
    for (let i = 0; i < this.#memoryPointers.length; i++) {
      if (this.#memoryPointers[i].getID() === pointerID) {
        return this.#memoryPointers[i]
      }
    }

    // If no memory reference was found we throw an error and let the engine handle it so it can be conveyed to the user.
    throw new Error(`Invalid memory reference: ${pointerID}`)
  }
}
