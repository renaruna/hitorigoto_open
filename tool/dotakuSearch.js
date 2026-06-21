document.getElementById('pldotakuForm').addEventListener('submit', async (event) => {
    // 1. ページのリロード（通常のフォーム送信挙動）を防ぐ
    event.preventDefault();
    //エラーを表示させるところ
    const errorElement = document.getElementById('input_error');
    //結果HTMLを表示させるところ
    const resultElement = document.getElementById('result')
    //検索ボタン押すたび初期化
    errorElement.textContent = '';
    resultElement.textContent = '';

    // 2. フォーム内のデータを自動で回収する
    let formData = new FormData(event.target);

    //入力を配列に変換
    const inputPlArray = [formData.get('pl1'), formData.get('pl2'), formData.get('pl3'), formData.get('pl4')]
    //重複チェック
    if (isDuplicated(inputPlArray)) {
        errorElement.textContent = '入力が重複しています';
        return;
    };

    try {
        //GASでの処理分けのため追加
        formData.append('tool', 'pldotaku');

        // 3. Fetchでデータを送信
        const response = await fetch('https://script.google.com/macros/s/AKfycbyT4BAclnAPMRHC7kbEojQc_bE1AtvflJSWFcp5m5pXt8NxMkoqeSRB5wq900Xt-hwI/exec', {
            method: 'POST',
            body: formData,
        });

        // 4. サーバーからのレスポンス（受信データ）を解析
        const resultArray = await response.json();

        //結果の件数
        const resultNum = resultArray.length;
        //0件の場合、メッセージ出して終了
        if (resultNum == 0) {
            errorElement.textContent = '結果は0件です';
            return;
        }

        //結果表に出すPCの数（＝列の数）をカウント
        // PL4が入力されてたら、4人としてカウントしてPC4まで表示する
        let plcount = 0;
        const MAX_PLAYER = 4;
        for (let i = MAX_PLAYER; i > 2; i--) {
            if (inputPlArray[i - 1] !== '') {
                plcount = i;
                break;
            }
            plcount = i - 1;
        }

        //表のヘッダ部分
        let resultHtml = '<table><thead><tr><th>シナリオ</th><th>PC1</th><th>PC2</th>';
        if (plcount >= 3) {
            resultHtml += '<th>PC3</th>';
        }
        if (plcount >= 4) {
            resultHtml += '<th>PC4</th>';
        }
        resultHtml += '</tr></thead><tbody>';

        //表の中身（結果）部分
        for (let i = 0; i < resultNum; i++) {
            resultHtml += '<tr>';
            resultHtml += '<td><a href="../scenario/' + resultArray[i].scenarioFileName + '">' + resultArray[i].scenarioName + '</a></td>'
            resultHtml += '<td>' + resultArray[i].pc1Name + '</td>'
            resultHtml += '<td>' + resultArray[i].pc2Name + '</td>'
            if (plcount >= 3) {
                resultHtml += '<td>' + resultArray[i].pc3Name + '</td>'
            }
            if (plcount >= 4) {
                resultHtml += '<td>' + resultArray[i].pc4Name + '</td>'
            }
            resultHtml += '</tr>';
        }
        resultHtml += '</tbody></table>';

        //HTMLを挿入して表示
        resultElement.innerHTML = resultHtml;
        errorElement.textContent = resultNum;

    } catch (error) {
        errorElement.textContent = 'エラーが発生しました';
    }
});

//重複しているときTrue、重複していないときFalseを返す
function isDuplicated(inputPlArray) {
    //Setオブジェクトで一意の値を格納できる＝重複しているものは一つの値として格納される
    const setElements = new Set(inputPlArray);

    //長さが違えば重複している要素があるということ
    if (setElements.size !== inputPlArray.length) {
        //PL3,4が未入力の場合は重複とは判定せず、処理を継続
        if (inputPlArray[2] == '' && inputPlArray[3] == '') {
            return false;
        }
        return true;
    } else {
        return false;
    }
}
