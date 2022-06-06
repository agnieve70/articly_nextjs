import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import FormContainer from './FormContainer';

ChartJS.register(ArcElement, Tooltip, Legend);

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function CovidChart(props) {

    let labels = [];
    let cases = [];
    let colors =[];

    props.covid.length > 0 &&
      props.covid.map((item, index) => {
        labels.push(item.region);
        cases.push(item.cases);
        colors.push(getRandomColor());
      });
    
const data = {
  labels: labels,
  datasets: [
    {
      label: "# of Votes",
      data: cases,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1,
    },
  ],
};

  return (
    <FormContainer
      title={"COVID 19 Top Regions Active"}
      withLogo={false}
      colSize={"col-md-12"}
    >
      <Pie data={data} />
    </FormContainer>
  );
}

export default CovidChart