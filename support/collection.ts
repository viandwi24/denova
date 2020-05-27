export class Collection {
    collection: any;

    constructor(collection: object|any) {
        this.collection = collection;
    }

    toArray() {
        Object.entries(this.collection);
    }

    toJson() {
        return JSON.stringify(this.collection);
    }
}