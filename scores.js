//[STEP 0]: Make sure our document is A-OK
$(document).ready(function () {
    //what kind of interface we want at the start 
    const APIKEY = "620b7a2a34fd6215658585ce";
    getContacts();
    $("#update-contact-container").hide();
    $("#add-update-msg").hide();

    //[STEP 1]: Create our submit form listener
    $("#contact-submit").on("click", function (e) {
        //prevent default action of the button 
        e.preventDefault();

        //[STEP 2]: let's retrieve form data
        //for now we assume all information is valid
        //you are to do your own data validation
        let contactName = $("#contact-name").val();
        let contactGenre = $("#contact-genre").val();
        let contactPoints = $("#contact-points").val();

        //[STEP 3]: get form values when user clicks on send
        //Adapted from restdb api
        let jsondata = {
            "Name": contactName,
            "Genre": contactGenre,
            "Points": contactPoints
        };

        console.log(jsondata)
        //[STEP 4]: Create our AJAX settings. Take note of API key
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://guessthesong-78e1.restdb.io/rest/score",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }

        //[STEP 5]: Send our ajax request over to the DB and print response of the RESTDB storage to console.
        $.ajax(settings).done(function (response) {
            console.log(response);

            $("#contact-submit").prop("disabled", false);

            //@TODO update frontend UI 
            $("#add-update-points").show().fadeOut(3000);

            //update our table 
            getContacts();
        });
    });//end click 


    //[STEP] 6
    //let's create a function to allow you to retrieve all the information in your contacts
    //by default we only retrieve 10 results
    function getContacts(limit = 10, all = true) {
        //[STEP 7]: Create our AJAX settings
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://guessthesong-78e1.restdb.io/rest/score",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
        //[STEP 8]: Make our AJAX calls
        //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
        //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links 
        $.ajax(settings).done(function (response) {

            let content = "";

            for (var i = 0; i < response.length && i < limit; i++) {
                //console.log(response[i]);
                //[METHOD 1]
                //let's run our loop and slowly append content
                //we can use the normal string append += method
                /*
                content += "<tr><td>" + response[i].name + "</td>" +
                  "<td>" + response[i].email + "</td>" +
                  "<td>" + response[i].message + "</td>
                  "<td>Del</td><td>Update</td</tr>";
                */

                //[METHOD 2]
                //using our template literal method using backticks
                //take note that we can't use += for template literal strings
                //we use ${content} because -> content += content 
                //we want to add on previous content at the same time
                content = `${content}<tr id='${response[i]._id}'><td>${response[i].Name}</td>
          <td>${response[i].Genre}</td>
          <td>${response[i].Points}</td>
          <td><button type = "button" class='delete  btn text-primary' id = "deleteButton" data-id='${response[i]._id}'>Del</button></td><td><data-id='${response[i]._id}' data-points='${response[i].Points}' data-name='${response[i].Name}' data-genre='${response[i].Genre}'></td></tr>`;
            }

            //[STEP 9]: Update our HTML content
            //let's dump the content into our table body
            $("#points-list tbody").html(content);

            $("#total-contacts").html(response.length);
        });
    }
            //[STEP 10]: Deletion of content
            //by using the id, it will delete the content of that particular row
    $("#points-list").on("click", ".delete", function (e) {
        let id = $(this).data("id");
        deleteScore(id);
        setTimeout(function () {
            location.reload();
        }, 3000);
    })

    function deleteScore(id) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://guessthesong-78e1.restdb.io/rest/score/${id}`,
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "501f735f5167dff56f635db10af822378ee75",
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }


})