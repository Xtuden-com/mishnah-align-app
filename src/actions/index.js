import { alignedToseftaUrl, alignmentUrl, mishnahUrl, toseftaUrl } from '../utils/urls'

export const REQUEST_RESOURCE = 'REQUEST_RESOURCE'
export const RECEIVE_RESOURCE = 'RECEIVE_RESOURCE'
export const SELECT_LINK = 'SELECT_LINK'
export const CLEAR_TOSEFTA_CHAPTER = 'CLEAR_TOSEFTA_CHAPTER'

function requestResource(url, docType, chapter) {
  return {
    type: REQUEST_RESOURCE,
    url,
    docType,
    chapter
  }
}

function receiveResource(data, docType, chapter) {
  return {
    type: RECEIVE_RESOURCE,
    data,
    receivedAt: Date.now(),
    docType,
    chapter
  }
}

export function selectLink(idx) {
  return {
    type: SELECT_LINK,
    idx
  }
}

export function clearToseftaChapter() {
  return {
    type: CLEAR_TOSEFTA_CHAPTER
  }
}

/** ********
 * thunks *
 ******** **/

export function getToseftaChapter(chapter) {
  // This is a call to an eXist endpoint.
  return dispatch => {
    const requestUrl = `${toseftaUrl}${chapter}`
    dispatch(requestResource(requestUrl, 'toseftaChapter', chapter))
    return fetch(requestUrl)
      .then(response => response.text())
      .then(data => {
        dispatch(receiveResource(data, 'toseftaChapter', chapter))
      })
  }
}

export function getToseftaAligned(alignmentTable) {
  // This is a call to an eXist endpoint.
  return dispatch => {
    const requestUrl = `${alignedToseftaUrl}${alignmentTable}`
    dispatch(requestResource(requestUrl, 'tosefta'))
    return fetch(requestUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alignmentTable)
    })
      .then(response => response.text())
      .then(data => {
        dispatch(receiveResource(data, 'tosefta'))
      })
  }
}

export function getMishnahChapter(chapter) {
  // This is a call to an eXist endpoint.
  return dispatch => {
    const requestUrl = `${mishnahUrl}${chapter}`
    dispatch(requestResource(requestUrl, 'mishnah', chapter))
    return fetch(requestUrl)
      .then(response => response.text())
      .then(data => {
        dispatch(receiveResource(data, 'mishnah', chapter))
      })
  }
}

export function getAlignment(chapter) {
  // This is a call to an eXist endpoint.
  return dispatch => {
    const url = `${alignmentUrl}${chapter}`
    dispatch(requestResource(url, 'alignment'))
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(receiveResource(data, 'alignment'))
        dispatch(getToseftaAligned(data))
        dispatch(getMishnahChapter(chapter))
      })
  }
}

