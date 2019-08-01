import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TeiElement from '../containers/TeiElement'
import './TeiElementContent.css'

export default class TeiElementContent extends Component {
  getRoleClass() {
    if (this.props.dataType.match('Aligned') && this.props.matches.length === 0) {
      return 'WHide'
    }
    return Array.from(this.props.matches.reduce((classes, match) => {
      switch (match.role) {
        case 'linked':
          classes.add('WLinked')
          break
        case 'firstLinked':
          classes.add('WLinked')
          classes.add('WFirst')
          break
        case 'lastLinked':
          classes.add('WLinked')
          classes.add('WLast')
          break
        default:
      }
      return classes
    }, new Set())).join(' ')
  }

  getClasses() {
    const selected = this.props.matches.filter(m => m.selected).length > 0
      ? 'WSelected' : ''
    return `${this.getRoleClass()} ${selected}`    
  }

  forwardTeiAttributes() {
    return Array.from(this.props.teiDomElement.attributes).reduce((acc, att) => {
      acc[att.name] = att.value
      return acc
    }, {})
  }

  setOnClick(match) {
    this.props.selectLink(match.linkIndex)
    if (this.props.getContextChapter) {
      this.props.getContextChapter(match.linkedChapter)
    } else {
      this.props.clearContextChapter()
    }
  }

  render() {
    let wProps = {}
    const children = []
    if (this.props.teiDomElement.tagName.toLowerCase() === 'tei-w') {
      wProps = {class: this.getClasses()}
      for (const match of this.props.matches) {
        if (match.role === 'firstLinked') {
          children.push(
            <span 
              key={`${this.props.teiDomElement.getAttribute('id')}_${match.idx}`}
              className="ShowAlignment"
              onClick={() => this.setOnClick(match)}
            >⇠</span>
          )
        }
      }
    }
    const teiChildren = Array.from(this.props.teiDomElement.childNodes).map((teiEl, i) => {
      switch (teiEl.nodeType) {
        case 1:
          return <TeiElement 
            teiDomElement={teiEl}
            key={`${teiEl.tagName}_${i}`}
            dataType={this.props.dataType}              
            getContextChapter={this.props.getContextChapter}
            clearContextChapter={this.props.clearContextChapter}
            />
        case 3:
          return teiEl.nodeValue
        default:
          return null
      }        
    })
    children.push(teiChildren)
    return React.createElement(this.props.teiDomElement.tagName, 
      {
        ...this.forwardTeiAttributes(),
        ...wProps
      }, 
      children
    )
  }
}

TeiElementContent.propTypes = {
  teiDomElement: PropTypes.object.isRequired,
  matches: PropTypes.array,
  dataType: PropTypes.string.isRequired,
  getContextChapter: PropTypes.func,
  clearContextChapter: PropTypes.func
}
