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
    if (this.props.alignment && this.props.driverChapter) {
      driverChapter = <TeiViewer
        type="driver" 
        teiData={this.props.driverChapter}
        dataType={this.props.order === 'mt' ? "MishnahChapter" : "ToseftaChapter"}
        label={this.props.order === 'mt' ? "Mishnah" : "Tosefta"}
        alignmentData={this.props.alignment}
        clearContextChapter={this.props.clearContextChapter} />
    }
    if (this.props.alignment && this.props.alignedDocument) {
      alignedDocument = <TeiViewer
        type="alignment"
        teiData={this.props.alignedDocument}
        dataType={this.props.order === 'mt' ? "AlignedTosefta" : "AlignedMishnah"}
        label={this.props.order === 'mt' ? "Aligned Tosefta" : "Aligned Mishnah"}
        alignmentData={this.props.alignment}
        getContextChapter={this.props.getContextChapter} />
    }
    if (this.props.alignment && this.props.contextChapter) {
      contextChapter = <TeiViewer
        type="context"
        teiData={this.props.contextChapter}
        dataType={this.props.order === 'mt' ? "ToseftaChapter" : "MishnahChapter"}
        label={this.props.order === 'mt' ? "Tosefta" : "Mishnah"}
        alignmentData={this.props.alignment}
        clearContextChapter={this.props.clearContextChapter} />
    }
    return (
      <div className="Viewer">
        <div className="Column" key="a">
          {driverChapter}
        </div>
        <div className="Column" key="b">
          {alignedDocument}
        </div>
        <div className="Column" key="c">
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
  clearContextChapter: PropTypes.func,
  getContextChapter: PropTypes.func
}
