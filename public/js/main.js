import { open } from "./modal.js";

// action buttons
const readButtons = document.querySelectorAll("button.read");
readButtons.forEach((button) => button.addEventListener("click", handleClick));

const deleteButtons = document.querySelectorAll("button.delete");
deleteButtons.forEach((button) =>
    button.addEventListener("click", (e) => handleClick(e, false))
);

// modal items
const modalTitle = document.querySelector(".modal h2");
const modalDescription = document.querySelector(".modal p");
const modalButton = document.querySelector(".btn-modal");

//handling click
function handleClick(event, check = true) {
    // mounting form url (/question/:roomId/:questionId/:action)
    const roomId = document.querySelector("#room-id").dataset.roomid;
    const questionId = event.target.dataset.id;
    const slug = check ? "check" : "delete";

    const form = document.querySelector(".modal form");
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);

    event.preventDefault();

    modalTitle.textContent = check ? "Mark as read" : "Delete this question";
    modalDescription.textContent = check
        ? "You sure you wanna check this question as read?"
        : "You sure you wanna delete this question?";
    modalButton.textContent = check ? "Yes, mark as read" : "Yes, delete";

    check
        ? modalButton.classList.remove("red")
        : modalButton.classList.add("red");

    open();
}
