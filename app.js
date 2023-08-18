

let todoItems = []
const todoInput = document.querySelector('.todo-input');
const completeTodoDiv = document.querySelector('.complete-todo');
const uncompleteTodoDiv = document.querySelector('.uncomplete-todo');

window.onload = () => {
    let storageTodoItems = localStorage.getItem('todoItem')
    if(storageTodoItems !== null){
        todoItems = JSON.parse(storageTodoItems)
    }
    render()
}
todoInput.onkeyup = ((e) => {
    let value = e.target.value.replace(/^\s+/, "" )
    if(value && e.keyCode === 13){
        addTodo(value)

        todoInput.value = ''
        todoInput.focus()
    }
})
function addTodo(text){
    todoItems.push({
    id: Date.now(),
    text,
    complete : false
})
saveAndRender()
}
function removeTodo(id){
    todoItems = todoItems.filter(todo => todo.id !== Number(id))
    saveAndRender()
}
function markAsComplete(id){
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)){
            todo.complete = true
        }
        return todo
    })
    saveAndRender()
}
function markAsUncomplete(id){
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)){
            todo.complete = false
        }
        return todo
    })
    saveAndRender()
}
function save(){
    localStorage.setItem('todoItems', JSON.stringify(todoItems))
}
function render(){
    let unCompleteTodo = todoItems.filter(item => !item.complete)
    let completeTodo = todoItems.filter(item => item.complete)

    completeTodoDiv.innerHTML = ""
    uncompleteTodoDiv.innerHTML = ""

    if(unCompleteTodo.length > 0){
        unCompleteTodo.forEach(todo => {
            uncompleteTodoDiv.append(createTodoElement(todo))
        })
    }else{
        uncompleteTodoDiv.innerHTML = '<div class="empty">No uncomplete list</div>'
    }
    if(completeTodo.length > 0){
        completeTodoDiv.innerHTML = `<div class="complete-title"> Complete (${completeTodo.length} / ${todoItems.length})</div>`
        completeTodo.forEach(todo => {
            completeTodoDiv.append(createTodoElement(todo))
        })
    }
}
function saveAndRender(){
    save()
    render()
}
function createTodoElement(todo){
    const todoDiv = document.createElement('div')
    todoDiv.setAttribute('data-id', todo.id)
    todoDiv.className = 'todo-item'


    const todoTextSpan = document.createElement('span')
    todoTextSpan.innerHTML = todo.text

    const todoInputCheckbox = document.createElement('input')
    todoInputCheckbox.type = 'checkbox'
    todoInputCheckbox.checked = todo.complete
    todoInputCheckbox.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        e.target.checked ? markAsComplete(id) : markAsUncomplete(id)

    }
    const todoRemoveBtn = document.createElement('a')
    todoRemoveBtn.href = '#'
    todoRemoveBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash-filled" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" stroke-width="0" fill="currentColor" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" stroke-width="0" fill="currentColor" /></svg>'
    todoRemoveBtn.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        removeTodo(id)
    }

    todoTextSpan.prepend(todoInputCheckbox)
    todoDiv.appendChild(todoTextSpan)
    todoDiv.appendChild(todoRemoveBtn)

    return todoDiv
}