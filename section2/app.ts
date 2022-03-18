let userInput: unknown;   // 타입 체킹이 가능하다.
let userName: string;

userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
  userName = userInput
}

function generateError(message: string, code: number): never {
  throw {message: message, errorCode: code}
}

generateError('An error occurred!', 500)