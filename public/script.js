async function testDownloadSpeed() {
    const startTime = Date.now();
    const response = await fetch("http://localhost:3000/speedtest/download");
    const data = await response.arrayBuffer();

    const duration = (Date.now() - startTime) / 1000;
    const dataSize = data.byteLength; // Byte ölçüsü
    const speedMbps = (dataSize * 8) / duration / (1024 * 1024); 

    return speedMbps.toFixed(2); // Dəqiq sürət
}

document.getElementById("testButton").addEventListener("click", async () => {
    const speedValue = document.getElementById("speedValue");
    const description = document.getElementById("description");
    const button = document.getElementById("testButton");

    // Animasiyalar üçün əvvəlcə ilkin dəyərlər verilir
    speedValue.textContent = "0";
    description.textContent = "Sürət testi aparılır...";
    button.disabled = true;

    const speed = await testDownloadSpeed(); // Sürət testi

    // Yavaş-yavaş rəqəmin artması effekti
    let currentSpeed = 0;
    const increment = speed / 100;
    const interval = setInterval(() => {
        currentSpeed += increment;
        if (currentSpeed >= speed) {
            currentSpeed = speed;
            clearInterval(interval);
        }
        speedValue.textContent = currentSpeed.toFixed(2);
    }, 10);

    description.textContent = "Test tamamlandı!";
    button.disabled = false;
    button.textContent = "Testi Təkrarla";
});
