fetch('https://script.google.com/macros/s/AKfycbyjMTeRaNtT2HKEKkYdilkQg3RYP9JOlDJ8s27e7HK6NeRv67cwv03RLVyWRwDC-pN03A/exec?member=' + 'manager')
    .then(response => response.json())
    .then(function (data) {
        const nameElement = document.getElementById('charaName');
        const hiranameElement = document.getElementById('hiraname');
        const iconElement = document.getElementById('icon');
        const iconMakerElement = document.getElementById('iconMaker');
        const introductionElement = document.getElementById('introduction');
        const ageElement = document.getElementById('age');
        const sexElement = document.getElementById('sex');
        const heightElement = document.getElementById('height');
        const jobElement = document.getElementById('job');
        const birthdayElement = document.getElementById('birthday');
        const colorElement = document.getElementById('charaColor');
        const makerElement = document.getElementById('maker');

        const scenarioListElement = document.getElementById('scenarioList');
        const charaLinkElement = document.getElementById('charaLink');
        const freeCommentElement = document.getElementById('freeComment');

        nameElement.textContent = data[charaID].name;
        hiranameElement.textContent = data[charaID].hiraname;

    });

console.log("script");