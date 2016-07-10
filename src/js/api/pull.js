import $ from 'jquery';

function getData(){
    let args = Array.from(arguments),
        requests = [];
    args.forEach(function(arg){
        requests.push($.ajax(arg));
    });
    return requests;
}

export default getData;
