$(function() {

    // 入力値をプレビュに反映
    function edit() {
        $('.inp').keyup(function() {
            var target_eq = $('#inps .inp').index(this);
            var text = $('.inp').eq(target_eq).val()
            $('.prev').eq(target_eq).html(text);
        });
    }

    // inputタグ生成
    var inp_area = '<span>お題：<input class="inp" type="text" value=""><button class="delete">×</button><br></span>';
    var prev_area = 'お題：<span class="prev"></span><br>';
    function add() {
        $('#add').click(function() {
            $('#inps').append(inp_area);
            $('#prevs').append(prev_area);
            edit();
            death();
        });
    }

    // inputタグ抹殺
    function death() {
        $('.delete').click(function() {
            var target_dom = $('#inps span').index(this);
            alert(target_dom);
            //$('#inps span').delete(target_dom);
        });
    }

    edit();
    add();
});
