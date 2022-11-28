import request from '@/utils/request.js'

export const ARTICLE_REQUEST_API = function(page, limit) {

    return request.get("articles", {
        params: {
            page: page,
            limit: limit
        }
    })
    
}
