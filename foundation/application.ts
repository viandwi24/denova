import { bind as bindApp } from "../app.ts";

export class Application {
    container: Array<any> = [];

    constructor(addGlobal: boolean = true) {
        if (addGlobal) bindApp(this);
    }

    singleton(key: string|object, value: any = null) {
        let parse = this.handleService({ key, value });
        key = parse.key;
        value = parse.value;

        /** push */
        this.container.push({ key, value, type: 'singleton' });
        return this.make(key);
    }


    bind(key: string|object, value: any = null) {
        let parse = this.handleService({ key, value });
        key = parse.key;
        value = parse.value;

        /** push */
        this.container.push({ key, value, type: 'bind' });  
        return this.make(key);
    }

    make(key: string|object, ifNull?: any) {
        let s = this.container.find(e => e.key === key);
        let service = (typeof s === 'undefined') ? null : s;

        /** if not service */
        if (service == null) return (typeof ifNull == 'undefined' ? null : ifNull);

        /** clone a bind */
        if (service.type == 'bind') {
            if (this.isClass(service.value)) {
                return Object.assign(
                    Object.create( Object.getPrototypeOf(service.value) ),
                    this.handleValue(service.value)
                );
            } else if (typeof service.value == 'object') {
                return Object.assign({}, this.handleValue(service.value));
            } else {
                let clone = Object.assign({}, this.handleValue(service.value));
                return clone[0];
            }
        }

        /** return a service value */
        return this.handleValue(service.value);
    }

    private handleValue(value: any) {
        return (this.isFunction(value)) ? value(this) : value;
    }

    private isFunction(value:any) {
        return (typeof value == 'function');
    }

    private handleService(obj: any) {
        let key = obj.key;
        let value = obj.value;
        if (typeof key != 'string') {
            let className = key.constructor.name
            if (typeof className != 'undefined' && className != null && className!= '') {
                key = className;
                value = obj.key;
            }
        }
        return { key, value };
    }

    private isClass(obj:any) {
        const isCtorClass = obj.constructor
            && obj.constructor.toString().substring(0, 5) === 'class'
        if(obj.prototype === undefined) {
          return isCtorClass
        }
        const isPrototypeCtorClass = obj.prototype.constructor 
          && obj.prototype.constructor.toString
          && obj.prototype.constructor.toString().substring(0, 5) === 'class'
        return isCtorClass || isPrototypeCtorClass
    }
}