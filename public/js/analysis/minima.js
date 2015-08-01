app.minima = {
    minima: [],
    getMinima: function () {
        return this.minima;
    },
    addMinima: function (time, catch_time, exit_time, value) {
        this.minima.push({
            time: time,
            catch_time: catch_time,
            exit_time: exit_time,
            value: value
        });
    },
    emptyMinima: function (){
        this.minima = [];
    },
    findCatch: function (i, time, y_values){
        var j, elem
            CATCH_THRESHOLD = 0.1,
            min_catch = y_values[i];
        
        if (y_values[i] >= 0) {
            throw {
                name: 'Value Error',
                message: 'Minima should be a negative non-zero number'
            };
        }

        //find catch phase start
        for (j = i; j >= 0; j--) {
            //check for y values are close to catch threshold
            if (y_values[j] <= CATCH_THRESHOLD){
                //update minimum values
                if (y_values[j] >= min_catch){
                    elem = j;
                    min_catch = y_values[j];     
                }
            } else if (Math.abs(y_values[j-1]) < Math.abs(y_values[min_catch])){
                elem = j+1;
                min_catch = y_values[j-1]; 
                return elem;      
            } else {
              return elem;     
            }
        }
    },
    findExit: function (i, time, y_values){
        var j, elem
            EXIT_THRESHOLD = 0.1,
            min_exit = y_values[i],
            arr_length = y_values.length;
        
        if (y_values[i] >= 0) {
            throw {
                name: 'Value Error',
                message: 'Minima should be a negative non-zero number'
            };
        }

        //find catch phase exit
        for (j = i; j <= arr_length; j++) {
            //check for y values are close to exit threshold
            if (y_values[j] <= EXIT_THRESHOLD){
                //update minimum values
                if (y_values[j] >= min_exit){
                    elem = j;
                    min_exit = y_values[j];     
                }
            } else if (Math.abs(y_values[j+1]) < Math.abs(y_values[min_exit])){
                elem = j+1;
                min_exit = y_values[j+1]; 
                return elem;      
            } else {
                return elem;     
            }
        }
    },
    findMinima: function (time, y_values){
        var i, catch_elem, exit_elem,
            arr_length = time.length;

        for(i=0; i<arr_length; i++){

            //Check if: current value is lower than zero
            if (y_values[i] < -1.2){
                //Check if: current value is lower than the two previous values
                if ((y_values[i] <= y_values[i-1]) && (y_values[i] <= y_values[i+1])){
                    //Check if: current value is lower than the next two values
                    if ((y_values[i] < y_values[i-2]) && (y_values[i] < y_values[i+2])){
                        //Check if: current value is lower than the next three values
                        if ((y_values[i]+0.2 < y_values[i-3]) && (y_values[i]+0.2 < y_values[i+3])){
                            //minima found, now find catch and exit
                            try {
                                catch_elem = this.findCatch(i, time, y_values);
                                exit_elem = this.findExit(i, time, y_values);
                            } catch (e) {
                                console.log(e.name + ' ' + e.message);
                            }
                            this.addMinima(time[i], time[catch_elem], time[exit_elem], y_values[i]);  
                        }
                    }
                }
            }
        }
    }
};