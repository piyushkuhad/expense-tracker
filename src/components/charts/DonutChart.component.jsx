import React, { PureComponent } from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from 'recharts';
import { currencyFormat } from '../../utils/utilFn';

import './Charts.styles.scss';

class DonutChart extends PureComponent {
  render() {
    const { chartData, chartColors, currency, line1, line2 } = this.props;

    return (
      <ResponsiveContainer>
        <PieChart onMouseEnter={this.onPieEnter}>
          <Pie
            data={chartData}
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {line1 ? (
              <Label
                value={line1}
                position="centerBottom"
                className="label-top"
              />
            ) : null}
            {line2 ? (
              <Label
                value={line2}
                position="centerTop"
                className="label-bottom"
                fill="#009933"
              />
            ) : null}
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartColors[index % chartColors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${currency} ${currencyFormat(value)}`}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

DonutChart.defaultProps = {
  chartData: [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ],
  chartColors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
  currency: '₹',
  line1: null,
  line2: null,
};

export default DonutChart;
