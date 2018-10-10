/**
 * Локальное Хранилище данных state={todos:[{id,title,description}]}
 *
 * @param {object} state
 * @param [array] todos
 *
 * @field todos.id - som id @type{number}
 * @field todos.title - som title @type{string}
 * @field todos.description - som description @type{string}
 *
 */

const state = {
    todos: [
        {
            id: 1,
            title: 'Some title 1',
            description: 'Some description 1'
        },
        {
            id: 2,
            title: 'Some title 2',
            description: 'Some description 2'
        },
        {
            id: 3,
            title: 'Some title 3',
            description: 'Some description 3'
        }
    ]
};

/**
 * Константы разметки таблици и сообщения
 *
 * @type {Element}
 */
const table = document.querySelector('.table tbody');
const alert = document.getElementById('alerContainer');


/**
 *  Сообщения
 *
 * @type {string}
 */

const messageOk = `
<div class="alert alert-success mt-5" role="alert" >
  Поздравляю задание успешно добавленно.
</div>
`;

const messageDel = `
<div class="alert alert-danger mt-5" role="alert">
  Задание удалено !
</div>
`;

const messageWarning = `
<div class="alert alert-warning mt-5" role="alert">
  Данных нет!
</div>
`;


/**
 * Функция addItem добавляет один элемент в разметку
 *
 * @param {object} item - один объект задачи
 * @returns {void}
 *
 */
const addItem = item => {
    const template = `
        <tr data-id="${item.id}">
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td><button class="btn btn-danger remove-item">Delete</button></td>
        </tr>
    `;

    table.insertAdjacentHTML('beforeend', template);
};


/**
 * Функция deleteItem удаляет элемент из массива и из разметки
 *
 * @param {number} id - id задачи котору нужно удалить
 * @returns {void}
 *
 */
const deleteItem = id => {
    // Удаляем задачу из массива

    state.todos.forEach((item, index) => {
        if (item.id === Number(id)) {
            state.todos.splice(index, 1);
            messController('del');
        }
    });
    // Заново генерируем элементы
    generateItems(state.todos);

};

/**
 *
 * @param items
 */
const generateItems = items => {
    table.innerHTML = '';
    state.todos.forEach((item, index) => item.id = index + 1);
    items.forEach((todo, index) => addItem(todo, index));

};

// Первый раз вызываем генерацию задач
generateItems(state.todos);


/**
 * Принимает два параметра
 *
 * @param {string} newtitle
 * @param {string} newdescription
 */

const addNewItem = (newtitle, newdescription) => {

    if (newtitle && newdescription) {
        state.todos.unshift({id: 0, title: newtitle, description: newdescription});
        generateItems(state.todos);
        messController('ok');
        title.value = description.value = '';
    } else {
        messController('warn');
    }


};


/*
 * Функция добавления сообщений на страницу.
 *
 *  @param {var} messName - переменая содержащая алерт.
 *  @param {int} time - время до конца показа сообщения. По умолчанию 2000 мсек
 *  @returns {void}
 *
 * */

const messAdd = (messName, time = 2000) => {
    alert.insertAdjacentHTML('afterbegin', messName);
    setTimeout(() => alert.innerHTML = '', time);
};

/*
 *Функция управления сообщениями.
 *
 *  @param {string} status - HTML alert параметр.
 *  @returns {void}
 *
 * */

const messController = status => {
    switch (status) {
        case 'ok':
            messAdd(messageOk);
            break;
        case 'del':
            messAdd(messageDel);
            break;
        case 'warn':
            messAdd(messageWarning);
            break;
        default:
            messAdd(messageWarning);
    }
};


const form = document.forms['add-new-itemm'];
const title = form['title'];
const description = form['description'];

/*
 *Функция обрабатывает событие формы. Добавление новой задачи
 *
 * @param {Event} e
 * @returns {void}
 *
 * */

const onSubmitForm = e => {
    e.preventDefault();
    title.value && description.value ? addNewItem(title.value, description.value) : messController('warn');
};

/*
 * Функция обработки события клика на таблице . Реализация шаблона делегирования сбытия. Удалние задачи из таблици.
 *
 *  @param {Event} e - объект
 *  @returns {void}
 *
 * */

const onTableClick = e => {
    if (e.target.classList.contains('remove-item')) {
        const tr = e.target.closest('tr');
        const id = tr.dataset.id;
        deleteItem(id);
    }
};

/*
 * Обркботка события ввода с клавиатуры input[name=title]
 *
 *  @param Event e
 *  @returns void
 *
 * */

const onTitlekeyUp = e => description.disabled = !title.value;

/*Все события*/

form.addEventListener('submit', onSubmitForm);
title.addEventListener('keyup', onTitlekeyUp);
table.addEventListener('click', onTableClick);



