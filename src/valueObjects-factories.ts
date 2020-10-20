//why factories to create our value objects ?

/*
 *  so in previous entities-usingValeObjects-try2 we had productDescription of type string
 *  what if the requirements change saying it should support markdown partially.
 * remember SOLID principle  Open for extension , closed for modification
 */

//defining value objects signature
interface IValueObject<T> {
  isValid(value: T): boolean;
}

abstract class ValueObjectCreator<T> {
  public abstract factoryMethod(value: T): IValueObject<T>;
  public abstract copy?: () => any;
  public abstract equals(val: any): boolean;
  public abstract isLessThan?(val: any): boolean;
}

interface IProductDescription<T> extends IValueObject<T> {
  value: T;
  trimText(): T;
}

class ProductDescription implements IProductDescription<string> {
  value: string;
  trimText(): string {
    return this.value.trim();
  }
  isValid(value: string): boolean {
    if (this.value == undefined) return false;
    else return true;
  }
  // private readonly type: string;
  // constructor(description: string) {
  //     super(description);
  //     this.isValid();
  //     Object.setPrototypeOf(this, ProductDescription.prototype); //carefully when copying and pasting change the class from ProductId to your new Class
  //     this.type = this.constructor.name; // basically setting the className to our type property.
  // }
}
class ProductDescriptionCreator extends ValueObjectCreator<string> {
  public factoryMethod(): IProductDescription<string> {
    return new ProductDescription();
  }

  public copy?: () => any;
  public equals(val: any): boolean {
    return true;
  }
  public isLessThan?(val: any): boolean {
    throw new Error('Method not implemented.');
  }
}

class ProductDescriptionHtml implements IProductDescription<string> {
  value: string;
  trimText(): string {
    return this.value.trim();
  }
  isValid(): boolean {
    if (this.value == undefined) return false;
    else return true;
  }
  // private readonly type: string;
  // constructor(description: string) {
  //     super(description);
  //     this.isValid();
  //     Object.setPrototypeOf(this, ProductDescription.prototype); //carefully when copying and pasting change the class from ProductId to your new Class
  //     this.type = this.constructor.name; // basically setting the className to our type property.
  // }
}
class ProductDescriptionCreatorHtml extends ValueObjectCreator<string> {
  public factoryMethod(): IProductDescription<string> {
    return new ProductDescriptionHtml();
  }

  public copy?: () => any;
  public equals(val: any): boolean {
    return true;
  }
  public isLessThan?(val: any): boolean {
    throw new Error('Method not implemented.');
  }
}

interface IProductId<T> extends IValueObject<T> {
  value: T;
}
class ProductId implements IProductId<string> {
  value: string;
  isValid(value: string): boolean {
    return true;
  }
}
class ProductIdCreator extends ValueObjectCreator<string> {
  public factoryMethod(): IProductId<string> {
    return new ProductId();
  }
  public copy?: () => any;
  public equals(val: any): boolean {
    throw new Error('Method not implemented.');
  }
  public isLessThan?(val: any): boolean {
    throw new Error('Method not implemented.');
  }
}

interface IVendorId<T> extends IValueObject<T> {
  value: T;
}
class VendorId implements IVendorId<string> {
  value: string;
  isValid(value: string): boolean {
    return true;
  }
}
class VendorIdCreator extends ValueObjectCreator<string> {
  public factoryMethod(value: string): IVendorId<string> {
    if (new VendorId().isValid(value)) return new VendorId();
  }
  public copy?: () => any;
  public equals(val: any): boolean {
    throw new Error('Method not implemented.');
  }
  public isLessThan?(val: any): boolean {
    throw new Error('Method not implemented.');
  }
}

class Product {
  constructor(id: ProductId, vendorId: VendorId) {
    this.#_id = id;
    this.#_vendorId = vendorId;
  }

  #_id: ProductId;
  #_vendorId: VendorId;
}

const productId = new ProductIdCreator().factoryMethod();
const vendorId = new VendorIdCreator().factoryMethod();

const p = new Product(productId, vendorId);

console.log(p);
