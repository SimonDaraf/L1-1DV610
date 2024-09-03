// --- POINTER --- //

/**
 * An abstract pointer class.
 */
class Pointer {
  /**
   * A unique identifier.
   *
   * @type {string}
   */
  #id

  /**
   * Constructs an instance of a variable pointer.
   *
   * @param {string} id - The unique identifier.
   * @throws {Error} - If an instance of the abstract pointer class is instantiated soley.
   */
  constructor (id) {
    if (this.constructor === Pointer) {
      throw new Error('Cannot instantiate an instance of an abstract pointer class.')
    }

    this.#id = id
  }

  /**
   * Sets the value of variable instance.
   *
   * @param {*} newValue - The new value.
   * @throws {Error} - If method has no valid implementation.
   */
  setValue (newValue) {
    throw new Error('Method setValue not implemented.')
  }

  /**
   * Returns the current value held by the variable.
   *
   * @throws {Error} - If method has no valid implementation.
   */
  getValue () {
    throw new Error('Method getValue not implemented.')
  }

  /**
   * Returns a identical copy of the variable to be passed by value.
   *
   * @returns {*} - The identical variable copy.
   * @param {string} id - The unique identifier for the new value reference.
   * @throws {Error} - If method has no valid implementation.
   */
  passByValue (id) {
    throw new Error('Method getValue not implemented.')
  }
}

// --- INTEGER --- //

/**
 * Represents an integer data type.
 *
 * @augments Pointer
 */
export class Integer extends Pointer {
  /**
   * The integer value.
   *
   * @type {number}
   */
  #value

  /**
   * Constrcuts an integer variable.
   *
   * @param {number} value - The integer value.
   * @param {string} id - The unique identifier.
   * @throws {Error} - If assigned value is not an integer.
   */
  constructor (value, id) {
    super(id)
    this.setValue(value)
  }

  /**
   * Sets a new integer value.
   *
   * @override
   * @param {number} newValue - The new integer value.
   * @throws {Error} - If assigned value is not an integer.
   */
  setValue (newValue) {
    if (!Number.isInteger(newValue)) {
      throw new Error('Invalid value assigned to variable of type integer.')
    }
    this.#value = newValue
  }

  /**
   * Returns the value of the integer variable.
   *
   * @override
   * @returns {number} - The integer value.
   */
  getValue () {
    return this.#value
  }

  /**
   * Returns a new integer copy of this instance.
   *
   * @override
   * @param {string} id - The new unique id to be assigned to the copy.
   * @returns {Integer} - The integer copy.
   */
  passByValue (id) {
    return new Integer(this.#value, id)
  }
}

// --- STRING --- //

/**
 * represents a string data type.
 *
 * @augments Pointer
 */
export class CharacterCollection extends Pointer {
  /**
   * The string value.
   *
   * @type {string}
   */
  #value

  /**
   * Constructs an instance of the character collection class.
   *
   * @param {string} value - The string value.
   * @param {string} id - The unique identifier.
   * @throws {Error} - If assigned value is not a string.
   */
  constructor (value, id) {
    super(id)
    this.setValue(value)
  }

  /**
   * Sets a new integer value.
   *
   * @override
   * @param {string} newValue - The new string value.
   * @throws {Error} - If assigned value is not a string.
   */
  setValue (newValue) {
    if (typeof newValue !== 'string' || !(newValue instanceof String)) {
      throw new Error('Invalid value assigned to variable of type string.')
    }
    this.#value = newValue
  }

  /**
   * Returns the value of the string variable.
   *
   * @override
   * @returns {string} - The string value.
   */
  getValue () {
    return this.#value
  }

  /**
   * Returns a new character collection copy of this instance.
   *
   * @override
   * @param {string} id - The new unique id to be assigned to the copy.
   * @returns {CharacterCollection} - The character collection copy.
   */
  passByValue (id) {
    return new CharacterCollection(this.#value, id)
  }
}
