// --- KONFIGURASI ---
const GITHUB_USERNAME = "Doctor909xxx";
const REPO_NAME = "error";
const MY_PHONE = "6285136572646"; 

const files = [
    { name: "White 15%.zip", size: "3.2 MB", price: "Rp 5.000", isFree: false, key: "FF99" },
    { name: "Green 25%.zip", size: "1.5 MB", price: "Rp 9.000", isFree: false, key: "GANTENG" },
    { name: "Red 35%.zip", size: "4.1 MB", price: "Rp 14.000", isFree: false, key: "XENO77" },
    { name: "Nova.zip", size: "4.1 MB", price: "Rp 50.000", isFree: false, key: "XENO77" },
    { name: "Absolute.zip", size: "4.1 MB", price: "Rp 70.000", isFree: false, key: "XENO77" },
    { name: "Zenith.zip", size: "4.1 MB", price: "Rp 90.000", isFree: false, key: "XENO77" },
    { name: "Stabilizer.zip", size: "1.0 MB", price: "FREE", isFree: true, key: "" }
];

// --- SISTEM WARNA RANDOM ---
const colors = ["#00ffcc", "#3355ff", "#ff3355", "#cc33ff", "#ff9900"];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
document.documentElement.style.setProperty('--accent-color', randomColor);

let currentFile = null;

// Fungsi Render File dengan Pembagi Section
function renderFiles(filter = "") {
    const freeContainer = document.getElementById('fileListFree');
    const premiumContainer = document.getElementById('fileListPremium');
    
    if (!freeContainer || !premiumContainer) return;

    freeContainer.innerHTML = "";
    premiumContainer.innerHTML = "";
    
    files.forEach(file => {
        if (file.name.toLowerCase().includes(filter.toLowerCase())) {
            const card = document.createElement('div');
            card.className = 'file-card';
            
            const priceColor = file.isFree ? "#00ff00" : "var(--accent-color)";
            const btnText = file.isFree ? "Download" : "Get File";

            card.innerHTML = `
                <div style="text-align: left;">
                    <i class="fas fa-file-archive" style="color: ${priceColor}; font-size: 1.5rem;"></i>
                    <strong style="margin-left: 10px;">${file.name}</strong><br>
                    <div style="margin-left: 35px; margin-top: 5px;">
                        <small style="color: #888;">Size: ${file.size}</small> | 
                        <small style="color: ${priceColor}; font-weight: bold;">${file.price}</small>
                    </div>
                </div>
                <button class="btn-get" onclick="prepareDownload('${file.name}')">${btnText}</button>
            `;

            if (file.isFree) {
                freeContainer.appendChild(card);
            } else {
                premiumContainer.appendChild(card);
            }
        }
    });

    if (freeContainer.innerHTML === "") freeContainer.innerHTML = "<p style='color:gray;'>Tidak ada file gratis...</p>";
    if (premiumContainer.innerHTML === "") premiumContainer.innerHTML = "<p style='color:gray;'>Tidak ada file premium...</p>";
}

function prepareDownload(fileName) {
    currentFile = files.find(f => f.name === fileName);
    if (currentFile) {
        if (currentFile.isFree) {
            alert("🚀 File Gratis! Mendownload...");
            const downloadUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/files/${encodeURIComponent(currentFile.name)}`;
            window.location.href = downloadUrl;
        } else {
            document.getElementById('keyInput').value = "";
            document.getElementById('keyModal').style.display = 'flex';
        }
    }
}

function validateKey() {
    const userInput = document.getElementById('keyInput').value;
    if (!currentFile) return;

    if (userInput === currentFile.key) {
        alert("✅ Key Benar! Mendownload...");
        const downloadUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/files/${encodeURIComponent(currentFile.name)}`;
        window.location.href = downloadUrl;
        closeAllModals();
    } else {
        const priceDisplay = document.getElementById('priceDisplay');
        if (priceDisplay) priceDisplay.innerText = currentFile.price;
        document.getElementById('keyModal').style.display = 'none';
        document.getElementById('qrisModal').style.display = 'flex';
    }
}

function redirectToWA() {
    if (!currentFile) return;
    const message = `Halo Xeno, saya mau beli file ini bro:
    
📂 *File:* ${currentFile.name}
💰 *Harga:* ${currentFile.price}

Ini bukti transfernya, tolong kirim Key-nya ya!`;
    const waUrl = `https://wa.me/${MY_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
}

function closeAllModals() {
    document.getElementById('keyModal').style.display = 'none';
    document.getElementById('qrisModal').style.display = 'none';
}

function closeQris() {
    document.getElementById('qrisModal').style.display = 'none';
}

window.onload = () => {
    renderFiles();
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => renderFiles(e.target.value));
    }
};
