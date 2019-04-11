import { 
  alignedToseftaUrl,
  mtAlignmentUrl,
  alignedMishnahUrl,
  tmAlignmentUrl,
  mishnahUrl,
  toseftaUrl } from '../utils/urls'

export const REQUEST_RESOURCE = 'REQUEST_RESOURCE'
export const RECEIVE_RESOURCE = 'RECEIVE_RESOURCE'
export const SELECT_LINK = 'SELECT_LINK'
export const CLEAR_TOSEFTA_CHAPTER = 'CLEAR_TOSEFTA_CHAPTER'
export const CLEAR_MISHNAH_CHAPTER = 'CLEAR_MISHNAH_CHAPTER'

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

export function clearMishnahChapter() {
  return {
    type: CLEAR_MISHNAH_CHAPTER
  }
}

/** ********
 * thunks *
 ******** **/

export function getMishnahChapter(chapter) {
  // This is a call to an eXist endpoint.
  return dispatch => {
    const requestUrl = `${mishnahUrl}${chapter}`
    dispatch(requestResource(requestUrl, 'mishnahChapter', chapter))
    return fetch(requestUrl)
      .then(response => response.text())
      .then(data => {
        dispatch(receiveResource(data, 'mishnahChapter', chapter))
      })
  }
}

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
    dispatch(requestResource(requestUrl, 'alignedTosefta'))
    return fetch(requestUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alignmentTable)
    })
      .then(response => response.text())
      .then(data => {
        dispatch(receiveResource(data, 'alignedTosefta'))
      })
  }
}

export function getMishnahAligned(alignmentTable) {
  // This is a call to an eXist endpoint.
  return dispatch => {
    const requestUrl = `${alignedMishnahUrl}${alignmentTable}`
    dispatch(requestResource(requestUrl, 'alignedMishnah'))
    return fetch(requestUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alignmentTable)
    })
      .then(response => response.text())
      .then(data => {
        dispatch(receiveResource(data, 'alignedMishnah'))
      })
  }
}

export function getMTAlignment(chapter) {
  // This is a call to an eXist endpoint.
  return dispatch => {
    const url = `${mtAlignmentUrl}${chapter}`
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

export function getTMAlignment(chapter) {
  // This is a call to an eXist endpoint.
  return dispatch => {
    const url = `${tmAlignmentUrl}${chapter}`
    dispatch(requestResource(url, 'alignment'))
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(receiveResource(data, 'alignment'))
        dispatch(getMishnahAligned(data))
        dispatch(getToseftaChapter(chapter))
      })
  }
}
