const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

let toDoList = [];

const createToDoElement = (text, isOn, newId) => {

    const label = document.createElement('label');
    label.classList.add('custom-checkbox');
    label.setAttribute('for', newId);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = newId;
    checkbox.checked = isOn;

    checkbox.addEventListener('change', (e) => {
        const isOn = e.target.checked;
        label.remove();
        if (isOn) document.getElementById('finishList').append(label)
        if (!isOn) document.getElementById('notFinishList').append(label)
        const changedTodo = toDoList.find(element => element.id === newId);
        console.log(changedTodo);
        const newTodoList = toDoList.filter(element => element.id !== newId);
        console.log(newTodoList);
        toDoList = [
            ...newTodoList,
            {
                ...changedTodo,
                isOn: e.target.checked
            }
        ]
    })

    const imgOff = document.createElement('img');
    imgOff.classList.add('off');
    imgOff.src = './icons/checkboxOff.svg';

    const imgOn = document.createElement('img');
    imgOn.classList.add('on');
    imgOn.src = './icons/checkboxOn.svg';

    label.append(checkbox, imgOff, imgOn, text);

    if (isOn) document.getElementById('finishList').append(label)
    if (!isOn) document.getElementById('notFinishList').append(label)

}


window.addEventListener('unload', () => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
})

const drawToDoList = () => {
    toDoList = JSON?.parse(localStorage?.getItem('toDoList'));
    if (toDoList) {
        toDoList.forEach(element => {
            createToDoElement(element.text, element.isOn, element.id);
        })
    }
}

drawToDoList();

document.getElementById('addBtn').addEventListener('click', () => {
    const newId = uid();
    const text = document.getElementById('newToDo').value;
    if (text === '') return;
    document.getElementById("newToDo").value = "";
    createToDoElement(text, false, newId)
    toDoList.push({ isOn: false, text, id: newId })
})

document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById("newToDo").value = "";
})


{/* 
<label class="custom-checkbox" for="a1">
    <input type="checkbox" id="a1">
    <img class="off" src="./icons/checkboxOff.svg" alt="">
    <img class="on" src="./icons/checkboxOn.svg" alt="">
    Помыть посуду
</label> 
*/}

