$(function() {
    // canvasを定義
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    $(canvas).attr('width', '345px');
    $(canvas).attr('height', '209px');

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

    // canvas画像化
    $('#prev').click(function(){
        var image_src = canvas.toDataURL("image/png");
        $('#image_prev').attr('src', image_src);
        $('#image_download').attr('href', image_src).show();
    });
});
