const bntColorRandom = () => {
  const header2 = document.querySelector('header');
  const buttonColorRandom = document.createElement('button');
  buttonColorRandom.id = 'button-random-color';
  buttonColorRandom.textContent = 'Trocar Cores';
  header2.appendChild(buttonColorRandom);
};

const divsColorPalette = () => {
  const createColorPalette = document.querySelector('#color-palette');
  for (let index = 0; index < 4; index += 1) {
    const divsPalette = document.createElement('div');
    divsPalette.classList.add('color');
    createColorPalette.appendChild(divsPalette);
  }
};
const backgroundPalette = () => {
  const color1 = Math.floor(Math.random() * 255);
  const color2 = Math.floor(Math.random() * 256);
  const color3 = Math.floor(Math.random() * 256);

  return `rgb(${color1}, ${color2}, ${color3})`;
};

const colorLocalStorage = (array) => {
  localStorage.setItem('colorPalette', JSON.stringify(array));
};

const recoveredStorage = () => {
  const divsPalette = document.querySelectorAll('.color');
  const colors = JSON.parse(localStorage.getItem('colorPalette'));
  divsPalette[0].style.backgroundColor = 'black';
  for (let index = 1; index < divsPalette.length; index += 1) {
    divsPalette[index].style.backgroundColor = colors[index];
  }
};

const addColors = () => {
  const divsPalette = document.querySelectorAll('.color');
  const colors = [];
  for (let index = 0; index < divsPalette.length; index += 1) {
    const color = backgroundPalette();
    divsPalette[0].style.backgroundColor = 'black';
    divsPalette[index].style.backgroundColor = color;
    colors.push(color);
  }
  colorLocalStorage(colors);
};

const pixelsLocalStorage = (array) => {
  localStorage.setItem('pixelBoard', JSON.stringify(array));
};

const pixelNewLocalStorage = () => {
  const colorPixel = [];
  const getPixel = document.getElementsByClassName('pixel');
  for (let index = 0; index < getPixel.length; index += 1) {
    colorPixel.push(getPixel[index].style.backgroundColor);
  }
  pixelsLocalStorage(colorPixel);
};

const paintWhiteBoard = (event) => {
  const eventPixel = event.target;
  const selectedColor = document.querySelector('.selected');
  eventPixel.style.backgroundColor = selectedColor.style.backgroundColor;
  pixelNewLocalStorage();
};

const drawBoard = (width, size) => {
  const callBoard = document.querySelector('#pixel-board');
  callBoard.innerHTML = '';
  callBoard.style.width = width;
  callBoard.style.height = width;
  for (let index = 0; index < size; index += 1) {
    const create25divs = document.createElement('div');
    create25divs.classList.add('pixel');
    create25divs.style.backgroundColor = 'white';
    create25divs.addEventListener('click', paintWhiteBoard);
    callBoard.appendChild(create25divs);
  }
};

const board = (input) => {
  const boardSize = input * input;
  const header1 = document.querySelector('header');
  if (document.getElementById('pixel-board')) {
    drawBoard(`${40 * input}px`, boardSize);
  } else {
    const createBoard = document.createElement('div');
    createBoard.style.width = `${40 * input}px`;
    createBoard.style.height = `${40 * input}px`;
    createBoard.id = 'pixel-board';
    header1.appendChild(createBoard);
    for (let index = 0; index < boardSize; index += 1) {
      const create25divs = document.createElement('div');
      create25divs.classList.add('pixel');
      create25divs.style.backgroundColor = 'white';
      create25divs.addEventListener('click', paintWhiteBoard);
      createBoard.appendChild(create25divs);
    }
  }
};

const bntEventColor = () => {
  const bntEvent = document.querySelector('#button-random-color');
  bntEvent.addEventListener('click', addColors);
};

const inicialBlackColor = () => {
  const getColor = document.querySelectorAll('.color');
  getColor[0].classList.add('selected');
};

const selectColor = (event) => {
  const getSelected = document.querySelector('.selected');
  getSelected.classList.remove('selected');
  event.target.classList.add('selected');
};

const takeColor = () => {
  const getColor = document.getElementsByClassName('color');
  for (let index = 0; index < getColor.length; index += 1) {
    getColor[index].addEventListener('click', selectColor);
  }
};

const saveLocalStorage = () => {
  const getPixel = document.getElementsByClassName('pixel');
  const pixel = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index = 0; index < getPixel.length; index += 1) {
    getPixel[index].style.backgroundColor = pixel[index];
  }
};

const bntClear = () => {
  const paletteColor = document.querySelector('header');
  const createBntClear = document.createElement('button');
  createBntClear.id = 'clear-board';
  createBntClear.textContent = 'Limpar';
  paletteColor.appendChild(createBntClear);
};

const clearBoard = () => {
  const createBntClear = document.getElementById('clear-board');
  const getPixel = document.getElementsByClassName('pixel');
  createBntClear.addEventListener('click', () => {
    for (let index = 0; index < getPixel.length; index += 1) {
      getPixel[index].style.backgroundColor = 'white';
    }
  });
};

const divSize = () => {
  const header3 = document.querySelector('header');
  const creatDiv = document.createElement('div');
  creatDiv.id = 'div-input-size';
  header3.appendChild(creatDiv);
};

const inputSize = () => {
  const div = document.querySelector('#div-input-size');
  const iSize = document.createElement('input');
  iSize.id = 'board-size';
  iSize.type = 'number';
  iSize.min = '1';
  div.appendChild(iSize);
};

const buttonSize = () => {
  const input = document.querySelector('#div-input-size');
  const bntSize = document.createElement('button');
  bntSize.id = 'generate-board';
  bntSize.textContent = 'Altere tamanho';
  input.appendChild(bntSize);
};

const minMaxBoard = (value) => {
  let newValue = value;
  if (newValue < 5) {
    newValue = 5;
  } else if (newValue > 50) {
    newValue = 50;
  }
  return newValue;
};

const boardSizeLocalStorage = (value) => {
  localStorage.setItem('boardSize', JSON.stringify(value));
};

const loadBoardLocalStorage = () => {
  const boardLocalStorage = JSON.parse(localStorage.getItem('boardSize'));
  board(boardLocalStorage);
};

const bntSizeEvent = () => {
  const inputValue = document.querySelector('#board-size');
  const { value } = inputValue;

  if (value) {
    board(minMaxBoard(value));
  } else {
    alert('Board inválido!');
  }
  boardSizeLocalStorage(minMaxBoard(value));
};

const takeValueBtn = () => {
  const btnTakevalue = document.querySelector('#generate-board');
  btnTakevalue.addEventListener('click', bntSizeEvent);
};

const callFunction = () => {
  if (localStorage.colorPalette) {
    recoveredStorage();
  } else {
    addColors();
  }
  inicialBlackColor();
  takeColor();
  clearBoard();
  if (localStorage.pixelBoard) saveLocalStorage();
};

window.onload = () => {
  bntColorRandom();
  divsColorPalette();
  bntClear();
  divSize();
  inputSize();
  buttonSize();
  board(5);
  bntEventColor();
  takeValueBtn();
  if (localStorage.boardSize) loadBoardLocalStorage();
  callFunction();
};
