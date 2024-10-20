$(function () {
    var userAgent = navigator.userAgent; // ユーザーエージェント判定

    /* menuボタン押して、ナビゲーション開閉 */
    $('#header').on("click", '#js-hamburger-menu, .navigation__link', function () {
        $('.navigation').slideToggle(500)
        $('.hamburger-menu').toggleClass('hamburger-menu--open')
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