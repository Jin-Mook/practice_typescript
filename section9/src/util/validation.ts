namespace App {
  // Validation
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }
  
  export function validate(validatabaleInput: Validatable) {
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
}