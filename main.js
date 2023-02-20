let date = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let currentDay = date.getDate();
let list = document.querySelector(".days-list")
let currentDate = document.querySelector(".current-data")
let nextPrevBtn = document.getElementById("arrow-buttons");

function calendarRender() {
    let daysInMonth = new Date(currentYear, currentMonth+1, 0).getDate();
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDaysOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liTag = "";

    for(i = firstDayOfMonth; i>0; i--){
        liTag += `<li class="days-item inactive"><span>${lastDaysOfPreviousMonth - i + 1}</span></li>`;
    }

    for(i = 1; i<=daysInMonth; i++){
        let isToday = i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? "active":"";
        liTag += `<li class="days-item ${isToday}"><span>${i}</span></li>`;
    }
 
    for(let i = 1, daysOfNextMonth = 42 - (daysInMonth + firstDayOfMonth); i < daysOfNextMonth + 1; i++){
        liTag += `<li class="days-item inactive">${i}</li>`;
    }
    list.innerHTML = liTag;
    currentDate.innerText = `${months[currentMonth]} ${currentYear}`
}
calendarRender();

nextPrevBtn.addEventListener("click", icon => {
    if(icon.target.id === "prev"){
    currentMonth = currentMonth - 1;
    }

    if(icon.target.id === "next"){
    currentMonth = currentMonth + 1;
    }

    if(currentMonth < 0 || currentMonth > 11) {
        date = new Date(currentYear, currentMonth);
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
    }
    calendarRender();
});


