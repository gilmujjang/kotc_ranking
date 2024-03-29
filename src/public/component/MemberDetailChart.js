import { useEffect } from "react";
import { Line } from "react-chartjs-2";

const MemberDetailChart = ({
  chartMode,
  period,
  playersGame,
  playerDetailTarget,
}) => {
  function getRating(STD_Date) {
    const wanted = playersGame.find((el) => el.date - STD_Date <= 0)
      ? playersGame.find((el) => el.date - STD_Date <= 0)
      : playerDetailTarget.start_rating;

    if (typeof wanted === "number" || typeof wanted === "string") {
      return Number(wanted);
    } else if (wanted.winners.includes(playerDetailTarget.name)) {
      return wanted.winnerRatingAfter[
        wanted.winners.indexOf(playerDetailTarget.name)
      ];
    } else if (wanted.losers.includes(playerDetailTarget.name)) {
      return wanted.loserRatingAfter[
        wanted.losers.indexOf(playerDetailTarget.name)
      ];
    }
  }

  function getDate(STD_Date) {
    let year = STD_Date.getFullYear();
    let month = STD_Date.getMonth() + 1;
    let day = STD_Date.getDate();

    month = month >= 10 ? month : `0${month}`;
    day = day >= 10 ? day : `0${day}`;

    return `${year}${month}${day}`;
  }

  function getNewDateForm(STD_Date) {
    return `${STD_Date.slice(4, 6)}월 ${STD_Date.slice(6)}일`;
  }

  function getToday() {
    const date = new Date("June 05, 2021 12:00:00");

    return getDate(date);
  }

  function lastDays(day) {
    const date = new Date("June 05, 2021 12:00:00");
    const dayOfDate = date.getDate();
    date.setDate(dayOfDate - day);

    return getDate(date);
  }

  const getDataLabels = (period) => {
    let dataLabels = [];

    for (let i = 0; i < period; i++) {
      dataLabels.push(getNewDateForm(lastDays(period - i)));
    }

    dataLabels.push(getNewDateForm(getToday()));

    return dataLabels;
  };

  const getDatas = (period) => {
    let datas = [];

    for (let i = 0; i < period; i++) {
      datas.push(getRating(lastDays(period - i)));
    }
    datas.push(getRating(getToday()));

    return datas;
  };

  const dataLabels = () => {
    switch (period) {
      case "30":
        return getDataLabels(period);
      case "60":
        return getDataLabels(period);
      case "90":
        return getDataLabels(period);
      default:
        break;
    }
  };

  const datas = () => {
    if (chartMode === "rating") {
      switch (period) {
        case "30":
          return getDatas(period);
        case "60":
          return getDatas(period);
        case "90":
          return getDatas(period);
        default:
          break;
      }
    } else {
      switch (period) {
        case "30":
        case "60":
        case "90":
        default:
          break;
      }
    }
  };

  return (
    <Line
      data={{
        labels: dataLabels(),
        datasets: [
          {
            label: "Rating",
            data: datas(),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }}
      options={{ maintainAspectRatio: false }}
    />
  );
};

export default MemberDetailChart;
