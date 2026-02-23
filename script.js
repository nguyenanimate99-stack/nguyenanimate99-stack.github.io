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

    // Tự xóa sau 3.5 giây
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.5s forwards";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
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
        setTimeout(toggleLogin, 1000); // Đợi 1s rồi hiện bảng login
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
                        onerror="this.src=this.dataset.static; this.dataset.gif=''" 
                        style="width: 100%; height: 100%; object-fit: cover; position: absolute; top:0; left:0;"
                        alt="${item.title}"
                    >
                `;
            } else {
                imageHTML = `
                    <img src="${item.img}" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top:0; left:0;" alt="${item.title}">
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
