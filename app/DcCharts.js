function DcCharts(DateDataModel) {

    var barChart  = dc.barChart("#bar-chart");
    var donutChart = dc.pieChart("#donut-chart");

    var data = DateDataModel;
    var dataset = crossfilter(data);

    var dateDim = dataset.dimension(function(d) {return d.date;});
    var hits = dateDim.group().reduceSum(function(d) {return d.views;});
    var minDate = dateDim.bottom(1)[0].date;
    var maxDate = dateDim.top(1)[0].date;

    var playersDataset = [];
    for(var player in data[0].topPlayers) {
        var playersInfo = {};
        playersInfo.player = player;
        playersInfo.percentage = 0;
        playersDataset.push(playersInfo)
    }

    data.forEach(function(d){
        var i = 0;
        for(var key in d.topPlayers) {
            playersDataset[i].percentage = playersDataset[i].percentage + 
                                       d.topPlayers[key];
            i++;
        }
    });

    var playersTotal = 0;
    for(var idx = 0; idx < playersDataset.length; idx++) {
        playersTotal += playersDataset[idx].percentage;
    }
  
    var playersCF = crossfilter(playersDataset);
    var playersDim = playersCF.dimension(function(d) {
        return d.player;
    });

    var playersGroup = playersDim.group().reduceSum(function(d) {
        return ((d.percentage / playersTotal)*100).toFixed(2);
    });

    barChart.width(600).height(200)
            .dimension(dateDim)
            .group(hits)
            .centerBar(true)    
            .xUnits(function(){return 23;})
            .gap(5)
            .on('filtered',function(chart,filter) {
                if(filter !== null) {
                    var rest = [0,0,0,0,0];
                    playersTotal = 0;
                    for(var idx = 0; idx < data.length; idx++) {
                        if(data[idx].date >= filter[0] && data[idx].date <= filter[1]) {
                            var c = 0;
                            for(var key in data[idx].topPlayers) {
                                rest[c] += data[idx].topPlayers[key];
                                playersTotal += data[idx].topPlayers[key];
                                c++;
                            }
                        }
                    }
                    var r = -1;
                    newGroup = playersDim.group().reduceSum(function(d) {
                        r++;
                        return ((rest[r] / playersTotal)*100).toFixed(2);
                    });
                    donutChart.group(newGroup);
                        dc.redrawAll();
                    }
            })
            .margins({top: 10, right: 150, bottom: 30, left: 140})  
            .x(d3.time.scale().domain([minDate,maxDate]));

    donutChart.width(250)
              .height(250)
              .dimension(playersDim)
              .group(playersGroup)
              .innerRadius(30);

    dc.renderAll();
}