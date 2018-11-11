import React, { Component } from 'react';
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs'; // https://github.com/EOSIO/eosjs
import { TextDecoder, TextEncoder } from 'text-encoding';

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

//componenets
import UploadBox from '../UploadBox';
import Presentation from '../Presentation';

class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,


        }
    }
    render() {
        if(!this.state.user) {
            return <div>
                        <nav>
                            <div class="nav-wrapper grey darken-3">
                                <div class="container">
                                    <a href="#" class="brand-logo">
                                        EOSecure
                                    </a>
                                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                                        {/* <Button variant="contained" color="primary">
                                            Login
                                        </Button> */}
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <Presentation />                        
                        {/* <div class="container">
                            <div class="container">
                                <UploadBox />
                            </div>    
                        </div> */}
					</div>
        }
        return (
            <h1>Logged</h1>
        )
    }     
}

export default (Homepage);