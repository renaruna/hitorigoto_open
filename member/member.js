fetch('https://script.google.com/macros/s/AKfycbyT4BAclnAPMRHC7kbEojQc_bE1AtvflJSWFcp5m5pXt8NxMkoqeSRB5wq900Xt-hwI/exec'
    + '?tool=member&member=' + member)
    .then(response => response.json())
    .then(function (responseBody) {
        //受け取ったコンテンツを表示するところ
        const characterElement = document.getElementById('member-character');
        const kpElement = document.getElementById('member-kp');
        const plElement = document.getElementById('member-pl');

        //エラーがある場合messageを表示
        if (!responseBody.success) {
            console.error('エラー:', responseBody.message);
            alert(`エラーが発生しました。必要であれば管理人にご連絡ください。\nメッセージ: ${responseBody.message}`);

            const errorText = 'エラーのため読み込めません。';
            characterElement.textContent = errorText;
            characterElement.style.color = 'red';
            kpElement.textContent = errorText;
            kpElement.style.color = 'red';
            plElement.textContent = errorText;
            plElement.style.color = 'red';
            return;
        }

        //正常に受け取っていれば、データ取得
        const data = responseBody.data;

        const charaArray = data.chara;
        const kpArray = data.kp;
        const plArray = data.pl;

        //キャラ一覧
        let characterHtml = '';
        let existCharaNum = charaArray.length;
        for (let i = 0; i < existCharaNum; i++) {
            characterHtml += '<a href="' + charaArray[i].charaFilename + '">';
            characterHtml += '<div class="charaImg">';
            characterHtml += '<img src="' + setIcon(charaArray[i].charaIcon) + '">';
            characterHtml += '<p>' + charaArray[i].charaName + '</p>';
            characterHtml += '</div></a>';
        }

        // 探索者たちがflexで並べられている→最後の行のボックスたちを左寄せにしたい
        // →空白のボックスを用意する
        blankNum = 7 - (existCharaNum % 7);
        for (let i = 0; i < blankNum; i++) {
            characterHtml += '<a class="blank-box"></a>';
        }

        characterElement.innerHTML = characterHtml;

        //KP一覧
        let kpHtml = '';
        for (let i = 0; i < kpArray.length; i++) {
            kpHtml += '<p><a href="../../scenario/' + kpArray[i].scenarioFilename + '">'
                + kpArray[i].scenarioName + '</a></p>';
        }
        //最後の改行文字を消して埋め込み
        kpElement.innerHTML = kpHtml.slice(0, -4);

        //PL一覧
        let plHtml = '<table>';
        for (let i = 0; i < plArray.length; i++) {
            //シナリオ
            plHtml += '<tr><td><a href="../../scenario/' + plArray[i].scenarioFilename + '">'
                + plArray[i].scenarioName + '</a></td>';
            //【HO】キャラ
            plHtml += '<td><a href="' + plArray[i].charaFilename + '">'
                + plArray[i].hoSentence + plArray[i].charaName + '</a></td></tr>';
        }
        plElement.innerHTML = plHtml + '</table>';

    });

//アイコン項目が空のとき、no-image.webpを差し込む
function setIcon(iconText) {
    if (iconText == '') {
        return 'https://hikarutau.cloudfree.jp/Hitorigoto-Index/img/no-image.webp';
    }
    return iconText;
}