import './css/index.css';
console.log('dev server');

class Dog {
  #age = 999;
  #privateMethod() {
    return 'hello world';
  }
  getPrivateMessage() {
    return this.#privateMethod();
  }
}

const dog = new Dog();
console.log(dog);
console.log(dog.age); // undefined
console.log(dog.getPrivateMessage()); // undefined

const arr = [1, 2, 3, 4, 5];
console.log(arr.findLast((el) => el > 2));
