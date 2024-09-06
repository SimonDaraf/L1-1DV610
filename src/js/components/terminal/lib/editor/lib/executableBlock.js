/**
 * Represents an executable block.
 */
export class ExecutableBlock {
  /**
   * The operation to be executed.
   *
   * @type {Function}
   */
  #operation

  /**
   * Constructs an instance of a executable block.
   *
   * @param {Function} operation - The operation to be executed.
   */
  constructor (operation) {
    this.#operation = operation
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
