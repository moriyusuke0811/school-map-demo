// 場所のデータ（マップ画像上の X座標(%) と Y座標(%) を設定）
// ※画像の左上が X:0%, Y:0% になります。実際のマップに合わせて数値を調整してください。
const locations = {
    "gym": { name: "体育館", x: 20, y: 30 },
    "entrance": { name: "正門", x: 50, y: 90 },
    "library": { name: "図書室", x: 70, y: 40 }
};

// URLからパラメータ（例: ?place=gym）を取得する関数
function getPlaceFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('place');
}

// ページが読み込まれたときの処理
window.onload = function() {
    const placeId = getPlaceFromURL();
    const pin = document.getElementById('location-pin');
    const text = document.getElementById('current-location-text');

    if (placeId && locations[placeId]) {
        // 場所データが存在する場合
        const target = locations[placeId];
        
        // ピンの位置をCSSで設定して表示
        pin.style.left = target.x + '%';
        pin.style.top = target.y + '%';
        pin.style.display = 'block';
        
        // テキストを更新
        text.textContent = `現在地: ${target.name}`;
    } else {
        // パラメータがない、または間違っている場合
        text.textContent = "QRコードからアクセスして現在地を確認してください。";
    }
};