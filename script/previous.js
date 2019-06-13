function getQueryStringValue (key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
// variable for the id
var id = getQueryStringValue("id");
console.log(id)
//Global variables
var flights;
var current;


//get API
fetch('https://api.spacexdata.com/v3/launches/past')

    .then(function (result) {
      return result.json();
      })
    .then(function(res){
      console.log(res);
      return populate(res);
      })
    .catch(function(error) {
    console.log(error)
  })

var x = window.matchMedia("(min-width: 1601px)");
var xx = window.matchMedia("(min-width: 1024px)");

var checkwidth = window.innerWidth

function populate(result){

	var list= [];
	flights = result;

	if(id !== ""){
		populateFlight(parseInt(id))
		}
	else{
		populateFlight((result.length-1))
	}

    sortDateRev()
    document.querySelector('.item8').addEventListener('click', dec, true);
    document.querySelector('.item9').addEventListener('click', inc, true);
    document.querySelector('#button-youtube').addEventListener('click', watch, true);


    document.querySelector('.launch-list-button').addEventListener('click', toggle, true);
    document.querySelector('.hamburger').addEventListener('click', hamburger, true);


	// x.addListener(function(){
	// 	document.querySelector('.launch-list').style.display = 'inline-block'
	// })
	x.addListener(function(){

		if(x.matches === true){
			document.querySelector('.launch-list-wrapper').style.display = 'block'

		}
		else if (x.matches === false){
			document.querySelector('.launch-list-wrapper').style.display = 'none'

		}

	})

	if(checkwidth >= 1024){
		document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo2.svg'
	}
	else if (checkwidth < 1024){
		document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo.svg'
	}

	xx.addListener(function(){
		var hide = document.querySelectorAll('.hideall')
		if(xx.matches === true){
			for (var i = 0; i < hide.length; i++) {
				hide[i].style.display = 'block'
			}
			document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo2.svg'
		}
		else if (xx.matches === false){
			for (var i = 0; i < hide.length; i++) {
				hide[i].style.display = 'none'
			}
			document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo.svg'
		}
	})

}

function hamburger(evt){

	var links = document.querySelector('.links');
	// console.log(links.className)


	if (links.className === "links") {
	   links.className += " responsive";
	 } else {
	   links.className = "links";
	 }

}





function toggle(){
	console.log(document.querySelector('.launch-list-wrapper').style.display)

	if(document.querySelector('.launch-list-wrapper').style.display === 'block'){
		document.querySelector('.launch-list-wrapper').style.display = 'none'
	    // document.querySelector('.launch-list-button').style.backgroundColor = '#FF8800'
	}

	else {
		document.querySelector('.launch-list-wrapper').style.display = 'block'
		// document.querySelector('.launch-list-button').style.backgroundColor = 'white'
	}
}



function mobileflights(evt){
	// console.log("dsfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	var x = window.matchMedia("(max-width: 1123px)")

	// var classname = '.' + evt.target.parentNode.className + ' .hideall'
	var classname = evt.target.parentNode.className.split(/\s+/)

	var input = '.'+ classname[1] + ' .hideall'

	var input2 = '.'+ classname[1]
	console.log(input)
	if (x.matches){
		var hei = document.querySelectorAll(input)

		for (var i = 0; i < hei.length; i++) {

			if(hei[i].style.display==='block')
				hei[i].style.display = 'none'
			else
				hei[i].style.display = 'block'

		}
	}
}


function sortDate(){
	document.querySelector('.launch-list ul').innerHTML=""
	for (var i = 0; i < flights.length; i++) {
		var fname = flights[i].launch_date_utc.match(/([^T]+)/)
		document.querySelector('.launch-list ul').innerHTML+=
		"<li class="+(flights[i].flight_number-1)+">#"+ flights[i].flight_number + ' ' +flights[i].mission_name+' '+ '<span>('+ fname[0] + ')</span>'+"</li>"
	}
}

function sortDateRev(){
	document.querySelector('.launch-list ul').innerHTML=""
	for (var i = (flights.length-1); i >= 0; i--) {
		var fname = flights[i].launch_date_utc.match(/([^T]+)/)
		document.querySelector('.launch-list ul').innerHTML+=
		"<li class="+(flights[i].flight_number-1)+">#"+ flights[i].flight_number + ' ' +flights[i].mission_name+' '+ '<span>('+ fname[0] + ')</span>'+"</li>"
	}
	document.querySelector('.launch-list ul').addEventListener('click', pressList, true);
}
function sortName(){
	var sortName;
	sortName = flights.slice().sort((a, b) => (a.mission_name > b.mission_name) ? 1 : -1)
	document.querySelector('.launch-list ul').innerHTML=""
	for (var i = (sortName.length-1); i >= 0; i--) {
		var fname = sortName[i].launch_date_utc.match(/([^T]+)/)
		document.querySelector('.launch-list ul').innerHTML+=
		"<li class="+(sortName[i].flight_number-1)+">"+sortName[i].mission_name+ ' #'+ sortName[i].flight_number + ' '+ '<span>('+ fname[0] + ')</span>'+"</li>"
	}
}
function sortNameRev(){
	var sortNameRev;
	sortNameRev = flights.slice().sort((a, b) => (a.mission_name > b.mission_name) ? 1 : -1)
	document.querySelector('.launch-list ul').innerHTML=""
	for (var i = 0; i < sortNameRev.length; i++) {
		var fname = sortNameRev[i].launch_date_utc.match(/([^T]+)/)
		document.querySelector('.launch-list ul').innerHTML+=
		"<li class="+(sortNameRev[i].flight_number-1)+">"+sortNameRev[i].mission_name+ ' #'+ sortNameRev[i].flight_number + ' '+ '<span>('+ fname[0] + ')</span>'+"</li>"
	}
}









function inc(evt){

	populateFlight((current+1))


}

function dec(evt){
	populateFlight((current-1))

}





function watch(evt){
	var hide= document.querySelectorAll('.hide');
	if (document.querySelector('#button-youtube').innerText ==="INFO"){
		document.querySelector('.youtube').innerHTML = ''
		document.querySelector('#button-youtube').innerText ="WATCH"
		document.querySelector('.launch-info-wrapper .item17 h3').innerText ="WATCH"
		for (var i = 0; i < hide.length; i++) {
			hide[i].style.display = 'block'
		}
	}
	else if (document.querySelector('#button-youtube').innerText ==="WATCH"){
		document.querySelector('.youtube').innerHTML = ''
		for (var i = 0; i < hide.length; i++) {
			hide[i].style.display = 'none'
		}
		document.querySelector('.youtube').innerHTML =
		'<iframe allowfullscreen="allowfullscreen" src="https://www.youtube.com/embed/'+ flights[current].links.youtube_id +'"></iframe>'
		document.querySelector('#button-youtube').innerText ="INFO"
		document.querySelector('.launch-info-wrapper .item17 h3').innerText ="BACK"
	}
}


function pressList(evt){
	var x = window.matchMedia("(max-width: 1600px)")

	if (x.matches){
		document.querySelector('.launch-list-wrapper').style.display = 'none'
	}


    	var same
    	console.log(x)
    	if(evt.target.localName === 'li'){
    		same = parseInt(evt.srcElement.className)
    	}
    	if(evt.target.localName === 'span'){
    		same = parseInt(evt.target.parentNode.className)
    	}
		populateFlight(same)
}




function populateFlight(number){

	current=number


	var links = flights[number].links



	//---FLIGHT---//
	var flightNumber = document.querySelector('.input-flight-number')
	var missionName = document.querySelector('.input-flight')
	var flightpatch = document.querySelectorAll('.input-image-flight-icon')
	flightpatch[0].src = links.mission_patch_small
	flightpatch[1].src = links.mission_patch_small
	flightNumber.innerText = 'FLIGHT: #' + flights[number].flight_number
	missionName.innerText = flights[number].mission_name


	// FLIGHT DETAILS
	var flightDetails = document.querySelector('.item7 p')
	flightDetails.innerText= flights[number].details


	// LINKS
	var linkSection = document.querySelector('.item4')
	linkSection.innerHTML= '<h3>LINKS</h3>'
	if (links.article_link !== null){
	linkSection.innerHTML+= '<a class="hideall" href="'+links.article_link+'">Article Link</a>'
	}
		if (links.presskit !== null){
		linkSection.innerHTML+= '<a class="hideall" href="'+links.presskit+'">Presskit</a>'
		}
			if (links.reddit_campaign !== null){
			linkSection.innerHTML+= '<a class="hideall" href="'+links.reddit_campaign+'">Reddit Campaign</a>'
			}
				if (links.reddit_launch !== null){
				linkSection.innerHTML+= '<a class="hideall" href="'+links.reddit_launch+'">Reddit Launch</a>'
				}
					if (links.video_link !== null){
					linkSection.innerHTML+= '<a class="hideall" href="'+links.video_link+'">Video link</a>'
					}
						if (links.wikipedia !== null){
						linkSection.innerHTML+= '<a class="hideall" href="'+links.wikipedia+'">Wikipedia</a>'
						}

	// PAYLOADS
	var payloads = flights[number].rocket.second_stage.payloads
	var payl= document.querySelector('.item6')
	payl.innerHTML = '<h3>PAYLOADS</h3>'
	for (var i = 0; i < payloads.length; i++) {
		payl.innerHTML += '<h4 class="hideall">PAYLOADS ' + (i+1) + '</h4>'
		payl.innerHTML += '<p class="hideall">customers: <span class="payloads" id="payloads-customers">'+ flights[number].rocket.second_stage.payloads[i].customers[0] +'</span></p>'
		payl.innerHTML += '<p class="hideall">nationality: <span class="payloads" id="payloads-nationality">'+ flights[number].rocket.second_stage.payloads[i].nationality +'</span></p>'
		payl.innerHTML += '<p class="hideall">payload mass kg: <span class="payloads" id="payloads-mass">'+ flights[number].rocket.second_stage.payloads[i].payload_mass_kg +'</span></p>'
		payl.innerHTML += '<p class="hideall">payload type: <span class="payloads" id="payloads-type">'+ flights[number].rocket.second_stage.payloads[i].payload_type +'</span></p>'
	}

	//FLIGHT CAROSEL
	if(number === (flights.length-1)){

		document.querySelector('.item9').style.display = 'none'
	}
		else if(number === 0){

			document.querySelector('.item8').style.display = 'none'
		}
			else{
				document.querySelector('.item8').style.display = 'block'
				document.querySelector('.item9').style.display = 'block'
			}

	//rockets
	var rocketSerial = document.querySelector('.input-rocket-serial')
	var rocketType = document.querySelector('.input-rocket-type')
	var rocketImg = document.querySelector('.input-img-rocket')
	var rocketLink = document.querySelector('.rocke-link')


	rocketSerial.innerText ='core_serial: ' +flights[number].rocket.first_stage.cores[0].core_serial
	rocketType.innerText ='rocket_type: ' +flights[number].rocket.rocket_type

	if (flights[number].rocket.rocket_id === "falcon1"){
	rocketImg.src = 'svg/falcon1.svg'
	rocketLink.href = "https://www.spacex.com/dragon"
	}
		else if (flights[number].rocket.rocket_id === "falcon9"){
			rocketImg.src = 'svg/falcon9.svg'
			rocketLink.href = "https://www.spacex.com/falcon9"
		}
			else if (flights[number].rocket.rocket_id === "falconheavy"){
				rocketImg.src = 'svg/falcon_heavy.svg'
				rocketLink.href = "https://www.spacex.com/falcon-heavy"
			}

	//time
	var date = flights[number].launch_date_utc.match(/([^T]+)/)
	var clock = flights[number].launch_date_utc.match(/T.*/)

	var ny = clock[0].replace(/T/g, "")
	var ny2 = ny.replace(/Z/g, "")
	console.log(ny)
	document.querySelector('.input-date').innerText = date[0]
	document.querySelector('.input-time').innerText = ny2

	//launch site
	var lanchSite = document.querySelector('.launch-site')
	lanchSite.innerText = flights[number].launch_site.site_id
	lanchSite.href = 'mapspesific.html?id=' + flights[number].launch_site.site_id

	//booleans
	var gradfins = document.querySelector('#input-rocket-gradfins')
	var gradfinsBoolean = document.querySelector('#input-rocket-gradfins-boolean')
	var legs = document.querySelector('#input-rocket-legs')
	var legsBoolean = document.querySelector('#input-rocket-legs-boolean')
	var reused = document.querySelector('#input-rocket-reused')
	var reusedBoolean = document.querySelector('#input-rocket-reused-boolean')
	var landSuccess = document.querySelector('#input-rocket-land_success')
	var landSuccessBoolean = document.querySelector('#input-rocket-land_success-boolean')

	var firstStage = flights[number].rocket.first_stage.cores[0]

	if (firstStage.gridfins === true){
		gradfins.style.display = 'inline-block'
		gradfinsBoolean.style.backgroundColor = '#878382'
	}
		else if (firstStage.gridfins === false){
			gradfins.style.display = 'inline-block'
			gradfinsBoolean.style.backgroundColor = 'transparent'
			gradfinsBoolean.style.border = '1px solid #878382'
		}
			else if (firstStage.gridfins === null){
				gradfins.style.display = 'none'
			}

	if (firstStage.legs === true){
		legs.style.display = 'inline-block'
		legsBoolean.style.backgroundColor = '#878382'

	}
		else if (firstStage.legs === false){
			legs.style.display = 'inline-block'
			legsBoolean.style.backgroundColor = 'transparent'
			legsBoolean.style.border = '1px solid #878382'
		}
			else if (firstStage.legs === null){
				legs.style.display = 'none'
			}

	if (firstStage.reused === true){
		reused.style.display = 'inline-block'
		reusedBoolean.style.backgroundColor = '#878382'
	}
		else if (firstStage.reused === false){
			reused.style.display = 'inline-block'
			reusedBoolean.style.backgroundColor = 'transparent'
			reusedBoolean.style.border = '1px solid #878382'
		}
			else if (firstStage.reused === null){
				reused.style.display = 'none'
			}

	if (firstStage.land_success === true){
		landSuccess.style.display = 'inline-block'
		landSuccessBoolean.style.backgroundColor = '#878382'
	}
		else if (firstStage.land_success === false){
			landSuccess.style.display = 'inline-block'
			landSuccessBoolean.style.backgroundColor = 'transparent'
			landSuccessBoolean.style.border = '1px solid #878382'
		}
			else if (firstStage.land_success === null){
				landSuccess.style.display = 'none'
			}

	//hiding for video
	 var hide= document.querySelectorAll('.hide');
	 if(document.querySelector('#button-youtube').innerText ==="INFO"){
		 document.querySelector('.youtube').innerHTML = ''
		for (var i = 0; i < hide.length; i++) {
			hide[i].style.display = 'none'
		}
		document.querySelector('.youtube').innerHTML =
		'<iframe allowfullscreen="allowfullscreen" src="https://www.youtube.com/embed/'+ flights[current].links.youtube_id +'"></iframe>'
	 }

	 //add listners for mobile
	     var mobileflight = document.querySelectorAll('.launch-info-wrapper h3')
	 	    for (var i = 0; i < mobileflight.length; i++) {
	 	    	mobileflight[i].addEventListener('click', mobileflights, true)
	 	    }
	 	document.querySelector('.launch-info-wrapper .item17 h3').addEventListener('click', watch, true)

}























