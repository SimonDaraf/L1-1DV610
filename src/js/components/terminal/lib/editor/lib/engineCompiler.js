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
    if (OperationPatterns.INT_DECLARATION.test(str)) { return this.#intDeclaration(str) }
    if (OperationPatterns.STRING_DECLARATION.test(str)) { return this.#stringDeclaration(str) }
    if (OperationPatterns.OPERATION_DECLARATION.test(str)) { return this.#operationDeclaration(str) }
    if (OperationPatterns.VARIABLE_MODIFICATION.test(str)) { return this.#variableModification(str) }

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
  INT_DECLARATION: /^ ?int /,
  STRING_DECLARATION: /^ ?string /,
  OPERATION_DECLARATION: /^ ?[a-z][a-zA-Z0-9]*\((.*)\)$/,
  VARIABLE_MODIFICATION: /^ ?[a-z][a-zA-Z0-9]* /
})

/**
 * An enum containing regex pattern related to int declaration formats.
 */
const DeclarationFormats = Object.freeze({
  INT_DECLARATION_FORMAT: /^ ?int [az][a-zA-Z0-9]* = \d+( ?[+-] ?\d+)* ?$/,
  STRING_DECLARATION_FORMAT: /^ ?string [a-z][a-zA-Z0-9]* = (" *[^"]* *"|' *[^']* *') ?$/,
  VARIABLE_MODIFICATION_FORMAT: /^ ?[a-z][a-zA-Z0-9]* = \d+( ?[+-] ?\d)* ?$/
})
