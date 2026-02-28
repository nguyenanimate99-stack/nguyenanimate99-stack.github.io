/* --- data.js --- */

// (Đã xóa danh sách ALLOWED_EMAILS - Giờ Google Drive sẽ tự quản lý)

// 1. CẤU HÌNH MENU CHA
const MENU_CONFIG = {
    "NHAN_VAT": ["NV_HIEN_DAI", "NV_CO_XUA"],
    "KHUNG_CANH": ["KC_HIEN_DAI", "KC_CO_XUA"],
    "MAU_CHUYEN_DONG": ["MCD_HIEN_DAI", "MCD_CO_XUA"],
    "DAO_CU": ["DC_VU_KHI", "DC_HANG_NGAY", "DC_CHU_DE"],
    "HIEU_UNG": ["HU_DAC_BIET", "HU_THONG_THUONG"],
    "DONG_VAT": ["DV_DONG_VAT", "DV_QUAI_VAT"],
    "BIEU_CAM_&_CU_CHI": ["BIEU_CAM", "CU_CHI"],
    "VAT_LIEU_MIEN_PHI": ["NHAN_VAT", "KHUNG_CANH", "DAO_CU", "DONG_VAT", "PHAN_MEM", "THONG_BAO"],

};

// 2. Cấu hình chi tiết cho từng Tag
const TAG_INFO = {
    "DEFAULT": { title: "KHO <span>DỮ LIỆU</span>", link: "#" },

    // --- DỮ LIỆU (NHÂN VẬT) ---
    "NV Hiện Đại": { title: "Nhân Vật <span>Hiện Đại </span>", link: "" },
    "NV Thành Thị": { title: "Nhân Vật <span>Thành Thị</span>", link: "#" },
    "NV 8090": { title: "Nhân Vật <span>8090</span>", link: "#" },
    "NV Xã Hội Đen": { title: "Nhân Vật <span>Xã Hội Đen</span>", link: "#" },
    "NV Trò Chơi": { title: "Nhân Vật <span>Trò Chơi</span>", link: "#" },
    "NV Tương Lai": { title: "Nhân Vật <span>Tương Lai</span>", link: "#" },
    "NV Đô Thị": { title: "Nhân Vật <span>Đô Thị</span>", link: "#" },
    "NV Cổ Điển": { title: "Nhân Vật <span>Cổ Điển</span>", link: "#" },
    
    "NV Cổ Xưa": { title: "Nhân Vật <span>Cổ Xưa</span>", link: "#" },
    "NV Xưa Cổ Điển": { title: "Nhân Vật <span>Xưa Cổ Điển</span>", link: "#" },
    "NV Tu Tiên": { title: "Nhân Vật <span>Tu Tiên</span>", link: "#" },
    "NV Chủ Đề": { title: "Nhân Vật <span>Chủ Đề</span>", link: "#" },
    "NV Ma Quỷ Kinh Dị": { title: "Nhân Vật <span>Ma Quỷ Kinh Dị</span>", link: "#" },
    "NV Kẻ Trộm Mộ": { title: "Nhân Vật <span>Kẻ Trộm Mộ</span>", link: "#" },
    "NV Hà Nhân": { title: "Nhân Vật <span>Hà Nhân</span>", link: "#" },
    "NV Cổ Xưa Tổng Hợp": { title: "Nhân Vật <span>Cổ Xưa Tổng Hợp</span>", link: "#" },

    // --- DỮ LIỆU (KHUNG CẢNH) ---
    "KC Thành Phố Hiện Đại": { title: "Khung Cảnh <span>Thành Phố Hiện Đại</span>", link: "" },
    "KC Mùa Đông": { title: "Khung Cảnh <span>Mùa Đông</span>", link: "#" },
    "KC Chiến Trường": { title: "Khung Cảnh <span>Chiến Trường</span>", link: "#" },
    "KC Lăng Mộ": { title: "Khung Cảnh <span>Lăng Mộ</span>", link: "#" },
    "KC Thành Phố U Ám": { title: "Khung Cảnh <span>Thành Phố U Ám</span>", link: "#" },
    "KC Thập Niên 8090": { title: "Khung Cảnh <span>Thập Niên 8090</span>", link: "#" },
    "KC Ngoài Trời & Bắt Hải Sản": { title: "Khung Cảnh <span>Ngoài Trời & Bắt Hải Sản</span>", link: "#" },
    "KC Tổng Hợp": { title: "Khung Cảnh <span>Tổng Hợp</span>", link: "#" },

    "KC Cổ Xưa": { title: "Khung Cảnh <span>Cổ Xưa</span>", link: "#" },

    // --- DỮ LIỆU (MẪU CHUYỂN ĐỘNG) ---
    "MCD Hiện Đại": { title: "Mẫu Chuyển Động <span>Hiện Đại</span>", link: "link-tai-sung" },
    "MCD Chiến Trường": { title: "Mẫu Chuyển Động <span>Chiến Trường</span>", link: "link-tai-sung" },
    "MCD Xác Sống": { title: "Mẫu Chuyển Động <span>Xác Sống</span>", link: "link-tai-sung" },

    "MCD Cổ Xưa": { title: "Mẫu Chuyển Động <span>Cổ Xưa</span>", link: "link-tai-sung" },
    "MCD Động Vật": { title: "Mẫu Chuyển Động <span>Động Vật</span>", link: "link-tai-sung" },
    "MCD Yêu Tinh": { title: "Mẫu Chuyển Động <span>Yêu Tinh</span>", link: "link-tai-sung" },
    
    // --- DỮ LIỆU (ĐẠO CỤ) ---
    "DC Vũ Khí Hiện Đại": { title: "Đạo Cụ <span>Vũ Khí Hiện Đại</span>", link: "link-tai-kiem" },
    "DC Vũ Khí Cổ Đại": { title: "Đạo Cụ <span>Vũ Khí Cổ Đại</span>", link: "link-tai-kiem" },
    "DC Vũ Khí Giả": { title: "Đạo Cụ <span>Vũ Khí Giả</span>", link: "link-tai-kiem" },

    "DC Nhà Bếp": { title: "Đạo Cụ <span>Nhà Bếp</span>", link: "link-tai-kiem" },
    "DC Thức Ăn": { title: "Đạo Cụ <span>Thức Ăn</span>", link: "link-tai-kiem" },
    "DC Hàng Ngày": { title: "Đạo Cụ <span>Hàng Ngày</span>", link: "link-tai-kiem" },
    "DC Túi Sách": { title: "Đạo Cụ <span>Túi Sách</span>", link: "link-tai-kiem" },
    "DC Kính Mắt": { title: "Đạo Cụ <span>Kính Mắt</span>", link: "link-tai-kiem" },
    "DC Trang Phục": { title: "Đạo Cụ <span>Trang Phục</span>", link: "link-tai-kiem" },

    "DC Mừng Năm Mới": { title: "Đạo Cụ <span>Mừng Năm Mới</span>", link: "link-tai-kiem" },
    "DC Thể Thao": { title: "Đạo Cụ <span>Thể Thao</span>", link: "link-tai-kiem" },
    "DC Âm Nhạc": { title: "Đạo Cụ <span>Âm Nhạc</span>", link: "link-tai-kiem" },
    "DC Câu Cá": { title: "Đạo Cụ <span>Câu Cá</span>", link: "link-tai-kiem" },
    "DC Phương Tiện": { title: "Đạo Cụ <span>Phương Tiện</span>", link: "link-tai-kiem" },
    "DC Cổ Đại": { title: "Đạo Cụ <span>Cổ Đại</span>", link: "link-tai-kiem" },

    // --- DỮ LIỆU (HIỆU ỨNG) ---
    "HU Hệ Thống": { title: "Hiệu Ứng <span>Hệ Thống</span>", link: "link-tai-sung" },
    "HU Tu Tiên": { title: "Hiệu Ứng <span>Tu Tiên</span>", link: "link-tai-sung" },

    "HU Thông Thường": { title: "Hiệu Ứng <span>Thông Thường</span>", link: "link-tai-sung" },
    "HU Cảm Xúc": { title: "Hiệu Ứng <span>Cảm Xúc</span>", link: "link-tai-sung" },
    "HU Toàn Màn Hình": { title: "Hiệu Ứng <span>Toàn Màn Hình</span>", link: "link-tai-sung" },
    "HU Tốc Độ Cao": { title: "Hiệu Ứng <span>Tốc Độ Cao</span>", link: "link-tai-sung" },
    

    
    // --- DỮ LIỆU (ĐỘNG VẬT) ---
    "Bộ Động Vật": { title: "Bộ <span>Động Vật</span>", link: "link-tai-kiem" },

    "Bộ Quái Vật": { title: "Bộ <span>Quái Vật</span>", link: "link-tai-kiem" },

    // --- DỮ LIỆU (BIỂU CẢM & CỬ CHỈ) ---
    "BC Chàng Trai": { title: "Biểu Cảm <span>Chàng Trai</span>", link: "link-tai-sung" },
    "BC Nữ": { title: "Biểu Cảm <span>Nữ</span>", link: "link-tai-sung" },
    "BC Người Lớn Tuổi": { title: "Biểu Cảm <span>Người Lớn Tuổi</span>", link: "link-tai-sung" },
    "BC Khác": { title: "Biểu Cảm <span>Khác</span>", link: "link-tai-sung" },

    // --- DỮ LIỆU (VẬT LIỆU MIỄN PHÍ) ---
    "Nhân Vật Đời Sống": { title: "NHÂN VẬT <span>Đời Sống</span>", link: "link-tai-sung" },

    "Khung Cảnh Hiện Đại": { title: "Khung Cảnh <span>Hiện Đại</span>", link: "link-tai-sung" },
    "Khung Cảnh Ngoài Trời": { title: "Khung Cảnh <span>Ngoài Trời</span>", link: "link-tai-sung" },
    "Khung Cảnh Cổ Đại": { title: "Khung Cảnh <span>Cổ Đại</span>", link: "link-tai-sung" },

    "Đạo Cụ Hệ Thống": { title: "Đạo Cụ <span>Hệ Thống</span>", link: "link-tai-sung" },

    "Động Vật": { title: "Động <span>Vật</span>", link: "link-tai-sung" },

};

