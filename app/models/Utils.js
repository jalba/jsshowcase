/*
 * Helper functions produce the data
 */


function divideNumberInRandomParts(total,divisor) {
    var randomParts = [];
    for(var i=0; i<divisor; i++) {
        var part = Math.ceil(Math.random()*total);
        total -= part; 
        if(i === divisor - 1) {
            part += total;
        }
        randomParts.push(part);
    }
    return randomParts;
} 


function getDateTime() {
    var dataPoints  = 24,
        step        = 3600000,
        now         = new Date(),
        msecs       = now.getTime(),
        day         = [];
    // daily datapoints
    for (var i = 0; i < dataPoints; i++) {
        day.push(i * step + msecs);
    }
    return day;
}
