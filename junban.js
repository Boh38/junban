(() => {

  /* =========================
     要素取得
     ========================= */

  const setupView =
    document.getElementById('setupView');

  const gameView =
    document.getElementById('gameView');

  const completeView =
    document.getElementById('completeView');


  const countRange =
    document.getElementById('countRange');

  const countInput =
    document.getElementById('countInput');

  const startGame =
    document.getElementById('startGame');


  const tapArea =
    document.getElementById('tapArea');

  const tapButton =
    document.getElementById('tapButton');

  const resultArea =
    document.getElementById('resultArea');

  const resultNumber =
    document.getElementById('resultNumber');

  const nextButton =
    document.getElementById('nextButton');


  const totalEl =
    document.getElementById('total');

  const confirmedEl =
    document.getElementById('confirmed');

  const remainingEl =
    document.getElementById('remaining');


  const resetButton =
    document.getElementById('resetButton');

  const restartButton =
    document.getElementById('restartButton');


  /* =========================
     ゲーム状態
     ========================= */

  let total = 8;
  let remainingNumbers = [];
  let confirmed = 0;
  let revealed = false;


  /* =========================
     人数設定
     ========================= */

  function syncSetup(value) {

    let n = Math.max(
      2,
      Math.min(20, Number(value) || 2)
    );

    countRange.value = n;
    countInput.value = n;

  }


  countRange.addEventListener(
    'input',
    e => syncSetup(e.target.value)
  );


  countInput.addEventListener(
    'input',
    e => syncSetup(e.target.value)
  );


  /* =========================
     シャッフル
     ========================= */

  function shuffle(array) {

    for (
      let i = array.length - 1;
      i > 0;
      i--
    ) {

      const j =
        Math.floor(Math.random() * (i + 1));

      [
        array[i],
        array[j]
      ] = [
        array[j],
        array[i]
      ];

    }

    return array;

  }


  /* =========================
     統計更新
     ========================= */

  function updateStats() {

    totalEl.textContent =
      total + '人';

    confirmedEl.textContent =
      confirmed + '人';

    remainingEl.textContent =
      (total - confirmed) + '人';

  }


  /* =========================
     ゲーム開始
     ========================= */

  function start() {

    total =
      Number(countInput.value);

    remainingNumbers =
      shuffle(
        Array.from(
          { length: total },
          (_, i) => i + 1
        )
      );

    confirmed = 0;
    revealed = false;

    updateStats();


    setupView.classList.add('hidden');

    completeView.classList.add('hidden');

    gameView.classList.remove('hidden');


    showWaiting();

  }


  /* =========================
     次の人を待つ状態
     ========================= */

  function showWaiting() {

    revealed = false;

    tapArea.classList.remove('hidden');

    tapButton.classList.remove('hidden');

    resultArea.classList.add('hidden');

    /* ボタンは場所を残したまま非表示 */
    nextButton.style.visibility = 'hidden';

  }


  /* =========================
     数字を表示
     ========================= */

  function reveal() {

    if (
      revealed ||
      remainingNumbers.length === 0
    ) {
      return;
    }

    revealed = true;


    const number =
      remainingNumbers.pop();

    confirmed++;

    resultNumber.textContent =
      number;


    tapArea.classList.add('hidden');

    resultArea.classList.remove('hidden');

    /* ボタンを表示 */
    nextButton.style.visibility = 'visible';


    updateStats();

  }


  /* =========================
     次の人へ
     ========================= */

  function next() {

    if (!revealed) {
      return;
    }


    if (remainingNumbers.length === 0) {

      gameView.classList.add('hidden');

      completeView.classList.remove('hidden');

      return;

    }


    showWaiting();

  }


  /* =========================
     最初からやり直す
     ========================= */

  function reset() {

    gameView.classList.add('hidden');

    completeView.classList.add('hidden');

    setupView.classList.remove('hidden');

  }


  /* =========================
     イベント
     ========================= */

  startGame.addEventListener(
    'click',
    start
  );


  tapButton.addEventListener(
    'click',
    reveal
  );


  tapArea.addEventListener(
    'click',
    reveal
  );


  nextButton.addEventListener(
    'click',
    next
  );


  resetButton.addEventListener(
    'click',
    reset
  );


  restartButton.addEventListener(
    'click',
    reset
  );

})();
