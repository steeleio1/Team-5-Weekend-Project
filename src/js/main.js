import $ from 'jquery';
import get from './get-content'
import flickr from './api/flickr';
import pullData from './api/pull'
import switchTo from './switch-slide';
import {google_key} from './cred';

var fancyMenuData = 'https://json-data.herokuapp.com/restaurant/menu/1',
    newsData = 'https://json-data.herokuapp.com/restaurant/news/1',
    pubMenuData = 'https://json-data.herokuapp.com/restaurant/menu/3',
    specialData = 'https://json-data.herokuapp.com/restaurant/news/1';
var mainContent = [];

function populate(flickrPhotos){
    console.log(flickrPhotos);
    var container = $('.location8Box');
    var Photos = flickrPhotos.photos.photo.splice(1, 3);
    Photos.forEach(function(photo){
        container.append(`
            <div class="photoBox">
                <img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">
            </div>`);
    });
}

function insert(data){
    data = data || {};
    let map = $('.gMapsBox iframe'),
        apps = data.appetizers,
        news = data.post_id;
    if (map.attr('src') === undefined)
        map.attr("src", `https://www.google.com/maps/embed/v1/place?key=${google_key}&q=Space+Needle,Seattle+WA`);
    console.log(data);
    if (news){
        $('.location4Box .titleBox p').text(data.title);
        $('.location4Box .dateBox p').text(data.date_published);
        $('.location4Box .paragraphBox p').text(data.post);
    } else if (apps){
        apps.forEach(function(appetizer){

        });
    }
}

get('our-story').then(function(data){ /*switchTo(data);*/ mainContent['story'] = $(data); });
get('menu').then(function(data){ mainContent['menu'] = $(data); });
get('reservations').then(function(data){ mainContent['reservations'] = $(data); });
get('games').then(function(data){ mainContent['games'] = $(data); });

flickr('beer').then(populate);
flickr('bar food').then(populate);
flickr('sea scallops dish').then(function(data){
    var photo = data.photos.photo[1];
    $('.specialsImgBox').html(`<img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">`);
});

pullData(fancyMenuData).then(insert);
pullData(pubMenuData).then(insert);
pullData(newsData).then(insert);

$(document)
    .delegate('.storyTab', 'click', function(){ switchTo(mainContent['story']); })
    .delegate('.menuTab', 'click', function(){ switchTo(mainContent['menu']); })
    .delegate('.resTab', 'click', function(){ switchTo(mainContent['reservations']); })
    .delegate('.gamesTab', 'click', function(){ switchTo(mainContent['games']); });

insert();
