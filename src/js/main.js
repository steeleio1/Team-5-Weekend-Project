import $ from 'jquery';
import get from './get-content'
import flickr from './api/flickr';
import switchTo from './switch-slide'

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

get('our-story').then(function(data){ mainContent['story'] = data; });
get('menu').then(function(data){ mainContent['menu'] = data; });

flickr({ method: 'flickr.photos.search', search_term: 'beer' }).then(populate);
flickr({ method: 'flickr.photos.search', search_term: 'bar food' }).then(populate);

$(document)
    .delegate('.storyTab', 'click', switchTo('story', mainContent['story']))
    .delegate('.menuTab', 'click', switchTo('menu', mainContent['menu']))
    .delegate('.resTab', 'click', switchTo('reservations', mainContent['reservations']))
    .delegate('.gamesTab', 'click', switchTo('games', mainContent['games']));
