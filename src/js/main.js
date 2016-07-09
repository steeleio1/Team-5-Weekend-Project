import $ from 'jquery';
import flickr from './api/flickr';

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

flickr({ method: 'flickr.photos.search', search_term: 'beer' }).then(populate);
flickr({ method: 'flickr.photos.search', search_term: 'bar food' }).then(populate);




