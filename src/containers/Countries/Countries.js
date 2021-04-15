import React, { Component } from 'react';

import './Countries.css';
import HeadingNames from '../../components/HeadingNames/HeadingNames';
import CountryDetails from '../../components/CountryDetails/CountryDetails';
import axios from 'axios';
import ArraySort from 'array-sort';
import NumberFormat from 'react-number-format';

export default class Countries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryDetails: [],
            searchedCountries: [],

        }
    }

    async componentDidMount() {
        var data = await axios.get("https://api.covid19api.com/summary");

        var countryDetails = data.data.Countries;
        countryDetails = ArraySort(countryDetails,'TotalConfirmed',{reverse:true})
        // console.log("Countries",countryDetails);
        this.setState({
            countryDetails: countryDetails,
            status: true,
            selectedData: countryDetails
        })
    }

    changeSortValue =(e)=>{
        const value = e.target.value;
        let sortbyReverse = true;

        if(value=="Highest"){
            sortbyReverse=true;
        }else{
            sortbyReverse= false;
        }

        let countryDetails = ArraySort(this.state.countryDetails,'TotalConfirmed',{reverse:sortbyReverse});

        this.setState({
            countryDetails:countryDetails, status:true});
    }


    searchCountry =(e)=>{
        const value = e.target.value;

        const countryDetails = this.state.countryDetails;

        var findSpecificCountry = [];

        if(value){
            countryDetails.map(function(cur,index){
                const finder = cur.Country.toLowerCase().search(value.toLowerCase());

                if(finder !== -1){
                    findSpecificCountry.push(countryDetails[index]);
                }
            })

            findSpecificCountry = ArraySort(findSpecificCountry,'TotalConfirmed',{reverse:true});
            this.setState({
                searchedCountries: findSpecificCountry
            })
        }else{
            this.setState({
                countryDetails:countryDetails,

            })
        }

        if(value.length==0){
            this.setState({
                selectedData: this.state.countryDetails,
            })
        }else{
            this.setState({selectedData: this.state.searchedCountries})
        }
    }



    render() {

        const changeNumberToFormat = function(val){
            return <NumberFormat value={val} thousandSeparator={true} displayType="text"/>
        }

        var countriesList = this.state.countryDetails.length > 0 ?
            this.state.selectedData.map(function (cur, index) {
                return <CountryDetails
                    key={index}
                    countryCode={cur.CountryCode}
                    country = {cur.Country}
                    totalCases={changeNumberToFormat(cur.TotalConfirmed)}
                    newCases={changeNumberToFormat(cur.NewConfirmed)}

                    totalDeaths={changeNumberToFormat(cur.TotalDeaths)}
                    newDeaths={changeNumberToFormat(cur.NewDeaths)}

                    totalRecovered={changeNumberToFormat(cur.TotalRecovered)}
                    newRecovered={changeNumberToFormat(cur.NewRecovered)}

                />
            }) : null



        return (
            <div className="countries-stats">
                <h2 className="countries-stats-heading">Countries Stats</h2>
                <div className="filtering">
                    <input type="text" placeholder="Enter Country name" onChange={this.searchCountry}/>
                    <select className="sort-by" onChange={this.changeSortValue}>
                        <option>Highest</option>
                        <option>Lowest</option>
                    </select>
                </div>
                <HeadingNames />
                {countriesList}

            </div>
        )
    }
}