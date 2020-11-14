

// Add current day to header
var getDate = moment().format('dddd, MMMM Do');
$("#currentDay").text(getDate);

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
    // add 9 to show correct hour from timestamps again
    var timeStamp = i + 9;
    // make planner input and add attributes
    var plannerInput = $('<textarea>')
        .addClass()
        .attr('id','input-'+i)
        .attr('type','text');
    
    // grab time in hours (24hr format)
    var currentHour = moment().format('H');
    // find hours diff by subtraction
    var timeDiff = timeStamp - currentHour;
    console.log(timeDiff);

    // add class depending on time (color code)
    if (timeDiff < 0) { // past time class
        plannerInput.addClass('past'); 
    } else if(timeDiff === 0) { // present time class
        plannerInput.addClass('present'); 
    } else if(timeDiff > 0) { // future time class
        plannerInput.addClass('future');
    }

    // make new col for row
    var plannerInputWrapper = $('<div>')
        .addClass('col-8')
        .addClass('description');
    
    // add input element to div Wrapper
    plannerInputWrapper.append(plannerInput);

    // add to timeblock
    $('#block-'+i).attr('data-hour', i).append(plannerInputWrapper);

};

// add timeblocks for work hours(8 hours: 9-5pm)
for (let i = 0; i <= 8; i++) {
    // call time block function
    createTimeBlock(i);
    // call time stamp function
    createTimeStamps(i);
    // call function to create the planner input
    createPlannerInputs(i);
    
};
