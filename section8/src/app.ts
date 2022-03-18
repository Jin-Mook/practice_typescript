/**
 * 퍼스트 클래스 데코레이터
 */

// function Logger(constructor: Function) {
//   console.log('Logging...')
//   console.log(constructor)
// }

function Logger(logString: string) {
  console.log('LOGGER FACTORY')
  return function(constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY')
  return function<T extends { new (...args: any[]): {name: string} }>(originalConstructor: T) {
    // console.log('Rendering template')
    // const hookEl = document.querySelector(`#${hookId}`)
    // const p = new originalConstructor()
    // if (hookEl) {
    //   hookEl.innerHTML = template;
    //   hookEl.querySelector('h1')!.textContent = p.name
    // }
    
    // 생성자 데코레이터의 return값을 줄 수 있다.
    return class extends originalConstructor {       // 클래스 데코레이터에서 클래스 반환 (및 변경)
      constructor(..._: any[]) {
        super()
        console.log('Rendering template')
        const hookEl = document.querySelector(`#${hookId}`)
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name
        }
      }
    }
  }
}


@Logger('LOGGING - PERSON')                         // 팩토리는 데코레이터 함수가 실행되기 전 위에서부터 먼저 실행된다.
@WithTemplate('<h1>My Person Object</h1>', 'app')   // 데코레이터 함수는 아래부터 시작한다.(즉 return과 관련된 부분)
class Person {
  name = 'Max';

  constructor() {
    console.log('creating person object...')
  }
}

// const pers = new Person()
// console.log(pers)

/**
 * 속성 데코레이터
 */

function Log(target: any, propertyName: string | Symbol) {   // 데코레이터 함수는 어디에 작성되는지에 따라 인수가 다르다.
  console.log('Property decorator!')                         // 위에서는 클래스에 사용되어서 constructor를 인수로 가진것이다.
  console.log('target: ', target)
  console.log('propertyName: ', propertyName)
}

// 접근자 데코레이터 => return 문을 이용해 PropertyDescriptor 를 수정할 수 있다.
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!')
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// 메서드 데코레이터
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('method decorator!')
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// 매개변수 데코레이터
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('parameter decorator!')
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error('invalid price -should be positive')
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}

const pro = new Product('bag', 10)
console.log(pro.getPriceWithTax(2))
pro.price = 20

// 데코레이터는 클래스를 정의할때 실행되는것이지 생성할때 실행되는것이 아니다.
const p1 = new Product('book', 20)
const p2 = new Product('check', 30)


function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
  console.log('descriptor_autobind: ', descriptor)
  const originalMethod = descriptor.value   // value에 메서드가 연결되어 있다.
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);  // this에 함수를 실행시키는 객체가 바운드 되는 것을 이용한다.
      return boundFn;
    }
  }
  return adjDescriptor
}

class Printer {
  message = 'This works!'

  @Autobind
  showMessage() {
    console.log(this)
  }
}

const p = new Printer()
p.showMessage()

const button = document.querySelector('button')! as HTMLButtonElement;
button.addEventListener('click', p.showMessage)  // undefined를 나타낸다 => showMessage의 this가 button을 나타내기 때문 => 데코레이터로 해결
button.addEventListener('click', p.showMessage.bind(p))  // 따라서 bind로 this에 p를 연결해줄 수 있다.

/**
 * 타당성 검사 데코레이터
 */

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]  // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  console.log('obj: ', obj.constructor)
  console.dir(obj.constructor)
  console.log('name: ', objValidatorConfig)
  if (!objValidatorConfig) return true;
  let isValid = true
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
        case 'positive':
          isValid = isValid && obj[prop] > 0
      }
    }
  }
  return isValid
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}

const courseForm = document.querySelector('form') as HTMLFormElement;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.querySelector('#title') as HTMLInputElement;
  const priceEl = document.querySelector('#price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value
  const createdCourse = new Course(title, price)

  if (!validate(createdCourse)) {
    alert('invalid input, please try again')
    return;
  }

  console.log(createdCourse)    // 아무것도 입력하지 않아도 에러가 발생하지 않는다. => 이때 타당성 검사 데코레이터를 이용할 수 있다.
})












