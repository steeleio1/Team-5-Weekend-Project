import $ from 'jquery';

function getContent(url){
    return $.ajax('../templates/' + url + '.htm');
}

export default getContent;
