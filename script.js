// Ganti dengan username dan nama repository GitHub kamu
const GITHUB_USERNAME = "Doctor909xxx";
const REPO_NAME = "error";

// Daftar file yang ada di folder 'files' dalam repo
const files = [
    { name: "abc.zip", size: "2.4 MB" },
    { name: "Config High FPS.zip", size: "1.1 MB" },
    { name: "Mod Skin Pack.zip", size: "5.8 MB" }
];

const fileListContainer = document.getElementById('fileList');
const searchInput = document.getElementById('searchInput');

function renderFiles(filter = "") {
    fileListContainer.innerHTML = "";
    
    files.forEach(file => {
        if (file.name.toLowerCase().includes(filter.toLowerCase())) {
            // Konstruksi Link Download Langsung dari GitHub
            const downloadUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/files/${encodeURIComponent(file.name)}`;

            const card = document.createElement('div');
            card.className = 'file-card';
            card.innerHTML = `
                <div style="text-align: left;">
                    <strong>${file.name}</strong><br>
                    <small style="color: #888;">Size: ${file.size}</small>
                </div>
                <a href="${downloadUrl}" class="download-btn" download>Download</a>
            `;
            fileListContainer.appendChild(card);
        }
    });
}

searchInput.addEventListener('input', (e) => renderFiles(e.target.value));

// Inisialisasi awal
renderFiles();
