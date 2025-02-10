fetch('https://script.google.com/macros/s/AKfycbwa2cetqBvNrHkmr-i8gaiMUC12uDHoAG4RI7XYIzyHh4UW_joqJTGSp5fQqENEzjCq/exec'
    + '?member=off&charaID=off&scenarioID=all')
    .then(response => response.json())
    .then(function (data) {
        const aElement = document.getElementById('a-list');
        const kElement = document.getElementById('k-list');
        const sElement = document.getElementById('s-list');
        const tElement = document.getElementById('t-list');
        const nElement = document.getElementById('n-list');
        const hElement = document.getElementById('h-list');
        const mElement = document.getElementById('m-list');
        const yElement = document.getElementById('y-list');
        const rElement = document.getElementById('r-list');
        const wElement = document.getElementById('w-list');

        let aHtml = "<ul>";
        let kHtml = "<ul>";
        let sHtml = "<ul>";
        let tHtml = "<ul>";
        let nHtml = "<ul>";
        let hHtml = "<ul>";
        let mHtml = "<ul>";
        let yHtml = "<ul>";
        let rHtml = "<ul>";
        let wHtml = "<ul>";

        for (let i = 0; i < data.length; i++) { // i=0のとき scenarioID=1
            let name = data[i].scenarioName;
            let link = data[i].scenarioFilename;
            let kasira = data[i].yomi;

            if (kasira.indexOf("あ") == 0 || kasira.indexOf("い") == 0 || kasira.indexOf("う") == 0 || kasira.indexOf("え") == 0 || kasira.indexOf("お") == 0) {
                aHtml += '<li><a href="' + link + '">' + name + '</a></li>';
            } else if (kasira.indexOf("か") == 0 || kasira.indexOf("き") == 0 || kasira.indexOf("く") == 0 || kasira.indexOf("け") == 0 || kasira.indexOf("こ") == 0) {
                kHtml += '<li><a href="' + link + '">' + name + '</a></li>';
            } else if (kasira.indexOf("さ") == 0 || kasira.indexOf("し") == 0 || kasira.indexOf("す") == 0 || kasira.indexOf("せ") == 0 || kasira.indexOf("そ") == 0) {
                sHtml += '<li><a href="' + link + '">' + name + '</a></li>';
            } else if (kasira.indexOf("た") == 0 || kasira.indexOf("ち") == 0 || kasira.indexOf("つ") == 0 || kasira.indexOf("て") == 0 || kasira.indexOf("と") == 0) {
                tHtml += '<li><a href="' + link + '">' + name + '</a></li>';
            } else if (kasira.indexOf("な") == 0 || kasira.indexOf("に") == 0 || kasira.indexOf("ぬ") == 0 || kasira.indexOf("ね") == 0 || kasira.indexOf("の") == 0) {
                nHtml += '<li><a href="' + link + '">' + name + '</a></li>';
            } else if (kasira.indexOf("は") == 0 || kasira.indexOf("ひ") == 0 || kasira.indexOf("ふ") == 0 || kasira.indexOf("へ") == 0 || kasira.indexOf("ほ") == 0) {
                hHtml += '<li><a href="' + link + '">' + name + '</a></li>';
            } else if (kasira.indexOf("ま") == 0 || kasira.indexOf("み") == 0 || kasira.indexOf("む") == 0 || kasira.indexOf("め") == 0 || kasira.indexOf("も") == 0) {
                mHtml += '<li><a href="' + link + '">' + name + '</a></li>';
            } else if (kasira.indexOf("や") == 0 || kasira.indexOf("ゆ") == 0 || kasira.indexOf("よ") == 0) {
                yHtml += '<li><a href="' + link + '">' + name + '</a></li>';
            } else if (kasira.indexOf("ら") == 0 || kasira.indexOf("り") == 0 || kasira.indexOf("る") == 0 || kasira.indexOf("れ") == 0 || kasira.indexOf("ろ") == 0) {
                rHtml += '<li><a href="' + link + '">' + name + '</a></li>';
            } else if (kasira.indexOf("わ") == 0 || kasira.indexOf("を") == 0 || kasira.indexOf("ん") == 0) {
                wHtml += '<li><a href="' + link + '">' + name + '</a></li>';
            }
        }

        aElement.innerHTML = aHtml + "</ul>";
        kElement.innerHTML = kHtml + "</ul>";
        sElement.innerHTML = sHtml + "</ul>";
        tElement.innerHTML = tHtml + "</ul>";
        nElement.innerHTML = nHtml + "</ul>";
        hElement.innerHTML = hHtml + "</ul>";
        mElement.innerHTML = mHtml + "</ul>";
        yElement.innerHTML = yHtml + "</ul>";
        rElement.innerHTML = rHtml + "</ul>";
        wElement.innerHTML = wHtml + "</ul>";
    });