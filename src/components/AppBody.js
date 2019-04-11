import React, { Component } from 'react'
import './AppBody.css'
import { Route } from 'react-router-dom'
import Viewer from '../containers/Viewer'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Route path="/:order?/:chapter?" render={(params) => <Viewer order={params.match.params.order} chapter={params.match.params.chapter}/>} />
        </div>
      </div>
    );
  }
}

export default App
