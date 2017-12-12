
function createCallBack(i){
  return function (){
    window.prompt("blah", "blah");
  }
};


$.getJSON("/all", function(data){

  console.log(data);
  for (var i = 0; i < data.length; i++) {

    $("#articles").append("<li><ul>" + data[i].title + "</ul>" +
                          "<ul>" + data[i].summary + "</ul>" +
                          "<ul><a href=" + data[i].URL + ">Article</a></ul></li>" +
                          "<button class='comment' id='comment'>Comment</button>");

    for (var x = 0; x < data.length; x++) {
      $("#comment" + x).click(createCallBack(x));
    }

   
  };


});






// $(document).ready(function() {
 
//  $("#comment").on("click", function (event) {

//       event.preventDefault();

//       window.prompt("Write a Comment", "Enter Text Here");
//       return;
//   });

// });






