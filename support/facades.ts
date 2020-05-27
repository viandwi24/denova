let cache: Array<any> = [];

export function getFacade(className: string, classObj: any) {
    let s = cache.find(e => e.key === className);
    if (typeof s == 'undefined') {
        let classOutput = classObj;
        classOutput = addWM(classOutput);
        if (typeof classOutput == 'function') classOutput = classOutput();
        cache.push({ key: className, class: classOutput });
        return classOutput;
    }
    return s.class;
}

function addWM(obj: object) {
    let newObj = { ...obj, isFacade: true};
    return Object.assign(
        Object.create( Object.getPrototypeOf(obj) ),
        newObj
    );
}