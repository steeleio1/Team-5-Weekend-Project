import $ from 'jquery';
import {flickr_key} from '../cred';

function request(options) {
    options = options || {};
    return $.ajax({
        url: 'https://api.flickr.com/services/rest/',
        data: {
            api_key: flickr_key,
            format: 'json',
            nojsoncallback: 1,
            method: options.method,
            text: options.search_term,
            sort: 'relevance'
        }
    })
}

export default request;
