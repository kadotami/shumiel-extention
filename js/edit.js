$(function() {
    // canvasを定義
    canvas_front = document.getElementById('canvas_front');
    canvas_back = document.getElementById('canvas_back');
    $('#canvas_front, #canvas_back').attr('width', '345px');
    $('#canvas_front, #canvas_back').attr('height', '209px');

    // QRコードを準備
    chrome.storage.sync.get({"public_token": ""}, function(items) {

        // 画像ロード
        var image_array = new Array();
        var image_name = ['../img/kty1.jpg', '../img/kty2.jpg', '../img/kty3.jpg'];
        for (var i = 0; i < image_name.length; i++) {
            image_array[i] = new Image();
            image_array[i].src = image_name[i];
        }

        // テンプレート(画像)を描画
        $('#background').change(function(){
            var img = $('[name=background] option:selected').val();
            console.log(image_array[img]);
            $('#canvas_front').drawImage({
                draggable: true,
                source: image_array[img],
                x: 0, y: 0,
                width: 345,
                height: 209,
                fromCenter: false,
                dblclick: function(layer) {
                    $(this).removeLayer(layer);
                }
            });
        });

        // 文字を描画
        $('#add_text').click(function() {
            var text = $('#inp').val();
            var fontsize = $('#fontsize').val();
            var selectcolor = $('#color-list').val();
            $("#canvas_front").drawText({
                draggable: true,
                fillStyle: selectcolor,
                strokeWidth: "0",
                x: 100,
                y: 100,
                fontSize: fontsize,
                fontFamily: "sans-serif",
                text: text,
                dblclick: function(layer) {
                    $(this).removeLayer(layer);
                }
            });
        });

        // 画像を描画する
        $('#add_image').click(function() {
            var name = $('#upload_image')[0].files[0].name;
            $('#canvas_front').drawImage({
                draggable: true,
                source: name,
                x: 0, y: 0,
                width: 345,
                height: 209,
                fromCenter: false,
                dblclick: function(layer) {
                    $(this).removeLayer(layer);
                }
            });
        });

        // 名刺の裏をレイアウトする
        var token = items.public_token;
        $("#canvas_front").drawImage({
            draggable: true,
            crossOrigin: 'anonymous',
            source: 'https://api.qrserver.com/v1/create-qr-code/?data=https://kadotami.github.io/ar/test.html?token='+token+'&size=130x130&format=svg&color=1d417a&bgcolor=f7f6eb',
            x: 30, y: 30,
            width: 100,
            height: 100,
            fromCenter: false,
        });

        // canvas画像化
        $('#prev').click(function(){
            var image_src = canvas_front.toDataURL("image/png");
            $('#image_prev').attr('src', image_src);
            $('#image_download').attr('href', image_src).show();
        });
    });
}); // $(function()
