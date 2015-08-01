app.chart.stroke_rate = {
    options: function (container, title, time, duration) {
        var options = {
            chart: {
                renderTo: 'stroke_rate_chart',
                type: 'line',
                zoomType: 'xy'
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            yAxis: {
                title: {
                    text: 'Stroke Rate (ms)'
                }
            },
            xAxis: {
                title: {
                    text: 'time'
                },
                categories: time
            },
            series: [{
                name: 'Duration',
                data: duration,
                color: '#2980B9'
            }],
        };     

        return options;
    }      
};