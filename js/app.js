// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var center = {
        lat: 47.6,
        lng: -122.3
    };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();

    var stations;
    var markers = [];

    $.getJSON('https://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            stations = data;
            data.forEach(function(camera) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(camera.location.latitude),
                        lng: Number(camera.location.longitude)
                    },
                    map: map
                });
                markers.push(marker);

                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<h3>' + camera.cameralabel + '</h3>';
                    html += '<img src=' + camera.imageurl.url + ' alt="camera image">';
                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                    map.panTo(marker.getPosition());
                });
            });
        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {
            $('#ajax-loader').fadeOut();
        })

});
//iterating over aray using for each
//check if string is contained in camera label -.indexOf()
//cases -  upper/lower coonvert to all lower case to compare
//adding corresponding marker, same index in station, have two different callback functions in the foreach, itemIndex
//setMap null for the coressponding marker
//setMap to have them all reappear
//keyUp search, jQuery - bind for search bar to filter as you are typing
//use geoCoding service, if at all possible, geocode ahead of time, and store in a database or another file
//tips: cameralabel for search filtering