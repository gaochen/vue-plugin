var Cookie = {
    set: function(key, val, expires, domain){
        let expiresStr = ''
        let domainStr = ''

        //判断是否设置expires，单位秒
        if (expires && typeof expires === 'number') {
            let date = new Date()
            date.setTime(date.getTime() + expires * 1000)
            expiresStr = 'expires=' + date.toGMTString() + ';'
        }
        // cookie永久有效
        if (expires && expires === 'Infinity') {
            expiresStr = 'expires=expires=Fri, 31 Dec 9999 23:59:59 GMT;'
        }
        // 设置域
        if (domain) {
            domainStr = `domain=${domain};path=/`
        }
        //拼接Cookie,注意大小写
        document.cookie = key+'='+escape(val)+';' + expiresStr + domainStr;//escape()字符串进行编码
    },

    get: function(key){
        //Cookie存储格式："key1=val1; key2=val2; key3=val3"
        var getCookie = document.cookie.replace(/[ ]/g,'');//把[ ] 换成 '' 
        //通过';'分割成数组
        var resArr = getCookie.split(';');
        var res;
        for (var i = 0; i < resArr.length; i++) {
            var arr = resArr[i].split('=');
            //判断传入key是否找到存储对应的val
            if (arr[0] == key){
                res = arr[1];
                break;
            }
        }
        if (res) {
            return unescape(res);//解码
        }
    }

}

export default Cookie