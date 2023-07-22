// Function to generate unique IDs for todos
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }
  
  // Initialize the todo list array to store todos.
  let todos = [];
  
  // Function to fetch todos from local storage.
  function fetchTodosFromLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      todos = JSON.parse(storedTodos);
    }
  }
  
  // Function to save todos to local storage.
  function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }


// Activity logs
const activityLogs = [];

// Function to add a log to activityLogs
function addLog(action, taskId, subtaskId = null) {
  const log = {
    timestamp: new Date(),
    action,
    taskId,
    subtaskId
  };
  activityLogs.push(log);
}

// Function to display activity logs
function displayActivityLogs() {
  const logsContainer = document.getElementById('activityLogs');
  logsContainer.innerHTML = ''; // Clear previous logs

  activityLogs.forEach(log => {
    const logItem = document.createElement('div');
    logItem.classList.add('log-item');

    const logTimestamp = document.createElement('span');
    logTimestamp.textContent = log.timestamp.toLocaleString();
    logItem.appendChild(logTimestamp);

    let logMessage;
    switch (log.action) {
      case 'addTodo':
        logMessage = `Todo added: ${log.taskId}`;
        break;
      case 'deleteTodo':
        logMessage = `Todo deleted: ${log.taskId}`;
        break;
      case 'editTodo':
        logMessage = `Todo edited: ${log.taskId}`;
        break;
      case 'addSubtask':
        logMessage = `Subtask added to Todo: ${log.taskId} - ${log.subtaskId}`;
        break;
      case 'deleteSubtask':
        logMessage = `Subtask deleted from Todo: ${log.taskId} - ${log.subtaskId}`;
        break;
      case 'editSubtask':
        logMessage = `Subtask edited: ${log.taskId} - ${log.subtaskId}`;
        break;
      case 'toggleCompletion':
        logMessage = `Todo/Subtask completion changed: ${log.taskId} - ${log.subtaskId}`;
        break;
      default:
        logMessage = 'Unknown action';
    }

    const logContent = document.createElement('span');
    logContent.textContent = logMessage;
    logItem.appendChild(logContent);

    logsContainer.appendChild(logItem);
  });
}

// Function to toggle display of activity logs
function toggleActivityLogs() {
    const logsContainer = document.getElementById('activityLogs');
    const logsButton = document.querySelector('.activity-logs button');
    const displayStyle = logsContainer.style.display;
  
    if (displayStyle === 'none') {
      logsContainer.style.display = 'block';
      logsButton.textContent = 'Hide Activity Logs';
      displayActivityLogs(); // Refresh logs when shown
    } else {
      logsContainer.style.display = 'none';
      logsButton.textContent = 'View Activity Logs';
    }
  }
  // Function to add a new todo
