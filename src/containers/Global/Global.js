
import './Global.css';
import NumberFormat from 'react-number-format';

import React, { Component } from 'react';
import WorldStats from '../../components/WorldStats/WorldStats';
import axios from 'axios';

class Global extends Component {
    constructor(props){
        super(props);
        this.state ={
            result: {
                "TotalConfirmed":0,
                "TotalDeaths":0,
                "TotalRecovered":0,
                "ActiveCases":0
            }
        }

    }

    

    async componentDidMount(){
        console.log("in componend did mount");
        var globalData = await axios.get("https://api.covid19api.com/summary");

        let corona  = globalData.data.Global;
        this.setState({
            result:{
                "TotalConfirmed": corona.TotalConfirmed,
            "TotalDeaths": corona.TotalDeaths,
            "TotalRecovered": corona.TotalRecovered,
            "ActiveCases": corona.TotalConfirmed - (corona.TotalRecovered+ corona.TotalDeaths)
            }
        })
    }

    render() {

        var Stats = Object.keys(this.state.result).map((key,index)=>{
            return <WorldStats
                        key={index}
                        about={key}
                        total={<NumberFormat value= {this.state.result[key]} thousandSeparator={true} displayType="text"/>} />
        });
        return (
            <div className="Global">
                <h1 className="heading">Covid-19 Tracker</h1>
                <p className="description">Let's check Information about Covid-19</p>

                <div className="world-stats">
                   {Stats}

                </div>
            </div>
        );
    }
};

export default Global;