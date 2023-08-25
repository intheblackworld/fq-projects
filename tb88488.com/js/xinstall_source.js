(function(e) {
    $.fn.addDownloadAuto = function (e) {
        var set = {
            find_param:window.location.search,
        };

        var channel_id = getQueryString('channel_id');


        var config = $.extend(set,e);
        var data = XInstall.parseUrlParams();
        var channelCode = config.channelCode;
        var os_key = config.os_key;
        var api_url = config.api_url;
        var find_param = config.find_param;
        var btn_download = config.btn_download;
        var is_auto = config.is_auto;
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        
        if (channel_id) {
            channelCode = channel_id;    
        }

        //console.log(config);
        if ((find_param == '' || find_param == undefined) && (api_url !='' && api_url != undefined)) {
            $.ajax({
                dataType:'jsonp',
                url:api_url,
                jsonp:'callback',
                jsonpCallback:'callback',
                success:function(data){
                    var host_domain = window.location.hostname;
                    $.each(data.url,function(i,item) {
                        if (host_domain == i ){
                            channelCode = item.channel_id;
                        }
                    });
                    var params1 = '{\"type\":\"1\",\"pid\":\"'+ channelCode+'\",\"type1\":\"'+type1+'\",\"channelCode\":\"'+channelCode+'\"}';
                    data=$.parseJSON(params1);
                    console.log(data);
                    new XInstall({
                        appKey : os_key,
                        preferWakeup:true,
                        channelCode:data.channelCode,
                        onready : function() {
                            var m = this;
                            if(isAndroid && (is_auto != undefined && is_auto ==1)){
                                data_ajax(m);
                            }
                            //是否指定按钮点击下载
                            if (btn_download =='' || btn_download == undefined){
                                $("body").click(function(){
                                    data_ajax(m);
                                    return false;
                                })
                            } else{
                                $("."+btn_download).click(function(){
                                    data_ajax(m);
                                    return false;
                                })
                            }

                        }
                    }, data);
                }
            })
        }else{
            if(data.channelCode == null || data.channelCode == undefined){
                if (data.fxm == null || data.fxm == undefined) {
                    var type1=1;
                    var params1 = '{\"type\":\"1\",\"pid\":\"'+ channelCode+'\",\"type1\":\"'+type1+'\",\"channelCode\":\"'+channelCode+'\"}';
                    data=$.parseJSON(params1);
                }else{
                    var type1=1;
                    var params1 = '{\"fxm\":\"'+data.fxm+'\",\"type\":\"1\",\"pid\":\"'+ channelCode+'\",\"type1\":\"'+type1+'\",\"channelCode\":\"'+channelCode+'\"}';
                    data=$.parseJSON(params1);
                }
            }
            console.log(data);
            new XInstall({
                appKey : os_key,
                preferWakeup:true,
                channelCode:data.channelCode,
                onready : function() {
                    var m = this;
                    if(isAndroid && (is_auto != undefined && is_auto ==1)){
                        data_ajax(m);
                    }
                    //是否指定按钮点击下载
                    if (btn_download =='' || btn_download == undefined){
                        $("body").click(function(){
                            data_ajax(m);
                            return false;
                        })
                    } else{
                        $("."+btn_download).click(function(){
                            data_ajax(m);
                            return false;
                        })
                    }
                }
            }, data);
        }

        function data_ajax(m){
            m.wakeupOrInstall();
        }
    }
})(jQuery)

/*
$(".down-ios").click(function () {
    window.open("/images/ios-jiaocheng.jpg?rand="+(new Date()).getTime());
});

function data_ajax(m){
    m.wakeupOrInstall();
}
function getLocation(){
    var arr = document.domain.split('.');
    if(arr.length === 2){
        return document.domain;
    }
    if(arr.length > 2 && arr[0] !== 'www'){
        return arr.slice(1).join('.')
    }
    return arr.slice(1).join('.')
}*/

function getQueryString(paramName) { 
 
    var url = window.location.toString(); //取得當前網址
    var str = ""; //參數中等號左邊的值
    var channel_id = 0; //參數中等號右邊的值
    

    if(window.location.search) {
        //如果網址有"?"符號
        var ary = url.split("?")[1].split("&");

        // alert(ary):

        //取得"?"右邊網址後利用"&"分割字串存入ary陣列 ["a=1","b=2","c=3"]
        for (var i in ary) {
            //取得陣列長度去跑迴圈，如:網址有三個參數，則會跑三次
            str = ary[i].split("=")[0];
            //取得參數"="左邊的值存入str變數中
            if (str == "channel_id") {
                //若str等於想要抓取參數 如:b
                channel_id = decodeURI(ary[i].split("=")[1]); //抓msg
                //取得b等號右邊的值並經過中文轉碼後存入str_value
            }
        }
    }

    return channel_id;

}
