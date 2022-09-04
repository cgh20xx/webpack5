import './css/index.css';
console.log('dev server');

class Dog {
  #age = 999;
}

const dog = new Dog();
console.log(dog.age); // undefined
