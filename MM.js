<script type="text/javascript">
window.onload = function () {
  var dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];
  var stockChart = new CanvasJS.StockChart("chartContainer",{
    exportEnabled: true,
    theme: "light2",
    title:{
      text:"StockChart with Tooltip & Crosshair Syncing"
    },
    charts: [{
      toolTip: {
        shared: true
      },
      axisX: {
        lineThickness: 5,
        tickLength: 0,
        labelFormatter: function(e) {
          return "";
        },
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          labelFormatter: function(e) {
            return ""
          }
        }
      },
      axisY2: {
        title: "Litecoin Price",
        prefix: "€"
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "left"
      },
      data: [{
        name: "Price (in EUR)",
        yValueFormatString: "€#,###.##",
        axisYType: "secondary",
        type: "candlestick",
        risingColor: "green",
        fallingColor: "red",
        dataPoints : dataPoints1
      }]
    },{
      height: 100,
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY2: {
        prefix: "€",
        title: "LTC/EUR"
      },
      legend: {
        horizontalAlign: "left"
      },
      data: [{
        yValueFormatString: "€#,###.##",
        axisYType: "secondary",
        name: "LTC/EUR",
        dataPoints : dataPoints2
      }]
    }],
    navigator: {
      data: [{
        color: "grey",
        dataPoints: dataPoints3
      }],
      slider: {
        minimum: new Date(2018, 06, 01),
        maximum: new Date(2018, 08, 01)
      }
    }
  });
  $.getJSON("https://canvasjs.com/data/docs/ltceur2018.json", function(data) {
    for(var i = 0; i < data.length; i++){
      dataPoints1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)], color: data[i].open < data[i].close ? "green" : "red"});;
      dataPoints2.push({x: new Date(data[i].date), y: Number(data[i].volume_eur), color: data[i].open < data[i].close ? "green" : "red"});
      dataPoints3.push({x: new Date(data[i].date), y: Number(data[i].close)});
    }
    stockChart.render();
  });
}
</script>