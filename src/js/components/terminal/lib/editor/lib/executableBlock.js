/**
 * Represents an executable block.
 * Needs a function reference and stores pointer id to indicate memory dependencies.
 */
export class ExecutableBlock {
  /**
   * The memory dependencies needed to execute.
   *
   * @type {string[]}
   */
  #memoryDependencies

  /**
   * The operation to be executed.
   *
   * @type {Function}
   */
  #operation

  /**
   * Constructs an instance of a executable block.
   *
   * The memory dependencies needs to include every memory element accessed during the operation.
   *
   * @param {string[]} memoryDependencies - An array of pointer id's to act as memory dependencies.
   * @param {Function} operation - The operation to be executed.
   */
  constructor (memoryDependencies, operation) {
    this.#memoryDependencies = memoryDependencies
    this.#operation = operation
  }

  /**
   * Returns a copy of the memory dependencies.
   * This method should be used before executing the block as to know which dependencies are needed.
   *
   * @returns {string[]} - An array of every memory dependency.
   */
  getMemoryDependencies () {
    return [...this.#memoryDependencies] // return a shallow copy of the array.
  }

  /**
   * Executes the operation.
   *
   * @returns {object} - The executable block result object.
   * Key: value - Holds the result value from the operation.
   * Key: outputToConsole - A boolean indicating whether to output value to console.
   */
  execute () {
    return this.#operation.call()
  }
}
