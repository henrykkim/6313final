/* async 아님!
function getval(callback){
  $.getJSON('https://rawgit.com/henrykkim/6313final/master/list.json', function(data) {
    callback(console.log(data));
  });
}
*/
var list;
$.ajax({
  async: false,
  dataType: 'json',
  url: "https://rawgit.com/henrykkim/6313final/master/list.json",
  type: "GET",
  success: function(data) {
    console.log(data);
    list = data["restaurant"];
    return list;
  }
});
console.log(list);
/*
var restaurantList =
  '[{"name": "9292 Korean BBQ", "filter": "Korean BBQ", "location": {"lat": 33.963723, "lng": -84.127196}}, {"name": "Han Shin Pocha USA", "filter": ["Casual Food", "Small Bites", "Karaoke"], "location": {"lat": 33.959576, "lng": -84.130336}}]';

list = JSON.parse(restaurantList);

console.log(list[0].location);

for (i = 0; i < list.length; i++) {
  console.log(list[i].location.lat, list[i].location.lng);
}
*/
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
        infowindow.open(map, marker);
      };
    })(marker, i));
  };
};
