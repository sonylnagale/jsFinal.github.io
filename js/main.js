//Step 1:
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3lMDcH2BZtnyvwn5k2PZJN0o6u6OGj3o",
    authDomain: "reservation-site-e483e.firebaseapp.com",
    databaseURL: "https://reservation-site-e483e.firebaseio.com",
    projectId: "reservation-site-e483e",
    storageBucket: "reservation-site-e483e.appspot.com",
    messagingSenderId: "1026813792788"
  };
  firebase.initializeApp(config);


var database = firebase.database();

//Step 2: Create an empty Object Literal
reservationData ={

}

//Step 3: User Data

$('.reservation-day li').on('click', function(e){
  e.preventDefault(); 
  reservationData.day = $(this).text();
});

//Step 4:  Update the name property

$('.reservation-form').on('submit', function(e){
  e.preventDefault(); 
  reservationData.name = $('.reservation-name').val();
  console.log("completed step 4");
  // create a section for reservations data in your db
    var reservationDayData = database.ref('reservation-day');
    reservationDayData.push(reservationData);
});

function getReservations(){

  // use reference to database to listen for changes in reservations data
  database.ref('reservation-day').on('value', function(results){
   var allReservations = results.val();
  // remove all list reservations from DOM before appending list reservations
   $('.reservation-list').empty();
   // iterate (loop) through all reservations coming from database call
   for(var reservation in allReservations){
     // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };
      // Get the HTML from our Handlebars reservation template
      var source = $("#reservation-template").html();

      // Compile our Handlebars template
      var template = Handlebars.compile(source);

      // Pass the data for this reservation (context) into the template
      var reservationListItem = template(context);

      // Append newly created reservation to reservations list.
      $('.reservation-list').append(reservationListItem);
      console.log("reservations printed");
   }

  }); 
}
// When page loads, get reservations from database
getReservations();

//Step7 Define the callback used by the Google Maps API to initialize the app's map.
// var styles = [
//     {
//       {
//         stylers:[ { hue: '#9d9d9d'}, {saturation: -35} ]
//       }
//       {
//         featureType: "road"
//         elementType: 'geometry',
//         stylers:[ { lightness: '100'},{ visibility: 'simplified'} ]
//       }
//       {
//         featureType: "road"
//         elementType: 'lables',
//         stylers:[ { visibility: 'off'} ]
//       }
//     }
// ];

