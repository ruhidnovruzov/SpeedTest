const express = require("express");
const app = express();

app.use(express.json({ limit: "50mb" }));

app.get("/speedtest/download", (req, res) => {
    const dataSize = 20 * 1024 * 1024;
    const data = Buffer.alloc(dataSize, "0"); 

    const startTime = Date.now();
    res.writeHead(200, { "Content-Type": "application/octet-stream" });
    res.end(data, () => {
        const duration = (Date.now() - startTime) / 1000;
        console.log(`Download test tamamlandı: ${dataSize / (1024 * 1024)} MB, ${duration.toFixed(2)} saniyə.`);
    });
});

app.post("/speedtest/upload", (req, res) => {
    const startTime = Date.now();
    const receivedDataSize = JSON.stringify(req.body).length; 

    const duration = (Date.now() - startTime) / 1000; 
    const speedMbps = (receivedDataSize * 8) / duration / (1024 * 1024);

    console.log(`Upload sürəti: ${speedMbps.toFixed(2)} Mbps`);
    res.json({ message: "Upload test tamamlandı", speedMbps: speedMbps.toFixed(2) });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server ${PORT}-ci portda işləyir.`));
