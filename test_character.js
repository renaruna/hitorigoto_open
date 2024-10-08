fetch('https://script.google.com/macros/s/AKfycbyjMTeRaNtT2HKEKkYdilkQg3RYP9JOlDJ8s27e7HK6NeRv67cwv03RLVyWRwDC-pN03A/exec?member=' + 'manager')
    .then(response => response.json())
    .then(function (data) {
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


        charaNameElement.textContent = data[charaID - 1].charaName;
        hiranameElement.textContent = data[charaID - 1].hiraname;
        iconElement.setAttribute("src", data[charaID - 1].icon);
        iconMakerElement.textContent = data[charaID - 1].iconMaker;
        introductionElement.innerHTML = change(data[charaID - 1].introduction, "\n", "<br>");

        ageElement.textContent = data[charaID - 1].age;
        sexElement.textContent = data[charaID - 1].sex;
        heightElement.textContent = data[charaID - 1].height;
        jobElement.textContent = data[charaID - 1].job;
        birthdayElement.textContent = data[charaID - 1].birthday;
        charaColorElement.textContent = data[charaID - 1].charaColor;

        scenarioListElement.innerHTML = change(data[charaID - 1].scenarioList, "\n", "<br>");
        charaLinkElement.setAttribute("href", data[charaID - 1].charaLink);
        charaLinkElement.textContent = data[charaID - 1].charaLink;
        freeCommentElement.textContent = change(data[charaID - 1].freeComment);

    });

function change(text, a, b) {
    let i = 0;
    let length = text.length;
    for (i = 0; i < length; i++) {
        text = text.replace(a, b);
    }
    return text;
}
