import * as dataTypes from './dataTypes.js'
import { ExecutableBlock } from './executableBlock.js'
import { Operation } from './operation.js'

/**
 * Represents a code compiler.
 *
 * @event EngineCompiler#memoryAllocationRequest - Dispatched when a variable needs to be stored in memory.
 * @event EngineCompiler#addToCallStack - Dispatched when an Execution block has been constructed
 * @event EngineCompiler#requestMemoryReference - Dispatched when the compiler is in need of a memory reference.
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

    const memoryDependencies = [intPointer]
    const operationPairs = []
    let operationSymbol = ''

    for (let i = 0; i < operationVariables.length; i++) {
      if (i === 0) {
        operationSymbol = '='
      }

      if (/^[+-]$/.test(operationVariables[i])) {
        operationSymbol = operationVariables[i]
        continue
      }

      let val = operationVariables[i]

      if (!dataTypes.isStrictInteger(val)) {
        // If not an integer. First check if it matches the pattern for a variable declaration.
        if (!NamingPatterns.VARIABLE_NAME.test(val)) {
          throw new Error(`${val} is not a valid variable name.`)
        }

        // If it is a valid variable name. Add it to the memory dependency.

        // This hack allows the listener to populate the array with the reference requested.
        // Better than exposing the heap directly to this class.
        const tempMemoryRef = []
        this.dispatchEvent(new CustomEvent('EngineCompiler#requestMemoryReference', {
          bubbles: true,
          detail: {
            memoryHolder: tempMemoryRef,
            requestID: btoa(val)
          }
        }))

        if (!tempMemoryRef[0]) {
          throw new Error(`No reference for ${val} found.`)
        }

        memoryDependencies.push(tempMemoryRef[0])
        val = tempMemoryRef[0]
      }

      const operationPair = Operation.createIntOperationPair(operationSymbol, val)
      operationPairs.push(operationPair)
    }

    // Build final operation string.
    const finalOperation = Operation.constructIntModification(intPointer, ...operationPairs)
    return new ExecutableBlock(memoryDependencies, finalOperation)
  }

  /**
   * Determines the operation based on the raw input string.
   *
   * @param {string} str - The input string.
   * @throws {Error} - If no valid operation could be extracted from the raw input.
   * @returns {ExecutableBlock} - The executable block build from the raw input string.
   */
  #stringDeclaration (str) {
    if (!DeclarationFormats.STRING_DECLARATION_FORMAT.test(str)) {
      throw new Error(`Incorrect string declaration: ${str}`)
    }

    // Split input at "=" to separate the two halves of the statement.
    const [declarator, operation] = str.split('=').map((x) => x.trim())

    // Determine variable name by removing prefix.
    const variableName = declarator.replace(/^string /i, '')
    const variableID = btoa(variableName)

    const stringPointer = new dataTypes.CharacterCollection('', variableID) // Set value to empty string when initializing.

    this.dispatchEvent(new CustomEvent('EngineCompiler#memoryAllocationRequest', {
      bubbles: true,
      detail: { pointer: stringPointer }
    }))

    // Determine operation logic.
    const operationVariables = operation.match(/"[^"]*"|'[^']*'|[^"' ]+/g)

    const memoryDependencies = [variableID]
    const operationPairs = []
    let operationSymbol = ''

    for (let i = 0; i < operationVariables.length; i++) {
      if (i === 0) {
        operationSymbol = '='
      }

      if (/^[+]$/.test(operationVariables[i])) {
        operationSymbol = operationVariables[i]
        continue
      }

      if (!/(^".*"$|^'.*'$)/.test(operationVariables[i])) {
        // If not a string. First check if it matches the pattern for a variable declaration.
        if (!NamingPatterns.VARIABLE_NAME.test(operationVariables[i])) {
          throw new Error(`${operationVariables[i]} is not a valid variable name.`)
        }
        // If it is a valid variable name. Add it to the memory dependency.
        memoryDependencies.push(btoa(operationVariables[i]))
      } else {
        // Remove either single or double quote depending on what the string is constructed with.
        if (operationVariables[i].startsWith("'") && operationVariables[i].endsWith("'")) {
          operationVariables[i] = operationVariables[i].replace(/'/g, '')
        } else if (operationVariables[i].startsWith('"') && operationVariables[i].endsWith('"')) {
          operationVariables[i] = operationVariables[i].replace(/"/g, '')
        }
      }

      const operationPair = Operation.createStringOperationPair(operationSymbol, operationVariables[i])
      console.log(operationPair)
      operationPairs.push(operationPair)
    }

    // Build final operation string.
    const finalOperation = Operation.constructStringModification(stringPointer, ...operationPairs)
    return new ExecutableBlock(memoryDependencies, finalOperation)
  }

  /**
   * Determines the operation based on the raw input string.
   *
   * @param {string} str - The input string.
   * @throws {Error} - If no valid operation could be extracted from the raw input.
   * @returns {ExecutableBlock} - The executable block build from the raw input string.
   */
  #operationDeclaration (str) {
    // Skip first element as it is the full match.
    const [, command, expression] = str.match(/([a-z][a-zA-Z0-9]*)\((.*?)\)/)

    if (!DeclarationFormats.INLINE_OPERATION.test(expression)) {
      throw new Error(`Invalid operation: ${expression}`)
    }

    // Determine operation logic.
    const operationVariables = expression.match(/"[^"]*"|'[^']*'|\d+|[+]|[^"' ]+/g)
    const memoryDependencies = []
    const operationPairs = []
    let operationSymbol = ''

    // We need a temp pointer in order to store the modification.
    const tempString = new dataTypes.CharacterCollection('', 'temp')
    memoryDependencies.push(tempString)

    for (let i = 0; i < operationVariables.length; i++) {
      if (i === 0) {
        operationSymbol = '='
      }

      if (/^[+]$/.test(operationVariables[i])) {
        operationSymbol = operationVariables[i]
        continue
      }

      if (!/(^".*"$|^'.*'$|\d+)/.test(operationVariables[i])) {
        // If not a string or integer. First check if it matches the pattern for a variable declaration.
        if (!NamingPatterns.VARIABLE_NAME.test(operationVariables[i])) {
          throw new Error(`${operationVariables[i]} is not a valid variable name.`)
        }
        // If it is a valid variable name. Add it to the memory dependency.
        memoryDependencies.push(btoa(operationVariables[i]))
      } else {
        // Remove either single or double quote depending on what the string is constructed with.
        if (operationVariables[i].startsWith("'") && operationVariables[i].endsWith("'")) {
          operationVariables[i] = operationVariables[i].replace(/'/g, '')
        } else if (operationVariables[i].startsWith('"') && operationVariables[i].endsWith('"')) {
          operationVariables[i] = operationVariables[i].replace(/"/g, '')
        }
      }

      const operationPair = Operation.createStringOperationPair(operationSymbol, operationVariables[i])
      console.log(operationPair)
      operationPairs.push(operationPair)
    }

    // Construct operation chain.
    const inlineOperation = Operation.constructStringModification(tempString, ...operationPairs)
    const inlineExecBlock = new ExecutableBlock(memoryDependencies, inlineOperation)
    const outputOperation = Operation.tryGetSystemOperation(command, inlineExecBlock)

    return new ExecutableBlock([], outputOperation)
  }
}

/**
 * An enum containing regex pattern related to available operations.
 */
const OperationPatterns = Object.freeze({
  INT_DECLARATION: /^ ?int /,
  STRING_DECLARATION: /^ ?string /,
  OPERATION_DECLARATION: /^ ?[a-z][a-zA-Z0-9]*\((.*)\) ?$/
})

/**
 * An enum containing regex pattern related to declaration formats.
 */
const DeclarationFormats = Object.freeze({
  INT_DECLARATION_FORMAT: /^ ?int [a-z][a-zA-Z0-9]* = (\d+|[a-z][a-zA-Z0-9]*)( [+-] (\d+|[a-z][a-zA-Z0-9]*))* ?$/,
  STRING_DECLARATION_FORMAT: /^ ?string [a-z][a-zA-Z0-9]* = (" *[^"]* *"|' *[^']* *')( [+] (" *[^"]* *"|' *[^']* *'))* ?$/,
  INLINE_OPERATION: /^ ?(" *[^"]* *"|' *[^']* *'|\d+)( [+] (" *[^"]* *"|' *[^']* *'|\d+))* ?$/
})

/**
 * An enum containing regex pattern related to naming patterns.
 */
const NamingPatterns = Object.freeze({
  VARIABLE_NAME: /^[a-z][a-zA-Z0-9]*$/
})
