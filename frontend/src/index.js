import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import registerServiceWorker from 'utils/registerServiceWorker'
import 'assets/styles/core.css'
import HomePage from './components/HomePage'

ReactDOM.render(<HomePage />, document.getElementById('root'))
registerServiceWorker()
