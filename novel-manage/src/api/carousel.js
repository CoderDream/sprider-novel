import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/carousel',
    method: 'get'
  })
}
export function getOne(id) {
  return request({
    url: '/api/carousel/' + id,
    method: 'get'
  })
}

export function deleteOne(id) {
  return request({
    url: '/api/carousel/' + id,
    method: 'delete'
  })
}

export function saveCarousel(carousel) {
  return request({
    url: '/api/carousel',
    method: 'post',
    data: carousel
  })
}

export function updateCarousel(carousel) {
  return request({
    url: '/api/carousel',
    method: 'put',
    data: carousel
  })
}
