import './index.pug';
import './main.sass';
import { SciChartSurface } from 'scichart/Charting/Visuals/SciChartSurface';
import { NumericAxis } from 'scichart/Charting/Visuals/Axis/NumericAxis';
import { XyDataSeries } from 'scichart/Charting/Model/XyDataSeries';
import { FastLineRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries';

async function initSciChart() {
  const { sciChartSurface, wasmContext } = await SciChartSurface.create('scichart-root');

  const xAxis = new NumericAxis(wasmContext);
  const yAxis = new NumericAxis(wasmContext);

  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);

  const xyDataSeries = new XyDataSeries(wasmContext);

  for (let i = 0; i < 5000000; i++) {
    xyDataSeries.append(i, Math.sin(i * 0.01) * Math.exp(i * (0.00001)));
  }

  const lineSeries = new FastLineRenderableSeries(wasmContext, {
    dataSeries: xyDataSeries,
    stroke: 'rgba(176,196,222,1)',
    strokeThickness: 2,
  });
  sciChartSurface.renderableSeries.add(lineSeries);
}

initSciChart();
