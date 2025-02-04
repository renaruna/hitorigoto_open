fetch('https://script.google.com/macros/s/AKfycbzjCXoB0CWk9irqnG4hBaGSHA9EPDefmMzAx4mXrB9XoR0R78LQLUjXT_xSy1bpMcjahg/exec?scenarioID=' + scenarioID)
    .then(response => response.json())
    .then(function (data) {
        const scenarioNameElement = document.getElementById('scenarioName');
        const scenarioMakerElement = document.getElementById('scenarioMaker');
        const scenarioURLElement = document.getElementById('scenarioURL');
        const sessionListElement = document.getElementById('session-list');

        scenarioNameElement.textContent = data[0].scenarioName;
        scenarioMakerElement.textContent = data[0].scenarioMaker;
        scenarioURLElement.textContent = data[0].scenarioURL;

        const sessionSum = data[0].sessionSum; //セッション数の合計

        // let aHtml = "<ul>";

        // for (let i = 0; i < data.length; i++) { // i=0のとき scenarioID=1
        //     let name = data[i].scenarioName;
        //     let link = data[i].scenarioFilename;
        //     let kasira = data[i].yomi;

        //     if (kasira.indexOf("あ") == 0 || kasira.indexOf("い") == 0 || kasira.indexOf("う") == 0 || kasira.indexOf("え") == 0 || kasira.indexOf("お") == 0) {
        //         aHtml += '<li><a href="' + link + '">' + change(name, "#", ",") + '</a></li>';
        //     }
        // }

        // aElement.innerHTML = aHtml + "</ul>";
    });

function change(text, a, b) {
    let i = 0;
    let length = text.length;
    for (i = 0; i < length; i++) {
        text = text.replace(a, b);
    }
    return text;
}