/* --- data.js --- */

// (Đã xóa danh sách ALLOWED_EMAILS - Giờ Google Drive sẽ tự quản lý)

// 1. CẤU HÌNH MENU CHA
const MENU_CONFIG = {
    "NHAN_VAT": ["NV_HIEN_DAI", "NV_CO_XUA"],
    "KHUNG_CANH": ["KC_HIEN_DAI", "KC_CO_XUA"],
    "MAU_CHUYEN_DONG": ["MCD_HIEN_DAI", "MCD_CO_XUA"],
    "DAO_CU": ["DC_HIEN_DAI", "DC_CO_XUA"],
    "HIEU_UNG": ["HU_THUONG", "HU_TU_TIEN"],

};

// 2. Cấu hình chi tiết cho từng Tag
const TAG_INFO = {
    "DEFAULT": { title: "KHO <span>DỮ LIỆU</span>", link: "#" },

    // --- DỮ LIỆU (NHÂN VẬT HIỆN ĐẠI) ---
    "NV Hiện Đại": { title: "HIỆN <span>ĐẠI 2</span>", link: "" },
    "NV Đô Thị": { title: "THÀNH <span>PHỐ</span>", link: "#" },
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

    // --- DỮ LIỆU (ĐẠO CỤ HIỆN ĐẠI) ---
    "hieuung1": { title: "HIỆU ỨNG <span>THƯỜNG 1</span>", link: "link-tai-sung" },
    "hieuung2": { title: "HIỆU ỨNG <span>THƯỜNG 2</span>", link: "link-tai-sung" },

    // --- DỮ LIỆU (ĐẠO CỤ HIỆN ĐẠI) ---
    "hieuung3": { title: "HIỆU ỨNG <span>TU TIÊN 3</span>", link: "link-tai-sung" },
    "hieuung4": { title: "HIỆU ỨNG <span>TU TIÊN 4</span>", link: "link-tai-sung" },


};

// 3. Danh sách Tag cho từng Tab
const TAG_LIST = {
    "NV_HIEN_DAI": ["NV Hiện Đại", "NV Đô Thị", "Thập Niên 8090"],
    "NV_CO_XUA": ["Kiếm Hiệp", "Cung Đình", "Làng Quê Yên Bình"],
    "KC_HIEN_DAI": ["Cao Ốc", "Phòng Gaming"],
    "KC_CO_XUA": ["Rừng Trúc", "Đền Chùa"],
    "MCD_HIEN_DAI": ["Súng Ống", "Xe Cộ"],
    "MCD_CO_XUA": ["Kiếm", "Cung Tên"],
    "DC_HIEN_DAI": ["THẺ1", "THẺ2"],
    "DC_CO_XUA": ["TAG1", "TAG2"],
    "HU_THUONG": ["hieuung1", "hieuung2"],
    "HU_TU_TIEN": ["hieuung3", "hieuung4"],

};
