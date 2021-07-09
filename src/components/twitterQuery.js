import React, { Component } from 'react';
import axios from 'axios';
import data from './data/dummyData.json';
import data2 from './data/dummyData2.json';
import data3 from './data/dummyData3.json';
import data4 from './data/dummyData4.json';
import data5 from './data/dummyData5.json';

export class TwitterQuery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
    }

    handleInput(event) {
        this.setState({
            query: event.target.value
        });
    }

    handleSubmission() {
        if(this.state.query !== '')
            this.queryThreat(this.state.query);
    }

    pressEnter(event) {
        if(event.key==="Enter"){
            if(this.state.query !== '')
                this.queryThreat(this.state.query);
        }
    }


    async queryThreat(query) {
        this.props.toggleResults();
        // actual api comment out this for bottom to work
        // await this.apiQuery(query);

        //dummyData comment out below for above to work
        let result=this.dummyApiQuery(query)
        this.parseData(result);
        this.props.displayQuery(query);
        this.setState({query:""});
    }
    
 

    parseData(result) {

        let index = 0;
        
        for(let i = 0;i<result.length;i+=2){
            let value = this.formatInteger(result[i+1]);

            this.props.displayThreat(value+1,index);
            this.props.displayTitle(result[i],index);
            this.props.timerToggle(index);
            index++;
        }

    }

    formatInteger(input) {

        const value = input.replace("%","");
        return parseInt(value);
    }

    async apiQuery(query) {

        let result;
        console.log(query)
        axios.post("https://threat-detective.herokuapp.com/",{twitterHandle:query})
        // axios.post("http://127.0.0.1:8000/", {"twitterHandle": "hexx_king"})
        .then(response => {
            result=(response.data);
            this.parseData(result.ThreatReport);
            this.props.displayQuery(query);
            this.setState({query:""});
        });
        return result;  
        
    }
    
    dummyApiQuery(query) {
        let result;

        switch (query){
            case "mtgreenee":
                result=this.dummyHelper(data);
                break;
            case "oprah":
                result=this.dummyHelper(data2);
                break;
            case "sethrogan":
                result=this.dummyHelper(data3);
                break;
            case "tuckercarlson":
                result=this.dummyHelper(data4);
                break;
            default:
                result=this.dummyHelper(data5);
                break;
        }
        return result;
    }
    
    dummyHelper(data) {
        
        let result = [];
    
        for(let i = 0;i<data.ThreatReport.length;i++){
            let item = data.ThreatReport[i];
            result.push(item);
        }
        
        return result;
    }



    render() {
        return (
            <div className="twitterQuery">
                <div>
                    <label>Enter Twitter Handle</label>
                    <input onKeyPress={this.pressEnter.bind(this)} type="text" value={this.state.query} onChange={this.handleInput.bind(this)} placeholder="   Twitter Handle" required/>
                </div>
                    <button onClick={this.handleSubmission.bind(this)}>Submit</button>
            </div>
        )
    }
}

export default TwitterQuery;