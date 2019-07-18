import React from 'react'
import PropTypes from 'prop-types'
import { Component } from 'react'
import CETEI from '../../node_modules/CETEIcean/src/CETEI'
import './TeiViewer.css'
import TeiElement from '../containers/TeiElement'

export default class TeiViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teiData: null,
      abs: []
    }
  }

  componentDidMount() {
    this.refs.teiData.innerHTML = 'Rendering TEI...'
    // Render TEI with CETEIcean
    const cc = new CETEI()
    // override CETEIcean default behaviors
    cc.addBehaviors({
      tei: {
        ptr: null,
        ref: null
      }
    })
    cc.makeHTML5(this.props.teiData, (teiData) => {
      this.setState({teiData: teiData})
      this.refs.teiData.innerHTML = ''
      if (!this.props.dataType === 'MishnahChapter' && !this.props.dataType === 'ToseftaChapter') {
        this.setState({abs: Array.from(teiData.querySelectorAll('tei-ab'))})
      }
    })
  }

  getChapter(chapter) {
    this.props.getContextChapter(chapter)
  }

  render() {
    let type = this.props.dataType === 'MishnahChapter' || this.props.dataType === 'ToseftaChapter' ? 'Simple' : 'Tosefta'
    let teiContent
    if (this.state.abs.length > 0) {
      teiContent = this.state.abs.map((ab, i) => {
        return (
          <div key={i}>
            <div className="Ab" onClick={() => {
              this.getChapter(ab.getAttribute('xml:id').replace(/ref-t\.(\d+\.\d+\.\d+)\.\d+/, '$1'))
            }}>
              {ab.getAttribute('n')}
            </div>
            <TeiElement 
              teiDomElement={ab}
              dataType={this.props.dataType}
              viewerType={this.props.type}
              getContextChapter={this.props.getContextChapter}
              clearContextChapter={this.props.clearContextChapter}/>
          </div>
        )
      })
    } else if (this.state.teiData) {
      teiContent = <TeiElement
        teiDomElement={this.state.teiData}
        dataType={this.props.dataType}
        viewerType={this.props.type}
        getContextChapter={this.props.getContextChapter}
        clearContextChapter={this.props.clearContextChapter}/>
    }
    return <div ref="teiData" className={`Tei ${type}`}>{ teiContent }</div>
  }
}

TeiViewer.propTypes = {
  teiData: PropTypes.string.isRequired,
  type: PropTypes.string,
  dataType: PropTypes.string,
  alignmentData: PropTypes.array,
  getContextChapter: PropTypes.func,
  clearContextChapter: PropTypes.func
}