//   document.getElementById('addTodoButton').addEventListener('click', () => {
  function addTodo() {
    const todoText = document.getElementById('todoText').value.trim();
    // const dueDate = document.getElementById('dueDate').value.trim();
    // const priority = document.getElementById('priority').value.trim();
    // const category = document.getElementById('category').value.trim();

    //category
    const todoCategoryElement = document.getElementById('category');
    todoCategory = todoCategoryElement.value.trim()
    //due date
    const todoDueDateElement = document.getElementById('dueDate');
    todoDueDate = todoDueDateElement.value.trim()
    // console.log(todoDueDate.day);
    //priority
    const todoPriorityElement = document.getElementById('priority');
    todoPriority = todoPriorityElement.value.trim()
    //tags
    const todoTagElement = document.getElementById('tags');
    todoTag = todoTagElement.value.trim()
    var tagArray = todoTag.split(",");

    console.log(todoPriority)

    // const subtasks = document.getElementById('subtasks').value
    //   .split(',')
    //   .map(subtask => subtask.trim());

    const subtasks=[]
    // const tags = document.getElementById('tags').value
    //   .split(',')
    //   .map(tag => tag.trim());
  
    if (todoText === '') {
      return;
    }
  
    const newTodo = {
      id: generateUniqueId(),
      todoText: todoText,
      dueDate: todoDueDate,
      priority: todoPriority,
      
      category: todoCategory,
      subtasks: subtasks,
      tags: tagArray,
      isCompleted: false,
    };
  
    todos.push(newTodo);
    document.getElementById('todoText').value='';
    todoCategoryElement.value = '';
    todoDueDateElement.value ='';
    todoPriorityElement.value ='';
    todoTagElement.value ='';
    saveTodosToLocalStorage();
    displayTodos();
    addLog('addTodo', todoText);
    console.log(newTodo.tags)
  }
  
  // Function to display todos
  function displayTodos() {
    const todoListContainer = document.getElementById('todoList');
    todoListContainer.innerHTML = '';
  
    todos.forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.className = 'todo-item';
      if (todo.isCompleted) {
        todoItem.classList.add('completed');
      }
      
      //Adding elements to todoItem div

      //task name
      const todoTextElement = document.createElement('span');
      todoTextElement.textContent = todo.todoText;
      

      //category
      const category = document.createElement('span')
      category.textContent = todo.category;

      //due date
      let dueDate = document.createElement("INPUT");
      dueDate.setAttribute("type", "text");
      dueDate.value = new Date(todo.dueDate);
      // console.log(dueDate);

      //priority
      let priority = document.createElement("INPUT");
      priority.setAttribute("type", "text");
      priority.value = todo.priority;

      todoItem.appendChild(todoTextElement);
      todoItem.appendChild(category);
      todoItem.appendChild(dueDate);
      todoItem.appendChild(priority);

      //tags
      for(var i=0; i<(todo.tags).length;i++){
        // console.log(todo.tag)
          const tagBox = document.createElement("input");
          tagBox.setAttribute("type", "text");
          tagBox.value = todo.tags[i];
          todoItem.appendChild(tagBox);
          // console.log(tagBox)
          console.log(tagBox)
      }

      //adding li to todoList
      todoList.appendChild(todoItem);

      //   adding subtask
      // Add Subtask button
      const addSubtaskButton = document.createElement('button');
      addSubtaskButton.textContent = 'Add Subtask';
      addSubtaskButton.onclick = () => {
        const subtaskText = prompt('Enter subtask:');
        const priority = prompt('Enter priority:');
        if (subtaskText !== null && subtaskText.trim() !== '' && priority !== null) {
          addSubtaskToTodo(todo.id, subtaskText, priority);
        }
      };
      todoItem.appendChild(addSubtaskButton);
      if(todo.subtasks.length>0){

        // Show/hide subtasks option
      const toggleSubtasksButton = document.createElement('button');
      toggleSubtasksButton.textContent = todo.showSubtasks ? 'Hide Subtasks' : 'Show Subtasks';
      toggleSubtasksButton.onclick = () => toggleSubtasksDisplay(todo.id);
      todoItem.appendChild(toggleSubtasksButton);

      //   // Add Subtask button
      //   const addSubtaskButton = document.createElement('button');
      //   addSubtaskButton.textContent = 'Add Subtask';
      //   addSubtaskButton.onclick = () => {
      //     const subtaskText = prompt('Enter subtask:');
      //     const priority = prompt('Enter priority:');
      //     if (subtaskText !== null && subtaskText.trim() !== '' && priority !== null) {
      //       addSubtaskToTodo(todo.id, subtaskText, priority);
      //     }
      //   };
      //   todoItem.appendChild(addSubtaskButton);

      if(todo.showSubtasks){

        const subtasksList=document.createElement('ul');
        subtasksList.className='subtask-list';
        todo.subtasks.forEach(subtask=>{
            console.log("display",subtask);
            const subtaskItem=document.createElement('li');
            subtaskItem.className='subtask-item';
            if(subtask.isCompleted){
                subtaskItem.classList.add('completed');
            }

            const subtaskTextElement=document.createElement('span');
            subtaskTextElement.textContent=subtask.subtaskText;
            subtaskItem.appendChild(subtaskTextElement);

            const subtaskPriorityElement = document.createElement('span');
            subtaskPriorityElement.textContent = `Priority: ${subtask.priority}`;
            subtaskItem.appendChild(subtaskPriorityElement);

            // const subtaskActionsContainer=document.createElement('div');
            // subtaskActionsContainer.className='actions';

            const substaskCompleteButton= document.createElement('button');
            substaskCompleteButton.textContent=subtask.isCompleted ? 'Undone':'Done';
            substaskCompleteButton.onclick=() => toggleSubtaskCompletion(todo.id,subtask.id);
            // subtaskActionsContainer.appendChild(substaskCompleteButton);
            subtaskItem.appendChild(substaskCompleteButton);

            const subtaskEditButton=document.createElement('button');
            subtaskEditButton.textContent='Edit';
            subtaskEditButton.onclick = () => {
                const updatedSubtaskText = prompt('Enter updated subtask:', subtask.subtaskText);
                const updatedPriority = prompt('Enter updated priority:', subtask.priority);
                if (updatedSubtaskText !== null && updatedSubtaskText.trim() !== '' && updatedPriority !== null) {
                editSubtask(todo.id, subtask.id, updatedSubtaskText, updatedPriority);
                }
            };

                subtaskItem.appendChild(subtaskEditButton);
            // subtaskActionsContainer.appendChild(subtaskEditButton);

            const subtaskDeleteButton=document.createElement('button');
            subtaskDeleteButton.textContent='Delete';
            subtaskDeleteButton.onclick=()=> deleteSubtask(todo.id,subtask.id);
            // subtaskActionsContainer.appendChild(subtaskDeleteButton);
            subtaskItem.appendChild(subtaskDeleteButton);

            // subtaskItem.appendChild(subtaskActionsContainer);
            subtasksList.appendChild(subtaskItem);
        });
        todoItem.appendChild(subtasksList);
        }
    }

  
      const actionsContainer = document.createElement('div');
      actionsContainer.className = 'actions';
  
      const completeButton = document.createElement('button');
      completeButton.textContent = todo.isCompleted ? 'Undone' : 'Done';
      completeButton.onclick = () => toggleTodoCompletion(todo.id);
      actionsContainer.appendChild(completeButton);
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = () => editTodo(todo.id);
      actionsContainer.appendChild(editButton);
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteTodo(todo.id);
      actionsContainer.appendChild(deleteButton);
  
      todoItem.appendChild(actionsContainer);




      todoListContainer.appendChild(todoItem);
    });
  }
  
  // Function to toggle todo completion status
  function toggleTodoCompletion(todoId) {
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
      todos[todoIndex].isCompleted = !todos[todoIndex].isCompleted;
      saveTodosToLocalStorage();
      displayTodos();
    }
  }
  
  // Function to edit a todo
  function editTodo(todoId) {
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    //get the exact task to edit using index of <li>
    const listItem = document.getElementById('todoList').children[todoIndex];
    // .firstChild gives the string (name of task)
    const todoText = todos[todoIndex].todoText;
    //create an input box
    const editTextbox = document.createElement('input');
    editTextbox.type = 'text';
    //initialize the edit box with the string already present
    editTextbox.value = todoText;
    //save
    // if(listItem.childElementCount < 4){
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';
      saveButton.onclick = () => saveItem(todoIndex);
      listItem.replaceChild(editTextbox, listItem.firstChild);
      listItem.appendChild(saveButton);
    // }
    // console.log(listItem.childElementCount)
    // if (todoIndex !== -1) {
    //   const updatedTodoText = prompt('Enter updated todo:', todos[todoIndex].todoText);
    //   if (updatedTodoText !== null) {
    //     todos[todoIndex].todoText = updatedTodoText.trim();
    //     saveTodosToLocalStorage();
    //     displayTodos();
    //   }
    // }
  }

  function saveItem(index) {
    const listItem = document.getElementById('todoList').children[index];
    const editTextbox = listItem.firstChild;
    // const updatedTodo = {
    //   id: index,
    //   name: editTextbox.value
    //   };
  //   console.log(listItem.firstChild)
    todos[index].todoText = editTextbox.value;
    saveTodosToLocalStorage();
    addLog('editTodo', editTextbox.value);
    displayTodos();
  }
  
  // Function to delete a todo
  function deleteTodo(todoId) {
    //first filter the to be deleted todo and push to Activity log
    var todo = todos.filter(todo => todo.id === todoId);
    // console.log(todo[0].todoText);
    addLog('deleteTodo',todo[0].todoText);
    //filter the rest todos
    todos = todos.filter(todo => todo.id !== todoId);
    saveTodosToLocalStorage();
    displayTodos();
  }
  
  // Add event listener to the "Add Todo" button
