/**
 * A value object is an object with no conceptual identity that describe a domain aspect (u care about what they are not who they are).
 * Value Objects allow declaring entity properties with explicit types that use the ubiquitous language.
 * Value Objects can define how they can be explicitly created and what operations can be performed within and between them
 *
 * taken form (https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/microservice-domain-model)
 * Something that is an entity in a microservice might not be an entity in another microservice,
 * because in the second case, the Bounded Context might have a different meaning.
 * For example, an address in an e-commerce application might not have an identity at all,
 * since it might only represent a group of attributes of the customer's profile for a person or company.
 * In this case, the address should be classified as a value object.
 * However, in an application for an electric power utility company, the customer address could be important for the business domain.
 * Therefore, the address must have an identity so the billing system can be directly linked to the address.
 * In that case, an address should be classified as a domain entity.
 *
 *
 * entities are considered equal if their identities are the same and
 * Value objects are not just wrapper types around primitive types,
 * value objects equality is established by value; hence the name value objects.
 * since the value objects we created productId and vendorId are class instances a
 * normal equal operation on those will result in checking equality of reference objects
 * which will fail .
 *
 * please referer to entitiesUsingValueObjects.ts
 *
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

//lets try it did we achieve to create entities with our value objects
//remember entities are considered equal if their identities are the same

//entity 1
const _productId = new ProductId('1');
const _vendorId = new VendorId('2');

const pr1 = new Product2(_productId, _vendorId);

const _productIdx = new ProductId('1');
const _vendorIdx = new VendorId('2');

const pr2 = new Product2(_productIdx, _vendorIdx);

//problem 1 even though the value objects represent the same data they are not equal

console.log(_productId === _productIdx); //will output false

console.log(pr1 == pr2); // will output false

//question how do we enforce equality of value objects by value
//and also two entities that have the same identity to be equall.

export {};
