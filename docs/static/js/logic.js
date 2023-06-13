// let newYorkCoords = [40.73, -74.0059];
// let mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {
  
  // Create the tile layer that will be the background of our map.
  let lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 18
  });
  
  // Create a baseMaps object to hold the lightmap layer.
  let baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    "Bike Stations": bikeStations
  };
   
  // Create the map object with options.
  let myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, bikeStations]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

// Create the createMarkers function.
function createMarkers(response) {
  // Pull the "stations" property from response.data.
  let stations = response.data.stations;

  // Initialize an array to hold the bike markers.
  let bikeMarkers = [];

  // Loop through the stations array.
  for (let i = 0; i < stations.length; i++) {
  
    // For each station, create a marker, and bind a popup with the station's name.
    let bikeMarker = L.marker([stations[i].lat, stations[i].lon])
      .bindPopup("<h3>" + stations[i].name + "<h3><h3>Capacity: " + stations[i].capacity + "<h3>");
  
    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(bikeMarker);
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkers));
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);

// q: What's wrong with the code?
// a: The createMap function is called before the createMarkers function is called. The createMap function needs the bikeMarkers array to be populated before it can create the map.
// q: How can we fix it?
// a: We can pass the bikeMarkers array to the createMap function.

// We created 2 functions: createMap and createMarkers.
// createMap creates the map and takes in the bikeStations layer as an argument.
// createMarkers creates the markers and takes in the response from the API call as an argument.
// We call the createMarkers function inside the API call, and pass in the response as an argument.


