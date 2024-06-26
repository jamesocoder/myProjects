/* A demonstration of the capabilities and peculiarities of a function
interface.  Note the 3 different typing methods shown: regular, optional,
and rest. */
interface MyFunction {(
    param1: string,
    param2?: number,
    ...param3: boolean[]
    ): boolean
};

// Note how a default value can only be given in the actual function definition
let fn: MyFunction = (p1: string = "default"): boolean => {
    return true;
}

/* Note that the caller will be made to always provide the arguments the
interface requires, even if the actual function definition does not call for
them */
console.log(fn("string", undefined, true, false, false));

/* Class interface
Note how we can't make anything required by an interface private or protected */
interface Complaining {
    readonly entity: string;

    profession?: string;

    complain(): void
}

class Renter implements Complaining {
    constructor(readonly entity: string) {}

    complain(): void {
        console.log(
            "\n" + this.entity + " is upset because their rent is too " + 
            "high and their neighbors are too loud."
        );
    }
}

let someGuy = new Renter("Jesus");
someGuy.complain();