var store = {
    debug: true,
    state: {
        todoList: [
            {
                id: 0,
                text: 'First todo',
                isCompleted: false
            },
            {
                id: 1,
                text: 'Second todo',
                isCompleted: true
            },
        ],
    },
    /**
     * Set todoList with the provided array
     * @param {[]} todoList
     */
    setTodoList: function setTodoList(todoList) {
        this.debug && console.log('setTodoList: ', todoList);
        this.state.todoList = todoList;
    },

    /**
     * Add a new todo using provided text
     * @param {string} todoText
     */
    addTodo: function addTodo(todoText) {
        this.debug && console.log('addTodo: ', todoText);
        var newTodo = {
            id: this.state.todoList.length ? this.state.todoList[this.state.todoList.length - 1].id + 1 : 0,
            text: todoText,
            isCompleted: false,
        };
        this.state.todoList.push(newTodo);
    },

    /**
     * Update the provided todo
     * @param {{id: number, text: string, isCompleted: boolean}} updatedTodo
     */
    updateTodo: function updateTodo(updatedTodo) {
        this.debug && console.log('updateTodo: ', updatedTodo.id);
        var todoId = this.state.todoList.findIndex(function(todo) {
            return todo.id === updatedTodo.id;
        });

        if (todoId > -1) {
            this.state.todoList[todoId] = updatedTodo;
        }
    },

    /**
     * Delete a todo from the todoList
     * @param {number} id
     */
    deleteTodo: function deleteTodo(id) {
        this.debug && console.log('deleteTodo: ', id);
        this.state.todoList = this.state.todoList.filter(function (todo) {
            return todo.id !== id;
        });
    },
};