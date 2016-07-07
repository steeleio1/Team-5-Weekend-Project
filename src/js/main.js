import $ from 'jquery';
import flickr from './api/flickr';

flickr({ method: 'flickr.photos.search', search_term: 'beer' }).then(function(data){
    console.log(data);
    var box = $('.container');
    var beerPhotos = data.photos.photo.splice(1, 3);
    box.empty();
    beerPhotos.forEach(function(photo){
        box.append(`
            <div style="width: 217px; height: 217px;">
                <img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg" style="width: 100%; height: 100%;">
            </div>`);
    });
});
