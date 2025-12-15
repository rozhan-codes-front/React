const myArray = [3,65,4,12,468,0]

const newArray = myArray.filter((value, index, array)=>{
    return value % 2 == 0
})

console.log(myArray, newArray)