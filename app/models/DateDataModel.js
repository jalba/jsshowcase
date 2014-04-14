/*
 *  data divided by hours
 */

function DateDataModel(reportingModel) {
    var viewsTotal = 0;
    for(var idx = 0; idx < reportingModel.length; idx++) {
        viewsTotal += reportingModel[idx].views; 
    }
    var viewsPerHour = divideNumberInRandomParts(viewsTotal,24);
    var hours = getDateTime();
    this.viewsByHour = [];
    for (var i = 0; i < hours.length; i++) {
        var hour = {};
        hour.date = hours[i];
        hour.views = viewsPerHour[i];
        var percentages = divideNumberInRandomParts(hour.views, 5);
        hour.topPlayers = {'Android': percentages[0], 
                         'iPhone': percentages[1], 
                         'iPad': percentages[2], 
                         'Kindle': percentages[3], 
                         'Flash': percentages[4]}; //added
        this.viewsByHour.push(hour);
    }
    return this.viewsByHour;
}

