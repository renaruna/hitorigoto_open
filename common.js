$(function () {
    var userAgent = navigator.userAgent; // ユーザーエージェント判定

    /* ナビゲーション開閉 */
    $('#header').on("click", '#js-hamburger-menu, .navigation__link', function () {
        /*  後から追加する要素は反映まで時間かかるから
            元からある要素（documentとか）をセレクタに指定しといてイベント設置すると動くらしい */

        //ハンバーガーメニューアイコン押すか、ナビゲーションのうちのどれか押されたとき、

        //ナビ画面が表示されていたらslide upで非表示、非表示されていたらslide downで表示される
        $('.navigation').slideToggle(500);

        //開いてるクラスがついてるときはremoveClass、クラスついてなかったらaddClass
        $('.hamburger-menu').toggleClass('hamburger-menu--open');
    });

    // /* ページ内リンクへスクロール */
    // $('a[href*="#"]').click(function () { //全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK。元は#page-link a[href*="#"]。
    //     var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
    //     var pos = $(elmHash).offset().top;	//idの上部の距離を取得
    //     $('body,html').animate({ scrollTop: pos }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
    //     return false;
    // });


    /* トップへ戻るボタン実装 */
    var topBtn = $('#page_top');
    topBtn.hide();

    // ある程度スクロールしたら、ボタン表示する
    $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            // 画面を400pxスクロールしたら、800msかけてボタンを表示
            topBtn.show();
        } else {
            // 画面が400pxより上なら、800msかけてボタンをs非表示
            topBtn.hide();
        }
    });

    // ボタンをクリックしたら、スクロールして上に戻る
    topBtn.click(function () {
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    });

});