import renderElements from './renderElements.js';
import storage from './storage.js';
import createElements from './createElements.js';

const {
  addTaskPage,
} = renderElements;

const {
  editStorage,
  removeStorage,
  editTaskNameStorage,
} = storage;

const {
  positionСalculation,
  addNoteData,
} = createElements;


const endTaskControl = (list, data, userName) => {
  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn-end')) {
      const note = target.closest('.table-light');
      const id = note.id;
      note.classList.add('table-success');
      note.classList.remove('table-light');

      const task = note.querySelector('.task');
      task.classList.remove('task');
      task.classList.add('text-decoration-line-through');

      const status = note.querySelector('.status');
      status.textContent = 'Выполнена';

      const btnEdit = note.querySelector('.btn-edit');
      btnEdit.setAttribute('disabled', 'disabled');

      const btnEnd = note.querySelector('.btn-end');
      btnEnd.setAttribute('disabled', 'disabled');

      editStorage(id, status.textContent, data, userName);
    }
  });
};

const deleteControl = (list, data, userName) => {
  const exit = () => {
    const yesOrNo = confirm('Удалить задачу?', '');
    return yesOrNo;
  };

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn-del')) {
      if (exit() === false) {
        return;
      } else {
        const note = target.closest('.row-tr');
        const id = note.id;
        note.remove();
        removeStorage(id, data, userName);
        positionСalculation();
      }
    }
  });
};

const formControl = (form, list, btnSave, data, user) => {
  const randomIntFromInterval = (min, max) => {
    const num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
  };

  const editTask = () => {
    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.btn-finish')) {
        const task = target.closest('.row-tr').querySelector('.task');
        const btnEnd = target.closest('.row-tr').querySelector('.btn-end');
        btnEnd.removeAttribute('disabled');
        const btnFinish = target.closest('.btn-finish');
        task.classList.remove('bg-secondary');
        btnFinish.innerHTML = 'Редактировать';
        btnFinish.classList.remove('btn-finish');
        btnFinish.classList.add('btn-edit');
        task.removeAttribute('contenteditable');
        const newTask = task.innerHTML;
        const id = target.closest('.row-tr').id;
        editTaskNameStorage(data, newTask, id, user);
      }
    });
  };


  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn-edit')) {
      const btnEdit = target.closest('.btn-edit');
      const task = target.closest('.row-tr').querySelector('.task');
      const btnEnd = target.closest('.row-tr').querySelector('.btn-end');
      task.setAttribute('contenteditable', true);
      task.focus();

      task.addEventListener('keydown', () => {
        btnEnd.setAttribute('disabled', 'disabled');
        task.classList.add('bg-secondary');
        btnEdit.innerHTML = 'Сохранить';
        btnEdit.classList.remove('btn-edit');
        btnEdit.classList.add('btn-finish');
        editTask();
      });
    }
  });

  form.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn-clear')) {
      form.reset();
      btnSave.setAttribute('disabled', 'disabled');
    }
  });

  form.addEventListener('input', e => {
    const target = e.target;
    if (target.closest('.form-control')) {
      btnSave.removeAttribute('disabled');
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    newContact.id = randomIntFromInterval(100000, 200000);
    newContact.status = 'В процессе';
    const id = newContact.id;

    addTaskPage(newContact, list, id);
    addNoteData(data, newContact, user);

    form.reset();
    btnSave.setAttribute('disabled', 'disabled');
  });
};

export default {
  endTaskControl,
  deleteControl,
  formControl,
};
