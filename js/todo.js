// We need a list of todos
// We need todo object
// We need to add todo object in list
// We need to delete todo object in list
// We need to save todos (MongoDB)


class Todo {
    constructor(title, complete, archived) {
        this.title = title;
        this.complete = complete;
        this.archived = archived;
    }

    getTitle() {
        return this.title
    }

    isComplete() {
        return this.complete
    }

    isArchived() {
        return this.archived
    }
}

class TodoList {
    constructor() {
        this.todoList = new Array()
    }

    getTodoList() {
        return this.todoList
    }

    addTodo(todo) {
        this.todoList.push(todo)
    }

    deleteTodo(todo) {
        let todoIndex = this.todoList.indexOf(todo)
        this.todoList.splice(todoIndex, 1);
    }
}

$(document).ready(function() {
    "use strict";

    // Elements
    let mainTodoList = new TodoList()
    let todoItem = new Todo("Brush teeth", 1, false, false)
    let todoInputTextBox = $("#todo-input")
    let todoListHTML = $("#todo-list")
    let deleteTodoButtonSelector = "span.close"
    let deleteTodoButton = $(deleteTodoButtonSelector)
    let submitTodoButton = $(".submit-button");
    let todoItemSelector = $("")

    // mainTodoList.addTodo(todoItem)
    // console.log(mainTodoList)
    // console.log(todoInputTextBox.text)

    // List Item Counter
    let todoCounter = 0;

    // Add Event Handling
    submitTodoButton.on("click", function() {
        todoCounter++;

        if (todoInputTextBox.val() == "") {
            alert("Todo empty! Enter Todo!");
        } else {
            // Sample todoListItemHTML:  <li class='todo-item' id='todo-item-3'>Todo Item 1<span class="close">x</span></li>            
            let todoListItemHTML = "<li class='todo-item' id='todo-item-" + todoCounter + "'>" + todoInputTextBox.val() + "<span class=\"close\">&times</span></li>";
            todoListHTML.append(todoListItemHTML);
            todoInputTextBox.val("");

            // Add todo to class
            let newTodo = new Todo(todoInputTextBox.val(), false, false);
            mainTodoList.addTodo(newTodo);
        }

    })

    // Delete Event Handling
    todoListHTML.on("click", deleteTodoButtonSelector, function() {
        let selectedTodoHTML = $(this).parent("li");
        let selectedTodoValue = selectedTodoHTML.contents().get(0).nodeValue;

        // Retrieve the id of the todo to remove from the array
        let selectedTodo = mainTodoList.getTodoList().find(todo => {
            return todo.getTitle() === selectedTodoValue
        })

        // Delete todo from class first
        mainTodoList.deleteTodo(selectedTodo);

        // Remove todo from html
        $(this).parent().remove();
    });

    // // TODO: Check off Event Handling
    // $(".todo-item").on("click", function() {
    //     let selectedTodoItemSelector = this
    //     console.log($(selectedTodoItemSelector).html())
    // })

    /*
        //element to move
        var $el = $(selector);

        //move element down one step
        if ($el.not(':last-child'))
            $el.next().after($el);

        //move element up one step
        if ($el.not(':first-child'))
            $el.prev().before($el);

        //move element to top
        $el.parent().prepend($el);

        //move element to end
        $el.parent().append($el);
    */

    // Checking off Todo Event Handling
    todoListHTML.on("click", "li:not(.todo-item.strike)", function() {
        let selectedTodoItemSelector = this
        console.log("append")
        $(selectedTodoItemSelector).toggleClass('strike')
        $(selectedTodoItemSelector).parent().append($(selectedTodoItemSelector))
    })

    // Unchecking Todo Event Handling
    todoListHTML.on("click", "li.todo-item.strike", function() {
        let selectedTodoItemSelector = this
        console.log("prepend")
        $(selectedTodoItemSelector).toggleClass('strike')
        $(selectedTodoItemSelector).parent().prepend($(selectedTodoItemSelector))
    })

    // TODO: SAVE

    // TODO: LOAD ON REFRESH

    // TODO: LOGIN

    // TODO: HOST ON WEB SERVER
})