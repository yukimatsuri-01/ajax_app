function check() {
  // 表示されている全てのメモを取得している
  const posts = document.querySelectorAll(".post");
  posts.forEach(function(post){
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true")
    // メモをクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => {
      // どのメモをクリックしたのか、カスタムデータを用いて取得している
      const postId = post.getAttribute("data-id");
      // Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスのタイプを指定する
      XHR.responseType = "json";
      // sendでリクエストを送信する
      XHR.send();
      // レスポンスを受け取った時の処理を記述する
      XHR.onload = () => {
        if (XHR.status != 200) {
          // レスポンスのHTTPステータスを解析し、該当するエラーメッセージをアラートで表示
          alert(`Error ${XHR.status}: ${XHR.statusText}`)
          // 処理を終了している
          return null;
        }
        // レスポンスされたデータを変数itemに代入
        const item = XHR.response.post;
        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);