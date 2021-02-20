import service from "../utils/request";

// 新增停车场接口
export function ParkingAdd(data = {}) {
    return service.request({
        method: "post",
        url: "/parking/add/",
        data
    })
}