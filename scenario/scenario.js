fetch('https://script.google.com/macros/s/AKfycbwa2cetqBvNrHkmr-i8gaiMUC12uDHoAG4RI7XYIzyHh4UW_joqJTGSp5fQqENEzjCq/exec'
    + '?tool=scenario&scenarioID=' + scenarioID)
    .then(response => response.json())
    .then(function (data) {
        //タイトル
        document.title = data.scenario.scenarioName + '/独り言卓INDEX';

        //パンくずリストの現在地
        const hereElement = document.getElementById('here');
        hereElement.textContent = data.scenario.scenarioName;

        const genreElement = document.getElementById('genre');
        const scenarioNameElement = document.getElementById('scenarioName');
        const scenarioMakerElement = document.getElementById('scenarioMaker');
        const scenarioURLElement = document.getElementById('scenarioURL');
        const sessionListElement = document.getElementById('session-list');

        genreElement.textContent = setValue(data.scenario.genre); //シナリオジャンル
        scenarioNameElement.textContent = data.scenario.scenarioName; //シナリオタイトル
        scenarioMakerElement.textContent = setValue(data.scenario.scenarioMaker); //シナリオ作成者

        //シナリオURL
        const scenarioUrl = setValue(data.scenario.scenarioURL);
        console.log("data.scenario.scenarioURL:" + data.scenario.scenarioURL);
        console.log("type:" + typeof(data.scenario.scenarioURL));
        console.log("scenarioUrl:" + scenarioUrl);
        console.log("type:" + typeof(scenarioUrl));
        if (URL.canParse(scenarioUrl)) {
            urlHtml = '<a target="_blank" rel="noopener noreferrer" href="' + scenarioUrl + '">' + scenarioUrl + '</a>';
            scenarioURLElement.innerHTML = urlHtml;
        } else {
            scenarioURLElement.textContent = scenarioUrl;
        }

        //セッション数の合計
        const sessionSum = data.scenario.sessionSum;
        //セッション全部のHTML
        let sessionsHtml = '';
        //1セッションずつHTML作成し、追加
        for (let i = 0; i < sessionSum; i++) {
            sessionsHtml += createSessionHtml(data.scenario, data.session[i]);
        }

        sessionListElement.innerHTML = sessionsHtml;
    });

function createSessionHtml(scenarioData, sessionData) {
    let html = '<div class="detail">'

    //セッション日と時間
    let topHtml = '<div class="session-top"><table><tr><th>セッション日</th><th>セッション時間</th></tr>';
    topHtml += '<tr><td><p class="date">' + setValue(sessionData.date) + '</p></td>'
        + '<td><p class="time">' + setValue(sessionData.time) + '</p></td></tr></table></div>';

    //KP
    //ジャンルによってKPとかGMとか分ける
    let kpHtml = '';
    if (scenarioData.genre == "クトゥルフ神話TRPG") {
        kpHtml += '<div class="session-kp"><h3>KP</h3><p class="kp">' + setValue(sessionData.kp) + '</p></div>';
    } else if (scenarioData.genre == "エモクロアTRPG") {
        kpHtml += '<div class="session-kp"><h3>DL</h3><p class="kp">' + setValue(sessionData.kp) + '</p></div>';
    } else {
        kpHtml += '<div class="session-kp"><h3>GM</h3><p class="kp">' + setValue(sessionData.kp) + '</p></div>';
    }

    //PC：HOとPCとPL
    let pcHtml = '<div class="session-pc"><h3>PC</h3><div class="pc-characters">';

    //1キャラクターずつ回してHTML文作成
    for (let i = 0; i < sessionData.playerNum; i++) {
        //1キャラクター分（plName,pcName,pcFilename,pcIcon）
        let onePCPL = sessionData.pcs[i];

        //HO欄
        if (scenarioData.hoNum > 0) { //HOありのとき
            if (scenarioData.existHOname == 1) {
                //HO名称があるとき
                pcHtml += '<div class="pc-character"><p class="ho">HO' + (i + 1) + ':' + scenarioData.hoName[i] + '</p>';
            } else {
                //HO名称がないとき
                pcHtml += '<div class="pc-character"><p class="ho">HO' + (i + 1) + '</p>';
            }
        } else { //HOなしのとき
            pcHtml += '<div class="pc-character">';
        }

        //PCボックス欄
        if (scenarioData.genre == "マーダーミステリー") {
            //ボックス作らない
        } else {
            pcHtml += '<a href="../member/' + onePCPL.pcFilename + '">'; //キャラクターページへのリンク
            pcHtml += '<div class="charaImg"><img src="' + setIcon(onePCPL.pcIcon) + '">'; //アイコン画像リンク
            pcHtml += '<p>' + onePCPL.pcName + '</p>'; //キャラ名
            pcHtml += '</div></a>';
        }
        //PL欄
        pcHtml += '<p class="pl">PL:' + onePCPL.plName + '</p></div>';
    }

    pcHtml += '</div></div>';

    html += topHtml + kpHtml + pcHtml + '</div>';

    return html;
}

//空欄だったら代替テキスト入れる
function setValue(value) {
    //空文字"",0,false,undefined,nullのときfalse、それ以外はそのまま返す
    if (value) {
        return value;
    }
    //0のときもそのまま返す
    if (value == 0) {
        return value;
    }
    //空文字"",false,undefined,nullのとき
    return '---';

}

//アイコン項目が空のとき、no-image.webpを差し込む
function setIcon(iconText) {
    if (iconText == '') {
        return 'https://hikarutau.cloudfree.jp/Hitorigoto-Index/img/no-image.webp';
    }
    return iconText;
}
