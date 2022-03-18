// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];   // typeScript에는 튜플 형태의 자료형이 있다
// } = {
//   name: 'Maximilian',
//   age: 30,
//   hobbies: ['Sports', 'Cooking'],
//   role: [2, 'author']
// }

// person.role[1] = 10;
// person.role.push('admin')  // push는 걸러내지 못한다.
// person.role = [0, 'admin', 'user']

enum Role { ADMIN, READ_ONLY, AUTHOR };   // 숫자값으로 저장한다.

const person = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN
}

console.log(person.role)
console.log(person)