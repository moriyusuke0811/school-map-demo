// ビルの場所データ（X座標、Y座標は上のイメージ図を元に設定）
const locations = {
    // --- 1階 (Y座標は 67% 〜 100% の間) ---
    "1f-room1":  { name: "1階：受付・事務室", x: 25, y: 85 },
    "1f-room2":  { name: "1階：休憩ラウンジ", x: 75, y: 85 },
    "1f-stairs": { name: "1階：階段",         x: 50, y: 75 },

    // --- 2階 (Y座標は 34% 〜 66% の間) ---
    "2f-room1":  { name: "2階：第一会議室",   x: 25, y: 52 },
    "2f-room2":  { name: "2階：第二会議室",   x: 75, y: 52 },
    "2f-stairs": { name: "2階：階段",         x: 50, y: 42 },

    // --- 3階 (Y座標は 0% 〜 33% の間) ---
    "3f-room1":  { name: "3階：パソコン室",   x: 25, y: 18 },
    "3f-room2":  { name: "3階：機材倉庫",     x: 75, y: 18 },
    "3f-stairs": { name: "3階：階段",         x: 50, y: 8 }
};

// URLからパラメータ（?place=〇〇）を取得する関数
function getPlaceFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('place');
}

// ページ読み込み時の処理
window.onload = function() {
    const placeId = getPlaceFromURL();
    const pin = document.getElementById('location-pin');
    const text = document.getElementById('current-location-text');

    if (placeId && locations[placeId]) {
        const target = locations[placeId];
        
        // ピンの位置を指定して表示
        pin.style.left = target.x + '%';
        pin.style.top = target.y + '%';
        pin.style.display = 'block';
        
        // 画面上のテキストを変更
        text.textContent = `現在地 📍 ${target.name}`;
    } else {
        text.textContent = "館内のQRコードを読み取ると、現在地が表示されます。";
    }
};