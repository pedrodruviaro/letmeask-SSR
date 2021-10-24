/*----------------*/
/*FIND ROOM*/
/*----------------*/
const formEnter = document.querySelector("#form-enter-room");

formEnter.addEventListener("submit", (e) => {
    const roomId = e.target[0].value;
    formEnter.setAttribute("action", `/room/${roomId}`);
});
