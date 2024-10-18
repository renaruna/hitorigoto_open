$(function () {
    var userAgent = navigator.userAgent; // ユーザーエージェント判定

    //menu右から表示
    var $nav = $('.navigator');

    $('.front').click(function () {
        $('.front').fadeOut(250);//250ミリ秒で非表示
        $('.back').fadeIn(250);//250ミリ秒で表示
    });

    //アイコンを押しても戻る
    $('.back').click(function () {
        $('.back').fadeToggle(250);//250ミリ秒で非表示
        $('.front').fadeToggle(250);//250ミリ秒で表示
        $nav.animate({ 'marginRight': 0 }, 500);
    });

    //メニューを押しても戻る
    $nav.click(function () {
        $('.back').fadeToggle(250);//250ミリ秒で非表示
        $('.front').fadeToggle(250);//250ミリ秒で表示
        $nav.animate({ 'marginRight': 0 }, 500);
    });

    //メニューのリンクを押しても戻る
    $('.menu a[href*="#"]').click(function () {
        $('.back').fadeToggle(250);//250ミリ秒で非表示
        $('.front').fadeToggle(250);//250ミリ秒で表示
        $nav.animate({ 'marginRight': 0 }, 500);
    });

    //ページ内リンクへスクロール
    $('a[href*="#"]').click(function () { //全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK。元は#page-link a[href*="#"]。
        var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
        var pos = $(elmHash).offset().top;	//idの上部の距離を取得
        $('body,html').animate({ scrollTop: pos }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
        return false;
    });


    //トップへ戻るボタン
    var topBtn = $('#page_top');
    topBtn.hide();

    //ボタンの表示設定
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            // 画面を200pxスクロールしたら、800msかけてボタンを表示
            topBtn.fadeIn(800);
        } else {
            // 画面が200pxより上なら、800msかけてボタンを非表示
            topBtn.fadeOut(800);
        }
    });

    // ボタンをクリックしたら、スクロールして上に戻る
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

});