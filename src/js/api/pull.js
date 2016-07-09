import $ from 'jquery';

function getData(data){
    return $.ajax(data);
}

export default getData;
