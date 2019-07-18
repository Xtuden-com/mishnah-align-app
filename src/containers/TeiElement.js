import { connect } from 'react-redux'
import { selectLink } from '../actions'
import TeiElementContent from '../components/TeiElementContent'

const mapStateToProps = (state, ownProps) => {
  let role = 'none'
  let selected = false
  let linkedChapter = ''
  let linkIndex = 0
  if (state.resources.alignment.data) {
    const data = state.resources.alignment.data
    const e = ownProps.teiDomElement
    const type = ownProps.dataType === 'MishnahChapter' || ownProps.dataType === 'AlignedMishnah' ? 'm' : 't'

    if (e.tagName.toLowerCase() === 'tei-w') {
      for (const i in data) {
        const link = data[i]
        const position = link[type].reduce((pos, id, idx) => {
          if (e.getAttribute('xml:id') === id) {
            const info = {idx: i, selected: link.selected}
            if (idx === 0) {
             pos = {role: 'firstLinked', ...info}
            } else if (idx === link[type].length - 1) {
              pos = {role: 'lastLinked', ...info}
            } else {
              pos = {role: 'linked', ...info}
            }
          }
          return pos
        }, {role: 'none', idx: 0})
        if (position.role !== 'none') {
          // set link index
          linkIndex = parseInt(position.idx)
          // locate chapter
          switch (ownProps.dataType) {
            case 'AlignedTosefta':
              linkedChapter = e.closest('tei-ab').getAttribute('xml:id').replace(/ref-t\.(\d+\.\d+\.\d+)\.\d+/, '$1')
              break
            case 'AlignedMishnah':
              linkedChapter = e.closest('tei-ab').getAttribute('xml:id').replace(/ref\.(\d+\.\d+\.\d+)\.\d+/, '$1')
              break
            case 'MishnahChapter':
            case 'ToseftaChapter':
              if (ownProps.viewerType === 'driver') {
                ownProps.clearContextChapter()  
              }
              break
            default:
          }
          // set selected
          selected = position.selected
          // assign role
          role = position.role
          break
        }
      }
    }
  }

  return {role, selected, linkedChapter, linkIndex, ...ownProps}
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
