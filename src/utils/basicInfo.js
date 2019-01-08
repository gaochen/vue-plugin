import generateUUID from './generateUUID'
import storage from './storage'
import Cookie from './cookie'

// 浏览器基本信息

var _AgentInfo = {
    deviceType: "",  // pc or mobile
    OSname: "",         // windows, Android, linux and so on...
    browserName: "",    //  chrome, safari, firefox, IE and so on...
    browserVer: "",   //  browser version， important if in IE environment.
    adaptType: 0,           // A type value, Adapt to the screen due to width
    _init: function(){
        _AgentInfo.setDeviceAndOS();
        _AgentInfo.setBrowser();
    },
    setDeviceAndOS: function(){
        var name = "unknown";
        if(window.navigator.userAgent.indexOf("Android") != -1){
            name = "Android";
        }else if(window.navigator.userAgent.indexOf("iPhone") != -1){
            name = "iPhone";
        }else if(window.navigator.userAgent.indexOf("SymbianOS") != -1){
            name = "SymbianOS";
        }else if(window.navigator.userAgent.indexOf("Windows Phone") != -1){
            name = "Windows Phone";
        }else if(window.navigator.userAgent.indexOf("iPad") != -1){
            name = "iPad";
        }else if(window.navigator.userAgent.indexOf("iPod") != -1){
            name = "iPod";
        }
        if(name != "unknown"){
            _AgentInfo.OSname = name;
            _AgentInfo.deviceType = "mobile";
            return;
        }
        if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1){
            name="Windows 10";
        }else if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1){
            name="Windows 8";
        }else if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1){
            name="Windows 7";
        }else if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1){
            name="Windows Vista";
        }else if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1){
            name="Windows XP";
        }else if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1){
            name="Windows 2000";
        }else if (window.navigator.userAgent.indexOf("Mac") != -1){
            name="Mac/iOS";
        }else if (window.navigator.userAgent.indexOf("X11") != -1){
            name="UNIX";
        }else if (window.navigator.userAgent.indexOf("Linux") != -1){
            name="Linux";
        }
        _AgentInfo.OSname = name;
        _AgentInfo.deviceType = "pc";
    },
    setBrowser: function(){
        var nAgt = navigator.userAgent;
        var browserName  = navigator.appName;
        var fullVersion  = ''+parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion,10);
        var nameOffset,verOffset,ix;
        if ((verOffset=nAgt.indexOf("Opera"))!=-1) { // In Opera, the true version is after "Opera" or after "Version"
         browserName = "Opera";
         fullVersion = nAgt.substring(verOffset+6);
         if ((verOffset=nAgt.indexOf("Version"))!=-1)
             fullVersion = nAgt.substring(verOffset+8);
        }
        else if ( (nAgt.indexOf("Trident"))!=-1 ) {   // ( ver >= ie7) In MSIE, the true version is after "MSIE" in userAgent
            if((verOffset=nAgt.indexOf("MSIE"))!=-1){
                fullVersion = nAgt.substring(verOffset+5);
            }else {
                fullVersion = '11.0';
            }
            if(fullVersion == 5){
                fullVersion = "11.0";
            }
            browserName = "IE";
        }
        else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {  // In Chrome, the true version is after "Chrome"
         browserName = "Chrome";
         fullVersion = nAgt.substring(verOffset+7);
        }
        else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {   // In Safari, the true version is after "Safari" or after "Version"
         browserName = "Safari";
         fullVersion = nAgt.substring(verOffset+7);
         if ((verOffset=nAgt.indexOf("Version"))!=-1)
             fullVersion = nAgt.substring(verOffset+8);
        }
        else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {    // In Firefox, the true version is after "Firefox"
         browserName = "Firefox";
         fullVersion = nAgt.substring(verOffset+8);
        }
        else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ){   // In most other browsers, "name/version" is at the end of userAgent
         browserName = nAgt.substring(nameOffset,verOffset);
         fullVersion = nAgt.substring(verOffset+1);
         if (browserName.toLowerCase()==browserName.toUpperCase()) {
            browserName = navigator.appName;
         }
        }
        if ((ix=fullVersion.indexOf(";"))!=-1)        // trim the fullVersion string at semicolon/space if present
             fullVersion=fullVersion.substring(0,ix);
        if ((ix=fullVersion.indexOf(" "))!=-1)
             fullVersion=fullVersion.substring(0,ix);
        majorVersion = parseInt(''+fullVersion,10);
        if (isNaN(majorVersion)) {
         fullVersion  = ''+parseFloat(navigator.appVersion);
         majorVersion = parseInt(navigator.appVersion,10);
        }
        _AgentInfo.browserName = browserName;
        _AgentInfo.browserVer = fullVersion;
    },
    isMobile: function(){
        if(_AgentInfo.deviceType == "mobile"){
            return true;
        }
        return false;
    },
    setAdaptType(){     // A type value, Adapt to the screen due to width. For convenient
        if(screen.width <= 374){
            _AgentInfo.adaptType = 0;
        }else if(screen.width <= 413){
            _AgentInfo.adaptType = 1;
        }else {
            _AgentInfo.adaptType = 2;
        }
    }
}
_AgentInfo._init();

