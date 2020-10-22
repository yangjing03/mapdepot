import request from '../until/request'
export function getRecommend(skip) {
    return request({
        url: 'http://157.122.54.189:9088/videoimg/v1/videowp/featured',
        method: 'get',
        data: {
           limit: 30,
           skip: skip * 30,
           order: 'hot'
        },
    })
}