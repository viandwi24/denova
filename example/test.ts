export class Test {
    count: number = 0;
    increase(num: number) {
        this.count += num;
    }
    print() {
        console.log(`Count is : ${this.count}`);
    }
}