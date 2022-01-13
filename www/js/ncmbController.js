var ncmbController = {
  // APPLICATION_KEY: "YOUR_APPLICATION_KEY",
  // CLIENT_KEY: "YOUR_CLIENT_KEY",

  ncmb: null,

  // 初期化
  init: function (screenSize) {
    var self = this;
    self.ncmb = new NCMB(APPLICATION_KEY, CLIENT_KEY);    // mobile backendの初期化
    //閉じるボタンの動作を規定
    document.getElementById("closeRanking").addEventListener("click", function () {
      self.closeRanking();
    });
  },
  // スコア送信
  sendScore: function (score) {
    var self = this;

    // Score（クラス）を生成
    var Score = this.ncmb.DataStore("ScoreClass");
    // ユーザ名の設定
   // var username = localStorage.getItem("username");
   // alert(username)
    //if (username === null || username == null || username === "") {
      username = prompt("ユーザ名を指定してください");
      console.log(username)
     // localStorage.setItem("username", username);
   // }
    var scoreData = new Score({ score: score, username: username });
    // 送信処理実行
    scoreData.save()
      .then(function (saved) {
        // 保存がうまくいったらアラート表示
        alert("保存しました。もう一度挑戦してください！");
      })
      .catch(function (err) {
        console.log(err);
      });

  },
  showRanking: function () {
    var self = this;

    //スコア情報を取得するため、クラスを作成
    var Score = self.ncmb.DataStore("ScoreClass");

    //スコアを降順に10件取得
    Score.order("score", true)
      .limit(10)
      .fetchAll()
      .then(function (results) {

        //ランキング表のHTML生成
        var tableSource = "";
        if (results.length > 0) {
          for (i = 0; i < results.length; i++) {
            var score = results[i],
              rank = i + 1,
              value = parseInt(score.score),
              displayName = "NO NAME";

            tableSource += "<li class=\"list__item list__item--inset\">"
              + rank + ":"
              + score.username
              + " (" + value + ")</li>";
          }
        } else {
          tableSource += "<li class=\"list__item list__item--inset\">ランキングはありません</li>";
        }
        document.getElementById("rankingTable").innerHTML = tableSource;
        // $("#").html(tableSource);
        //ランキング画面を表示する
        document.getElementById("ranking").style.display = 'block';
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  //ランキング画面を閉じる
  closeRanking: function () {
    document.getElementById("ranking").style.display = 'none';
  }
}