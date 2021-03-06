$(function() {
    // 初期化
    var inc = 0;
    canvas_front = document.getElementById('canvas_front');
    canvas_back = document.getElementById('canvas_back');
    $('#canvas_front, #canvas_back').attr('width', '500px');
    $('#canvas_front, #canvas_back').attr('height', '300px');

    // 背景色の設定
    $('#canvas_back').drawRect({ fillStyle: '#fff', x: 0, y: 0, width: 2000, height: 2000 });
    $("#canvas_front").drawImage({ draggable: true, source: '../img/templete01.png', x: 0, y: 0, width: 500, height: 300, fromCenter: false, name: 'background', layer: true, });

    // ARモデル
    $("#canvas_back").drawImage({
        draggable: true,
        source: '../img/ar_model.png',
        x: 250, y: 25,
        width: 250,
        height: 250,
        fromCenter: false,
    });

    // 文字を描画
    $('#add_text').click(function() {
        var text = $('#inp').val();
        var fontsize = $('#fontsize').val();
        var selectcolor = $('#color-list').val();
        var fontstyle = $('#fontstyle').val();
        $("#canvas_front").drawText({
            draggable: true,
            fillStyle: selectcolor,
            strokeWidth: "0",
            x: 120,
            y: 120,
            fontSize: fontsize,
            fontFamily: fontstyle,
            text: text,
            name: 'text'+inc,
            layer: true,
            cursors: {
                mouseover: 'pointer',
                mousedown: 'move',
                mouseup: 'pointer',
            },
            dblclick: function(layer) {
                $(this).removeLayer(layer);
            }
        });
        inc++;
        var text = $('#inp').val(''); // 後片付け
    });

    // 画像を描画する
    $('#add_image').click(function() {
        //サイズを指定
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

    // QRコードの描画とプレビュー画面のクリックイベント
    chrome.storage.sync.get({"public_token": ""}, function(items) {
        // QRコード
        var token = items.public_token;
        $("#canvas_back").drawImage({
            draggable: true,
            crossOrigin: 'anonymous',
            source: 'http://chart.apis.google.com/chart?chs=400x400&cht=qr&chl=https://shumiel.modern-min.net/?token='+token,
            x: 0, y: 25,
            width: 250,
            height: 250,
            fromCenter: false,
        });
    }); // chrome.storage.sync.get({"public_token": ""}, function(items) {

    // canvas画像化
    $('#prev').click(function() {
        // カードをダウンロードするまでを行う
        var image_src_front = canvas_front.toDataURL("image/png");
        var image_src_back = canvas_back.toDataURL("image/png");
        $('#image_prev_front').attr('src', image_src_front);
        $('#image_prev_back').attr('src', image_src_back);

        // モーダル処理
        $('#image_download_front').attr('href', image_src_front);
        $('#image_download_back').attr('href', image_src_back);
        $('#modal-download').fadeIn(1000);
    }); // $('#prev')

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

    $('#select_image').click(function() {
        $('#upload_image')[0].click();
    });

    $('.download').click(function() {
        $('#image_download_front')[0].click();
        $('#image_download_back')[0].click();
        $('#modal-download').fadeOut(600);
    });

    $('#select img').click(function() {
        $('#select img').removeClass('selected');
        $(this).addClass('selected');
        $("#canvas_front").setLayer('background', {
            source: "."+$(this).attr('src'),
        }).drawLayers();
    });

    // ホバーイベント
    $('#select img').mouseenter(function() {
        $('#temp_prev').show();
        var src = $(this).attr('src');
        $('#temp_prev').css('background-image', 'url('+src+')');
    }).mouseleave(function() {
        $('#temp_prev').hide();
    });

}); // $(function()
