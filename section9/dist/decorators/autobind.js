// autobind decorator
export function Autobind(target, methodName, descriptor) {
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
//# sourceMappingURL=autobind.js.map