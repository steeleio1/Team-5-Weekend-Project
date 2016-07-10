import $ from 'jquery';
import {mainContent} from '../main';
import {google_key} from '../cred';

function insert(locale, data){
    data = data || [0, 0, 0, 0];
    let map = $('.gMapsBox iframe'),
        apps = data[1].appetizers,
        beer = data[3].Beer,
        grub = data[3].entrees,
        news = data[2],
        todaysSpecial = data[0].menu_item_id,
        content;
        console.log("data", data, "apps: ", apps, "beer: ", beer, "grub: ", grub, "news", news, "special", todaysSpecial);
    if (map.attr('src') === undefined)
        map.attr("src", `https://www.google.com/maps/embed/v1/place?key=${google_key}&q=The+Iron+Yard,Atlanta+GA`);
    console.log(data);
    $('.location4Box .titleBox p').text(news.title);
    $('.location4Box .dateBox p').text(news.date_published);
    $('.location4Box .paragraphBox p').text(news.post);

    if (locale) {
        let n, name, d, description;
        content = locale['menu'].find('.appsContent');
        name = content.find('.appNameBox');
        description = content.find('.appDescn-InfoButtonsBox');
        content.empty();
        apps.forEach(function(appetizer){
            n = name.clone();
            d = description.clone();
            n.find('.appName').text(appetizer.item).end()
             .find('.appPrice').text('$' + appetizer.price);
            d.find('.appDescBox p').text(appetizer.description);
            content.append(`${n[0].outerHTML}\n${d[0].outerHTML}\n`);
        });

        content = locale['menu'].find('.grubContent');
        name = content.find('.grubNameBox');
        description = content.find('.grubDescn-InfoButtonsBox');
        content.empty();
        grub.forEach(function(entree){
            n = name.clone();
            d = description.clone();
            n.find('.grubName').text(entree.item).end()
             .find('.grubPrice').text('$' + entree.price);
            d.find('.grubDescBox p').text(entree.description);
            content.append(`${n[0].outerHTML}\n${d[0].outerHTML}\n`);
            if (entree.id === todaysSpecial) {
                $('.specialsNameBox td:first-child').text(entree.item);
                $('.specialsNameBox td:last-child').text('$' + entree.price);
                $('.spDescriptionBox p').text(entree.description);
            }
        });

        content = locale['menu'].find('.beerContent');
        name = content.find('.beerNameBox');
        description = content.find('.beerDescn-InfoButtonsBox');
        content.empty();
        beer.forEach(function(draught){
            n = name.clone();
            d = description.clone();
            n.find('.beerName').text(draught.item).end()
             .find('.beerPrice').text('$' + draught.price);
            d.find('.beerStyle p').text(draught.style).end()
             .find('.beerDescBox p').text(draught.description);
            content.append(`${n[0].outerHTML}\n${d[0].outerHTML}\n`);
        });
    }
}

export default insert;
