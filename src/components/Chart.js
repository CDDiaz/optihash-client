import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function Chart(props) {
  const chart = useRef(null);

  useLayoutEffect(() => {
      let x = am4core.create("chartdiv", am4charts.XYChart);
      x.paddingRight = 20;

      x.data = props.data;

      let dateAxis = x.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.tooltipDateFormat = "dd-MMM";

      let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = false;
      valueAxis.renderer.minWidth = 35;

      let series = x.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "${valueY.value}";
      x.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      x.scrollbarX = scrollbarX;

      chart.current = x;

      return () => {
        x.dispose();
      };

  }, []);
  return (
    <div id="chartdiv" style={{ width: "80%", height: "400px" }}></div>
  );
}
export default Chart;
