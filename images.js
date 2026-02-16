/* --- images.js --- */

// 1. CẤU HÌNH
const CDN_BASE = "https://cdn.jsdelivr.net/gh/nguyenanimate99-stack/nguyen-animate/images/";
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
            img: currentPath + item[2],
            driveLink: item[3] || "", // Link drive lấy từ tham số thứ 4
            gif: item[4] ? currentPath + item[4] : ""
        });
    });
}

// Hàm tạo danh sách (Đã nâng cấp: Kiểm tra an toàn để tránh lỗi web)
function taoDanhSachTuDong(soLuong, tenDau, duoiFile = ".webp", danhSachLinkRieng = []) {
    let list = [];
    for (let i = 1; i <= soLuong; i++) {
        // Lấy link từ mảng Sheet (nếu có và mảng không rỗng)
        let link = "";
        if (danhSachLinkRieng && danhSachLinkRieng.length > 0 && danhSachLinkRieng[i - 1]) {
            link = danhSachLinkRieng[i - 1];
        }

        list.push([
            i,                  // ID
            i.toString(),       // Tên hiển thị
            tenDau + i + duoiFile, // Tên file
            link                // Link Drive
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
        addBatch("NV_HIEN_DAI", "NV Hiện Đại", "NHANVAT/NHANVATHIENDAI", taoDanhSachTuDong(120, "NVHD", ".webp", linkMap["NVHD"]));
        addBatch("NV_HIEN_DAI", "NV Đô Thị", "NHANVAT/NHANVATDOTHI", taoDanhSachTuDong(130, "NVDT", ".webp", linkMap["NVDT"]));

        addBatch("NV_CO_XUA", "Kiếm Hiệp", "NHANVAT/NVCX", taoDanhSachTuDong(601, "NVCX", ".webp", linkMap["NVCX"]));

        // --- MỤC 2: KHUNG CẢNH (Mới thêm) ---

        // --- MỤC 3: MẪU CHUYỂN ĐỘNG (Mới thêm - Ví dụ dùng .gif) ---
        addBatch("MCD_HIEN_DAI", "Súng Ống", "MAUCHUYENDONG/MCDHD", taoDanhSachTuDong(148, "MCDHD", ".gif", linkMap["MCDHD"]));


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

