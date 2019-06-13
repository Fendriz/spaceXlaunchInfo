var KWAJALEIN = []
var	CAPE = []
var	KENNEDY = []
var	VANDENBERG3X = []
var	VANDENBERG4E = []
var	TEXAS = []
var sites = ['kwajalein_atoll','ccafs_slc_40','ksc_lc_39a','vafb_slc_3w','vafb_slc_4e','stls']
var x = window.matchMedia("(min-width: 1601px)");
var xx = window.matchMedia("(min-width: 1024px)");
var checkwidth = window.innerWidth

function getQueryStringValue (key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
var name = getQueryStringValue("id")
var id=0

if (name === sites[0])
	id=0
	else if (name === sites[1])
		id=1
		else if (name === sites[2])
			id=2
			else if (name === sites[3])
				id=3
				else if (name === sites[4])
					id=4
					else if (name === sites[5])
						id=5

var list = document.querySelectorAll('#map-launch-list li')
list[id].style.backgroundColor = '#FF8800'
list[id].style.color = '#262626'
list[id].style.fontWeight = 'bolder'

fetch('https://api.spacexdata.com/v3/launches/past')

    .then(function (result) {
      return result.json();
      })
    .then(function(res){

      return sort(res);
      })
    .catch(function(error) {
    console.log(error)
  })

function hamburger(evt){
	var links = document.querySelector('.links');
	if (links.className === "links") {
	   links.className += " responsive";
	 } else {
	   links.className = "links";
	 }
}
function toggle(){
	if(document.querySelector('.launch-list-wrapper').style.display === 'block'){
		document.querySelector('.launch-list-wrapper').style.display = 'none'
	}
	else {
		document.querySelector('.launch-list-wrapper').style.display = 'block'
	}
}

function sort(result){

	for (var i = 0; i < result.length; i++) {
		if (result[i].launch_site.site_id ==="kwajalein_atoll")
			KWAJALEIN.push(result[i])
		else if (result[i].launch_site.site_id ==="vafb_slc_4e")
			VANDENBERG4E.push(result[i])
		else if (result[i].launch_site.site_id ==="ccafs_slc_40")
			CAPE.push(result[i])
		else if (result[i].launch_site.site_id ==="stls")
			TEXAS.push(result[i])
		else if (result[i].launch_site.site_id ==="ksc_lc_39a")
			KENNEDY.push(result[i])
		else if (result[i].launch_site.site_id ==="vafb_slc_3w")
			VANDENBERG3X.push(result[i])
	}
	fetch('https://api.spacexdata.com/v3/launchpads')

	    .then(function (result) {
	      return result.json();
	      })
	    .then(function(res){

	      return populate(res);
	      })
	    .catch(function(error) {
	    console.log(error)
	  })
}

function hidelaunch(){
	var launch = document.querySelector('.item13');
	if (launch.className === "item13") {
	   launch.className += " responsive";
	 } else {
	   launch.className = "item13";
	 }
}
function hidelinks(){
	var links = document.querySelector('.item14');
	if (links.className === "item14") {
	   links.className += " responsive";
	 } else {
	   links.className = "item14";
	 }
}
function hidedetails(){
	var details = document.querySelector('.item15');
	if (details.className === "item15") {
	   details.className += " responsive";
	 } else {
	   details.className = "item15";
	 }
}
function hidesiteid(){
	var siteid = document.querySelector('.item16');
	if (siteid.className === "item16") {
	   siteid.className += " responsive";
	 } else {
	   siteid.className = "item16";
	 }
}

function addlistners(){
	document.querySelector('.item8').addEventListener("click", function (e){
		if(id > 0)
	    	window.location.href = '../spaceX/mapspesific.html?id=' + sites[(id-1)]
	    else
	    	window.location.href = '../spaceX/mapspesific.html?id=' + sites[(sites.length-1)]
	    },true);
	document.querySelector('.item9').addEventListener("click", function (e){

		if(id < 5){
			window.location.href = '../spaceX/mapspesific.html?id=' + sites[(id+1)]
		}
	    else
	    	window.location.href = '../spaceX/mapspesific.html?id=' + sites[0]

	    },true);
	  document.querySelector('.launch-list-button').addEventListener('click', toggle, true);
	  document.querySelector('.hamburger').addEventListener('click', hamburger, true);
	  document.querySelector('#launches').addEventListener('click', hidelaunch, true);
	  document.querySelector('#links').addEventListener('click', hidelinks, true);
	  document.querySelector('#details').addEventListener('click', hidedetails, true);
	  document.querySelector('#siteid').addEventListener('click', hidesiteid, true);

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
	  if(xx.matches === true){
	  	console.log('sdfsdfsdf')
	    document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo2.svg'
	  }
	  else if (xx.matches === false){
	  	console.log('sdfsdfsdf')
	    document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo.svg'
	  }
	})
}

