// garante que o html carregou antes de executar o script
window.addEventListener('load', start);

var globalNames = [];
var inputName = null;
var isEditing = false;
var currentIndex = null;


// executa ao iniciar a aplicação
function start(){
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activeteInput();
  render();
}
// faz a listagem dos nomes na página
function render(){
  
  function createDeleteButton(index){

    // delete um nome da lista
    function deleteName(){
      globalNames.splice(index,1);
      render();
    }

    var button = document.createElement('button');
    button.textContent = 'x';    
    button.classList.add('button-remove');

    button.addEventListener('click', deleteName);

    return button;
  }
  function createSpan(name, index){
    function editName(){
      inputName.value = name;
      isEditing = true;
      currentIndex = index;
      inputName.focus();
    }
    var span = document.createElement('span');
    span.textContent = name;
    span.addEventListener('click', editName)
    return span;
  }

  var divNames = document.querySelector('#names');
  var ul = document.createElement('ul');

  divNames.innerHTML = '';

  for(var i = 0; i < globalNames.length; i ++){
    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(globalNames[i], i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
}
// evita o carregamento da pagina ao das submit
function preventFormSubmit(){
  function handleFormSubmit(event){
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit)
}
// ativa o input ao carrega a pagina e escuta ele
function activeteInput(){
  // funcao que escuta o input
  function handleTyping(event){
    if(event.key == 'Enter' && event.target.value){
      var newName = event.target.value
      !isEditing ? insertName(newName) : updateName(newName);
    }
  }
  // funcao que insere nome no array
  function insertName(newName){
    globalNames.push(newName);    
    render();
    clearInput();
  }
  // funcao que edita o nome no array
  function updateName(newName){
    globalNames[currentIndex] = newName;
    isEditing = false;
    render();
    clearInput();
  }

  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}
// limpa o input
function clearInput(){
  inputName.value = '';
  inputName.focus();
}