//todays date
$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY'));

let workHours = {
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

let counter = 1;
for(const property in workHours) {
  let textEntry = "#text" + counter;
  $(textEntry).text(workHours[property]);
  let timeId = "#row-time" + counter;
  let presentHour = moment().hour();
  let timeString = $(timeId).text();
  let timeNumber = hourNumberFromHourString(timeString);  
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