function initMap(){
   var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 13,
    scrollwheel: false
  });
   var coffeeCup = {
          path: '<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 408.27 674.8"><defs><style>.cls-1{fill:#42210b;}</style></defs><title>coffeeCup</title><polygon class="cls-1" points="295.85 674.8 60 674.8 0 624.91 345.85 624.91 295.85 674.8"/><path class="cls-1" d="M821.14,492.81c-15.67-14.18-36.64-21.93-58.32-21.85a453.5,453.5,0,0,0-11-55.73H459.35c-8.47,44-17.86,125,8.54,219.89a478.41,478.41,0,0,0,71.46,149.44H681.82A427.13,427.13,0,0,0,743.06,670c24.89-7.61,50.9-26.29,71-48.54C851.21,580.48,854.36,522.88,821.14,492.81Zm-37.46,123a99.67,99.67,0,0,1-31.13,23.31,429.09,429.09,0,0,0,12.83-144,56.88,56.88,0,0,1,24.2,12.89C817.4,533.25,814.77,581.51,783.68,615.85Z" transform="translate(-435.86 -174.6)"/><path class="cls-1" d="M595.77,174.6a89.08,89.08,0,0,1,11.38,12.17,65.37,65.37,0,0,1,8.57,15,52,52,0,0,1,1,36.22,70.47,70.47,0,0,1-8.33,16.42,141.58,141.58,0,0,1-10.73,13.75c-3.74,4.23-7.49,8.22-11.08,12.11s-7,7.67-10.05,11.46a53.4,53.4,0,0,0-7.22,11.47,33.75,33.75,0,0,0-2.9,10.88,45.23,45.23,0,0,0,.21,10.09,66.22,66.22,0,0,0,2.37,11c2.35,7.9,6.37,16.59,11.21,25.55,2.4,4.5,5,9.08,7.61,13.82.66,1.19,1.34,2.37,2,3.59s1.3,2.45,2,3.67c1.35,2.44,2.68,5,3.89,7.66L593.47,392a86.85,86.85,0,0,1-8.28-2.88c-2.71-1.07-5.27-2.38-7.87-3.66a103.6,103.6,0,0,1-14.74-9.36c-2.35-1.76-4.59-3.75-6.84-5.71-1.09-1-2.16-2.11-3.23-3.19s-2.15-2.15-3.13-3.36-2-2.37-3-3.57-1.87-2.55-2.8-3.84l-1.36-2-1.27-2.1-1.24-2.12-.62-1.07-.56-1.12a57.45,57.45,0,0,1-6.13-19.94,52.21,52.21,0,0,1,2.23-21.88l.89-2.6c.33-.85.7-1.68,1.05-2.51s.71-1.67,1.1-2.46l1.24-2.35a70.68,70.68,0,0,1,5.57-8.62,115,115,0,0,1,12.6-13.87c8.55-8.18,17.27-14.65,25.11-21.28a127.82,127.82,0,0,0,10.95-10.05,53.11,53.11,0,0,0,8.37-11A37.32,37.32,0,0,0,606,218.81a39.13,39.13,0,0,0,.52-7c-.09-1.17-.07-2.37-.23-3.56l-.19-1.8-.3-1.8a57.06,57.06,0,0,0-4.62-14.29c-1.09-2.34-2.29-4.65-3.61-6.92s-2.76-4.49-4.26-6.69Z" transform="translate(-435.86 -174.6)"/><path class="cls-1" d="M652.11,252a56.43,56.43,0,0,1,7.6,7.67,42.32,42.32,0,0,1,5.84,9.67,33.1,33.1,0,0,1,2.7,11.66,34.89,34.89,0,0,1-1.62,12.39,47.2,47.2,0,0,1-5.34,11,94.22,94.22,0,0,1-6.86,9.14c-4.74,5.58-9.53,10.5-13.19,15.31a29.16,29.16,0,0,0-4.15,7.14,17.81,17.81,0,0,0-1.25,6.29,35.82,35.82,0,0,0,.35,5.42,51.86,51.86,0,0,0,1.18,6.27,97,97,0,0,0,6,16.15l4.25,9.25c.75,1.6,1.45,3.28,2.19,5s1.46,3.45,2.1,5.34l-1.73,2.07a51.23,51.23,0,0,1-11.09-3.45,60.9,60.9,0,0,1-10.08-5.61c-1.61-1.09-3.15-2.34-4.69-3.58-.75-.66-1.49-1.34-2.22-2a30.48,30.48,0,0,1-2.15-2.16,49.25,49.25,0,0,1-7.5-10.42A37.6,37.6,0,0,1,608.25,351a35,35,0,0,1,1.65-15.06,42.92,42.92,0,0,1,6.93-12.57,78.41,78.41,0,0,1,8.55-9.1c5.7-5.29,11.39-9.35,16.45-13.43a83.89,83.89,0,0,0,7-6.11,33.23,33.23,0,0,0,5.37-6.57,22.57,22.57,0,0,0,3-7.6,23.77,23.77,0,0,0,.47-4.27,32,32,0,0,0-.29-4.46c-.84-6.06-3.67-12.21-7.35-17.95Z" transform="translate(-435.86 -174.6)"/></svg>',
          fillOpacity: 0.8,
          scale: 1,
          //strokeColor: 'gold',
          //strokeWeight: 14
        }; 
  var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    icon: coffeeCup,
    title: 'Monks Café'
  });
}

