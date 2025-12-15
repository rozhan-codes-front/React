const myArray = [1,2,3,4];

const newArray = myArray.reduce((acc, currValue,currIndex, array)=>{
    return acc + currValue
}, 0)

const average = newArray/myArray.length;

console.log(myArray, average)