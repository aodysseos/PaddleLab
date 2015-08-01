app.chart.acceleration_timeline = {
 options: function (container, title, time, x, y, z) {
        var options = {
        	chart: {
                renderTo: container,
                type: 'spline',
                zoomType: ''
            },
            credits: {
                enabled: false
            },
        	rangeSelector: {
	            buttons: [{
	                type: 'millisecond',
	                count: 100,
	                text: '100ms'
	            }, {
	                type: 'all',
	                text: 'All'
	            }],
	            buttonTheme: {
	                width: 50
	            },
	            inputDateFormat: '%H:%M:%S.%L',
	            inputEditDateFormat: '%H:%M:%S.%L',
	            inputEnabled: false
        	},
			yAxis: {
			    title: {
			        text: 'acceleration'
			    }
			},
			xAxis: {
			    title: {
			        text: 'time'
			    },
			    categories: time,
			    type: 'datetime'
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