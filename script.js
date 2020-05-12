const choices= ['Rock', 'Paper', 'Scissors'];

function pickRandomChoice(){
  return choices[Math.floor(Math.random()*choices.length)];
}
let scoreElement = document.getElementById('score')
let score = 0;
const buttons = document.querySelectorAll('.btn-circle');
let userChoice = undefined;

let winner = undefined;

let variant_user = undefined;
let variant_computer = undefined;
let disabled = false;
buttons.forEach((button, i) => {
  button.addEventListener('click', ()=> {
    userChoice = button.getAttribute('data-choice');
    var lowercase = userChoice.toLowerCase();
    if(!disabled){

    document.getElementById("user").className =
    document.getElementById("user").className.replace( /(?:^|\s)btn-space(?!\S)/g , ` btn-${lowercase}` )
    document.getElementById("user").children[0].innerHTML = `<img src="./images/icon-${lowercase}.svg" alt="${lowercase}-icon" />`


    variant_user = lowercase;
    var computer = checkWinner();
    document.getElementById("computer").className =
    document.getElementById("computer").className.replace( /(?:^|\s)btn-space(?!\S)/g , ` btn-${computer}` )
    document.getElementById("computer").children[0].innerHTML = `<img src="./images/icon-${computer}.svg" alt="${computer}-icon" />`
    variant_computer = computer;
    document.querySelector('.status').style.display = 'flex';
    disabled = true;

    document.querySelector('main').style.display = 'none';
    document.querySelector('.game').style.display = 'flex';
  }
  else alert('Click on the Play Again Button ');
  })
});


function checkWinner(){
  let computerChoice = pickRandomChoice();
  console.log(computerChoice);

  let index_user = choices.indexOf(userChoice);
  let index_computer = choices.indexOf(computerChoice);
  console.log(index_computer);
  if((index_user + 1) % choices.length == index_computer)
    {
      winner = 'computer';
      updateScore(-1);
  }
  else if (userChoice === computerChoice) {
    winner = 'tie';
    updateScore(0);
  }
  else {
    winner = 'user';
    updateScore(1);
  }
  return computerChoice.toLowerCase();
}

const result = document.querySelector('.btn-status');
let result_color_state = undefined;


function updateScore(value){
  score += value;
  scoreElement.innerText = score;
  var status = undefined;
  if (value > 0) {
    status = 'YOU WIN';
    result.className+= ' btn-success';
    result_color_state = 'btn-success';

  }
  else if (value < 0) {status = 'YOU LOSE';
  result.className+= ' btn-danger';
  result_color_state = 'btn-danger';
}
  else {
    status = 'YOU TIED'
    result.className+= ' btn-warning';
    result_color_state = 'btn-warning';
  }
  document.getElementById('result').innerText = status;
}

result.addEventListener('click', ()=>{
  document.getElementById("user").className =
  document.getElementById("user").className.replace( `btn-${variant_user}`  , 'btn-space' );
  var textnode = document.createTextNode('');
  var item = document.getElementById("user").children[0];
  item.replaceChild(textnode, item.children[0]);



  document.getElementById("computer").className =
  document.getElementById("computer").className.replace( `btn-${variant_computer}`  , 'btn-space' );
  var textnode = document.createTextNode('');
  var item = document.getElementById("computer").children[0];
  item.replaceChild(textnode, item.children[0]);
  disabled = false;
  document.querySelector('.status').style.display = 'none';

  result.className =  result.className.replace( `${result_color_state}`  , '');

  document.querySelector('main').style.display = 'flex';
  document.querySelector('.game').style.display = 'none';


})
