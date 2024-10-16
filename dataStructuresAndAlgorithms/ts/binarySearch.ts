import * as dll from './doublyLinkedList';

type BinaryDirection = 'left' | 'right';

/* A typical comparator puts elements <= the current node on the left
 and elements > the current node on the right. */
interface Comparator {(
    oldNode: dll.DllNode<any>,
    newNode: dll.DllNode<any>
): BinaryDirection};

class BinaryTree {
    public compare: Function;
    private head: dll.OptionalNode;
    private size: number;

    constructor(comparator: Comparator, head?: dll.DllNode<any>) {
        this.compare = comparator;
        if (head) {
            this.head = head;
            this.size = 1;
        } else {
            this.head = null;
            this.size = 0;
        }
    }

    private translateDirection(direction: BinaryDirection) {
        return (direction == 'left') ? 'prev' : 'next';
    }

    dfs(currentNode: dll.DllNode<any>, target: dll.DllNode<any>): {
        parent: dll.DllNode<any>,
        position: BinaryDirection
    } {
        let direction = this.compare(currentNode, target);
        let nextNode = currentNode.select(this.translateDirection(direction));
        return (nextNode == null) ?
            {parent: currentNode, position: direction} :
            this.dfs(nextNode, target);
    }

    insert(newNode: dll.DllNode<any>) {
        if (this.size == 0) {
            this.head = newNode;
            this.size = 1;
        } else {
            let {parent, position} = this.dfs(this.head!, newNode);
            parent.link(this.translateDirection(position), newNode);
        }
    }

    // TODO: Use a BFS to find the median (this.size / 2) of the tree
    findMedian(): dll.OptionalNode {
        if (this.size == 0) { return null; }
        let targetIndex = Math.round(this.size / 2) - 1;
        let i = 0;
        while (i != targetIndex) {

        }
    }

    balanceTree() {
        if (this.size == 0) { return; }
        let newRoot = this.findMedian();
    }
}