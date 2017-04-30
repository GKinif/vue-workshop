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
    setTodoList: function setTodoList(todoList) {
        this.debug && console.log('setTodoList: ', todoList);
        this.state.todoList = todoList;
    },
    addTodo: function addTodo(todoText) {
        this.debug && console.log('addTodo: ', todoText);
        var newTodo = {
            id: this.state.todoList.length ? this.state.todoList[this.state.todoList.length - 1].id + 1 : 0,
            text: todoText,
            isCompleted: false,
        };
        this.state.todoList.push(newTodo);
    },
    updateTodo: function updateTodo(updatedTodo) {
        this.debug && console.log('updateTodo: ', updatedTodo.id);
        var todoId = this.state.todoList.findIndex(function(todo) {
            return todo.id === updatedTodo.id;
        });

        if (todoId > -1) {
            this.state.todoList[todoId] = updatedTodo;
        }
    },
    deleteTodo: function deleteTodo(id) {
        this.debug && console.log('deleteTodo: ', id);
        this.state.todoList = this.state.todoList.filter(function (todo) {
            return todo.id !== id;
        });
    },
};

var Todo = {
    name: 'Todo',
    template: '#user-template',
    props: ['todo', 'deleteTodo'],
    data: function() {
        return {
            isEditing: false,
        };
    },
    methods: {
        toggleEdit: function toggleEdit() {
            if (!this.isEditing && this.$refs.input) {
                // weird trick to force focus after the element has been shown
                setTimeout(function() {
                    this.$refs.input.focus();
                }.bind(this), 0);
            }
            this.isEditing = !this.isEditing;
        },
        updateStore: function() {
            store.updateTodo(this.todo);
        },
        updateText: function updateText(e) {
            this.isEditing = false;
            this.todo.text = e.target.value;
            this.updateStore();
        },
        updateCompleted: function updateCompleted(e) {
            this.todo.isCompleted = e.target.checked;
            this.updateStore();
        },
        onDeleteClick: function onDeleteClick() {
            this.deleteTodo(this.todo.id);
        }
    }
};

var TodoList = {
    name: 'TodoList',
    props: ['todoList', 'filter'],
    computed: {
        filteredTodo: function() {
            if (!this.filter || this.filter === 'all') {
                return this.todoList;
            }
            if (this.filter === 'completed') {
                return this.todoList.filter(function(todo) {
                    return todo.isCompleted;
                });
            } else if (this.filter === 'active') {
                return this.todoList.filter(function(todo) {
                    return !todo.isCompleted;
                });
            }
            // just in case a wrong filter was passed
            return this.todoList;
        },
    },
    methods: {
        deleteTodo: function deleteTodo(id) {
            store.deleteTodo(id);
        },
    },
    components: {
        todo: Todo,
    }
};

new Vue({
    el: '#app',
    data: {
        shared: store.state,
        private: {
            newTodoTxt: '',
            filter: 'all',
        }
    },
    computed: {
        activeCount: function activeCount() {
            return this.shared.todoList.filter(function(todo) {
                return !todo.isCompleted;
            }).length;
        }
    },
    methods: {
        addTodo: function() {
            store.addTodo(this.private.newTodoTxt) ;
            this.private.newTodoTxt = '';
        },
    },
    components: {
        todoList: TodoList
    }
});
