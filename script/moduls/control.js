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
    // console.log(yesOrNo);
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

  // const foo1 = (elem) => {
  //   elem.addEventListener('click', function foo() {
  //     const input = document.createElement('input');
  //     input.value = this.innerHTML;
  //     this.innerHTML = '';
  //     this.appendChild(input);

  //     const td = this;
  //     input.addEventListener('blur', function () {
  //       td.innerHTML = this.value;
  //       td.addEventListener('click', foo);
  //     })
  //     this.removeEventListener('click', foo);
  //   });
  // };


  // };

  // list.addEventListener('click', e => {
  //   const target = e.target;
  //   if (target.closest('.task') &&
  //   target.closest('.task').hasAttribute('contenteditable')) {
  //     const task = target.closest('.task');
  //     // const tasks = document.querySelectorAll('.task');
  //     // for (let i = 0; i <= tasks.length; i++) {
  //       const input = document.createElement('input');
  //       const textValue = task.innerHTML;
  //       task.innerHTML = '';
  //       task.append(input);
  //       input.value = textValue;

  //     // }
  //     // const task = target.closest('.row-tr').querySelector('.task');
  //     // task.setAttribute('contenteditable', true);
  //     console.log(target);
  //     // input.removeEventListener('click', foo);
  //   }
  // }, { once: true });
  const editTask = (btnEdit, task) => {
    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.btn-finish')) {
        btnEdit.innerHTML = 'Редактировать';
        btnEdit.classList.remove('btn-finish');
        btnEdit.classList.add('btn-edit');
        task.removeAttribute('contenteditable');
        const newTask = task.innerHTML;
        const id = target.closest('.row-tr').id;
        console.log(newTask);
        console.log(id);
        editTaskNameStorage(data, newTask, id, user);
      }
    });
  };


  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn-edit')) {
      const btnEdit = target.closest('.btn-edit');
      const task = target.closest('.row-tr').querySelector('.task');
      task.setAttribute('contenteditable', true);
      // console.log(target);
      task.addEventListener('click', () => {
        if (task.hasAttribute('contenteditable')) {
          btnEdit.innerHTML = 'Сохранить';
          btnEdit.classList.remove('btn-edit');
          btnEdit.classList.add('btn-finish');
          editTask(btnEdit, task);
          // console.log('работает');
        }
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
    // console.log('newContact', newContact);

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
