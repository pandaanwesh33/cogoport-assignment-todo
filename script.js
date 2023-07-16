
    // Object to store to-do items and their id's
    //basically todos looks like : 
    // {id : id of the taks
    //  name : string }
    let todos = [];
    var alreadyFetched=false;

    function initialize() {
      //first check if local storage has previous data or not
      //if data in local storage => load
      if(localStorage.length != 0){
        var retrievedObject = localStorage.getItem('todos');
        todos = JSON.parse(retrievedObject);
      }
      //else fetch
      else{
        if (!alreadyFetched) {
          fetchData();
          alreadyFetched=true;
        }
      }
    }

    //fetch function
    function fetchData() {
 
        fetch('https://jsonplaceholder.typicode.com/todos')
          .then(response => response.json())
          .then(data => {
            
            // Extract "id" and "title" properties and create a new array
            todos = data.map(item => ({
              id: item.id,
              name: item.title.length > 40 ? item.title.substring(0, 36) + '...' : item.title
            }));
            console.log(todos);
            renderFunc();
          })
          .catch(error => {
            console.log('Error:', error);
          });
        
          
      }
      

    //render
    function renderFunc() {
      //get list
      const todoList = document.getElementById('taskList');
      //make it empty
      todoList.innerHTML = '';

      //for each task in todo array perform operations
      todos.forEach((todo, index) => {
        //creating a new <li>
        const listItem = document.createElement('li');

        //delete
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteItem(index);

        //edit
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editItem(index);

        //make a list with content and buttons and append to <li>
        listItem.textContent = todo.name;
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
      });

      //save the updated todo to the local storage
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    //add item to todo array
    function addItem() {
      const todoInput = document.getElementById('taskInput');
      const todoName = todoInput.value.trim();
    
      if (todoName !== '') {
        const todoId = todos.length + 1;

        const todo = {
        id: todoId,
        name: todoName
        };

        todos.push(todo);
        todoInput.value = '';
        renderFunc();
      }
    }

    function deleteItem(index) {
      //remove 1 item starting from index
      todos.splice(index, 1);
      renderFunc();
    }


    function editItem(index) {
      //get the exact task to edit using index of <li>
      const listItem = document.getElementById('taskList').children[index];
      // .firstChild gives the string (name of task)
      const todoText = listItem.firstChild;
      //create an input box
      const editTextbox = document.createElement('input');
      editTextbox.type = 'text';
      //initialize the edit box with the string already present
      editTextbox.value = todoText.textContent;
      //save
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';
      saveButton.onclick = () => saveItem(index);
      listItem.replaceChild(editTextbox, todoText);
      listItem.appendChild(saveButton);
    }

    function saveItem(index) {
      const listItem = document.getElementById('taskList').children[index];
      const editTextbox = listItem.firstChild;
      const updatedTodo = {
        id: index,
        name: editTextbox.value
        };
    //   console.log(listItem.firstChild)
      todos[index] = updatedTodo;
      renderFunc();
    }


initialize();
renderFunc();