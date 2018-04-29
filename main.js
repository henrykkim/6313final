// Getting JSON from Github
var list;
$.ajax({
  async: false,
  dataType: 'json',
  url: "https://rawgit.com/henrykkim/6313final/master/list.json",
  type: "GET",
  success: function (data) {
    list = data["restaurant"];
    return list;
  }
});

// Google Maps
function initMap() {
  var uluru = {
    lat: 33.945208,
    lng: -84.247076
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: uluru
  });

  var marker, i;

  // For loop for the JSON list
  for (i = 0; i < list.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(list[i].location.lat, list[i].location.lng),
      map: map
    });

    // Creating multiple pins
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {

        // Template for each restaurant information
        document.getElementById("headerImage").innerHTML = '<img src=' + list[i].headerImage + ' class="img-fluid centered-and-cropped">';
        document.getElementById("writing").innerHTML =
          "<h1>" + list[i].name + "</h1>" +
          '<div class="row">' +
            '<div class="col-6 pt-3">' +
              "<h3>" + "Address" + "</h3>" +
              "<p>" + '<a href='+list[i].gmap+'>' + list[i].address[0] + '<br>' + list[i].address[1] + '</a>'+"</p>" +
            '</div>' +
            '<div class="col-6 pt-3">' +
              '<h3>Phone</h3>' +
              '<p>' + list[i].phone + '</p>' +
            '</div>' +
            '<div class="col-6 pt-3">' +
              '<h3>Price</h3>' +
              '<p>' + list[i].price + '</p>' +
            '</div>' +
          '</div>'+
          '<div class="row">' +
            '<div class="col pt-3">' +
            "<h3>" + "What I love about this place" + "</h3>" +
            '<p>' + list[i].info.why + '</p>' +
            '<h3 class="pt-3">' + "Food to Try" + "</h3>" +
            '<img src=' + list[i].info.dishImage + ' class="img-fluid pt-2">'+
            '<h3 class="pt-3">' + list[i].info.dishH + '</h3>' +
            '<p>' + list[i].info.dish + '</p>' +
            '<div class="pt-3 pb-5">'+
              '<a class="btn btn-danger btn-lg" href=' + list[i].info.yelp + ' role="button">Chek more at Yelp</a>'+
            '</div>'+
          '</div>'+
        '</div>';
      };
    })(marker, i));
  };
};