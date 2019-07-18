import { connect } from 'react-redux'
import {
  getMTAlignment,
  getTMAlignment,
  getToseftaChapter,
  getMishnahChapter,
  clearToseftaChapter,
  clearMishnahChapter } from '../actions'
import { withRouter } from 'react-router'
import ViewerBody from '../components/ViewerBody'

const mapStateToProps = (state, ownProps) => {
  const order = ownProps.order ? ownProps.order : 'mt'
  const chapter = ownProps.chapter ? ownProps.chapter : '1.1.1'
  let driverChapter
  let alignment
  let alignedDocument
  let contextChapter
  let contextChapterNumber
  if (state.resources) {
    if (order === 'mt') {
      if (state.resources.mishnahChapter && state.resources.alignment && state.resources.alignedTosefta) {
        driverChapter = state.resources.mishnahChapter.data
        alignment = state.resources.alignment.data
        alignedDocument = state.resources.alignedTosefta.data
      }
      if (state.resources.toseftaChapter) {
        contextChapter = state.resources.toseftaChapter.data
        contextChapterNumber = state.resources.toseftaChapter.chapter
      }
    } else {
      if (state.resources.toseftaChapter && state.resources.alignment && state.resources.alignedMishnah) {
        driverChapter = state.resources.toseftaChapter.data
        alignment = state.resources.alignment.data
        alignedDocument = state.resources.alignedMishnah.data
      }
      if (state.resources.mishnahChapter) {
        contextChapter = state.resources.mishnahChapter.data
        contextChapterNumber = state.resources.mishnahChapter.chapter
      }
    }  
  }
  return {order, chapter, driverChapter, alignment, alignedDocument, contextChapter, contextChapterNumber}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const order = ownProps.order ? ownProps.order : 'mt'
  let getAlignment = (chap) => dispatch(getMTAlignment(chap))
  let getContextChapter = (chap) => dispatch(getToseftaChapter(chap))
  let clearContextChapter = () => dispatch(clearToseftaChapter())
  if (order !== 'mt') {
    getAlignment = (chap) => dispatch(getTMAlignment(chap))
    getContextChapter = (chap) => dispatch(getMishnahChapter(chap))
    clearContextChapter = () => dispatch(clearMishnahChapter())
  }
  return {
    getAlignment,
    getContextChapter,
    clearContextChapter    
  }
}

const App = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerBody))

export default App
