export const convertToNum = (num) => {
  let newNum = "";
  for (let i = 0; i < num.length; i++) {
    if (+num[i] === Number(num[i])) newNum += num[i];
  }
  return +newNum;
};
