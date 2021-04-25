'use strict'
{

    const open  = document.getElementById('open');
    const close = document.getElementById('close');
    const modal = document.getElementById('modal');
    const mask  = document.getElementById('mask');

    // openがクリックされたとき
    open.addEventListener('click', () => {
        // idがmodalである要素ののhiddenクラスを取り除く
        modal.classList.remove('hidden');
        // idがmaskである要素ののhiddenクラスを取り除く
        mask.classList.remove('hidden');
    });

    // closeがクリックされたとき
    close.addEventListener('click', () => {
        // idがmodalである要素にhiddenクラスを付与する
        modal.classList.add('hidden');
        // idがmaskである要素にhiddenクラスを付与する
        mask.classList.add('hidden');
    });

    // maskがクリックされたとき
    mask.addEventListener('click', () => {
        // modal.classList.add('hidden');
        // mask.classList.add('hidden');

        // closeをクリックしたときの処理が実行される
        close.click();
    });



}