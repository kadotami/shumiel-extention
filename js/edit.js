$(function() {
    // canvasを定義
    num = 1;
    canvas_front = document.getElementById('canvas_front');
    canvas_back = document.getElementById('canvas_back');
    $('#canvas_front, #canvas_back').attr('width', '500px');
    $('#canvas_front, #canvas_back').attr('height', '300px');

    // QRコードを準備
    chrome.storage.sync.get({"public_token": ""}, function(items) {

        // 画像ロード
        var image_array = new Array();
        var image_name = ['../img/templete01.png', '../img/templete02.png', '../img/templete03.png', '../img/templete04.png', '../img/templete05.png'];
        for (var i = 0; i < image_name.length; i++) {
            image_array[i] = new Image();
            image_array[i].src = image_name[i];
        }

        function card_back_create() {
            // 名刺の裏をレイアウトする
            var token = items.public_token;
            $("#canvas_back").drawImage({
                source: '../img/templete0'+num+'.png',
                x: 0, y: 0,
                width: 500,
                height: 300,
                fromCenter: false,
            });

            // AR項目に必要なもの
            $("#canvas_back").drawImage({
                draggable: true,
                crossOrigin: 'anonymous',
                source: 'http://chart.apis.google.com/chart?chs=400x400&cht=qr&chl=https://shumiel.modern-min.net/?token='+token,
                x: 30, y: 30,
                width: 200,
                height: 200,
                fromCenter: false,
            });

            $("#canvas_back").drawImage({
                draggable: true,
                source: '../img/ar_model.png',
                x: 230, y: 30,
                width: 200,
                height: 200,
                fromCenter: false,
            });

            if (num == 1 || num == null || num == 0) {
                 $("#canvas_front").drawImage({
                    source: '../img/templete01.png',
                    x: 0, y: 0,
                    width: 500,
                    height: 300,
                    fromCenter: false,
                });
            }

        }
        // テンプレート(画像)を描画
        $('#background').change(function() {
            num = $('[name=background] option:selected').val();
            //$('#canvas_front').css('background-image', 'url(../img/templete0'+num+'.png)');
            $("#canvas_front").drawImage({
                source: '../img/templete0'+num+'.png',
                x: 0, y: 0,
                width: 500,
                height: 300,
                fromCenter: false,
            });

/*            $("#canvas_back").drawImage({
                draggable: true,
                source: image_name[num],
                x: 30, y: 30,
                width: 200,
                height: 200,
                fromCenter: false,
            });*/

            /*console.log(image_array[img]);
            $('#canvas_front').drawImage({
                draggable: true,
                source: image_array[img],
                x: 0, y: 0,
                width: 500,
                height: 300,
                fromCenter: false,
            });*/
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
                x: 120,
                y: 120,
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
                width: 500,
                height: 300,
                fromCenter: false,
                dblclick: function(layer) {
                    $(this).removeLayer(layer);
                }
            });
        });

        // canvas画像化
        $('#prev').click(function() {
            // カードの裏をcanvasに描画する
            card_back_create();

            // カードをダウンロードするまでを行う
            var image_src_front = canvas_front.toDataURL("image/png");
            var image_src_back = canvas_back.toDataURL("image/png");
            console.log(image_src_front);
            console.log(image_src_back);
            $('#image_prev_front').attr('src', image_src_front);

            // モーダル処理
            $('#image_download_front').attr('href', image_src_front);
            $('#image_download_back').attr('href', image_src_back);
            $('#modal-download').fadeIn(600);

        });
    });

    // クリックイベント系
    $('.help-contents').click(function() {
        $('#modal-tutorial').fadeIn(600);
    });

    $('.cancel').click(function() {
        $('#modal-download').fadeOut(600);
    });
    $('.next').click(function() {
        $('#modal-tutorial').fadeOut(600);
    });
    $('.download').click(function() {
        $('#image_download_front')[0].click();
        $('#image_download_back')[0].click();
    });
}); // $(function()
