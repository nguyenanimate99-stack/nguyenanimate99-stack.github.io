/* --- images.js --- */

// 1. CẤU HÌNH (Đã sửa lại đúng tên repo GitHub của bạn)
const CDN_BASE = "https://cdn.jsdelivr.net/gh/nguyenanimate99-stack/nguyenanimate99-stack.github.io/images/";
// Link CSV từ Google Sheet của bạn
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSbcaiaDqyptf1IYpiQL3xyp7jhpjbGdH4GRLco7uo-RAKErohJ4xi1Oftoc8qWcPpoZA0R49MKnB59/pub?gid=0&single=true&output=csv";

const ALL_IMAGES = []; // Mảng chứa dữ liệu cuối cùng

// =================================================================
// 2. CÁC HÀM HỖ TRỢ
// =================================================================

// Hàm thêm ảnh vào hệ thống
function addBatch(tab, tag, folderPath, listImages) {
    let currentPath = CDN_BASE + folderPath + "/";
    listImages.forEach(item => {
        ALL_IMAGES.push({
            id: item[0],
            title: item[1],
            tab: tab,
            tag: tag,
            // Đã bọc encodeURI để chống lỗi tên file có dấu/khoảng trắng
            img: encodeURI(currentPath + item[2]), 
            driveLink: item[3] || "", // Link drive lấy từ tham số thứ 4
            // Đã bọc encodeURI cho cả ảnh GIF
            gif: item[4] ? encodeURI(currentPath + item[4]) : "" 
        });
    });
}

// Hàm tạo danh sách (Đã nâng cấp: Thêm tham số coGif để tự tạo link ảnh .gif)
function taoDanhSachTuDong(soLuong, tenDau, duoiFile = ".webp", danhSachLinkRieng = [], coGif = false) {
    let list = [];
    for (let i = 1; i <= soLuong; i++) {
        // Lấy link từ mảng Sheet (nếu có và mảng không rỗng)
        let link = "";
        if (danhSachLinkRieng && danhSachLinkRieng.length > 0 && danhSachLinkRieng[i - 1]) {
            link = danhSachLinkRieng[i - 1];
        }

        // Tự động tạo tên file GIF nếu coGif = true
        let tenGif = coGif ? (tenDau + i + ".gif") : "";

        list.push([
            i,                  // ID
            i.toString(),       // Tên hiển thị
            tenDau + i + duoiFile, // Tên file tĩnh
            link,               // Link Drive
            tenGif              // Tên file GIF dùng cho hiệu ứng lia chuột
        ]);
    }
    return list;
}

// =================================================================
// 3. HÀM TẢI DỮ LIỆU TỪ SHEET VÀ KHỞI TẠO WEB
// =================================================================

