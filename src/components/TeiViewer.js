import React from 'react'
import PropTypes from 'prop-types'
import { Component } from 'react'
import CETEI from '../../node_modules/CETEIcean/src/CETEI'
import './TeiViewer.css'

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
    cc.makeHTML5(this.props.teiData, (teiData) => {
      this.setState({teiData: teiData})
      this.refs.teiData.innerHTML = ''
      if (this.props.dataType === 'MishnahChapter' || this.props.dataType === 'ToseftaChapter') {
        this.refs.teiData.appendChild(teiData)
      } else {
        this.setState({abs: Array.from(teiData.querySelectorAll('tei-ab'))})
      }
    })
  }

  componentDidUpdate() {
    this.doHighlights()
  }

  doHighlights() {
    if (this.state.teiData) {
      const type = this.props.dataType === 'MishnahChapter' || this.props.dataType === 'AlignedMishnah' ? 'm' : 't'
      // Set highlights and click events
      for (const [i, link] of this.props.alignmentData.entries()) {
        for (const [j, id] of link[type].entries()) {
          const w = this.refs.teiData.querySelector(`[*|id="${id}"]`)
          if (w) {
            if (link.selected) {
              w.style.backgroundColor = '#722C25'
              w.style.color = 'white'
              // Scroll to first w
              if (j === 0) {
                w.scrollIntoView(true)
              }
            } else {
              w.style.backgroundColor = '#C5A471'
              w.style.color = 'black'
            }
            w.style.cursor = 'pointer'
            w.onclick = (e) => {
              this.props.selectLink(i)
              switch (this.props.dataType) {
                case 'AlignedTosefta':
                  this.getChapter(w.closest('tei-ab').getAttribute('xml:id').replace(/ref-t\.(\d+\.\d+\.\d+)\.\d+/, '$1'))
                  break
                case 'AlignedMishnah':
                  this.getChapter(w.closest('tei-ab').getAttribute('xml:id').replace(/ref\.(\d+\.\d+\.\d+)\.\d+/, '$1'))
                  break
                case 'MishnahChapter':
                case 'ToseftaChapter':
                  if (this.props.type === 'driver') {
                    this.props.clearContextChapter()  
                  }
                  break
                default:
              }
            }
          }
        }
      }
    }
  }

  getChapter(chapter) {
    this.props.getContextChapter(chapter)
  }

  render() {
    let type = this.props.dataType === 'MishnahChapter' || this.props.dataType === 'ToseftaChapter' ? 'Simple' : 'Tosefta'
    return <div ref="teiData" className={`Tei ${type}`}>{
      this.state.abs.map((ab, i) => {
        return (
          <div key={i}>
            <div className="Ab" onClick={() => {
              this.getChapter(ab.getAttribute('xml:id').replace(/ref-t\.(\d+\.\d+\.\d+)\.\d+/, '$1'))
            }}>
              {ab.getAttribute('xml:id').replace('ref-t.', '')}
            </div>
            <div dangerouslySetInnerHTML={{__html: ab.outerHTML}}/>
          </div>
        )
      })
    }</div>
  }
}

TeiViewer.propTypes = {
  teiData: PropTypes.string.isRequired,
  dataType: PropTypes.string,
  alignmentData: PropTypes.array,
  selectLink: PropTypes.func,
  getContextChapter: PropTypes.func,
  clearContextChapter: PropTypes.func
}
