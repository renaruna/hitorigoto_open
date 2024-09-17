$(function () {
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