//   document.getElementById('addTodoButton').addEventListener('click', addTodo());
  
// Function to add a new subtask to a specific todo
function addSubtaskToTodo(todoId, subtaskText, priority) {
    // console.log(subtaskText);
    const todo = todos.find(todo => todo.id === todoId);
    if (todo) {
      const subtaskId = generateUniqueId();
      const subtask = {
        id: subtaskId,
        subtaskText: subtaskText.trim(),
        priority: priority.trim(),
        isCompleted: false
      };
    //   console.log(subtaskText.trim());
      todo.subtasks.push(subtask);
      saveTodosToLocalStorage();
      displayTodos();
    }
  }
  
  // Function to toggle the display of subtasks for a specific todo
  function toggleSubtasksDisplay(todoId) {
    const todo = todos.find(todo => todo.id === todoId);
    if (todo) {
      todo.showSubtasks = !todo.showSubtasks;
      displayTodos();
    }
  }
  
  // Function to mark a subtask as done/undone
function toggleSubtaskCompletion(todoId, subtaskId) {
    const todo = todos.find(todo => todo.id === todoId);
    if (todo) {
      const subtask = todo.subtasks.find(sub => sub.id === subtaskId);
      if (subtask) {
        subtask.isCompleted = !subtask.isCompleted;
        saveTodosToLocalStorage();
        displayTodos();
      }
    }
  }
  
  // Function to edit a subtask
