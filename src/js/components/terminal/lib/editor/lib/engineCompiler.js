import * as dataTypes from './dataTypes.js'
import { ExecutableBlock } from './executableBlock.js'

/**
 * Represents a code compiler.
 */
export class EngineCompiler {
  /**
   * Compiles the given logical statements into an array of memory blocks.
   *
   * @param {string[]} parsedData - The parsed logical statement data.
   */
  compile (parsedData) {
  }

  /**
   * Determines the operation based on the raw input string.
   *
   * @param {string} str - The input string.
   * @throws {Error} - If no valid operation could be extracted from the raw input.
   * @returns {ExecutableBlock} - The executable block build from the raw input string.
   */
  #determineOperation (str) {
    if (str.test(OperationPatterns.INT_DECLARATION)) { return this.#intDeclaration(str) }
    if (str.test(OperationPatterns.STRING_DECLARATION)) { return this.#stringDeclaration(str) }
    if (str.test(OperationPatterns.OPERATION_DECLARATION)) { return this.#operationDeclaration(str) }
    if (str.test(OperationPatterns.VARIABLE_MODIFICATION)) { return this.#variableModification(str) }

    throw new Error(`Invalid operation: <${str}>`)
  }

  #intDeclaration (str) {
  }

  #stringDeclaration (str) {

  }

  #operationDeclaration (str) {

  }

  #variableModification (str) {

  }
}

/**
 * An enum containing regex pattern related to available operations.
 */
const OperationPatterns = Object.freeze({
  INT_DECLARATION: /^int /,
  STRING_DECLARATION: /^string /,
  OPERATION_DECLARATION: /^[a-z][a-zA-Z0-9]*\((.*)\)$/,
  VARIABLE_MODIFICATION: /^[a-z][a-zA-Z0-9]* /
})