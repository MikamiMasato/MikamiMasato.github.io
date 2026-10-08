document.addEventListener("DOMContentLoaded", () => {
  // 1. 記事内の見出し（h2とh3）をすべて取得
  const headings = document.querySelectorAll("#content h2, #content h3");
  const tocContainer = document.getElementById("toc");

  // 見出しが存在しない場合は処理を終了
  if (headings.length === 0 || !tocContainer) return;

  // 2. 目次用のリスト（ul）を作成
  const ul = document.createElement("ul");

  headings.forEach((heading, index) => {
    // 3. 見出しにIDがない場合、ジャンプ用のIDを動的に付与
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }

    // 4. リストアイテム（li）とリンク（a）を作成
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;
    
    // タグの種類（h2かh3か）によってクラスを分ける階層化の処理
    li.classList.add(`toc-${heading.tagName.toLowerCase()}`);

    li.appendChild(a);
    ul.appendChild(li);
  });

  // 5. タイトルを追加して目次コンテナに埋め込む
  const title = document.createElement("p");
  title.textContent = "目次";
  title.classList.add("toc-title");

  tocContainer.appendChild(title);
  tocContainer.appendChild(ul);
});
