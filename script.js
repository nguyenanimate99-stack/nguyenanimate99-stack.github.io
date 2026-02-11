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

// --- 1. LOGIC CHUYỂN TRANG & BẢO MẬT ---

function goHome() {
    // Về trang chủ thì ai cũng được phép
    document.getElementById('home-section').classList.remove('hidden');
    document.getElementById('main-app').classList.add('hidden');
    
    // Reset menu
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('btn-home').classList.add('active');
}

function switchCategory(categoryName) {
    // BẢO MẬT: Kiểm tra đăng nhập ngay tại đây!
    // Nếu chưa đăng nhập -> Hiện popup login và DỪNG LẠI KHÔNG CHO VÀO
    if (!CONFIG.currentUser) {
        toggleLogin(); // Hiện bảng đăng nhập
        return;        // Dừng code lại, không cho chuyển trang
    }

    // Nếu đã đăng nhập thì chạy tiếp logic bình thường:
    if (!MENU_CONFIG[categoryName]) return;

    // 1. Ẩn trang chủ, hiện app
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');

    // 2. Logic chuyển tab
    CONFIG.currentCategory = categoryName;
    const firstTab = MENU_CONFIG[categoryName][0];
    const firstTag = TAG_LIST[firstTab] ? TAG_LIST[firstTab][0] : "";
    
    // Xóa active home
    document.getElementById('btn-home').classList.remove('active');

    if (firstTab && firstTag) {
        appRun(firstTab, firstTag, 1);
    }
}

// --- 2. LOGIC ĐĂNG NHẬP (GIẢ LẬP) ---

function toggleLogin() {
    if (CONFIG.currentUser) {
        const logout = confirm("Bạn có muốn đăng xuất?");
        if (logout) handleLogout();
    } else {
        document.getElementById('login-overlay').classList.remove('hidden');
    }
}

function closeLoginPopup() {
    document.getElementById('login-overlay').classList.add('hidden');
}

function handleGoogleLogin() {
    /* GIẢ LẬP ĐĂNG NHẬP (Simulation Mode)
       - Khi nhấn nút, nó tự coi như đã đăng nhập thành công.
    */
    const fakeUser = {
        displayName: "Người Dùng",
        email: "user@gmail.com", 
        photoURL: "https://lh3.googleusercontent.com/a/default-user" // Avatar mặc định
    };

    onLoginSuccess(fakeUser);
}

function onLoginSuccess(user) {
    CONFIG.currentUser = user;
    closeLoginPopup();

    // Đổi icon user thành avatar
    const userDiv = document.getElementById('user-display');
    userDiv.innerHTML = `<img src="${user.photoURL}" class="user-avatar" title="${user.displayName}">`;
    userDiv.style.border = "2px solid var(--accent-color)";

    updateDownloadButton(); // Cập nhật nút tải cho sáng lên

    // Tự động vào luôn mục Nhân Vật cho tiện
    alert("Đăng nhập thành công! Chào mừng " + user.displayName);
    switchCategory("NHAN_VAT");
}

function handleLogout() {
    CONFIG.currentUser = null;
    
    // Reset icon user
    const userDiv = document.getElementById('user-display');
    userDiv.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
    userDiv.style.border = "1px solid var(--gray-text)";

    updateDownloadButton();
    
    // Đăng xuất xong thì ĐÁ VỀ TRANG CHỦ ngay
    goHome();
}

// --- 3. LOGIC TẢI XUỐNG (ĐÃ CẬP NHẬT: TẢI TỪNG ẢNH) ---

function updateDownloadButton() {
    const btn = document.getElementById('download-btn');
    const user = CONFIG.currentUser;

    // Chỉ cần kiểm tra: Đã đăng nhập hay chưa?
    if (!user) {
        // Chưa đăng nhập
        btn.innerHTML = `<i class="fas fa-lock"></i> ĐĂNG NHẬP ĐỂ TẢI`;
        btn.style.opacity = "0.7";
    } else {
        // Đã đăng nhập
        btn.innerHTML = `TẢI TẤT CẢ`;
        btn.style.opacity = "1";
    }
}

function handleDownload() {
    const user = CONFIG.currentUser;
    
    // 1. Chặn nếu chưa đăng nhập
    if (!user) {
        toggleLogin();
        return;
    }

    // 2. Mở link chung (nếu có)
    if (CONFIG.currentLink && CONFIG.currentLink !== "#") {
        window.open(CONFIG.currentLink, '_blank');
    } else {
        alert("Chưa có link tải chung cho mục này. Hãy thử bấm vào từng ảnh để tải nhé!");
    }
}

// --- HÀM XỬ LÝ CLICK VÀO ẢNH (MỚI) ---
function handleCardClick(item) {
    // Bước 1: Kiểm tra đăng nhập
    if (!CONFIG.currentUser) {
        toggleLogin(); // Chưa đăng nhập thì hiện bảng Login
        return;
    }

    // Bước 2: Kiểm tra xem ảnh có link drive không
    if (!item.driveLink || item.driveLink === "") {
        alert("File này chưa được cập nhật link tải. Vui lòng thử ảnh khác!");
        return;
    }

    // Bước 3: Chuyển đổi link và Tải
    const directLink = convertToDirectLink(item.driveLink);
    
    // Mở tab mới để tải
    window.open(directLink, '_blank');
}

// --- CÁC HÀM CŨ (GIỮ NGUYÊN) ---

function updateActiveMenu() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    // Logic làm sáng nút menu
    const menuId = {
        "NHAN_VAT": 'btn-nhanvat',
        "KHUNG_CANH": 'btn-khungcanh',
        "MAU_CHUYEN_DONG": 'btn-mauchuyendong',
        "DAO_CU": 'btn-daocu'
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

/* --- Thay thế hàm renderGrid trong script.js --- */

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
            
            // Click để tải
            card.onclick = () => { handleCardClick(item); };

            // --- ĐOẠN LOGIC MỚI ĐỂ XỬ LÝ ẢNH GIF ---
            let imageHTML = ``;
            
            // Kiểm tra: Nếu có thuộc tính 'gif' và nó không rỗng
            if (item.gif && item.gif !== "") {
                imageHTML = `
                    <img src="${item.img}" class="card-img-static" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top:0; left:0;">
                    
                    <img src="${item.gif}" class="card-img-gif" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top:0; left:0;">
                `;
            } else {
                // Nếu không có GIF, chỉ hiện ảnh tĩnh bình thường
                imageHTML = `
                    <img src="${item.img}" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top:0; left:0;">
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