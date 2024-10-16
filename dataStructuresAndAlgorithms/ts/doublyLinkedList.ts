export type OptionalNode = DllNode<any> | null;
export type NodeDirection = 'prev' | 'next';

export class DllNode<TPayload> {
    private data: TPayload;
    private prev?: OptionalNode;
    private next?: OptionalNode;

    constructor (data: TPayload, prev: OptionalNode = null, next: OptionalNode = null) {
        this.data = data;
        
        if (prev !== null) {
            this.link('prev', prev);
        } else {
            this.prev = prev;
        }

        if (next !== null) {
            this.link('next', next);
        } else {
            this.next = next;
        }
    }

    link(position: NodeDirection, neighbor: DllNode<any>) {
        /* A node will only be allowed to link to one other node on either
        side of it.  If the neighbor already has a neighbor in the position
        this node will take, cut off that link.
        
        WARNING: This has the potential to create orphaned branches. */
        if (position === 'prev') {
            this.prev = neighbor;
            if (neighbor.next !== null) {
                neighbor.next!.prev = null;
            }
            neighbor.next = this;
        } else {
            this.next = neighbor;
            if (neighbor.prev !== null) {
                neighbor.prev!.next = null;
            }
            neighbor.prev = this;
        }
    }

    select(direction: NodeDirection) {
        return direction === 'prev' ? this.prev : this.next;
    }

    printData() {
        if (this.data === null) {return 'null';}

        if (typeof this.data === 'object') {
            return this.data.toString();
        } else {
            // Data is a primitive type
            return this.data as string;
        }
    }

    printChild(direction: NodeDirection) {
        let str = (direction === 'prev') ? 'PREVIOUS' : 'NEXT';
        str += ': ';

        let child = this.select(direction);
        if (child === null) {
            str += 'null';
        } else {
            str += child!.printData();
        }
        str += '\n';

        return str;
    }

    toString() {
        return `CURRENT: ${this.printData()}\n` +
            this.printChild('prev') +
            this.printChild('next');
    }
}

function testModule() {
    console.log();
    let head = new DllNode<number>(1);
    let left = new DllNode<string>('two', head);
    let right = new DllNode<Error>(new Error('I am node number 3.'), left);
    console.log(head.toString());
    console.log(left.toString());
    console.log(right.toString());
}

// testModule();