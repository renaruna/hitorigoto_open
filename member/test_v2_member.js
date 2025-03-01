fetch('https://script.google.com/macros/s/AKfycbwa2cetqBvNrHkmr-i8gaiMUC12uDHoAG4RI7XYIzyHh4UW_joqJTGSp5fQqENEzjCq/exec'
    + '?tool=member&member=' + member)
    .then(response => response.json())
    .then(function (data) {
        const charaArray = data.chara;
        const kpArray = data.kp;
        const plArray = data.pl;

        const characterElement = document.getElementById('member-character');
        const kpElement = document.getElementById('member-kp');
        const plElement = document.getElementById('member-pl');

        //キャラ一覧
        let characterHtml = '';
        let existCharaNum = charaArray.length;
        for (let i = 0; i < existCharaNum; i++) {
            characterHtml += '<a href="' + charaArray[i].charaFilename + '">';
            characterHtml += '<div class="charaImg">';
            characterHtml += '<img src="' + charaArray[i].charaIcon + '">';
            characterHtml += '<p>' + charaArray[i].charaName + '</p>';
            characterHtml += '</div></a>';
        }

        // 探索者たちがflexで並べられている→最後の行のボックスたちを左寄せにしたい
        // →空白のボックスを用意する
        blankNum = 6 - (existCharaNum % 6);
        for (let i = 0; i < blankNum; i++) {
            characterHtml += '<a style="width:123px;"></a>';
        }

        characterElement.innerHTML = characterHtml;

        //KP一覧
        let kpHtml = '';
        for (let i = 0; i < kpArray.length; i++) {
            kpHtml += '<a href="../../scenario/' + kpArray[i].scenarioFilename + '">'
                + kpArray[i].scenarioName + '</a><br>';
        }
        //最後の改行文字を消して埋め込み
        kpElement.innerHTML = kpHtml.slice(0, -4);

        //PL一覧
        let plHtml = '<table>';
        for (let i = 0; i < plArray.length; i++) {
            //シナリオ
            plHtml += '<tr><td><p><a href="../../scenario/' + plArray[i].scenarioFilename + '">'
                + plArray[i].scenarioName + '</a></p></td>';
            //【HO】キャラ
            plHtml += '<td><p><a href="' + plArray[i].charaFilename + '">'
                + plArray[i].hoSentence + plArray[i].charaName + '</a></p></td></tr>';
        }
        plElement.innerHTML = plHtml + '</table>';

    });