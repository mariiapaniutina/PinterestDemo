getRandomID = function(maxNum){
    if(typeof maxNum === 'number'){
        return Math.floor(Math.random()*maxNum);
    } else {
        return 0;
    }
};

