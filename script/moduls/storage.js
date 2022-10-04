const getStorage = (userName) => {
    const arr = localStorage.getItem(userName) ?
        JSON.parse(localStorage.getItem(userName)) : [];
    return arr;
};

const setStorage = (key, value) => {
    const obj = JSON.stringify(value);
    localStorage.setItem(key, obj);
};

const editStorage = (id, status, data, userName) => {
    id = +id;
    for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
            data[i].status = status;
        }
    }
    setStorage(userName, data);
};

const removeStorage = (id, data, user) => {
    id = +id;
    for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
            data.splice(i, 1);
            // console.log('работает');
        }
    }
    setStorage(user, data);
};

const editTaskNameStorage = (data, newTask, id, user) => {
    id = +id;
    for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
            data[i].task = '';
            data[i].task = newTask;
            console.log('работает');
        }
        setStorage(user, data);
    };
};

export default {
    getStorage,
    setStorage,
    editStorage,
    removeStorage,
    editTaskNameStorage,
}