fetch('https://script.google.com/macros/s/AKfycbwa2cetqBvNrHkmr-i8gaiMUC12uDHoAG4RI7XYIzyHh4UW_joqJTGSp5fQqENEzjCq/exec'
    + '?member=manager&charaID=' + charaID + '&scenarioID=off')
    .then(response => response.json())
    .then(function (data) {
        document.title = data.charaName + '/独り言卓INDEX';

        const charaNameElement = document.getElementById('charaName');
        const hiranameElement = document.getElementById('hiraname');
        const iconElement = document.getElementById('icon');
        const iconMakerElement = document.getElementById('iconMaker');
        const introductionElement = document.getElementById('introduction');

        const ageElement = document.getElementById('age');
        const sexElement = document.getElementById('sex');
        const heightElement = document.getElementById('height');
        const jobElement = document.getElementById('job');
        const birthdayElement = document.getElementById('birthday');
        const charaColorElement = document.getElementById('charaColor');

        const scenarioListElement = document.getElementById('scenarioList');
        const charaLinkElement = document.getElementById('charaLink');
        const freeCommentElement = document.getElementById('freeComment');


        charaNameElement.textContent = data.charaName;
        hiranameElement.textContent = data.hiraname;
        iconElement.setAttribute("src", data.icon);
        iconMakerElement.textContent = data.iconMaker;
        introductionElement.innerHTML = change(data.introduction, "\n", "<br>");

        ageElement.textContent = data.age;
        sexElement.textContent = data.sex;
        heightElement.textContent = data.height;
        jobElement.textContent = data.job;
        birthdayElement.textContent = data.birthday;
        charaColorElement.textContent = data.charaColor;

        const lists = data.scenarioList;
        let sessionListHtml = '';
        for (let i = 0; i < data.sessionNum; i++) {
            sessionListHtml += '<a href = "' + lists[i].scenarioFilename + '">'
                + lists[i].scenarioName + lists[i].hoSentence + '</a><br>';
        }
        //最後の改行文字を消して埋め込み
        scenarioListElement.innerHTML = sessionListHtml.slice(0, -4);

        charaLinkElement.setAttribute("href", data.charaLink);
        charaLinkElement.textContent = data.charaLink;

        freeCommentElement.textContent = change(data.freeComment, "\n", "<br>");

    });

function change(text, a, b) {
    let i = 0;
    let length = text.length;
    for (i = 0; i < length; i++) {
        text = text.replace(a, b);
    }
    return text;
}
