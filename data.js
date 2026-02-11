/* --- data.js --- */

// (Đã xóa danh sách ALLOWED_EMAILS - Giờ Google Drive sẽ tự quản lý)

// 1. CẤU HÌNH MENU CHA
const MENU_CONFIG = {
    "NHAN_VAT": ["NV_HIEN_DAI", "NV_CO_XUA"],
    "KHUNG_CANH": ["KC_HIEN_DAI", "KC_CO_XUA"],
    "MAU_CHUYEN_DONG": ["MCD_HIEN_DAI", "MCD_CO_XUA"],
    "DAO_CU": ["DC_HIEN_DAI", "DC_CO_XUA"],
};

// 2. Cấu hình chi tiết cho từng Tag
const TAG_INFO = {
    "DEFAULT": { title: "KHO <span>DỮ LIỆU</span>", link: "#" },

    // --- DỮ LIỆU (NHÂN VẬT HIỆN ĐẠI) ---
    "Bối Cảnh Hiện Đại 2": { title: "HIỆN <span>ĐẠI 2</span>", link: "" },
    "Trong Thành Phố": { title: "THÀNH <span>PHỐ</span>", link: "#" },
    "Thập Niên 8090": { title: "RETRO <span>8090</span>", link: "#" },
    
    // --- DỮ LIỆU (NHÂN VẬT CỔ XƯA) ---
    "Kiếm Hiệp": { title: "KIẾM <span>HIỆP</span>", link: "#" },
    "Cung Đình": { title: "CUNG <span>ĐÌNH</span>", link: "#" },
    "Làng Quê Yên Bình": { title: "LÀNG <span>QUÊ</span>", link: "#" },

    // --- DỮ LIỆU (KHUNG CẢNH HIỆN ĐẠI) ---
    "Cao Ốc": { title: "CAO <span>ỐC</span>", link: "https://drive.google.com/link-cao-oc" },
    "Phòng Gaming": { title: "PHÒNG <span>GAME</span>", link: "#" },
    
    // --- DỮ LIỆU (KHUNG CẢNH CỔ XƯA) ---
    "Rừng Trúc": { title: "RỪNG <span>TRÚC</span>", link: "#" },
    "Đền Chùa": { title: "ĐỀN <span>CHÙA</span>", link: "#" },

    // --- DỮ LIỆU (MẪU CHUYỂN ĐỘNG HIỆN ĐẠI) ---
    "Súng Ống": { title: "VŨ KHÍ <span>NÓNG</span>", link: "link-tai-sung" },
    "Xe Cộ": { title: "VŨ KHÍ <span>NÓNG</span>", link: "link-tai-sung" },
    
    // --- DỮ LIỆU (MẪU CHUYỂN ĐỘNG CỔ XƯA) ---
    "Kiếm": { title: "BINH <span>KHÍ</span>", link: "link-tai-kiem" },
    "Cung Tên": { title: "CUNG <span>KHÍ</span>", link: "link-tai-kiem" },

    // --- DỮ LIỆU (ĐẠO CỤ HIỆN ĐẠI) ---
    "THẺ1": { title: "THẺ1 <span>NÓNG</span>", link: "link-tai-sung" },
    "THẺ2": { title: "THẺ2 <span>NÓNG</span>", link: "link-tai-sung" },
    
    // --- DỮ LIỆU (ĐẠO CỤ CỔ XƯA) ---
    "TAG1": { title: "TAG1 <span>KHÍ</span>", link: "link-tai-kiem" },
    "TAG2": { title: "TAG2 <span>KHÍ</span>", link: "link-tai-kiem" },
};

// 3. Danh sách Tag cho từng Tab
const TAG_LIST = {
    "NV_HIEN_DAI": ["Bối Cảnh Hiện Đại 2", "Trong Thành Phố", "Thập Niên 8090"],
    "NV_CO_XUA": ["Kiếm Hiệp", "Cung Đình", "Làng Quê Yên Bình"],
    "KC_HIEN_DAI": ["Cao Ốc", "Phòng Gaming"],
    "KC_CO_XUA": ["Rừng Trúc", "Đền Chùa"],
    "MCD_HIEN_DAI": ["Súng Ống", "Xe Cộ"],
    "MCD_CO_XUA": ["Kiếm", "Cung Tên"],
    "DC_HIEN_DAI": ["THẺ1", "THẺ2"],
    "DC_CO_XUA": ["TAG1", "TAG2"],
};