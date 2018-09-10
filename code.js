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
            
            console.log(data.data[0]);

            for(i = 0; i < limit; i++){
                $(".gifs").append(`<iframe src = "${data.data[i].embed_url}" />`);
            }

        })

    });



    setUp();
})