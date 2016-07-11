import $ from 'jquery';
import jQuery from 'jquery';
import get from './get-content';
import flickr from './api/flickr';
import pullData from './api/pull';
import insertData from './api/insert';
import switchTo from './switch-slide';

var fancyMenuData = 'https://json-data.herokuapp.com/restaurant/menu/1',
    newsData = 'https://json-data.herokuapp.com/restaurant/news/1',
    pubMenuData = 'https://json-data.herokuapp.com/restaurant/menu/3',
    specialData = 'https://json-data.herokuapp.com/restaurant/special/1';
var mainContent = [];

function insert(data){
    insertData(mainContent, data);
}

function numbersOnly(){
    let input = this;
    setTimeout(function(){
        input.value = input.value.replace(/[^\d]/, '');
    }, 1);
}

function populate(flickrPhotos){
    var container = $('.location8Box');
    var Photos = flickrPhotos.photos.photo.splice(1, 3);
    Photos.forEach(function(photo){
        container.append(`
            <div class="photoBox">
                <img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">
            </div>`);
    });
}

function startPull(){
    if (!mainContent['story'] || !mainContent['menu'] || !mainContent['reservations'] || !mainContent['games']) return;
    Promise.all(pullData(specialData, fancyMenuData, newsData, pubMenuData)).then(insert);
    // pullData(specialData, fancyMenuData, newsData, pubMenuData)
    //     .forEach(function(request){
    //         request.then(insert);
    //     });
}

function storeData(location, data){
    mainContent[location] = $(data);
    startPull();
}

get('our-story').then(function(data){ switchTo(data); storeData('story', data); });
get('menu').then(function(data){ storeData('menu', data); });
get('reservations').then(function(data){ storeData('reservations', data); });
get('games').then(function(data){ storeData('games', data); });

flickr('beer').then(populate);
flickr('bar food').then(populate);
flickr('sea scallops dish').then(function(data){
    var photo = data.photos.photo[1];
    $('.specialsImgBox').html(`
        <img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">`);
});

// $( "#datepicker" ).datepicker();

$(document)
    .delegate('.storyTab', 'mouseenter', function(){ switchTo(mainContent['story']); })
    .delegate('.menuTab', 'mouseenter', function(){ switchTo(mainContent['menu']); })
    .delegate('.resTab', 'mouseenter', function(){ switchTo(mainContent['reservations']); })
    .delegate('.gamesTab', 'mouseenter', function(){ switchTo(mainContent['games']); })
    .delegate('#guestInput', 'keydown',  numbersOnly);

insertData();



// pop up box
// var e = document.getElementById('exclamation');
// e.onmouseover = function() {
//   document.getElementById('exPopup').style.display = 'block';
// }
// e.onmouseout = function() {
//   document.getElementById('exPopup').style.display = 'none';
// }

// var e = document.getElementById('star');
// e.onmouseover = function() {
//   document.getElementById('starPopup').style.display = 'block';
// }
// e.onmouseout = function() {
//   document.getElementById('starPopup').style.display = 'none';
// }

// import jqueryui from 'jquery-ui';
