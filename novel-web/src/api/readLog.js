import request from '@/utils/request'

export function getNovelsOfReadLog() {
  return request({
    url: '/api/api/readLog',
    method: 'get'
  })
}
export function deleteReadLog(readLogId) {
  return request({
    url: '/api/api/readLog/' + readLogId,
    method: 'delete'
  })
}
