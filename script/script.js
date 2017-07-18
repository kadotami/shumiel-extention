$(function() {

    function init(){
        edit();
        add();
    }

    // DOMをキャンバスに出力
    $('#prev_canvas').click(function() {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var html = $('#prevs').html();
        var data = "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
            "<foreignObject width='100%' height='100%'>" +
            "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:40px'>" +
            html +
            "</div>" +
            "</foreignObject>" +
            "</svg>";
        var DOMURL = self.URL || self.webkitURL || self;
        var img = new Image();
        var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        var url = DOMURL.createObjectURL(svg);
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            DOMURL.revokeObjectURL(url);
        };
        img.src = url;
    });

    // 入力値をプレビュに反映
    function edit() {
        $('.inp').keyup(function() {
            var target_eq = $('#inps .inp').index(this);
            var text = $('.inp').eq(target_eq).val();
            $('.prev').eq(target_eq).html(text);
        });
    }

    // inputタグ生成
    var extends_pulldown = '<select name="extends_menu" class="extends_menu"><option value="a">--- SNS ---</option><option value="a">twitter</option><option value="b">facebook</option><option value="c">google</option><option value="d">line</option></select>';
    var inp_area = '<span class="appended">'+extends_pulldown+'：<input class="inp" type="text" value=""><button class="delete">×</button><br></span>';
    var prev_area = '<span class="appended"><span class="menu">SNS</span>：<span class="prev"></span><br></span>';
    function add() {
        $('#add').click(function() {
            $('#inps').append(inp_area);
            $('#prevs').append(prev_area);
            edit();
            extends_menu();
            death();
        });
    }

    // inputタグ抹殺
    function death() {
        $('.delete').click(function() {
            var target_eq = $('#inps span .delete').index(this);
            $('#inps .appended').eq(target_eq).hide();
            $('#prevs .appended').eq(target_eq).hide();
        });
    }

    // プルダウンメニューの反映
    function extends_menu() {
        $('.extends_menu').change(function() {
            var target_eq = $('.extends_menu').index(this);
            var extends_menu = $('[name=extends_menu] option:selected').eq(target_eq).text();
            $('.menu').eq(target_eq).html(extends_menu);
        });
    }

    init();

});
