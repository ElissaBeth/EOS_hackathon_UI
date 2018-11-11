import React, { Component } from 'react';
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs'; // https://github.com/EOSIO/eosjs
import { TextDecoder, TextEncoder } from 'text-encoding';
import Dropzone from 'react-dropzone';

//material-ui dependencies
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class UploadBox extends Component {
    state = {
        files: [],
        textFieldValue: '',
        PrivateKey: '',
        acountName: '',
    }

    onDrop = (files) => {
        this.setState({
            files
        });
    }

    onCancel = () => {
        this.setState({
            files: []
        });
    }

    _handleTextFieldChange = (e) => {
        this.setState({
            textAcctounNameValue: e.target.value
        });
    }
    
    getApi = () => {
        const PrivateKey = this.state.PrivateKey; // useraaaaaaaa
        const signatureProvider = new JsSignatureProvider([PrivateKey]);
        const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
        const api = new Api({
					rpc,
					signatureProvider,
					textDecoder: new TextDecoder(),
					textEncoder: new TextEncoder(),
                });
        return api
        };

    onSubmit = () => {
        const api = this.getApi()

        api.transact({
            actions: [{
                account: 'eosecure',
                name: 'transfer',
                authorization: [{
                    actor: this.state.acountName,
                    permission: 'active',
                }],
                data: {
                    from: 'useraaaaaaaa',
                    to: 'useraaaaaaab',
                    quantity: '0.0001 SYS',
                    memo: '',
                },
            }]
        }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
    }    

    render() {
        if (this.state.files.length == 0) {
            return (
                <div>
                    <Dropzone
                        onDrop={this.onDrop.bind(this)}
                        onFileDialogCancel={this.onCancel.bind(this)}
                    >
                        <p>Click Here to upload your contract</p>
                    </Dropzone>
                </div>
            )
        }
        if (this.state.files.length > 0){
            return (
                <div>
                    <Dropzone
                        onDrop={this.onDrop.bind(this)}
                        onFileDialogCancel={this.onCancel.bind(this)}
                    >
                        <p>Click Here to upload your contract</p>
                    </Dropzone>
                    <ul>
                        {
                            this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                        }
                    </ul>
                    <TextField
                        id="standard-full-width"
                        label="Account Name"
                        style={{ margin: 8 }}
                        placeholder="Placeholder"
                        helperText="Full width!"
                        fullWidth
                        margin="normal"
                        value={this.state.acctounNameValue} 
                        onChange={this._handleTextFieldChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Private Key"
                        style={{ margin: 8 }}
                        placeholder="Placeholder"
                        helperText="Full width!"
                        fullWidth
                        margin="normal"
                        value={this.state.textFieldValue}
                        onChange={this._handleTextFieldChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>    
            )
        }
    }    
}

export default (UploadBox);
