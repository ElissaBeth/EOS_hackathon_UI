import React, { Component } from 'react';

class Presentation extends Component {
    state = {
        upload: null,
        loading: null,
        result: null,

    }
    _handlesubmit = e => {
        e.preventdefault
        console.log('hello')
    }
    render() {
        if(!this.state.upload){
           return (
               <div class="container">
                   <div class="row">
                       <form class="col s12">
                           <div class="row">
                               <label>Submit Code For Review</label>
                               <div class="file-field input-field">
                                   <div class="btn">
                                       <span>Browse</span>
                                       <input type="file" />
                                   </div>

                                   <div class="file-path-wrapper">
                                       <input class="file-path validate" type="text"
                                           placeholder="Upload file" />
                                   </div>
                               </div>
                           </div>                                                          
                       </form>
                   </div>
                   <button class="btn waves-effect waves-light"
                   onClick={this._handlesubmit}
                   >
                    Submit
                    </button>                   
               </div>
           ) 
        }
    }
}

export default (Presentation);
