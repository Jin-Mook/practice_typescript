"use strict";
/**
 * 제너릭 타입
 */
const names = []; // string[]
// names[0].split(' ')
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});
promise.then(data => {
    data.split(' '); // 제너릭으로 string을 반환하는 것을 명시했기 때문에 타입스크립트의 장점을 사용할 수 있다.
});
/**
 * 제너릭 함수 생성하기 및 제약 조건 작업하기
 */
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergeObj = merge({ name: 'Max' }, { age: 30 });
console.log(mergeObj.age);
function countAndDescribe(element) {
    let descriptionText = 'Got no value.';
    if (element.length === 1) {
        descriptionText = 'Got 1 element.';
    }
    else if (element.length > 1) {
        descriptionText = 'Got' + element.length + ' elements.';
    }
    return [element, descriptionText];
}
console.log(countAndDescribe('Hi there'));
console.log(countAndDescribe(['sports', 'cooking']));
/**
 * keyof 제약 조건
 */
function extractAndConvert(obj, key) {
    return 'value' + obj[key];
}
extractAndConvert({ name: 'max' }, 'name');
/**
 * 제너릭 클래스
 */
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
// ReadOnly => 추가할 수 없게 해준다, 객체도 잠글 수 있다.
const names2 = ['Max', 'Sports'];
// names2.push('Manu')
// names2.pop()
