import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

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
                <h1>pass</h1>
            )
        }

        if (this.state.fail) {
            return (
                <h1>fail</h1>
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
