window.addEventListener('load', start);

function start(){
  var nameInput = document.querySelector('#nameInput');
  nameInput.addEventListener('keyup', countName);
  
}

function countName(event){
  var count = 1;
  count = event.target.value.length;
  var span = document.querySelector('#nameLength');
  span.textContent = count

}