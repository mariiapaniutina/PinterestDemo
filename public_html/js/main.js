//FDP => Fashion Discovery Platform
var FDPDemo = {};
FDPDemo.getRandomJSONData = function(url, id){
    $.getJSON(url, function(data) { 
        //getting 20 rundom elements from JSON
        var tmpData = '';
        var dataLength = data.length;
        for (var i=0; i<20; i++){
            var itemJSON = data[Math.floor(Math.random()*dataLength)];
            tmpData += '<div class="item">' + 
                '<div class="img"><img src="img/'+ itemJSON.thumbnail_url + '_' + Math.floor(Math.random()*20) + '.jpg' + '"></div>' +
                '<div class="name">'+ itemJSON.author +'</div>' +
                '<div class="desc">'+ itemJSON.blurb +'</div>' +
                '<div class="item_shadow"></div></div>';
        };
        $(tmpData).each(function(){
           FDPDemo.readMore($(this).find('.desc')); 
           $(id).append($(this));
        });
    });
};
FDPDemo.readMore = function (el){
    
    var dataText = $(el).text();
    var wordsLen = dataText.split(' ').length;
    var showWords = 5;
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

};

$(document).ready(function(){
    
    //load first part of items
    FDPDemo.getRandomJSONData('js/data.json', '.container');
    
    //loading data if scroll is in bottom of screen
    $(window).scroll(function(){
        if($(window).scrollTop() == $(document).height() - $(window).height()){
            FDPDemo.getRandomJSONData('js/data.json', '.container');
        }
    });
    
});