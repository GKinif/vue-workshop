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
