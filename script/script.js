$(function() {
    // canvasを定義
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    $(canvas).attr('width', '345px');
    $(canvas).attr('height', '209px');

    //画像ロード
    var image_array = new Array();
    var image_name = ['../img/kty1.jpg', '../img/kty2.jpg', '../img/kty3.jpg'];
    for (var d = 0; d < image_name.length; d++) {
        image_array[d] = new Image();
        image_array[d].src = image_name[d];
    }

    // テンプレート(画像)を描画
    $('#background').change(function(){
        var img = $('[name=background] option:selected').val();
        $('canvas').drawImage({
            draggable: true,
            source: image_array[img],
            x: 0, y: 0,
            width: 345,
            height: 209,
            fromCenter: false
        });
    });

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
