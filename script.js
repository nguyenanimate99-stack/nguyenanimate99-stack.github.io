/* --- script.js --- */

// Cấu hình
const CONFIG = {
    itemsPerPage: 60,
    currentCategory: "NHAN_VAT",
    currentTab: "NV_HIEN_DAI",
    currentTag: TAG_LIST["NV_HIEN_DAI"][0],
    currentUser: null,  // Biến kiểm tra: null = Chưa đăng nhập
    currentLink: ""     
};

// --- 0. CÁC HÀM TIỆN ÍCH GIAO DIỆN MỚI (TOAST & CONFIRM) ---

// Hàm hiện thông báo đẹp (thay cho alert)
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    // Tự xóa sau 1.5 giây
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.5s forwards";
        setTimeout(() => toast.remove(), 500);
    }, 1000);
}

// Hàm hiện hộp thoại xác nhận (thay cho confirm)
function showConfirm(message, callbackYes) {
    const overlay = document.getElementById('custom-confirm');
    const msgEl = document.getElementById('confirm-message');
    const btnYes = document.getElementById('btn-confirm-yes');
    
    msgEl.innerText = message;
    overlay.classList.remove('hidden'); 
    
    // Gán sự kiện cho nút Đồng ý (dùng onclick để tránh gán chồng sự kiện cũ)
    btnYes.onclick = function() {
        callbackYes(); 
        closeConfirm();
    };
}

function closeConfirm() {
    document.getElementById('custom-confirm').classList.add('hidden');
}


// --- 1. LOGIC CHUYỂN TRANG & BẢO MẬT ---

function goHome() {
    document.getElementById('home-section').classList.remove('hidden');
    document.getElementById('main-app').classList.add('hidden');
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('btn-home').classList.add('active');
}

function switchCategory(categoryName) {
    // BẢO MẬT: Kiểm tra đăng nhập
    if (!CONFIG.currentUser) {
        showToast("Vui lòng đăng nhập để xem mục này!", "error");
        setTimeout(toggleLogin, 200); // Đợi 1s rồi hiện bảng login
        return;
    }

    if (!MENU_CONFIG[categoryName]) return;

    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');

    CONFIG.currentCategory = categoryName;
    const firstTab = MENU_CONFIG[categoryName][0];
    const firstTag = TAG_LIST[firstTab] ? TAG_LIST[firstTab][0] : "";
    
    document.getElementById('btn-home').classList.remove('active');

    if (firstTab && firstTag) {
        appRun(firstTab, firstTag, 1);
    }
}

// --- 2. LOGIC ĐĂNG NHẬP (FIREBASE THẬT) ---

// Tự động kiểm tra trạng thái đăng nhập khi load trang
setTimeout(() => {
    if (window.firebaseLibs && window.firebaseLibs.onAuthStateChanged) {
        const { auth, onAuthStateChanged } = window.firebaseLibs;
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Người dùng đã đăng nhập từ trước
                CONFIG.currentUser = user;
                updateUserInterface(user);
            } else {
                CONFIG.currentUser = null;
            }
        });
    }
}, 1000);

function toggleLogin() {
    if (CONFIG.currentUser) {
        // Dùng hộp thoại xác nhận mới
        showConfirm("Bạn có chắc chắn muốn đăng xuất?", handleLogout);
    } else {
        document.getElementById('login-overlay').classList.remove('hidden');
    }
}

function closeLoginPopup() {
    document.getElementById('login-overlay').classList.add('hidden');
}

function handleGoogleLogin() {
    if (!window.firebaseLibs) {
        showToast("Lỗi: Chưa kết nối Firebase!", "error");
        return;
    }

    const { auth, signInWithPopup, GoogleAuthProvider } = window.firebaseLibs;
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            onLoginSuccess(result.user);
        })
        .catch((error) => {
            console.error("Lỗi:", error);
            showToast("Đăng nhập thất bại: " + error.message, "error");
        });
}

function onLoginSuccess(user) {
    CONFIG.currentUser = user;
    closeLoginPopup();
    updateUserInterface(user);
    
    showToast("Đăng nhập thành công! Chào " + user.displayName, "success");
    switchCategory("NHAN_VAT");
}

function updateUserInterface(user) {
    const userDiv = document.getElementById('user-display');
    const avatarUrl = user.photoURL ? user.photoURL : "https://via.placeholder.com/40";
    
    userDiv.innerHTML = `<img src="${avatarUrl}" class="user-avatar" title="${user.displayName}">`;
    userDiv.style.border = "2px solid var(--accent-color)";

    updateDownloadButton();
}

