(function(e) {
    $.fn.addDownloadAuto = function (e) {
        var set = {
            find_param:window.location.search,
        };

        var config = $.extend(set,e);
        var data = OpenInstall.parseUrlParams();
        var channelCode = config.channelCode;
        var os_key = config.os_key;
        var api_url = config.api_url;
        var find_param = config.find_param;
        var btn_download = config.btn_download;
        var is_auto = config.is_auto;

        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        
        //console.log(config);
        if ((find_param == '' || find_param == undefined) && (api_url !='' && api_url != undefined)) {
            $.ajax({
                dataType:'jsonp',
                url:api_url,
                jsonp:'callback',
                jsonpCallback:'callback',
                success:function(redata){
                    var host_domain = window.location.hostname;
                    $.each(redata,function(i,item) {
                        if (host_domain == i ){
                            channelCode = item.channel_id;
                        }
                    });
                    var params1 = '{\"type\":\"1\",\"pid\":\"'+ channelCode+'\",\"type1\":\"'+type1+'\",\"channelCode\":\"'+channelCode+'\"}';
                    data=$.parseJSON(params1);
                    new OpenInstall({
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
                if (data.channel_id != null || data.channel_id != undefined) {
                    channelCode = data.channel_id;
                }
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
            new OpenInstall({
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