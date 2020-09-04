/*eslint-disable*/
import axios from 'axios';

export function request(url,method="get",data={},config={}) {
    return axiosRequest(url, method, data,config);
}

function axiosRequest(url,method,data,config){
    if (method.toLocaleLowerCase()==="post"){
        let params=new URLSearchParams();
        if (data instanceof Object){
            for (let key in data){
                params.append(key,data[key]);
            }
            data = params;
        }
    }else if (method.toLocaleLowerCase()==="file"){
        method="post";
        let params=new FormData();
        if (data instanceof Object){
            for (let key in data){
                params.append(key,data[key]);
            }
            data = params;
        }
    }
    let axiosConfig={
        method:method.toLocaleLowerCase(),
        url:url,
        data:data
    };
    if (config instanceof Object){
        for (let key in config){
            axiosConfig[key]=config[key];
        }
    }

    return axios(axiosConfig).then(res=>res.data);
}