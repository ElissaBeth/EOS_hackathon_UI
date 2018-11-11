import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import TextField from '@material-ui/core/TextField';

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
        purchase: null,
        paid: null,

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

    _handlepurchase = () => {
        this.setState({ purchase: true})
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

    showPurchased = () => {
        if (this.state.files[0].name == 'EOSBet.cpp') {
            this.setState({ paid: true })
        }
    }


    
    render() {

        if (this.state.paid) {
            return (
                <div class='container'>
                    <h1> vulnerability information </h1>
                    <div>
                        {JSON.stringify(Failed)}
                    </div>
                </div>
            )
        }

        if (this.state.purchase){
            return (
            <div class='container'>
                <TextField
                    id="standard-full-width"
                    label="Account Name"
                    style={{ margin: 8 }}
                    placeholder="Enter Account Name"
                    fullWidth
                    margin="normal"
                    value={this.state.accountName}
                    onChange={this._handleTextFieldChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="standard-full-width"
                    label="Private Key"
                    style={{ margin: 8 }}
                    placeholder="Enter Private Key Here"
                    fullWidth
                    margin="normal"
                    value={this.state.PrivateKey}
                    onChange={this._handleKeyFieldChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                    <button class="btn waves-effect waves-light" onClick={this.showPurchased}
                   >
                    See Results
                    </button>  
            </div>
            )
        }

        if (this.state.pass){
            return (
                <div class='container'>
                    <h1> No vulnerabilities found</h1>
                    <button>Scan Another File?</button>
                </div>
            )
        }

        if (this.state.fail) {
            let results = this.state.files[0].name
            return (
                <div class='container'>
                    <h1> 1 vulnerability found in: {results}</h1>
                    <button class="btn waves-effect waves-light"
                        onClick={this._handlepurchase}
                   >
                    Purchase Details
                    </button>
                    <br/>
                    <br/>
                    <button class="btn waves-effect waves-light" href='/'
                   >
                    Scan Another File?
                    </button>  
                </div>
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
