app.maxima = {
    maxima: [],
    getMaxima: function () {
        return this.maxima;
    }, 
    addMaxima: function (time, exit_time, catch_time, value) {
        this.maxima.push({
            time: time,
            exit_time: exit_time,
            catch_time: catch_time,
            value: value
        });
    },
    emptyMaxima: function (){
        this.maxima = [];
    },
    findExit: function (i, time, y_values){
        var j, elem
            EXIT_THRESHOLD = -0.1,
            min_exit = y_values[i];
        
        if (y_values[i] <= 0) {
            throw {
                name: 'Value Error',
                message: 'Maxima should be a positive non-zero number'
            };
        }

        //air-time start (catch phase exit)
        for (j = i; j >= 0; j--) {
            //check for y values are close to exit threshold
            if (y_values[j] >= EXIT_THRESHOLD){
                //update minimum values
                if (y_values[j] <= min_exit){
                    elem = j;
                    min_exit = y_values[j];     
                }
            } else if (Math.abs(y_values[j-1]) < Math.abs(y_values[min_exit])){
                elem = j-1;
                min_exit = y_values[j-1]; 
                return elem;      
            } else {
              return elem;     
            }
        }
    },
    findCatch: function (i, time, y_values){
        var j, elem
            CATCH_THRESHOLD = -0.1,
            min_catch = y_values[i],
            arr_length = y_values.length;
        
        if (y_values[i] <= 0) {
            throw {
                name: 'Value Error',
                message: 'Maxima should be a positive non-zero number'
            };
        }

        //find air-time finish (catch phase start)
        for (j = i; j <= arr_length; j++) {
            //check for y values are close to catch threshold
            if (y_values[j] >= CATCH_THRESHOLD){
                //update minimum values
                if (y_values[j] <= min_catch){
                    elem = j;
                    min_catch = y_values[j];     
                }
            } else if (Math.abs(y_values[j+1]) < Math.abs(y_values[min_catch])){
                elem = j+1;
                min_catch = y_values[j+1]; 
                return elem;      
            } else {
              return elem;     
            }
        }
    },
    findMaxima: function (time, y_values){
        var i, exit_elem, catch_elem,
        arr_length = time.length;

        for(i=0; i<arr_length; i++){

            //Check if: current value is lower than zero
            if (y_values[i] > 0.5){
                //Check if: current value is greater than the two previous values
                if ((y_values[i] >= y_values[i-1]) && (y_values[i] >= y_values[i+1])){
                    //Check if: current value is greater than the next two values
                    if ((y_values[i] > y_values[i-2]) && (y_values[i] > y_values[i+2])){
                        //Check if: current value is lower than the next three values
                            if ((y_values[i] > y_values[i-3]) && (y_values[i] > y_values[i+3])){
                                //maxima found, now find exit and catch
                            try {
                                exit_elem = this.findExit(i, time, y_values);
                                catch_elem = this.findCatch(i, time, y_values);
                            } catch (e) {
                                console.log(e.name + ' ' + e.message);
                            }
                                this.addMaxima(time[i], time[exit_elem], time[catch_elem], y_values[i]);    
                        }
                    }
                }
            }
        }
    }
};
