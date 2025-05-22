import { FC } from 'react';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { HeatmapChart } from 'echarts/charts';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
} from 'echarts/components';

import { HeatMapTabProps } from 'SpectralScan/HeatMap/types';

export const HeatMapTab: FC<HeatMapTabProps> = ({ xaxis, yaxis, data }) => {
  echarts.use([
    HeatmapChart,
    GridComponent,
    TitleComponent,
    CanvasRenderer,
    TooltipComponent,
    ToolboxComponent,
    VisualMapComponent,
    VisualMapContinuousComponent,
  ]);

  const chartConfigOptions = {
    position: 'relative',
    tooltip: {
      position: 'top',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#fff',
          color: '#555',
          fontSize: '12px',
          fontWeight: 500,
        },
      },
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {},
      },
    },
    animation: false,
    grid: {
      top: '40',
      left: '60',
      right: '140',
      bottom: '60',
    },
    xAxis: {
      type: 'category',
      data: xaxis,
      name: 'FREQ(KHz)',
      // nameTextStyle: {
      //  fontSize: 10,
      //  color: '#000000',
      // },
      // axisLine: {
      //  lineStyle: {
      //    color: '#CECECE',
      //  },
      // },
      axisTick: {
        show: false,
        alignWithLabel: false,
      },
      // splitArea: {
      //  show: true,
      // },

      // axisLabel: {
      //  lineHeight: 16,
      //  color: '#B4B4B4',
      //  fontSize: 11,
      // },
    },
    yAxis: {
      type: 'category',
      data: yaxis,
      name: 'Time',
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
      // nameTextStyle: {
      //  fontSize: 10,
      //  color: '#000000',
      // },
      // axisLine: {
      //  lineStyle: {
      //    color: '#CECECE',
      //  },
      // },
      // axisLabel: {
      //  lineHeight: 16,
      //  color: '#B4B4B4',
      //  fontSize: 10,
      // },
      // position: 'left',
    },
    visualMap: {
      type: 'piecewise',
      calculable: true,
      // orient: 'horizontal',
      top: '40px',
      // right: '80px',
      left: 'right',
      align: 'left',
      // itemHeight: '200px',
      itemWidth: '40px',
      itemSymbol: 'rect',
      // fontSize: '22px',
      inverse: true,
      pieces: [
        { lte: -100 },
        { gt: -100, lte: -75 },
        { gt: -75, lte: -50 },
        { gt: -50, lte: -25 },
        { gt: -25 },
      ],
      precision: 0,
      inRange: {
        color: ['#00FF00', '#99FF00', '#FFFF00', '#FF9900', '#FF0000'],
      },
      // indicatorIcon: 'none',
      // hoverLink: false,
    },
    series: [
      {
        name: 'RSSI',
        type: 'heatmap',
        data: data,
        label: {
          show: false,
        },
        itemStyle: {
          borderWidth: 0,
          borderColor: '#fff',
          borderCap: 'square',
          borderRadius: 1,
        },
      },
    ],
  };

  return (
    <div>
      <ReactEChartsCore
        lazyUpdate
        echarts={echarts}
        option={chartConfigOptions}
        style={{ height: '100%', minHeight: '600px', width: '100%' }}
      />
    </div>
  );
};
