/**
 * Value Objects allow declaring entity properties with explicit types that use the ubiquitous language.
 * Value Objects can define how they can be explicitly created and what operations can be performed within and between them
 */

//value Object
class ProductId {
  readonly #_value;
  constructor(value: string) {
    if (!value) throw new Error(' Product id is invalid');

    this.#_value = value;
  }
}

//value Object
class VendorId {
  readonly #_value;
  constructor(value: string) {
    if (!value) throw new Error('Vendor id is invalid');

    this.#_value = value;
  }
}

//Product Entity
class Product2 {
  //Our entity has no more check for the produceId, since, by receiving argument of type ProductId we guarantee that the value is valid.
  //
  constructor(id: ProductId, vendorId: VendorId) {
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

  #_id: ProductId;

  public get id(): ProductId {
    return this.#_id;
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
  #_vendorId: VendorId;
}
