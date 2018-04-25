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

var y_id = "WavvLdfdP6g8aZTtbBQHTw";
$.ajax({
  async: true,
  crossDomain: true,
  url: "https://api.yelp.com/v3/businesses/" + y_id,
  method: "GET",
  headers: { "Authorization": "Bearer owtqvjlXtjhNUNdWS6G5KlF_lY2hUU4g-icS04trJ_ky8R0mHRRgZ1At9A0Tb2eTMn47p83jcHYc4v36uK7r1hKr7zyL7C1aLzg6G9JJVkNX02Ub5jPOnjrmaPrfWnYx" },
  success: function (result) {
    console.log(result);
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
        document.getElementById("writing").innerHTML = list[i].name;
      };
    })(marker, i));
  };
};