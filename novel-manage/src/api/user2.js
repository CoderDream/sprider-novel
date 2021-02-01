import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/user',
    method: 'get',
    params
  })
}

// 删除指定用户 （假删除）
export function remove_user(userId) {
  return request({
    url: '/api/user',
    method: 'delete',
    userId
  })
}

// 修改用户信息
export function edit_user(user) {
  return request({
    url: '/api/user',
    method: 'put',
    data: user
  })
}

// 添加用户
export function add_user(user) {
  return request({
    url: '/api/user',
    method: 'post',
    data: user
  })
}
