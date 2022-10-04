import createElements from './createElements.js';

const {
  positionСalculation,
  createLogo,
  createRow,
  createTable,
  createForm,
} = createElements;

const addTaskPage = (contact, list) => {
    list.append(createRow(contact));
    positionСalculation();
};

const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    positionСalculation();
    return allRow;
  }

  const renderPhoneBook = (app, title) => {
    const logo = createLogo(title);
    const table = createTable();
    const form = createForm();

    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-wrapper');
    tableWrapper.append(table);

    app.append(logo, form, tableWrapper);

    return {
      list: table.tbody,
      logo,
      form,
    };
  };

  export default {
    addTaskPage,
    renderContacts,
    renderPhoneBook,
  }