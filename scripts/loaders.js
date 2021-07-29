function showSpinner() {
    const body = document.querySelector("body");
    const form = document.forms[0];
    const spinnerContainer = `
    <div id="charging-container">
        <div id="charging">
        </div>
    </div>
    `;

    form.classList.add('hidden');
    body.innerHTML += spinnerContainer;

    return;
}

function hideSpinner() {
    const body = document.querySelector("body");
    const form = document.forms[0];
    const spinnerContainer = document.querySelector('#charging-container');

    body.removeChild(spinnerContainer);
    form.classList.remove('hidden');

    return;
}

function renderSkeletons(num, container) {
    const tasksContainer = document.querySelector(container);
    const skeletons = Array.from({ length: num });

    skeletons.forEach(() => {
        const template = `
            <li class="skeleton-container ${container.replace(".", "")}-child">
                <div class="skeleton-card">
                    <p class="skeleton-text"></p>
                    <p class="skeleton-text"></p>
                </div>
            </li>
        `;

        tasksContainer.innerHTML += template;
    });
}

function removeSkeleton(container) {
    const taskContainer = document.querySelector(container);

    const skeletons = document.querySelectorAll(`${container}-child`);

    skeletons.forEach((skeleton) => taskContainer.removeChild(skeleton));
}
