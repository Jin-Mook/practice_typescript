"use strict";
/**
 * 퍼스트 클래스 데코레이터
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// function Logger(constructor: Function) {
//   console.log('Logging...')
//   console.log(constructor)
// }
function Logger(logString) {
    console.log('LOGGER FACTORY');
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log('TEMPLATE FACTORY');
    return function (originalConstructor) {
        // console.log('Rendering template')
        // const hookEl = document.querySelector(`#${hookId}`)
        // const p = new originalConstructor()
        // if (hookEl) {
        //   hookEl.innerHTML = template;
        //   hookEl.querySelector('h1')!.textContent = p.name
        // }
        // 생성자 데코레이터의 return값을 줄 수 있다.
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log('Rendering template');
                const hookEl = document.querySelector(`#${hookId}`);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = 'Max';
        console.log('creating person object...');
    }
};
Person = __decorate([
    Logger('LOGGING - PERSON') // 팩토리는 데코레이터 함수가 실행되기 전 위에서부터 먼저 실행된다.
    ,
    WithTemplate('<h1>My Person Object</h1>', 'app') // 데코레이터 함수는 아래부터 시작한다.(즉 return과 관련된 부분)
], Person);
// const pers = new Person()
// console.log(pers)
/**
 * 속성 데코레이터
 */
function Log(target, propertyName) {
    console.log('Property decorator!'); // 위에서는 클래스에 사용되어서 constructor를 인수로 가진것이다.
    console.log('target: ', target);
    console.log('propertyName: ', propertyName);
}
// 접근자 데코레이터 => return 문을 이용해 PropertyDescriptor 를 수정할 수 있다.
function Log2(target, name, descriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
// 메서드 데코레이터
function Log3(target, name, descriptor) {
    console.log('method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
// 매개변수 데코레이터
function Log4(target, name, position) {
    console.log('parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('invalid price -should be positive');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const pro = new Product('bag', 10);
console.log(pro.getPriceWithTax(2));
pro.price = 20;
// 데코레이터는 클래스를 정의할때 실행되는것이지 생성할때 실행되는것이 아니다.
const p1 = new Product('book', 20);
const p2 = new Product('check', 30);
function Autobind(target, methodName, descriptor) {
    console.log('descriptor_autobind: ', descriptor);
    const originalMethod = descriptor.value; // value에 메서드가 연결되어 있다.
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this); // this에 함수를 실행시키는 객체가 바운드 되는 것을 이용한다.
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'This works!';
    }
    showMessage() {
        console.log(this);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
p.showMessage();
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage); // undefined를 나타낸다 => showMessage의 this가 button을 나타내기 때문 => 데코레이터로 해결
button.addEventListener('click', p.showMessage.bind(p)); // 따라서 bind로 this에 p를 연결해줄 수 있다.
const registeredValidators = {};
function Required(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['required'] });
}
function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['positive'] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    console.log('obj: ', obj.constructor);
    console.dir(obj.constructor);
    console.log('name: ', objValidatorConfig);
    if (!objValidatorConfig)
        return true;
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.querySelector('#title');
    const priceEl = document.querySelector('#price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('invalid input, please try again');
        return;
    }
    console.log(createdCourse); // 아무것도 입력하지 않아도 에러가 발생하지 않는다. => 이때 타당성 검사 데코레이터를 이용할 수 있다.
});
