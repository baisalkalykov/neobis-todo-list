
let lists = document.querySelector('.ul');
let form = document.querySelector('form');
let input = document.querySelector('input');


let todos = JSON.parse(localStorage.getItem('todos')) || [];

const addTodo = () => {
    lists.innerHTML = '';
    todos.forEach((el, idx) => {
        let li = document.createElement('li');
        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.classList.add('radio');

        let inputEdit = document.createElement('input');
        inputEdit.type = 'text';
        inputEdit.value = el.text;
        inputEdit.classList.add('edit-input');

        // Добавляем кнопки "Изменить" и "Удалить"
        let btnEdit = document.createElement('button');
        btnEdit.textContent = 'edit';
        btnEdit.setAttribute('class', 'edit');
        btnEdit.setAttribute('data-id', el.id);

        let btnDelete = document.createElement('button');
        btnDelete.textContent = 'delete';
        btnDelete.setAttribute('class', 'delete');
        btnDelete.setAttribute('data-id', el.id);

        li.appendChild(radio);
        li.appendChild(inputEdit);
        li.appendChild(btnEdit);
        li.appendChild(btnDelete);

        lists.appendChild(li);

        // Обработчик события для кнопки "Изменить"
        btnEdit.addEventListener('click', () => {
            // Переключаем режим редактирования
            inputEdit.style.display = 'block';
            inputEdit.focus();
            inputEdit.select();
            inputEdit.addEventListener('blur', () => {
                // Сохраняем изменения при потере фокуса
                el.text = inputEdit.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                addTodo();
            });
        });

        // Обработчик события для кнопки "Удалить"
        btnDelete.addEventListener('click', () => {
            todos = todos.filter((item) => item.id !== +btnDelete.dataset.id);
            localStorage.setItem('todos', JSON.stringify(todos));
            addTodo();
        });

        // Обработчик события для радиокнопки
        radio.addEventListener('change', () => {
            if (radio.checked) {
                // Подчеркиваем текст линией
                inputEdit.style.textDecoration = 'line-through';
            } 
        });
    });
};




addTodo();

form[1].addEventListener('click', (e) => {
    e.preventDefault();
    todos = [
        ...todos,
        {
            id: todos.length + 1,
            text: input.value,
        },
    ];
    localStorage.setItem('todos', JSON.stringify(todos));
    input.value = '';
    addTodo();
});

