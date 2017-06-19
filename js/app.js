
//Locations
var locations =[ {
    title: 'King Salman Safari Park',
    position: {
        lat: 25.0054,
        lng: 46.6020
    },
    description: 'located at northwest side of King Khaled International Airport and about 22 km from Riyadh City. The park has been designed to have a small valleys and rocky formations, which resembles the Najd region, thus giving it a natural beauty and distinctiveness from other parks in the city.'
}, {
    title: ' King Abdullah Park',
    position: {
        lat: 24.6660,
        lng: 46.7376
    },
    description: 'The king Abdullah Park is a renowned park in Riyadh named in honour of the late and popular emperor of Saudhi Arabia, King Abdullah. The park was established in the year 2003 by Prince Turki Bin Abdul Aziz, the Deputy Governor of Riyadh.'
}, {
    title: ' Salam Park',
    position: {
        lat: 24.6213,
        lng: 46.7083
    },
    description: 'Salam Park represents one of the natural elements for Riyadh City Center in Qasr Al Hokm area (Rule Palace), heart of Riyadh and its historical and heritage center that witnessed the start of march to the foundation of the modern Saudi State.  '
}, {
    title: ' Riyadh National Zoo Park',
    position: {
        lat: 24.7117,
        lng: 46.7242
    },
    description: 'Riyadh National Zoo, in the heart of Malaz in Riyadh, is an easily accessible travel location for those visiting the city of Riyadh'
}, {
    title: 'Rawdah Park',
    position: {
        lat: 24.7317,
        lng: 46.7756
    },
    description: 'This park is one of favourites of the Expatriates as it is an Open Park for Kids to do cycling, play in the sand, Skate, Other outdoor Games and Family can sit, chat and enjoy.'
}, {
    title: ' King Abdul Aziz Historical Centre',
    position: {
        lat: 24.62105,
        lng: 46.77263
    },
    description: 'is the former compound of the Murabba Palace, that was built in 1936/37 by King Abdul Aziz about one and a half kilometers to the north of the old city and well outside of the then still existing city walls.'
}];
var infoWindow;
var markers =[];
var map;

//initMap
var InitMap = function () {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 24.774265,
            lng: 46.738586
        },
        zoom: 9,
        mapTypeId: 'roadmap'
    });
    
    infowindow = new google.maps.InfoWindow();
    
    //view model 
    var ViewModel = function () {
        'use strict';
        
        var self = this;
        self.markers =[];
        self.searchList = ko.observable('');
        self.filteredlist = ko.observableArray([]);
        self.locations = ko.observableArray([]);
        
        //create marker for each location and lsit view   
         var placeLoc = function (data) {
        var self = this;
        this.title = ko.observable(data.title);
        this.description = ko.observable(data.description);
        this.position = ko.observable(data.position);
        this.showlist = ko.observable(true);
    };
        locations.forEach(function (data) {
            self.filteredlist.push(new placeLoc(data));
        });
        // to knockout
        //Source: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
       
        this.filteredlist().forEach(function (placeLoc) {
            
            var marker = new google.maps.Marker({
                map: map,
                position: placeLoc.position(),
                animation: google.maps.Animation.DROP
            });
            //create infowindow
            placeLoc.marker = marker;
            infoWindow = new google.maps.InfoWindow();
                //check for opened windows
            if (infowindow.marker !== marker) {
                infowindow.marker = marker;
                marker.addListener('click', function () {
                    infoWindow.marker = marker;
                    //infowindow descripton
                    infoWindow.setContent('<h2>' + placeLoc.title() + '</h2>' +
                    '<h4>' + placeLoc.description() + '</h4>');
                    
                    infoWindow.open(map, marker);
                });
            }
        });
  
        //filter/search locations 
        self.locationsArray = ko.computed(function () {
            var search = self.searchList().toLowerCase();
            if (! search) {
                self.filteredlist().forEach(function (placeLoc) {
                });
            } else {
                self.filteredlist().forEach(function (placeLoc) {
                    
                    if (placeLoc.title().toLowerCase().indexOf(search) >= 0) {
                        placeLoc.showlist(true);
                    } else {
                        placeLoc.showlist(false);
                    }
                });
                return this.filteredlist();
            };
            
            
            //Foursquare API
            function FoursquareId(data) {
                var venueid = data.foursquareid;
                var foursquareId = 'https://api.foursquare.com/v2/venues/' + venueid + '?oauth_token=1K3HF3KW5HLOLXDC2NJQAZMBSVASUWMF0BTA5KF4WELFFGHE&v=20170603' + this.title;
                var result = data.response.venue;
                
                $.ajax({
                    url: foursquareId,
                    dataType: "json",
                    success: function (resp) {
                        console.log(resp);
                    }
                });
            };
        });
        
        //click the list-view to show the location
        this.openInfo = function (placeLoc) {
            google.maps.event.trigger(placeLoc.marker, 'click');
        };
    };
       
    //To apply bindings   
    ko.applyBindings(new ViewModel());
};

//Show/hide Nav / source:w3school
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
//Google Map Error
function googleError() {
    window.alert("I'm sorry there has been an error with Google Maps.");
}