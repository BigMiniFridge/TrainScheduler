// <!-- Javascripte -->

$(document).ready(function (){


  // Initialize Firebase 
  var config = {
    apiKey: "AIzaSyCNyJq0t_GptIvG_Zn7gdxYtVg5uXDDIbc",
    authDomain: "trainscheduler-db095.firebaseapp.com",
    databaseURL: "https://trainscheduler-db095.firebaseio.com",
    projectId: "trainscheduler-db095",
    storageBucket: "trainscheduler-db095.appspot.com",
    messagingSenderId: "41743044351"
  };

  firebase.initializeApp(config);

var database = firebase.database();

// Capture button click

$("#addTrain").on("click", function (event){
  event.preventDefault();

  // grab values from text boxes
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#firstTrain").val().trim();
  var freq = $("#interval").val().trim();

  // code to push data
database.ref().push({
  trainName: trainName,
  destination: destination,
  firstTrain: firstTrain,
  frequency: freq,
});

});

// Firebase watcher + loader
database.ref().on("child_added", function (childSnapshot){

  var newTrain = childSnapshot.val().trainName;
  var newLocation = childSnapshot.val().destination;
  var newFirstTrain = childSnapshot.val().firstTrain;
  var newFreq = childSnapshot.val().frequency;

  // First Time
  var startTimeConverted = moment(newFirstTrain, "hh.mm").subtract(1, "years");

  // Current Time
  var currentTime = moment();

  // Difference in Time
  var diffTime = moment().diff(moment(startTimeConverted), "minutes");

  // Time Apart
  var tRemainder = diffTime % newFreq;

  // Minutes until Train
 var tMinutesTillTrain = newFreq - tRemainder;

//  Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
var catchTrain  = moment(nextTrain).format("HH:mm");

// Display HTML
$("#all-display").append(
  '<tr><td>' +newTrain + 
      '</td><td>' + newLocation + 
          '</td><td>' + newFreq + 
              '</td><td>' + catchTrain + 
                  '</td><td>' + tMinutesTillTrain + '</tdr></tr>');

// Clear inputs
$("#trainName, #destination, #firstTrain, #interval").val("");
return false;
},

// Correct for Error 
function (errorObject) {
  console.log("Errors handled:" + errorObject.code);
});

});

