fetch('https://script.google.com/macros/s/AKfycbyjMTeRaNtT2HKEKkYdilkQg3RYP9JOlDJ8s27e7HK6NeRv67cwv03RLVyWRwDC-pN03A/exec?member=' + 'manager')
    .then(response => response.json())
    .then(function (data) {
        const characterElement = document.getElementById('member-character');

        let characterHtml = "";
        let existCharaNum = 0;
        for (let i = 0; i < data.length; i++) { // i=0のとき charaID=1
            if (data[i].charaFilename == "") {
                continue;
            }
            characterHtml += '<a href="' + data[i].charaFilename + '">';
            characterHtml += '<div class="charaImg">';
            characterHtml += '<img src="' + data[i].icon + '">';
            characterHtml += '<p>' + data[i].charaName + '</p>';
            characterHtml += '</div></a>';

            existCharaNum++;
        }

        // 探索者たちがflexで並べられている→最後の行のボックスたちを左寄せにしたい
        // →空白のボックスを用意する
        blankNum = 6 - (existCharaNum % 6);
        for (let i = 0; i < blankNum; i++) {
            characterHtml += '<a style="width:123px;"></a>'
        }

        characterElement.innerHTML = characterHtml;

    });

function change(text, a, b) {
    let i = 0;
    let length = text.length;
    for (i = 0; i < length; i++) {
        text = text.replace(a, b);
    }
    return text;
}
