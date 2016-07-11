import $ from 'jquery';
import {google_key} from '../cred';

function insert(locale, data){
    data = data || [0, 0, null, 0];
    let map = $('.gMapsBox iframe'),
        apps = data[1].appetizers,
        beer = data[3].Beer,
        games = data[3].games,
        grub = data[3].entrees,
        news = data[2],
        todaysSpecial = data[0].menu_item_id,
        content;
        console.log("data: ", data, "apps: ", apps, "beer: ", beer, "grub: ", grub, "news: ", news, "special: ", todaysSpecial);

    if (locale) {
        let n, name, d, description;
        const   ALLERGIES = 'This item may contain shellfish or another item that some may be allergic to. Please ask your waiter or waitress for assistance.',
                FAVORITE = 'YUM! We have been doing this a long time and this item has become one of our favorites.',
                SPICY = 'This item is spicy! Please handle with care and drink lots of water.',
                VEGAN = 'This item contains no meat and has been prepared without the use of animal products.';

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
            if (appetizer.allergies) d.find('.allergies .info').text(ALLERGIES);
            if (appetizer.favorite) d.find('.favorite .info').text(FAVORITE);
            if (appetizer.spicy) d.find('.spicy .info').text(SPICY);
            if (appetizer.vegan) d.find('.vegan .info').text(VEGAN);
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
            if (entree.allergies) d.find('.allergies .info').text(ALLERGIES);
            if (entree.favorite) d.find('.favorite .info').text(FAVORITE);
            if (entree.spicy) d.find('.spicy .info').text(SPICY);
            if (entree.vegan) d.find('.vegan .info').text(VEGAN);
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
            d.find('.beerStyle p').html(`
                ${draught.style} / ${draught.draught ? 'Draft beer, ' : 'Bottled beer, '}
                <span class="abv">alcohol by volume:</span> ${draught.abv}%`).end()
             .find('.beerDescBox p').text(draught.description);
            content.append(`${n[0].outerHTML}\n${d[0].outerHTML}\n`);
        });

        content = locale['games'].find('.gamesContent');
        name = content.find('.gamesNameBox');
        description = content.find('.gamesDescn-InfoButtonsBox');
        content.empty();
        console.log(content.html(), name, description);
        games.forEach(function(game){
            n = name.clone();
            d = description.clone();
            n.find('.gameName').text(game.item).end()
             .find('.gamePrice').text('$' + game.price);
            d.find('.platform p').html(`played on: <span>${game.platform} |</span> rated: <span>${game.rating}</span>`).end()
             .find('.gameDesc p').text(game.description);
            content.append(`${n[0].outerHTML}\n${d[0].outerHTML}\n`);
        });

        $('.location4Box .titleBox p').text(news.title);
        $('.location4Box .dateBox p').text(news.date_published);
        $('.location4Box .paragraphBox p').text(news.post);
    } else map.attr("src", `https://www.google.com/maps/embed/v1/place?key=${google_key}&q=The+Iron+Yard,Atlanta+GA`);
}

export default insert;
