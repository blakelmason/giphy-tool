//default topics array
var topicsArray = ['geralt', 'world of warcraft', 'waves', 'overwatch', 'terraria', 'beach', 'lord of the rings'];


//create default topics buttons
$(document).ready(function () {
    for (var i = 0; i < topicsArray.length; i++) {
        newTopicButton(topicsArray[i], i);
    }
});


//topic button color picker
var colors = ['#FF3C38', '#FF8C42', '#FFF275', '#85d68b', '#9DD9D2', '#6699CC', '#A87AAD'];
var currentColorIndex = 0;



//// CLICK EVENTS ////


//add button click event
$(document.body).on('click', '#add-button', function () {
    var $topicInput = $('#topic-input');
    var $topicInputValue = $topicInput.val();

    if (topicsArray.includes($topicInputValue)) {
        var indexNumber = topicsArray.indexOf($topicInputValue)
        var cssSelectorID = '#button' + indexNumber;
        $(cssSelectorID).css('position', 'relative');
        if ($(cssSelectorID).css('animation') === 'rainbowAnimation2 1s ease 0s 1 normal none running') {
            $(cssSelectorID).css('animation', 'rainbowAnimation1 1s ease 0s 1 normal none running');
        } else {
            $(cssSelectorID).css('animation', 'rainbowAnimation2 1s ease 0s 1 normal none running');
        }
        console.log($(cssSelectorID).css('animation'))
        console.log($(cssSelectorID).css('position'))

    } else if ($topicInputValue === '') {
        return false;

    } else {
        var indexNumber = topicsArray.length;
        topicsArray.push($topicInputValue);
        newTopicButton($topicInputValue, indexNumber);
    }
    $topicInput.val('');
});


//topic button click event - get request and show gifs
$(document.body).on('click', '.topics-button', function () {
    $('#gifs-row').remove();
    getRequest($(this).text());
});


//gif stop/start on click
$(document.body).on('click', 'img.gif', function () {
    var state = $(this).attr('data-state');

    if (state === 'still') {
        $(this).attr('data-state', 'play');
        $(this).attr('src', $(this).attr('data-play'));
        $(this).css('filter', 'opacity(30%)');
        $(this).one('load', function () {
            $(this).css('filter', 'opacity(100%)');
        })
    } else {
        $(this).attr('data-state', 'still');
        $(this).attr('src', $(this).attr('data-still'));
    }
});



//// FUNCTIONS ////


//new topic button
function newTopicButton(topic, arrayPosition) {
    $('#topics-card-body').append('<button type="button" class="topics-button btn btn-dark m-1" id="button' + arrayPosition + '">' + topic + '</button>');
    $('#button' + arrayPosition).css({
        'background-color': colors[currentColorIndex],
        'color': '#333333'
    });

    if (currentColorIndex === colors.length - 1) {
        currentColorIndex = 0;

    } else {
        currentColorIndex++;
    }
}


//get request for topic button click and show gifs
function getRequest(topic) {
    var apiURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=hJ1Tg3pGRPs5TknZiwUcGXTCYOtXtajX&limit=12&rating=g&lang=en'

    axios.get(apiURL)
        .then(function (response) {
            var $topicsRow = $('#topics-row');
            $topicsRow.after('<div class="row mw-100 m-0" id="gifs-row"></div>')
            var $gifsRow = $('#gifs-row')
            console.log(response);

            for (var i = 0; i < 12; i++) {
                var gifStill = response.data.data[i].images.original_still.url;
                var gifPlay = response.data.data[i].images.downsized_large.url;
                $gifsRow.append('<div class="col-12 col-sm-6 col-lg-4 col-xl-3 my-3 gif"><img src="' + gifStill + '" alt="" class="gif" id="gif' + i + '" data-state="still" data-still="' + gifStill + '" data-play="' + gifPlay + '"></div>');

                var $gif = $('#gif' + i);
                $gif.css({
                    'width': '100%',
                    'border-radius': '1rem'
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}


/*

//global variables
var $topicsRow = $('#topics-row');


//default topics array
var topicsArray = ['geralt', 'world of warcraft', 'waves', 'overwatch', 'terraria', 'beach', 'lord of the rings'];





//create default topics buttons
$(document).ready(function () {
    for (var i = 0; i < topicsArray.length; i++) {
        createTopicsButton(topicsArray[i], i);
    }
});


//create new topic button function
function createTopicsButton(topic, arrayPosition) {
    $('#topics-card-body').append('<button type="button" class="topics-button btn btn-dark m-1" id="button' + arrayPosition + '">' + topic + '</button>');
    $('#button' + arrayPosition).css({
        'background-color': colors[currentColorIndex],
        'color': '#333333'
    });
    if (currentColorIndex === colors.length - 1) {
        currentColorIndex = 0;
    } else {
        currentColorIndex++;
    }
}


//add button click event
var $addButton = $('#add-button');
$addButton.click(function (event) {
    //check if topic already exists
    var $topicInput = $('#topic-input')
    var doesTopicExist = false;
    var indexNumber = 0;
    for (i = 0; i < topicsArray.length; i++) {
        if (topicsArray[i] === $topicInput.val()) {
            doesTopicExist = true;
            indexNumber = i;
        }
    }


    //input is empty
    if ($topicInput.val() === '') {
        return false;

        //topic exists
    } else if (doesTopicExist === true) {
        var cssSelectorID = '#button' + indexNumber;

        //animation for old button
        $(cssSelectorID).css('position', 'relative');
        if ($(cssSelectorID).css('animation') === 'rainbowAnimation2 1s ease 0s 1 normal none running') {
            $(cssSelectorID).css('animation', 'rainbowAnimation1 1s ease 0s 1 normal none running');
        } else {
            $(cssSelectorID).css('animation', 'rainbowAnimation2 1s ease 0s 1 normal none running');
        }

        console.log($(cssSelectorID).css('animation'))
        console.log($(cssSelectorID).css('position'))


        //new topic
    } else {
        var indexNumber = topicsArray.length;
        topicString = String($topicInput.val());
        topicsArray.push(topicString);
        createTopicsButton(topicString, indexNumber);
    }
    $topicInput.val('');
});


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
        $gifsRow.append('<div class="col-12 col-sm-6 col-lg-4 col-xl-3 my-3 gif"><img src="' + gifStill + '" alt="" class="gif" id="gif' + i + '"></div>');
        var $gif = $('#gif' + i);
        $gif.css({
            'width': '100%',
            'border-radius': '1rem'
        })
    }
}


//Gif state change
$(document.body).on('click', '.gif', function () {
    var gifID = $(this).attr('id');
    console.log(gifID);
});


//topic button click event
$(document.body).on('click', '.topics-button', function () {
    console.log('yaaaa')
    console.log(this.text())
    createGetRequest();
});
*/