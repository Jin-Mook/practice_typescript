abstract class Department {
  static fiscalYear = 2020
  // private readonly id: string;
  // private name: string;
  protected employees: string[] = [];  // 해당 클래스에서만 접근 가능하다 => 상속된 클래스에서도 접근 불가능하다.
  // 따라서 외부에서 접근 불가능하지만 상속된 클래스에서 접근 가능하게 하려면 protected 속성을 주면 된다.

  constructor(protected readonly id: string, public name: string) {   // typescript에서 코드 양을 줄일 수 있다.
    // this.id = id
    // this.name = name
    // this.name = name
    console.log(Department.fiscalYear)
  }

  static createEmployee(name: string) {
    return {name: name}
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

// 클래스 상속
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT')
    this.admins = admins
  }

  describe() {
    console.log('IT Department - ID: ' + this.id)
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport    // getter는 반드시 return값이 있어야 한다.
    }
    throw new Error('No report found.')
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value')
    }
    this.addReport(value)
  }

  private constructor(id: string, public reports: string[]) {
    super(id, 'Accounting')
    this.lastReport = reports[0]

  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance
    }
    this.instance = new AccountingDepartment('d2', [])
    return this.instance
  }

  addEmployee(name: string) {   // 기본 클래스의 메서드를 무시하고 추가한 구현을 적용할 수 있다.
    if (name === 'Max') return;
    this.employees.push(name)   // employees는 protected이어야 한다.
  }

  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text
  }

  printReports() {
    console.log(this.reports)
  }

  describe() {
      console.log('Accounting Department -ID: ' + this.id)
  }
}

const employee1 = Department.createEmployee("Max")
console.log(employee1, Department.fiscalYear)

const it = new ITDepartment('d1', ['Max'])
it.addEmployee('Mex')
it.addEmployee('Manu')
console.log(it)

// const account = new AccountingDepartment('d2', [])
const account = AccountingDepartment.getInstance()
const account2 = AccountingDepartment.getInstance()
account.mostRecentReport = 'Year End Report';

console.log(account, account2)

account.addReport('Something went wrong...')

console.log(account.mostRecentReport)
account.addEmployee('Manu')
account.addEmployee('Max')
// account.printReports()
// account.printEmployeeInformation()
account.describe()