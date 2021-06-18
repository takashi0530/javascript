'use strict'
{
    const menuItems = document.querySelectorAll('.menu li a'); //menuクラスのliの下のa要素
    const contents = document.querySelectorAll('.content'); //menuクラスのliの下のa要素

    // 取得した要素ひとつひとつに対して、イベントを設定していくためforEachを使う （要素のひとつはclickedItemという名前で受け取る）
    // menuItems ：  3つの<a>要素全て
    menuItems.forEach(clickedItem => {

        // clickedItemに対してクリックイベントを設定したい。クリックをしたら次の処理をしてもらう
        clickedItem.addEventListener('click', (e) => {

            // clickedItem ＝ 3つある<a>要素のうちのひとつ
            e.preventDefault();

            // 全てのmenuItemsからactiveクラスを削除する
            menuItems.forEach(item => {
                item.classList.remove('active');
            });

            // クリックしたitemに対して、activeクラス付与する
            clickedItem.classList.add('active');


            // コンテンツに設定されている、全てのactiveクラスを削除する
            contents.forEach(content => {
                content.classList.remove('active');
            });

            // クリックされたメニュー項目に対応する、content要素を取得したいためにidをつけたため、getelementByIdで取得する
            document.getElementById(clickedItem.dataset.id).classList.add('active');
        });

    });
}