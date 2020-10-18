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
    return this._value === val.value;
  }

  //getter method _value private field
  get value() {
    return this._value;
  }
}

//value Object
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

class Money extends ValueObject {
  private readonly type: string;
  constructor(amount: number) {
    super(amount);
    this.isValid();
    Object.setPrototypeOf(this, Money.prototype); //carefully when copying and pasting change the class from ProductId to your new Class
    this.type = this.constructor.name; // basically setting the className to our type property.
  }

  isValid(): boolean {
    if (this.value == undefined || this.value == null)
      throw new Error('Invalid Money');
    else return true;
  }

  format(locale: string, currency: string) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(this.value);
  }

  addMoney(amount: number): Money {
    return new Money(amount + this.value);
  }

  subtractMoney(amount: number): Money {
    return new Money(this.value - amount);
  }
}

class Price extends Money {
  isValid(): boolean {
    if (this.value < 0) {
      throw new Error('Price cannot be negative');
    }
    return true;
  }
}

class ProductTitle extends ValueObject {
  private readonly type: string;
  constructor(title: string) {
    super(title);
    this.isValid();
    Object.setPrototypeOf(this, ProductTitle.prototype); //carefully when copying and pasting change the class from ProductId to your new Class
    this.type = this.constructor.name; // basically setting the className to our type property.
  }

  isValid(): boolean {
    if (this.value == undefined || this.value == null || this.value.length == 0)
      throw new Error('Product Title can not be empty');
    else if (this.value.length > 100)
      throw new Error('Title can not be longer than 100 characters');
    else return true;
  }
}

class ProductDescription extends ValueObject {
  private readonly type: string;
  constructor(description: string) {
    super(description);
    this.isValid();
    Object.setPrototypeOf(this, ProductDescription.prototype); //carefully when copying and pasting change the class from ProductId to your new Class
    this.type = this.constructor.name; // basically setting the className to our type property.
  }

  isValid(): boolean {
    if (this.value == undefined || this.value == null || this.value.length == 0)
      throw new Error('Product ProductDescription can not be empty');
    else if (this.value.length > 1000)
      throw new Error(
        'ProductDescription can not be longer than 1000 characters'
      );
    else return true;
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
  public setTitle = function (title: ProductTitle): void {
    this.#_title = title;
  };
  public setDescription = function (description: ProductDescription): void {
    this.#_description = description;
  };
  public setPrice = function (price: Price): void {
    this.#_price = price;
  };
  public setProductGroup = function (groupId: string): void {
    this.#_groupdId = groupId;
  };

  #_title: ProductTitle;
  #_description: ProductDescription;
  #_price: Price;
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

pr1.setDescription(new ProductDescription('Iphone x 8GB RAM, 512 GB Storage'));
pr1.setPrice(new Price(50));
pr1.setTitle(new ProductTitle('Iphone X'));

// price extends Money

//let p0 = new Price(-200); //this will throw an error as price can not be negative

const p1 = new Price(50);
console.log('??', p1.value, p1.format('en-US', 'EUR'));

const dollar1 = new Money(1);
const dollar2 = new Money(2);

const banknote3 = new Money(3);

console.log(dollar1.addMoney(dollar2.value).equals(banknote3));

export {};
