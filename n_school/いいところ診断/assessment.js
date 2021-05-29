'use strict'
const userNameInput    = document.getElementById('user-name');      // <input type="text" id="user-name" size="40" maxlength="20">
const assessmentButton = document.getElementById('assessment');     // <button id="assessment">診断する</button>
const resultDivided    = document.getElementById('result-area');    // <div id="result-area"></div>
const tweetDivided     = document.getElementById('tweet-area');     // <div id="tweet-area"></div>

/**
 * 指定した要素の子供を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        // 子供の要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

// 入力途中でエンターキーを押した場合、診断するボタンをクリックしたときの処理を呼び出す   ※アロー関数で書く場合、引数が1つなら（）かっこを省略できる。今回の場合引数はeventのみ
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        // TODO ボタンのonclick 処理を呼び出す
        assessmentButton.onclick();
    }
}

// 診断するボタンが押されたときにアロー関数を発動する（ES6）
assessmentButton.onclick = () => {
    // 入力された名前を取得
    const userName = userNameInput.value;
    // 入力された名前が空の場合は処理終了
    if (userName.length === 0) {
        return;
    }

    // 診断結果表示エリアの子要素を一旦削除しリセット
    removeAllChildren(resultDivided);
    // 診断結果表示エリアの作成
    const header = document.createElement('h3');            //console.log(header) →   <h3></h3>   要素をを生成して変数に代入
    header.innerText = '診断結果';                           //console.log(header) →   <h3>診断結果</h3>   h3タグの内側のテキストを変更する
    resultDivided.appendChild(header);      // <div id="result-area"></div> の子要素に <h3>診断結果</h3> 要素が追加される

    // pタグを生成
    const paragraph = document.createElement('p');
    // 名前の文字列を返す関数に、入力された名前を引数として渡し、返り値を代入
    const result = assessment(userName);

    // 生成した<p></p>タグの中に、名前の文字列を入れる
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);   // <div id="result-area"></div> の子要素に <p>太郎のいいところは決断力です....</p> 要素が追加される

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    // aタグを生成し定数に代入
    const anchor = document.createElement('a');

    // urlを定数に代入
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたのいいところ') +          // 日本語をURIエンコードする ※URIの規格は半角英数字のみ使用可能だから
        // 'あなたのいいところ' +                           // URIエンコードをしない場合  ※駄目な例
        '&ref_src=twsrc%5Etfw)';
    // 生成したaタグのhref属性にhttp~の属性値を付与する
    anchor.setAttribute('href', hrefValue);
    // 生成したaタグに対して、以下のクラスを付与する  class="twitter-hashtag-button"
    anchor.className = 'twitter-hashtag-button';
    // 生成したaタグに対して、カスタムデータ属性を付与する   data-text="診断結果の文章"
    anchor.setAttribute('data-text', result);
    // 生成したaタグの内側テキストを以下の文章に設定
    anchor.innerText = 'Tweet #あなたのいいところ';
    // 生成したaタグを、ツイートのdivの子要素に追加する
    tweetDivided.appendChild(anchor);

    // widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

};



const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];


/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;

    for (let i = 0; i < userName.length; i++) {
        // console.log(i);
        sumOfCharCode += userName.charCodeAt(i);
        // console.log(sumOfCharCode);
    }
    // console.log(sumOfCharCode); //59896

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];


    // TODO {userName} をユーザーの名前に置き換える
    result = result.replaceAll('{userName}', userName);
    // console.log(result);
    return result;

}


// assessment('太郎');
// assessment('次郎');
// assessment('太郎');

// テストコード
console.assert(
    assessment('太郎') ===
        '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
