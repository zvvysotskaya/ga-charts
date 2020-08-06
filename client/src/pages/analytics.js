import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Doughnut } from 'react-chartjs-2';

const AnalyticsPage = () => {
    const [jwtToken, setJwtToken]=useState('')
    useEffect(() => {
        ReactGA.initialize('UA-174274577-1');
        ReactGA.pageview('/analytics');
    }, [])
    useEffect(() => {
      
    }, [])
   ////buttons
    const handleClick = (e) => {
        e.preventDefault()
        ReactGA.event({
            category: 'ButtonClickMe!!',
            action: 'Check button clickMe!!',
            label: 'Hello'
        });
        ReactGA.ga('send', 'pageview', '/');
        console.log("Click occured!!!")
    }
    const generateToken = (e) => {
        e.preventDefault()
        fetch('/getToken')
            .then(r => r.text())
            .then(e => setJwtToken(e))
            .then(console.log('token from state: ' + jwtToken))
        .catch(er=>console.log(er))
    }
    useEffect(() => {
        if (jwtToken !== '') {
            localStorage.setItem('JWTtoken', jwtToken)
        } else {
            return
        }
    }, [jwtToken])
    useEffect(() => {
        
    }, [])
    const[val, setVal]=useState([])
    const generateGraphic = (e) => {
        e.preventDefault()
        fetch('/createFirstGraph')
            .then(re => re.json())
            .then(re => setVal(re))
            .catch(er => console.log(er))
        
       
    }   
    let doughnutDataArr = []
    let doughnutLablesArr = [];
    (function createLables() {
        if (val !== undefined) {
            doughnutLablesArr.push(val.map(el => Object.keys(el)[0]).toString())
        //    setDoughnutData1(doughnutDataArr)
            console.log('aa: ' + doughnutLablesArr)
           
            // ddata.push( val.map(el => Object.values(el)[0]).toString())//all values from array
        } else {
            console.log('click to select object')
            return
        }
    })();
         (function createData() {
             if (val !== undefined) {
                 doughnutDataArr.push(val.map(el => Object.values(el)[0]).toString())
                 console.log('bb: ' + doughnutDataArr)
                 // ddata.push( val.map(el => Object.values(el)[0]).toString())//all values from array
             } else {
                 console.log('click to select object')
                 return
             }
    })()
   
    function createDoughnut() {
        console.log('my data: ' + doughnutDataArr)
        let doughnutData = {
            labels: ['a', 'b'],
            datasets: [{
                fill: true,
                data: doughnutDataArr,
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
    
  //  console.log('doughnutData1: ' + Array.isArray(doughnutData1))
 //   console.log('doughnutLables: ' + doughnutLables)

    //charts
    
    return (
        <div>
            <h1>Google Analytics page</h1>
            <Link to='/'>Home Page</Link><br />
            <Link to='/charts'>Charts Page</Link><br /><br />
           
            <button onClick={generateToken}>GENERATE TOKEN</button><br/><br/><br/>
            <button onClick={handleClick}>GOOGLE GENERATE EVENT</button><br /><br /><br />
            <button onClick={generateGraphic}>First Graph</button>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
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