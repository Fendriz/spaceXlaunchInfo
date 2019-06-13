

fetch('https://api.spacexdata.com/v3/launches/next')

    .then(function (result) {
      return result.json();
      })
    .then(function(res){

      return timer(res);
      })
    .catch(function(error) {
    console.log(error)
  })


function timer(result){

	var now = new Date();



	var launch = result.launch_date_unix
	// console.log(launch)
	var endDate = new Date(result.launch_date_utc).getTime();
	// console.log(endDate)

	var timer = setInterval(function() {
	    var now = new Date().getTime()
	    var t = endDate - now
    		var days = Math.floor(t / (1000 * 60 * 60 * 24));
            var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            var secs = Math.floor((t % (1000 * 60)) / 1000)
           	if(days<10)
           		document.querySelector('#count-down-days').innerText ='0' + days
           	else if (days>=10)
            	document.querySelector('#count-down-days').innerText = days
          	if(hours<10)
          		document.querySelector('#count-down-hours').innerText ='0' + hours
          	else if (hours>=10)
         	    document.querySelector('#count-down-hours').innerText =hours
           	if(mins<10)
           		document.querySelector('#count-down-minutes').innerText ='0' + mins
           	else if (mins>=10)
          	   document.querySelector('#count-down-minutes').innerText =mins
          	if(secs<10)
          		document.querySelector('#count-down-seconds').innerText ='0' + secs
          	else if (secs>=10)
           	  document.querySelector('#count-down-seconds').innerText =secs

	}, 1000);
}

document.querySelector('.hamburger').addEventListener('click', hamburger, true);
function hamburger(evt){
	console.log('sdfsdfsdf')
	var links = document.querySelector('.links');
	var count = document.querySelector('.count-down');
	console.log(links.className)
	if (links.className === "links") {
	   links.className += " responsive";

	 } else {
	   links.className = "links";
	 }

	if (count.className === "count-down") {
	   count.className += " responsive";

	 } else {
	   count.className = "count-down";
	 }
}