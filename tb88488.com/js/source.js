(function(e) {
    $.fn.addDownloadAuto = function (e) {
        var set = {
            find_param:window.location.search,
        };
        var config = $.extend(set,e);
        var channelCode = config.channelCode;
        var os_key = config.os_key;
        var data=getLocation();
        var api_url = config.api_url;
        var find_param = config.find_param;
        var btn_download = config.btn_download;
        var is_auto = config.is_auto;
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
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
                    ShareTrace.init({
                        appkey: os_key, // 此值必填
                        param: $.param(data),
                        success: function() {
                            var m = this;
                            if(isAndroid && (is_auto != undefined && is_auto ==1)){
                                //data_ajax(m);
                            }
                            //是否指定按钮点击下载
                            if (btn_download =='' || btn_download == undefined){
                                $("body").click(function(){
                                    ShareTrace.download();
                                    return false;
                                })
                            } else{
                                $("."+btn_download).click(function(){
                                    ShareTrace.download();
                                    return false;
                                })

                            }
                        },
                        error: function() {
                            console.log("执行错误");
                        }
                    });
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
            data.channel = channelCode;
			console.log($.param(data));
            ShareTrace.init({
                appkey: os_key, // 此值必填
                param: $.param(data),
                success: function() {
                    if(isAndroid && (is_auto != undefined && is_auto ==1)){
                        //data_ajax(m);
                    }
                    //是否指定按钮点击下载
                    if (btn_download =='' || btn_download == undefined){
                        $("body").click(function(){
                            ShareTrace.download();
                            return false;
                        })
                    } else{
                        $("."+btn_download).click(function(){
                            ShareTrace.download();
                            return false;
                        })

                    }
                },
                error: function() {
                    console.log("执行错误");
                }
            });
        }
    }
})(jQuery);
function getLocation(){
    var query = location.search.substr(1)
    query = query.split('&');
    var params = {};
    for (let i = 0; i < query.length; i++) {
        let q = query[i].split('=');
        console.log(q);
        if (q.length === 2) {
            params[q[0]] = q[1]
        }
    }
    return params;

}