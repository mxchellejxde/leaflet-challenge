const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform an API call to the US Geological Survey API to get the earthquake information. Call createMarkers when it completes.
d3.json(url).then(createMarkers);

// Create markers for the earthquakes
function createMarkers(response) {
    //pull earthquake information
    var data = response.features
    // var coordinates = response.features.properties.mag;

    console.log(`createMarkers - data - ${data}`)
    // console.log(`createMarkers - coordinates - ${coordinates}`)

    // Initialize an array to hold the earthquake markers
    var earthquakeMarkers = [];

    // Loop through the earthquakes array
    for (var index = 0; index < data.length; index++) {
        var coordinates = data[index].geometry.coordinates;
        var magnitude = data[index].properties.mag;
        var place = data[index].properties.place;
        var time = data[index].properties.time;

        console.log(coordinates[0],coordinates[1])
        // For each station, create a marker, and bind a popup with the station's name.
        var earthquakeMarker = L.marker([coordinates[1], coordinates[0]])
          .bindPopup("<h3>Coordinates [" + coordinates[1]+","+coordinates[0]+ "]<h3><h3>Magnitude: " + magnitude + "</h3>");
    
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
    var map = L.map("map", {
        center: [40.73, -100.0059],
        zoom: 4,
        layers: [streetmap, earthquakeLocations]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    // Create a legend to display information about our map.
    var info = L.control({
        position: "bottomright"
     });
    
    document.querySelector(".legend").innerHTML = [
        "<p class='out-of-order'>Out of Order Stations: " + "XX" + "</p>",
        "<p class='coming-soon'>Stations Coming Soon: " + "XX" + "</p>",
        "<p class='empty'>Empty Stations: " + "XX" + "</p>",
        "<p class='low'>Low Stations: " + "XX" + "</p>",
        "<p class='healthy'>Healthy Stations: " + "XX" + "</p>"
      ].join(""); 
    // Add the info legend to the map.
    info.addTo(map);

    
}