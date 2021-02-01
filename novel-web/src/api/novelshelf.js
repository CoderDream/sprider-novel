import request from '@/utils/request'

export function getNovelShelf() {
  return request({
    url: '/api/api/shelf',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/api/api/shelf',
    method: 'post',
    data
  })
}

export function getRowsOfShelf(shelfId) {
  return request({
    url: '/api/api/shelf/' + shelfId + '/row',
    method: 'get'
  })
}

export function addRowsToShelf(shelfsId, novelId) {
  return request({
    url: '/api/api/shelf/' + shelfsId + '/row/' + novelId,
    method: 'post'
  })
}

export function deleteRows(rowId) {
  return request({
    url: '/api/api/novel/shelf/row/' + rowId,
    method: 'delete'
  })
}
