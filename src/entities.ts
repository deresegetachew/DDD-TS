/**
 * Entities represent Unique Objects of the same type
 * Entities implement behavior in addition to state
 */

/**
 * why i didn't use private keyword.
 * It turns out that TypeScript’s private keyword is an indication of the class-builder’s intent, but not a true defense against abuse.
 * The private keyword only works when your design tools enforce it.
 * Once you compile your TypeScript to JavaScript, the access keywords and stripped away and everything becomes public. Other than that
 * this errors don't translate into compile time errors.
 * # are private fields that actually javascript enforces.
 */

class Product {
  //many rules  are mixed in one large chunk of code
  // not ideal for checking the validity of multiple properties of the entity
  // to solve this refere value objects
  // if we mess the order of parameters during calling it will still compile, but our entity will be constructed incorrectly
  constructor(id: string, vendorId: string) {
    if (!id) throw new Error('Identity must be specified');

    if (!vendorId) throw new Error('vendor id must be specified');

    this.#_id = id;
    this.#_vendorId = vendorId;
  }

  // entities need to have a unique identifier and must be accessible outside of the entity
  // identity must be immutable and globally unique.
  // in general, the use of natural attributes (attributes that come from the real world) is not a good way to represent an entity’s identity.
  // It must be something intangible; something that you artificially create and assign to the entity and thus can ensure that it is both unique and immutable.
  // database primary key is a completely separate concept, not related to DDD or Domain modeling.

  #_id: string;

  public get id(): string {
    return this.#_id;
  }

  set internalId(newInternalId: string) {
    this.#_id = newInternalId;
  }

  //transfer Ubiquitous language to code; we have defined the behaviors of our entity
  //transferred  words from our command sticky note to methods.
  public setTitle = function (title: string): void {
    this.#_title = title;
  };
  public updateDescription = function (description: string): void {
    this.#_description = description;
  };
  public updatePrice = function (price: number): void {
    this.#_price = price;
  };
  public setProductGroup = function (groupId: string): void {
    this.#_groupdId = groupId;
  };

  #_title: string;
  #_description: string;
  #_price: number;
  #_groupdId: string;
  #_vendorId: string;
}

export {};