// 3. Danh sách Tag cho từng Tab
const TAG_LIST = {
    "NV_HIEN_DAI": ["NV Hiện Đại", "NV Thành Thị", "NV 8090", "NV Xã Hội Đen", "NV Trò Chơi", "NV Tương Lai", "NV Đô Thị", "NV Cổ Điển"],
    "NV_CO_XUA": ["NV Cổ Xưa", "NV Xưa Cổ Điển", "NV Tu Tiên", "NV Chủ Đề", "NV Ma Quỷ Kinh Dị", "NV Kẻ Trộm Mộ", "NV Hà Nhân", "NV Cổ Xưa Tổng Hợp"],

    "KC_HIEN_DAI": ["KC Thành Phố Hiện Đại", "KC Mùa Đông", "KC Chiến Trường", "KC Lăng Mộ", "KC Thành Phố U Ám", "KC Thập Niên 8090", "KC Ngoài Trời & Bắt Hải Sản", "KC Tổng Hợp"],
    "KC_CO_XUA": ["KC Cổ Xưa"],
    
    "MCD_HIEN_DAI": ["MCD Hiện Đại", "MCD Chiến Trường", "MCD Xác Sống"],
    "MCD_CO_XUA": ["MCD Cổ Xưa", "MCD Động Vật", "MCD Yêu Tinh"],

    "DC_VU_KHI": ["DC Vũ Khí Hiện Đại", "DC Vũ Khí Cổ Đại", "DC Vũ Khí Giả"],
    "DC_HANG_NGAY": ["DC Nhà Bếp", "DC Thức Ăn", "DC Hàng Ngày", "DC Túi Sách", "DC Kính Mắt", "DC Trang Phục"],
    "DC_CHU_DE": ["DC Mừng Năm Mới", "DC Thể Thao", "DC Âm Nhạc", "DC Câu Cá", "DC Phương Tiện", "DC Cổ Đại"],

    "HU_DAC_BIET": ["HU Hệ Thống", "HU Tu Tiên"],
    "HU_THONG_THUONG": ["HU Thông Thường", "HU Cảm Xúc", "HU Toàn Màn Hình", "HU Tốc Độ Cao"],

    "DV_DONG_VAT": ["Bộ Động Vật"],
    "DV_QUAI_VAT": ["Bộ Quái Vật"],

    "BIEU_CAM": ["BC Chàng Trai", "BC Nữ", "BC Người Lớn Tuổi", "BC Khác"],
    "CU_CHI": ["cu chi"],

    "NHAN_VAT": ["Nhân Vật Đời Sống"],
    "KHUNG_CANH": ["Khung Cảnh Hiện Đại", "Khung Cảnh Ngoài Trời", "Khung Cảnh Cổ Đại"],
    "DAO_CU": ["Đạo Cụ Hệ Thống"],
    "DONG_VAT": ["Động Vật"],
    "PHAN_MEM": ["mien"],
    "THONG_BAO": ["mien"],
    
};
