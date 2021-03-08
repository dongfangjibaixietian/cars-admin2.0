import service from "../utils/request";

// 新增停车场接口
export function ParkingAdd(data = {}) {
    return service.request({
        method: "post",
        url: "/parking/add/",
        data
    })
}

// 停车场列表接口
export function ParkingList(data = {}) {
    return service.request({
        method: "post",
        url: "/parking/list/",
        data
    })
}

// 停车场编辑页面详情接口
export function ParkingDetailed(data = {}) {
    return service.request({
        method: "post",
        url: "/parking/detailed/",
        data
    })
}

// 停车场编辑页面确定接口
export function ParkingEdit(data = {}) {
    return service.request({
        method: "post",
        url: "/parking/edit/",
        data
    })
}