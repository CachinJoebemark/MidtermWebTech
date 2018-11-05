
      
      var map, infoWindow;
      function initMap(){
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
            var options = {
            zoom:6,
            center:{lat:12.8797,lng:121.7740}
          }

          /*directionsDisplay.setMap(map);

          var onChangeHandler = function() {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
          };

          document.getElementById('end').addEventListener('change', onChangeHandler);
        }*/

      
          // New map
          var map = new google.maps.Map(document.getElementById('map'), options);
          evacName = new Array();
          latitude = new Array();
          longitude = new Array();
          population = new Array();
          capacity = new Array();

          var result = idb.select("evactuation", [1, 2, 3, 4], function (isSelected, responseData) {
            
                if (isSelected) {
                    for(i = 0; i < responseData.length; i++){
                      evacName[i] = (responseData[i].title);
                      population[i] = (responseData[i].population);
                      capacity[i] = (responseData[i].capacity);
                      latitude[i] = parseFloat (responseData[i].lat);
                      longitude[i] = parseFloat (responseData[i].lang);
                    } 

                  var markers = [];
                  for(i = 0; i < latitude.length; i++) {
                    markers[i] = {coords:{lat:latitude[i],lng:longitude[i]}, content:'<h1>' + evacName[i] + '</h1></br><h3>Population: ' + population[i]+ '</h3></br><h3>Capacity: ' + capacity[1] + '</h3>'};
                  }
                  
                  for(var i = 0;i < markers.length;i++){
                    // Add marker
                    addMarker(markers[i]);
                  }

                  function addMarker(props){
                    var marker = new google.maps.Marker({
                      position:props.coords,
                      map:map,
                      //icon:props.iconImage
                    });

                    if(props.content){
                      var infoWindow = new google.maps.InfoWindow({
                        content:props.content
                      });

                      marker.addListener('click', function(){
                        infoWindow.open(map, marker);
                      });
                    }
                  }
                  } else {
                        console.log("Error: " + responseText);
                      }
          });

          infoWindow = new google.maps.InfoWindow;
          var pos
          // get user location
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                  pos = {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                        };

              infoWindow.setPosition(pos);
              infoWindow.setContent('Your location.');
              infoWindow.open(map);
              map.setCenter(pos);
          }, function() {
                        handleLocationError(true, infoWindow, map.getCenter());
             });
          }
           else {
                   handleLocationError(false, infoWindow, map.getCenter());
           }

           function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            directionsService.route({
              origin: pos,
              destination: document.getElementById('end').value,
              travelMode: 'DRIVING'
            }, function(response, status) {
              if (status === 'OK') {
                directionsDisplay.setDirections(response);
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            });
          }

      }
