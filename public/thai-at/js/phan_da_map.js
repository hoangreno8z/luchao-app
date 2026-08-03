/**
 * Cửu Cung Phận Dã Map Component — Thái Ất Thần Số
 * Bản đồ mặc định hiển thị 9 Châu Phận Dã độc lập dưới sa bàn
 * Sử dụng bản đồ AI dựa trên bản đồ Trung Quốc & Việt Nam thực tế
 */

const PHAN_DA_MAP_DATA = [
    {
        cungNum: 1,
        cungName: "Càn",
        trigram: "☰",
        chauName: "Ký Châu",
        chauHan: "冀州",
        direction: "Tây Bắc",
        ancientInfo: "Thời xưa gọi là Cửa Việt, sau gọi Ký Châu, thời Chiến Quốc thuộc nước Triệu.",
        modernInfo: "Tương ứng với các vùng đất thuộc các tỉnh Hà Bắc, Sơn Tây và khu vực cục bộ của tỉnh Hà Nam, Sơn Đông.",
        color: "#9b59b6"
    },
    {
        cungNum: 2,
        cungName: "Ly",
        trigram: "☲",
        chauName: "Kinh Châu",
        chauHan: "荊州",
        direction: "Chính Nam",
        ancientInfo: "Thời Đế Minh phân định thuộc địa phận nước Sở. Người Bắc Phương khi xưa gọi đây là vùng đất Nam Man cường thịnh.",
        modernInfo: "Bao gồm tỉnh Hồ Nam, Hồ Bắc, khu vực tự trị dân tộc Tráng tỉnh Quảng Tây, phần lớn tỉnh Quý Châu và một phần nhỏ tỉnh Quảng Đông.",
        color: "#e74c3c"
    },
    {
        cungNum: 3,
        cungName: "Cấn",
        trigram: "☶",
        chauName: "Thanh Châu",
        chauHan: "青州",
        direction: "Đông Bắc",
        ancientInfo: "Thời xưa bao gồm các vùng đất thuộc Bắc Hải và Thanh Hải (Tân Cương) ứng với chòm sao Nguy, Hư.",
        modernInfo: "Gồm các khu vực cục bộ của tỉnh Hà Bắc và phần lớn của tỉnh Sơn Đông.",
        color: "#16a085"
    },
    {
        cungNum: 4,
        cungName: "Chấn",
        trigram: "☳",
        chauName: "Từ Châu",
        chauHan: "徐州",
        direction: "Chính Đông",
        ancientInfo: "Phía Đông giáp với biển lớn, ứng với chòm sao Cang, Đê. Đến thời Xuân Thu Chiến Quốc là phận dã của nước Tống.",
        modernInfo: "Bao gồm thành phố Thương Khâu (Hà Nam); thành phố Hà Trạch, Tế Ninh (Sơn Đông); thành phố Từ Châu, Túc Thiên (Giang Tô).",
        color: "#27ae60"
    },
    {
        cungNum: 5,
        cungName: "Trung Cung",
        trigram: "☯",
        chauName: "Dự Châu",
        chauHan: "豫州",
        direction: "Trung Tâm",
        ancientInfo: "Vùng đất nằm ở giữa 9 Châu, còn gọi là Dự Châu, Nhữ Nam, Hà Nam. Thời Tần gọi là Tam Xuyên.",
        modernInfo: "Gồm các phần đất thuộc các tỉnh: Hà Nam, An Huy, Giang Tô.",
        color: "#f1c40f"
    },
    {
        cungNum: 6,
        cungName: "Đoài",
        trigram: "☱",
        chauName: "Ung Châu",
        chauHan: "雍州",
        direction: "Chính Tây",
        ancientInfo: "Bao gồm vùng đất Vĩnh Hưng, Hà Tây, Vị Thủy, Mân Sơn. Thời nhà Tần đổi tên thành Ung Châu, làm cơ sở thống nhất 6 nước.",
        modernInfo: "Gồm các phần đất thuộc tỉnh Thiểm Tây và một phần của tỉnh Tứ Xuyên.",
        color: "#d35400"
    },
    {
        cungNum: 7,
        cungName: "Khôn",
        trigram: "☷",
        chauName: "Lương Châu",
        chauHan: "梁州",
        direction: "Tây Nam",
        ancientInfo: "Bao gồm các vùng đất Hoa Dương, Hắc Thủy. Thời nhà Hán đổi tên gọi là Hán Trung, Ích Châu.",
        modernInfo: "Thuộc địa phận phần lớn tỉnh Tứ Xuyên và thành phố Trùng Khánh.",
        color: "#e67e22"
    },
    {
        cungNum: 8,
        cungName: "Khảm",
        trigram: "☵",
        chauName: "Duyện Châu",
        chauHan: "兗州",
        direction: "Chính Bắc",
        ancientInfo: "Khu vực giữa Tề Thủy và Hoàng Hà, còn có tên gọi là Cứu Sơn, Thái Sơn (bắt nguồn từ tên Duyện Thủy).",
        modernInfo: "Tương ứng với các vùng đất thuộc thành phố Duyện Châu; thành phố Nghi Châu, Huyện Doanh thuộc tỉnh Sơn Đông và tỉnh Hà Nam, Giang Tô.",
        color: "#2980b9"
    },
    {
        cungNum: 9,
        cungName: "Tốn",
        trigram: "☴",
        chauName: "Dương Châu",
        chauHan: "揚州",
        direction: "Đông Nam",
        ancientInfo: "Thời cổ gọi là Hoang Phục. Sách Vũ Cống viết: 'Dương Châu là lãnh thổ của Bách Việt ở phía nam'. Bao gồm cả vùng Hồ Tôn (湖孫) ở phía Nam, thuộc phạm vi lãnh thổ nước Xích Quỷ thời Kinh Dương Vương.",
        modernInfo: "Bao gồm thành phố Thượng Hải, tỉnh Giang Tô, tỉnh Triết Giang, tỉnh Phúc Kiến, tỉnh Quảng Đông, và vùng Hồ Tôn (湖孫) — khu vực phía Nam lãnh thổ Bách Việt tại vùng Nam Hải.",
        color: "#2ecc71"
    }
];

