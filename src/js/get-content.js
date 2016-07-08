function getContent(url){
    return $.ajax('../../app/templates/' + url + '.html');
}

export default getContent;
