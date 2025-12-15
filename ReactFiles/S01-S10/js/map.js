const myArray = [1,2,3,4];

const newArray = myArray.map((value, index, array)=>{
    return value * 2
})

console.log(myArray, newArray)