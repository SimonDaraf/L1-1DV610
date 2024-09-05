import * as dataTypes from './dataTypes.js'

/**
 * The operation class hold a number of static methods that allows the compiler and engine to construct logical operations.
 */
export class Operation {
  /**
   * Returns a function that when invoked will directly modify the value of the given int pointer destination.
   *
   * @param {dataTypes.Integer} dest - The pointer to the integer destination.
   * @param  {...OperationPair} variables - The variables used in the modification.
   * @returns {Function} - The constructed function.
   */
  static constructIntModification (dest, ...variables) {
    // function to return, this also keeps the scope when the function was created which lets us access all variables passed.
    return function () {
      let finalValue = 0
      variables.forEach((variable) => {
        // Determine operation based on enum.
        switch (variable.getOperation()) {
          case MathematicalOperations.EQUAL:
            finalValue = variable.getValue()
            break
          case MathematicalOperations.ADD:
            finalValue += variable.getValue()
            break
          case MathematicalOperations.SUBTRACT:
            finalValue -= variable.getValue()
            break
          case MathematicalOperations.MULTIPLY:
            finalValue *= variable.getValue()
            break
          default:
            throw new Error(`Fatal Error: invalid operator supplied. Operation index: ${variable.getOperation()}`)
        }
      })

      // Set destination value.
      dest.setValue(finalValue)
    }
  }

  /**
   * Returns a function that when invoked will directly modify the value of the given string pointer destination.
   *
   * @param {dataTypes.Integer} dest - The pointer to the string destination.
   * @param  {...OperationPair} variables - The variables used in the modification.
   * @returns {Function} - The constructed function.
   */
  static constructStringModification (dest, ...variables) {
    // function to return, this also keeps the scope when the function was created which lets us access all variables passed.
    return function () {
      let finalValue = ''
      variables.forEach((variable) => {
        // Determine operation based on enum.
        switch (variable.getOperation()) {
          case MathematicalOperations.EQUAL:
            finalValue = variable.getValue()
            break
          case MathematicalOperations.ADD:
            finalValue += variable.getValue()
            break
          default:
            throw new Error(`Fatal Error: invalid operator supplied. Operation index: ${variable.getOperation()}`)
        }
      })

      // Set destination value.
      dest.setValue(finalValue)
    }
  }

  /**
   * Creates and returns an integer operation pair.
   *
   * @param {string} operationSymbol - The operation symbol.
   * @param {string|number} operationValue - The operation value, must be a valid integer.
   * @throws {Error} - If value is not a strict integer.
   * @throws {Error} - If no valid operation symbol was provided.
   * @returns {OperationPair} - The operation pair constructed from symbol and value.
   */
  static createIntOperationPair (operationSymbol, operationValue) {
    if (!dataTypes.isStrictInteger(operationValue)) {
      throw new Error(`${operationValue} is not a valid integer.`)
    }
    switch (operationSymbol) {
      case '=':
        return new OperationPair(Number.parseInt(operationValue), MathematicalOperations.EQUAL)
      case '+':
        return new OperationPair(Number.parseInt(operationValue), MathematicalOperations.ADD)
      case '-':
        return new OperationPair(Number.parseInt(operationValue), MathematicalOperations.SUBTRACT)
      case '*':
        return new OperationPair(Number.parseInt(operationValue), MathematicalOperations.MULTIPLY)
      default:
        throw new Error(`${operationSymbol} is not a valid operation.`)
    }
  }

  /**
   * Creates and returns an integer operation pair.
   *
   * @param {string} operationSymbol - The operation symbol.
   * @param {string} operationValue - The operation value.
   * @throws {Error} - If no valid operation symbol was provided.
   * @returns {OperationPair} - The operation pair constructed from symbol and value.
   */
  static createStringOperationPair (operationSymbol, operationValue) {
    switch (operationSymbol) {
      case '=':
        return new OperationPair(operationValue, MathematicalOperations.EQUAL)
      case '+':
        return new OperationPair(operationValue, MathematicalOperations.ADD)
      default:
        throw new Error(`${operationSymbol} is not a valid operation.`)
    }
  }
}

/**
 * Holds a operation as well as the value associated with said operation.
 */
class OperationPair {
  /**
   * The value to be associated with the operation.
   *
   * @type {number|string}
   */
  #value

  /**
   * An enum signaling the type of operation.
   *
   * @type {object} - The MathematicalOperations enum.
   */
  #operation

  /**
   * Constructs an instance of the operation pair.
   *
   * @param {number|string} value - The value associated with the operation.
   * @param {object} operation - The MathematicalOperations enum.
   */
  constructor (value, operation) {
    this.#value = value
    this.#operation = operation
  }

  /**
   * Returns the value.
   *
   * @returns {number|string} - The value.
   */
  getValue () {
    return this.#value
  }

  /**
   * Returns the operation.
   *
   * @returns {object} - The operation enum.
   */
  getOperation () {
    return this.#operation
  }
}

/**
 * An enum refering to different mathematical operations supported.
 */
const MathematicalOperations = Object.freeze({
  EQUAL: 0,
  ADD: 1,
  SUBTRACT: 2,
  MULTIPLY: 3
})
