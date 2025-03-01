/* アニメーションに関するjQuery */

$(function () {
    var userAgent = navigator.userAgent; // ユーザーエージェント判定

    /* ナビゲーション開閉 */
    //ハンバーガーメニューアイコン押すか、ナビゲーションそのものか、暗くなった背景カバーのうちのどれか押されたとき、
    $('#header').on("click", '#js-hamburger-menu, .navigation__link, .navigation-cover', function () {
        /*  後から追加する要素は反映まで時間かかるから
            元からある要素（documentとか）をセレクタに指定しといてイベント設置すると動くらしい */

        //ナビ画面が表示されていたらslide upで非表示、非表示されていたらslide downで表示される
        $('.navigation').slideToggle(500);

        //開いてるクラスがついてるときはremoveClass、クラスついてなかったらaddClass
        $('.hamburger-menu').toggleClass('hamburger-menu--open');
    });


    /* ページ内リンクへスクロール */
    $('.page-link a[href ^= "#"]').click(function () { //class="page-link"のうち、href属性が"#"で始まるa要素を押した場合
        var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
        var position = $(elmHash).offset().top;	//idの上部の距離を取得
        $('body,html').animate({ scrollTop: (position - 50) }, 500); //取得した位置-ヘッダ50pxにスクロール。500msかけてスクロール
        return false;
    });


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


    /* アコーディオン実装
        参考：https://lab.dxo.co.jp/notes/web-design/accordion-menu */
    $(document).ready(function () {
        let accordionDetails = '.js-accordion';
        let accordionSummary = '.js-accordion-title';
        let accordionContent = '.js-accordion-content';
        let speed = 500;

        $(accordionSummary).each(function () {
            $(this).on("click", function (event) {
                // summaryにis-activeクラスを切り替え
                $(this).toggleClass("is-active");
                // デフォルトの挙動を無効化
                event.preventDefault();
                if ($(this).parent($(accordionDetails)).attr("open")) {
                    // アコーディオンを閉じるときの処理
                    $(this).nextAll($(accordionContent)).slideUp(speed, function () {
                        // アニメーションの完了後にopen属性を取り除く
                        $(this).parent($(accordionDetails)).removeAttr("open");
                        // display:none;を消して、ページ内検索にヒットするようにする
                        $(this).show();
                    });
                } else {
                    // アコーディオンを開くときの処理
                    // open属性を付ける
                    $(this).parent($(accordionDetails)).attr("open", "true");
                    // いったんdisplay:none;してからslideDownで開く
                    $(this).nextAll($(accordionContent)).hide().slideDown(speed);
                }
            });

            $(this).closest(accordionDetails).find('.close-btn').on('click', function (eventclosee) {
                eventclosee.preventDefault();
                //「閉じる」ボタンがクリックされた場合にsummaryの.is-activeを外す
                $(this).closest(accordionDetails).find(accordionSummary).removeClass("is-active");
                //「閉じる」ボタンがクリックされた場合にdetails-contentを閉じる
                $(this).closest(accordionContent).slideUp(speed, function () {
                    //「閉じる」ボタンがクリックされた場合にdetailsのopen属性を外す
                    $(this).closest(accordionDetails).removeAttr("open");
                });
            });
        });
    });

});