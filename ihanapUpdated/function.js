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

function initMap(){
          // Map options
            var options = {
            zoom: 14,
            center:{lat:16.4023332,lng: 120.59600709999995}
          }

	var map = new google.maps.Map(document.getElementById('map'), options);
          
    /*      var markers = [
            {
              coordinates:{lat:16.2525, lng:120.6775}1,
              content:'<h1>Ampucao</h1>'
            },
            {
              coordinates:{lat:16.2835, lng:120.7465},
              content:'<h1>Dalupirip</h1>'
            },
            {
              coordinates:{lat:16.3884, lng:120.6488},
              content:'<h1>Gumatdang</h1>'
            },
            {
              coordinates:{lat:16.4416, lng:120.6775},
              content:'<h1>Loacan</h1>'
            },
            {
              coordinates:{lat:16.3705, lng:120.6948},
              content:'<h1>Poblacion</h1>'
            },
            {
              coordinates:{lat:16.3885, lng:120.7465},
              content:'<h1>Tinongdan,</h1>'
            },
            {
              coordinates:{lat:16.4199, lng:120.6488},
              content: '<h1>Tuding</h1>'
            },
              { 
               coordinates:{lat:16.3952, lng:120.6718},
               content: '<h1>Ucab</h1>'
            },
            { 
              coordinates:{lat:16.3654, lng:120.6531},
              content: '<h1>Virac</h1>' 
            }
        ];
    for(var i = 0;i < markers.length;i++){
            addMarker(markers[i]);
    }
    function addMarker(props){
      var marker = new google.maps.Marker({
              position:props.coordinates,
              map:map,
            });
             if(props.iconImage){
              marker.setIcon(props.iconImage);
            }
            if(props.content){
              var infoWindow = new google.maps.InfoWindow({
                content:props.content
              });
              marker.addListener('click', function(){
                infoWindow.open(map, marker);
              });
            }
          }
}
*/
