
//locations


var locations =[
      [ 'King Abdul Aziz Park', 24.62105, 46.77263, 5],
      [ 'King Abdullah Park', 24.6660, 46.7376, 4],
      [ 'King Salman Safari Park', 25.0054, 46.6020, 3],
      [ 'Rawdah Park', 24.7317, 46.7756, 2],
      [ 'Salam Park', 24.6213, 46.7083, 1]
];

//initMap
 var map;
 var infowindow;

function initMap() {
    'use strict';
    
    var riyadh = {lat: 24.774265, lng: 46.738586 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: riyadh
    });
    self.placeList = ko.obs
    infowindow = new google.maps.InfoWindow();
    
    
    //Markers
     //Source: http://en.marnoto.com/2013/12/mapa-com-varios-marcadores-google-maps.html
    var marker, i;
    
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2], locations[i][3], locations[i][4], locations[i][5]),
            map: map
        });
        
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
    
    
    //View Model
     
    function viewModel() {
        'use strict';
          //Source: Udacity lesson  
        function populateInfoWindow(marker, infowindow) {
            
            // Check to make sure the infowindow is not already open on this marker
            if (infowindow.marker !== marker) {
                infowindow.marker = marker;
                infowindow.setContent('<div>' + marker.title + '</div>');
                infowindow.open(map, marker);
                
                // Clear the .marker property if the infowindow is closed
                infowindow.addListener('closeclick', function () {
                    infowindow.marker = null;
                });
            }
        }
        
        
        locations.forEach(function (park, i) {
            position = park.location;
            name = park.name;
            marker = new google.maps.Marker({
                position: position,
                name: name,
                animation: google.maps.Animation.DROP,
                id: i
            });
                           
                 
     self.filterlist = ko.computed(function() {

        // Source: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html

    viewModel.filteredItems = ko.computed(function() {
    
      //filter the items using the filter text
    viewModel.filteredItems = ko.computed(function() {
    var filter = this.filter().toLowerCase();
    if (!filter) {
        return this.items();
    } else {
        return ko.utils.arrayFilter(this.items(), function(item) {
            return ko.utils.stringStartsWith(item.name().toLowerCase(), filter);
        });
    }
}, 
   viewModel);
      });
     });
         	markers.push(marker);

            // Create click event listener to open infowindow for each marker
            marker.addListener('click', function () {
                populateInfoWindow(this, largeInfowindow);
            });
        });
        
        // Extend the boundaries of the map for each marker and show it
        var bounds = new google.maps.LatLngBounds();
        markers.forEach(function (marker) {
            marker.setMap(map);
            bounds.extend(marker.position);
        });
        map.fitBounds(bounds);
    };
    

    // Google Map error
    function errorMap() {
        'use strict';
        window.alert("Sorry there has been an error in Google Map, Please try refreshing the page.");
    }
}