// Add current day to header
var getDate = moment().format('dddd, MMMM Do');
$("#currentDay").text(getDate);

var loadSchedule = function(i) {
    var schedule = localStorage.getItem(i);

    // if nothing in localStorage return
    if (schedule === null) {
        return false;
    } else {
        return schedule;
    }
}


var createTimeBlock = function(i) {
    // make timeBlock
    var timeBlock = $('<div>')
        .addClass('row')
        .addClass('time-block')
        .attr('id', 'block-'+i)
        .attr('data-hour',i);

    // append to timeblock container on the page
    $(".container").append(timeBlock);  
}; 

// Make timestamps function
var createTimeStamps = function(i) {

    // make div for hour <p>
    var hourWrapper = $('<div>')
        .addClass('row')
        .addClass('col-2')
        .addClass('justify-content-end')
        .addClass('hour');

    // make hour element <p>
    var hourEl = $('<p>')
        .addClass('align-self-center');

    // add 9 to show correct hour
    var correctHour = 9 + i;

    // format to 12hr
    var showHour = moment(correctHour, 'hA').format('hA');

    // add showHour to element text
    hourEl.text(showHour);

    // add hour element to hourWrapper
    hourWrapper.append(hourEl);

    // add to timeblock
    $('#block-'+i).attr('data-hour', i).append(hourWrapper);
};

// Make planner input function
var createPlannerInputs = function(i) {
    // add 9 to show correct hour from timestamps
    var timeStamp = i + 9;
    // make planner input and add attributes
    var plannerInput = $('<textarea>')
        .addClass('col-8')
        .addClass('description')
        .attr('id','input-'+i)
        .attr('type','text');
    
    // grab time in hours (24hr format)
    var currentHour = moment().format('H');
    // find hours diff by subtraction
    var timeDiff = timeStamp - currentHour;

    // add class depending on time (color code)
    if (timeDiff < 0) { // past time class
        plannerInput.addClass('past'); 
    } else if(timeDiff === 0) { // present time class
        plannerInput.addClass('present'); 
    } else if(timeDiff > 0) { // future time class
        plannerInput.addClass('future');
    }

    // add text from local storage if avail
    var addSavedEvent = loadSchedule(i);

    if(addSavedEvent) {
        plannerInput.val(addSavedEvent);
    } else {
        plannerInput.val("");
    }

    // add to timeblock
    $('#block-'+i).attr('data-hour', i).append(plannerInput);
};

var createSaveBtn = function(i) {
    // make save button
    var saveBtn = $('<div>')
        .addClass('saveBtn')
        .addClass('col-2')
        .addClass('row')
        .addClass('justify-content-center')
        .addClass('align-items-center')
        .attr('id','btn-'+i);
    
    // add icons
    var saveBtnIcon = $('<i>')
        .addClass('fas fa-save')
        .addClass('btnClick');

    // add icons to btn
    saveBtn.append(saveBtnIcon);

    // add btn to timeblock
    $('#block-'+i).attr('data-hour', i).append(saveBtn);
}

// add timeblocks for work hours(8 hours: 9-5pm)
for (let i = 0; i <= 8; i++) {
    // call function to create time block
    createTimeBlock(i);
    // call function to create time stamp
    createTimeStamps(i);
    // call function to create the planner input
    createPlannerInputs(i);
    // call function to create save buttons/icons
    createSaveBtn(i);
};


var saveSchedule = function(textId, text) {
    // add new object with task id and value of the text
    localStorage.setItem(textId, text);
};

$('.btnClick').on('click', function() {
    // get text id (same as btn clicked)
    var textId = $(this)
         .closest('.saveBtn')
         .attr('id')
         .replace('btn-','');

    // grab text
    var text = $('#input-'+textId)
        .val();

    saveSchedule(textId, text);
    
});
