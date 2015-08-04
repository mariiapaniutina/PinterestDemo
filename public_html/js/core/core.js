var FDPDemo = {};

FDPDemo.renderDataFromJSON = function(templateID, JSON_OBJ) {
    //length of images in "img" folder
    var imgs_len = 20;
    //special random index for image url
    JSON_OBJ.random_img = getRandomID(imgs_len); 
    var rendered = '';
    var template = $(templateID).html();
    Mustache.parse(template);
    rendered = Mustache.render(template, JSON_OBJ);
    return rendered;
};

FDPDemo.getJSONData = function(urlJSON, container, templateID, itemsLen){
    if (typeof urlJSON === 'string' && typeof container === 'string' && typeof templateID === 'string' && typeof itemsLen === 'number'){
        var showWords = 5;
        $.getJSON(urlJSON)
        .done(function(data) {
            var tmpData = '';
            var dataLength = data.length;
            for (var i=0; i<itemsLen; i++){
                tmpData += FDPDemo.renderDataFromJSON(templateID, data[getRandomID(dataLength)]);
            };
            $(tmpData).each(function(){
               FDPDemo.readMore($(this).find('.desc'), showWords); 
               $(container).append($(this));
            });
        })
        .fail(function() {
          return console.error('$.getJSON was failed');
        });
    } else {
        return console.error('One or more from arguments in getJSONData() has wrong data type');
    }
};

FDPDemo.readMore = function (el, showWords){
        //check if DOM element exist
        if($(el).length !== 0 && typeof showWords === 'number'){
            if (showWords >=0){
                var dataText = $(el).text();
                var wordsLen = dataText.split(' ').length;
                var moreText = "Show more";
                var lessText = "Show less";

                if (wordsLen > showWords){
                    var firstPart = dataText.split(' ').slice(0, showWords).join(' ');
                    var secondpart = dataText.split(' ').slice(showWords).join(' ');

                    var dataInContent = firstPart + '<span class="moreContent"><span>' + secondpart + '</span>' + '<a href="#" class="moreLink">' + moreText +'</a></span>';
                    $(el).html(dataInContent);
                }

                $(el).find(".moreLink").click(function(){
                    if($(this).hasClass("less")) {
                        $(this).removeClass("less");
                        $(this).html(moreText);
                    } else {
                        $(this).addClass("less");
                        $(this).html(lessText);
                    }
                    $(this).parent().prev().toggle();
                    $(this).prev().toggle();
                    return false;
                }); 
            } else {
                return false;
            }
        } else {
            return false;
        }
};