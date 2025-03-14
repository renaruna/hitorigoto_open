const MEMBER_ENG = ["driver", "manager", "boss", "spiritual", "warcrim", "creator"];
const MEMBER_JAP = ["運転手", "管理人", "上司", "スピリチュアルな存在。", "戦犯", "創造主"];

fetch('https://script.google.com/macros/s/AKfycbzjCXoB0CWk9irqnG4hBaGSHA9EPDefmMzAx4mXrB9XoR0R78LQLUjXT_xSy1bpMcjahg/exec?scenarioID=' + scenarioID)
    .then(response => response.json())
    .then(async function (data) {
        const scenarioNameElement = document.getElementById('scenarioName');
        const scenarioMakerElement = document.getElementById('scenarioMaker');
        const scenarioURLElement = document.getElementById('scenarioURL');
        const sessionListElement = document.getElementById('session-list');

        scenarioNameElement.textContent = data[0].scenarioName; //シナリオタイトル
        scenarioMakerElement.textContent = data[0].scenarioMaker; //シナリオ作成者

        //シナリオURL
        const scenarioUrl = data[0].scenarioURL;
        if (URL.canParse(scenarioUrl)) {
            urlHtml = '<a target="_blank" rel="noopener noreferrer" href="' + scenarioUrl + '">' + scenarioUrl + '</a>';
            scenarioURLElement.innerHTML = urlHtml;
        } else {
            scenarioURLElement.textContent = scenarioUrl;
        }

        //セッション数の合計
        const sessionSum = data[0].sessionSum;
        //セッション全部のHTML
        let sessionsHtml = '';
        //1セッションずつHTML作成し、追加
        for (let i = 0; i < sessionSum; i++) {
            sessionsHtml += await createSessionHtml(data[0], data[i + 1]);
        }

        sessionListElement.innerHTML = sessionsHtml;
    });

async function createSessionHtml(scenarioData, sessionData) {
    let html = '<div class="detail">'

    //セッション日と時間
    let topHtml = '<div class="session-top"><table><tr><th>セッション日</th><th>セッション時間</th></tr>';
    topHtml += '<tr><td><p class="date">' + sessionData.date + '</p></td><td><p class="time">' + sessionData.time + '</p></td></tr></table></div>';

    //KP
    let kpHtml = '<div class="session-kp"><h3>KP</h3><p class="kp">' + sessionData.kp + '</p></div>';

    //PC：HOとPCとPL
    let pcHtml = '<div class="session-pc"><h3>PC</h3><div class="pc-characters">';

    //1キャラクターずつ回してHTML文作成
    for (let i = 0; i < sessionData.playerNum; i++) {
        //plとpcがセットになった1キャラクター分
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

        //PCPL欄
        const memberId = MEMBER_ENG.indexOf(onePCPL.pl);
        if (memberId < 0) {
            //plがメンバーでない場合
            //PC情報
            pcHtml += '<a><div class="charaImg"><img>';
            pcHtml += '<p>' + onePCPL.pc + '</p></div></a>';
            //PL情報
            pcHtml += '<p class="pl">PL:' + onePCPL.pl + '</p></div>';
        } else {
            //plがメンバーの場合
            //plには英名、pcにはcharaIDが入っている
            const response = await fetch('https://script.google.com/macros/s/AKfycbyjMTeRaNtT2HKEKkYdilkQg3RYP9JOlDJ8s27e7HK6NeRv67cwv03RLVyWRwDC-pN03A/exec?member=' + onePCPL.pl);
            const memberCharaData = await response.json();
            const charaData = memberCharaData[onePCPL.pc];

            //PC情報
            pcHtml += '<a href="../member/' + onePCPL.pl + '/' + charaData.charaFilename + '">'; //キャラクターページへのリンク
            pcHtml += '<div class="charaImg"><img src="' + charaData.icon + '">'; //アイコン画像リンク
            pcHtml += '<p>' + charaData.charaName + '</p>'; //キャラ名
            pcHtml += '</div></a>';
            //PL情報
            pcHtml += '<p class="pl">PL:' + MEMBER_JAP[memberId] + '</p></div>';
        }
    }
    pcHtml += '</div></div>';

    html += topHtml + kpHtml + pcHtml + '</div>';

    return html;
}
