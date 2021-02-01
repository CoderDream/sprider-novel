import request from '@/utils/request'

export function search(fun, key, type) {
  return request({
    url: '/api/api/novel/fun/' + fun,
    method: 'get',
    params: { key, type }
  })
}
export function top() {
  return request({
    url: '/api/api/novel/top',
    method: 'get'
  })
}
export function rotate() {
  return request({
    url: '/api/api/novel/rotate',
    method: 'get'
  })
}
export function updateTop() {
  return request({
    url: '/api/api/novel/updateTop10',
    method: 'get'
  })
}
export function wordCountTop() {
  return request({
    url: '/api/api/novel/wordCountTop10',
    method: 'get'
  })
}
export function getChapters(chaptersUrl) {
  return request({
    url: '/api/api/novel/chapter',
    method: 'get',
    params: { chaptersUrl }
  })
}
export function getContent(contentUrl) {
  return request({
    url: '/api/api/novel/content',
    method: 'get',
    params: { contentUrl }
  })
}
export function getTypes(contentUrl) {
  return request({
    url: '/api/api/novel/type',
    method: 'get'
  })
}
export function getNovelsByTypeName(typeName) {
  return request({
    url: '/api/api/novel/type/' + typeName,
    method: 'get'
  })
}
export function getNovelByNovelId(novelId) {
  return request({
    url: '/api/api/novel/' + novelId,
    method: 'get'
  })
}
