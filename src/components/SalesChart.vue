<template>
  <CanvasJSChart :options="options" :styles="styleOptions" />
</template>

<script>
export default {
  data() {
    return {
      options: {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
          text: "Yearly Sales by Area"
        },
        axisY: {
          prefix: "Tk",
          tickLength: 0,
          suffix: "K",
          title: "Sales in Taka",
          includeZero: true
        },
        legend: {
          cursor: "pointer",
          itemclick: this.toggleDataSeries
        },
        toolTip: {
          shared: true
        },
        data: [
          {
            type: "column",
            name: "Kustia",
            showInLegend: true,
            color: "#145A32", // Bright Blue color
            yValueFormatString: "$##,### TK",
            dataPoints: [
              { label: "2023", y: 50 },
              { label: "2022", y: 100 },
              { label: "2021", y: 120 },
              { label: "2020", y: 140 }
            ]
          },
          {
            type: "column",
            name: "Chittagong",
            showInLegend: true,
            color: "#229954", // Bright Green color
            yValueFormatString: "$##,### TK",
            dataPoints: [
              { label: "2023", y: 70 },
              { label: "2022", y: 115 },
              { label: "2021", y: 150 },
              { label: "2020", y: 160 }
            ]
          },
          {
            type: "column",
            name: "Rajshahi",
            showInLegend: true,
            color: "#28B463", // Bright Orange color
            yValueFormatString: "$##,### TK",
            dataPoints: [
              { label: "2023", y: 110 },
              { label: "2022", y: 120 },
              { label: "2021", y: 160 },
              { label: "2020", y: 170 }
            ]
          },
          {
            type: "column",
            name: "Natore",
            showInLegend: true,
            color: "#58D68D", // Bright Pink color
            yValueFormatString: "$##,### TK",
            dataPoints: [
              { label: "2023", y: 140 },
              { label: "2022", y: 150 },
              { label: "2021", y: 170 },
              { label: "2020", y: 180 }
            ]
          }
        ]
      },
      styleOptions: {
        width: "100%",
        height: "360px",
        margin: "20px 0"
      }
    };
  },
  methods: {
    toggleDataSeries(e) {
      if (
        typeof e.dataSeries.visible === "undefined" ||
        e.dataSeries.visible
      ) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    }
  }
};
</script>
