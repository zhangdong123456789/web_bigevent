$(function() {
    //点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.logoin-box').hide();
        $('.reg-box').show();
    });
    //点击“去登录”的链接
    $('#link_logoin').on('click', function() {
        $('.logoin-box').show();
        $('.reg-box').hide();
    });

    //从layui 中获取 from 对象
    var form = layui.form;
    var layer = layui.layer;
    //通过form.verify()函数定义校验规则
    form.verify({
        //自定义一个叫做 pwd 校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd != value) {
                return '两次密码不一致';
            }
        }
    });

    //监听注册表单的提交事件
    $('#from_reg').on('submit', function(e) {
        //1.阻止表单默认提交行为
        e.preventDefault();
        var data = {
            username: $('#from_reg [name=username]').val(),
            password: $('#from_reg [name=password]').val()
        };
        //2.发起ajax的post请求
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message);
            }
            // console.log('注册成功');
            layer.msg('注册成功,请登录');
            //模拟人的点击行为
            $('#link_logoin').click();
        });
    });

    //监听登录表单的提交事件
    $('#form_logoin').submit(function(e) {
        //1.阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $('#form_logoin').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                //将登陆成功得到的 token 字符串,保存到localStorage中
                localStorage.setItem('token', res.token);
                //跳转到后台主页
                location.href = '/index.html'
            }

        });
    });
});