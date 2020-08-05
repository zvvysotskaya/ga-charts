import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';


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
        .catch(er=>console.log(er))
    }
    console.log('Token jwt:' + jwtToken)
    console.log('local storage Token jwt:' + localStorage.getItem('JWTtoken'))
    console.log('Users per browsers: ' + JSON.stringify(val))
    return (
        <div>
            <h1>Google Analytics page</h1>
            <Link to='/'>Home Page</Link><br />
            <Link to='/charts'>Charts Page</Link><br /><br />
           
            <button onClick={generateToken}>GENERATE TOKEN</button><br/><br/><br/>
            <button onClick={handleClick}>GOOGLE GENERATE EVENT</button><br /><br /><br />
            <button onClick={generateGraphic}>First Graph</button>
        </div>
    )
}
export default AnalyticsPage;