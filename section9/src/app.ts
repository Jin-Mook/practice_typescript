// Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatabaleInput: Validatable) {
  let isValid = true;
  if (validatabaleInput.required) {
    isValid = isValid && validatabaleInput.value.toString().trim().length !== 0
  }
  if (validatabaleInput.minLength != null && typeof validatabaleInput.value === 'string') {
    isValid = isValid && validatabaleInput.value.length >= validatabaleInput.minLength
  }
  if (validatabaleInput.maxLength != null && typeof validatabaleInput.value === 'string') {
    isValid = isValid && validatabaleInput.value.length <= validatabaleInput.maxLength
  }
  if (validatabaleInput.min != null && typeof validatabaleInput.value === 'number') {
    isValid = isValid && validatabaleInput.value >= validatabaleInput.min
  }
  if (validatabaleInput.max != null && typeof validatabaleInput.value === 'number') {
    isValid = isValid && validatabaleInput.value <= validatabaleInput.max
  }
  return isValid
}

// autobind decorator
function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
  console.log(descriptor)
  const adjustDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = descriptor.value.bind(this)
      return boundFn
    }
  }
  return adjustDescriptor
}

// ProjectInput
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;


  constructor() {
    this.templateElement = document.querySelector('#project-input') as HTMLTemplateElement;
    this.hostElement = document.querySelector('#app') as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as HTMLFormElement
    this.element.id = 'user-input'

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
    
    this.configure()
    this.attach()
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    }
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    }
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    }

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) || 
      !validate(peopleValidatable)
    ) {
      alert('invalid input, please try again')
      return ;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }


  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value)
    const userInput = this.gatherUserInput()

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people)
      this.clearInputs()
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const prjInput = new ProjectInput()