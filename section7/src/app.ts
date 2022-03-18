/**
 * 제너릭 타입
 */
const names: Array<string> = [];   // string[]
// names[0].split(' ')

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done!')
  }, 2000)
})

promise.then(data => {
  data.split(' ')   // 제너릭으로 string을 반환하는 것을 명시했기 때문에 타입스크립트의 장점을 사용할 수 있다.
})

/**
 * 제너릭 함수 생성하기 및 제약 조건 작업하기
 */

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}
const mergeObj = merge({name: 'Max'}, {age: 30})
console.log(mergeObj.age)
// console.log(merge({name: 'Max'}, 30))  // 제약 조건을 주었기 때문에 number 타입이 올 수 없다.

/** 
 * 다른 일반 함수
 */
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.'
  if (element.length === 1) {
    descriptionText = 'Got 1 element.'
  } else if (element.length > 1) {
    descriptionText = 'Got' + element.length + ' elements.'
  }
  return [element, descriptionText]
}

console.log(countAndDescribe('Hi there'))
console.log(countAndDescribe(['sports', 'cooking']))

/**
 * keyof 제약 조건
 */

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'value' + obj[key]
}

extractAndConvert({name: 'max'}, 'name')

/**
 * 제너릭 클래스
 */

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Max')
textStorage.addItem('Manu')
textStorage.removeItem('Max')
console.log(textStorage.getItems())

/**
 * 제너릭 유틸리티 타입
 */

// Partial 타입 => 속성을 추가할 때 유용하다.
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}
  courseGoal.title = title
  courseGoal.description = description
  courseGoal.completeUntil = date
  return courseGoal as CourseGoal
}

// ReadOnly => 추가할 수 없게 해준다, 객체도 잠글 수 있다.
const names2: Readonly<string[]> = ['Max', 'Sports']
// names2.push('Manu')
// names2.pop()
