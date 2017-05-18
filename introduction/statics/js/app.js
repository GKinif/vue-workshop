var Todo = {
    name: 'Todo',
    template: '#todo-template',
    props: ['todo', 'deleteTodo', 'isEditable', 'updateTodo'],
    data: function() {
        return {
            isEditing: false,
        };
    },
    methods: {
        toggleEdit: function toggleEdit() {
            if (!this.isEditable) {
                return;
            }
            if (!this.isEditing && this.$refs.input) {
                // weird trick to force focus after the element has been shown
                setTimeout(function() {
                    this.$refs.input.focus();
                }.bind(this), 0);
            }
            this.isEditing = !this.isEditing;
        },
        updateTodoText: function updateText(e) {
            this.isEditing = false;
            this.todo.text = e.target.value;
            this.updateTodo(this.todo);
        },
        onInputBlur: function onInputBlur(e) {
            if (this.todo.text !== e.target.value) {
                this.updateTodoText();
            } else {
                this.isEditing = false;
            }
        },
        updateCompleted: function updateCompleted(e) {
            this.todo.isCompleted = e.target.checked;
            this.updateTodo(this.todo);
        },
        onDeleteClick: function onDeleteClick() {
            this.deleteTodo(this.todo.id);
        }
    }
};

var TodoList = {
    name: 'TodoList',
    props: {
        todoList: {
            type: Array,
            required: true,
        },
        filter: String,
        isEditable: Boolean,
        deleteTodo: {
            type: Function,
            required: true,
        },
        updateTodo: {
            type: Function,
            required: true,
        },
    },
    computed: {
        filteredTodo: function() {
            var filtered = [];

            switch(this.filter) {
                case 'completed':
                    filtered = this.todoList.filter(function(todo) {
                        return todo.isCompleted;
                    });
                    break;
                case 'active':
                    filtered = this.todoList.filter(function(todo) {
                        return !todo.isCompleted;
                    });
                    break;
                case 'all':
                default:
                    filtered = this.todoList;
                    break;
            }

            return filtered;
        },
    },
    components: {
        todo: Todo,
    },
    template: '' +
        '<ul>' +
        '<todo v-for="todo in filteredTodo" :key="todo.id" :todo="todo" :is-editable="isEditable" :delete-todo="deleteTodo" :update-todo="updateTodo" />' +
        '</ul>',
};

new Vue({
    name: 'app',
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
        deleteTodo: function deleteTodo(id) {
            store.deleteTodo(id);
        },
        updateTodo: function(todo) {
            store.updateTodo(todo);
        },
    },
    components: {
        todoList: TodoList
    }
});
