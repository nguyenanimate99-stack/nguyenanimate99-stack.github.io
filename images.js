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

// Hàm tạo danh sách (Đã nâng cấp để nhận danh sách Link)
// Tham số thứ 4: danhSachLinkRieng là mảng chứa các link lấy từ cột Sheet
function taoDanhSachTuDong(soLuong, tenDau, duoiFile = ".webp", danhSachLinkRieng = []) {
    let list = [];
    for (let i = 1; i <= soLuong; i++) {
        // Lấy link từ mảng Sheet (nếu có). 
        // i bắt đầu từ 1, nhưng mảng bắt đầu từ 0 nên ta lấy [i-1]
        let link = "";
        if (danhSachLinkRieng && danhSachLinkRieng[i - 1]) {
            link = danhSachLinkRieng[i - 1];
        }

        list.push([
            i,                  // ID
            i.toString(),       // Tên hiển thị
            tenDau + i + duoiFile, // Tên file
            link                // Link Drive đã lấy được
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
        // Tách dòng
        const rows = dataText.split(/\r?\n/).map(row => row.split(','));
        const headers = rows[0]; // Hàng tiêu đề (NVHD, NVCX...)
        const linkMap = {};      // Object chứa link: { "NVHD": [...links], "NVCX": [...links] }

        // Khởi tạo mảng cho từng cột dựa theo tiêu đề
        headers.forEach(h => { if(h) linkMap[h.trim()] = []; });

        // Duyệt qua các dòng dữ liệu (từ dòng 2 trở đi)
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            row.forEach((cell, index) => {
                const headerName = headers[index] ? headers[index].trim() : null;
                // Chỉ lấy dữ liệu nếu cột đó có tên (Header)
                if (headerName) {
                    // Loại bỏ các ký tự thừa như ngoặc kép nếu có
                    let cleanLink = cell.trim().replace(/^"|"$/g, '');
                    linkMap[headerName].push(cleanLink);
                }
            });
        }

        // =========================================================
        // 4. KHU VỰC NHẬP DỮ LIỆU (SỬA Ở ĐÂY NHƯ BÌNH THƯỜNG)
        // =========================================================

        // --- MỤC 1: NHÂN VẬT HIỆN ĐẠI
        addBatch(
            "NV_HIEN_DAI",
            "NV Hiện Đại",
            "NHANVAT/NHANVATHIENDAI",
            // Truyền linkMap["NVHD"] vào hàm
            taoDanhSachTuDong(120, "NVHD", ".webp", linkMap["NVHD"]) 
        );

        // --- MỤC 2: NHÂN VẬT ĐÔ THỊ
        addBatch(
            "NV_HIEN_DAI",
            "NV Đô Thị",
            "NHANVAT/NHANVATDOTHI",
            // Truyền linkMap["NVDT"] vào hàm
            taoDanhSachTuDong(130, "NVDT", ".webp", linkMap["NVDT"]) 
        );

        // --- MỤC 3: NHÂN VẬT CỔ XƯA
        addBatch(
            "NV_CO_XUA",
            "Kiếm Hiệp",
            "NHANVAT/NVCX",
            // Truyền linkMap["NVCX"] vào hàm
            taoDanhSachTuDong(601, "NVCX", ".webp", linkMap["NVCX"]) 
        );

        console.log("Đã tải xong dữ liệu! Tổng số ảnh:", ALL_IMAGES.length);

        // 5. KÍCH HOẠT LẠI GIAO DIỆN (QUAN TRỌNG)
        // Vì dữ liệu tải chậm hơn code chạy, ta cần báo cho trang web vẽ lại
        // Cách 1: Nếu bạn có hàm render() bên script.js, hãy gọi nó ở đây.
        if (typeof renderGallery === "function") {
            renderGallery(); 
        } 
        // Cách 2: Bắn tín hiệu cho script.js biết
        window.dispatchEvent(new Event('DuLieuDaSanSang'));

    } catch (error) {
        console.error("Lỗi tải dữ liệu từ Google Sheet:", error);
    }
}

// Chạy hàm khởi tạo
khoiTaoDuLieu();
