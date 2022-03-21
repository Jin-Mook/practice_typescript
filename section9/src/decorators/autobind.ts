// autobind decorator
export function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
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
