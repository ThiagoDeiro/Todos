var listElement = document.querySelector('#app ul');
var inputElemet = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos(){
    listElement.innerHTML = '';
    for (todo of todos){
        var todoElement = document.createElement('li');
        todoElement.setAttribute('id', 'list-todo')
        var todoText =  document.createTextNode(todo);
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        var editTodo = document.createElement('a')
        editTodo.setAttribute('href', '#')

        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');
        linkElement.setAttribute('class', 'delete')
        var linktext = document.createTextNode('Delete');
        var editText = document.createTextNode('Edit')
        editTodo.setAttribute('onclick', 'editTodo (' + pos + ')');
        editTodo.setAttribute('class', 'edit-button')
        
        editTodo.appendChild(editText)
        linkElement.appendChild(linktext);

        todoElement.appendChild(todoText); 
        todoElement.appendChild(linkElement);
        todoElement.appendChild(editTodo);

        listElement.appendChild(todoElement);
    }
}


var button = document.getElementById("button");
var todoText = document.getElementById("text");
var task = "new";
var posEdit = "";


function addTodo(){
    var todoText = inputElemet.value;

    if (task === "existent") {
        replaceTodo()
    } else if (todoText === '') {
        alert('input must be filled')
    
    }else{ 
        todos.push(todoText)
        inputElemet.value = '';
    }
   
    renderTodos();
    saveToStorage();
}
buttonElement.onclick = addTodo;
renderTodos();

function editTodo(pos){
    var todoText = document.getElementById("text");
    todoText.value = todos[pos];
    task = "existent";
    posEdit = pos;
}

function replaceTodo(){
    var startIndex = posEdit;
      var numberElements = 1;
      todos.splice(startIndex, numberElements, todoText.value);
      inputElemet.value = '';
      task = "new";
      renderTodos()
      saveToStorage();
  }

  

function deleteTodo(pos){
    todos.splice(pos, 1);

    renderTodos();
    saveToStorage();

}

function saveToStorage(){

    localStorage.setItem('list_todos', JSON.stringify(todos));
}