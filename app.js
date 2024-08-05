// array of months used to  update the value of Month in our date using indexing
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
// array of weekday used to  update the value of weekday in our date using indexing
const weekdays =[
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

// selected and assigned DOM Variables
const giveAwayDetails = document.querySelector('.giveaway-details');
const deadLine = document.querySelector('.countdown-wrapper');
const digits = document.querySelectorAll('.countdown-wrapper span');

/* Whenever the application is run, it first check the current date 
and the uses this date to set the futureDate */
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// const futureDate = new Date(2024, 7, 10, 12, 30, 0, 0);

/* updating the values of the date object in the futureDate variable using the temporary year, month, and day values and then incrementing the tempDay value by 5 thus increasing the date range to sometime in the future.  */ 
const futureDate = new Date(tempYear, tempMonth, tempDay + 5, 11, 30, 0);
// getting the year from the futureDate variable 
const year = futureDate.getFullYear();
// getting the weekday from the futureDate variable
const weekday = weekdays[futureDate.getDay()];
// getting the date from the futureDate variable
const date = futureDate.getDate();
// getting the month from the futureDate variable
const month = months[futureDate.getMonth()];
// getting the hours from the futureDate variable
const hrs = futureDate.getHours();
// getting the minutes from the futureDate variable
const min = futureDate.getMinutes();

// console.log(futureDate);

/* Using string template literals to update the value of the give away date on the DOM using values extrated from our FutureDate object */
giveAwayDetails.textContent = `Give away ends on ${weekday}, ${date} ${month} ${year} ${hrs}:${min}pm`

// get the total time of the future date in milliseconds
const futureTime = futureDate.getTime()


function getRemainingTime(){
    // get the total time of the current date in miliseconds
    //this value will alway be changinge because time will always be counting 
    const currDate = new Date().getTime();
   
    /* subtracting the futureTime from the CurrentDate gives us the duration of our coutdown in miliseconds. with this figure we can calculate the 
    - number of day left by converting from miliseconds to days
    - number of hours left by converting from miliseconds to hours
    - num of mins left by converting from miliseconds to mins
    - number of seconds left by converting from miliseconds to secs*/
    const realTime = futureTime - currDate;
    
    // 1s = 1000ms (each sec is made up of 1000 miliseconds).
    // 1min = 60s (each min is mde of 60sec, each sec is made up of 1000 miliseconds)
    // 1hour = 60min (each hr is made of 60 mins, each min is mde of 60sec, each sec is made up of 1000 miliseconds )
    // 1day = 24hrs (1day is made of 24hrs, each hr is made of 60 mins, each min is mde of 60sec, each sec is made up of 1000 miliseconds )

    // to get the total number of miliseconds in a day
    const oneDay = 24 * 60 * 60 * 1000;
    //to get the total number of miliseconds in an hour
    const oneHour = 60 * 60 * 1000;
    // to get the total number of miliseconds in a minute
    const oneMin = 60 * 1000;

 
   /* is calculating the number of days remaining until the future date. by dividing the
   the duration of the countdown by the vlaue of oneday i.e how many days are in the duration of the countdown and the using math.floor to shave out the decimal values*/
    let days = Math.floor(realTime/oneDay);
    /* is calculating the number of hours remaining until the future date. by getting the remainder of the countdown divided by oneday and the dividing that remainder by one hour. 
    i.e how many hours are in the duration of the countdown */
    let hours = Math.floor((realTime % oneDay)/ oneHour);
    /* is calculating the number of minutes remaining until the future date. by getting the remainer of the division of the coundown duration by one hour and the dividing it by one min. i.e how many minutes are in the number of hours left*/
    let minutes = Math.floor((realTime % oneHour)/ oneMin);

    /*  is calculating the number of seconds remaining until the future date. by dividing the remainder of the division of the countdown duration by oneMin by 1000. i.e how many minutes are in the number of mins left */
    let seconds = Math.floor((realTime % oneMin)/ 1000);

    // create an array using days, hours, minitues and seconds as its values
    const values = [days,hours,minutes,seconds];

    // function that puts a 0 in from of any single digit value in the values array
    function format(item){
        if(item < 10){
            return `0${item}`;
        }else{
            return item;
        }
    }


// the textcontent of the digit nodelist is being updated with the items from the values array
    digits.forEach((item,index)=>{
        //looping of the digits nodelist then using its index to access the values of the Values array and assign a corresponding value to each digit textContent.
        item.textContent = format(values[index]);
    })

    // functionality that checks if countdown has exhausted
    if(realTime < 0){
        //stops the countdown and then updates the textContent
        clearInterval(countDown)
        deadLine.innerHTML= `<h3>The give away has ended</h3>`;

    }

}

// funtionality that updates the values of the Coutndown timer every seconds
const countDown = setInterval(getRemainingTime,1000);

// calling the remaining time function
getRemainingTime();