fetch('https://script.google.com/macros/s/AKfycbwa2cetqBvNrHkmr-i8gaiMUC12uDHoAG4RI7XYIzyHh4UW_joqJTGSp5fQqENEzjCq/exec'
    + '?tool=character&member=' + member + '&charaID=' + charaID)
    .then(response => response.json())
    .then(function (data) {
        //タイトル
        document.title = data.charaName + '/独り言卓INDEX';

        //パンくずリストの現在地
        const hereElement = document.getElementById('here');
        hereElement.textContent = data.charaName;

        //名前から自己紹介までのid取得
        const charaNameElement = document.getElementById('charaName');
        const hiranameElement = document.getElementById('hiraname');
        const iconElement = document.getElementById('icon');
        const iconMakerElement = document.getElementById('iconMaker');
        const introductionElement = document.getElementById('introduction');
        //表のid取得
        const ageElement = document.getElementById('age');
        const sexElement = document.getElementById('sex');
        const heightElement = document.getElementById('height');
        const jobElement = document.getElementById('job');
        const birthdayElement = document.getElementById('birthday');
        const charaColorElement = document.getElementById('charaColor');
        //詳細のid取得
        const scenarioListElement = document.getElementById('scenarioList');
        const charaLinkElement = document.getElementById('charaLink');
        const freeCommentElement = document.getElementById('freeComment');

        //名前から自己紹介までSET
        charaNameElement.textContent = data.charaName;
        hiranameElement.textContent = data.hiraname;
        iconElement.setAttribute("src", setIcon(data.icon));
        iconMakerElement.textContent = setValue(data.iconMaker);
        introductionElement.innerHTML = change(data.introduction, "\n", "<br>");

        //表SET
        ageElement.textContent = setValue(data.age);
        sexElement.textContent = setValue(data.sex);
        heightElement.textContent = setValue(data.height);
        jobElement.textContent = setValue(data.job);
        birthdayElement.textContent = setValue(data.birthday);
        //色
        let backgroundColor; //キャラの色が背景の色に
        let textColor; //背景色に合った文字の色（黒か白）
        let colorCodeFirstIndex = data.charaColor.indexOf("#");
        if (colorCodeFirstIndex > -1) { //16進数コードが見つかった場合
            backgroundColor = data.charaColor.substr(colorCodeFirstIndex, 7);
            textColor = blackOrWhite(backgroundColor);
        } else { //16進数コードが見つからなかった場合
            backgroundColor = "transparent";
            textColor = "black";
        }
        charaColorElement.textContent = setValue(data.charaColor); //テキストSET
        charaColorElement.style.backgroundColor = backgroundColor; //背景色SET
        charaColorElement.style.color = textColor; //文字色SET

        //詳細SET
        //通過シナリオ
        const lists = data.scenarioList;
        let sessionListHtml = '';
        for (let i = 0; i < data.sessionNum; i++) {
            sessionListHtml += '<a href = "../../scenario/' + lists[i].scenarioFilename + '">'
                + lists[i].scenarioName + lists[i].hoSentence + '</a><br>';
        }
        //最後の改行文字を消して埋め込み
        scenarioListElement.innerHTML = sessionListHtml.slice(0, -4);

        //キャラリンク
        charaLinkElement.setAttribute("href", data.charaLink);
        charaLinkElement.textContent = setValue(data.charaLink);
        //自由欄
        freeCommentElement.textContent = change(setValue(data.freeComment), "\n", "<br>");

    });

function change(text, a, b) {
    let i = 0;
    let length = text.length;
    for (i = 0; i < length; i++) {
        text = text.replace(a, b);
    }
    return text;
}

//空欄だったら代替テキスト入れる
function setValue(value) {
    //空文字''のとき、変換
    if (value == '') {
        return '---';
    }
    return value;
}

//アイコン項目が空のとき、no-image.webpを差し込む
function setIcon(iconText) {
    if (iconText == '') {
        return 'https://hikarutau.cloudfree.jp/Hitorigoto-Index/img/no-image.webp';
    }
    return iconText;
}

function blackOrWhite(hexcolor) {
    var r = parseInt(hexcolor.substr(1, 2), 16);
    var g = parseInt(hexcolor.substr(3, 2), 16);
    var b = parseInt(hexcolor.substr(5, 2), 16);

    return ((((r * 299) + (g * 587) + (b * 114)) / 1000) < 128) ? "white" : "black";
}