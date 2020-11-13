

// Add current day to header
var getDate = moment().format('dddd, MMMM Do');
$("#currentDay").text(getDate);

// Make timestamps function
var createTimeStamps = function(i) {
    // make timeBlock
    var timeBlock = $('<div>')
        .addClass('row')
        .addClass('time-block')
        .attr('data-hour',i);
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
    timeBlock.append(hourWrapper);

    // append to timeblock container on the page
    $(".container").append(timeBlock);  
};



// add timeblocks for work hours(8 hours: 9-5pm)
for (let i = 0; i <= 8; i++) {
    // Call time stamp function
    createTimeStamps(i);
    
};
