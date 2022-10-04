import storage from './storage.js';

const {
    setStorage,
} = storage;


const positionСalculation = () => {
    const tdCount = document.querySelectorAll('.count');
    for (let i = 0; i <= tdCount.length - 1; i++) {
        let positionRow = tdCount[i];
        positionRow.innerHTML = '';
        positionRow.append(i + 1);
    }
};

const addNoteData = (data, obj, user) => {
    data.push(obj);
    setStorage(user, data);
}

const createButtonsGroup = params => {
    const btns = params.map(({ classList, type, text }) => {
        const button = document.createElement('button');
        button.type = type;
        button.textContent = text;
        button.className = classList;
        return button;
    });

    return btns;
};

const createLogo = (title) => {
    const header = document.createElement('h3');
    header.textContent = `Список задач для ${title}`;

    return header;
};

const createRow = ({ task: firstName, status, id }) => {
    const tr = document.createElement('tr');
    tr.classList.add('row-tr');
    tr.setAttribute('id', id);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdCount = document.createElement('td');
    tdCount.classList.add('count');

    const tdStatus = document.createElement('td');
    tdStatus.classList.add('status');
    tdStatus.textContent = status;

    const tdActions = document.createElement('td');
    const buttonGroup = createButtonsGroup([
        {
            classList: 'btn btn-warning me-1 btn-edit',
            type: 'button',
            text: 'Редактировать',
        },
        {
            classList: 'btn btn-danger me-1 btn-del',
            type: 'submit',
            text: 'Удалить',
        },
        {
            classList: 'btn btn-success btn-end',
            type: 'submit',
            text: 'Завершить',
        },

    ]);

    if (status === 'В процессе') {
        tr.classList.add('table-light');
        tdName.classList.add('task');
    } else {
        tr.classList.add('table-success');
        tdName.classList.add('text-decoration-line-through');
        buttonGroup[0].setAttribute('disabled', 'disabled');
        buttonGroup[2].setAttribute('disabled', 'disabled');
    }
    tdActions.append(...buttonGroup);

    tr.append(tdCount, tdName, tdStatus, tdActions);

    return tr;
};

const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-hover', 'table-hovered');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
    <tr>
    <th>№</th>
    <th>Задача</th>
    <th>Статус</th>
    <th>Действия</th>
    </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
};

const createForm = () => {
    const form = document.createElement('form');
    form.classList.add('d-flex', 'align-items-center', 'mb-3');

    const label = document.createElement('label');
    label.classList.add('form-group', 'me-3', 'mb-0');

    label.setAttribute('type', 'text');
    label.setAttribute('for', 'task');

    const input = document.createElement('input');
    input.classList.add('form-control', 'me-3');
    input.setAttribute('id', 'task');
    input.setAttribute('name', 'task');
    input.setAttribute('required', 'required');
    input.setAttribute('placeholder', 'ввести задачу');

    const buttonGroup = createButtonsGroup([
        {
            classList: 'btn btn-primary me-3 btn-save',
            type: 'submit',
            text: 'Сохранить',
        },
        {
            classList: 'btn btn-warning btn-clear',
            type: 'button',
            text: 'Очистить',
        },
    ]);

    form.append(label, input, ...buttonGroup);

    return form;
};

export default {
    positionСalculation,
    addNoteData,
    createButtonsGroup,
    createLogo,
    createRow,
    createTable,
    createForm,
}