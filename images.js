/* --- images.js --- */

// Khởi tạo danh sách rỗng
const ALL_IMAGES = [];

// --- HÀM HỖ TRỢ ĐÃ SỬA LỖI (Giờ đã đọc được file GIF) ---
function addBatch(tab, tag, listImages) {
    listImages.forEach(item => {
        ALL_IMAGES.push({
            id: item[0],              // Số thứ tự
            title: item[1],           // Tên hiển thị
            tab: tab,                 // Tab (VD: NV_HIEN_DAI)
            tag: tag,                 // Tag (VD: Bối Cảnh...)
            img: "images/" + item[2], // Ảnh tĩnh
            driveLink: item[3] || "", // Link Drive
            
            // --- DÒNG MỚI QUAN TRỌNG: Đọc file GIF từ tham số thứ 5 ---
            gif: item[4] ? "images/" + item[4] : "" 
        });
    });
}

// =================================================================
// KHU VỰC NHẬP DỮ LIỆU
// Cấu trúc: [ ID, "Tên", "Ảnh Tĩnh", "Link Tải", "Ảnh GIF (Tùy chọn)" ]
// =================================================================

// 1. NHÂN VẬT - HIỆN ĐẠI
addBatch("NV_HIEN_DAI", "Bối Cảnh Hiện Đại 2", [
    // Dòng này của bạn giờ sẽ hoạt động:
    [1, "Đường Phố Cyber", "cyber-01.jpg", "https://drive.google.com/file/d/1A2b3C.../view", "gif.gif"],
    
    // Dòng này không có GIF thì để trống tham số cuối
    [2, "Thành Phố Đêm",   "city-night.jpg", "https://drive.google.com/file/d/XYZ.../view"],
]);

addBatch("NV_HIEN_DAI", "Trong Thành Phố", [
    [10, "Ngã Tư Đường",  "street-01.jpg", "LINK_DRIVE_CUA_BAN"],
    [11, "Công Viên",     "park-01.jpg",   "LINK_DRIVE_CUA_BAN"],
]);


// 2. NHÂN VẬT - CỔ XƯA
addBatch("NV_CO_XUA", "Kiếm Hiệp", [
    [3, "Kiếm Khách",    "kiem-hiep-02.jpg", "https://drive.google.com/file/d/XYZ.../view"],
    [4, "Nữ Hiệp",       "nu-hiep-01.jpg",   "LINK_DRIVE_CUA_BAN"],
]);


// 3. KHUNG CẢNH - HIỆN ĐẠI
addBatch("KC_HIEN_DAI", "Cao Ốc", [
    [5, "Tòa Nhà Bitexco", "cyber-01.jpg", ""], 
    [6, "Landmark 81",     "lm81.jpg",     "LINK_DRIVE_CUA_BAN"],
]);

// 4. KHUNG CẢNH - CỔ XƯA
addBatch("KC_CO_XUA", "Đền Chùa", [
    [7, "Chùa Một Cột", "kiem-hiep-03.jpg", "LINK_DRIVE_CUA_BAN"],
]);