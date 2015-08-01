app.controller('ticketsCtrl', function($scope) {
    
  
});

app.controller('analysisCtrl', function($scope, $http) {

    var href = window.location.href;
   
    $http.get('/trainings/analysis/performance/' + href.substr(href.lastIndexOf('/') + 1))
    .success(function(data, status, headers, config) { 
        $scope.trainings = data;
        $scope.error = "";

        getAnalysis(data, 'test');
        

        function getAnalysis(file, title) {

            $scope.title = title;

            var acceleration, strokes;

            acceleration = setChartAcceleration(title, title, data);

            strokes = app.analysis.getAnalysis(title, acceleration.t, acceleration.y);

            setChartStrokeRate(title, title, strokes);

            $scope.title = title;

            $scope.date = '01/01/2015';

            $scope.strokes = strokes;

              $scope.tickets = [
                    {name:'Strokes',     value: strokes.length, type: 'panel-primary', icon: 'fa-flag-checkered fa-5x'},
                    {name:'Avg. Stroke Rate', value: 62, type: 'panel-green',   icon: 'fa-trophy fa-5x'},
                    {name:'Other',       value: 0,  type: 'panel-yellow',  icon: 'fa-comments fa-5x'},
                    {name:'Issues',      value: 4,  type: 'panel-red',     icon: 'fa-support fa-5x'}
                ];

        }

        function setChartAcceleration(file, title, data) {
            var options, chart_options, chart;
            options = app.chart.prepareData(data);
            chart_options = app.chart.acceleration_timeline.options('training_chart', title, options.t, options.x, options.y, options.z);
            chart = new Highcharts.StockChart(chart_options);
            return options;
        }

        function setChartStrokeRate(file, title, strokes) {
            var options, chart_options, chart;
            options = app.chart.prepareStrokes(strokes);        
            chart_options = app.chart.stroke_rate.options('stroke_rate_chart', title, options.catch_time, options.duration);
            chart = new Highcharts.Chart(chart_options);
        }
    }).
    error(function(data, status, headers, config) { 
        $scope.user = {}; 
        $scope.error = data;
        console.log(data);
    });
});

	
