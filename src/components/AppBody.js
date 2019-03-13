import React, { Component } from 'react'
import './AppBody.css'
import { Route } from 'react-router-dom'
import Viewer from '../containers/Viewer'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Route path="/:chapter?" render={(params) => <Viewer chapter={params.match.params.chapter}/>} />
        </div>
      </div>
    );
  }
}

export default App
