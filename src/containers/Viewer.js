import { connect } from 'react-redux'
import { getAlignment, selectLink, getToseftaChapter, clearToseftaChapter } from '../actions'
import { withRouter } from 'react-router'
import ViewerBody from '../components/ViewerBody'

const mapStateToProps = (state, ownProps) => {
  const chapter = ownProps.chapter ? ownProps.chapter : '1.1.1'
  let mishnahChapter
  let alignment
  let alignedTosefta
  let toseftaChapter
  let toseftaChapterNumber
  if (state.resources) {
    if (state.resources.mishnah && state.resources.alignment && state.resources.tosefta) {
      mishnahChapter = state.resources.mishnah.data
      alignment = state.resources.alignment.data
      alignedTosefta = state.resources.tosefta.data
    }
    if (state.resources.toseftaChapter) {
      toseftaChapter = state.resources.toseftaChapter.data
      toseftaChapterNumber = state.resources.toseftaChapter.chapter
    }
  }
  return {chapter, mishnahChapter, alignment, alignedTosefta, toseftaChapter, toseftaChapterNumber}
}

const mapDispatchToProps = (dispatch) => { 
  return {
    getAlignment: (chap) => dispatch(getAlignment(chap)),
    selectLink: (idx) => dispatch(selectLink(idx)),
    getToseftaChapter: (chap) => dispatch(getToseftaChapter(chap)),
    clearToseftaChapter: () => dispatch(clearToseftaChapter())
  }
}

const App = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerBody))

export default App
