/**
 *  Trying to make sure our value objects equality is determined through their structural property not their referential value
 *
 */

/**
 * Typescript doesnt support exact types so trying to organize the duplicate functions like equals, lessThan , Copy to an abstract class  will not help us
 * i.e. class Name extends ValueObject , class Age extends ValueObject ; function xx (name:Name,age:Age){...} ;  xx(new Age(),new Name()) will still be valid
 * since they both extends ValueObjects and typescript wont make an exact type comparison
 */

//defining value objects signature
interface IValueObject<T> {
  isValid(): boolean;
  copy?: () => T;
  equals(val: T): boolean;
  isLessThan?(val: T): boolean;
}

//any value object we want will implement this
abstract class ValueObject implements IValueObject<any> {
  constructor(private _value) {}

  abstract isValid(): boolean;
  copy?: (() => any) | undefined;
  equals(val: ValueObject): boolean {
    console.log('???', this._value, val.value);
    return this._value === val.value;
  }

  //getter method _value private field
  get value() {
    return this._value;
  }
}

//value Object
//using static factory method
class ProductId extends ValueObject {
  // this is forcing typescript to kind of exact much ProductId Class , if we move this to VAlueObject it cant differentiate the different
  // valueObject Classes we are creating things like productId, Name ..
  private readonly type: string;

  constructor(id: string) {
    super(id);
    this.isValid();
    Object.setPrototypeOf(this, ProductId.prototype); //carefully when copying and pasting change the class from ProductId to your new Class
    this.type = this.constructor.name; // basically setting the className to our type property.
  }

  //each valueObject we define will define its valid criteria
  isValid(): boolean {
    if (this.value == undefined || this.value == null)
      throw new Error('Id is Invalid');
    return true;
  }
}

//value Object
class VendorId extends ValueObject {
  // this is forcing typescript to kind of exact much ProductId Class , if we move this to VAlueObject it cant differentiate the different
  // valueObject Classes we are creating things like productId, Name ..
  private readonly type: string;

  constructor(id: string) {
    super(id);
    this.isValid();
    Object.setPrototypeOf(this, VendorId.prototype); //carefully when copying and pasting change the class from ProductId to your new Class
    this.type = this.constructor.name; // basically setting the className to our type property.
  }

  //each valueObject we define will define its valid criteria
  isValid(): boolean {
    if (this.value == undefined || this.value == null || this.value == '123')
      throw new Error('Id is Invalid');
    return true;
  }
}

//Product Entity
class Product {
  //Our entity has no more check for the produceId, since, by receiving argument of type ProductId we guarantee that the value is valid.
  //
  constructor(id: ProductId, vendorId: VendorId) {
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

//lets see if we have solved our value objects being equal by value problem

//entity 1
const productId = new ProductId('1');
const vendorId = new VendorId('1234');

const pr1 = new Product(productId, vendorId);

const productIdx = new ProductId('1');
const vendorIdx = new VendorId('1234');

const pr2 = new Product(productIdx, vendorIdx);

//check if the value objects are equal by value
console.log(productId.equals(productIdx)); //will output true; our value objects are equal by their value.

//entity level equality based on identity is not yet assured
console.log(pr1 == pr2); // will output false

export {};
