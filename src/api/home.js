import request from '../until/request'

export function getAlbumData(skip) {
    return  request({
        url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
            methods: 'get',
            data: {
                limit: 10,
                order: 'new',
                skip: skip * 10
            }
    })
}
export function getAlbumById(id, skip, first) {
    return request({
        url: 'http://157.122.54.189:9088/image/v1/wallpaper/album/' + id + '/wallpaper',
        methods: 'get',
        data: {
            limit: 10,
            order: 'new',
            skip: skip * 10,
            first
        }
    })
}
export function getImgDetail(id) {
    return request({
        url: `https://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment`,
        methods: 'get'
    })
}
export function getClassify() {
    return request({
        url: 'http://157.122.54.189:9088/image/v1/vertical/category',
        methods: 'get'
    })
}
export function getClassifyHot(id, skip) {
    return request({
        url: `https://service.picasso.adesk.com/v1/vertical/category/${id}/vertical`,
        methods: 'get',
        data: {
            limit: 30,
            skip: skip * 30,
            order: 'hot'
        }
    })
}
export function getClassifyNew(id, skip) {
    return request({
        url: `https://service.picasso.adesk.com/v1/vertical/category/${id}/vertical`,
        methods: 'get',
        data: {
            limit: 30,
            skip: skip * 30,
            order: 'new'
        }
    })
}
