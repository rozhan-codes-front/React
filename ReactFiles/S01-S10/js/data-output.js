export const myNumbers = [1, 2, 3, 4];
const animals = ['Panda', 'Bear', 'Eagle']; // Not available directly outside the module

export default function myLogger() {
  console.log(myNumbers, animals);
}

export class Faradars {
   constructor() {
     // ...
   }
}