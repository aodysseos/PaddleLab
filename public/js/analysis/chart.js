app.chart = {
    prepareData: function (data) {
              

        var values = this.filter(data.t_values, data.x_values, data.y_values, data.z_values);
        
        return {
            t: values.t,
            x: values.x,
            y: values.y,
            z: values.z
        };

    },
    prepareStrokes: function (data) {
        var values,
            catch_time = [],
            exit_time = [],
            finish_time = [],
            pull_duration = [],
            air_duration = [],
            duration = [];

        for (var v in data)
        {
            catch_time.push(data[v].catch_time);
            exit_time.push(data[v].exit_time);
            finish_time.push(data[v].finish_time);
            pull_duration.push(data[v].pull_duration);
            air_duration.push(data[v].air_duration);
            duration.push(data[v].duration);

        }

        return {
            catch_time: catch_time,
            exit_time: exit_time,
            finish_time: finish_time,
            pull_duration: pull_duration,
            air_duration: air_duration,
            duration: duration
        };

    },
    filter: function (t_values, x_values, y_values, z_values) {

        var exists = {},
            nw_t_values = [],
            nw_x_values = [],
            nw_y_values = [],
            nw_z_values = [],
            i, t, x, y, z,
            arr_length = t_values.length;

        for(i =0; i<arr_length; i++){
            
            t = t_values[i];
            x = x_values[i];
            y = y_values[i];
            z = z_values[i];

            //prevent duplicated time measurements to avoid flat on -+2
            if(!exists[t]){
                //prevent duplicated minima,maxima
                if(y_values[i] != y_values[i+1]){
                    nw_t_values.push(t);
                    nw_x_values.push(x);
                    nw_y_values.push(y);
                    nw_z_values.push(z);
                    exists[t] = true;
                }
            }
        }
      
        return {
            t: nw_t_values,
            x: nw_x_values,
            y: nw_y_values,
            z: nw_z_values,
        };
    }
};