function handleLogout() {
    if (window.firebaseLibs) {
        const { auth, signOut } = window.firebaseLibs;
        signOut(auth).then(() => {
            CONFIG.currentUser = null;
    
            const userDiv = document.getElementById('user-display');
            userDiv.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
            userDiv.style.border = "1px solid var(--gray-text)";

            updateDownloadButton();
            showToast("Đã đăng xuất thành công!", "success");
            goHome();
        }).catch((error) => {
            showToast("Lỗi đăng xuất!", "error");
        });
    }
}

// --- 3. LOGIC TẢI XUỐNG ---

function updateDownloadButton() {
    const btn = document.getElementById('download-btn');
    const user = CONFIG.currentUser;

    if (!user) {
        btn.innerHTML = `<i class="fas fa-lock"></i> ĐĂNG NHẬP ĐỂ TẢI`;
        btn.style.opacity = "0.7";
    } else {
        btn.innerHTML = `TẢI TOÀN BỘ`;
        btn.style.opacity = "1";
    }
}

function handleDownload() {
    const user = CONFIG.currentUser;
    if (!user) {
        showToast("Bạn cần đăng nhập để tải tài nguyên!", "error");
        setTimeout(toggleLogin, 1000);
        return;
    }

    if (CONFIG.currentLink && CONFIG.currentLink !== "#") {
        window.open(CONFIG.currentLink, '_blank');
    } else {
        showToast("Mục này chưa có link tải chung. Hãy chọn từng ảnh!", "error");
    }
}

// --- HÀM XỬ LÝ CLICK VÀO ẢNH ---
function handleCardClick(item) {
    if (!CONFIG.currentUser) {
        showToast("Vui lòng đăng nhập để tải ảnh này!", "error");
        toggleLogin();
        return;
    }

    if (!item.driveLink || item.driveLink === "") {
        showToast("Ảnh này đang cập nhật link tải...", "error");
        return;
    }

    const directLink = convertToDirectLink(item.driveLink);
    window.open(directLink, '_blank');
}

// --- CÁC HÀM GIAO DIỆN (GIỮ NGUYÊN) ---

function updateActiveMenu() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const menuId = {
        "NHAN_VAT": 'btn-nhanvat',
        "KHUNG_CANH": 'btn-khungcanh',
        "MAU_CHUYEN_DONG": 'btn-mauchuyendong',
        "DAO_CU": 'btn-daocu',
        "HIEU_UNG": 'btn-hieuung',
        "DONG_VAT": 'btn-dongvat',
        "BIEU_CAM_&_CU_CHI": 'btn-bieucam&cuchi',
        "VAT_LIEU_MIEN_PHI": 'btn-vatlieumienphi',

    };
    const currentId = menuId[CONFIG.currentCategory];
    if(currentId) {
        const el = document.getElementById(currentId);
        if(el) el.classList.add('active');
    }
}

function updateHeaderInfo(tag) {
    const info = TAG_INFO[tag] || TAG_INFO["DEFAULT"];
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.innerHTML = info.title;
    CONFIG.currentLink = convertToDirectLink(info.link);
    updateDownloadButton();
}

