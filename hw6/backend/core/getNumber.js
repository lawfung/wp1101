let n = null
const genNumber =  () => {
  n = Math.floor(Math.random() * 99) + 1;
  console.log(n)
}
const getNumber =  () => {if(n === null){genNumber();} return n;};
export { genNumber, getNumber }