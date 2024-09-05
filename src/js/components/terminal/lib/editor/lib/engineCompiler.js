import * as dataTypes from './dataTypes.js'
import { ExecutableBlock } from './executableBlock.js'
import { Operation } from './operation.js'

/**
 * Represents a code compiler.
 *
 * @event EngineCompiler#memoryAllocationRequest - Dispatched when a variable needs to be stored in memory.
 * @event EngineCompiler#addToCallStack - Dispatched when an Execution block has been constructed
 */
export class EngineCompiler extends EventTarget {
  /**
   * Compiles the given logical statements into an array of memory blocks.
   *
   * @param {string[]} parsedData - The parsed logical statement data.
   */
  compile (parsedData) {
    for (const str of parsedData) {
      const execBlock = this.#determineOperation(str)

      // Dispatch the add to call stack event to let the engine know a new execution has been made.
      this.dispatchEvent(new CustomEvent('EngineCompiler#addToCallStack', {
        bubbles: true,
        detail: {
          executionBlock: execBlock
        }
      }))
    }
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

  /**
   * Constrcuts a executable block to handle a integer declaration.
   *
   * @param {string} str - The raw input string.
   * @returns {ExecutableBlock} - The executable block.
   */
  #intDeclaration (str) {
    if (!DeclarationFormats.INT_DECLARATION_FORMAT.test(str)) {
      throw new Error(`Incorrect int declaration: ${str}`)
    }

    // Split input at "=" to separate the two halves of the statement.
    const [declarator, operation] = str.split('=').map((x) => x.trim())

    // Determine variable name by removing prefix.
    const variableName = declarator.replace(/^int /i, '')
    const variableID = btoa(variableName)

    // At a later point it would be cool to actually initialize variable values during compilation.
    // If I'm not lazy I might do it. Or I could forget this comment and never come back to this.
    const intPointer = new dataTypes.Integer(0, variableID) // Set int to 0 when initializing.

    this.dispatchEvent(new CustomEvent('EngineCompiler#memoryAllocationRequest', {
      bubbles: true,
      detail: { pointer: intPointer }
    }))

    // Determine operation logic.
    const operationVariables = operation.split(' ').map((x) => x.trim())

    const memoryDependencies = [variableID]
    const operationPairs = []
    let operationSymbol = ''

    for (let i = 0; i < operationVariables.length; i++) {
      if (i === 0) {
        operationSymbol = '='
        continue
      }

      if (/^[+-]$/.test(operationVariables[i])) {
        operationSymbol = operationVariables[i]
        continue
      }

      if (!dataTypes.isStrictInteger(operationVariables[i])) {
        // If not an integer. First check if it matches the pattern for a variable declaration.
        if (!NamingPatterns.VARIABLE_NAME.test(operationVariables[i])) {
          throw new Error(`${operationVariables[i]} is not a valid variable name.`)
        }
        // If it is a valid variable name. Add it to the memory dependency.
        memoryDependencies.push(btoa(operationVariables[i]))

        // add something to access heap and get reference to variable getter.
      }

      const operationPair = Operation.createIntOperationPair(operationSymbol, operationVariables[i])
      operationPairs.push(operationPair)
    }

    // Build final operation string.
    const finalOperation = Operation.constructIntModification(intPointer, ...operationVariables)
    return new ExecutableBlock(memoryDependencies, finalOperation)
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
 * An enum containing regex pattern related to declaration formats.
 */
const DeclarationFormats = Object.freeze({
  INT_DECLARATION_FORMAT: /^ ?int [a-z][a-zA-Z0-9]* = \d+( ?[+-] ?\d+)* ?$/,
  STRING_DECLARATION_FORMAT: /^ ?string [a-z][a-zA-Z0-9]* = (" *[^"]* *"|' *[^']* *') ?$/,
  VARIABLE_MODIFICATION_FORMAT: /^ ?[a-z][a-zA-Z0-9]* = \d+( ?[+-] ?\d)* ?$/
})

/**
 * An enum containing regex pattern related to naming patterns.
 */
const NamingPatterns = Object.freeze({
  VARIABLE_NAME: /^[a-z][a-zA-Z0-9]*$/
})
