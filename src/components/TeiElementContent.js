import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TeiElement from '../containers/TeiElement'
import './TeiElementContent.css'

export default class TeiElementContent extends Component {
  getRoleClass() {
    switch (this.props.role) {
      case 'linked':
        return 'WLinked'
      case 'firstLinked':
        return 'WLinked WFirst'
      case 'lastLinked':
          return 'WLinked WLast'
      default:
        return ''
    }
  }

  getClasses() {
    const selected = this.props.selected ? 'WSelected' : ''
    return `${this.getRoleClass()} ${selected}`
  }

  forwardTeiAttributes() {
    return Array.from(this.props.teiDomElement.attributes).reduce((acc, att) => {
      acc[att.name] = att.value
      return acc
    }, {})
  }

  setOnClick() {
    this.props.selectLink(this.props.linkIndex)
    if (this.props.getContextChapter) {
      this.props.getContextChapter(this.props.linkedChapter)
    }
  }

  render() {
    const wProps = this.props.teiDomElement.tagName.toLowerCase() === 'tei-w'
      ? {class: this.getClasses(), onClick: () => this.setOnClick()}
      : {}
    return React.createElement(this.props.teiDomElement.tagName, 
      {
        ...this.forwardTeiAttributes(),
        ...wProps
      }, 
      Array.from(this.props.teiDomElement.childNodes).map((teiEl, i) => {
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
    )
  }
}

TeiElementContent.propTypes = {
  teiDomElement: PropTypes.object.isRequired,
  selectLink: PropTypes.func.isRequired,
  linkIndex: PropTypes.number.isRequired,
  dataType: PropTypes.string.isRequired,
  role: PropTypes.string,
  linkedChapter: PropTypes.string,
  getContextChapter: PropTypes.func,
  clearContextChapter: PropTypes.func
}
