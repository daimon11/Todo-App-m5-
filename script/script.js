import renderElements from './moduls/renderElements.js';
import storage from './moduls/storage.js';
import control from './moduls/control.js';

const {
  renderContacts,
  renderPhoneBook,
} = renderElements;

const {
  getStorage,
} = storage;

const {
  endTaskControl,
  deleteControl,
  formControl,
} = control;


{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    app.classList.add(
      'vh-100',
      'w-100',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'flex-column');
    const {
      list,
      form,
    } = renderPhoneBook(app, title);

    // Функционал

    const data = getStorage(title);

    console.log('data: ', data);
    const allRow = renderContacts(list, data);

    const btnSave = document.querySelector('.btn-save');
    btnSave.setAttribute('disabled', 'disabled');

    // const btnEdit = document.querySelector('.btn-edit');

    formControl(form, list, btnSave, data, title);
    deleteControl(list, data, title);
    endTaskControl(list, data, title);
  };

  window.noteBookInit = init;
}