// 埋点字段
var basicInfo = {
    t: '',  // 采集类型，网页、元素，首次进入页面-www.001，浏览页面-nav.001，点击-clk
    m: 'MALL-CA2019-1',  // 项目名称，预定义，固定值，MALL-CA2019-1
    pin: '',  // 登录用户名，从store里面获取 userName
    uid: '',  // 用户首次访问生成的唯一标识，存在localStorage
    sid: '',  // 用户本次登录生成的唯一标识，存在sessionStorage
    eid: '',  // 事件id，用于后端接口查询时使用，进入新页面就更新eid，加在请求头里面
    v: {
      t1: '',   // 网页分类，预定义，成品-mall，大宗-raw
      t2: '',   // 分类，预定义，url
      p0: {
        rept: '',  // 点击类型，预定义，点击-clk, 鼠标滑动曝光-impr
        poi: '',  // 位置信息，tag信息
        text: '', // 该元素的标题
        url: '',  // 该元素的url
        desc: '',  // 该元素的描述，空
        mcinfo: '',  // 该元素的特殊信息，空
        biclk: ''   // 该元素的位置，空
      },
      pinid: '',  // 登录用户id
      sc: '',   // 颜色深度
      sr: '',   // 分辨率
      ul: '',   // 语言
      cs: '',   // 字符编码
      ti: '',   // 网页标题
      hn: '',   // 域名
      os: '',   // 操作系统
      br: '',   // 浏览器类型
      bv: '',   // 浏览器版本
      wt: '',   // 用户首次访问时间，uid生成时间
      xt: '',   // 用户本次访问站点时间，sid生成时间
      yt: '',   // 当前时间戳
      zt: '',   // domComplete减去yt的时间
      bt: '-',   // 白屏时间：从打开网站到有内容渲染出来的时间节点
      ct: '-',   // 首评时间：首评内容渲染完毕的时间节点
      dt: '-',   // domready触发节点
      et: '-',   // 总下载时间，window.onload
      ua: '-',
      ub: '-',
      uc: '-',
      ud: '-',
      dataver: '0.1'   // 数据采集版本号
    },
    ref: '',  // 访问来源
    rm: '',   // 当前时间戳
  }
  
  // 初始化数据
  // uid
//   Cookie.set('example', value, 'Infinity')

//   console.log('cookie:' + Cookie.get('example'))
  let uid = Cookie.get('basic_uid')
  let wt = Cookie.get('basic_wt')
  if (!uid || !wt) {
    uid = generateUUID()
    wt = new Date().getTime()
    
    Cookie.set('basic_uid', uid, 'Infinity', '.ca-b2b.com')
    Cookie.set('basic_wt', wt, 'Infinity', '.ca-b2b.com')
  }
  basicInfo.uid = uid
  basicInfo.v.wt = wt
  
  // sid
//   let sid = Cookie.get('basic_sid')
//   let xt = Cookie.get('basic_xt')
//   if (!sid || !xt) {
//     sid = generateUUID()
//     xt = new Date().getTime()
  
//     storage.ss.set('basic_sid', sid)
//     storage.ss.set('basic_xt', xt)
//   }
//   basicInfo.sid = sid
//   basicInfo.v.xt = xt
  
  // 颜色深度sc
  basicInfo.v.sc = window.screen.colorDepth
  // 分辨率sr
  basicInfo.v.sr = `${window.screen.width} * ${window.screen.height}`
  // ul语言
  basicInfo.v.ul = (navigator.browserLanguage || navigator.language).toLowerCase()
  // 字符编码cs
  basicInfo.v.cs = document.charset
  // 网页标题ti
  basicInfo.v.ti = document.title
  // 域名hn
  basicInfo.v.hn = document.domain
  // 操作系统os
  basicInfo.v.os = _AgentInfo.OSname
  // 浏览器类型br
  basicInfo.v.br = _AgentInfo.browserName
  // 浏览器版本bv
  basicInfo.v.bv = _AgentInfo.browserVer

  export default basicInfo