// type AddFn = (a: number, b: number) => number;

interface AddFn {  // 함수타입도 interface로 정의할 수 있다.
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
}

interface Named {
  readonly name?: string;  // readonly 속성만 사용 가능하다 => 한번만 설정하며 다음부터는 읽기만 가능, private, public 속성은 없다.
  outputName?: string;   // 옵션으로 타입을 정할 수 있다 => 없어도 된다.
}


interface Greetable extends Named {  // 객체의 타입만 정의한다. 구체적인 구현이 아닌 서로 다른 클래스 간의 기능을 공유하기 위해 사용한다.
  greet?(phrase: string): void; 
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }
  
  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + ' ' + this.name)
    } else {
      console.log('Hi')
    }
  }
}


let user1: Greetable;

user1 = new Person()

if (user1.greet) {
  user1.greet('hi i am')
}
console.log(user1)