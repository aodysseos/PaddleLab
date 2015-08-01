app.stroke = {
    strokes: [],
    avgStroke: {
        //for testing
        avg_time: 3,
        min_pull_time: 0.1,
        max_pull_time: 1.9,
        min_air_time: 0.1,
        max_air_time: 1.5,
        //avg_time: 1.4,
        //pull_time: 0.9,
        //air_time: 0.5,
    },
    getStrokes: function () {
        return this.strokes;
    },
    addStroke: function (catch_time, exit_time, finish_time, pull_duration, air_duration, duration) {
        this.strokes.push({
            catch_time: catch_time,
            exit_time: exit_time,
            finish_time: finish_time,
            pull_duration: pull_duration,
            air_duration: air_duration,
            duration: duration
        });
    },
    emptyStrokes: function (){
        this.strokes = [];
    },
};