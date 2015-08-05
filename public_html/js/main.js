//container with items
var FDPContainer = '.container';

//json with items
var FDP_JSON = 'js/data.json';

//Mustache template
templateID = '#item_template';

//items per request
itemsLen = 20;

//loading first 20 random items in page
var loadData = function(){
    FDPDemo.getJSONData(FDP_JSON, FDPContainer, templateID, itemsLen);
};

//loading 20 items every time, when scroll is in the bottom of page
var loadDataByInfinityScroll = function (){
        $(window).scroll(function(){
            if($(window).scrollTop() == $(document).height() - $(window).height()){
                loadData();
            }
        });
    };

$(document).ready(function(){
    loadData();
    loadDataByInfinityScroll();
});