function editSubtask(todoId, subtaskId, updatedSubtaskText, updatedPriority) {
    console.log(subtaskId);
    const todo = todos.find(todo => todo.id === todoId);
    if (todo) {
    const subtask = todo.subtasks.find(sub => sub.id === subtaskId);
    if (subtask) {
        subtask.subtaskText = updatedSubtaskText.trim();
        subtask.priority = updatedPriority.trim();
        saveTodosToLocalStorage();
        displayTodos();
    }
    }
}
// Function to perform the search
function performSearch() {
    const searchQuery = document.getElementById('searchQuery').value.trim();
    // console.log(searchQuery);
    if (searchQuery !== '') {
      const exactTodoResults = todos.filter(todo => todo.todoText.toLowerCase() === searchQuery.toLowerCase());
      const subtasksResults = todos.filter(todo =>
        todo.subtasks.some(subtask => subtask.subtaskText.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      const similarWordsResults = todos.filter(todo =>
        todo.todoText.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const tagsResults = todos.filter(todo => todo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
  
      const searchResults = exactTodoResults.length > 0 ? exactTodoResults :
        (subtasksResults.length > 0 ? subtasksResults :
        (similarWordsResults.length > 0 ? similarWordsResults : tagsResults));
  
      console.log(searchResults);
      // if (searchResults.length > 0) {
      //   displaySearchResults(searchResults);
      // } else {
      //   alert('Nothing found.');
      // }
    }
  }
//   // Function to edit a subtask
//   function editSubtask(todoId, subtaskId, updatedSubtaskText) {
//     const todo = todos.find(todo => todo.id === todoId);
//     if (todo) {
//       const subtask = todo.subtasks.find(sub => sub.id === subtaskId);
//       if (subtask) {
//         subtask.subtaskText = updatedSubtaskText.trim();
//         saveTodosToLocalStorage();
//         displayTodos();
//       }
//     }
//   }

  // Function to delete a subtask
function deleteSubtask(todoId, subtaskId) {
    console.log(subtaskId);
    const todo = todos.find(todo => todo.id === todoId);
    if (todo) {
      todo.subtasks = todo.subtasks.filter(sub => sub.id !== subtaskId);
      saveTodosToLocalStorage();
      displayTodos();
    }
  }
  




  // Function to filter todos by due date range
  function filterByDueDate(startDate, endDate) {
    if (!startDate || !endDate) {
      return todos;
    }
  
    const filteredTodos = todos.filter(todo => {
      const dueDate = new Date(todo.dueDate);
      return dueDate >= new Date(startDate) && dueDate <= new Date(endDate);
    });
  
    return filteredTodos;
  }
  
  // Function to filter todos by category
  function filterByCategory(category) {
    if (!category) {
      return todos;
    }
  
    const filteredTodos = todos.filter(todo => todo.category.toLowerCase() === category.toLowerCase());
    return filteredTodos;
  }
  
  // Function to filter todos by priority
  function filterByPriority(priority) {
    if (!priority || priority.toLowerCase()==='all') {
      return todos;
    }
  
    const filteredTodos = todos.filter(todo => todo.priority.toLowerCase() === priority.toLowerCase());
    return filteredTodos;
  }

  // Add event listener to the "Filter" button
// document.getElementById('filterButton').addEventListener('click', () => {
//     const startDate = document.getElementById('startDateFilter').value;
//     const endDate = document.getElementById('endDateFilter').value;
//     const category = document.getElementById('categoryFilter').value.trim();
//     const priority = document.getElementById('priorityFilter').value.trim();
  
//     let filteredTodos = todos;
//     filteredTodos = filterByDueDate(startDate, endDate);
//     filteredTodos = filterByCategory(category);
//     filteredTodos = filterByPriority(priority);
  
//     displayFilteredTodos(filteredTodos);
//   });

  // Function to sort todos by due date
  function sortByDueDate() {
    const sortedTodos = todos.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return sortedTodos;
  }
  
  // Function to sort todos by priority
  function sortByPriority() {
    const sortedTodos = todos.slice().sort((a, b) => {
      const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    return sortedTodos;
  }
  // Function to set reminders for important tasks
  function setReminder(todoId, reminderTime) {
    const todo = todos.find(todo => todo.id === todoId);
    if (!todo || !reminderTime) {
      return;
    }
  
    const currentTime = new Date().getTime();
    const reminderTimeInMs = new Date(reminderTime).getTime();
  
    if (reminderTimeInMs > currentTime) {
      const timeUntilReminder = reminderTimeInMs - currentTime;
      setTimeout(() => {
        alert(`Reminder: ${todo.todoText}`);
      }, timeUntilReminder);
    }
  }
  // Add event listener to the "Sort" button
//   document.getElementById('sortButton').addEventListener('click', () => {
//     const sortBy = document.getElementById('sortBy').value;
//     console.log(sortBy);
//     let sortedTodos = todos;
//     if (sortBy === 'dueDate') {
//       sortedTodos = sortByDueDate();
//     } else if (sortBy === 'priority') {
//       sortedTodos = sortByPriority();
//     }
  
//     displayFilteredTodos(sortedTodos);
//   });
  
  // Function to display filtered and sorted todos
  function displayFilteredTodos(filteredTodos) {
    const todoListContainer = document.getElementById('todoList');
    todoListContainer.innerHTML = '';
  
    filteredTodos.forEach(todo => {
      // [Same code as the previous response for displaying todos]
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        if (todo.isCompleted) {
          todoItem.classList.add('completed');
        }
    
        const todoTextElement = document.createElement('span');
        todoTextElement.textContent = todo.todoText;
        todoItem.appendChild(todoTextElement);
    
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'actions';
    
        const completeButton = document.createElement('button');
        completeButton.textContent = todo.isCompleted ? 'Undone' : 'Done';
        completeButton.onclick = () => toggleTodoCompletion(todo.id);
        actionsContainer.appendChild(completeButton);
    
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTodo(todo.id);
        actionsContainer.appendChild(editButton);
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(todo.id);
        actionsContainer.appendChild(deleteButton);
    
        todoItem.appendChild(actionsContainer);
        todoListContainer.appendChild(todoItem);
    
    });
  }
//   viewBacklogs section
  function viewBacklogs() {
    const currentDate = new Date();
  
    const backlogs = todos.filter(todo => {
      const dueDate = new Date(todo.dueDate);
      return !todo.isCompleted && dueDate < currentDate;
    });
    displayFilteredTodos(backlogs);
    if(backlogs.length === 0){
    alert("No task in Backlog")
    }
    // else{
  
    
    // }
  }

  // Function to display todos
// function displayTodos() {
//     // [Same code as the previous response for displaying todos]
//   }
  
  // [Code for handling drag and drop rearrangement, reminder inputs, and other functionalities]

  
  // Initial setup to fetch todos from local storage and display them
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addTodoButton').addEventListener('click', addTodo);
    document.getElementById('filterButton').addEventListener('click', () => {
      // ... [Code for filtering] ...
      const startDate = document.getElementById('startDateFilter').value;
    const endDate = document.getElementById('endDateFilter').value;
    const category = document.getElementById('categoryFilter').value.trim();
    const priority = document.getElementById('priorityFilter').value.trim();
  
    let filteredTodos = todos;
    filteredTodos = filterByDueDate(startDate, endDate);
    filteredTodos = filterByCategory(category);
    filteredTodos = filterByPriority(priority);
  
    displayFilteredTodos(filteredTodos);
    });
    document.getElementById('sortButton').addEventListener('click', () => {
      // ... [Code for sorting] ...
      const sortBy = document.getElementById('sortBy').value;
    console.log(sortBy);
    let sortedTodos = todos;
    if (sortBy === 'dueDate') {
      sortedTodos = sortByDueDate();
    } else if (sortBy === 'priority') {
      sortedTodos = sortByPriority();
    }
  
    displayFilteredTodos(sortedTodos);
    });
    // document.getElementById('viewBacklogsButton').addEventListener('click', viewBacklogs);
    // Add event listener to the "View Backlogs" button
    const viewBacklogsButton = document.getElementById('viewBacklogsButton');
    viewBacklogsButton.addEventListener('click', () => {
    if (viewBacklogsButton.textContent === 'View Backlogs') {
        viewBacklogs();
        viewBacklogsButton.textContent = 'Show All Tasks';
    } else {
        // showAllTasks();
        displayTodos();
        viewBacklogsButton.textContent = 'View Backlogs';
    }
    });
  
    // Initial setup to fetch todos from local storage and display them
    fetchTodosFromLocalStorage();
    displayTodos();
  });
//   fetchTodosFromLocalStorage();
//   displayTodos();
  