//todays date
$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY'));

var workHours = {
  "9AM": "",
  "10AM": "",
  "11AM": "",
  "12PM": "",
  "1PM": "",
  "2PM": "",
  "3PM": "",
  "4PM": "",
  "5PM": "",
};

var counter = 1;
for(const property in workHours) {
  var textEntry = "#text" + counter;
  $(textEntry).text(workHours[property]);
  var timeId = "#row-time" + counter;
  var presentHour = moment().hour();
  var timeString = $(timeId).text();
  var timeNumber = hourNumberFromHourString(timeString);  
  if(timeNumber < presentHour) {
    $(textEntry).addClass("past");
  } else if (timeNumber > presentHour) {
    $(textEntry).addClass("future");
  } else {
    $(textEntry).addClass("present");
  }
  counter ++;
};

function hourNumberFromHourString(hourString) {
  switch(hourString) {
    case "9AM": return 9;
    case "10AM": return 10;
    case "11AM": return 11;
    case "12PM": return 12;
    case "1PM": return 13;
    case "2PM": return 14;
    case "3PM": return 15;
    case "4PM": return 16;
    case "5PM": return 17;
  }
};

$(document).ready(function(){
  if(!localStorage.getItem('workHours')) {
    updateCalendarTasks(workHours);
  } else {
    updateCalendarTasks(JSON.parse(localStorage.getItem('workHours')));
  }
});

$("button").click(function() {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();
  
  saveSchedule(hourString, value);
});

function loadCorrectDataset() {
  result = localStorage.getItem('workHours')
  return (result ? result : workHours);
}

function initializeLocalStorage() {
  localStorage.setItem('workHours', JSON.stringify(workHours));
};

function saveToLocalStorage(dayObj) {
  localStorage.setItem('workHours', JSON.stringify(dayObj));
}

function saveSchedule(hourString, val) {
  if(!localStorage.getItem('workHours')) {
    initializeLocalStorage();
  }

  var workTime = JSON.parse(localStorage.getItem('workHours'));
  workTime[hourString] = val

  saveToLocalStorage(workTime);
}

function updateCalendarTasks(dayObject) {
  $(".row").each(function(index) {
    var res = $(this).children("div");
    $(this).children("textarea").text(dayObject[res.text()]);
  })
}
