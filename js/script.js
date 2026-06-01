// ビルの場所データ（前回と同じ）
const locations = {
    "1f-room1":  { name: "1階：受付・事務室", x: 25, y: 85 },
    "1f-room2":  { name: "1階：休憩ラウンジ", x: 75, y: 85 },
    "1f-stairs": { name: "1階：階段",         x: 50, y: 75 },
    "2f-room1":  { name: "2階：第一会議室",   x: 25, y: 52 },
    "2f-room2":  { name: "2階：第二会議室",   x: 75, y: 52 },
    "2f-stairs": { name: "2階：階段",         x: 50, y: 42 },
    "3f-room1":  { name: "3階：パソコン室",   x: 25, y: 18 },
    "3f-room2":  { name: "3階：機材倉庫",     x: 75, y: 18 },
    "3f-stairs": { name: "3階：階段",         x: 50, y: 8 }
};

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
        pin.style.left = target.x + '%';
        pin.style.top = target.y + '%';
        pin.style.display = 'block';
        text.textContent = `現在地 📍 ${target.name}`;
    } else {
        text.textContent = "館内のQRコードを読み取ると、現在地が表示されます。";
    }

    // ★追加：QRコードリーダーの初期化設定
    initQRScanner();
};

// ★追加：QRコードリーダーの処理
function initQRScanner() {
    const html5QrCode = new Html5Qrcode("qr-reader");
    const startBtn = document.getElementById("scan-start-btn");
    const stopBtn = document.getElementById("scan-stop-btn");

    // QRコードの読み取りに成功したときの処理
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        // スキャンを止めてカメラをオフにする
        html5QrCode.stop().then(() => {
            // 読み取ったURL（例: https://.../?place=1f-room1）に画面を切り替える
            window.location.href = decodedText;
        }).catch((err) => {
            console.error("カメラの停止に失敗しました:", err);
            window.location.href = decodedText;
        });
    };

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    // 「QRコードを読み取る」ボタンを押したとき
    startBtn.addEventListener("click", () => {
        // 背面カメラ（environment）を指定して起動
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
        .then(() => {
            startBtn.style.display = "none";
            stopBtn.style.display = "inline-block";
        })
        .catch((err) => {
            alert("カメラの起動に失敗しました。ブラウザのカメラ権限を許可してください。");
            console.error(err);
        });
    });

    // 「カメラを閉じる」ボタンを押したとき
    stopBtn.addEventListener("click", () => {
        html5QrCode.stop().then(() => {
            startBtn.style.display = "inline-block";
            stopBtn.style.display = "none";
        });
    });
}