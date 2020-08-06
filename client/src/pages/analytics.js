import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Doughnut } from 'react-chartjs-2';

const AnalyticsPage = () => {
    
    useEffect(() => {
        ReactGA.initialize('UA-174274577-1');
        ReactGA.pageview('/analytics');
    }, [])
   ////buttons
    const handleClick = (e) => {
        e.preventDefault()
        ReactGA.event({
            category: 'ButtonClickMe!!',
            action: 'Check button clickMe!!',
            label: 'Hello'
        });
        console.log("Event occured!!!")
    }
     
    const[val, setVal]=useState([])
    const generateGraphic = (e) => {
        e.preventDefault()
        fetch('/createFirstGraph')
            .then(re => re.json())
            .then(re => setVal(re))
            .catch(er => console.log(er))
    }
    function createLables() {
        if (val !== undefined) {
            let doughnutLablesArr = val.map(el => Object.keys(el)[0])            
            return doughnutLablesArr
        } else {           
            return
        }
    }
    createLables()
         function createData() {
             if (val !== undefined) {
                let doughnutDataArr=val.map(el => Object.values(el)[0])                 
                 return doughnutDataArr
             } else {                 
                 return
             }
    }
    createData()   
    function createDoughnut() {       
        let doughnutData = {
            labels: createLables(),
            datasets: [{
                fill: true,
                data: createData(),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ]
            }
            ]
        }
         return doughnutData
    }
    return (
        <div>
            <h1>Google Analytics page</h1>
            <Link to='/'>Home Page</Link><br />
            <Link to='/charts'>Charts Page</Link><br /><br />            
            <button onClick={handleClick}>GENERATE EVENT</button><br /><br /><br />
            <button onClick={generateGraphic}>Click to generate a graph</button>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-md-6 offset-md-3'>
                        <h2 className='text-center'>The Browsers used by Users</h2>
                        {val!== undefined ? < Doughnut data={createDoughnut} /> : ''}
                    </div>
                    <div className='col col-md'>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AnalyticsPage;