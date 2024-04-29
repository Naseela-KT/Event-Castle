import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { axiosInstanceAdmin } from "../../../config/api/axiosinstance";

const getCategories = (date: string) => {
  if (date === "month") {
    return [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  } else if (date === "week") {
    return [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
  } else {
    return ["2020", "2021", "2022", "2023", "2024"];
  }
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const RevenueChart: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<number[]>([]);
  const [date, setDate] = useState<string>("month");
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    // Corrected reference to `dateRange` in `xaxis`
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: getCategories(date),
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 1000,
      max: 10000,
    },
  });
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: "Product One",
        data: monthlyData,
      },
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  useEffect(() => {
    axiosInstanceAdmin
      .get(`/revenue?date=${date}`)
      .then((res) => {
        console.log(res.data.revenue);
        const revenueData = res.data.revenue;
        if (Array.isArray(revenueData)) {
          setMonthlyData(revenueData);
          setState({
            series: [
              {
                name: "Revenue",
                data: revenueData,
              },
            ],
          });
        } else {
          console.error("Invalid data format for monthlyRevenue");
        }
      })
      .catch((error) => {
        console.error("Error fetching revenue:", error);
      });
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: getCategories(date), // Ensure x-axis is updated
      },
    }));
  }, [date]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              onClick={() => setDate("week")}
              className={`${date == "week" ? "bg-gray-200 shadow-card" : ""} rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}
            >
              Week
            </button>
            <button
              onClick={() => setDate("month")}
              className={`${date == "month" ? "bg-gray-200 shadow-card" : ""} rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}
            >
              Month
            </button>
            <button
              onClick={() => setDate("year")}
              className={`${date == "year" ? "bg-gray-200 shadow-card" : ""} rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={chartOptions}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