function populate (result) {

	var lat = result[id].location.latitude
	var long = result[id].location.longitude
	initMap(lat, long)
	populateSite(result)
	for (var i = 0; i < result.length; i++) {
		(function (){
			var id2 = result[i].id
			var send = result[i].site_id
			var listid = "#launch-list-" + id2
			document.querySelector(listid).addEventListener("click", function (e){
			     window.location.href = '../spaceX/mapspesific.html?id=' + send
			    },true);
		}());
	}
	addlistners()

}
function populateSite(site){
	console.log(site)
	document.querySelector('.site-launches').innerHTML=""
		if (site[id].site_id === "kwajalein_atoll"){
			spesificFlight(KWAJALEIN)
		}
		else if (site[id].site_id === "vafb_slc_4e"){
			spesificFlight(VANDENBERG4E)
		}
		else if (site[id].site_id === "ccafs_slc_40"){
			spesificFlight(CAPE)
		}
		else if (site[id].site_id === "stls"){
			spesificFlight(TEXAS)
		}
		else if (site[id].site_id === "ksc_lc_39a"){
			spesificFlight(KENNEDY)
		}
		else if (site[id].site_id === "vafb_slc_3w"){
			spesificFlight(VANDENBERG3X)
		}
	var siteName = document.querySelector('.input-site-name')
	siteName.innerText = site[id].site_name_long
	siteName.style.color = "#FF8800"
	var siteStatus = document.querySelector('.site-status')
	var siteSuccess = document.querySelector('.site-successful-launches')
	var siteAttempted = document.querySelector('.site-attempted-launches')
	var siteLinks = document.querySelector('.site-links')
	var siteDetails = document.querySelector('.site-details')
	var siteId = document.querySelector('.site-id')
	if(site[id].status === "under construction"){
		document.querySelector('.site-status').style.paddingRight = '100px'
		document.querySelector('#map-site-container .item13').style.maxHeight = '800px'
	}
	siteStatus.innerText = site[id].status
	siteAttempted.innerText = site[id].attempted_launches
	siteSuccess.innerText = site[id].successful_launches
	siteLinks.href = site[id].wikipedia
	siteDetails.innerText = site[id].details
	siteId.innerText = site[id].site_id
	siteId.style.color = '#FF8800'
}
function spesificFlight(flight){
	var sortName;
	sortName = flight.slice().sort((a, b) => (a.mission_name > b.mission_name) ? 1 : -1)
	for (var i = (flight.length-1); i >= 0; i--) {
		var fname = flight[i].launch_date_utc.match(/([^T]+)/)
		document.querySelector('.site-launches').innerHTML+=
		"<li class="+(flight[i].flight_number-1)+">#"+ flight[i].flight_number + ' ' +flight[i].mission_name+' '+ '<span>('+ fname[0] + ')</span>'+"</li>"
	}
	document.querySelector('.site-launches').addEventListener('click', pressList, true);
}
function pressList(evt){
    	var match
    	console.log(evt)
    	if(evt.target.localName === 'li'){
    		match = parseInt(evt.srcElement.className)
    	}
    	if(evt.target.localName === 'span'){
    		match = parseInt(evt.target.parentNode.className)
    	}
		window.location.href = '../spaceX/previous.html?id=' + match
}
function initMap(lat, long) {
  map = new google.maps.Map(document.getElementById('sitemap'), {
    center: {lat: lat, lng: long},
    mapTypeId: 'satellite',
    zoom: 18,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#383938'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#F3D19C'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#845014'}]},
      {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [{visibility: "off"}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{visibility: "off"}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{visibility: "off"}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{visibility: "off"}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#A7ADB6'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{visibility: "off"}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#000000'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  });
}