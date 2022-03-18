"use strict";
var _a;
const e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') { // 타입가드
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmplyeeInformation(emp) {
    console.log('Name: ', emp.name);
    if ('privileges' in emp) { // 타입가드
        console.log('Privileges: ', emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('startDate: ', emp.startDate);
    }
}
printEmplyeeInformation(e1);
printEmplyeeInformation({ name: 'Manue', startDate: new Date() });
class Car {
    drive() {
        console.log('Driving...');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck....');
    }
    loadCargo(amount) {
        console.log('loading cargo ...' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    // if ('loadCargo' in vehicle) {   타입가드
    //   vehicle.loadCargo(1000)
    // }
    if (vehicle instanceof Truck) { // 타입가드
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    // if ('flyingSpeed' in animal) {
    //   console.log('Moving with speed: ', animal.flyingSpeed)
    // }
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Moving at spped: ', +speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 10 });
/**
 * 형 변환
 */
// const paragraph = document.querySelector('#message-output')!; !는 null이 아니라는 의미
// const paragraph = <HTMLInputElement>document.querySelector('#message-output')!;  <>를 이용해 타입을 지정할 수 있지만 리액트 구문과 겹치기때문에 아래 방법을 사용하자.
const paragraph = document.querySelector('#message-output');
paragraph.value = 'Hi there!';
const errorBag = {
    email: 'Not a valid email',
    username: 'Must start with a character'
};
function add2(a, b) {
    if (typeof a === 'string' || typeof b === 'string') { // 타입가이드
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = add2('Max', ' schwarz');
result.split(' ');
/**
 * 옵셔널 체이닝
 */
const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'my own company' }
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
/**
 * null 병합
 */
const userInput = 0;
const storedData = userInput || 'DEFAULT'; // 0이나 빈 문자열도 DEFALT가 돤다.
const storedData2 = userInput !== null && userInput !== void 0 ? userInput : 'DEFALT'; // null이나 undefined만 DEFALT가 된다.
console.log(storedData);
console.log(storedData2);
