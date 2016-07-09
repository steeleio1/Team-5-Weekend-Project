import $ from 'jquery';
import {flickr_key} from '../cred';

function request(search_term) {
    return $.ajax({
        url: 'https://api.flickr.com/services/rest',
        data: {
            api_key: flickr_key,
            method: 'flickr.photos.search',
            text: search_term,
            format: 'json',
            nojsoncallback: 1,
            sort: 'relevance',
            per_page: 4
        }
    })
}

export default request;
