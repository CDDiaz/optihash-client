import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function Chart(props) {
  const chart = useRef(null);
  const [data, setData] = useState(null);


  // let data = [];
  let myData = [];

  useEffect(() => {
    const fetchData =  () => {
      axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=aud&days=30&interval=daily').then((response) => {
        setData(response.data.prices.map(([date, price]) => ({date: new Date(date), name: `name${price+1}`, value: Number(price.toFixed(2))})));
        // let objectTest = Object.fromEntries(response.data.prices);
        // console.log("objectTest", objectTest);
        myData = response.data.prices.map(([date, price]) => ({date: new Date(date), name: `name${price+1}`, value: Number(price.toFixed(2))}));
        // console.log("data", data);
      });
    };
    // fetchData();


    const makeChart = () => {
      let x = am4core.create("chartdiv", am4charts.XYChart);
      x.paddingRight = 20;
      x.data = data;
      console.log("Data", data);
      console.log("myData", myData);
      console.log("x.data", x.data);

      let dateAxis = x.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      // console.log("dateAxis", dateAxis);

      let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
      // console.log("valueAxis", valueAxis);

      let series = x.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";
      x.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      x.scrollbarX = scrollbarX;

      chart.current = x;

      return () => {
        x.dispose();
      };
    };
    // makeChart();
    Promise.all([fetchData]).then(makeChart);
  }, []);
  console.log("data", data);

  // useLayoutEffect(() => {
  //
  //
  //   let myData = [];
  //
  //   const fetchData = async () => {
  //     await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=aud&days=30&interval=daily').then((response) => {
  //       myData = response.data.prices.map(([date, price]) => ({date: new Date(date), name: `name${price+1}`, value: Number(price.toFixed(2))}));
  //       // let objectTest = Object.fromEntries(response.data.prices);
  //       // console.log("objectTest", objectTest);
  //       // newData = response.data.prices.map(([date, price]) => ({date: new Date(date), name: `name${price+1}`, value: Number(price.toFixed(2))}));
  //       // console.log("data", data);
  //     });
  //   };
  //   fetchData();
  //
  //   // const makeChart = () => {
  //     let x = am4core.create("chartdiv", am4charts.XYChart);
  //     x.paddingRight = 20;
  //
  //
  //     // let data = [];
  //     // let visits = 10;
  //     //
  //     // for (let i = 1; i < 366; i++) {
  //     //   visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  //     //   data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
  //     // }
  //     // console.log("Data",data);
  //     x.data = myData;
  //     console.log("Data", data);
  //     console.log("myData", myData);
  //     console.log("x.data", x.data);
  //
  //     let dateAxis = x.xAxes.push(new am4charts.DateAxis());
  //     dateAxis.renderer.grid.template.location = 0;
  //     // console.log("dateAxis", dateAxis);
  //
  //     let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
  //     valueAxis.tooltip.disabled = true;
  //     valueAxis.renderer.minWidth = 35;
  //     // console.log("valueAxis", valueAxis);
  //
  //     let series = x.series.push(new am4charts.LineSeries());
  //     series.dataFields.dateX = "date";
  //     series.dataFields.valueY = "value";
  //     series.tooltipText = "{valueY.value}";
  //     x.cursor = new am4charts.XYCursor();
  //
  //     let scrollbarX = new am4charts.XYChartScrollbar();
  //     scrollbarX.series.push(series);
  //     x.scrollbarX = scrollbarX;
  //
  //     chart.current = x;
  //
  //     return () => {
  //       x.dispose();
  //     };
  //   // };
  //   // Promise.all([fetchData]).then(makeChart);
  // }, []);
  // // Promise.all([useEffect]).then(useLayoutEffect);
  return (
    <div id="chartdiv" style={{ width: "90%", height: "500px" }}></div>
  );
}
export default Chart;