function initPhanDaMap() {
    const gridContainer = document.getElementById("phan-da-grid-map");
    const cardsContainer = document.getElementById("phan-da-cards-list");
    if (!gridContainer || !cardsContainer) return;

    // Main AI Map Image
    let mapHtml = `
        <div class="pd-map-image-wrapper">
            <img src="images/cuu_chau_phan_da_map.jpg?v=4.9.0" 
                 alt="Bản Đồ Cửu Cung Phận Dã - 9 Châu Trung Quốc Cổ Đại" 
                 class="pd-map-image"
                 loading="lazy" />
            <p class="pd-map-caption">Bản đồ phân vùng 9 Châu Cửu Cung Phận Dã trên nền bản đồ Trung Quốc & Việt Nam — Phục vụ nghiên cứu học thuật Thái Ất Thần Số</p>
        </div>
    `;

    // Legend Table
    mapHtml += `<div class="pd-legend-table">`;
    // Sort by cungNum for legend
    const sorted = [...PHAN_DA_MAP_DATA].sort((a, b) => a.cungNum - b.cungNum);
    sorted.forEach(item => {
        mapHtml += `
            <div class="pd-legend-item" onclick="highlightPhanDaCard(${item.cungNum})">
                <span class="pd-legend-color" style="background: ${item.color}"></span>
                <span class="pd-legend-label">
                    <strong>Cung ${item.cungNum} ${item.cungName}</strong> ${item.trigram} — ${item.chauName} (${item.chauHan}) · ${item.direction}
                </span>
            </div>
        `;
    });
    mapHtml += `</div>`;

    gridContainer.innerHTML = mapHtml;

    // Detail Cards
    let cardsHtml = "";
    sorted.forEach(item => {
        cardsHtml += `
            <div class="pd-card glass" id="pd-card-${item.cungNum}" style="border-left: 4px solid ${item.color}">
                <div class="pd-card-header">
                    <h4 style="color: ${item.color}">${item.trigram} Cung ${item.cungNum} ${item.cungName} — ${item.chauName} (${item.chauHan})</h4>
                    <span class="pd-card-badge">${item.direction}</span>
                </div>
                <div class="pd-card-body">
                    <p><strong>🏛️ Lịch Sử & Tên Cổ:</strong> ${item.ancientInfo}</p>
                    <p><strong>📍 Địa Lý Ngày Nay:</strong> ${item.modernInfo}</p>
                </div>
            </div>
        `;
    });

    cardsContainer.innerHTML = cardsHtml;
}

function highlightPhanDaCard(cungNum) {
    document.querySelectorAll(".pd-legend-item").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".pd-card").forEach(c => c.classList.remove("active-highlight"));

    const selectedCard = document.getElementById(`pd-card-${cungNum}`);

    if (selectedCard) {
        selectedCard.classList.add("active-highlight");
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

document.addEventListener("DOMContentLoaded", initPhanDaMap);
