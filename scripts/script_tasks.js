window.onload = () => {
    userName();
    renderSkeletons(3, ".not-done-tasks");
    renderSkeletons(2, ".done-tasks");

    getTasks();

    document.forms.addTask.addEventListener('submit', e => {
        e.preventDefault();
        addTask();
    });
}

verifyToken();

setInterval(() => {
    verifyToken();
}, 100000)

function verifyToken() {
    const token = RequestManager.getToken();

    if (!token || token == "undefined") {
        location.href = './login.html';
    }
}

function userName() {
    const usernameContainer = document.querySelector('#user-name');
    let username;

    UserData.getUser('/users/getMe').then(userData => {
        usernameContainer.innerHTML = `Hola, <strong>${userData.firstName}</strong>`;
    }).catch(err => {
        console.log(err)
    });
}

function getTasks() {
    RequestManager.get('/tasks').then(tasks => {
        removeSkeleton(".not-done-tasks");
        removeSkeleton(".done-tasks");
        createTasks(tasks);
    }).catch(err => {
        console.log(err)
    });
}

function renderTasks(task) {
    const template = `
    <li class="task showing-tasks">
        <div class="not-done" onclick="taskDone(${task.id}, ${task.completed})"></div>
        <div class="description">
            <p class="name">${task.description}</p>
            <p class="timestamp">Fecha de creación: ${dayjs().format("DD/MM/YYYY")}</p>
            <i class="fas fa-trash-alt" onclick="deleteTask(${task.id})"></i>
        </div>
    </li>
        `;

    const notDoneTasksContainer = document.querySelector('ul.not-done-tasks');
    const doneTasksContainer = document.querySelector('ul.done-tasks');
    task.completed ? doneTasksContainer.innerHTML += template : notDoneTasksContainer.innerHTML += template;
}

function createTasks(tasks) {
    document.querySelector('ul.not-done-tasks').innerHTML = '';
    document.querySelector('ul.done-tasks').innerHTML = '';

    tasks.forEach(task => {
        renderTasks(task)
    })
}

function addTask() {
    const description = document.forms.addTask.newTaskDescription.value;
    const body = {
        description: description,
        completed: false
    }

    RequestManager.post('/tasks', body).then(task => {
        document.forms.addTask.newTaskDescription.value = '';
        renderTasks(task);
    }).catch(err => {
        console.log(err);
    })
}

function taskDone(id, completed) {
    const body = {
        completed: !completed,
    }

    RequestManager.put(`/tasks/${id}`, body).then(() => {
        getTasks();
    }).catch(err => {
        console.log(err);
    });
}

function deleteTask(id) {
    Swal.fire({
        title: '¿Deseas eliminar esta tarea?',
        text: "Esta acción no puede revertirse.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#7898FF',
        cancelButtonColor: '#8E64C5',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            RequestManager.delete(`/tasks/${id}`).then(() => {
                getTasks();
                Swal.fire(
                    '¡Listo!',
                    'La tarea fue borrada con éxito.',
                    'success'
                )
            }).catch(err => {
                console.log(err);
            })
        }
    })
}



