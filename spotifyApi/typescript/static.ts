class Thing {
    private static prop: string = "val01";

    constructor(private name: string) {
        this.name = name;
    }

    changeStatic(val: string) {
        Thing.prop = val;
        console.log(this.name + " changed static variable to " + Thing.prop);
    }

    checkStatic() {
        console.log(this.name + " sees static value: " + Thing.prop);
    }

    public static useStaticMethod() {
        let val: number = 0;
        console.log("Value in static method is " + val);
        val++;
        console.log("Attempted to increment value in method");
    }
}

const thing1: Thing = new Thing("Thing1"),
    thing2: Thing = new Thing("Thing2");

const printStatus = () => {
    thing1.checkStatic();
    thing2.checkStatic();
    console.log();
}

console.log();
printStatus();
thing1.changeStatic("val02");
printStatus();

Thing.useStaticMethod();
Thing.useStaticMethod();
console.log();