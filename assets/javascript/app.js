$(document).ready(function () {

    //global variables
    var $topicsRow = $('#topics-row');

    //default topics array
    var topicsArray = ['witcher', 'world of warcraft', 'waves', 'overwatch', 'terraria', 'beach', 'lord of the rings'];


    //topic button color picker
    var colors = ['#FF3C38', '#FF8C42', '#FFF275', '#A5D0A8', '#9DD9D2', '#6699CC', '#A87AAD'];
    var currentColorIndex = 0;


    //create default topic buttons
    topicsArray.forEach(function (topic) {
        createTopicsButton(topic);
    })


    //add button click event
    var $addButton = $('#add-button');
    $addButton.click(function () {
        var $topicInputValue = $('#topic-input').val();
        if ($topicInputValue === '') {
            return false;
        } else {
            console.log($topicInputValue);
            createTopicsButton($topicInputValue);
        }
    });


    //create new topic button function
    function createTopicsButton(topic) {

        //remove spaces from topic string
        var topicNoSpaces = topic.replace(/\s/g, '-');


        //create topic button
        $('#topics-card-body').append('<button type="button" class="btn btn-dark m-1 topics-button" id="' + topicNoSpaces + '">' + topic + '</button>');
        $('#' + topicNoSpaces).css({
            'background-color': colors[currentColorIndex],
            'color': '#333333'
        });
        if (currentColorIndex === colors.length - 1) {
            currentColorIndex = 0;
        } else {
            currentColorIndex++;
        }


        //topic button click event
        $('#' + topicNoSpaces).click(function () {
            $topicsRow.nextAll().remove();
            createGetRequest(topic);
        })
    }


    //get request for topic button click
    function createGetRequest(topic) {
        var apiURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=hJ1Tg3pGRPs5TknZiwUcGXTCYOtXtajX&limit=12&rating=g&lang=en'
        axios.get(apiURL)
            .then(function (response) {
                console.log(response);
                createGifs(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    //create gif images on page
    function createGifs(response) {
        
        //create gifs rows
        $topicsRow.after('<div class="row mw-100 m-0" id="gifs-row"></div>')
        var $gifsRow = $('#gifs-row')


        //append gif images
        for (var i = 0; i < 12; i++) {
            var gifStill = response.data.data[i].images.original_still.url;
            var gifPlay = response.data.data[i].images.original.url;
            $gifsRow.append('<div class="col-12 col-sm-6 col-lg-4 col-xl-3 my-3"><img src="' + gifStill + '" alt="" id="gif"></div>');
        }
    }

})