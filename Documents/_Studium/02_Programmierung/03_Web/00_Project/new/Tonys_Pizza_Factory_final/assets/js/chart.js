
let pizzaArr;
let priceArr;

function findTheRank(name, nameToFind, arr) {
    let counter = 0;
    for (let i=0;i<arr.length;i++){
        if (arr[i][nameToFind]==name)
            counter++;
    }
    return counter;
}

function makeRatingChart(arr) {
    let ratingArr = [];
    ratingArr[0] = 'Pizza Rating';
    ratingArr[1] = findTheRank('awesome','pizzaRating', arr);
    ratingArr[2] = findTheRank('good','pizzaRating', arr);
    ratingArr[3] = findTheRank('okay','pizzaRating', arr);
    ratingArr[4] = findTheRank('poor','pizzaRating', arr);
    return ratingArr;
}

function makePriceRating(arr){
    let ratingArr = [];
    ratingArr[0] = 'Price Rating';
    ratingArr[1] = findTheRank('fair','prizeRating', arr);
    ratingArr[2] = findTheRank('okay','prizeRating', arr);
    ratingArr[3] = findTheRank('expensive','prizeRating', arr);
    return ratingArr;
}

function drawChart() {
    var dataPizza = google.visualization.arrayToDataTable([
        ['Rating', 'Awesome','Good', 'Okay', 'Poor'],
        pizzaArr
    ]);

    var dataPrices = google.visualization.arrayToDataTable([
        ['Rating', 'Fair','Good', 'Okay'],
        priceArr
    ]);

    var options = {
        chart: {
            title: 'Feedback Graph',
            subtitle: 'Chart of the respones of our feedback formular',
        },
        bars: 'horizontal' // Required for Material Bar Charts.
    };

    var pizza_chart = new google.charts.Bar(document.getElementById('pizza_chart'));
    pizza_chart.draw(dataPizza, google.charts.Bar.convertOptions(options));

    var price_chart = new google.charts.Bar(document.getElementById('prize_chart'));
    price_chart.draw(dataPrices, google.charts.Bar.convertOptions(options));
}

$(document).ready(function(){

    fastAuth("",function () {
        let client = new XMLHttpRequest();
        client.onload=function(){
            console.log(client.response);
            feedbackArray = JSON.parse(client.response);
            pizzaArr = makeRatingChart(feedbackArray);
            priceArr = makePriceRating(feedbackArray);
            google.charts.load('current', {'packages':['bar']});
            google.charts.setOnLoadCallback(drawChart);
        }

        client.open("GET", baseUrl + "/feedback", true);
        client.setRequestHeader("Authorization", jwt);
        client.setRequestHeader("Content-Type", "application/json");
        client.send();
    })


});

