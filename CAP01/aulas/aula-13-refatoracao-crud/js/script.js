let globalNames = ['teste'];
let inputName = null;
let currentIndex = null;
let isEditing = false;

// garante que o html carregou antes de executar o script
window.addEventListener('load', () =>{
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  activeteInput();
  render();
});


// faz a listagem dos nomes na página
function render(){
  
  function createDeleteButton(index){

    // delete um nome da lista
    function deleteName(){
      globalNames.splice(index,1);
      render();
    }

    let button = document.createElement('button');
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
    let span = document.createElement('span');
    span.textContent = name;
    span.addEventListener('click', editName)
    return span;
  }

  let divNames = document.querySelector('#names');
  let ul = document.createElement('ul');

  divNames.innerHTML = '';

  for(let i = 0; i < globalNames.length; i ++){
    let li = document.createElement('li');
    let button = createDeleteButton(i);
    let span = createSpan(globalNames[i], i);

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
  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit)
}
// ativa o input ao carrega a pagina e escuta ele
function activeteInput(){
  // funcao que escuta o input
  function handleTyping(event){
    if(event.key == 'Enter' && event.target.value){
      let newName = event.target.value
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
const clearInput = () => {
  inputName.value = '';
  inputName.focus();
}