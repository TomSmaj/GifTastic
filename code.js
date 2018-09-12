$(document).ready(function(){
    animalArr = ["dog", "cat", "bird", "elephant", "giraffe", "lizard", "koala", "horse", "penguin"];

    function setUp(){
        for(i= 0; i < animalArr.length; i++){
            $(".buttons").append($(`<button type="button" class="btn btn-primary animalBtn">${animalArr[i]}</button>`));
        }
    }
    
    $(".searchButton").on("click", function(){
        let inp = $(".form-control").val();
        $(".form-control").val("");
        let found = false;
        for(i = 0; i < animalArr.length; i++){
            if(animalArr[i] === inp){
                found = true;
                break
            }
        }
        if(!found){
            animalArr.push(inp);
            $(".buttons").append($(`<button type="button" class="btn btn-primary animalBtn">${inp}</button>`));
        }
    });

    $(".form-control").keyup(function(event) {
        if (event.keyCode === 13) {
            $(".searchButton").click();
        }
    });
    
    $(document).on("click", ".animalBtn", function(){
        
        $(".gifs").text("");

        let URL = "https://api.giphy.com/v1/gifs/search?";
        let q = $(this).text();
        api_key = "7Fdf6cFducwUajLjHoNW7zbFKABmOTgs";
        let limit = 10;

        let queryURL = URL + "q=" + q + "&api_key=" + api_key + "&limit=" + limit;
        console.log(queryURL);

        $.get(queryURL).then( data => { 
            let json = JSON.stringify(data);


            for(i = 0; i < limit; i++){
                /*$(".gifs").append(`<div class="card" style="width: 18rem; border-style: none; margin: 0;">
                <img class="card-img-top" src="${data.data[i].images.fixed_height_still.url}" />
                <div class="card-body">
                  <h5 class="card-title">rating: ${data.data[i].rating}</h5>
                </div>
              </div>`);*/

                let div = $('<div>');
                div.attr("class", "gif-box");
                let img = $('<img>');
                let h = $('<h5>');
                img.attr("src", data.data[i].images.original_still.url);
                img.attr("still", data.data[i].images.original_still.url);
                img.attr("moving", data.data[i].images.original.url);
                h.html("Rating: <strong>" + data.data[i].rating + "</strong>");
                div.append(img);
                div.append(h);

                img.attr("clicked", "false");

                $(".gifs").append(div);

                img.on("click", function(){
                    console.log();
                    if($(this).attr("clicked") === "false"){
                        $(this).attr("src", $(this).attr("moving"));
                        $(this).attr("clicked", "true");
                    }
                    else if($(this).attr("clicked") === "true"){
                        $(this).attr("src", $(this).attr("still"));
                        $(this).attr("clicked", "false");
                    }
                })


            }
            
        })

    });



    setUp();
})