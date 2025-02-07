todos=[];

function addTodo(){
    todos.push({
        title: document.querySelector("input").value
    })
    render();
}

function deleteTodo(index){
    todos.splice(index, 1);
    render(); 
}

function createTodoComponent(todo, index){
    const div = document.createElement("div");
    const button = document.createElement("button");
    const h2 = document.createElement("h2");
    button.innerHTML="delete";
    h2.innerHTML = todo.title;
    button.setAttribute("onclick", "deleteTodo("+ index + ")");
    div.append(h2);
    div.append(button);
    return div;
}

function render(){
    document.getElementById("todoParent").innerHTML="";
    for(let i=0; i<todos.length; i++){
        const element = createTodoComponent(todos[i], i);
        document.getElementById("todoParent").appendChild(element);
    }
}