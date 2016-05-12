// Store locator with customisations
// - custom marker
// - custom info window (using Info Bubble)
// - custom info window content (+ store hours)
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>

var ICON = new google.maps.MarkerImage('Behr.png', null, null,
    new google.maps.Point(15, 33));




var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 document.querySelector('article').appendChild(map-canvas);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success);
} else {
  error('Geo Location is not supported');
}





google.maps.event.addDomListener(window, 'load', function() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: cords,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var panelDiv = document.getElementById('panel');

  var data = new MedicareDataSource;

  var view = new storeLocator.View(map, data, {
    geolocation: false,
    features: data.getFeatures()
  });

  view.createMarker = function(store) {
    var markerOptions = {
      position: store.getLocation(),
      icon: ICON,
      title: store.getDetails().title
    };
    return new google.maps.Marker(markerOptions);
  }

  var infoBubble = new InfoBubble;
  view.getInfoWindow = function(store) {
    if (!store) {
      return infoBubble;
    }

    var details = store.getDetails();

    var html = ['<div class="store"><div class="title">', details.title,
      '</div><div class="address">', details.address, '</div>',
      '<div class="hours misc">', details.hours, '</div></div>'].join('');

    infoBubble.setContent($(html)[0]);
    return infoBubble;
  };

  new storeLocator.Panel(panelDiv, {
    view: view
  });
});
