// ビルの場所データ（変更なし）
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

// ★追加：画面の表示（ピンと文字）を更新する専用の関数
function updateLocation(placeId) {
    const pin = document.getElementById('location-pin');
    const text = document.getElementById('current-location-text');

    if (placeId && locations[placeId]) {
        const target = locations[placeId];
        pin.style.left = target.x + '%';
        pin.style.top = target.y + '%';
        pin.style.display = 'block';
        text.textContent = `現在地 📍 ${target.name}`;
    } else {
        // 登録されていない文字列を読み込んだ場合のエラー処理
        text.textContent = "未登録のQRコードです。もう一度お試しください。";
    }
}

// ページ読み込み時の処理
window.onload = function() {
    // 埋め込み時のために、URLにパラメータがある場合も一応対応しておく
    const urlParams = new URLSearchParams(window.location.search);
    const placeId = urlParams.get('place');
    
    if (placeId) {
        updateLocation(placeId);
    } else {
        document.getElementById('current-location-text').textContent = "館内のQRコードを読み取ると、現在地が表示されます。";
    }

    // QRコードリーダーの初期化設定
    initQRScanner();
};

// QRコードリーダーの処理
function initQRScanner() {
    const html5QrCode = new Html5Qrcode("qr-reader");
    const startBtn = document.getElementById("scan-start-btn");
    const stopBtn = document.getElementById("scan-stop-btn");

    // ★変更：QRコードの読み取りに成功したときの処理
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        // スキャンを止めてカメラをオフにする
        html5QrCode.stop().then(() => {
            startBtn.style.display = "inline-block";
            stopBtn.style.display = "none";
            
            // ★読み取った文字列（例: "1f-room1"）を使って画面を更新！
            updateLocation(decodedText);
            
        }).catch((err) => {
            console.error("カメラの停止に失敗しました:", err);
        });
    };

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    // 「QRコードを読み取る」ボタンを押したとき
    startBtn.addEventListener("click", () => {
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