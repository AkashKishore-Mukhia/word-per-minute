const textDiv = document.querySelector(".text-container");
const input_box = document.getElementById("input-box");
const clock_tag = document.querySelector('.clock');
const Accur = document.querySelector('.accur');
const Wpm = document.querySelector('.wpm');
const resultData = document.querySelector('.result-data');
const wpmDiv = document.querySelector('.wpm-result');
const accDiv = document.querySelector('.acc-result');
input_box.addEventListener("input", handleInput);
document.getElementById("restart-btn").addEventListener('click', handleClick);



// global variables
let characterArray, idx = 0, AccuracyCnt = 0, wpmCnt = 1, text, clock_flag = true, second, x;


const clock = () => {
  second = 0;
  x = setInterval(()=> {
    second += 1;
    clock_tag.innerHTML = second;
    if(second >= 60) {
      const wpmDiv = document.createElement('div');
      const accDiv = document.createElement('div');
      accDiv.innerHTML = `Accuracy: ${acc}%`;
      wpmDiv.innerHTML = wpm;
      resultData.append(wpmDiv);
      resultData.append(accDiv);
      input_box.style.display = 'none';
      clearInterval(x);
    }
  }, 1000)
}


// repaly button
function handleClick() {
  wpmCnt = 1;
  AccuracyCnt = 0;
  clearInterval(x);
  clock_tag.innerHTML = 0;
  clock_flag = true;
  textDiv.innerHTML = "";
  input_box.value = '';
  idx = 0;
  createSpan();
  input_box.style.display = 'inline';
  resultData.style.display = 'none';
}

async function createSpan() {
  const res = await fetch('https://comfortable-sandals-bee.cyclic.app/api/v1/quotes')
  const data = await res.json()
  text = data.res
  characterArray = text.split('');
  console.log(characterArray);
  // creating the span for each charater
  characterArray.forEach((character, index) => {
    const spanChar = document.createElement('span');
    spanChar.classList.add(`id${index}`);
    spanChar.innerText = character;
    textDiv.append(spanChar);
  })
}


function timeOut() {
  const wpmDiv = document.createElement('div');
  const accDiv = document.createElement('div');
  accDiv.innerHTML = `Accuracy: ${acc}%`;
  wpmDiv.innerHTML = wpm;
  resultData.append(wpmDiv);
  resultData.append(accDiv);
  input_box.style.display = 'none';
  clearInterval(x);
}


function handleInput(e) {
  let curr = e.data;
  console.log(e.data);
  if(clock_flag) {
    clock_flag = false;
    clock();
  }

  if(curr === characterArray[idx] && curr === ' ') {
    console.log("same", idx);
    e.target.value = '';
    wpmCnt++;
    if(idx != characterArray-1) idx++;
  }else if(curr === characterArray[idx]) {
    const currSpan = document.querySelector(`.id${idx}`);
    currSpan.setAttribute('id', 'active');
    console.log(currSpan.getAttribute('id'));
    if(idx != characterArray-1) idx++;
  }else if(curr === null) {
    if(idx != characterArray-1) idx--;
    const currSpan = document.querySelector(`.id${idx}`);
    currSpan.removeAttribute('id');
  }else {
    console.log("not same", idx);
    const currSpan = document.querySelector(`.id${idx}`);
    currSpan.setAttribute('id', 'passive');
    AccuracyCnt++;
    if(idx != characterArray-1) idx++;
  }

  const wpm = `${parseInt(wpmCnt*60/second)} wpm`;
  Wpm.innerHTML = wpm;
  let acc = 100-(parseInt(AccuracyCnt * 100 /text.length));
  
  if(idx === characterArray.length) {
    console.log('last', idx);
    const currSpan = document.querySelector(`.id${idx-1}`);
    if(currSpan.getAttribute('id') === 'active') {
      console.log('last, active', idx-1);
      accDiv.innerText = `Accuracy:   ${acc}%`;
      wpmDiv.innerText = `Your speed:   ${wpm}`;
      resultData.append(wpmDiv);
      resultData.append(accDiv);
      input_box.style.display = 'none';
      resultData.style.display = 'block';
      clearInterval(x);
    }
  }
}

console.log(document);
createSpan();











// if(curr === characterArray[idx]) {
//   console.log("same", idx);
//   if(curr === ' ') {
//     e.target.value = '';
//     wpmCnt++;
//   }else{
//     const currSpan = document.querySelector(`.id${idx}`);
//     currSpan.setAttribute('id', 'active');
//   }
//   idx++;
// }else if(curr === null) {
//   idx--;
//   const currSpan = document.querySelector(`.id${idx}`);
//   currSpan.removeAttribute('id');
// }else {
//   console.log("not same", idx);
//   const currSpan = document.querySelector(`.id${idx}`);
//   currSpan.setAttribute('id', 'passive');
//   idx++;
//   AccuracyCnt++;
// }