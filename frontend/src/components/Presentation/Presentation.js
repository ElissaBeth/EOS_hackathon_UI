import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
const prettyHtml = require('json-pretty-html').default;

const Failed = {
    "scanresults": {
        "name": "TestContract",
        "id": "1855739281728394",
        "quote": "500",
        "vulnerabilities": {
            "vuln_1": {
                "name": "bet_transfer_hack",
                "count": "1",
                "line_num": "1",
                "error_code": [
                    "void transfer(uint64_t sender, uint64_t receiver) {",
                    "",
                    "    auto transfer_data = unpack_action_data<st_transfer>();",
                    "",
                    "",
                    "",
                    "    if (transfer_data.from == _self || transfer_data.from == N(eosbetcasino)) {",
                    "        return;",
                    "    }",
                    "",
                    "    eosio_assert(transfer_data.quantity.is_valid(), 'Invalid asset');",
                    "",
                    "    const uint64_t your_bet_amount = (uint64_t)transfer_data.quantity.amount;",
                    "    eosio_assert(MINBET <= your_bet_amount, 'Must be greater than min');",
                    "",
                    "    increment_liabilities_bet_id(your_bet_amount);",
                    "",
                    "    std::string roll_str;",
                    "    std::string ref_str;",
                    "    std::string seed_str;",
                    "",
                    "    const std::size_t first_break = transfer_data.memo.find(' - ');",
                    "    roll_str = transfer_data.memo.substr(0, first_break);",
                    "}",
                ]
            }
        }
    }
}
const pFailed = prettyHtml(Failed, Failed.dimensions);

const Passed = {
    "scanresults": {
        "name": "TestContract",
        "id": "1855739281728394",
        "quote": "0",
        "vulnerabilities": 'no vulnerabilities found'
    }
}
const pPassed = prettyHtml(pPassed, Passed.dimensions);

class Presentation extends Component {
    state = {
        upload: null,
        loading: null,
        result: null,
        fileName: "",
        files: [],
        pass: null,
        fail: null,

    }

    componentDidUpdate() {
        if (this.state.loading) {
            setTimeout(this.showResult, 3000)
        }
        JSON.stringify(Failed)
    }

    _handlesubmit = () => {

        this.setState({ submit: true })
        this.setState({ loading: true })
    }

    onDrop = (files) => {
        this.setState({
            files,
        });
        this.setState({
            upload: true
        })
    };

    onCancel = () => {
        this.setState({
            files: [],
        });
    };

    _loadingScreen = () => {

    }
    showResult = () => {
        if (this.state.files[0].name == 'EOSBet_update.cpp'){
            this.setState({pass: true})
            this.setState({ loading: null })
        }

        if (this.state.files[0].name == 'EOSBet.cpp') {
            this.setState({ fail: true })
            this.setState({ loading: null });
        }

    }


    
    render() {
        if (this.state.pass){
            return (
                <div class='container'>{(JSON.stringifyPassed)}</div>
            )
        }

        if (this.state.fail) {
            return (
                <div class='container'>{JSON.stringify(Failed)}</div>
            )
        }

        if (this.state.loading){
            return(
                <div class="container">
                    <img src="gear.gif" /> 
                </div>
            )    
        } 
        if(!this.state.upload){
           return (
               <div class="container">
               <div>
                   <Dropzone onDrop={this.onDrop.bind(this)} onFileDialogCancel={this.onCancel.bind(this)}>
                       <p>Click Here to upload your contract</p>
                   </Dropzone>
                </div>   
                   <button class="btn waves-effect waves-light"
                   onClick={this._handlesubmit}
                   disabled="true"
                   >
                    Submit
                    </button>                   
               </div>
           ) 
        }

        if(this.state.files.length > 0){
            return (
                <div class="container">
                    <ul>
                        {this.state.files.map((f) => (
                            <li key={f.name}>
                                {f.name} - {f.size} bytes
                                </li>
                        ))}
                    </ul>

                    <button class="btn waves-effect waves-light"
                        onClick={this._handlesubmit}
                    >
                        Submit
                        </button>                      
                {console.log(this.state.files[0].name)}
                </div>
            )

        }
    }
}

export default (Presentation);
