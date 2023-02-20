let date = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let currentDay = date.getDate();
let list = document.querySelector(".days-list")
let currentDate = document.querySelector(".current-data")
let nextPrevBtn = document.getElementById("arrow-buttons");
const days = document.querySelectorAll('.days-item');

const activityInput = document.getElementById('activity');
const form = modal.querySelector('form');

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


const events = {};

function getEventsForDate(date) {
return events[date] || [];
}

function updateModal(date) {
const activityInput = modal.querySelector('#activity');
const activities = getEventsForDate(date);
let activitiesList = '';
if (activities.length > 0) {
activitiesList = activities.map(activity => <li>${activity}</li>).join('');
}
modal.querySelector('ul').innerHTML = activitiesList;
modal.style.display = 'block';
activityInput.focus();
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const activity = activityInput.value;
    const activeDay = document.querySelector('.lol');
    const date = activeDay.getAttribute('data-date');
    
    if (!events[date]) {
    events[date] = [];
    }
    events[date].push(activity);
    
    activeDay.setAttribute('title', activity);
    modal.style.display = 'none';
    });
    
    // const days = document.querySelectorAll('.day');

    days.forEach(day => {
        day.addEventListener('click', event => {
          // Remove active class from all days
          days.forEach(day => {
            day.classList.remove('lol');
          });
          
          // Add active class to the clicked day
          day.classList.add('lol');
          
          const date = day.getAttribute('data-date');
          updateModal(date);
        });
      });

      // Add event listener to form submit button
      form.addEventListener('submit', event => {
        event.preventDefault();
        const activity = activityInput.value;
        const activeDay = document.querySelector('.active');
      
        // Set the title attribute of the active day with the activity value
        activeDay.setAttribute('title', activity);
      
        // Store the activity for the date
        const activities = JSON.parse(localStorage.getItem(date)) || [];
        activities.push(activity);
        localStorage.setItem(date, JSON.stringify(activities));
      
        // Hide the modal
        modal.style.display = 'none';
      });

      function updateModal(date) {
        const activities = JSON.parse(localStorage.getItem(date)) || [];
        const activityList = modal.querySelector('.activity-list');
        activityList.innerHTML = '';
        activities.forEach(act => {
            const li = document.createElement('li');
            li.textContent = act;
            activityList.appendChild(li);
            });
        }