const display = document.getElementById("display");
let isResultDisplay = false;
let prevAns = '';

function appendToDisplay(input) {
  if (isResultDisplay) {
    clearDisplay();
  }
  display.value += input;
  isResultDisplay = false;
}

function appendAnswer(){
    if(prevAns !== ''){
        if(isResultDisplay){
            clearDisplay();
        }
        display.value += prevAns;
        isResultDisplay = false;
    }
}

function backspace() {
  if(!isResultDisplay){
    display.value = display.value.slice(0, -1);
  }
}

function calculation() {
  try {
    let result = eval(display.value);
    display.value = result;
    prevAns = result;
    isResultDisplay = true;
  } catch (error) {
    display.value = "Error";
    isResultDisplay = true;
  }
}

function clearDisplay() {
  display.value = "";
  isResultDisplay = false;
}