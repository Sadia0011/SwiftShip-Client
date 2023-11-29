import React from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
const Statistics = () => {
   const axiosSecure=useAxiosSecure()
  const{data:bookParcel=[],refetch}=useQuery({
    queryKey:["bookParcel"],
    queryFn:async()=>{
      const res=await axiosSecure.get("/bookParcel")
      return res.data;
    }
  })
  const dates = bookParcel.map((booking) => booking.bookingDate);
  const counts = dates.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(counts).map(([date, count]) => ({
    x: date,
    y: count,
  }));

  const options = {
    chart: {
      id: 'booking-chart',
    },
    xaxis: {
      type: 'category',
      categories: dates,
    },
  };

  const series = [
    {
      name: 'Bookings',
      data: chartData,
    },
  ];
    return (
        <div>
            <SectionTitle heading={"Statistics"} subheading={"Overall"}></SectionTitle>
            <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={500}
      />
    </div>
        </div>
    );
};

export default Statistics;