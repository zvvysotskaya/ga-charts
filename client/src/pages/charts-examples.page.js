import React from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Bubble } from 'react-chartjs-2';

const ChartsExamplesPage = () => {
    
    let data = {
        labels: ['a', 'b', 'c', 'www'],
        datasets: [
            {
                data: [{x:4, y:6}, 3, 5, 4],
                fill: true,
                backgroundColor: "rgba(75,100,22,0.5)",
                maxBarThickness: 68,
                minBarLength: 1,
                barPercentage: .9,
                label: 'AAA',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    }
    let options = {
        scales: {
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        resonsive:true
    };
    let doughnutData = {
        labels: ['aa','bb','cc','dd','ee'],
        datasets: [{
            fill: true,
            data: [255,159,34,0.4],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ]
        }
            
        ]
    }
    let lineData = {
        labels: ['aaa', 'bbb', 'ccc', 'ddd'],
        datasets: [
            {
                data: [3, 5, 2, 1],
                fill: true,
                borderColor: 'rgba(255,44,15,0.1)',
                backgroundColor: 'rgba(0, 0, 150,0.4)',
                label:'AAA'
            },
            {
                data: [4, 2, 2, 3],
                borderColor: '#00e600',
                backgroundColor: 'rgba(0, 230, 0,0.3)',
                label:'BBB'
            }]
    }
    let bubbleData = {
        labels: ['aa', 'bb', 'cc', 'dd'],
        datasets: [{
            data: [{ x: 2, y: 5 }, { x: 5, y: 5 }, {x:1, y:3}, {x:3, y:4}],
            borderColor: '#330066',
            fill: true,
            backgroundColor: 'red',
            hitRadius: 5,
            radius:11
        },
            {
                data: [{ x: 1.5, y: 4.5 }, { x: 5, y: 3}, { x: 2.5, y: 2 }, { x: 3.5, y: 6 }],
                borderColor: '#330066',
                fill: true,
                backgroundColor: 'blue',
                hitRadius: 5,
                radius: 21
            }
        ]
    }
    return (
        
        <div>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col col-md-5'>
                        <h1>Chart Examples Page</h1>
                        <Link to='/'>Home</Link><br />
                        <Link to='/analytics'>Analytics</Link><br />
                        <h2 className='text-warning'>Chart Bar</h2>
                        <Bar                            
                            data={data}
                            width={80}
                            height={70}
                            options={{ maintainAspectRatio: true }, options}
                        />
                        <h2 className='text-danger'>Doughnut</h2>
                        <Doughnut data={doughnutData} />

                        <h2 className='text-warning'>Lines</h2>
                        <Line data={lineData} />
                        <h2 className='text-info'>Bubbles</h2>
                        <Bubble data={bubbleData} options={options}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChartsExamplesPage;