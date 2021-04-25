'use strict'
{

    const open    = document.getElementById('open');
    const overlay = document.querySelector('.overlay');
    const close   = document.getElementById('close');

    // メニューアイコン押したとき
    open.addEventListener('click', () => {
        // overlayを表示させる
        overlay.classList.add('show');
        // 非表示のクラスを付与する（openを非表示にする）
        open.classList.add('hide');
    });

    // 閉じるアイコンを押したとき
    close.addEventListener('click', () => {
        // overlayを表示させる
        overlay.classList.remove('show');
        // 非表示のクラスを削除する（openを表示させる）
        open.classList.remove('hide');
    });

}