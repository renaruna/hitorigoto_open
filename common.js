$(function () {
    var userAgent = navigator.userAgent; // ユーザーエージェント判定

    /* menuボタン押して、navigator全画面表示したり消えたり */
    var $nav = $('.navigator');

    //ハンバーガーメニュー押したら、navigator上から表示
    $('#header').on("click", ".menu-open", function () {
        //後から追加する要素は反映まで時間かかるから
        //元からある要素（documentとか）をセレクタに指定しといて
        //イベント設置すると動くらしい
        console.log("menu-open押された");

        $('.menu-open').fadeToggle(250);//250ミリ秒で非表示
        $('.menu-close').fadeToggle(250);//250ミリ秒で表示

        $nav.animate({ bottom: 0 }, 500);
    });

    //✕ボタン押したら、navigator上に戻って非表示
    $('#header').on("click", ".menu-close", function () {
        console.log("menu-close押された");

        $('.menu-close').fadeToggle(250);//250ミリ秒で非表示
        $('.menu-open').fadeToggle(250);//250ミリ秒で表示

        $nav.animate({ bottom: "100%" }, 500);
    });


    /* ページ内リンクへスクロール */
    $('a[href*="#"]').click(function () { //全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK。元は#page-link a[href*="#"]。
        var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
        var pos = $(elmHash).offset().top;	//idの上部の距離を取得
        $('body,html').animate({ scrollTop: pos }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
        return false;
    });


    /* トップへ戻るボタン実装 */
    var topBtn = $('#page_top');
    topBtn.hide();

    //ある程度スクロールしたら、ボタン表示する
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
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    });

});