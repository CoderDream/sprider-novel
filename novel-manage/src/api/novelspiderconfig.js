import request from '@/utils/request'

export function getList(params, pageNum, pageSize) {
  return request({
    url: '/api/novel/spider/config/' + pageNum + '/' + pageSize,
    method: 'get',
    params
  })
}

export function add(novelSpiderXpathConfig) {
  return request(
    {
      url: '/api/novel/spider/config',
      method: 'post',
      data: novelSpiderXpathConfig
    }
  )
}

export function del(id) {
  return request({
    url: '/api/novel/spider/config',
    method: 'delete',
    params: { id }
  })
}

export function update(novelSpiderXpathConfig) {
  return request({
    url: '/api/novel/spider/config',
    method: 'put',
    data: novelSpiderXpathConfig
  })
}
