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
		privateKey: '',
		acountName: '',
        submitSuccess: false,
    };
    
    componentDidUpdate() {
        
    }

	onDrop = (files) => {
		this.setState({
			files,
		});
	};

	onCancel = () => {
		this.setState({
			files: [],
		});
	};

	_handleTextFieldChange = (e) => {
		this.setState({
			accountName: e.target.value,
		});
	};

	_handleKeyFieldChange = (e) => {
		this.setState({
			privateKey: e.target.value,
		});
	};

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
		return api;
	};

	log = () => {
		console.log()
	}

	onSubmit = async () => {
		const api = this.getApi();

		const result = await api.transact(
			{
				actions: [
					{
						account: 'eosio.token',
						name: 'transfer',
						authorization: [
							{
								actor: this.state.acountName,
								permission: 'active',
							},
						],
						data: {
							from: this.state.acountName,
							to: 'eosecure',
							quantity: '0.0001 EOS',
							memo: '',
						},
					},
				],
			},
			{
				blocksBehind: 3,
				expireSeconds: 30,
			}
		);

		if (result) {
            console.log(result)
            this.setState({ submitSuccess: true })
		}
		else {
			console.log('nothing')
		}
	};

	render() {
		if (this.state.files.length == 0) {
			return (
				<div>
					<Dropzone onDrop={this.onDrop.bind(this)} onFileDialogCancel={this.onCancel.bind(this)}>
						<p>Click Here to upload your contract</p>
					</Dropzone>
				</div>
			);
		}
		if (this.state.files.length > 0) {
			return (
				<div>
					<Dropzone onDrop={this.onDrop.bind(this)} onFileDialogCancel={this.onCancel.bind(this)}>
						<p>Click Here to upload your contract</p>
					</Dropzone>
					<ul>
						{this.state.files.map((f) => (
							<li key={f.name}>
								{f.name} - {f.size} bytes
							</li>
						))}
					</ul>
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
					<Button onClick={this.log()}>Submit for Review</Button>
				</div>
			);
		}
	}
}

export default (UploadBox);
