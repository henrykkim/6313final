var app = new Vue({
  el: '#info',
  data: {
    title: 'Hello Vue!'
  }
})

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

function addContent() {  
  document.getElementById("content").innerHTML = "test";
};

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
        document.getElementById("content").innerHTML = list[i].name;
      };
    })(marker, i));
  };
};