import { Pointer } from './dataTypes.js'

/**
 * A container class to hold a memory block and relevant parameters for executing a set logic.
 */
export class MemoryBlock {
  /**
   * A collection of variable dependencies in memory block.
   *
   * key["id"] -> value["Variable Object"]
   *
   * @type {Pointer[]}
   */
  #variableDependencies

  /**
   * The execution logic held by the memory block.
   *
   * @type {Function}
   */
  #executionLogic

  /**
   * Constructs a new instance of a memory block.
   *
   * @param {Pointer[]} variableDependencies - An array of variable dependencies.
   * @param {Function} executionLogic - The logic to be executed by the memory block.
   */
  constructor (variableDependencies, executionLogic) {
    this.#variableDependencies = variableDependencies
    this.#executionLogic = executionLogic
  }

  /**
   * Executes the logic held by the memory block.
   *
   * @returns {object} - Placeholder for eventual response object.
   */
  execute () {
    return this.#executionLogic.call(null, this.#variableDependencies)
  }
}
