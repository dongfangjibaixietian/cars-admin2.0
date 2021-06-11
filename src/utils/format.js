

/** 
 * 格式化请求数据的参数 
 * keyData：form_data
 * requestData：请求的数据
 * 这是对一个空的JSON对象复制另外的JSON对象的方法
 * */
export function formatRequestData(keyData, requestData){
    const data = {}
    for(let key in keyData) {
        if(Object.keys(requestData).includes(key)) {
            data[key] = requestData[key]
        }
    }
    return data;
}


































