
var map
var x = window.matchMedia("(min-width: 1601px)");
var xx = window.matchMedia("(min-width: 1024px)");
var checkwidth = window.innerWidth
fetch('https://api.spacexdata.com/v3/launchpads')

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
function populate (result) {

  var marker = []
  var markeroffset = [
  ['Kwajalein',30,0],
  ['Cape Canaveral',-20,18],
  ['Kennedy Space Center',-20,42],
  ['Vandenberg Complex 3W',190,42],
  ['Vandenberg Complex 4E',190,18],
  ['SpaceX South Texas',130,0],
  ]
  var markeroffsetCurrent
  initMap()
  for (var i = 0; i < result.length; i++) {
    (function (){
      var id = result[i].id
      var send = result[i].site_id
      var listid = "#launch-list-" + id
      if (id===1){
        markeroffsetCurrent = markeroffset[0]
      }
      else if (id===2){
        markeroffsetCurrent = markeroffset[1]
      }
      else if (id===4){
        markeroffsetCurrent = markeroffset[2]
      }
      else if (id===5){
        markeroffsetCurrent = markeroffset[3]
      }
      else if (id===6){
        markeroffsetCurrent = markeroffset[4]
      }
      else if (id===8){
        markeroffsetCurrent = markeroffset[5]
      }
      marker[i] = new MarkerWithLabel({
        icon: "images/icons/Launchpad.png",
        position: new google.maps.LatLng(result[i].location.latitude, result[i].location.longitude),
        map: map,
        labelContent: markeroffsetCurrent[0],
        labelAnchor: new google.maps.Point(markeroffsetCurrent[1], markeroffsetCurrent[2]),
        labelClass: "labelmap",
        labelInBackground: true
      });
      google.maps.event.addListener(marker[i], "click", function (e){
           window.location.href = '../spaceX/mapspesific.html?id=' + send
          },true);
      document.querySelector(listid).addEventListener("click", function (e){
           window.location.href = '../spaceX/mapspesific.html?id=' + send
          },true);
      }());
    }
    document.querySelector('.launch-list-button').addEventListener('click', toggle, true);
    document.querySelector('.hamburger').addEventListener('click', hamburger, true);

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
    map.setZoom(3)
  }
  else if (checkwidth < 1024){
    map.setZoom(1)
    document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo.svg'
  }
  xx.addListener(function(){
    var hide = document.querySelectorAll('.hideall')
    if(xx.matches === true){
      map.setZoom(3)
      for (var i = 0; i < hide.length; i++) {
        hide[i].style.display = 'block'
      }
      document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo2.svg'
    }
    else if (xx.matches === false){
      map.setZoom(1)

      for (var i = 0; i < hide.length; i++) {
        hide[i].style.display = 'none'
      }
      document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo.svg'
    }
  })
}

function addid(location){
  window.location.href = '/mapspesific.html?id=' + send
}
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

function initMap() {
  console.log('heisann')
  map = new google.maps.Map(document.getElementById('map'), {
    disableDefaultUI:true,
    center: {lat: 34.632093, lng: -120.610829},
    zoom: 3,
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