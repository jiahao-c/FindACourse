'use strict';

/*get building from URL query string*/
let urlParams = new URLSearchParams(window.location.search);
let building = urlParams.get('building');

$(document).ready(() => {
    /*get rooms from JSON and add to selector*/
    $.getJSON("data/merge.json", function (data, status) {
        $.each(data[building].rooms, function (key, val) {
            //add room options to room selector
            $('#room').append(new Option(`${key}`, `${key}`));
        });
        //initial render
        loadCal($('#room option:first-child').val());
        //set the first room as default room
    });
});

//get user selection, json data -> event data
$('#room').change(() => {
    let roomEvents = [];
    let selectedRoom = $('#room').val();
    loadCal(selectedRoom);
});

//render calendar
function renderCal(roomEvents) {
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'timeGrid', 'list'],
        header: {
            left: 'prev,next',
            center: '',
            right: 'timeGridDay,listWeek'
        },
        height:'auto',
        defaultDate: '2019-09-04',
        defaultView: 'listWeek',
        minTime: "08:00:00",
        maxTime:"22:00:00",
        visibleRange: {
            start: '2019-09-02',
            end: '2019-09-07'
        },
        validRange: {
            start: '2019-09-02',
            end: '2019-09-07'
        },
        listDayAltFormat: false,
        nowIndicator: true,
        allDaySlot: false,
        weekends:false, //hide weekends
        navLinks: true, // can click day/week names to navigate views
        weekNumbers: true,
        weekNumbersWithinDays: true,
        weekNumberCalculation: 'ISO',
        editable: false,
        eventLimit: true, // allow 'more' link when too many events
        eventClick: function(info) {
            info.jsEvent.preventDefault(); // don't let the browser navigate
            if (info.event.url) {
              window.open(info.event.url);
            }
          },
        events: roomEvents //pass events as an array
    });

    calendar.render();
}

function sectionToEvents(section, roomEvents) {
    let newEvent;
    let eventTitle = section.subj + ' ' + section.number + ':' + section.title + '\nLecturer: ' + section.prof;
    let eventURL = 'https://www.mcgill.ca/study/2019-2020/courses/' + section.subj.toLowerCase() + '-' + section.number;
    //Todo: confirm before open link
    let eventDate;
    let startEndTime = parseTime(section.time);
    let i = section.days.length;

    while (i--) {
        switch (section.days.charAt(i)) {
            case 'M':
                eventDate = '2019-09-02';
                newEvent = Event(eventTitle, eventURL, eventDate, startEndTime);
                roomEvents.push(newEvent);
                break;
            case 'T':
                eventDate = '2019-09-03';
                newEvent = Event(eventTitle, eventURL, eventDate, startEndTime);
                roomEvents.push(newEvent);
                break;
            case 'W':
                eventDate = '2019-09-04';
                newEvent = Event(eventTitle, eventURL, eventDate, startEndTime);
                roomEvents.push(newEvent);
                break;
            case 'R':
                eventDate = '2019-09-05';
                newEvent = Event(eventTitle, eventURL, eventDate, startEndTime);
                roomEvents.push(newEvent);
                break;
            case 'F':
                eventDate = '2019-09-06';
                newEvent = Event(eventTitle, eventURL, eventDate, startEndTime);
                roomEvents.push(newEvent);
                break;
            default:
                break;
        }
    }
    return roomEvents;
}

function parseTime(time) {
    let startend = time.split('-');
    let start = To24H(startend[0]);
    let end = To24H(startend[1]);
    return [start, end];
}

function To24H(time) {
    let PM = time.match('PM') ? true : false
    let hour = time.slice(0, 2);
    let min = time.slice(3, 5);
    if (PM && 12!=parseInt(hour, 10)) hour = 12 + parseInt(hour, 10);
    return hour + ':' + min + ':' + '00';
}

function Event(eventTitle, eventURL, eventDate, startEndTime) {
    let newEvent = {};
    newEvent["title"] = eventTitle;
    newEvent["url"] = eventURL;
    newEvent["start"] = eventDate + 'T' + startEndTime[0];
    newEvent["end"] = eventDate + 'T' + startEndTime[1];
    return newEvent;
}

function loadCal(selectedRoom){
    let roomEvents = [];
    $.getJSON("../data/merge.json", function (data, status) {
        $.each(data[building].rooms[selectedRoom], function (key, section) {
            roomEvents = sectionToEvents(section, roomEvents);
        });
        $('#calendar').empty();
        renderCal(roomEvents);
    });
}