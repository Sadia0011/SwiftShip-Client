import React from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import ReactApexChart from 'react-apexcharts';
const Statistics = () => {
    const chartOptions = {
        // Define your chart options here
        chart: {
          type: 'bar',
        },
        series: [
          {
            name: 'Series 1',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
          },
        ],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
    }
    return (
        <div>
            <SectionTitle heading={"Statistics"} subheading={"Overall"}></SectionTitle>
            <div>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={350}
      />
    </div>
        </div>
    );
};

export default Statistics;