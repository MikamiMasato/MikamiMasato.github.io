/**
 * HTML構造の読み込みが完了したタイミングで実行する
 * (scriptタグに defer を指定しているため不要な場合もありますが、安全のために追加しています)
 */
document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. 必要な DOM 要素の取得
  // ==========================================
  // 本文が格納されているエリアを取得
  const content = document.getElementById("content");
  
  // 目次を出力（埋め込み）するためのコンテナ要素を取得
  const tocContainer = document.getElementById("toc");

  // 対象の要素が存在しない場合はエラーを防ぐために処理を中断する
  if (!content || !tocContainer) {
    return;
  }

  // ==========================================
  // 2. 本文内から目次対象の見出し（h2, h3, h4）を取得
  // ==========================================
  // querySelectorAll を使って、h2・h3・h4 要素をドキュメント内の登場順でまとめて取得
  // 返り値は NodeList（配列風のオブジェクト）
  const headings = content.querySelectorAll("h2, h3, h4");

  // 見出しが1つも存在しない場合は目次エリアを非表示にして処理を終了する
  if (headings.length === 0) {
    tocContainer.style.display = "none";
    return;
  }

  // ==========================================
  // 3. 目次の枠組み（タイトルとリスト）を生成
  // ==========================================
  // 目次の見出しテキスト（「目次」）を表示する <p> 要素を作成
  const tocTitle = document.createElement("p");
  tocTitle.className = "toc-title"; // スタイル用のクラス名をセット
  tocTitle.textContent = "目次";     // 表示文字列をセット

  // 目次項目を格納するための <ul> 要素を作成
  const tocList = document.createElement("ul");

  // ==========================================
  // 4. 各見出しをループ処理して目次リストを組み立てる
  // ==========================================
  // headings（取得した見出し群）を1つずつ取り出してループ処理
  // index には 0, 1, 2... と順番の数値が入る
  headings.forEach((heading, index) => {

    // 【ステップ 4-a】 見出しに ID を準備（アンカーリンク用）
    // ページ内ジャンプ（<a href="#id">）機能を利用するため、見出し自体にIDが必要
    // 元のHTMLで見出しに id が設定されていない場合は、動的に ID（例: heading-1）を割り当てる
    if (!heading.id) {
      heading.id = `heading-${index + 1}`;
    }

    // 【ステップ 4-b】 目次の各項目要素を作成
    const listItem = document.createElement("li"); // 項目用の <li>
    const link = document.createElement("a");      // リンク用の <a>

    // <a> タグの href 属性に "#見出しのID" を設定（例: href="#heading-1"）
    link.href = `#${heading.id}`;

    // <a> タグのテキスト要素に、本文側の見出しの文字列（例: "1. はじめに"）を設定
    link.textContent = heading.textContent;

    // 【ステップ 4-c】 階層（H2, H3, H4）に応じたクラス名を付与
    // heading.tagName は "H2", "H3", "H4" などの大文字で取得できるため、
    // toLowerCase() で小文字化し、CSSで段落下げ（インデント）するためのクラスを付与
    // （例: "H2" -> "toc-h2", "H3" -> "toc-h3", "H4" -> "toc-h4"）
    const tagName = heading.tagName.toLowerCase(); 
    listItem.classList.add(`toc-${tagName}`);

    // 【ステップ 4-d】 要素を組み立てる
    // <li> の中に <a> を挿入
    listItem.appendChild(link);

    // <ul> の中に作成した <li> を追加
    tocList.appendChild(listItem);
  });

  // ==========================================
  // 5. 完成した目次要素を画面に埋め込む
  // ==========================================
  // タイトル <p> と リスト <ul> を、目次用コンテナ (#toc) の中に順番に追加
  tocContainer.appendChild(tocTitle);
  tocContainer.appendChild(tocList);

});
