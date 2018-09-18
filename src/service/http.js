import $ from 'jquery';
/*
    jquery+promise封装请求工具
    method 请求方式支持get-post-getForm-postForm
    url 请求接口
    params 请求参数必传，不支持
*/ 
export class HttpService{
    constructor(){
        
    }
    static request(method,url,params,cors,load){
        let requestMethod = method.replace(/Form/g,'')
        return new Promise((resolve,reject)=>{
            let options = {
                url,
                method:requestMethod,
                data:params,
                dataType:"json",
                xhrFields: {
                    withCredentials: cors?true:false
                },
                success(res){
                    if (!res) 
                        return reject('服务器没有返回数据');
                    if ('errorCode' in res && res.errorCode !== 0) 
                        return reject(res); 
                    if ('errorCode' in res && res.errorCode === 0) 
                        return resolve(res.data);   
                    resolve(res);
                },
                error(error){
                    reject(error);
                }
            }
            if(["postForm","getForm"].includes(method)){
                options.contentType = false
                options.processData = false
            }
            if(method==="post"&&params._json){
                options.contentType = 'application/json';
                delete options._json;
                options.data = JSON.stringify(options.data);
            }
            $.ajax(options)
        })
    }
}