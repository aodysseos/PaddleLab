app.chart.acceleration = {
    options: function (container, title, time, x, y, z) {
        var options = {
            chart: {
                renderTo: container,
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
                    text: 'acceleration'
                }
            },
            inputDateFormat: '%H:%M:%S.%L',
            inputEditDateFormat: '%H:%M:%S.%L',
            xAxis: {
                title: {
                    text: 'time'
                },
                categories: time
            },
            series: [{
                name: 'x',
                data: x,
                color: '#79BD8F'
            },
            {
                name: 'y',
                data: y,
                color: '#C13B00'
            },{
                name: 'z',
                data: z,
                color: '#BEEB9F',
            }],
        };     

        return options;
    }
};