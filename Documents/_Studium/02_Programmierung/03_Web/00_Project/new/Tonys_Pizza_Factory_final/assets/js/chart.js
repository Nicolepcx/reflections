google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Rating', 'Good', 'Okay', 'Poor'],
        ['Pizza Rating', 100, 40, 20],
        ['Price Rating', 100, 40, 20]
    ]);

    var options = {
        chart: {
            title: 'Feedback Graph',
            subtitle: 'Chart of the respones of our feedback formular',
        },
        bars: 'horizontal' // Required for Material Bar Charts.
    };

    var chart = new google.charts.Bar(document.getElementById('barchart_material'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
}