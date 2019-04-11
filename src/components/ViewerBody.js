import React from 'react'
import PropTypes from 'prop-types'
import { Component } from 'react'
import TeiViewer from './TeiViewer'
import { Link } from 'react-router-dom'
import './ViewerBody.css'

export default class ViewerBody extends Component {
  componentDidMount() {
    this.props.getAlignment(this.props.chapter)
  }

  componentDidUpdate(prevProps) {
    if ((this.props.chapter && prevProps.chapter !== this.props.chapter)
      || (this.props.order && prevProps.order !== this.props.order)) {
      this.props.getAlignment(this.props.chapter)
      this.props.clearContextChapter()
    } else if (!prevProps.chapter && this.props.chapter) {
      this.props.getAlignment(this.props.chapter)
    }
  }

  render() {
    let driverChapter
    let alignedDocument = 'Loading alignment data...'
    let contextChapter
    let contextChapterTitle
    if (this.props.alignment && this.props.driverChapter) {
      driverChapter = <TeiViewer
        type="driver" 
        teiData={this.props.driverChapter}
        dataType={this.props.order === 'mt' ? "MishnahChapter" : "ToseftaChapter"}
        alignmentData={this.props.alignment}
        selectLink={this.props.selectLink}
        clearContextChapter={this.props.clearContextChapter} />
    }
    if (this.props.alignment && this.props.alignedDocument) {
      alignedDocument = <TeiViewer
        type="alignment"
        teiData={this.props.alignedDocument}
        dataType={this.props.order === 'mt' ? "AlignedTosefta" : "AlignedMishnah"}
        alignmentData={this.props.alignment}
        selectLink={this.props.selectLink}
        getContextChapter={this.props.getContextChapter} />
    }
    if (this.props.alignment && this.props.contextChapter) {
      contextChapter = <TeiViewer
        type="context"
        teiData={this.props.contextChapter}
        dataType={this.props.order === 'mt' ? "ToseftaChapter" : "MishnahChapter"}
        alignmentData={this.props.alignment}
        selectLink={this.props.selectLink}
        clearContextChapter={this.props.clearContextChapter} />
    }
    if (this.props.contextChapterNumber) {
      contextChapterTitle = <h2>
          {this.props.order === 'mt' ? 'Tosefta' : 'Mishnah'} Chapter {this.props.contextChapterNumber}
          <small>(<Link to={`/${this.props.order === 'mt' ? 'tm' : 'mt'}/${this.props.contextChapterNumber}`}>
            align to this chapter</Link>)</small>
        </h2>
    }
    return (
      <div className="Viewer">
        <div className="Column" key="a">
          <h2>{this.props.order === 'mt' ? 'Mishnah' : 'Tosefta'} Chapter {this.props.chapter}</h2>
          {driverChapter}
        </div>
        <div className="Column" key="b">
          <h2>Aligned {this.props.order === 'mt' ? 'Tosefta' : 'Mishnah'}</h2>
          {alignedDocument}
        </div>
        <div className="Column" key="c">
          {contextChapterTitle}
          {contextChapter}
        </div>
      </div>
    )
  }
}

ViewerBody.propTypes = {
  order: PropTypes.string.isRequired,
  chapter: PropTypes.string.isRequired,
  driverChapter: PropTypes.string,
  contextChapter: PropTypes.string,
  contextChapterNumber: PropTypes.string,
  alignment: PropTypes.array,
  alignedDocument: PropTypes.string,
  getAlignment: PropTypes.func.isRequired,
  selectLink: PropTypes.func,
  clearContextChapter: PropTypes.func
}
