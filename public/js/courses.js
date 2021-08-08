src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWCeNY_dm5Zigp44gdpZtYIftFPKrveTo&callback=initAutocomplete&libraries=places&v=weekly&channel=2"

function initAutocomplete() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 28.602, lng: -81.200 },
      zoom: 15,
      mapTypeId: "roadmap",
    });
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
   
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }

      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
      
      
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("bad location");
          return;
        }
        const icon = {
          url: place.icon,
          size: new google.maps.Size(75, 75),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
       
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
        if (place.geometry.viewport) {
        
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }