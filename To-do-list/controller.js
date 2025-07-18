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
} createListToDo();

// show no tasks message if 'List' in localStorage is empty.
const showNoTasks = () => {
    if(tasks.length === 0) noTasks.style.display = 'block';
    else noTasks.style.display = 'none';
}; showNoTasks();

// delete this card and its information.
cards.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-xmark')) {
        const card = e.target.closest('.card');
        
        tasks = tasks.filter(t => t.id != card.id);
        localStorage.setItem("List", JSON.stringify(tasks));
        card.remove();
    }

    if(e.target.classList.contains('fa-pen-to-square')) {
        const descriptionDiv = e.target.closest('.description');
        const p = descriptionDiv.querySelector('p');

        const currentText = p.innerText.replace('Description: ', '').trim();
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.classList.add('input-edit');
        input.style.width = '80%';
        input.style.marginLeft = '90px';
        input.style.backgroundColor = 'darkorange';
        input.style.border = 'none';

        p.innerText = '';
        p.appendChild(input);
        
        input.focus();

        input.addEventListener('keydown', (event) => {
            if(event.key === 'Enter') {
                const newText = input.value.trim();

                p.innerHTML = `<strong>Description: </strong>${newText}`;
            }
        });
    }
});