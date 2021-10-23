const modalWrapper = document.querySelector(".modal-wrapper");

const cancelButton = document.querySelector(".btn.cancel");

cancelButton.addEventListener("click", close);

export function open() {
    modalWrapper.classList.add("open");
}

export function close() {
    modalWrapper.classList.remove("open");
}
