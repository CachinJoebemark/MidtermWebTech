//Google Maps API
function initMap() {
          //Map options
          var options = {
              zoom:8,
              center:{lat:16.364, lng:120.677}
          }
          //New map
        var map = new google.maps.Map(document.getElementById('map'), options);
      }

//Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
}
navigator.serviceWorker.register('/service-worker.js', {
  scope: '/app/'
});

var urlsToCache = [
  '/',
  './css/style.css',
  './sw.js',
  'manifest.json',
  'index.html'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['example'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//map Menu
var html_checks = {
        //required: called by Maplace.js to activate the current voice on menu
        activateCurrent: function(index) {
                this.html_element.find("input[value='" + index + "']").attr('checked', true);
        },
        //required: called by Maplace.js to get the html of the menu
        getHtml: function() {
                var self = this,
                        html = '';

                //if more than one location
                if(this.ln > 1) {
                        html += '<div class="checkbox controls ' + this.o.controls_cssclass + '">';

                        //check "view all" link
                        //use ShowOnMenu(index) to know if a location has to appear on menu
                        if(this.ShowOnMenu(this.view_all_key)) {
                                html += '<label><input type="radio" name="gmap" value="'
                                         + this.view_all_key + '"/>' + this.o.view_all_text + '</label>';
                        }

                        //iterate the locations
                        for (var a = 0; a < this.ln; a++) {
                                if(this.ShowOnMenu(a))
                                    html += '<label><input type="radio" name="gmap" value="' + (a+1) + '"/>'
                                             + (this.o.locations[a].title || ('#' + (a+1))) + '</label>';
                        }
                        html += '</div>';
                }

                this.html_element = $('<div class="wrap_controls"></div>').append(html);

                //event on change
                //use ViewOnMap(index) to trigger the marker on map
                this.html_element.find('input[type=radio]').bind('change', function() {
                        self.ViewOnMap(this.value);
                });

                return this.html_element;
        }
};

//add the new menu with the method AddControl(name, function)
maplace.AddControl('checks', html_checks);

//load the map
maplace.Load({
    controls_type: 'checks',
    locations: [{lat:16.364}, {lng:120.677}]
});

new Maplace({
    locations: Circles,
    map_div: '#gmap-circles',
    start: 4,
    view_all_text: 'Points of interest',
    type: 'circle',
    shared: {
        zoom: 16,
        html: '%index'
    },
    circleRadiusChanged: function(index, point, marker) {
        $('#radiusInfo').text(
            ' - point #' + (index+1) + ' size: ' + parseInt(marker.getRadius()) + 'mt.'
        );
    }
}).Load();

//cirlce Markers
var Circles = [
    {
        lat: 16.2525,
        lon: 120.6775,
        title: 'Draggable marker',
        circle_options: {
            radius: 30
        },
        stroke_options: {
            strokeColor: '#aaaa00',
            fillColor: '#eeee00'
        },
        draggable: true
    },
    {
        lat: 51.51420,
        lon: -0.09303,
        title: 'Draggable circle',
        circle_options: {
            radius: 50
        },
        stroke_options: {
            strokeColor: '#aa0000',
            fillColor: '#ee0000'
        },
        visible: false,
        draggable: true
    },
    {
        lat: 51.51498,
        lon: -0.09097,
        circle_options: {
            radius: 80
        },
        visible: false,
        draggable: true
    },
    {
        lat: 51.51328,
        lon: -0.09021,
        circle_options: {
            radius: 160,
            editable: true
        },
        title: 'Editable circle',
        html: 'Change my size',
        visible: false,
        draggable: true
    },
    {
        lat: 51.51211,
        lon: -0.09050,
        circle_options: {
            radius: 130
        },
        stroke_options: {
            strokeColor: '#00aa00',
            fillColor: '#00aa00'
        },
        visible: false
    },
    {
        lat: 51.51226,
        lon: -0.09435,
        circle_options: {
            radius: 100
        },
        draggable: true
    },
    {
        lat: 51.513,
        lon: -0.08410,
        type: 'marker',
        title: 'Simple marker',
        html: 'I\'m a simple marker.'
    }
];