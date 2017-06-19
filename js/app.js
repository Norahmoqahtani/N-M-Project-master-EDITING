
//locations
'use strict';
var locations =[ 
[ 'King Abdul Aziz Park', 24.62105, 46.77263, 5],
[ 'King Abdullah Park', 24.6660, 46.7376, 4],
[ 'King Salman Safari Park', 25.0054, 46.6020, 3],
[ 'Rawdah Park', 24.7317, 46.7756, 2],
[ 'Salam Park', 24.6213, 46.7083, 1],
[ 'Riyadh Hills Park', 24.550297, 46.724340, 0]
];

var map;
var marker;
var infowindow;

 //initMap
function InitMap() {
    'use strict';
    
    var riyadh = {
        lat: 24.774265, lng: 46.738586
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: riyadh,
        mapTypeId: 'roadmap'
    });
    
    self.map = InitMap;
    
    infowindow = new google.maps.InfoWindow();
    
    
    //Mrkers
    var markerLocation = function (data) {
        
        var self = this;
        this.name = data.name;
        this.lat = data.lat;
        this.lng = data.lng;
        
        var marker = new google.maps.Marker({
            map: map,
            name: name,
            animation: google.maps.Animation.DROP
        });
        
        locations.forEach(function (markerLocation, i) {
            position = markerLocation.locations;
            name = markerLocation.name;
            id: i
        });
    }
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
    
    function ViewModel() {
        'use strict';
        var self = this;
        self.markers =[];
        self.locations =[];
        self.searchList = ko.observable("");
        self.placesList = ko.observableArray([]);
        
        
        //Source: Udacity lesson
        function populateInfoWindow(marker, infowindow) {
            
            // Check to make sure the infowindow is not already open on this marker
            if (infowindow.marker !== marker) {
                infowindow.marker = marker;
                infowindow.setContent('<div>' + marker.name + '</div>');
                infowindow.open(map, marker);
                
                // Clear the .marker property if the infowindow is closed
                infowindow.addListener('closeclick', function () {
                    infowindow.marker = null;
                });
            }
        }
     ko.applyBindings(ViewModel);

    }
    
    // Google Map error
    mapError = function () {
        document.getElementById('map-error').innerHTML = "<h2>Google Maps is not loading. Please try refreshing the page later.</h2>";
    };


///////////////////////////////////////////
// to knockout
//Source: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
locations.forEach(function (position) {
    self.placesList.push(new markerLocation(position));
});
self.locationsArray = ko.computed(function () {
    var filteredList = self.searchList().toLowerCase();
    if (filteredList) {
        return ko.utils.arrayFilter(this.placesList(), function (position) {
            var name = position.name.toLowerCase();
            var result = (name.search(filteredList) >= 0);
            position.observable(result);
            return result;
        });
    } else {
        this.placesList().forEach(function (position) {
            position.observable(true);
        });
        return this.placesList();
    }
},
self);

//Foursquare API
function FoursquareId(data) {
    var venueid = data.foursquareid;
    var foursquareId = 'https://api.foursquare.com/v2/venues/' + venueid + '?oauth_token=1K3HF3KW5HLOLXDC2NJQAZMBSVASUWMF0BTA5KF4WELFFGHE&v=20170603' + this.name;
    var result = data.response.venue;
    
    $.ajax({
        url: foursquareId,
        success: function (info) {
            infowindow.setContent(info);
            infowindow.open(map, marker);
        }
    });
}
}
//Menu bar Source: W3School
//  click event listener to open infowindow for each marker
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}