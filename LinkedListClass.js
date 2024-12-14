class Node {
  constructor(value = null) {
    this.value = value;
    this.nextValue = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextValue = newNode;
      this.tail = newNode;
    }

    this.size++;
    return this;
  }

  preappend(value) {
    const newFirstNode = new Node(value);

    if (!this.head) {
      this.head = newFirstNode;
      this.tail = newFirstNode;
    } else {
      newFirstNode.nextValue = this.head;
      this.head = newFirstNode;
    }

    this.size++;
    return this;
  }

  at(index) {
    if (index < 0 || index > this.size) {
      throw new Error('invalid index');
    }

    return this.getNodeFromIndex(index);
  }

  pop() {
    if (!this.head) {
      return null;
    }

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size--;

      return this;
    }

    const prevLastNodeInIndex = this.getNodeFromIndex(this.size - 2);
    prevLastNodeInIndex.nextValue = null;
    this.tail = prevLastNodeInIndex;
    this.size--;

    return this;
  }

  contains(value) {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextValue;
    }

    return false;
  }

  find(value) {
    let currentNode = this.head;
    let counter = 0;

    while (currentNode) {
      if (currentNode.value === value) return counter;
      currentNode = currentNode.nextValue;
      counter++;
    }

    return null;
  }

  getNodeFromIndex(index) {
    let currentNode = this.head;
    let counter = 0;

    while (counter !== index) {
      currentNode = currentNode.nextValue;
      counter++;
    }

    return currentNode;
  }

  toString() {
    let currentNode = this.head;
    let result = '';

    while (currentNode) {
      result += `(${currentNode.value}) -> `;
      currentNode = currentNode.nextValue;
    }

    return `${(result += null)}`;
  }

  insertAt(value, index) {
    if (index < -1 || index > this.size) {
      return null;
    }

    if (index === 0) {
      return this.preappend(value);
    }

    if (index === this.size || index === -1) {
      return this.append(value);
    }

    const newNode = new Node(value);
    const prevNode = this.getNodeFromIndex(index - 1);
    newNode.nextValue = prevNode.nextValue;
    prevNode.nextValue = newNode;

    this.size++;
    return this;
  }

  removeAt(index) {
    if (index < 0 || index > this.size) {
      return null;
    }

    if (index === 0) {
      this.head = this.head.nextValue;
      this.size--;

      if (this.size === 0) {
        this.tail = null;
      }

      return this;
    }

    const prevNode = this.getNodeFromIndex(index - 1);
    const unwantedNode = prevNode.nextValue;

    prevNode.nextValue = unwantedNode.nextValue;

    if (index === this.size - 1) {
      this.tail = prevNode;
    }

    this.size--;

    return this;
  }
}

const linkedList = new LinkedList();

console.log(linkedList);

linkedList.append(1).append(2).append(3);

console.log(linkedList.at(0));
console.log(linkedList.toString());
console.log(linkedList.contains(3));
console.log(linkedList.find(5));
console.log(linkedList.insertAt(4, -1));
console.log(linkedList.insertAt(666, 0));

linkedList.removeAt(0);

console.log(linkedList);
