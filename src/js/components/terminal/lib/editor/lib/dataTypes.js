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
   * @param {string} id - The unique id identifier.
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
   * @throws {Error} - If method has no valid implementation.
   */
  passByValue () {
    throw new Error('Method getValue not implemented.')
  }
}
