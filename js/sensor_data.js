// Set today's date as the default value for the date picker
document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months are zero-based
    let dd = today.getDate();

    // Add leading zeros to the day and month if necessary
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDate = yyyy + '-' + mm + '-' + dd;
    document.getElementById("dateSelector").value = formattedDate;
});

document.addEventListener("DOMContentLoaded", function () {
    // Initialize each chart
    createChart("temperature_chart", "Temperature (\u00B0C)", "red");
    createChart("pressure_chart", "Pressure (Pa)", "blue");
    createChart("weight_chart", "Weight (g)", "green");
    createChart("gyroscope_chart", "Gyroscope (rad/s)", "purple");
    createChart("accelerometer_chart", "Acceleration (m/s\u00B2)", "orange");
    createChart("microphone_chart", "Sound Level (dB)", "brown");

    function createChart(containerId, label, color) {
        var chart = echarts.init(document.getElementById(containerId));

        let timeLabels = [];
        for (let i = 0; i < 24; i++) {
            timeLabels.push(i.toString().padStart(2, '0') + ":00");
        }

        var option = {
            title: { text: label, left: 'center' },
            grid: { left: 60, right: 20, top: 40, bottom: 40 },
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: timeLabels,
                axisLabel: { rotate: 45 }
            },
            yAxis: {
                type: 'value',
                name: label,
                nameLocation: 'center',
                nameGap: 35
            },
            series: [{
                data: Array(24).fill(0),
                type: 'line',
                smooth: true,
                color: color
            }]
        };

        chart.setOption(option);
    }
});
