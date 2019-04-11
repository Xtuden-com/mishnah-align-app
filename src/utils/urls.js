// These will be calls to eXist to get specific chapters back: do not load these huge files in their entirety.
export const baseUrl = 'http://localhost:8081/exist/apps/digitalmishnah/modules'
export const mishnahUrl = `${baseUrl}/getMishnah.xql?ch=`
export const toseftaUrl = `${baseUrl}/getTosefta.xql?ch=`
export const alignedToseftaUrl = `${baseUrl}/getAlignedTosefta.xql?alignment=`
export const alignedMishnahUrl = `${baseUrl}/getAlignedMishnah.xql?alignment=`
export const mtAlignmentUrl = `${baseUrl}/getMTalign.xql?chapter=`
export const tmAlignmentUrl = `${baseUrl}/getTMalign.xql?chapter=`