async function khoiTaoDuLieu() {
    try {
        console.log("Đang tải link từ Google Sheet...");
        
        // 1. Tải CSV từ Google Sheet
        const response = await fetch(SHEET_URL);
        const dataText = await response.text();

        // 2. Phân tích CSV thành các cột dữ liệu
        const rows = dataText.split(/\r?\n/).map(row => row.split(','));
        const headers = rows[0]; // Hàng tiêu đề 
        const linkMap = {};      // Object chứa link

        // Khởi tạo mảng cho từng cột dựa theo tiêu đề
        if (headers) {
            headers.forEach(h => { if(h) linkMap[h.trim()] = []; });
        }

        // Duyệt qua các dòng dữ liệu (từ dòng 2 trở đi)
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            row.forEach((cell, index) => {
                const headerName = headers[index] ? headers[index].trim() : null;
                if (headerName) {
                    // Loại bỏ ngoặc kép nếu có
                    let cleanLink = cell.trim().replace(/^"|"$/g, '');
                    linkMap[headerName].push(cleanLink);
                }
            });
        }

        // =========================================================
        // 4. KHU VỰC NHẬP DỮ LIỆU (ĐÃ BỔ SUNG ĐẦY ĐỦ)
        // =========================================================
        // LƯU Ý: 
        // - Tham số 3: Là tên THƯ MỤC trên Github (Ví dụ: "KHUNGCANH/CAOOC")
        // - linkMap["TênCột"]: Phải trùng tên cột dòng 1 trong Google Sheet
        // =========================================================

        // --- MỤC 1: NHÂN VẬT ---
        addBatch("NV_HIEN_DAI", "NV Hiện Đại", "NHANVAT/Nhân Vật Hiện Đại", taoDanhSachTuDong(120, "Nhân Vật Hiện Đại ", ".webp", linkMap["Nhân Vật Hiện Đại"]));
        addBatch("NV_HIEN_DAI", "NV Thành Thị", "NHANVAT/Nhân Vật Thành Thị", taoDanhSachTuDong(130, "Nhân Vật Thành Thị ", ".webp", linkMap["Nhân Vật Thành Thị"]));
        addBatch("NV_HIEN_DAI", "NV 8090", "NHANVAT/Nhân Vật 8090", taoDanhSachTuDong(56, "Nhân Vật 8090 ", ".webp", linkMap["Nhân Vật 8090"]));
        addBatch("NV_HIEN_DAI", "NV Xã Hội Đen", "NHANVAT/Nhân Vật Xã Hội Đen", taoDanhSachTuDong(29, "Nhân Vật Xã Hội Đen ", ".webp", linkMap["Nhân Vật Xã Hội Đen"]));
        addBatch("NV_HIEN_DAI", "NV Trò Chơi", "NHANVAT/Nhân Vật Trò Chơi", taoDanhSachTuDong(15, "Nhân Vật Trò Chơi ", ".webp", linkMap["Nhân Vật Trò Chơi"]));
        addBatch("NV_HIEN_DAI", "NV Tương Lai", "NHANVAT/Nhân Vật Tương Lai", taoDanhSachTuDong(50, "Nhân Vật Tương Lai ", ".webp", linkMap["Nhân Vật Tương Lai"]));
        addBatch("NV_HIEN_DAI", "NV Đô Thị", "NHANVAT/Nhân Vật Đô Thị", taoDanhSachTuDong(191, "Nhân Vật Đô Thị ", ".webp", linkMap["Nhân Vật Đô Thị"]));
        addBatch("NV_HIEN_DAI", "NV Cổ Điển", "NHANVAT/Nhân Vật Cổ Điển", taoDanhSachTuDong(210, "Nhân Vật Cổ Điển ", ".webp", linkMap["Nhân Vật Cổ Điển"]));
        

        addBatch("NV_CO_XUA", "NV Cổ Xưa", "NHANVAT/Nhân Vật Cổ Xưa", taoDanhSachTuDong(601, "Nhân Vật Cổ Xưa ", ".webp", linkMap["Nhân Vật Cổ Xưa"]));
        addBatch("NV_CO_XUA", "NV Xưa Cổ Điển", "NHANVAT/Nhân Vật Xưa Cổ Điển", taoDanhSachTuDong(32, "Nhân Vật Xưa Cổ Điển ", ".webp", linkMap["Nhân Vật Xưa Cổ Điển"]));
        addBatch("NV_CO_XUA", "NV Tu Tiên", "NHANVAT/Nhân Vật Tu Tiên", taoDanhSachTuDong(74, "Nhân Vật Tu Tiên ", ".webp", linkMap["Nhân Vật Tu Tiên"]));
        addBatch("NV_CO_XUA", "NV Chủ Đề", "NHANVAT/Nhân Vật Chủ Đề", taoDanhSachTuDong(52, "Nhân Vật Chủ Đề ", ".webp", linkMap["Nhân Vật Chủ Đề"]));
        addBatch("NV_CO_XUA", "NV Ma Quỷ Kinh Dị", "NHANVAT/Ma Quỷ Kinh Dị", taoDanhSachTuDong(26, "Ma Quỷ Kinh Dị ", ".webp", linkMap["Ma Quỷ Kinh Dị"]));
        addBatch("NV_CO_XUA", "NV Kẻ Trộm Mộ", "NHANVAT/Nhân Vật Kẻ Trộm Mộ", taoDanhSachTuDong(10, "Nhân Vật Kẻ Trộm Mộ ", ".webp", linkMap["Nhân Vật Kẻ Trộm Mộ"]));
        addBatch("NV_CO_XUA", "NV Hà Nhân", "NHANVAT/Nhân Vật Hà Nhân", taoDanhSachTuDong(7, "Nhân Vật Hà Nhân ", ".webp", linkMap["Nhân Vật Hà Nhân"]));
        addBatch("NV_CO_XUA", "NV Cổ Xưa Tổng Hợp", "NHANVAT/Nhân Vật Cổ Xưa Tổng Hợp", taoDanhSachTuDong(90, "Nhân Vật Cổ Xưa Tổng Hợp ", ".webp", linkMap["Nhân Vật Cổ Xưa Tổng Hợp"]));

        // --- MỤC 2: KHUNG CẢNH---
        addBatch("KC_HIEN_DAI", "KC Thành Phố Hiện Đại", "KHUNGCANH/Khung Cảnh Thành Phố Hiện Đại", taoDanhSachTuDong(352, "Khung Cảnh Thành Phố Hiện Đại ", ".webp", linkMap["Khung Cảnh Thành Phố Hiện Đại"]));
        addBatch("KC_HIEN_DAI", "KC Mùa Đông", "KHUNGCANH/Khung Cảnh Mùa Đông", taoDanhSachTuDong(27, "Khung Cảnh Mùa Đông ", ".webp", linkMap["Khung Cảnh Mùa Đông"]));
        addBatch("KC_HIEN_DAI", "KC Chiến Trường", "KHUNGCANH/Khung Cảnh Chiến Trường", taoDanhSachTuDong(42, "Khung Cảnh Chiến Trường ", ".webp", linkMap["Khung Cảnh Chiến Trường"]));
        addBatch("KC_HIEN_DAI", "KC Lăng Mộ", "KHUNGCANH/Khung Cảnh Lăng Mộ", taoDanhSachTuDong(20, "Khung Cảnh Lăng Mộ ", ".webp", linkMap["Khung Cảnh Lăng Mộ"]));
        addBatch("KC_HIEN_DAI", "KC Thành Phố U Ám", "KHUNGCANH/Thành Phố U Ám", taoDanhSachTuDong(40, "Thành Phố U Ám ", ".webp", linkMap["Thành Phố U Ám"]));
        addBatch("KC_HIEN_DAI", "KC Thập Niên 8090", "KHUNGCANH/Khung Cảnh Thập Niên 8090", taoDanhSachTuDong(189, "Khung Cảnh Thập Niên 8090 ", ".webp", linkMap["Khung Cảnh Thập Niên 8090"]));
        addBatch("KC_HIEN_DAI", "KC Ngoài Trời & Bắt Hải Sản", "KHUNGCANH/Ngoài Trời & Bắt Hải Sản", taoDanhSachTuDong(97, "Ngoài Trời & Bắt Hải Sản ", ".webp", linkMap["Ngoài Trời & Bắt Hải Sản"]));
        addBatch("KC_HIEN_DAI", "KC Tổng Hợp", "KHUNGCANH/Khung Cảnh Tổng Hợp", taoDanhSachTuDong(212, "Khung Cảnh Tổng Hợp ", ".webp", linkMap["Khung Cảnh Tổng Hợp"]));

        addBatch("KC_CO_XUA", "KC Cổ Xưa", "KHUNGCANH/Khung Cảnh Cổ Xưa", taoDanhSachTuDong(307, "Khung Cảnh Cổ Xưa ", ".webp", linkMap["Khung Cảnh Cổ Xưa"]));
        
        // --- MỤC 3: MẪU CHUYỂN ĐỘNG (Mới thêm - Ví dụ dùng .gif) ---
        // Mục này ảnh gốc đã là .gif nên không cần thêm tham số "true"
        addBatch("MCD_HIEN_DAI", "MCD Hiện Đại", "MAUCHUYENDONG/Mẫu Chuyển Động Hiện Đại", taoDanhSachTuDong(148, "Mẫu Chuyển Động Hiện Đại ", ".gif", linkMap["Mẫu Chuyển Động Hiện Đại"]));
        addBatch("MCD_HIEN_DAI", "MCD Chiến Trường", "MAUCHUYENDONG/Mẫu Chuyển Động Chiến Trường", taoDanhSachTuDong(75, "Mẫu Chuyển Động Chiến Trường ", ".gif", linkMap["Mẫu Chuyển Động Chiến Trường"]));
        addBatch("MCD_HIEN_DAI", "MCD Xác Sống", "MAUCHUYENDONG/Mẫu Chuyển Động Xác Sống", taoDanhSachTuDong(38, "Mẫu Chuyển Động Xác Sống ", ".gif", linkMap["Mẫu Chuyển Động Xác Sống"]));

        addBatch("MCD_CO_XUA", "MCD Cổ Xưa", "MAUCHUYENDONG/Mẫu Chuyển Động Cổ Xưa", taoDanhSachTuDong(196, "Mẫu Chuyển Động Cổ Xưa ", ".gif", linkMap["Mẫu Chuyển Động Cổ Xưa"]));
        addBatch("MCD_CO_XUA", "MCD Động Vật", "MAUCHUYENDONG/Mẫu Chuyển Động Động Vật", taoDanhSachTuDong(53, "Mẫu Chuyển Động Động Vật ", ".gif", linkMap["Mẫu Chuyển Động Động Vật"]));
        addBatch("MCD_CO_XUA", "MCD Yêu Tinh", "MAUCHUYENDONG/Mẫu Chuyển Động Yêu Tinh", taoDanhSachTuDong(31, "Mẫu Chuyển Động Yêu Tinh ", ".gif", linkMap["Mẫu Chuyển Động Yêu Tinh"]));

        // --- MỤC 4: ĐẠO CỤ ---
        addBatch("DC_VU_KHI", "DC Vũ Khí Hiện Đại", "DAOCU/Đạo Cụ Vũ Khí Hiện Đại", taoDanhSachTuDong(89, "Đạo Cụ Vũ Khí Hiện Đại ", ".webp", linkMap["Đạo Cụ Vũ Khí Hiện Đại"]));
        addBatch("DC_VU_KHI", "DC Vũ Khí Cổ Đại", "DAOCU/Đạo Cụ Vũ Khí Cổ Đại", taoDanhSachTuDong(81, "Đạo Cụ Vũ Khí Cổ Đại ", ".webp", linkMap["Đạo Cụ Vũ Khí Cổ Đại"]));
        addBatch("DC_VU_KHI", "DC Vũ Khí Giả", "DAOCU/Đạo Cụ Vũ Khí Giả", taoDanhSachTuDong(25, "Đạo Cụ Vũ Khí Giả ", ".webp", linkMap["Đạo Cụ Vũ Khí Giả"]));

        addBatch("DC_HANG_NGAY", "DC Nhà Bếp", "DAOCU/Đạo Cụ Nhà Bếp", taoDanhSachTuDong(77, "Đạo Cụ Nhà Bếp ", ".webp", linkMap["Đạo Cụ Nhà Bếp"]));
        addBatch("DC_HANG_NGAY", "DC Thức Ăn", "DAOCU/Đạo Cụ Thức Ăn", taoDanhSachTuDong(50, "Đạo Cụ Thức Ăn ", ".webp", linkMap["Đạo Cụ Thức Ăn"]));
        addBatch("DC_HANG_NGAY", "DC Hàng Ngày", "DAOCU/Đạo Cụ Hằng Ngày", taoDanhSachTuDong(256, "Đạo Cụ Hằng Ngày ", ".webp", linkMap["Đạo Cụ Hằng Ngày"]));
        addBatch("DC_HANG_NGAY", "DC Túi Sách", "DAOCU/Đạo Cụ Túi Sách", taoDanhSachTuDong(18, "Đạo Cụ Túi Sách ", ".webp", linkMap["Đạo Cụ Túi Sách"]));
        addBatch("DC_HANG_NGAY", "DC Kính Mắt", "DAOCU/Kính Mắt", taoDanhSachTuDong(10, "Kính Mắt ", ".webp", linkMap["Kính Mắt"]));
        addBatch("DC_HANG_NGAY", "DC Trang Phục", "DAOCU/Đạo Cụ Trang Phục", taoDanhSachTuDong(17, "Đạo Cụ Trang Phục ", ".webp", linkMap["Đạo Cụ Trang Phục"]));
        
        addBatch("DC_CHU_DE", "DC Mừng Năm Mới", "DAOCU/Đạo Cụ Mừng Năm Mới", taoDanhSachTuDong(21, "Đạo Cụ Mừng Năm Mới ", ".webp", linkMap["Đạo Cụ Mừng Năm Mới"]));
        addBatch("DC_CHU_DE", "DC Thể Thao", "DAOCU/Đạo Cụ Thể Thao", taoDanhSachTuDong(28, "Đạo Cụ Thể Thao ", ".webp", linkMap["Đạo Cụ Thể Thao"]));
        addBatch("DC_CHU_DE", "DC Âm Nhạc", "DAOCU/Đạo Cụ Âm Nhạc", taoDanhSachTuDong(33, "Đạo Cụ Âm Nhạc ", ".webp", linkMap["Đạo Cụ Âm Nhạc"]));
        addBatch("DC_CHU_DE", "DC Câu Cá", "DAOCU/Đạo Cụ Câu Cá", taoDanhSachTuDong(10, "Đạo Cụ Câu Cá ", ".webp", linkMap["Đạo Cụ Câu Cá"]));
        addBatch("DC_CHU_DE", "DC Phương Tiện", "DAOCU/Phương Tiện - Xe", taoDanhSachTuDong(166, "Phương Tiện - Xe ", ".webp", linkMap["Phương Tiện - Xe"]));
        addBatch("DC_CHU_DE", "DC Cổ Đại", "DAOCU/Đạo Cụ Cổ Đại", taoDanhSachTuDong(174, "Đạo Cụ Cổ Đại ", ".webp", linkMap["Đạo Cụ Cổ Đại"]));

        // --- MỤC 5: HIỆU ỨNG (Mới thêm - Ví dụ dùng .gif) ---
        addBatch("HU_DAC_BIET", "HU Hệ Thống", "HIEUUNG/Hiệu Ứng Hệ Thống", taoDanhSachTuDong(11, "Hiệu Ứng Hệ Thống ", ".gif", linkMap["Hiệu Ứng Hệ Thống"]));
        addBatch("HU_DAC_BIET", "HU Tu Tiên", "HIEUUNG/Hiệu Ứng Tu Tiên", taoDanhSachTuDong(32, "Hiệu Ứng Tu Tiên ", ".gif", linkMap["Hiệu Ứng Tu Tiên"]));

        addBatch("HU_THONG_THUONG", "HU Thông Thường", "HIEUUNG/Hiệu Ứng Thông Thường", taoDanhSachTuDong(213, "Hiệu Ứng Thông Thường ", ".gif", linkMap["Hiệu Ứng Thông Thường"]));
        addBatch("HU_THONG_THUONG", "HU Cảm Xúc", "HIEUUNG/Hiệu Ứng Cảm Xúc", taoDanhSachTuDong(40, "Hiệu Ứng Cảm Xúc ", ".gif", linkMap["Hiệu Ứng Cảm Xúc"]));
        addBatch("HU_THONG_THUONG", "HU Toàn Màn Hình", "HIEUUNG/Hiệu Ứng Toàn Màn Hình", taoDanhSachTuDong(71, "Hiệu Ứng Toàn Màn Hình ", ".gif", linkMap["Hiệu Ứng Toàn Màn Hình"]));
        addBatch("HU_THONG_THUONG", "HU Tốc Độ Cao", "HIEUUNG/Hiệu Ứng Tốc Độ Cao", taoDanhSachTuDong(23, "Hiệu Ứng Tốc Độ Cao ", ".gif", linkMap["Hiệu Ứng Tốc Độ Cao"]));

        // --- MỤC 6: ĐỘNG VẬT (Mới thêm - Ví dụ dùng .gif) ---
        addBatch("DV_DONG_VAT", "Bộ Động Vật", "DONGVAT/Bộ Động Vật", taoDanhSachTuDong(60, "Bộ Động Vật ", ".webp", linkMap["Bộ Động Vật"]));
        addBatch("DV_QUAI_VAT", "Bộ Quái Vật", "DONGVAT/Bộ Quái Vật", taoDanhSachTuDong(112, "Bộ Quái Vật ", ".webp", linkMap["Bộ Quái Vật"]));

        // --- MỤC 7: BIỂU CẢM & CỬ CHỈ (Mới thêm - Ví dụ dùng .gif) ---
        addBatch("BIEU_CAM", "BC Chàng Trai", "BIEUCAM&CUCHI/Biểu Cảm Chàng Trai", taoDanhSachTuDong(16, "Biểu Cảm Chàng Trai ", ".gif", linkMap["Biểu Cảm Chàng Trai"]));
        addBatch("BIEU_CAM", "BC Nữ", "BIEUCAM&CUCHI/Biểu Cảm Nữ", taoDanhSachTuDong(11, "Biểu Cảm Nữ ", ".gif", linkMap["Biểu Cảm Nữ"]));
        addBatch("BIEU_CAM", "BC Người Lớn Tuổi", "BIEUCAM&CUCHI/Biểu Cảm Người Lớn Tuổi", taoDanhSachTuDong(4, "Biểu Cảm Người Lớn Tuổi ", ".gif", linkMap["Biểu Cảm Người Lớn Tuổi"]));
        addBatch("BIEU_CAM", "BC Khác", "BIEUCAM&CUCHI/Biểu Cảm Khác", taoDanhSachTuDong(5, "Biểu Cảm Khác ", ".gif", linkMap["Biểu Cảm Khác"]));

        // --- MỤC 8: VẬT LIỆU MIỄN PHÍ (Mới thêm - Ví dụ dùng .gif) ---
        addBatch("NHAN_VAT", "Nhân Vật Đời Sống", "VATLIEUMIENPHI/Nhân Vật Đời Sống", taoDanhSachTuDong(72, "Nhân Vật Đời Sống ", ".webp", linkMap["Nhân Vật Đời Sống"]));

        addBatch("KHUNG_CANH", "Khung Cảnh Hiện Đại", "VATLIEUMIENPHI/Khung Cảnh Hiện Đại", taoDanhSachTuDong(234, "Khung Cảnh Hiện Đại ", ".webp", linkMap["Khung Cảnh Hiện Đại"]));
        addBatch("KHUNG_CANH", "Khung Cảnh Ngoài Trời", "VATLIEUMIENPHI/Khung Cảnh Ngoài Trời", taoDanhSachTuDong(225, "Khung Cảnh Ngoài Trời ", ".webp", linkMap["Khung Cảnh Ngoài Trời"]));
        addBatch("KHUNG_CANH", "Khung Cảnh Cổ Đại", "VATLIEUMIENPHI/Khung Cảnh Cổ Đại", taoDanhSachTuDong(158, "Khung Cảnh Cổ Đại ", ".webp", linkMap["Khung Cảnh Cổ Đại"]));

        addBatch("DAO_CU", "Đạo Cụ Hệ Thống", "VATLIEUMIENPHI/Đạo Cụ Hệ Thống", taoDanhSachTuDong(116, "Đạo Cụ Hệ Thống ", ".webp", linkMap["Đạo Cụ Hệ Thống"]));

        addBatch("DONG_VAT", "Động Vật", "VATLIEUMIENPHI/Động Vật", taoDanhSachTuDong(24, "Động Vật ", ".gif", linkMap["Động Vật"]));

        console.log("Đã tải xong dữ liệu! Tổng số ảnh:", ALL_IMAGES.length);
        // 5. KÍCH HOẠT LẠI GIAO DIỆN
        // Gọi hàm appRun từ script.js để vẽ lại màn hình ngay sau khi tải xong
        if (typeof appRun === "function" && typeof CONFIG !== "undefined") {
            appRun(CONFIG.currentTab, CONFIG.currentTag, 1);
        } else if (typeof renderGallery === "function") {
            renderGallery();
        }

    } catch (error) {
        console.error("Lỗi tải dữ liệu từ Google Sheet:", error);
    }
}

// Chạy hàm khởi tạo
khoiTaoDuLieu();
