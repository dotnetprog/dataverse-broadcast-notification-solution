export function lazy(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    tryDecorate(target, propertyKey, descriptor, "get");
    tryDecorate(target, propertyKey, descriptor, "value");
}

function tryDecorate(target: any, propertyKey: string, descriptior: PropertyDescriptor, key: keyof PropertyDescriptor) {
    if (typeof descriptior[key] === 'function') {
        const propSymbol = Symbol(propertyKey);
        const accessor = descriptior[key];
        descriptior[key] = function (...args: any[]) {
            let that = this as any;
            let value = that[propSymbol];
            if (typeof value === "undefined") {
                value = that[propSymbol] = accessor.apply(this, args);
            }
            return value;
        };
    }
}