abstract class StaticVal {
    private static _value: number = 1;

    protected get value(): number {
        return StaticVal._value;
    }
    
    protected set value(newValue: number) {
        StaticVal._value = newValue;
        /* We will expect the concrete class to print a customized notification
        whenever this is invoked.*/
    }

    abstract checkStatic(): void

    abstract doAction(): void
}

class Incrementor extends StaticVal {
    constructor() {
        super();
    }

    checkStatic() {
        console.log("Incrementor sees static value of " + super.value);
    }

    doAction() {
        super.value++;
        console.log("Incrementor increased static value.");
    }
}

class Decrementor extends StaticVal{
    constructor() {
        super();
    }

    checkStatic(): void {
        console.log("Decrementor sees static value of " + super.value);
    }

    doAction(): void {
        super.value--;
        console.log("Decrementor decreased static value.");
    }
}


// Demonstrating polymorphism with the above class family
const printStatus = (staticOperators: StaticVal[]) => {
    staticOperators.forEach(thing => {
        thing.checkStatic();
    });
    console.log();
}

const doAllActions = (staticOperators: StaticVal[]) => {
    staticOperators.forEach(thing => {
        thing.doAction();
        printStatus(staticOperators);
    });
}

const things: StaticVal[] = [new Incrementor(), new Decrementor()];

console.log();
printStatus(things);
doAllActions(things);