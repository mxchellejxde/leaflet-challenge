const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform an API call to the US Geological Survey API to get the earthquake information. Call createMarkers when it completes.
d3.json(url).then(createMarkers);

// Create markers for the earthquakes
function createMarkers(response) {
    //pull earthquake information
    var data = response.features
    var coordinates = response.features.properties.mag;

    console.log(`createMarkers - data - ${data}`)
    console.log(`createMarkers - coordinates - ${coordinates}`)

    // Initialize an array to hold the earthquake markers
    var earthquakeMarkers = [];

    // Loop through the earthquakes array
    for (var index = 0; index < coordinates.length; index++) {
        var station = coordinates[index];
    
        // For each station, create a marker, and bind a popup with the station's name.
        var earthquakeMarker = L.marker([station.lat, station.lon])
          .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
    
        // Add the marker to the bikeMarkers array.
        earthquakeMarkers.push(earthquakeMarker);
      }
    
      // Create a layer group that's made from the earthquake markers array, and pass it to the createMap function.
      createMap(L.layerGroup(earthquakeMarkers));   

    
}

// Create map with the earthquake data
function createMap(earthquakeLocations) {
    // Create the tile layer that will be the background of our map.
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });


    // Create a baseMaps object to hold the streetmap layer.
    var baseMaps = {
    "Street Map": streetmap
    };

    // Create an overlayMaps object to hold the earthquakeLocations layer.
    var overlayMaps = {
    "Earthquakes": earthquakeLocations
    };

    // Create the map object with options.
    var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap, earthquakeLocations]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(map);
}