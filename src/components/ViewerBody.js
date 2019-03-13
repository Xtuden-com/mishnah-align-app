import React from 'react'
import PropTypes from 'prop-types'
import { Component } from 'react'
import TeiViewer from './TeiViewer'
import './ViewerBody.css'

export default class ViewerBody extends Component {
  componentDidMount() {
    this.props.getAlignment(this.props.chapter)
  }

  componentDidUpdate(prevProps) {
    if (this.props.chapter && prevProps.chapter !== this.props.chapter) {
      this.props.getAlignment(this.props.chapter)
      this.props.clearToseftaChapter()
    } else if (!prevProps.chapter && this.props.chapter) {
      this.props.getAlignment(this.props.chapter)
    }
  }

  render() {
    let mishnah = 'Loading Mishnah chapter...'
    let alignedTosefta = 'Loading aligned Tosefta...'
    let toseftaChapter
    if (this.props.mishnahChapter && this.props.alignment) {
      mishnah = <TeiViewer 
        teiData={this.props.mishnahChapter}
        dataType="Mishnah"
        alignmentData={this.props.alignment}
        selectLink={this.props.selectLink}
        clearToseftaChapter={this.props.clearToseftaChapter} />
    }
    if (this.props.alignedTosefta && this.props.alignment) {
      alignedTosefta = <TeiViewer
        teiData={this.props.alignedTosefta}
        dataType="Tosefta"
        alignmentData={this.props.alignment}
        selectLink={this.props.selectLink}
        getToseftaChapter={this.props.getToseftaChapter} />
    }
    if (this.props.toseftaChapter && this.props.alignment) {
      toseftaChapter = [
        <h2 key="tct">Tosefta Chapter {this.props.toseftaChapterNumber}</h2>,
        <TeiViewer key="tcv"
          teiData={this.props.toseftaChapter}
          dataType="ToseftaChapter"
          alignmentData={this.props.alignment}
          selectLink={this.props.selectLink} />]
    }
    return (
      <div className="Viewer">
        <div className="Column">
          <h2>Mishnah Chapter {this.props.chapter}</h2>
          {mishnah}
        </div>
        <div className="Column">
          <h2>Aligned Tosefta</h2>
          {alignedTosefta}
        </div>
        <div className="Column">
          {toseftaChapter}
        </div>
      </div>
    )
  }
}

ViewerBody.propTypes = {
  chapter: PropTypes.string.isRequired,
  mishnahChapter: PropTypes.string,
  toseftaChapter: PropTypes.string,
  toseftaChapterNumber: PropTypes.string,
  alignment: PropTypes.array,
  alignedTosefta: PropTypes.string,
  getAlignment: PropTypes.func.isRequired,
  selectLink: PropTypes.func,
  clearToseftaChapter: PropTypes.func
}
