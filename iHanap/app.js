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

//Dropdown button JS
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

//Service Worker
if (window.indexedDB) {
    var request = indexedDB.open("mapsDB", 1);
    
    request.onerror = function(e){
        console.log(e);
    }
    
    request.onsuccess = function(e) {
        console.log("success");
    }
}


//Trial marker
 var map;
  var markersArray=[];
   function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(11.6667,76.2667),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
  mapOptions);
 }

google.maps.event.addDomListener(window, 'load', initialize);
function pan() {
deleteOverlays();
    var panPoint = new google.maps.LatLng(document.getElementById("lat").value,     document.getElementById("lng").value);
    map.setCenter(panPoint)
    var marker = new google.maps.Marker({
            map: map,
            position: panPoint,
        });
        markersArray.push(marker);

 }

 function deleteOverlays() {
   if (markersArray) {
      for (i in markersArray) {
       markersArray[i].setMap(null);
      }
    markersArray.length = 0;
  }
 }

//Caching
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/css/bootstrap.css',
          '/css/main.css',
          '/js/bootstrap.min.js',
          '/js/jquery.min.js',
          '/offline.html'
        ]
      );
    })
  );
});

/*
//Add marker
        var marker = new google.maps.Marker({position:{lat:16.364, lng:120.677}, map:map
                                            });
          
        var infoWindow = new google.maps.InfoWindow({content:'<h1>Itogon, Benguet</h1>'
                                                    });
        
        maker.addListener('click', funtion(){
                          infoWindow.open(map,marker);
                          });
*/