function convertToDirectLink(url) {
    if (!url || !url.includes("drive.google.com")) return url;
    let id = "";
    const parts = url.split("/");
    const index = parts.indexOf("d");
    if (index !== -1) id = parts[index + 1];
    else if (url.includes("id=")) id = url.split("id=")[1].split("&")[0];
    if (id) return `https://drive.google.com/uc?export=download&id=${id}`;
    return url;
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

function renderTabs(currentTab) {
    const container = document.getElementById('category-tabs');
    container.innerHTML = '';
    const tabsToShow = MENU_CONFIG[CONFIG.currentCategory];

    if (tabsToShow) {
        tabsToShow.forEach(key => {
            const btn = document.createElement('button');
            let label = key;
            if (key.includes("HIEN_DAI")) label = "HIỆN ĐẠI";
            if (key.includes("CO_XUA")) label = "CỔ XƯA";
            if (key.includes("DAC_BIET")) label = "ĐẶC BIỆT";
            if (key.includes("THONG_THUONG")) label = "THÔNG THƯỜNG";
            if (key.includes("VU_KHI")) label = "VŨ KHÍ";
            if (key.includes("HANG_NGAY")) label = "HÀNG NGÀY";
            if (key.includes("CHU_DE")) label = "CHỦ ĐỀ";
            if (key.includes("DONG_VAT")) label = "ĐỘNG VẬT";
            if (key.includes("QUAI_VAT")) label = "QUÁI VẬT";
            if (key.includes("BIEU_CAM")) label = "BIỂU CẢM";
            if (key.includes("CU_CHI")) label = "CỬ CHỈ";
            if (key.includes("NHAN_VAT")) label = "NHÂN VẬT";
            if (key.includes("KHUNG_CANH")) label = "KHUNG CẢNH";
            if (key.includes("DAO_CU")) label = "ĐẠO CỤ";
            if (key.includes("PHAN_MEM")) label = "PHẦN MỀM";
            if (key.includes("THONG_BAO")) label = "THÔNG BÁO";
            
            btn.className = `tab-btn ${key === currentTab ? 'active' : ''}`;
            btn.innerText = label;
            btn.onclick = () => {
                const firstTag = TAG_LIST[key] ? TAG_LIST[key][0] : "";
                if(firstTag) appRun(key, firstTag, 1);
            };
            container.appendChild(btn);
        });
    }
}

function renderFilters(currentTab, currentTag) {
    const container = document.getElementById('filters');
    container.innerHTML = '';
    const tags = TAG_LIST[currentTab] || [];
    tags.forEach(tagName => {
        const pill = document.createElement('div');
        pill.className = `filter-pill ${tagName === currentTag ? 'active' : ''}`;
        pill.innerText = tagName;
        pill.onclick = () => {
            appRun(currentTab, tagName, 1);
        };
        container.appendChild(pill);
    });
}

function renderGrid(currentTab, currentTag, currentPage) {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';

    const filteredItems = ALL_IMAGES.filter(item => 
        item.tab === currentTab && item.tag === currentTag
    );

    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / CONFIG.itemsPerPage);
    const start = (currentPage - 1) * CONFIG.itemsPerPage;
    const end = start + CONFIG.itemsPerPage;
    const itemsToShow = filteredItems.slice(start, end);

    if (itemsToShow.length > 0) {
        itemsToShow.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.animationDelay = `${index * 0.05}s`;
            
            card.onclick = () => { handleCardClick(item); };

            let imageHTML = ``;
            // CẬP NHẬT: Gộp thành 1 thẻ img duy nhất để tối ưu load trang và bắt lỗi ảnh hỏng
            if (item.gif && item.gif !== "") {
                imageHTML = `
                    <img 
                        src="${item.img}" 
                        data-static="${item.img}" 
                        data-gif="${item.gif}" 
                        onmouseover="if(this.dataset.gif) this.src=this.dataset.gif" 
                        onmouseout="this.src=this.dataset.static" 
                        onerror="this.onerror=null; this.src=this.src.replace('.gif', '.webp'); if(this.dataset.static) this.dataset.static=this.dataset.static.replace('.gif', '.webp');" 
                        style="width: 100%; height: 100%; object-fit: cover; position: absolute; top:0; left:0;"
                        alt="${item.title}"
                    >
                `;
            } else {
                imageHTML = `
                    <img src="${item.img}" onerror="this.onerror=null; this.src=this.src.replace('.gif', '.webp');" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top:0; left:0;" alt="${item.title}">
                `;
            }

            card.innerHTML = `
                ${imageHTML}
                <span class="card-label">${item.title}<br><small>${item.tag}</small></span>
                <div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); color: #fff; padding: 5px 8px; border-radius: 4px; font-size: 10px; pointer-events: none; z-index: 2;">
                    <i class="fas fa-download"></i> Tải Ngay
                </div>
            `;
            gridContainer.appendChild(card);
        });
    } else {
        gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--gray-text); padding: 50px;">Chưa có dữ liệu ảnh cho mục này...</div>`;
    }
    renderPagination(totalPages, currentPage, currentTab, currentTag);
}

function renderPagination(totalPages, currentPage, currentTab, currentTag) {
    const container = document.getElementById('pagination');
    container.innerHTML = '';
    if (totalPages <= 1) return;
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('div');
        btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        btn.innerText = i;
        btn.onclick = () => {
            appRun(currentTab, currentTag, i);
        };
        container.appendChild(btn);
    }
}

function appRun(tab, tag, page) {
    for (const [menu, tabs] of Object.entries(MENU_CONFIG)) {
        if (tabs.includes(tab)) {
            CONFIG.currentCategory = menu;
            break;
        }
    }
    updateActiveMenu();
    updateHeaderInfo(tag);
    renderTabs(tab);
    renderFilters(tab, tag);
    renderGrid(tab, tag, page);
}

