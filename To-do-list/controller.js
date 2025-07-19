const cards = document.getElementById('card-zone');
const btn = document.getElementById('btn');
const noTasks = document.getElementById('there-is-not');

let tasks;

// creation of the list, if not exists.
function createListToDo() {
    if(localStorage.getItem("List") === null) {
        localStorage.setItem("List", JSON.stringify([]));
    }
    tasks = JSON.parse(localStorage.getItem('List')) || [];
}; createListToDo();

// show no tasks message if 'List' in localStorage is empty.
const showNoTasks = () => {
    if(tasks.length === 0) noTasks.style.display = 'block';
    else noTasks.style.display = 'none';
}; showNoTasks();

const fillCardZone = () => {
    tasks.forEach(task => {
        const card = document.createElement('div');
        card.id = task.id;
        card.classList.add("card");
        card.innerHTML = '<div class="card-title flexRow">' +
                `<p><strong>Task: </strong>${ task.id }</p>` +
                '<i class="fa-solid fa-xmark"></i>' +
            '</div>' +
            '<div class="description flexRow underline">' +
                `<p><strong>Description: </strong>${ task.description }</p>` +
                '<i class="fas fa-pen-to-square"></i>' +
            '</div>' +
            '<button class="completed">Completed</button>'
        ;

        cards.appendChild(card);
    });
}; fillCardZone();

cards.addEventListener('click', (e) => {

    // delete this card and its information.
    if(e.target.classList.contains('fa-xmark')) {
        const card = e.target.closest('.card');
        
        tasks = tasks.filter(t => t.id != card.id);
        localStorage.setItem("List", JSON.stringify(tasks));
        card.remove();
        showNoTasks();
        return;
    }

    if(e.target.classList.contains('fa-pen-to-square')) {
        const card = e.target.closest('.card');
        const p = card.querySelector('.description p');
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = '';
        input.style.width = '75%';
        input.style.backgroundColor = 'transparent';
        input.style.border = 'none';

        p.innerHTML = '<strong>Description: </strong>';
        p.appendChild(input);
        
        input.focus();

        input.addEventListener('keydown', (event) => {
            if(event.key === 'Enter' && input.value != '') {
                const newText = input.value.trim();

                p.innerHTML = `<strong>Description: </strong>${newText}`;
                tasks = tasks.map(task => {
                    if(task.id == card.id) {
                        return { ...task, description: newText }
                    }
                    localStorage.setItem('List', JSON.stringify(tasks));
                    console.log(`task ${card.id} updated`);
                });
            }
        });
        return;
    }

    if(e.target.classList.contains('completed')) {
        const card = e.target.closest('.card');
        const del = card.querySelector('.card-title .fa-xmark');
        const edit = card.querySelector('.description .fa-pen-to-square');

        if(del) del.remove();
        if(edit) edit.remove();
        e.target.style.color = 'darkgreen';
        card.style.backgroundColor = 'lightgreen';
        
        tasks = tasks.map(task => {
            if(card.id == task.id) {
                return { ...task, completed: true }
            }
            localStorage.setItem("List", JSON.stringify(tasks));
        });
    }
});

btn.addEventListener('click', () => {
    const newTask = {
        id: tasks.length<1 ? 1 : Number(tasks[tasks.length-1].id)+1,
        description: prompt("Describe the new task to be done ..."),
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem('List', JSON.stringify(tasks));

    const newCard = document.createElement('div');
    newCard.id=newTask.id;
    newCard.classList.add('card');
    newCard.innerHTML = '<div class="card-title flexRow">'+
            `<p><strong>Task: </strong>${ newTask.id }</p>`+
            '<i class="fa-solid fa-xmark"></i>'+
        '</div>'+
        '<div class="description flexRow underline">'+
            `<p><strong>Description: </strong>${ newTask.description } </p>`+
            '<i class="fas fa-pen-to-square"></i>'+
        '</div>'+
        '<button class="completed">Completed</button>'
    ;
    
    cards.appendChild(newCard);
    showNoTasks();
});

