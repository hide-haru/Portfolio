const search = document.getElementById("searchbtn");
search.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const resultdiv = document.getElementById("result");

    if (!username) {
        resultdiv.innerHTML = "<p>ユーザ名を入力してください。</p>"
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(res => {
            if (!res.ok) throw new Error("ユーザ名が見つかりませんでした");
                return res.json();
        })
        .then(data => {
            resultdiv.innerHTML = `
            <p><strong>ユーザ名：</strong>${data.login}</p>
            <p><strong>名前：</strong>${data.name || "未設定"}</p>
            <p><strong>フォロワー数：</strong>${data.followers}</p>
            <p><strong>公開リポジトリ数：</strong>${data.public_repos}</p>
            <img src="${data.avatar_url}" width="100" alt="アイコン画像" />`
        })
        .catch(err => {
            resultdiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
        })
});
