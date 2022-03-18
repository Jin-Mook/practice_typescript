/**
 * 인터섹션 타입
 */
type Admin = {
  name: string;
  privileges: string[];
}

type Employee = {
  name: string;
  startDate: Date;
}

type ElevatedEmployee = Admin & Employee;   // 객체 타입은 각각의 타입 속성이 전부 있어야 한다.

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
}


/**
 * 타입 가드
 */
type Combinable = string | number;
type Numberic = number | boolean;
type Universal = Combinable & Numberic;   // 유니언 타입이 같이 존재하는 number가 타입이 된다.

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {  // 타입가드
    return a.toString() + b.toString()
  }
  return a + b
}

type UnknownEmployee = Employee | Admin;

function printEmplyeeInformation(emp: UnknownEmployee) {
  console.log('Name: ', emp.name)
  if ('privileges' in emp) {  // 타입가드
    console.log('Privileges: ', emp.privileges)
  }
  if ('startDate' in emp) {
    console.log('startDate: ', emp.startDate)
  }
}

printEmplyeeInformation(e1)
printEmplyeeInformation({name: 'Manue', startDate: new Date()})


class Car {
  drive() {
    console.log('Driving...')
  }
}

class Truck {
  drive() {
    console.log('Driving a truck....')
  }

  loadCargo(amount: number) {
    console.log('loading cargo ...' + amount)
  }
}

type Vehicle = Car | Truck;

const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
  vehicle.drive()
  // if ('loadCargo' in vehicle) {   타입가드
  //   vehicle.loadCargo(1000)
  // }

  if (vehicle instanceof Truck) {   // 타입가드
    vehicle.loadCargo(1000)
  }
}

useVehicle(v1);
useVehicle(v2)

/**
 * 구별된 유니언
 */

interface Bird {
  type: 'bird'
  flyingSpeed: number;
}

interface Horse {
  type: 'horse'
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  // if ('flyingSpeed' in animal) {
  //   console.log('Moving with speed: ', animal.flyingSpeed)
  // }
  let speed;
  switch(animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at spped: ', + speed)
}

moveAnimal({type: 'bird', flyingSpeed: 10})

/**
 * 형 변환
 */
// const paragraph = document.querySelector('#message-output')!; !는 null이 아니라는 의미
// const paragraph = <HTMLInputElement>document.querySelector('#message-output')!;  <>를 이용해 타입을 지정할 수 있지만 리액트 구문과 겹치기때문에 아래 방법을 사용하자.
const paragraph = document.querySelector('#message-output') as HTMLInputElement;

paragraph.value = 'Hi there!'

/**
 * 인덱스 속성 => 인터페이스에 유연성을 준다.
 */

interface ErrorContainer {  // { email: 'Not a valid email', username: 'Must start with a character'}
  // id: number;  인덱스 속성 때문에 에러가 난다.
  [prop: string]: string;  // 해당 객체에는 모두 문자열 속성을 지녀야 한다.
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Must start with a character'
}

/**
 * 함수 오버로드 => 타입스크립트가 자체적으로 타입을 추론하지 못할때 유용하다.
 */
function add2(a: string, b: string): string;
function add2(a: number, b: number): number;
function add2(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {  // 타입가드
    return a.toString() + b.toString()
  }
  return a + b
}

const result = add2('Max', ' schwarz')
result.split(' ')

/**
 * 옵셔널 체이닝
 */

const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: {title: 'CEO', description: 'my own company'}
}
console.log(fetchedUserData?.job?.title)

/**
 * null 병합
 */

const userInput = 0;
const storedData = userInput || 'DEFAULT'  // 0이나 빈 문자열도 DEFALT가 돤다.
const storedData2 = userInput ?? 'DEFALT'  // null이나 undefined만 DEFALT가 된다.
console.log(storedData)
console.log(storedData2)