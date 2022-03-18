"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validatabaleInput) {
    let isValid = true;
    if (validatabaleInput.required) {
        isValid = isValid && validatabaleInput.value.toString().trim().length !== 0;
    }
    if (validatabaleInput.minLength != null && typeof validatabaleInput.value === 'string') {
        isValid = isValid && validatabaleInput.value.length >= validatabaleInput.minLength;
    }
    if (validatabaleInput.maxLength != null && typeof validatabaleInput.value === 'string') {
        isValid = isValid && validatabaleInput.value.length <= validatabaleInput.maxLength;
    }
    if (validatabaleInput.min != null && typeof validatabaleInput.value === 'number') {
        isValid = isValid && validatabaleInput.value >= validatabaleInput.min;
    }
    if (validatabaleInput.max != null && typeof validatabaleInput.value === 'number') {
        isValid = isValid && validatabaleInput.value <= validatabaleInput.max;
    }
    return isValid;
}
// autobind decorator
function Autobind(target, methodName, descriptor) {
    console.log(descriptor);
    const adjustDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = descriptor.value.bind(this);
            return boundFn;
        }
    };
    return adjustDescriptor;
}
// ProjectInput
class ProjectInput {
    constructor() {
        this.templateElement = document.querySelector('#project-input');
        this.hostElement = document.querySelector('#app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert('invalid input, please try again');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
//# sourceMappingURL=app.js.map