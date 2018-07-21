
//Google Map 


$(document).ready(function(){


    $("#my_name").click(function(){
        $(this).hide();
    });
 var terms = ["Back End  Developer", "Programmer", "Front End Developer","FreeLancer"]; //array of terms to rotate

 function myMap() {
   // The location of Uluru
  var uluru = {lat: 28.660776, lng: 77.282815};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 16, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}

 function rotateTerm() {
    var ct = $("#rotate").data("term") || 0;
   $("#rotate").data("term", ct == terms.length -1 ? 0 : ct + 1).text(terms[ct]).fadeIn().delay(2000).fadeOut(200, rotateTerm);
 }
function particelLoad(){
particlesJS.load('particles-js', 'particle.json', function() {
    console.log('callback - particles.js config loaded');
})
}

$(particelLoad);
$(myMap);
$(rotateTerm); 

});