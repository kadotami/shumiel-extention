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
    var inp_area = '<span class="appended">お題：<input class="inp" type="text" value=""><button class="delete">×</button><br></span>';
    var prev_area = '<span class="appended">お題：<span class="prev"></span><br></span>';
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
            var target_eq = $('#inps span .delete').index(this);
            $('#inps .appended').eq(target_eq).hide();
            $('#prevs .appended').eq(target_eq).hide();
        });
    }

    edit();
    add();

});
