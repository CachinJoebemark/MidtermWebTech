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