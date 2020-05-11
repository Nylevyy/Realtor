const more = document.querySelector('#more');
const modal = document.querySelector("#ya-lic");
const ok = document.querySelector("#ok");
const close = document.querySelector('.close');
const formP = document.querySelector('#formP');
const formRef = document.querySelector('#formRef');
const form = document.querySelector('#form');

function toggleModal() {
    modal.classList.toggle("is_open");
}

function toggleForm() {
    formP.classList.toggle("hidden");
    form.classList.toggle("hidden");
}


more.addEventListener('click', toggleModal);

close.addEventListener('click', toggleModal);

ok.addEventListener('click', toggleModal);

formRef.addEventListener('click', evt => evt.preventDefault());

formRef.addEventListener('click', toggleForm);
