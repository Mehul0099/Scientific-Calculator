
const checkInput = (event) => {
  if (!(/^[a-z0-9\-\/\+\*\-\.\^\(\)\%]*$/g).test(event.target.value)) {
    event.target.value = event.target.value.slice(0, event.target.value.length - 1);
    return false;
  }
}
input.addEventListener('input', checkInput);


let string = "";
let buttons = document.querySelectorAll('.main-btn');
Array.from(buttons).forEach((button) => {
  button.addEventListener('click', (e) => {
    if (e.target.innerHTML == '=') {
      string = eval(string);
      document.getElementById('output').value = string;
    }
    else if (e.target.innerHTML == 'C') {
      string = ""
      document.getElementById('input').value = string;
    }
    else {
      console.log(e.target)
      string = string + e.target.innerHTML;
      document.getElementById('input').value = string;
    }
  })
})


const replaceableString = {
  "sin": "Math.sin",
  "cos(": "Math.cos(",
  "tan": "Math.tan",
  "cosec": "1/Math.sin",
  "sec": "1/Math.cos",
  "cot": "1/Math.tan",
  "^": "**",
  "abs": "Math.abs",
  "log": "Math.log",
  "ln": "Math.log10",
  "sqrt": "Math.sqrt",
  "exp": "Math.exp",
  "π": "Math.PI",
  "cbrt": "Math.cbrt",
  "floor": "Math.floor",
  "ceil": "Math.ceil",
}


const input = document.getElementById('input');
const output = document.getElementById('output');
const errDiv = document.getElementById('err-div');
const errMsg = document.getElementById('err-msg');
const errDivCloseBtn = document.getElementById('err-close-btn');
const mPlus = document.getElementById('M+');
const mMinus = document.getElementById('M-');
const mr = document.getElementById('MR');
const mc = document.getElementById('MC');
const ms = document.getElementById('MS');


const clear = () => {
  input.value = "";
  output.value = "";
  string = "";
}
document.getElementById('C').addEventListener('click', clear);


const addPlusMinus = () => {
  let inputValue = input.value;
  if (inputValue[inputValue.length - 1] === "-" && inputValue[inputValue.length - 2] === "(")
    input.value = inputValue.slice(0, inputValue.length - 2);
  else
    input.value += '(-';
}
document.getElementById('plus-minus').addEventListener('click', addPlusMinus);


const addExp = (event) => {
  let inputValue = input.value;
  if (inputValue[inputValue.length - 1] !== "+" && inputValue[inputValue.length - 2] !== "e" && inputValue[inputValue.length - 3] !== ".")
    input.value += event.target.dataset.value;
}
document.getElementById('exp').addEventListener('click', addExp);


const backSpace = () => {
  input.value = input.value.slice(0, input.value.length - 1);
}
document.getElementById('backspace').addEventListener('click', backSpace);


const fact = (num) => {
  if (num <= 1) {
    return 1;
  }
  return num * fact(num - 1);
}

const findFactorial = () => {
  let factDigits = /[0-9]+!{1}/g.exec(input.value + "!");
  if (factDigits !== null) {
    factDigits[0] = factDigits[0].slice(0, factDigits[0].length - 1);
    let result = fact(factDigits);
    let remainingPart = input.value.slice(0, factDigits['index']);
    output.value = remainingPart + (parseInt(result) === result ? result : result.toFixed(2));
    input.value = ""
    string = ""
  } else {
    throwErr();
  }
}
document.getElementById('fact').addEventListener('click', findFactorial);


const getEvalExpression = (exp) => {
  let evalExp = exp;
  Object.entries(replaceableString).forEach(([key, value]) => {
    evalExp = evalExp.replaceAll(key, value);
  });

  return evalExp;
}



//  Add value inside the memory
const addMemory = () => {
  let data = localStorage.getItem('data');
  if (output.value !== '') {
    localStorage.setItem('data', data ? parseInt(data) + parseInt(output.value) : output.value);
    checkMemory();
  }
}
mPlus.addEventListener('click', addMemory);

//  Add value inside the memory
const subMemory = () => {
  let data = localStorage.getItem('data');
  if (output.value !== '') {
    localStorage.setItem('data', data ? data - output.value : output.value * -1);
    checkMemory();
  }
}
mMinus.addEventListener('click', subMemory);

//  Clear memory
mc.addEventListener('click', () => {
  localStorage.clear();
  output.value = "";
  checkMemory();
});

//  Assign memory
ms.addEventListener('click', () => {
  if (input.value && isFinite(input.value))
    localStorage.setItem('data', input.value);
  checkMemory();
});

//  Show the memory value
mr.addEventListener('click', () => output.value = localStorage.getItem('data'));
/************************* Memory management ************************/