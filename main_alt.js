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

  for (i = 0; i < list.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(list[i].location.lat, list[i].location.lng),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {

        document.getElementById("headerImage").innerHTML = '<img src=' + list[i].headerImage + '>';
        document.getElementById("writing").innerHTML =
          "<h1>" + list[i].name + "</h1>" +
          '<div class="row">' +
          '<div class="col-6 pt-3">' +
          "<h3>" + "Address" + "</h3>" +
          "<p>" + list[i].address[0] + '<br>' + list[i].address[1] + "</p>" +
          '</div>' +
          '<div class="col-6 pt-3">' +
          '<h3>Phone</h3>' +
          '<p>' + list[i].phone + '</p>' +
          '</div>' +
          '<div class="col-6 pt-3">' +
          '<h3>Price</h3>' +
          '<p>' + list[i].price + '</p>' +
          '</div>' +
          '</div>';
      };
    })(marker, i));
  };
};