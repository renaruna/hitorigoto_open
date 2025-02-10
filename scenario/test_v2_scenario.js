fetch('https://script.google.com/macros/s/AKfycbwa2cetqBvNrHkmr-i8gaiMUC12uDHoAG4RI7XYIzyHh4UW_joqJTGSp5fQqENEzjCq/exec'
    + '?member=off&charaID=off&scenarioID=' + scenarioID)
    .then(response => response.json())
    .then(function (data) {
        document.title = data.scenario.scenarioName + '/独り言卓INDEX';

        const genreElement = document.getElementById('genre');
        const scenarioNameElement = document.getElementById('scenarioName');
        const scenarioMakerElement = document.getElementById('scenarioMaker');
        const scenarioURLElement = document.getElementById('scenarioURL');
        const sessionListElement = document.getElementById('session-list');

        genreElement.textContent = data.scenario.genre; //シナリオジャンル
        scenarioNameElement.textContent = data.scenario.scenarioName; //シナリオタイトル
        scenarioMakerElement.textContent = data.scenario.scenarioMaker; //シナリオ作成者

        //シナリオURL
        const scenarioUrl = data.scenario.scenarioURL;
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
    topHtml += '<tr><td><p class="date">' + sessionData.date + '</p></td><td><p class="time">' + sessionData.time + '</p></td></tr></table></div>';

    //KP
    //ジャンルによってKPとかGMとか分ける
    let kpHtml = '';
    if (scenarioData.genre == "クトゥルフ神話TRPG") {
        kpHtml += '<div class="session-kp"><h3>KP</h3><p class="kp">' + sessionData.kp + '</p></div>';
    } else if (scenarioData.genre == "エモクロアTRPG") {
        kpHtml += '<div class="session-kp"><h3>DL</h3><p class="kp">' + sessionData.kp + '</p></div>';
    } else {
        kpHtml += '<div class="session-kp"><h3>GM</h3><p class="kp">' + sessionData.kp + '</p></div>';
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

        //PC欄
        pcHtml += '<a href="../member/' + onePCPL.pcFilename + '">'; //キャラクターページへのリンク
        pcHtml += '<div class="charaImg"><img src="' + onePCPL.pcIcon + '">'; //アイコン画像リンク
        pcHtml += '<p>' + onePCPL.pcName + '</p>'; //キャラ名
        pcHtml += '</div></a>';

        //PL欄
        pcHtml += '<p class="pl">PL:' + onePCPL.plName + '</p></div>';
    }

    pcHtml += '</div></div>';

    html += topHtml + kpHtml + pcHtml + '</div>';

    return html;
}