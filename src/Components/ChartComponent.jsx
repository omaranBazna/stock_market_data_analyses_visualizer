import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

//const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



 function ChartComponent({dataObject,labels,average,partial_average,start_day,end_day}) {

  if(!labels || !dataObject ){
   return 
  }


  const data = {
    labels,
    datasets: [
      {
        label: 'Open',
        data: labels.map((label) =>{
          
          if(dataObject[label]){
         
           return dataObject[label]["1. open"]
          }else{
            return 0
          }
        } ),
        borderColor: 'rgb(107, 234, 75)',
        backgroundColor: 'rgba(13, 200, 44, 0.754)',
      },
      
      {
          label: 'Close',
          data: labels.map((label) =>{
            
            if(dataObject[label]){
             console.log(dataObject[label]["4. close"])
             return dataObject[label]["4. close"]
            }else{
              return 0
            }
          } ),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
        ,
        
        {
          label: 'Average open',
          data: labels.map((label) =>{
             console.log(average)
          
             return average
            
          } ),
          borderColor: 'rgb(255, 179, 2)',
          backgroundColor: 'rgba(255, 179, 2, 0.893)',
        },
        {
          label: 'Partial Average',
          data: labels.map((label,index) =>{
             
            if(index>=start_day && index<=end_day){
             return partial_average
            }
            
          } ),
          borderColor: 'rgb(255, 78, 2)',
          backgroundColor: 'rgba(255, 74, 2, 0.893)',
        }
      
    ],
  };


  return <Line options={options} data={data} />;
}
export default ChartComponent


