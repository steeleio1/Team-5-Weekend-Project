import $ from 'jquery';

function getContent(url){
    return $.ajax('../../templates/' + url + '.html');
}

export default getContent;
