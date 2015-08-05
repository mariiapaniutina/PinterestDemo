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
                FDPDemo.readMore($(this).find('.desc'), showWords, '#readmore_template', 'Read More', 'Read Less'); 
                $(container).append($(this));
            });
        })
        .fail(function() {
            console.log('$.getJSON was failed');
            return false;
        });
    } else {
        console.log('One or more from arguments in getJSONData() has wrong data type');
        return false;
    }
};

FDPDemo.readMore = function (el, showWords, templateID, moreText, lessText){
    
        var toogleReadMore = function(linkID){
            $(el).find(linkID).click(function(){
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
        };
    
        //check if DOM element exist
        if($(el).length !== 0 && typeof showWords === 'number'){
            if (showWords >=0){
                var template = $(templateID).html();
                var dataText = $(el).text();
                var wordsLen = dataText.split(' ').length;

                if (wordsLen > showWords){
                    var firstPart = dataText.split(' ').slice(0, showWords).join(' ');
                    var secondPart = dataText.split(' ').slice(showWords).join(' ');
                    
                    var OBJ = {
                        'firstPart': firstPart,
                        'secondPart': secondPart,
                        'moreText': moreText,
                        'lessText': lessText
                    };
                    Mustache.parse(template);

                    var dataInContent = Mustache.render(template, OBJ);
                    $(el).html(dataInContent);
                }
                toogleReadMore('.moreLink');
            } else {
                return false;
            }
        } else {
            return false;
        }
};