/* --- TÍNH NĂNG MỚI: TỰ ĐỘNG CUỘN LÊN ĐẦU TRANG --- */
document.addEventListener('click', function(e) {
    // Kiểm tra nếu bấm vào: Phân trang, Tab, Bộ lọc, hoặc Menu chính
    if (e.target.closest('.page-btn') || 
        e.target.closest('.tab-btn') || 
        e.target.closest('.filter-pill') ||
        e.target.closest('.nav-item')) {
        
        // Cuộn ngay lập tức lên đầu (behavior: 'auto' để nhảy nhanh, 'smooth' để trượt từ từ)
        window.scrollTo({
            top: 0,
            behavior: 'auto' 
        });
    }
});
/* =========================================
   CÁC TÍNH NĂNG TƯƠNG TÁC PC HOÀN CHỈNH
========================================= */

// --- 1. HIỆU ỨNG ẨN/HIỆN THANH MENU TRÊN PC KHI CUỘN ---
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    if (window.innerWidth > 1024) {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        navbar.style.top = (currentScroll > lastScrollTop && currentScroll > 100) ? '-100px' : '20px';
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    } else {
        navbar.style.top = '0px';
    }
});

const homeSection = document.getElementById('home-section');

// Xóa các hiệu ứng cũ để tránh lỗi dán đè
document.querySelectorAll('.mouse-glow, #rain-container, #particle-canvas').forEach(el => el.remove());

// --- 2. HIỆU ỨNG ÁNH SÁNG CHUỘT (GLOW) ---
const glowEl = document.createElement('div');
glowEl.className = 'mouse-glow';
document.body.appendChild(glowEl);

let mouseX = -1000;
let mouseY = -1000;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!homeSection.classList.contains('hidden')) {
        glowEl.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
        glowEl.style.opacity = document.body.classList.contains('light-mode') ? '0.15' : '0.08';
    } else {
        glowEl.style.opacity = '0';
    }
});

document.addEventListener('mouseleave', () => {
    glowEl.style.opacity = '0';
    mouseX = -1000;
    mouseY = -1000;
});


// --- 3. HIỆU ỨNG LƯỚI HẠT TƯƠNG TÁC (PARTICLES NETWORK) ---
const canvas = document.createElement('canvas');
canvas.id = 'particle-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let particlesArray = [];
const connectionDistance = 120; // Khoảng cách nối các hạt với nhau
const mouseConnectionDistance = 180; // Khoảng cách tia sáng nối từ chuột tới hạt

// Cập nhật kích thước canvas theo màn hình
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Khởi tạo đối tượng Hạt
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Kích thước hạt
        this.speedX = (Math.random() - 0.5) * 1.2; // Tốc độ trôi ngang
        this.speedY = (Math.random() - 0.5) * 1.2; // Tốc độ trôi dọc
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Dội ngược lại khi chạm viền màn hình
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw(colorStr) {
        ctx.fillStyle = colorStr;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Sinh ra các hạt
function initParticles() {
    particlesArray = [];
    // Tính toán số lượng hạt dựa trên độ lớn màn hình cho vừa vặn
    const numberOfParticles = (canvas.width * canvas.height) / 12000; 
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();

// Vòng lặp vẽ lại liên tục (60 FPS)
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Đọc màu sắc dựa theo chế độ Sáng/Tối
    const isLightMode = document.body.classList.contains('light-mode');
    const r = isLightMode ? 0 : 255;
    const g = isLightMode ? 0 : 204;
    const b = isLightMode ? 0 : 0;
    const baseColor = `rgba(${r}, ${g}, ${b}, 0.8)`;

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(baseColor);

        // 1. Nối các hạt với nhau
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                const opacity = 1 - (distance / connectionDistance);
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.4})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }

        // 2. Nối hạt với con trỏ chuột
        if (!homeSection.classList.contains('hidden') && mouseX > 0 && mouseY > 0) {
            const dxMouse = particlesArray[i].x - mouseX;
            const dyMouse = particlesArray[i].y - mouseY;
            const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            if (distanceMouse < mouseConnectionDistance) {
                const opacityMouse = 1 - (distanceMouse / mouseConnectionDistance);
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacityMouse * 0.8})`;
                ctx.lineWidth = 1.5; // Dây nối với chuột sẽ đậm hơn một chút
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(mouseX, mouseY);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Bật/tắt canvas khi ở trang chủ hoặc đã bấm vào Khám phá
setInterval(() => {
    if (!homeSection.classList.contains('hidden')) {
        canvas.classList.add('active');
    } else {
        canvas.classList.remove('active');
    }
}, 200);
