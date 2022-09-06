import '@/css/index.css';
import ball from '@/images/ball_0.png';
import coin from '@/images/coin.png';
import firefox from '@/images/firefox.jpg';
import itemPhone from '@/images/item_phone2.png';
// 若圖片小於 8kB 會被轉為 base64 格式
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

const imgBall = document.createElement('img');
imgBall.src = ball;
document.body.appendChild(imgBall);

const imgCoin = document.createElement('img');
imgCoin.src = coin;
document.body.appendChild(imgCoin); // 19.96KB 大於 8kB 不會被轉換
