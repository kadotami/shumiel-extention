$(function() {
    // canvasを定義
    canvas_front = document.getElementById('canvas_front');
    canvas_back = document.getElementById('canvas_back');
    $('#canvas_front, #canvas_back').attr('width', '500px');
    $('#canvas_front, #canvas_back').attr('height', '300px');

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
        $('#background').change(function() {
            var img = $('[name=background] option:selected').val();
            console.log(image_array[img]);
            $('#canvas_front').drawImage({
                draggable: true,
                source: image_array[img],
                x: 0, y: 0,
                width: 500,
                height: 300,
                fromCenter: false,
                /*dblclick: function(layer) {
                    $(this).removeLayer(layer);
                }*/
            });
        });

        // 文字を描画
        $('#add_text').click(function() {
            var text = $('#inp').val();
            var fontsize = $('#fontsize').val();
            var selectcolor = $('#color-list').val();
            console.log(text);
            console.log(fontsize);
            console.log(selectcolor);
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
            alert(name);
            $('#canvas_front').drawImage({
                draggable: true,
                source: name,
                x: 0, y: 0,
                width: 500,
                height: 300,
                fromCenter: false,
                dblclick: function(layer) {
                    $(this).removeLayer(layer);
                }
            });
        });

        // 名刺の裏をレイアウトする
        var token = items.public_token;
        $("#canvas_back").drawImage({
            draggable: true,
            crossOrigin: 'anonymous',
            source: 'http://chart.apis.google.com/chart?chs=400x400&cht=qr&chl=https://shumiel.modern-min.net/?token='+token,
            x: 30, y: 30,
            width: 200,
            height: 200,
            fromCenter: false,
        });

        // canvas画像化
        $('#prev').click(function() {
            var image_src_front = canvas_front.toDataURL("image/png");
            var image_src_back = canvas_back.toDataURL("image/png");
            console.log(image_src_front);
            console.log(image_src_back);
            $('#image_prev_front').attr('src', image_src_front);

            // モーダル処理
            $('#image_download_front').attr('href', image_src_front);
            $('#image_download_back').attr('href', image_src_back);
            $('#modal-download').fadeIn(600);
            $('.cancel').click(function() {
                $('#modal-download').fadeOut(600);
            });

            // ダウンロードイベント
            $('.download').click(function() {
                $('#image_download_front')[0].click();
                $('#image_download_back')[0].click();
            });
        });
    });
    $('.help-contents').click(function() {
        $('#modal-tutorial').fadeIn(600);
    });

    $('.next').click(function() {
        $('#modal-tutorial').fadeOut(600);
    });
}); // $(function()
