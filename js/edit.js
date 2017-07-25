$(function() {
    // canvasを定義
    num = 0;
    canvas_front = document.getElementById('canvas_front');
    canvas_back = document.getElementById('canvas_back');
    $('#canvas_front, #canvas_back').attr('width', '500px');
    $('#canvas_front, #canvas_back').attr('height', '300px');
    // ARモデル
    $("#canvas_back").drawImage({
        draggable: true,
        source: '../img/ar_model.png',
        x: 230, y: 30,
        width: 200,
        height: 200,
        fromCenter: false,
    });

    // 画像ロード
    var image_array = new Array();
    var image_name = ['../img/templete01.png', '../img/templete02.png', '../img/templete03.png', '../img/templete04.png', '../img/templete05.png'];
    for (var i = 0; i < image_name.length; i++) {
        image_array[i] = new Image();
        image_array[i].src = image_name[i];
    }
    // テンプレート(画像)を描画
    $('#background').change(function() {
        num = $('[name=background] option:selected').val();
        $("#canvas_front").drawImage({
            draggable: true,
            source: '../img/templete0'+num+'.png',
            x: 0, y: 0,
            width: 500,
            height: 300,
            fromCenter: false,
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

    // QRコードの描画とプレビュー画面のクリックイベント
    chrome.storage.sync.get({"public_token": ""}, function(items) {
        // canvas画像化
        $('#prev').click(function() {
            // ARカメラページQR
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
    }); // chrome.storage.sync.get({"public_token": ""}, function(items) {

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
        $('#modal-download').fadeOut(600);
    });
}); // $(function()
