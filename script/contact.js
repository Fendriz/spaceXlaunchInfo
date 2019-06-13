


var xx = window.matchMedia("(min-width: 1024px)");
var checkwidth = window.innerWidth

document.querySelector('.hamburger').addEventListener('click', hamburger, true);

if(checkwidth >= 1024){
  document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo2.svg'

}
else if (checkwidth < 1024){


  document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo.svg'
}

xx.addListener(function(){


  if(xx.matches === true){

    document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo2.svg'
  }
  else if (xx.matches === false){

    document.querySelector('.svg-SpaceX').src = 'svg/spacex-vector-logo.svg'
  }
})

function hamburger(evt){

  var links = document.querySelector('.links');
  if (links.className === "links") {
     links.className += " responsive";
   } else {
     links.className = "links";
   }
}

document.querySelector('#submitContact').addEventListener("click", function(evt){

	console.log('sdfsdf')

	var fname = /[\S]/.test(document.querySelector('#firstName').value);
	var lname = /[\S]/.test(document.querySelector('#lastName').value);
	var phone = /^\d{3}-\d{3}-\d{4}$/.test(document.querySelector('#phone').value);
	var phonex = /^\d{3}\.\d{3}\.\d{4}$/.test(document.querySelector('#phone').value);
	var phoney = /^\d{3}\s\d{3}\s\d{4}$/.test(document.querySelector('#phone').value);
	var email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(document.querySelector('#email').value);
	var text = /[\S]/.test(document.querySelector('#contact-texterea').value);


	(phone === true || phonex === true || phoney === true) 	? document.querySelector('#phoneError').style.display = 'none'
															: document.querySelector('#phoneError').style.display = 'block';

	(fname === true) 	? document.querySelector('#firstNameError').style.display = 'none'
						: document.querySelector('#firstNameError').style.display = 'block';

	(lname === true) 	? document.querySelector('#lastNameError').style.display = 'none'
						: document.querySelector('#lastNameError').style.display = 'block';

	(email === true) 	? document.querySelector('#emailError').style.display = 'none'
						: document.querySelector('#emailError').style.display = 'block';

	(text === true) 	? document.querySelector('#textError').style.display = 'none'
						: document.querySelector('#textError').style.display = 'block';

});