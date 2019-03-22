/* ================================
Week 7 Assignment: Midterm Functions + Signatures
================================ */

// STORY MAP INTENTION
// This slide show is to display the spatial relationship between high-growth
// companies clusters in Pennsylvania and the main airports/universities.

// SLIDE 1 shows the location points of Inc 5000 companies from 2009 - 2018 in
// PA with popups on which there are the name, city, industry and year (or years)
// it was on the list.

// SLDE 2 shows the result after filter the companies by most recent year on Inc5000
// All the filter are lists for user to choose (or simply input, depends on time
// spent). Data source: https://www.inc.com/inc5000/index.html

// SLIDE 3 shows the location points of airports in PA with popups on which there
// are name, city and 2018 year round flights volume. By a click, user can see
// the influence area (displayed as buffer, propotionally related to the volume).
// Data needs to be collected from Internet

// SLIDE 4 shows both the location points of companies and the buffer of airports.

// SLIDE 5 shows that the points inside the buffer polygons will have a differnet color from those
// outside the polygons (which is the same as plotted in slide 1), and the points
// of airports are replaced by the buffer. Three thresholds of radius can be chosen
// by users.


/* =====================
  Global Variables
===================== */
//var data;  // for holding data
var stringFilter = "";
var selectValue = 'All';

/* =====================
  Map Setup
===================== */

var mapOpts = {
  center: [41.203323, -77.194527],
  zoom: 8
};
var map = L.map('map', mapOpts);

var tileOpts = {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
};
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', tileOpts).addTo(map);

/* =====================
  Slide Model
===================== */
var currentSlide = 0;
// Define the stack
var slides = [
   {title: "Inc500 company",
    text: "show the high growth companies in pa",
    color:'#A7D3D4',
    url:'https://raw.githubusercontent.com/enjoyjubilee/Midterm_JavaScript_InteractiveMap/master/comp_map.geojson'},
   {title: "Companies in Pittsburgh and Philadelphia",
    text: "Company in Pittsburgh and Philadelphia",
    color:'#42B7B9',
    url:""},
   {title: "Aviation in PA",
    text: "public airports around Pennsylvania",
    color: '#F1F1F1',
    url:'https://raw.githubusercontent.com/enjoyjubilee/Midterm_JavaScript_InteractiveMap/master/airports_buffer6.geojson'},
   {title: "Aviation Buffer",
    text: "airports and its effect area",
    color:'#FFFFFF',
    url:""},
   {title: "Companies in the Buffer",
    text: "airports and its effect area",
    color: '#0000FF',
    url:""},
 ]


// Define the procedures in the recipe
 var addTitle = (title) => {
   $('.sidebar').append(`<h1 id='title'>${title}</h1>`)
 }

 var addText = (text) => {
   $('.sidebar').append(`<p id='text'>${text}</p>`)
 }

 var addFilter = (filter) => {
   $('.sidebar').append(`<p id='text'>${text}</p>`)
 }

 var setColor = (color) => {
   $('#map').css('background-color', color)
 }

 var cleanup = () => {
   $('#title').remove()
   $('#text').remove()
 }


var removeMarkers = function(data) {
_.each(data, (obj) => {return map.removeLayer(obj)});
};

var plotMarkers = function(data) {
  for (let i = 0; i< data.length; i++){
    data[i].addTo(map)}};

var addMap = (url) => {
   //   $(document).ready(function(obj){
  $.ajax(url).done(function(data){
    parseData(data);
    plotMarkers(markers)
    console.log("test 1")
  //.then(bindEvents())
 })
}


/* =====================
  Parse and store data for later use
===================== */
var parsedRes = [];
var cleanParsed = [];
var finalParsed = [];
var markers = [];
var parseData = function(res) {
// Parse the JSON returned (res)
  parsedRes = JSON.parse(res);

// parse data for plot geoJSON
  for(let i=0;i<parsedRes.features.length;i++){
    cleanOne = parsedRes.features[i];
    cleanParsed.push(cleanOne);
    console.log("1")
  }
// parse data for popups
  for(let i=0;i<cleanParsed.length;i++){
    propertyOne = cleanParsed[i].properties;
    finalParsed.push(propertyOne);
    console.log("2")
  }
// get the array of markers and popup
  for(let i=0;i<finalParsed.length;i++){
    markerOne = L.geoJSON(parsedRes).bindPopup(cleanParsed[i].CITY + "," + cleanParsed[i].NAME)
    markers.push(markerOne);
    console.log("3")

  return cleanParsed
  return finalParsed
  return markers
 }
}

/* =====================
  BindEvents
===================== */

// Build up the recipe
var buildSlide = (slideObject) => {
  cleanup(slideObject)
  addTitle(slideObject.title)
  addText(slideObject.text)
  setColor(slideObject.color)
  addMap(slideObject.url)
}

// "Cook" pages
buildSlide(slides[currentSlide])

// "Cook" the next page by clicking "next"
$("#next").click(() => {
  currentSlide = currentSlide + 1;
  removeMarkers(markers);
  buildSlide(slides[currentSlide]);
})

// "Cook" the previous page by clicking "previous"
$("#previous").click(() => {
  currentSlide = currentSlide - 1;
  removeMarkers(markers);
  buildSlide(slides[currentSlide]);
})
