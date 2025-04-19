'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface ChartProps {
  data: ChartData[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  colors?: string[];
  dataKeys?: string[];
}

const Chart: React.FC<ChartProps> = ({
  data,
  title,
  xAxisLabel,
  yAxisLabel,
  height = 400,
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  dataKeys = ['value']
}) => {
  return (
    <div className="my-8 w-full">
      {title && <h4 className="text-lg font-semibold mb-4 text-center">{title}</h4>}
      <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="name" 
              label={{ 
                value: xAxisLabel, 
                position: 'insideBottom', 
                offset: -10 
              }} 
            />
            <YAxis 
              label={{ 
                value: yAxisLabel, 
                angle: -90, 
                position: 'insideLeft' 
              }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '0.375rem',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }} 
            />
            <Legend />
            {dataKeys.map((key, index) => (
              <Bar 
                key={key}
                dataKey={key} 
                fill={colors[index % colors.length]} 
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
