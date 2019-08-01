import { connect } from 'react-redux'
import { selectLink } from '../actions'
import TeiElementContent from '../components/TeiElementContent'

const mapStateToProps = (state, ownProps) => {
  let matches = []
  if (state.resources.alignment.data) {
    const data = state.resources.alignment.data
    const e = ownProps.teiDomElement
    const type = ownProps.dataType === 'MishnahChapter' || ownProps.dataType === 'AlignedMishnah' ? 'm' : 't'

    if (e.tagName.toLowerCase() === 'tei-w') {
      const elId = e.getAttribute('xml:id')

      for (const linkIdx in data) {
        const link = data[linkIdx]
        for (const _idIdx in link[type]) {
          const idIdx = parseInt(_idIdx)
          const id = link[type][idIdx]
          if (elId === id) {
            const info = {
              idx: linkIdx,
              selected: link.selected,
              linkIndex: parseInt(linkIdx)
            }
            if (idIdx === 0) {
              info.role = 'firstLinked'
            } else if (idIdx === link[type].length - 1) {
              info.role = 'lastLinked'
            } else {
              info.role = 'linked'
            }
            // locate chapter
            switch (ownProps.dataType) {
              case 'AlignedTosefta':
              case 'AlignedMishnah':
                info.linkedChapter = e
                  .closest('tei-ab')
                  .getAttribute('xml:id')
                  .replace(/ref(-t)?\.(\d+\.\d+\.\d+)\.\d+/, '$2')
                break
              default:
            }
            matches.push(info)
          }
        }
      }
    }
  }

  return {matches, ...ownProps}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectLink: (idx) => (dispatch(selectLink(idx))),
    getContextChapter: ownProps.getContextChapter,
    clearContextChapter: ownProps.clearContextChapter,
  }
}

const TeiElement = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeiElementContent)

export default TeiElement
