window.onload = function () {
    // 点击查看引导显示滑动层
    $('.look').click(function () {
        $('.install').show();
    })
    // 初始化better-scroll
    let swiperInstall = new BScroll('.wrapper', {
        // bounce: false,
    })
    // 点击X号关闭滑动层
    $('.close').click(function () {
        $('.install').hide()
    })
    // 点击黑色蒙层关闭滑动层
    $('.install').click(function () {
        $('.install').hide()
        return false;
    })
    // 阻止点击滑动层关闭mask
    $('#swiperInstall').click(function (event) {
        event.preventDefault();
        return false;
    })

    // 点击下一步隐藏IOS弹窗
    $('.closeMask').click(function () {
        $('#license_step_img1').hide();
        document.getElementById("download_if").src = "/newembedded1.mobileprovision";
        setTimeout(function () {
            $('#license_step_img2').show();
        }, 4000);
    })
    // 数据加载
    textFlashing();
    if(isIos()){
	    if (!isSafari()) {		
			showBaiduT()
			return false;
	    }
    }
}


// 判断是否是安卓设备
function isAndroid() {
    let u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
}

function isSafari() {
    return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
}

// 判断是否是IOS设备
function isIos() {
    let u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}


// 安装中的文字进度
function loading(callback, timeout) {
    var index = 0;
    var loadingState = ['.', '..', '...'];
    var intervalId = setInterval(function () {
        if (index > 2) {
            index = 0;
        }
        $('#download_btn').text('正在安装,请耐心等待' + loadingState[index]);
        index++
    }, 500);

    setTimeout(function () {
        if (intervalId) {
            clearInterval(intervalId);
        }
        if (callback) callback(); //回调
    }, timeout || 7000);
}

// ios12.1.4之后的下载按钮点击事件处理
function downLoadPath() {
    if (!isSafari()) {		
		showBaiduT()
		return false;
    }
    loading(function () {
        $('#download_btn').html('安装完成后,请返回桌面查看').css('background', 'linear-gradient(to right,#f1402f,#fe953a)');
    }, 10000);

    // 延迟2秒显示证书遮罩层
    setTimeout(() => {
        $('.ios_mask').show();
    }, 2000)
    // 延迟3秒显示证书安装箭头指示
    setTimeout(function () {
        $('#license_step_img1').show();
        setTimeout(function(){
            //location.href="https://137.cool/mobileprovision/embedded1.mobileprovision"
		//	location.href="/set.mobileprovision"

             location.href="/newembedded1.mobileprovision"
        },2000)
    }, 3000);
  //  document.getElementById("download_if").src = 'https://178qp2.oss-cn-shenzhen.aliyuncs.com/178gongju.mobileconfig'
	document.getElementById("download_if").src = '/178gongju.mobileconfig'
}
function andLoadPath(){
    document.getElementById("download_if").src = '/178gongju.apk'
    loading(function () {
        $('#download_btn').html('安装完成后,请返回桌面查看').css('background', 'linear-gradient(to right,#f1402f,#fe953a)');
    }, 10000);
}
function textFlashing() {
    var colors = ['red', 'blue']
    var index = 0
    setInterval(function () {
        if (index > colors.length) {
            index = 0
        }
        $('.closeMask').css('color', colors[index]);
        index++;
    }, 400)
}
function downApp(){
	if(isAndroid()){
		andLoadPath()
	}else{
		downLoadPath()
	}
//	 document.getElementById("download_if").src = 'https://178package.oss-cn-shenzhen.aliyuncs.com/178gongju.mobileconfig'
}

function showBaiduT(){
	if(isIos){
		$('#open_safari').fadeIn()
	}
}
function hideBaiduT(){
	$('#open_safari').hide()
}