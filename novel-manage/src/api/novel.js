import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/novel/page',
    method: 'get',
    params
  })
}

export function update_novel(novel) {
  return request({
    url: '/api/novel',
    method: 'put',
    data: novel
  })
}

export function add_novel(novel) {
  return request({
    url: '/api/novel',
    method: 'post',
    data: novel
  })
}

export function delete_novel(novelId) {
  return request({
    url: '/novel',
    method: 'delete',
    params: { novelId }
  })
}
export function get_novel_types() {
  return request({
    url: '/api/novel/type',
    method: 'get'
  })
}
export function get_novel_websites() {
  return request({
    url: '/api/novel/site',
    method: 'get'
  })
}
export function get_novel_number_of_type() {
  return request({
    url: '/api/novel/type/number',
    method: 'get'
  })
}
