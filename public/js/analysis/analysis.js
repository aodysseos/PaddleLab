app.analysis = {
    getAnalysis: function (name, t_values, y_values) {
        var minima, maxima, strokes;

        app.minima.findMinima(t_values, y_values);
        app.maxima.findMaxima(t_values, y_values);
        
        minima = app.minima.getMinima();
        maxima = app.maxima.getMaxima();

        app.minima.emptyMinima();
        app.maxima.emptyMaxima();
        
        this.verifyStroke(minima, maxima);

        strokes = app.stroke.getStrokes();

        app.stroke.emptyStrokes(); 

        return strokes; 
    },
    getDuration: function (start_time, finish_time){
        var str_sec, fin_sec,
            str_milli, fin_milli,
            duration_sec, duration_milli, duration;

        str_sec = start_time.substr(6, 2);
        str_mil = start_time.substr(9, 2);
        
        fin_sec = finish_time.substr(6, 2);
        fin_mil = finish_time.substr(9, 2);

        //calculate duration
        //milliseconds are recorded from 1-10
        //divide by 10 to get duration in seconds
        duration = Number(((fin_sec + fin_mil) - (str_sec + str_mil))/10);

        if (duration_sec <= 0) {
            throw {
                name: 'Value Error',
                message: 'Duration should be a possitive value'
            };
        }

        return duration;
    },
    verifyPullPhase: function (start_time, finish_time){
        var duration; 

         try {
            duration = this.getDuration(start_time, finish_time); 
        } catch (e) {
            console.log(e.name + ' ' + e.message);
        }

        if ((duration <= app.stroke.avgStroke.max_pull_time) && (duration >= app.stroke.avgStroke.min_pull_time)){
            return duration;
        } else {
            return false;
        }   
    },
    verifyAirPhase: function (start_time, finish_time){
        var duration; 
 
        try {
            duration = this.getDuration(start_time, finish_time); 
        } catch (e) {
            console.log(e.name + ' ' + e.message);
        }
        
        if ((duration <= app.stroke.avgStroke.max_pull_time) && (duration >= app.stroke.avgStroke.min_pull_time)){
            return duration;
        } else {
            return false;
        }     
    },
    verifyStroke: function (minima, maxima) {

        var i,
            pull_phase_duration,
            air_phase_duration,
            stroke_duration,
            arr_length;

        if (minima.length < maxima.length){
            arr_length = minima.length - 1;
        }else{
            arr_length = maxima.length - 1;
        }    

        for (i = 0; i <= arr_length; i++) {

            pull_phase_duration = this.verifyPullPhase(minima[i].catch_time, minima[i].exit_time);
            air_phase_duration = this.verifyAirPhase(maxima[i].exit_time, maxima[i].catch_time);    

            //** NOTE: Might need to change to calculate from start to finish **
            stroke_duration = pull_phase_duration + air_phase_duration;
            
            // add a new stroke if pull and air phases are valid
            if ((pull_phase_duration != false) && (air_phase_duration != false)){
                app.stroke.addStroke(minima[i].catch_time,
                                     minima[i].exit_time,
                                     maxima[i].catch_time,
                                     pull_phase_duration,
                                     air_phase_duration,
                                     stroke_duration);
            } else {
                console.log('Invalid Stroke');
            }
        }     
    }    
};

