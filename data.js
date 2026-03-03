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
    "VAT_LIEU_MIEN_PHI": ["NHAN_VAT", "KHUNG_CANH", "DAO_CU", "DONG_VAT"],

};

// 2. Cấu hình chi tiết cho từng Tag
const TAG_INFO = {
    "DEFAULT": { title: "KHO <span>DỮ LIỆU</span>", link: "#" },

    // --- DỮ LIỆU (NHÂN VẬT) ---
    "NV Hiện Đại": { title: "Nhân Vật <span>Hiện Đại </span>", link: "https://drive.google.com/drive/folders/1hYBr09cBjGRn4F20L6T2-86FWj-kpa2U?usp=sharing" },
    "NV Thành Thị": { title: "Nhân Vật <span>Thành Thị</span>", link: "https://drive.google.com/drive/folders/1A8tg-fCKvj8EhGmnaQgzRozjwqEFdEG6?usp=sharing" },
    "NV Đa Góc Nhìn": { title: "Nhân Vật <span>Đa Góc Nhìn</span>", link: "" },
    "NV 8090": { title: "Nhân Vật <span>8090</span>", link: "https://drive.google.com/drive/folders/1-v5IeTF9K-51HrfczDfkOm1NNXH1UX9x?usp=drive_link" },
    "NV Xã Hội Đen": { title: "Nhân Vật <span>Xã Hội Đen</span>", link: "https://drive.google.com/drive/folders/1XSMoCThmOtJDCVzm2iZQVfoV5lNNcfX0?usp=drive_link" },
    "NV Trò Chơi": { title: "Nhân Vật <span>Trò Chơi</span>", link: "https://drive.google.com/drive/folders/1NXJKvcVpU7tZdKT1zj6JeDQHxGtKkFEg?usp=drive_link" },
    "NV Tương Lai": { title: "Nhân Vật <span>Tương Lai</span>", link: "https://drive.google.com/drive/folders/1H5aPiGVnGplfNriTg00CNyaBdqQTJRJ4?usp=drive_link" },
    "NV Đô Thị": { title: "Nhân Vật <span>Đô Thị</span>", link: "https://drive.google.com/drive/folders/1kVak88rGpYx1JFCeknpalLuA19VG4wpM?usp=drive_link" },
    "NV Cổ Điển": { title: "Nhân Vật <span>Cổ Điển</span>", link: "https://drive.google.com/drive/folders/1Tu_qn-vx1AVXKQ3Rxeo7hvNev2ojlDYq?usp=drive_link" },
    
    "NV Cổ Xưa": { title: "Nhân Vật <span>Cổ Xưa</span>", link: "https://drive.google.com/drive/folders/10ViSJlDF5_4Ldy02siL-BQXcqm-pqp3r?usp=drive_link" },
    "NV Xưa Cổ Điển": { title: "Nhân Vật <span>Xưa Cổ Điển</span>", link: "https://drive.google.com/drive/folders/11qxBEMIGuw-JY3VvdFU-GCg0ZEE6zwLd?usp=drive_link" },
    "NV Tu Tiên": { title: "Nhân Vật <span>Tu Tiên</span>", link: "https://drive.google.com/drive/folders/1UfG9fEEJWH4SE7CprCshyOZ2S7md25BX?usp=drive_link" },
    "NV Chủ Đề": { title: "Nhân Vật <span>Chủ Đề</span>", link: "https://drive.google.com/drive/folders/1_ZFbt2oRJm1NheBTIRkLnkDYQcUvmt38?usp=drive_link" },
    "NV Ma Quỷ Kinh Dị": { title: "Nhân Vật <span>Ma Quỷ Kinh Dị</span>", link: "https://drive.google.com/drive/folders/1r-m9jXyYeNZYhVMxm4b-kvNayb-aqwRZ?usp=drive_link" },
    "NV Kẻ Trộm Mộ": { title: "Nhân Vật <span>Kẻ Trộm Mộ</span>", link: "https://drive.google.com/drive/folders/1bGO583COLrcpjlOQ-Rf3P0QDo7ouW1aq?usp=drive_link" },
    "NV Hà Nhân": { title: "Nhân Vật <span>Hà Nhân</span>", link: "https://drive.google.com/drive/folders/1FXlQi0azLKWYshUCFYfori4rmf-6ObzV?usp=drive_link" },
    "NV Cổ Xưa Tổng Hợp": { title: "Nhân Vật <span>Cổ Xưa Tổng Hợp</span>", link: "https://drive.google.com/drive/folders/1vMnbwJVSBAvCXNU1UtP5SrW7GsYx3hDF?usp=drive_link" },

    // --- DỮ LIỆU (KHUNG CẢNH) ---
    "KC Thành Phố Hiện Đại": { title: "Khung Cảnh <span>Thành Phố Hiện Đại</span>", link: "https://drive.google.com/drive/folders/1TJXNcjd5n2l-uURfC4X6b7y52r-yUsh4?usp=drive_link" },
    "KC Mùa Đông": { title: "Khung Cảnh <span>Mùa Đông</span>", link: "https://drive.google.com/drive/folders/1kguQk1Bo8lsFtilgsrns22V2tbgbSsQx?usp=drive_link" },
    "KC Chiến Trường": { title: "Khung Cảnh <span>Chiến Trường</span>", link: "https://drive.google.com/drive/folders/1immxmwukAxC_lBLrfSpV_FKC96RG0rnU?usp=drive_link" },
    "KC Lăng Mộ": { title: "Khung Cảnh <span>Lăng Mộ</span>", link: "https://drive.google.com/drive/folders/1lZaOteh7t1mGUf33M_0xzwB8wIiQd367?usp=drive_link" },
    "KC Thành Phố U Ám": { title: "Khung Cảnh <span>Thành Phố U Ám</span>", link: "https://drive.google.com/drive/folders/1eoahahZY2bJrKYRFIjwKoRPpHn7KSq4L?usp=drive_link" },
    "KC Thập Niên 8090": { title: "Khung Cảnh <span>Thập Niên 8090</span>", link: "https://drive.google.com/drive/folders/1FJyTFJ1wR4PUAH34hSf37DpTN1eTKMvS?usp=drive_link" },
    "KC Ngoài Trời & Bắt Hải Sản": { title: "Khung Cảnh <span>Ngoài Trời & Bắt Hải Sản</span>", link: "https://drive.google.com/drive/folders/1y_EG3y4fVS9rIyY-6BgXkdfZpv84I2yp?usp=drive_link" },
    "KC Tổng Hợp": { title: "Khung Cảnh <span>Tổng Hợp</span>", link: "https://drive.google.com/drive/folders/1acI94pIPLZ4TD3fJ57T6KeSo_L2LRhu6?usp=drive_link" },

    "KC Cổ Xưa": { title: "Khung Cảnh <span>Cổ Xưa</span>", link: "https://drive.google.com/drive/folders/18Moh8BXqdujEB6BMeTCdDvAh_uU9EYRS?usp=drive_link" },

    // --- DỮ LIỆU (MẪU CHUYỂN ĐỘNG) ---
    "MCD Hiện Đại": { title: "Mẫu Chuyển Động <span>Hiện Đại</span>", link: "https://drive.google.com/drive/folders/1uBY2LsXp3VQaBqKCjk9buB4xrIki9jI0?usp=drive_link" },
    "MCD Chiến Trường": { title: "Mẫu Chuyển Động <span>Chiến Trường</span>", link: "https://drive.google.com/drive/folders/1PsscFyJDZ8zyjp0VwdfHNsvWQzQBW5j-?usp=drive_link" },
    "MCD Xác Sống": { title: "Mẫu Chuyển Động <span>Xác Sống</span>", link: "https://drive.google.com/drive/folders/1QsXEc-paUijsV-Xd71YXMHzpzxWpraKt?usp=drive_link" },

    "MCD Cổ Xưa": { title: "Mẫu Chuyển Động <span>Cổ Xưa</span>", link: "https://drive.google.com/drive/folders/1sLmiJ8yMtdIbaS5tb2Fss8z09-Q1QEl-?usp=drive_link" },
    "MCD Động Vật": { title: "Mẫu Chuyển Động <span>Động Vật</span>", link: "https://drive.google.com/drive/folders/1VLLSDh0qeH4_PoqKHBNeXhgSVs5KSwBq?usp=drive_link" },
    "MCD Yêu Tinh": { title: "Mẫu Chuyển Động <span>Yêu Tinh</span>", link: "https://drive.google.com/drive/folders/12OBJRrSQP5v0117ayVxV9jhUl6X-f0KD?usp=drive_link" },
    
    // --- DỮ LIỆU (ĐẠO CỤ) ---
    "DC Vũ Khí Hiện Đại": { title: "Đạo Cụ <span>Vũ Khí Hiện Đại</span>", link: "https://drive.google.com/drive/folders/1QnC77Uuo4TISBVSv4vxzZDl_A3qvKM7w?usp=drive_link" },
    "DC Vũ Khí Cổ Đại": { title: "Đạo Cụ <span>Vũ Khí Cổ Đại</span>", link: "https://drive.google.com/drive/folders/1gtMN7BVJnrr5wY1qKyw4fzRt4ed6CUQG?usp=drive_link" },
    "DC Vũ Khí Giả": { title: "Đạo Cụ <span>Vũ Khí Giả</span>", link: "https://drive.google.com/drive/folders/1JCG6DlrWQ4vHYS5QipeEICXUazeZfykm?usp=drive_link" },

    "DC Nhà Bếp": { title: "Đạo Cụ <span>Nhà Bếp</span>", link: "https://drive.google.com/drive/folders/16JtXXkvnkhY1uw8Ft3-O_HQd5bVD7hJO?usp=drive_link" },
    "DC Thức Ăn": { title: "Đạo Cụ <span>Thức Ăn</span>", link: "https://drive.google.com/drive/folders/1IMqWo1loLmLrrQFQG265LMP9x-Ohd1EL?usp=drive_link" },
    "DC Hàng Ngày": { title: "Đạo Cụ <span>Hàng Ngày</span>", link: "https://drive.google.com/drive/folders/1fjm7vtbHEHoMWmL77tZWXKGCdEKbbFJY?usp=drive_link" },
    "DC Túi Sách": { title: "Đạo Cụ <span>Túi Sách</span>", link: "https://drive.google.com/drive/folders/1sfTly30lJGmOXVdxiAsPPN7hCUosbAtX?usp=drive_link" },
    "DC Kính Mắt": { title: "Đạo Cụ <span>Kính Mắt</span>", link: "https://drive.google.com/drive/folders/1LUS8HgG9FSKmoyudSQq6xTkm5kzU30RK?usp=drive_link" },
    "DC Trang Phục": { title: "Đạo Cụ <span>Trang Phục</span>", link: "https://drive.google.com/drive/folders/1pNA0AqVnwMW7PbE-VmiVRyc4_JhkHlkG?usp=drive_link" },

    "DC Mừng Năm Mới": { title: "Đạo Cụ <span>Mừng Năm Mới</span>", link: "https://drive.google.com/drive/folders/181os4TaNmGmirqtwzp6LE46ShFUdUypb?usp=drive_link" },
    "DC Thể Thao": { title: "Đạo Cụ <span>Thể Thao</span>", link: "https://drive.google.com/drive/folders/1C3vmkCLScfh_PyWTK-T0jsZvWiK5itj1?usp=drive_link" },
    "DC Âm Nhạc": { title: "Đạo Cụ <span>Âm Nhạc</span>", link: "https://drive.google.com/drive/folders/1up9TifczXkvyvPTg_HU5zcvKIFaNowc3?usp=drive_link" },
    "DC Câu Cá": { title: "Đạo Cụ <span>Câu Cá</span>", link: "https://drive.google.com/drive/folders/1NndZ5LRgPWzZU5A0hoMg5wsQ1uJd5NPU?usp=drive_link" },
    "DC Phương Tiện": { title: "Đạo Cụ <span>Phương Tiện</span>", link: "https://drive.google.com/drive/folders/173I5ExG10HxLOF828DHwomdkZIwU8bTn?usp=drive_link" },
    "DC Cổ Đại": { title: "Đạo Cụ <span>Cổ Đại</span>", link: "https://drive.google.com/drive/folders/1DWRCy1mvscVGGstxKmqVw0iA-Ox3alFl?usp=drive_link" },

    // --- DỮ LIỆU (HIỆU ỨNG) ---
    "HU Hệ Thống": { title: "Hiệu Ứng <span>Hệ Thống</span>", link: "https://drive.google.com/drive/folders/1JQV1t4G0-gVpuA53IcyoD7BHMcAfQveo?usp=drive_link" },
    "HU Tu Tiên": { title: "Hiệu Ứng <span>Tu Tiên</span>", link: "https://drive.google.com/drive/folders/1nkX4_J4NRygK9WvaB8V1FI_8382xTSag?usp=drive_link" },

    "HU Thông Thường": { title: "Hiệu Ứng <span>Thông Thường</span>", link: "https://drive.google.com/drive/folders/1TSG1uyH8IzjiYkHDJdZE9lG7SJigvuSC?usp=drive_link" },
    "HU Cảm Xúc": { title: "Hiệu Ứng <span>Cảm Xúc</span>", link: "https://drive.google.com/drive/folders/1CBogT_aRntzO4o4aWyTqDuDmqxxofT9c?usp=drive_link" },
    "HU Toàn Màn Hình": { title: "Hiệu Ứng <span>Toàn Màn Hình</span>", link: "https://drive.google.com/drive/folders/1voOJbn8KeMGuQgX4QGFHzJz9nt7cf7Jm?usp=drive_link" },
    "HU Tốc Độ Cao": { title: "Hiệu Ứng <span>Tốc Độ Cao</span>", link: "https://drive.google.com/drive/folders/12oam4rE22fzS9yNLmHVFBq9IbQU6YH49?usp=drive_link" },
    

    
    // --- DỮ LIỆU (ĐỘNG VẬT) ---
    "Bộ Động Vật": { title: "Bộ <span>Động Vật</span>", link: "https://drive.google.com/drive/folders/1PNLXq2zTzPrWq61Ff6tHn6jBDIqnxnDd?usp=drive_link" },

    "Bộ Quái Vật": { title: "Bộ <span>Quái Vật</span>", link: "https://drive.google.com/drive/folders/1j6SPCH4Kv7Sw27Jrnh2C3YY5Umua9eoj?usp=drive_link" },

    // --- DỮ LIỆU (BIỂU CẢM & CỬ CHỈ) ---
    "BC Chàng Trai": { title: "Biểu Cảm <span>Chàng Trai</span>", link: "https://drive.google.com/drive/folders/1tUF6SSIVtnIqcx4p5Bi0ZI-Xmqf3pBVk?usp=drive_link" },
    "BC Nữ": { title: "Biểu Cảm <span>Nữ</span>", link: "https://drive.google.com/drive/folders/1NN8cu5JmREOt7sA7T2Vq4SnMhgF2tz-a?usp=drive_link" },
    "BC Người Lớn Tuổi": { title: "Biểu Cảm <span>Người Lớn Tuổi</span>", link: "https://drive.google.com/drive/folders/1hlvHAGylBrXhKkStkiz3rr6tNqjX_zIW?usp=drive_link" },
    "BC Khác": { title: "Biểu Cảm <span>Khác</span>", link: "https://drive.google.com/drive/folders/17eokW0gXP0rXJtVhdZMi-yy88DngmAVH?usp=drive_link" },

    // --- DỮ LIỆU (VẬT LIỆU MIỄN PHÍ) ---
    "Nhân Vật Đời Sống": { title: "NHÂN VẬT <span>Đời Sống</span>", link: "https://drive.google.com/drive/folders/10S5b8JduSq6XS3KmwryX7niNkyEdfIUH?usp=drive_link" },

    "Khung Cảnh Hiện Đại": { title: "Khung Cảnh <span>Hiện Đại</span>", link: "https://drive.google.com/drive/folders/1xN2uj33RQEvxSBKJ3G9p8meVQZKPoIzx?usp=drive_link" },
    "Khung Cảnh Ngoài Trời": { title: "Khung Cảnh <span>Ngoài Trời</span>", link: "https://drive.google.com/drive/folders/1N2hJGOWkgKjzsucNb5J9c2uRgse4U4un?usp=drive_link" },
    "Khung Cảnh Cổ Đại": { title: "Khung Cảnh <span>Cổ Đại</span>", link: "https://drive.google.com/drive/folders/10ymB9jq4YcGAZk0x5lIRVqauZ0BAG0US?usp=drive_link" },

    "Đạo Cụ Hệ Thống": { title: "Đạo Cụ <span>Hệ Thống</span>", link: "https://drive.google.com/drive/folders/1lqnSlZVoFarpVdwkynxhlO3LHhgyddCD?usp=drive_link" },

    "Động Vật": { title: "Động <span>Vật</span>", link: "" },

};

// 3. Danh sách Tag cho từng Tab
const TAG_LIST = {
    "NV_HIEN_DAI": ["NV Hiện Đại", "NV Thành Thị", "NV Đa Góc Nhìn", "NV 8090", "NV Xã Hội Đen", "NV Trò Chơi", "NV Tương Lai", "NV Đô Thị", "NV Cổ Điển"],
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
    
};
