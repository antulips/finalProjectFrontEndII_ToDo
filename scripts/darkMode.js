function darkMode() {
    let bodyClass = document.querySelector('body');
    let container = document.querySelector('.dark-mode-button');

    bodyClass.classList.toggle('dark');
    container.innerHTML == '<i class="fas fa-lightbulb"></i>' ? container.innerHTML = '<i class="far fa-lightbulb"></i>' : container.innerHTML = '<i class="fas fa-lightbulb"></i>';
}