$(function() {
    // canvasを定義
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // 文字を描画
    $('#add_text').click(function() {
        var text = $('#inp').val();
        var fontsize = $('[name=fontsize]:checked').val();
        var selectcolor = $('#color-list').val();

        $("canvas").drawText({
            draggable: true,
            fillStyle: selectcolor,
            strokeWidth: "0",
            x: 100,
            y: 100,
            fontSize: fontsize,
            fontFamily: "sans-serif",
            text: text
        });
    });
});
