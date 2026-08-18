// Generated compiled knowledge file - DO NOT EDIT MANUALLY
export const COMPILED_KNOWLEDGE = {
  "ontology": {
    "deities": {
      "Phụ Mẫu": {
        "symbols": [
          "Support",
          "Document",
          "Protection",
          "Education",
          "Vehicle",
          "House",
          "Authority_Figure"
        ],
        "vietnamese": "Cha mẹ, trưởng bối, giấy tờ, nhà cửa, hợp đồng, đơn vị công tác"
      },
      "Quan Quỷ": {
        "symbols": [
          "Career",
          "Rank",
          "Power",
          "Pressure",
          "Illness",
          "Danger",
          "Competitor",
          "Worry"
        ],
        "vietnamese": "Công danh, sự nghiệp, chức vụ, chồng/bạn trai (nữ hỏi), bệnh tật, lo âu, tai họa"
      },
      "Huynh Đệ": {
        "symbols": [
          "Competition",
          "Sibling",
          "Friend",
          "Peer",
          "Expense",
          "Obstacle",
          "Dispute"
        ],
        "vietnamese": "Anh chị em, bạn bè, đối thủ cạnh tranh, hao tài, cản trở, chia rẽ"
      },
      "Thê Tài": {
        "symbols": [
          "Money",
          "Asset",
          "Relationship_Female",
          "Subordinate",
          "Resource"
        ],
        "vietnamese": "Tiền tài, tài sản, lợi nhuận, vợ/bạn gái (nam hỏi), thuộc hạ, tài nguyên"
      },
      "Tử Tôn": {
        "symbols": [
          "Relaxation",
          "Child",
          "Medicine",
          "Cure",
          "Safety",
          "Happiness",
          "Anti_Ghost"
        ],
        "vietnamese": "Con cái, học trò, thú cưng, thuốc men, cát tường, giải lo lắng, khắc chế tai họa"
      }
    },
    "beasts": {
      "Thanh Long": {
        "symbols": [
          "Noble",
          "Fortune",
          "Joy",
          "Premium",
          "Mariage"
        ],
        "vietnamese": "Hỉ khánh, tài lộc vượng cát, cao quý, chuyện vui mừng, hôn nhân"
      },
      "Chu Tước": {
        "symbols": [
          "Message",
          "Speech",
          "Dispute",
          "Document",
          "Rumor"
        ],
        "vietnamese": "Tin tức, văn thư, tranh chấp khẩu thiệt, cãi vã, tin đồn"
      },
      "Câu Trần": {
        "symbols": [
          "Stagnation",
          "Land",
          "Delay",
          "Old",
          "Arrest"
        ],
        "vietnamese": "Trì trệ, đất đai thổ sản, chậm trễ, chuyện cũ, giam giữ"
      },
      "Đằng Xà": {
        "symbols": [
          "Anxiety",
          "Mystery",
          "Fear",
          "Strange",
          "Dream"
        ],
        "vietnamese": "Lo lắng mơ hồ, kỳ quái, giấc mơ, ám ảnh kinh sợ, không rõ ràng"
      },
      "Bạch Hổ": {
        "symbols": [
          "Accident",
          "Blood",
          "Power",
          "Surgery",
          "Funeral"
        ],
        "vietnamese": "Tai nạn, huyết quang, phẫu thuật, bệnh nặng, tang tóc, quyền uy, nóng nảy"
      },
      "Huyền Vũ": {
        "symbols": [
          "Secret",
          "Theft",
          "Lust",
          "Plan_Dark",
          "Lie"
        ],
        "vietnamese": "Âm thầm, trộm cắp, lừa dối, âm mưu, tư thông tình ái ẩn giấu"
      }
    }
  },
  "rules": [
    {
      "name": "Nguyệt_Phá",
      "condition": "Deity.IsNguyetPha == true",
      "effect": {
        "power": -80,
        "risk": 50,
        "tags": [
          "Deity.Broken",
          "Deity.Severely_Weak"
        ]
      },
      "explain": "Hào bị Nguyệt lệnh tương xung gọi là Nguyệt phá, lực lượng suy bại cao tầng."
    },
    {
      "name": "Tuần_Không",
      "condition": "Deity.IsTK == true",
      "effect": {
        "power": -30,
        "stability": -20,
        "tags": [
          "Deity.Empty",
          "Deity.Pending"
        ]
      },
      "explain": "Hào lâm Tuần Không đại biểu sự việc chưa rõ ràng, chưa phát sinh hoặc gặp cản trở ngắn hạn."
    },
    {
      "name": "Ám_Động",
      "condition": "Deity.IsMoving == false && Deity.IsXungDay == true && Deity.IsVuongInMonth == true",
      "effect": {
        "power": 40,
        "timing": 80,
        "opportunity": 50,
        "tags": [
          "Deity.AmDong",
          "Deity.Fast_Trigger"
        ]
      },
      "explain": "Hào tĩnh vượng tướng gặp Nhật xung là Ám động, chủ sự việc phát sinh rất nhanh ngoài dự kiến."
    },
    {
      "name": "Nhật_Phá",
      "condition": "Deity.IsMoving == false && Deity.IsXungDay == true && Deity.IsVuongInMonth == false",
      "effect": {
        "power": -60,
        "risk": 40,
        "tags": [
          "Deity.NhatPha",
          "Deity.DongTan"
        ]
      },
      "explain": "Hào tĩnh suy yếu bị Nhật xung là Nhật phá hoặc Động tán, hào bị phá vỡ không thể sinh khắc."
    },
    {
      "name": "Hồi_Đầu_Khắc",
      "condition": "Deity.IsMoving == true && Deity.IsHoiDauKhac == true",
      "effect": {
        "power": -90,
        "risk": 80,
        "tags": [
          "Deity.HoiDauKhac",
          "Deity.Damaged"
        ]
      },
      "explain": "Hào động bị hào biến hồi đầu tương khắc, hào động hóa suy bại hoàn toàn, vô dụng."
    },
    {
      "name": "Hóa_Tiến_Thần",
      "condition": "Deity.IsMoving == true && Deity.TienThoai == 'tiến'",
      "effect": {
        "power": 50,
        "stability": 40,
        "tags": [
          "Deity.TienThan",
          "Deity.Growing"
        ]
      },
      "explain": "Hào động hóa tiến thần (như Dần hóa Mão, Tị hóa Ngọ), thế lực ngày càng vượng mạnh mẽ."
    },
    {
      "name": "Hóa_Thoái_Thần",
      "condition": "Deity.IsMoving == true && Deity.TienThoai == 'thoái'",
      "effect": {
        "power": -50,
        "stability": -40,
        "tags": [
          "Deity.ThoaiThan",
          "Deity.Fading"
        ]
      },
      "explain": "Hào động hóa thoái thần (như Mão hóa Dần, Ngọ hóa Tị), thế lực ngày càng suy giảm, lùi bước."
    },
    {
      "name": "Thế_Động_Hóa_Quỷ",
      "condition": "Deity.IsShi == true && Deity.IsMoving == true && Deity.ChangedRelation == 'Quan Quỷ'",
      "effect": {
        "risk": 70,
        "threat": 60,
        "tags": [
          "Shi.HaoQuy",
          "Shi.Danger"
        ]
      },
      "explain": "Hào Thế phát động hóa ra Quan Quỷ, điềm báo tự thân hành động chiêu mời lo âu, tai họa."
    }
  ],
  "hexagrams": [
    {
      "id": 0,
      "name": "Bát Thuần Khôn",
      "palace": "Khôn",
      "vietnamese_meaning": "Bát Thuần Khôn",
      "overall_meaning": "Thuần Khôn: Tượng trưng cho Đất, sự nhu thuận, bao dung, tĩnh lặng để sinh trưởng tốt.",
      "career_meaning": "Thuần Khôn: Tượng trưng cho Đất, sự nhu thuận, bao dung, tĩnh lặng để sinh trưởng tốt.",
      "love_meaning": "Thuần Khôn: Tượng trưng cho Đất, sự nhu thuận, bao dung, tĩnh lặng để sinh trưởng tốt.",
      "wealth_meaning": "Thuần Khôn: Tượng trưng cho Đất, sự nhu thuận, bao dung, tĩnh lặng để sinh trưởng tốt.",
      "health_meaning": "Thuần Khôn: Tượng trưng cho Đất, sự nhu thuận, bao dung, tĩnh lặng để sinh trưởng tốt."
    },
    {
      "id": 1,
      "name": "Địa Sơn Khiêm",
      "palace": "Chưa rõ",
      "vietnamese_meaning": "Địa Sơn Khiêm",
      "overall_meaning": "Khiêm nhường, đức cao đạo trọng, mưu sự được người nâng đỡ thành công.",
      "career_meaning": "Khiêm nhường, đức cao đạo trọng, mưu sự được người nâng đỡ thành công.",
      "love_meaning": "Khiêm nhường, đức cao đạo trọng, mưu sự được người nâng đỡ thành công.",
      "wealth_meaning": "Khiêm nhường, đức cao đạo trọng, mưu sự được người nâng đỡ thành công.",
      "health_meaning": "Khiêm nhường, đức cao đạo trọng, mưu sự được người nâng đỡ thành công."
    },
    {
      "id": 2,
      "name": "Địa Thủy Sư",
      "palace": "Khảm",
      "vietnamese_meaning": "Địa Thủy Sư",
      "overall_meaning": "Ra quân, tập hợp lực lượng, cần kỷ luật sắt và tướng lĩnh tài ba.",
      "career_meaning": "Ra quân, tập hợp lực lượng, cần kỷ luật sắt và tướng lĩnh tài ba.",
      "love_meaning": "Ra quân, tập hợp lực lượng, cần kỷ luật sắt và tướng lĩnh tài ba.",
      "wealth_meaning": "Ra quân, tập hợp lực lượng, cần kỷ luật sắt và tướng lĩnh tài ba.",
      "health_meaning": "Ra quân, tập hợp lực lượng, cần kỷ luật sắt và tướng lĩnh tài ba."
    },
    {
      "id": 3,
      "name": "Địa Phong Thăng",
      "palace": "Chấn",
      "vietnamese_meaning": "Địa Phong Thăng",
      "overall_meaning": "Bay cao, thăng tiến thuận lợi như cây lớn vươn cành đón nắng.",
      "career_meaning": "Bay cao, thăng tiến thuận lợi như cây lớn vươn cành đón nắng.",
      "love_meaning": "Bay cao, thăng tiến thuận lợi như cây lớn vươn cành đón nắng.",
      "wealth_meaning": "Bay cao, thăng tiến thuận lợi như cây lớn vươn cành đón nắng.",
      "health_meaning": "Bay cao, thăng tiến thuận lợi như cây lớn vươn cành đón nắng."
    },
    {
      "id": 4,
      "name": "Địa Lôi Phục",
      "palace": "Khôn",
      "vietnamese_meaning": "Địa Lôi Phục",
      "overall_meaning": "Khôi phục, quay trở lại đường chính, thời cơ chớm nở phát triển.",
      "career_meaning": "Khôi phục, quay trở lại đường chính, thời cơ chớm nở phát triển.",
      "love_meaning": "Khôi phục, quay trở lại đường chính, thời cơ chớm nở phát triển.",
      "wealth_meaning": "Khôi phục, quay trở lại đường chính, thời cơ chớm nở phát triển.",
      "health_meaning": "Khôi phục, quay trở lại đường chính, thời cơ chớm nở phát triển."
    },
    {
      "id": 5,
      "name": "Địa Hỏa Minh Di",
      "palace": "Chưa rõ",
      "vietnamese_meaning": "Địa Hỏa Minh Di",
      "overall_meaning": "Ánh sáng bị tổn hại, gặp hoàn cảnh tối tăm cần giấu kín tài năng.",
      "career_meaning": "Ánh sáng bị tổn hại, gặp hoàn cảnh tối tăm cần giấu kín tài năng.",
      "love_meaning": "Ánh sáng bị tổn hại, gặp hoàn cảnh tối tăm cần giấu kín tài năng.",
      "wealth_meaning": "Ánh sáng bị tổn hại, gặp hoàn cảnh tối tăm cần giấu kín tài năng.",
      "health_meaning": "Ánh sáng bị tổn hại, gặp hoàn cảnh tối tăm cần giấu kín tài năng."
    },
    {
      "id": 6,
      "name": "Địa Trạch Lâm",
      "palace": "Khôn",
      "vietnamese_meaning": "Địa Trạch Lâm",
      "overall_meaning": "Đến gần, giám sát thúc đẩy, cơ hội lớn đang cận kề hành động.",
      "career_meaning": "Đến gần, giám sát thúc đẩy, cơ hội lớn đang cận kề hành động.",
      "love_meaning": "Đến gần, giám sát thúc đẩy, cơ hội lớn đang cận kề hành động.",
      "wealth_meaning": "Đến gần, giám sát thúc đẩy, cơ hội lớn đang cận kề hành động.",
      "health_meaning": "Đến gần, giám sát thúc đẩy, cơ hội lớn đang cận kề hành động."
    },
    {
      "id": 7,
      "name": "Địa Thiên Thái",
      "palace": "Khôn",
      "vietnamese_meaning": "Địa Thiên Thái",
      "overall_meaning": "Thái bình, giao hòa tốt đẹp, trong ngoài thuận lợi, hanh thông cát tường.",
      "career_meaning": "Thái bình, giao hòa tốt đẹp, trong ngoài thuận lợi, hanh thông cát tường.",
      "love_meaning": "Thái bình, giao hòa tốt đẹp, trong ngoài thuận lợi, hanh thông cát tường.",
      "wealth_meaning": "Thái bình, giao hòa tốt đẹp, trong ngoài thuận lợi, hanh thông cát tường.",
      "health_meaning": "Thái bình, giao hòa tốt đẹp, trong ngoài thuận lợi, hanh thông cát tường."
    },
    {
      "id": 8,
      "name": "Sơn Địa Bác",
      "palace": "Càn",
      "vietnamese_meaning": "Sơn Địa Bác",
      "overall_meaning": "Bóc lột, hao mòn, tiểu nhân lấn át quân tử, nên tĩnh lặng tự thủ.",
      "career_meaning": "Bóc lột, hao mòn, tiểu nhân lấn át quân tử, nên tĩnh lặng tự thủ.",
      "love_meaning": "Bóc lột, hao mòn, tiểu nhân lấn át quân tử, nên tĩnh lặng tự thủ.",
      "wealth_meaning": "Bóc lột, hao mòn, tiểu nhân lấn át quân tử, nên tĩnh lặng tự thủ.",
      "health_meaning": "Bóc lột, hao mòn, tiểu nhân lấn át quân tử, nên tĩnh lặng tự thủ."
    },
    {
      "id": 9,
      "name": "Bát Thuần Cấn",
      "palace": "Cấn",
      "vietnamese_meaning": "Bát Thuần Cấn",
      "overall_meaning": "Giữ im lặng, định tĩnh đúng lúc đúng chỗ, dừng lại bảo toàn lực lượng.",
      "career_meaning": "Giữ im lặng, định tĩnh đúng lúc đúng chỗ, dừng lại bảo toàn lực lượng.",
      "love_meaning": "Giữ im lặng, định tĩnh đúng lúc đúng chỗ, dừng lại bảo toàn lực lượng.",
      "wealth_meaning": "Giữ im lặng, định tĩnh đúng lúc đúng chỗ, dừng lại bảo toàn lực lượng.",
      "health_meaning": "Giữ im lặng, định tĩnh đúng lúc đúng chỗ, dừng lại bảo toàn lực lượng."
    },
    {
      "id": 10,
      "name": "Sơn Thủy Mông",
      "palace": "Đoài",
      "vietnamese_meaning": "Sơn Thủy Mông",
      "overall_meaning": "Mờ mịt, trẻ thơ chưa được giáo dục, cần người hiền chỉ bảo dẫn lối.",
      "career_meaning": "Mờ mịt, trẻ thơ chưa được giáo dục, cần người hiền chỉ bảo dẫn lối.",
      "love_meaning": "Mờ mịt, trẻ thơ chưa được giáo dục, cần người hiền chỉ bảo dẫn lối.",
      "wealth_meaning": "Mờ mịt, trẻ thơ chưa được giáo dục, cần người hiền chỉ bảo dẫn lối.",
      "health_meaning": "Mờ mịt, trẻ thơ chưa được giáo dục, cần người hiền chỉ bảo dẫn lối."
    },
    {
      "id": 11,
      "name": "Sơn Phong Cổ",
      "palace": "Tốn",
      "vietnamese_meaning": "Sơn Phong Cổ",
      "overall_meaning": "Đổ nát, sửa chữa việc cũ, cải cách canh tân để khôi phục sức sống.",
      "career_meaning": "Đổ nát, sửa chữa việc cũ, cải cách canh tân để khôi phục sức sống.",
      "love_meaning": "Đổ nát, sửa chữa việc cũ, cải cách canh tân để khôi phục sức sống.",
      "wealth_meaning": "Đổ nát, sửa chữa việc cũ, cải cách canh tân để khôi phục sức sống.",
      "health_meaning": "Đổ nát, sửa chữa việc cũ, cải cách canh tân để khôi phục sức sống."
    },
    {
      "id": 12,
      "name": "Sơn Lôi Di",
      "palace": "Tốn",
      "vietnamese_meaning": "Sơn Lôi Di",
      "overall_meaning": "Nuôi dưỡng, chăm sóc thể xác lẫn tinh thần, giữ lời nói ăn uống đúng mực.",
      "career_meaning": "Nuôi dưỡng, chăm sóc thể xác lẫn tinh thần, giữ lời nói ăn uống đúng mực.",
      "love_meaning": "Nuôi dưỡng, chăm sóc thể xác lẫn tinh thần, giữ lời nói ăn uống đúng mực.",
      "wealth_meaning": "Nuôi dưỡng, chăm sóc thể xác lẫn tinh thần, giữ lời nói ăn uống đúng mực.",
      "health_meaning": "Nuôi dưỡng, chăm sóc thể xác lẫn tinh thần, giữ lời nói ăn uống đúng mực."
    },
    {
      "id": 13,
      "name": "Sơn Hỏa Bí",
      "palace": "Cấn",
      "vietnamese_meaning": "Sơn Hỏa Bí",
      "overall_meaning": "Trang sức, làm đẹp bề ngoài, cần chú trọng thực chất bên trong.",
      "career_meaning": "Trang sức, làm đẹp bề ngoài, cần chú trọng thực chất bên trong.",
      "love_meaning": "Trang sức, làm đẹp bề ngoài, cần chú trọng thực chất bên trong.",
      "wealth_meaning": "Trang sức, làm đẹp bề ngoài, cần chú trọng thực chất bên trong.",
      "health_meaning": "Trang sức, làm đẹp bề ngoài, cần chú trọng thực chất bên trong."
    },
    {
      "id": 14,
      "name": "Sơn Trạch Tổn",
      "palace": "Cấn",
      "vietnamese_meaning": "Sơn Trạch Tổn",
      "overall_meaning": "Hao tổn trước mắt để được lợi ích lâu dài, cần giữ lòng thành thực.",
      "career_meaning": "Hao tổn trước mắt để được lợi ích lâu dài, cần giữ lòng thành thực.",
      "love_meaning": "Hao tổn trước mắt để được lợi ích lâu dài, cần giữ lòng thành thực.",
      "wealth_meaning": "Hao tổn trước mắt để được lợi ích lâu dài, cần giữ lòng thành thực.",
      "health_meaning": "Hao tổn trước mắt để được lợi ích lâu dài, cần giữ lòng thành thực."
    },
    {
      "id": 15,
      "name": "Sơn Thiên Đại Súc",
      "palace": "Cấn",
      "vietnamese_meaning": "Sơn Thiên Đại Súc",
      "overall_meaning": "Tích lũy lớn, chứa đầy tài đức, chờ thời cơ cống hiến cho đời.",
      "career_meaning": "Tích lũy lớn, chứa đầy tài đức, chờ thời cơ cống hiến cho đời.",
      "love_meaning": "Tích lũy lớn, chứa đầy tài đức, chờ thời cơ cống hiến cho đời.",
      "wealth_meaning": "Tích lũy lớn, chứa đầy tài đức, chờ thời cơ cống hiến cho đời.",
      "health_meaning": "Tích lũy lớn, chứa đầy tài đức, chờ thời cơ cống hiến cho đời."
    },
    {
      "id": 16,
      "name": "Thủy Địa Tỷ",
      "palace": "Ly",
      "vietnamese_meaning": "Thủy Địa Tỷ",
      "overall_meaning": "Gắn kết, tương trợ thân mật, đoàn kết quần chúng để mưu sự lớn.",
      "career_meaning": "Gắn kết, tương trợ thân mật, đoàn kết quần chúng để mưu sự lớn.",
      "love_meaning": "Gắn kết, tương trợ thân mật, đoàn kết quần chúng để mưu sự lớn.",
      "wealth_meaning": "Gắn kết, tương trợ thân mật, đoàn kết quần chúng để mưu sự lớn.",
      "health_meaning": "Gắn kết, tương trợ thân mật, đoàn kết quần chúng để mưu sự lớn."
    },
    {
      "id": 17,
      "name": "Thủy Sơn Kiển",
      "palace": "Đoài",
      "vietnamese_meaning": "Thủy Sơn Kiển",
      "overall_meaning": "Gian nan trước mắt, đi đường hiểm trở, nên quay đầu tìm người giúp.",
      "career_meaning": "Gian nan trước mắt, đi đường hiểm trở, nên quay đầu tìm người giúp.",
      "love_meaning": "Gian nan trước mắt, đi đường hiểm trở, nên quay đầu tìm người giúp.",
      "wealth_meaning": "Gian nan trước mắt, đi đường hiểm trở, nên quay đầu tìm người giúp.",
      "health_meaning": "Gian nan trước mắt, đi đường hiểm trở, nên quay đầu tìm người giúp."
    },
    {
      "id": 18,
      "name": "Bát Thuần Khảm",
      "palace": "Khảm",
      "vietnamese_meaning": "Bát Thuần Khảm",
      "overall_meaning": "Khảm hiểm, khó khăn chồng chất, cần lòng tin chí thành vượt hiểm nguy.",
      "career_meaning": "Khảm hiểm, khó khăn chồng chất, cần lòng tin chí thành vượt hiểm nguy.",
      "love_meaning": "Khảm hiểm, khó khăn chồng chất, cần lòng tin chí thành vượt hiểm nguy.",
      "wealth_meaning": "Khảm hiểm, khó khăn chồng chất, cần lòng tin chí thành vượt hiểm nguy.",
      "health_meaning": "Khảm hiểm, khó khăn chồng chất, cần lòng tin chí thành vượt hiểm nguy."
    },
    {
      "id": 19,
      "name": "Thủy Phong Tỉnh",
      "palace": "Chấn",
      "vietnamese_meaning": "Thủy Phong Tỉnh",
      "overall_meaning": "Cái giếng, nguồn sống vô tận không đổi, cống hiến thầm lặng cho đời.",
      "career_meaning": "Cái giếng, nguồn sống vô tận không đổi, cống hiến thầm lặng cho đời.",
      "love_meaning": "Cái giếng, nguồn sống vô tận không đổi, cống hiến thầm lặng cho đời.",
      "wealth_meaning": "Cái giếng, nguồn sống vô tận không đổi, cống hiến thầm lặng cho đời.",
      "health_meaning": "Cái giếng, nguồn sống vô tận không đổi, cống hiến thầm lặng cho đời."
    },
    {
      "id": 20,
      "name": "Thủy Lôi Truân",
      "palace": "Khảm",
      "vietnamese_meaning": "Thủy Lôi Truân",
      "overall_meaning": "Gian truân, khó khăn ban đầu, cần kiên trì bền bỉ vượt qua trở ngại.",
      "career_meaning": "Gian truân, khó khăn ban đầu, cần kiên trì bền bỉ vượt qua trở ngại.",
      "love_meaning": "Gian truân, khó khăn ban đầu, cần kiên trì bền bỉ vượt qua trở ngại.",
      "wealth_meaning": "Gian truân, khó khăn ban đầu, cần kiên trì bền bỉ vượt qua trở ngại.",
      "health_meaning": "Gian truân, khó khăn ban đầu, cần kiên trì bền bỉ vượt qua trở ngại."
    },
    {
      "id": 21,
      "name": "Thủy Hỏa Ký Tế",
      "palace": "Khảm",
      "vietnamese_meaning": "Thủy Hỏa Ký Tế",
      "overall_meaning": "Đã hoàn thành, mọi sự ổn định thăng bằng, đề phòng biến loạn về sau.",
      "career_meaning": "Đã hoàn thành, mọi sự ổn định thăng bằng, đề phòng biến loạn về sau.",
      "love_meaning": "Đã hoàn thành, mọi sự ổn định thăng bằng, đề phòng biến loạn về sau.",
      "wealth_meaning": "Đã hoàn thành, mọi sự ổn định thăng bằng, đề phòng biến loạn về sau.",
      "health_meaning": "Đã hoàn thành, mọi sự ổn định thăng bằng, đề phòng biến loạn về sau."
    },
    {
      "id": 22,
      "name": "Thủy Trạch Tiết",
      "palace": "Khảm",
      "vietnamese_meaning": "Thủy Trạch Tiết",
      "overall_meaning": "Tiết chế, chừng mực trong chi tiêu và hành động để tránh hao tổn.",
      "career_meaning": "Tiết chế, chừng mực trong chi tiêu và hành động để tránh hao tổn.",
      "love_meaning": "Tiết chế, chừng mực trong chi tiêu và hành động để tránh hao tổn.",
      "wealth_meaning": "Tiết chế, chừng mực trong chi tiêu và hành động để tránh hao tổn.",
      "health_meaning": "Tiết chế, chừng mực trong chi tiêu và hành động để tránh hao tổn."
    },
    {
      "id": 23,
      "name": "Thủy Thiên Nhu",
      "palace": "Khôn",
      "vietnamese_meaning": "Thủy Thiên Nhu",
      "overall_meaning": "Chờ thời cơ, dưỡng sức nuôi lòng, không nên nôn nóng vội vàng.",
      "career_meaning": "Chờ thời cơ, dưỡng sức nuôi lòng, không nên nôn nóng vội vàng.",
      "love_meaning": "Chờ thời cơ, dưỡng sức nuôi lòng, không nên nôn nóng vội vàng.",
      "wealth_meaning": "Chờ thời cơ, dưỡng sức nuôi lòng, không nên nôn nóng vội vàng.",
      "health_meaning": "Chờ thời cơ, dưỡng sức nuôi lòng, không nên nôn nóng vội vàng."
    },
    {
      "id": 24,
      "name": "Phong Địa Quan",
      "palace": "Càn",
      "vietnamese_meaning": "Phong Địa Quan",
      "overall_meaning": "Quan sát, xem xét kỹ lưỡng tình hình trước khi đưa ra quyết định.",
      "career_meaning": "Quan sát, xem xét kỹ lưỡng tình hình trước khi đưa ra quyết định.",
      "love_meaning": "Quan sát, xem xét kỹ lưỡng tình hình trước khi đưa ra quyết định.",
      "wealth_meaning": "Quan sát, xem xét kỹ lưỡng tình hình trước khi đưa ra quyết định.",
      "health_meaning": "Quan sát, xem xét kỹ lưỡng tình hình trước khi đưa ra quyết định."
    },
    {
      "id": 25,
      "name": "Phong Sơn Tiệm",
      "palace": "Cấn",
      "vietnamese_meaning": "Phong Sơn Tiệm",
      "overall_meaning": "Tiến bước tuần tự, phát triển vững chắc từng bước một như chim hồng bay.",
      "career_meaning": "Tiến bước tuần tự, phát triển vững chắc từng bước một như chim hồng bay.",
      "love_meaning": "Tiến bước tuần tự, phát triển vững chắc từng bước một như chim hồng bay.",
      "wealth_meaning": "Tiến bước tuần tự, phát triển vững chắc từng bước một như chim hồng bay.",
      "health_meaning": "Tiến bước tuần tự, phát triển vững chắc từng bước một như chim hồng bay."
    },
    {
      "id": 26,
      "name": "Phong Thủy Hoán",
      "palace": "Ly",
      "vietnamese_meaning": "Phong Thủy Hoán",
      "overall_meaning": "Ly tán, hóa giải mâu thuẫn bế tắc, phân tán lực cản để mưu sự.",
      "career_meaning": "Ly tán, hóa giải mâu thuẫn bế tắc, phân tán lực cản để mưu sự.",
      "love_meaning": "Ly tán, hóa giải mâu thuẫn bế tắc, phân tán lực cản để mưu sự.",
      "wealth_meaning": "Ly tán, hóa giải mâu thuẫn bế tắc, phân tán lực cản để mưu sự.",
      "health_meaning": "Ly tán, hóa giải mâu thuẫn bế tắc, phân tán lực cản để mưu sự."
    },
    {
      "id": 27,
      "name": "Bát Thuần Tốn",
      "palace": "Tốn",
      "vietnamese_meaning": "Bát Thuần Tốn",
      "overall_meaning": "Nhu thuận, luồn lách khôn khéo như gió, phục tùng người trên để thành công.",
      "career_meaning": "Nhu thuận, luồn lách khôn khéo như gió, phục tùng người trên để thành công.",
      "love_meaning": "Nhu thuận, luồn lách khôn khéo như gió, phục tùng người trên để thành công.",
      "wealth_meaning": "Nhu thuận, luồn lách khôn khéo như gió, phục tùng người trên để thành công.",
      "health_meaning": "Nhu thuận, luồn lách khôn khéo như gió, phục tùng người trên để thành công."
    },
    {
      "id": 28,
      "name": "Phong Lôi Ích",
      "palace": "Tốn",
      "vietnamese_meaning": "Phong Lôi Ích",
      "overall_meaning": "Bồi đắp thêm, được lợi ích lớn, thời cơ hành động đầu tư đại sự.",
      "career_meaning": "Bồi đắp thêm, được lợi ích lớn, thời cơ hành động đầu tư đại sự.",
      "love_meaning": "Bồi đắp thêm, được lợi ích lớn, thời cơ hành động đầu tư đại sự.",
      "wealth_meaning": "Bồi đắp thêm, được lợi ích lớn, thời cơ hành động đầu tư đại sự.",
      "health_meaning": "Bồi đắp thêm, được lợi ích lớn, thời cơ hành động đầu tư đại sự."
    },
    {
      "id": 29,
      "name": "Phong Hỏa Gia Nhân",
      "palace": "Tốn",
      "vietnamese_meaning": "Phong Hỏa Gia Nhân",
      "overall_meaning": "Người trong nhà, tề gia trị quốc, giữ gìn nề nếp gia phong tốt đẹp.",
      "career_meaning": "Người trong nhà, tề gia trị quốc, giữ gìn nề nếp gia phong tốt đẹp.",
      "love_meaning": "Người trong nhà, tề gia trị quốc, giữ gìn nề nếp gia phong tốt đẹp.",
      "wealth_meaning": "Người trong nhà, tề gia trị quốc, giữ gìn nề nếp gia phong tốt đẹp.",
      "health_meaning": "Người trong nhà, tề gia trị quốc, giữ gìn nề nếp gia phong tốt đẹp."
    },
    {
      "id": 30,
      "name": "Phong Trạch Trung Phu",
      "palace": "Cấn",
      "vietnamese_meaning": "Phong Trạch Trung Phu",
      "overall_meaning": "Chân thành tuyệt đối, lòng tin cảm hóa muôn loài, vạn sự cát lành.",
      "career_meaning": "Chân thành tuyệt đối, lòng tin cảm hóa muôn loài, vạn sự cát lành.",
      "love_meaning": "Chân thành tuyệt đối, lòng tin cảm hóa muôn loài, vạn sự cát lành.",
      "wealth_meaning": "Chân thành tuyệt đối, lòng tin cảm hóa muôn loài, vạn sự cát lành.",
      "health_meaning": "Chân thành tuyệt đối, lòng tin cảm hóa muôn loài, vạn sự cát lành."
    },
    {
      "id": 31,
      "name": "Phong Thiên Tiểu Súc",
      "palace": "Tốn",
      "vietnamese_meaning": "Phong Thiên Tiểu Súc",
      "overall_meaning": "Luận giải đang cập nhật.",
      "career_meaning": "Luận giải đang cập nhật.",
      "love_meaning": "Luận giải đang cập nhật.",
      "wealth_meaning": "Luận giải đang cập nhật.",
      "health_meaning": "Luận giải đang cập nhật."
    },
    {
      "id": 32,
      "name": "Lôi Địa Dự",
      "palace": "Chấn",
      "vietnamese_meaning": "Lôi Địa Dự",
      "overall_meaning": "Vui tươi, hào hứng chuẩn bị, dự phòng chu đáo giúp công việc mượt mà.",
      "career_meaning": "Vui tươi, hào hứng chuẩn bị, dự phòng chu đáo giúp công việc mượt mà.",
      "love_meaning": "Vui tươi, hào hứng chuẩn bị, dự phòng chu đáo giúp công việc mượt mà.",
      "wealth_meaning": "Vui tươi, hào hứng chuẩn bị, dự phòng chu đáo giúp công việc mượt mà.",
      "health_meaning": "Vui tươi, hào hứng chuẩn bị, dự phòng chu đáo giúp công việc mượt mà."
    },
    {
      "id": 33,
      "name": "Lôi Sơn Tiểu Quá",
      "palace": "Đoài",
      "vietnamese_meaning": "Lôi Sơn Tiểu Quá",
      "overall_meaning": "Quá liều một chút, việc nhỏ có thể làm, việc lớn cần thận trọng tự thủ.",
      "career_meaning": "Quá liều một chút, việc nhỏ có thể làm, việc lớn cần thận trọng tự thủ.",
      "love_meaning": "Quá liều một chút, việc nhỏ có thể làm, việc lớn cần thận trọng tự thủ.",
      "wealth_meaning": "Quá liều một chút, việc nhỏ có thể làm, việc lớn cần thận trọng tự thủ.",
      "health_meaning": "Quá liều một chút, việc nhỏ có thể làm, việc lớn cần thận trọng tự thủ."
    },
    {
      "id": 34,
      "name": "Lôi Thủy Giải",
      "palace": "Chấn",
      "vietnamese_meaning": "Lôi Thủy Giải",
      "overall_meaning": "Giải tỏa bế tắc, tháo gỡ khó khăn, mưu sự bắt đầu hanh thông trở lại.",
      "career_meaning": "Giải tỏa bế tắc, tháo gỡ khó khăn, mưu sự bắt đầu hanh thông trở lại.",
      "love_meaning": "Giải tỏa bế tắc, tháo gỡ khó khăn, mưu sự bắt đầu hanh thông trở lại.",
      "wealth_meaning": "Giải tỏa bế tắc, tháo gỡ khó khăn, mưu sự bắt đầu hanh thông trở lại.",
      "health_meaning": "Giải tỏa bế tắc, tháo gỡ khó khăn, mưu sự bắt đầu hanh thông trở lại."
    },
    {
      "id": 35,
      "name": "Lôi Phong Hằng",
      "palace": "Tốn",
      "vietnamese_meaning": "Lôi Phong Hằng",
      "overall_meaning": "Bền vững, kiên trì mục tiêu lâu dài, giữ đạo trung chính ổn định.",
      "career_meaning": "Bền vững, kiên trì mục tiêu lâu dài, giữ đạo trung chính ổn định.",
      "love_meaning": "Bền vững, kiên trì mục tiêu lâu dài, giữ đạo trung chính ổn định.",
      "wealth_meaning": "Bền vững, kiên trì mục tiêu lâu dài, giữ đạo trung chính ổn định.",
      "health_meaning": "Bền vững, kiên trì mục tiêu lâu dài, giữ đạo trung chính ổn định."
    },
    {
      "id": 36,
      "name": "Bát Thuần Chấn",
      "palace": "Chấn",
      "vietnamese_meaning": "Bát Thuần Chấn",
      "overall_meaning": "Sấm động, có sự biến động chấn động dữ dội khiến hoang mang lo sợ.",
      "career_meaning": "Sấm động, có sự biến động chấn động dữ dội khiến hoang mang lo sợ.",
      "love_meaning": "Sấm động, có sự biến động chấn động dữ dội khiến hoang mang lo sợ.",
      "wealth_meaning": "Sấm động, có sự biến động chấn động dữ dội khiến hoang mang lo sợ.",
      "health_meaning": "Sấm động, có sự biến động chấn động dữ dội khiến hoang mang lo sợ."
    },
    {
      "id": 37,
      "name": "Lôi Hỏa Phong",
      "palace": "Chưa rõ",
      "vietnamese_meaning": "Lôi Hỏa Phong",
      "overall_meaning": "Cực thịnh, phong phú dồi dào, đề phòng sau đỉnh cao là sườn dốc suy thoái.",
      "career_meaning": "Cực thịnh, phong phú dồi dào, đề phòng sau đỉnh cao là sườn dốc suy thoái.",
      "love_meaning": "Cực thịnh, phong phú dồi dào, đề phòng sau đỉnh cao là sườn dốc suy thoái.",
      "wealth_meaning": "Cực thịnh, phong phú dồi dào, đề phòng sau đỉnh cao là sườn dốc suy thoái.",
      "health_meaning": "Cực thịnh, phong phú dồi dào, đề phòng sau đỉnh cao là sườn dốc suy thoái."
    },
    {
      "id": 38,
      "name": "Lôi Trạch Quy Muội",
      "palace": "Chưa rõ",
      "vietnamese_meaning": "Lôi Trạch Quy Muội",
      "overall_meaning": "Gả con gái, kết cuộc không bền do hành sự sai thứ tự chính lễ.",
      "career_meaning": "Gả con gái, kết cuộc không bền do hành sự sai thứ tự chính lễ.",
      "love_meaning": "Gả con gái, kết cuộc không bền do hành sự sai thứ tự chính lễ.",
      "wealth_meaning": "Gả con gái, kết cuộc không bền do hành sự sai thứ tự chính lễ.",
      "health_meaning": "Gả con gái, kết cuộc không bền do hành sự sai thứ tự chính lễ."
    },
    {
      "id": 39,
      "name": "Lôi Thiên Đại Tráng",
      "palace": "Khôn",
      "vietnamese_meaning": "Lôi Thiên Đại Tráng",
      "overall_meaning": "Thịnh vượng lớn, chí khí ngút trời, tránh cậy mạnh làm càn.",
      "career_meaning": "Thịnh vượng lớn, chí khí ngút trời, tránh cậy mạnh làm càn.",
      "love_meaning": "Thịnh vượng lớn, chí khí ngút trời, tránh cậy mạnh làm càn.",
      "wealth_meaning": "Thịnh vượng lớn, chí khí ngút trời, tránh cậy mạnh làm càn.",
      "health_meaning": "Thịnh vượng lớn, chí khí ngút trời, tránh cậy mạnh làm càn."
    },
    {
      "id": 40,
      "name": "Hỏa Địa Tấn",
      "palace": "Ly",
      "vietnamese_meaning": "Hỏa Địa Tấn",
      "overall_meaning": "Tiến lên, được lòng tin dùng của cấp trên, thăng tiến rộng mở.",
      "career_meaning": "Tiến lên, được lòng tin dùng của cấp trên, thăng tiến rộng mở.",
      "love_meaning": "Tiến lên, được lòng tin dùng của cấp trên, thăng tiến rộng mở.",
      "wealth_meaning": "Tiến lên, được lòng tin dùng của cấp trên, thăng tiến rộng mở.",
      "health_meaning": "Tiến lên, được lòng tin dùng của cấp trên, thăng tiến rộng mở."
    },
    {
      "id": 41,
      "name": "Hỏa Sơn Lữ",
      "palace": "Ly",
      "vietnamese_meaning": "Hỏa Sơn Lữ",
      "overall_meaning": "Lữ khách hành trình xa nhà, bất định, cần thận trọng khi làm việc nơi đất khách.",
      "career_meaning": "Lữ khách hành trình xa nhà, bất định, cần thận trọng khi làm việc nơi đất khách.",
      "love_meaning": "Lữ khách hành trình xa nhà, bất định, cần thận trọng khi làm việc nơi đất khách.",
      "wealth_meaning": "Lữ khách hành trình xa nhà, bất định, cần thận trọng khi làm việc nơi đất khách.",
      "health_meaning": "Lữ khách hành trình xa nhà, bất định, cần thận trọng khi làm việc nơi đất khách."
    },
    {
      "id": 42,
      "name": "Hỏa Thủy Vị Tế",
      "palace": "Ly",
      "vietnamese_meaning": "Hỏa Thủy Vị Tế",
      "overall_meaning": "Chưa hoàn thành, tiền đồ rộng mở phía trước, cần nỗ lực bước cuối.",
      "career_meaning": "Chưa hoàn thành, tiền đồ rộng mở phía trước, cần nỗ lực bước cuối.",
      "love_meaning": "Chưa hoàn thành, tiền đồ rộng mở phía trước, cần nỗ lực bước cuối.",
      "wealth_meaning": "Chưa hoàn thành, tiền đồ rộng mở phía trước, cần nỗ lực bước cuối.",
      "health_meaning": "Chưa hoàn thành, tiền đồ rộng mở phía trước, cần nỗ lực bước cuối."
    },
    {
      "id": 43,
      "name": "Hỏa Phong Đỉnh",
      "palace": "Chưa rõ",
      "vietnamese_meaning": "Hỏa Phong Đỉnh",
      "overall_meaning": "Cái đỉnh, thiết lập trật tự mới, thành công vững bền vị thế cao.",
      "career_meaning": "Cái đỉnh, thiết lập trật tự mới, thành công vững bền vị thế cao.",
      "love_meaning": "Cái đỉnh, thiết lập trật tự mới, thành công vững bền vị thế cao.",
      "wealth_meaning": "Cái đỉnh, thiết lập trật tự mới, thành công vững bền vị thế cao.",
      "health_meaning": "Cái đỉnh, thiết lập trật tự mới, thành công vững bền vị thế cao."
    },
    {
      "id": 44,
      "name": "Hỏa Lôi Phệ Hạp",
      "palace": "Tốn",
      "vietnamese_meaning": "Hỏa Lôi Phệ Hạp",
      "overall_meaning": "Cắn hợp, vượt qua cản trở pháp lý, thực thi kỷ luật nghiêm khắc.",
      "career_meaning": "Cắn hợp, vượt qua cản trở pháp lý, thực thi kỷ luật nghiêm khắc.",
      "love_meaning": "Cắn hợp, vượt qua cản trở pháp lý, thực thi kỷ luật nghiêm khắc.",
      "wealth_meaning": "Cắn hợp, vượt qua cản trở pháp lý, thực thi kỷ luật nghiêm khắc.",
      "health_meaning": "Cắn hợp, vượt qua cản trở pháp lý, thực thi kỷ luật nghiêm khắc."
    },
    {
      "id": 45,
      "name": "Bát Thuần Ly",
      "palace": "Ly",
      "vietnamese_meaning": "Bát Thuần Ly",
      "overall_meaning": "Sáng sủa, bám víu vào trung chính để phát huy trí tuệ rực rỡ.",
      "career_meaning": "Sáng sủa, bám víu vào trung chính để phát huy trí tuệ rực rỡ.",
      "love_meaning": "Sáng sủa, bám víu vào trung chính để phát huy trí tuệ rực rỡ.",
      "wealth_meaning": "Sáng sủa, bám víu vào trung chính để phát huy trí tuệ rực rỡ.",
      "health_meaning": "Sáng sủa, bám víu vào trung chính để phát huy trí tuệ rực rỡ."
    },
    {
      "id": 46,
      "name": "Hỏa Trạch Khuê",
      "palace": "Cấn",
      "vietnamese_meaning": "Hỏa Trạch Khuê",
      "overall_meaning": "Chia lìa, bất đồng chí hướng, tìm điểm chung trong sự khác biệt.",
      "career_meaning": "Chia lìa, bất đồng chí hướng, tìm điểm chung trong sự khác biệt.",
      "love_meaning": "Chia lìa, bất đồng chí hướng, tìm điểm chung trong sự khác biệt.",
      "wealth_meaning": "Chia lìa, bất đồng chí hướng, tìm điểm chung trong sự khác biệt.",
      "health_meaning": "Chia lìa, bất đồng chí hướng, tìm điểm chung trong sự khác biệt."
    },
    {
      "id": 47,
      "name": "Hỏa Thiên Đại Hữu",
      "palace": "Càn",
      "vietnamese_meaning": "Hỏa Thiên Đại Hữu",
      "overall_meaning": "Sở hữu lớn, giàu sang thịnh vượng, đức độ bao dung giúp đỡ muôn người.",
      "career_meaning": "Sở hữu lớn, giàu sang thịnh vượng, đức độ bao dung giúp đỡ muôn người.",
      "love_meaning": "Sở hữu lớn, giàu sang thịnh vượng, đức độ bao dung giúp đỡ muôn người.",
      "wealth_meaning": "Sở hữu lớn, giàu sang thịnh vượng, đức độ bao dung giúp đỡ muôn người.",
      "health_meaning": "Sở hữu lớn, giàu sang thịnh vượng, đức độ bao dung giúp đỡ muôn người."
    },
    {
      "id": 48,
      "name": "Trạch Địa Tụy",
      "palace": "Đoài",
      "vietnamese_meaning": "Trạch Địa Tụy",
      "overall_meaning": "Tụ họp đông đảo, thu hút nhân tài, cần cúng tế phòng ngừa biến loạn.",
      "career_meaning": "Tụ họp đông đảo, thu hút nhân tài, cần cúng tế phòng ngừa biến loạn.",
      "love_meaning": "Tụ họp đông đảo, thu hút nhân tài, cần cúng tế phòng ngừa biến loạn.",
      "wealth_meaning": "Tụ họp đông đảo, thu hút nhân tài, cần cúng tế phòng ngừa biến loạn.",
      "health_meaning": "Tụ họp đông đảo, thu hút nhân tài, cần cúng tế phòng ngừa biến loạn."
    },
    {
      "id": 49,
      "name": "Trạch Sơn Hàm",
      "palace": "Đoài",
      "vietnamese_meaning": "Trạch Sơn Hàm",
      "overall_meaning": "Cảm ứng, giao cảm chân thành giữa nam nữ, đối tác hợp tác thuận lợi.",
      "career_meaning": "Cảm ứng, giao cảm chân thành giữa nam nữ, đối tác hợp tác thuận lợi.",
      "love_meaning": "Cảm ứng, giao cảm chân thành giữa nam nữ, đối tác hợp tác thuận lợi.",
      "wealth_meaning": "Cảm ứng, giao cảm chân thành giữa nam nữ, đối tác hợp tác thuận lợi.",
      "health_meaning": "Cảm ứng, giao cảm chân thành giữa nam nữ, đối tác hợp tác thuận lợi."
    },
    {
      "id": 50,
      "name": "Trạch Thủy Khốn",
      "palace": "Đoài",
      "vietnamese_meaning": "Trạch Thủy Khốn",
      "overall_meaning": "Khốn cùng, bế tắc tài chính, cần kiên trì giữ chí khí vượt gian nan.",
      "career_meaning": "Khốn cùng, bế tắc tài chính, cần kiên trì giữ chí khí vượt gian nan.",
      "love_meaning": "Khốn cùng, bế tắc tài chính, cần kiên trì giữ chí khí vượt gian nan.",
      "wealth_meaning": "Khốn cùng, bế tắc tài chính, cần kiên trì giữ chí khí vượt gian nan.",
      "health_meaning": "Khốn cùng, bế tắc tài chính, cần kiên trì giữ chí khí vượt gian nan."
    },
    {
      "id": 51,
      "name": "Trạch Phong Đại Quá",
      "palace": "Chấn",
      "vietnamese_meaning": "Trạch Phong Đại Quá",
      "overall_meaning": "Quá tải, cột xà cong yếu, áp lực cực lớn cần người gánh vác.",
      "career_meaning": "Quá tải, cột xà cong yếu, áp lực cực lớn cần người gánh vác.",
      "love_meaning": "Quá tải, cột xà cong yếu, áp lực cực lớn cần người gánh vác.",
      "wealth_meaning": "Quá tải, cột xà cong yếu, áp lực cực lớn cần người gánh vác.",
      "health_meaning": "Quá tải, cột xà cong yếu, áp lực cực lớn cần người gánh vác."
    },
    {
      "id": 52,
      "name": "Trạch Lôi Tùy",
      "palace": "Khảm",
      "vietnamese_meaning": "Trạch Lôi Tùy",
      "overall_meaning": "Tùy thời, thuận theo tự nhiên, lắng nghe ý kiến tập thể để tiến bước.",
      "career_meaning": "Tùy thời, thuận theo tự nhiên, lắng nghe ý kiến tập thể để tiến bước.",
      "love_meaning": "Tùy thời, thuận theo tự nhiên, lắng nghe ý kiến tập thể để tiến bước.",
      "wealth_meaning": "Tùy thời, thuận theo tự nhiên, lắng nghe ý kiến tập thể để tiến bước.",
      "health_meaning": "Tùy thời, thuận theo tự nhiên, lắng nghe ý kiến tập thể để tiến bước."
    },
    {
      "id": 53,
      "name": "Trạch Hỏa Cách",
      "palace": "Chưa rõ",
      "vietnamese_meaning": "Trạch Hỏa Cách",
      "overall_meaning": "Cải cách, thay đổi toàn diện từ gốc rễ, thời cơ cách tân đã chín muồi.",
      "career_meaning": "Cải cách, thay đổi toàn diện từ gốc rễ, thời cơ cách tân đã chín muồi.",
      "love_meaning": "Cải cách, thay đổi toàn diện từ gốc rễ, thời cơ cách tân đã chín muồi.",
      "wealth_meaning": "Cải cách, thay đổi toàn diện từ gốc rễ, thời cơ cách tân đã chín muồi.",
      "health_meaning": "Cải cách, thay đổi toàn diện từ gốc rễ, thời cơ cách tân đã chín muồi."
    },
    {
      "id": 54,
      "name": "Bát Thuần Đoài",
      "palace": "Đoài",
      "vietnamese_meaning": "Bát Thuần Đoài",
      "overall_meaning": "Vui vẻ, đối thoại hòa nhã, dùng lời nói thuyết phục thu phục nhân tâm.",
      "career_meaning": "Vui vẻ, đối thoại hòa nhã, dùng lời nói thuyết phục thu phục nhân tâm.",
      "love_meaning": "Vui vẻ, đối thoại hòa nhã, dùng lời nói thuyết phục thu phục nhân tâm.",
      "wealth_meaning": "Vui vẻ, đối thoại hòa nhã, dùng lời nói thuyết phục thu phục nhân tâm.",
      "health_meaning": "Vui vẻ, đối thoại hòa nhã, dùng lời nói thuyết phục thu phục nhân tâm."
    },
    {
      "id": 55,
      "name": "Trạch Thiên Quải",
      "palace": "Khôn",
      "vietnamese_meaning": "Trạch Thiên Quải",
      "overall_meaning": "Quyết đoán bài trừ kẻ xấu, dứt khoát thực thi kế hoạch.",
      "career_meaning": "Quyết đoán bài trừ kẻ xấu, dứt khoát thực thi kế hoạch.",
      "love_meaning": "Quyết đoán bài trừ kẻ xấu, dứt khoát thực thi kế hoạch.",
      "wealth_meaning": "Quyết đoán bài trừ kẻ xấu, dứt khoát thực thi kế hoạch.",
      "health_meaning": "Quyết đoán bài trừ kẻ xấu, dứt khoát thực thi kế hoạch."
    },
    {
      "id": 56,
      "name": "Thiên Địa Bĩ",
      "palace": "Càn",
      "vietnamese_meaning": "Thiên Địa Bĩ",
      "overall_meaning": "Bế tắc, không thông nhau, trong ngoài bất hòa, thời điểm nên ẩn tàng.",
      "career_meaning": "Bế tắc, không thông nhau, trong ngoài bất hòa, thời điểm nên ẩn tàng.",
      "love_meaning": "Bế tắc, không thông nhau, trong ngoài bất hòa, thời điểm nên ẩn tàng.",
      "wealth_meaning": "Bế tắc, không thông nhau, trong ngoài bất hòa, thời điểm nên ẩn tàng.",
      "health_meaning": "Bế tắc, không thông nhau, trong ngoài bất hòa, thời điểm nên ẩn tàng."
    },
    {
      "id": 57,
      "name": "Thiên Sơn Độn",
      "palace": "Càn",
      "vietnamese_meaning": "Thiên Sơn Độn",
      "overall_meaning": "Lui ẩn, tránh xa tranh chấp, bảo toàn lực lượng chờ thời cơ mới.",
      "career_meaning": "Lui ẩn, tránh xa tranh chấp, bảo toàn lực lượng chờ thời cơ mới.",
      "love_meaning": "Lui ẩn, tránh xa tranh chấp, bảo toàn lực lượng chờ thời cơ mới.",
      "wealth_meaning": "Lui ẩn, tránh xa tranh chấp, bảo toàn lực lượng chờ thời cơ mới.",
      "health_meaning": "Lui ẩn, tránh xa tranh chấp, bảo toàn lực lượng chờ thời cơ mới."
    },
    {
      "id": 58,
      "name": "Thiên Thủy Tụng",
      "palace": "Ly",
      "vietnamese_meaning": "Thiên Thủy Tụng",
      "overall_meaning": "Tranh chấp, kiện tụng, có sự bất đồng ý kiến sâu sắc, nên nhẫn nhịn giải hòa.",
      "career_meaning": "Tranh chấp, kiện tụng, có sự bất đồng ý kiến sâu sắc, nên nhẫn nhịn giải hòa.",
      "love_meaning": "Tranh chấp, kiện tụng, có sự bất đồng ý kiến sâu sắc, nên nhẫn nhịn giải hòa.",
      "wealth_meaning": "Tranh chấp, kiện tụng, có sự bất đồng ý kiến sâu sắc, nên nhẫn nhịn giải hòa.",
      "health_meaning": "Tranh chấp, kiện tụng, có sự bất đồng ý kiến sâu sắc, nên nhẫn nhịn giải hòa."
    },
    {
      "id": 59,
      "name": "Thiên Phong Cấu",
      "palace": "Càn",
      "vietnamese_meaning": "Thiên Phong Cấu",
      "overall_meaning": "Gặp gỡ bất ngờ, phòng ngừa ảnh hưởng xấu từ thế lực mới nổi.",
      "career_meaning": "Gặp gỡ bất ngờ, phòng ngừa ảnh hưởng xấu từ thế lực mới nổi.",
      "love_meaning": "Gặp gỡ bất ngờ, phòng ngừa ảnh hưởng xấu từ thế lực mới nổi.",
      "wealth_meaning": "Gặp gỡ bất ngờ, phòng ngừa ảnh hưởng xấu từ thế lực mới nổi.",
      "health_meaning": "Gặp gỡ bất ngờ, phòng ngừa ảnh hưởng xấu từ thế lực mới nổi."
    },
    {
      "id": 60,
      "name": "Thiên Lôi Vô Vọng",
      "palace": "Tốn",
      "vietnamese_meaning": "Thiên Lôi Vô Vọng",
      "overall_meaning": "Không vọng động, làm việc đúng bổn phận, đề phòng tai họa bất ngờ.",
      "career_meaning": "Không vọng động, làm việc đúng bổn phận, đề phòng tai họa bất ngờ.",
      "love_meaning": "Không vọng động, làm việc đúng bổn phận, đề phòng tai họa bất ngờ.",
      "wealth_meaning": "Không vọng động, làm việc đúng bổn phận, đề phòng tai họa bất ngờ.",
      "health_meaning": "Không vọng động, làm việc đúng bổn phận, đề phòng tai họa bất ngờ."
    },
    {
      "id": 61,
      "name": "Thiên Hỏa Đồng Nhân",
      "palace": "Chưa rõ",
      "vietnamese_meaning": "Thiên Hỏa Đồng Nhân",
      "overall_meaning": "Đồng lòng, cùng chung chí hướng, hợp tác mở mang đại nghiệp.",
      "career_meaning": "Đồng lòng, cùng chung chí hướng, hợp tác mở mang đại nghiệp.",
      "love_meaning": "Đồng lòng, cùng chung chí hướng, hợp tác mở mang đại nghiệp.",
      "wealth_meaning": "Đồng lòng, cùng chung chí hướng, hợp tác mở mang đại nghiệp.",
      "health_meaning": "Đồng lòng, cùng chung chí hướng, hợp tác mở mang đại nghiệp."
    },
    {
      "id": 62,
      "name": "Thiên Trạch Lý",
      "palace": "Cấn",
      "vietnamese_meaning": "Thiên Trạch Lý",
      "overall_meaning": "Lễ nghĩa, dẫm đuôi cọp nhưng không cắn, hành sự thận trọng cung kính.",
      "career_meaning": "Lễ nghĩa, dẫm đuôi cọp nhưng không cắn, hành sự thận trọng cung kính.",
      "love_meaning": "Lễ nghĩa, dẫm đuôi cọp nhưng không cắn, hành sự thận trọng cung kính.",
      "wealth_meaning": "Lễ nghĩa, dẫm đuôi cọp nhưng không cắn, hành sự thận trọng cung kính.",
      "health_meaning": "Lễ nghĩa, dẫm đuôi cọp nhưng không cắn, hành sự thận trọng cung kính."
    },
    {
      "id": 63,
      "name": "Bát Thuần Càn",
      "palace": "Càn",
      "vietnamese_meaning": "Bát Thuần Càn",
      "overall_meaning": "Thuần Càn: Tượng trưng cho Trời, sự cương kiện, sáng tạo vô hạn, mọi sự hanh thông tốt đẹp.",
      "career_meaning": "Thuần Càn: Tượng trưng cho Trời, sự cương kiện, sáng tạo vô hạn, mọi sự hanh thông tốt đẹp.",
      "love_meaning": "Thuần Càn: Tượng trưng cho Trời, sự cương kiện, sáng tạo vô hạn, mọi sự hanh thông tốt đẹp.",
      "wealth_meaning": "Thuần Càn: Tượng trưng cho Trời, sự cương kiện, sáng tạo vô hạn, mọi sự hanh thông tốt đẹp.",
      "health_meaning": "Thuần Càn: Tượng trưng cho Trời, sự cương kiện, sáng tạo vô hạn, mọi sự hanh thông tốt đẹp."
    }
  ],
  "lines": [
    {
      "hexagram_id": 0,
      "line_number": 1,
      "relation": "",
      "meaning_static": "(Đạ p lên sươ ng thì biế t bă ng dày sắpđế n)",
      "meaning_active": "Phả i thậ n trọ ng từ bướcđầ u. Tích lũyđiề u tố t từ đầ u."
    },
    {
      "hexagram_id": 0,
      "line_number": 2,
      "relation": "",
      "meaning_static": "(Thẳ ng, vuông, lớ n thì chẳ ng họ c tậ p cũ ng không có gì bấ t lợ i)",
      "meaning_active": "Cứ xuôi mà thành."
    },
    {
      "hexagram_id": 0,
      "line_number": 3,
      "relation": "",
      "meaning_static": "(Theođuổ i việ c nhà vua, không cậ y công thìđượ c tố t lành về sau)",
      "meaning_active": "Ngậ m kín cái vă n vẻtốtđẹ p củ a ta."
    },
    {
      "hexagram_id": 0,
      "line_number": 4,
      "relation": "",
      "meaning_static": "(Thắ t túi, không lỗ i, không khen)",
      "meaning_active": "Giấ u kín cái khôn củ a mìnhđể khỏ i bịám hạ i.Đã giấ u kín thì không có tiế ng khen."
    },
    {
      "hexagram_id": 0,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 0,
      "line_number": 6,
      "relation": "",
      "meaning_static": "(Rồngđánh nhauở đồ ng, máu nó xanh vàng)",
      "meaning_active": "Thị nh quá gây ra tranh giành, tổ n thươ ng."
    },
    {
      "hexagram_id": 1,
      "line_number": 1,
      "relation": "",
      "meaning_static": "c lòng ngườ i trên mà thi hành chính đạ o. Gầ n vua tố t thìđượ c lợ i. Tiể u nhân hiể u biế t nông cạ n không hiểuđượ c quân tử.",
      "meaning_active": "c lòng ngườ i trên mà thi hành chính đạ o. Gầ n vua tố t thìđượ c lợ i. Tiể u nhân hiể u biế t nông cạ n không hiểuđượ c quân tử."
    },
    {
      "hexagram_id": 1,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Cùng nhau tớ i, không có gì là không lợ i. Lấ y sứ c người giúp mệ nh trờ i, chứ không nên ngồ i yên mà chờmệ nh trờ i. Xem bằ ng cách dòm ngó thì không rõ. Tuy vậ y mà thuậ n theo là con gái tố t.",
      "meaning_active": "Cùng nhau tớ i, không có gì là không lợ i. Lấ y sứ c người giúp mệ nh trờ i, chứ không nên ngồ i yên mà chờmệ nh trờ i. Xem bằ ng cách dòm ngó thì không rõ. Tuy vậ y mà thuậ n theo là con gái tố t."
    },
    {
      "hexagram_id": 1,
      "line_number": 3,
      "relation": "",
      "meaning_static": "t ngào, dua nị nh mà tớ i thì không có lợ i. Tự xét bả n thân, nếuđố i phóđượ c hoàn cả nh thì tiế n lên, không thì thôi.",
      "meaning_active": "t ngào, dua nị nh mà tớ i thì không có lợ i. Tự xét bả n thân, nếuđố i phóđượ c hoàn cả nh thì tiế n lên, không thì thôi."
    },
    {
      "hexagram_id": 1,
      "line_number": 4,
      "relation": "",
      "meaning_static": "n vua, dùng ngườ i hiềnđểcầ u thân kẻdướ i, cho nên không lỗ i. Vua tố t và tín nhiệ m mình thì hãyđ em tài ra giúp.",
      "meaning_active": "n vua, dùng ngườ i hiềnđểcầ u thân kẻdướ i, cho nên không lỗ i. Vua tố t và tín nhiệ m mình thì hãyđ em tài ra giúp."
    },
    {
      "hexagram_id": 1,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Vua tuy ít tài như ng biế t chọ n ngườ i hiề n tài, nhưvậ y làtố t. Xem dân cho biế t sự tình. \"Thượ ng bấ t chánh, hạtắ c loạ n\".",
      "meaning_active": "Vua tuy ít tài như ng biế t chọ n ngườ i hiề n tài, nhưvậ y làtố t. Xem dân cho biế t sự tình. \"Thượ ng bấ t chánh, hạtắ c loạ n\"."
    },
    {
      "hexagram_id": 1,
      "line_number": 6,
      "relation": "",
      "meaning_static": "y lòngđôn hậ u mà gầ n gũ i vớ i mọ i ngườ i, tố t. Tuy khôngở ngôi như ng khôngđượ c phóng túng theo ý riêng vì bị dânđểý.",
      "meaning_active": "y lòngđôn hậ u mà gầ n gũ i vớ i mọ i ngườ i, tố t. Tuy khôngở ngôi như ng khôngđượ c phóng túng theo ý riêng vì bị dânđểý."
    },
    {
      "hexagram_id": 2,
      "line_number": 1,
      "relation": "",
      "meaning_static": "u củ a việ c ra quân, phả i chú trọngđế n kỷ luậ t.Nế u không khéođểmấ t lòng quân sĩ , xấ u. Trong lòng không tin, mà muố n thân vớ i ngườ i ta, thì ngườ i ta ai thân vớ i mình?",
      "meaning_active": "u củ a việ c ra quân, phả i chú trọngđế n kỷ luậ t.Nế u không khéođểmấ t lòng quân sĩ , xấ u. Trong lòng không tin, mà muố n thân vớ i ngườ i ta, thì ngườ i ta ai thân vớ i mình?"
    },
    {
      "hexagram_id": 2,
      "line_number": 2,
      "relation": "",
      "meaning_static": "o làm tôi không dám chuyên chếmộ t việ c gì, nhưng việ c quân ngoài mặ t trậnđượ c quyề n chuyên chế. Cái quyề n chọ n tài mà dùng tuyởng ườ i trên, mà sự đ em thân cho nướ c,ắ t doở mình. Giữ đạ o trung chínhđểchờng ườ i trênđế n tìm và giữ đượ c phẩ m giá củ a mình.",
      "meaning_active": "o làm tôi không dám chuyên chếmộ t việ c gì, nhưng việ c quân ngoài mặ t trậnđượ c quyề n chuyên chế. Cái quyề n chọ n tài mà dùng tuyởng ườ i trên, mà sự đ em thân cho nướ c,ắ t doở mình. Giữ đạ o trung chínhđểchờng ườ i trênđế n tìm và giữ đượ c phẩ m giá củ a mình."
    },
    {
      "hexagram_id": 2,
      "line_number": 3,
      "relation": "",
      "meaning_static": "thua thiệtđế n phả i khiêng thây mà về . Nươ ng tự a, giao phó cho hai ba ng ườ i, sao thành công đượ c. Gầ n liề n vớ i kẻ khôngđáng gầ n thì hố i hậ n cũ ng muộ n rồ i. 3",
      "meaning_active": "thua thiệtđế n phả i khiêng thây mà về . Nươ ng tự a, giao phó cho hai ba ng ườ i, sao thành công đượ c. Gầ n liề n vớ i kẻ khôngđáng gầ n thì hố i hậ n cũ ng muộ n rồ i. 3"
    },
    {
      "hexagram_id": 2,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Giữlấ y toàn quân mà lui. Biế t khó mà lui,đó là sự thường trong việ c quân. Bên ngoài gầ n liề n vớ i ngườ i hiề n,để mà theo ngườ i trên vậ y.",
      "meaning_active": "Giữlấ y toàn quân mà lui. Biế t khó mà lui,đó là sự thường trong việ c quân. Bên ngoài gầ n liề n vớ i ngườ i hiề n,để mà theo ngườ i trên vậ y."
    },
    {
      "hexagram_id": 2,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Quân giặ c tràn lấnđế n mình, chẳ ng nhịnđượ c mà phảiứngđị ch. Nế u sai quân tử làm việ c màđể tiể u nhân xen vào là sai chúng khiêng thây mà về. Như khi să n thú, vua chỉ vây có ba mặ t (còn mộ t mặ t bỏ ngõ) cho cầ m thú thoát ra phíađ ó. Ngườ i xung quanhđượ c cả m hóa, không phả i rănđ e. Ai phụ c tùng thì cứtớ i.",
      "meaning_active": "Quân giặ c tràn lấnđế n mình, chẳ ng nhịnđượ c mà phảiứngđị ch. Nế u sai quân tử làm việ c màđể tiể u nhân xen vào là sai chúng khiêng thây mà về. Như khi să n thú, vua chỉ vây có ba mặ t (còn mộ t mặ t bỏ ngõ) cho cầ m thú thoát ra phíađ ó. Ngườ i xung quanhđượ c cả m hóa, không phả i rănđ e. Ai phụ c tùng thì cứtớ i."
    },
    {
      "hexagram_id": 2,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Việ c quânđã xong rồ i tứ c là lúc luậ n công ban thưở ng. Kẻ tiể u nhân dù là có công cũ ng không nênđể chúngđượ c cótướcđấ t. Chỉ ưuđãi chúng bằ ng vàng bạ c. Lúcđầ u gầ n liề n vớ i nhau không theo đạ o nghĩ a,để sinh hiềm khích về sau, thiên hạnhư thếcũ ng nhiề u. Trongđạ o gầ n liềnvớ i ngườ i, trướ c thiệ n mà sau cũ ng thiệ n.",
      "meaning_active": "Việ c quânđã xong rồ i tứ c là lúc luậ n công ban thưở ng. Kẻ tiể u nhân dù là có công cũ ng không nênđể chúngđượ c cótướcđấ t. Chỉ ưuđãi chúng bằ ng vàng bạ c. Lúcđầ u gầ n liề n vớ i nhau không theo đạ o nghĩ a,để sinh hiềm khích về sau, thiên hạnhư thếcũ ng nhiề u. Trongđạ o gầ n liềnvớ i ngườ i, trướ c thiệ n mà sau cũ ng thiệ n."
    },
    {
      "hexagram_id": 3,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 3,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 3,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 3,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 3,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 3,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 4,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 4,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 4,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 4,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 4,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 4,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 5,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 5,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 5,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 5,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 5,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 5,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 6,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Thèm thuồ ng cầuă n vớ i ngườ i khácđể nuôi xác thị t, quên phầ n tinh thầ n củ a mình. Mê muộ i vì ham muố n,vậ y làxấ u. Kẻ quá sợ hãi cẩ n thậ n mà không có lỗ i.",
      "meaning_active": "Thèm thuồ ng cầuă n vớ i ngườ i khácđể nuôi xác thị t, quên phầ n tinh thầ n củ a mình. Mê muộ i vì ham muố n,vậ y làxấ u. Kẻ quá sợ hãi cẩ n thậ n mà không có lỗ i."
    },
    {
      "hexagram_id": 6,
      "line_number": 2,
      "relation": "",
      "meaning_static": "ng lẽngườ i trên xină n kẻdướ i. Nhưvậ y sẽbịtừchố i,bịnhụ c. Chồ ng gìa lấyđượ c vợ trẻ . Mộ t ngườ i qúa cứ ng mà biế t dùngkẻmề m giúp mình nên làm đượ c công cả quá.",
      "meaning_active": "ng lẽngườ i trên xină n kẻdướ i. Nhưvậ y sẽbịtừchố i,bịnhụ c. Chồ ng gìa lấyđượ c vợ trẻ . Mộ t ngườ i qúa cứ ng mà biế t dùngkẻmề m giúp mình nên làm đượ c công cả quá."
    },
    {
      "hexagram_id": 6,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Không chị u ngồ i yên, thấyđâu cóă n làđâm vào, rấ t xấ u. Kẻcươ ng cườ ng quá không thể theo ngườ i, ngườ i cũ ng khônggầ n gũ i giúpđỡ mình, nhưcộ t nhà không thểchống đỡ.",
      "meaning_active": "Không chị u ngồ i yên, thấyđâu cóă n làđâm vào, rấ t xấ u. Kẻcươ ng cườ ng quá không thể theo ngườ i, ngườ i cũ ng khônggầ n gũ i giúpđỡ mình, nhưcộ t nhà không thểchống đỡ."
    },
    {
      "hexagram_id": 6,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Biế t hạ mình cầ u ngườ i dướ i nuôi mình, tuy là trái lẽ thườ ng, như ng là vì ngườ i tố t vì muố n lậ p sự nghiệ p và sausẽ giúpđỡ dân chúng nên vẫn đượ c tố t. Nhằ m ngôi gầ n vua, là kẻ gánh trách nhiệ m cả quá, nế u không phả i là bậ c cươ ng trung thì không gánh nỗ i trách nhiệ m.",
      "meaning_active": "Biế t hạ mình cầ u ngườ i dướ i nuôi mình, tuy là trái lẽ thườ ng, như ng là vì ngườ i tố t vì muố n lậ p sự nghiệ p và sausẽ giúpđỡ dân chúng nên vẫn đượ c tố t. Nhằ m ngôi gầ n vua, là kẻ gánh trách nhiệ m cả quá, nế u không phả i là bậ c cươ ng trung thì không gánh nỗ i trách nhiệ m."
    },
    {
      "hexagram_id": 6,
      "line_number": 5,
      "relation": "",
      "meaning_static": "t ông vua kém tài nên phả i nhờngườ i khác giúp mình, vì tài hèn kém nên không thể làmđượ c chuyệ n lớ n. Vợ già lấ y chồ ng tráng kiệ n, dầ u không tộ i lỗ i như ng chẳng phảiđẹpđôi.",
      "meaning_active": "t ông vua kém tài nên phả i nhờngườ i khác giúp mình, vì tài hèn kém nên không thể làmđượ c chuyệ n lớ n. Vợ già lấ y chồ ng tráng kiệ n, dầ u không tộ i lỗ i như ng chẳng phảiđẹpđôi."
    },
    {
      "hexagram_id": 6,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Vì tài củ a vua khôngđủ nên phả i nươ ng tự a vào mình thì mình nênđ em hế t tài lựcđể gánh vác giúpđỡmọ i ngườ i. Ởchỗ quá cự c, tài hèn không thể làm nên công việ c. Quá lội màđế n chếtđuố i, là do tự mình làm ra, không thể đổlỗ i cho ai.",
      "meaning_active": "Vì tài củ a vua khôngđủ nên phả i nươ ng tự a vào mình thì mình nênđ em hế t tài lựcđể gánh vác giúpđỡmọ i ngườ i. Ởchỗ quá cự c, tài hèn không thể làm nên công việ c. Quá lội màđế n chếtđuố i, là do tự mình làm ra, không thể đổlỗ i cho ai."
    },
    {
      "hexagram_id": 7,
      "line_number": 1,
      "relation": "",
      "meaning_static": "i quân tử tiế n lênắ t cùng bè phái dắ t díu nhau thực hành cáiđạ o củ a mình. Chư a có ngườ i nào có thể đứng riêng mộ t mình. Bọ n tiể u nhân kế t bè tiế n lên, cho nên ră n họnế u chính bề n thìđượ c tố t lành, nghĩ a là có thểnhư thế thì họsẽ biế n thành quântử.",
      "meaning_active": "i quân tử tiế n lênắ t cùng bè phái dắ t díu nhau thực hành cáiđạ o củ a mình. Chư a có ngườ i nào có thể đứng riêng mộ t mình. Bọ n tiể u nhân kế t bè tiế n lên, cho nên ră n họnế u chính bề n thìđượ c tố t lành, nghĩ a là có thểnhư thế thì họsẽ biế n thành quântử."
    },
    {
      "hexagram_id": 7,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Trongđờ i thái bình, th ườ ng hay thủ thườ ng, sợ thayđổ i,nế u không có hă ng hái củ a kẻ tay không lộ i sông, thì không thể nào làm việ c. Kẻ tiể u nhân mà biế t bao dong, vâng thuận đấ ng quân tử,ấ y là cách tố t củ a tiể u nhân.Đấngđạ i nhân há chị u uố n mình, vâng thuậ n ngườ i trên.",
      "meaning_active": "Trongđờ i thái bình, th ườ ng hay thủ thườ ng, sợ thayđổ i,nế u không có hă ng hái củ a kẻ tay không lộ i sông, thì không thể nào làm việ c. Kẻ tiể u nhân mà biế t bao dong, vâng thuận đấ ng quân tử,ấ y là cách tố t củ a tiể u nhân.Đấngđạ i nhân há chị u uố n mình, vâng thuậ n ngườ i trên."
    },
    {
      "hexagram_id": 7,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Không cái gì yên phẳ ng mãi mà không lồ i lõm.Đã cực thị nh rồ i thì sắ p gian nan.Hễ mà có thể giữ đượ c tấ m lòng khó nhọ c thì không cầ n lo vậ n trờiắtđế n. Kẻ tiể u nhân có chí muố n làm hạ i bậ c thiệ n nhân mà chư a làmđượ c.",
      "meaning_active": "Không cái gì yên phẳ ng mãi mà không lồ i lõm.Đã cực thị nh rồ i thì sắ p gian nan.Hễ mà có thể giữ đượ c tấ m lòng khó nhọ c thì không cầ n lo vậ n trờiắtđế n. Kẻ tiể u nhân có chí muố n làm hạ i bậ c thiệ n nhân mà chư a làmđượ c."
    },
    {
      "hexagram_id": 7,
      "line_number": 4,
      "relation": "",
      "meaning_static": "n tiể u nhân kế t hợ p vớ i nhauđể làm hạ i chínhđạ o.Đấ ng quân tử phả i nên ră n lo. Biế t ră n lo thì có thể giữ. Kẻ có tài làm qua cuộ c bỉ màđượ c ngôi cao,đủ để giúpđỡ ngườ i trên, vượ t khỏ i cuộ c bĩ . Gặ p lúc vuađươ ng bĩ mà cậ y có công thì chỉrướ c lấ y sự ghen ghét mà thôi. Làm việ c gì cũng nên theo mênh lệ nh củ a ngườ i trên.",
      "meaning_active": "n tiể u nhân kế t hợ p vớ i nhauđể làm hạ i chínhđạ o.Đấ ng quân tử phả i nên ră n lo. Biế t ră n lo thì có thể giữ. Kẻ có tài làm qua cuộ c bỉ màđượ c ngôi cao,đủ để giúpđỡ ngườ i trên, vượ t khỏ i cuộ c bĩ . Gặ p lúc vuađươ ng bĩ mà cậ y có công thì chỉrướ c lấ y sự ghen ghét mà thôi. Làm việ c gì cũng nên theo mênh lệ nh củ a ngườ i trên."
    },
    {
      "hexagram_id": 7,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Em gái vua chị u làm vợmộ t ngườ i hiề n trong giớ i bình dân, sẽ đượ c hưở ng phúc. Đấngđạ i nhânđượ c chính vị nên có thể làm tắ t cuộ c bĩ trong thiên hạ . Như ng vì cuộ c bĩchư a qua nên phả i tựră n mình.",
      "meaning_active": "Em gái vua chị u làm vợmộ t ngườ i hiề n trong giớ i bình dân, sẽ đượ c hưở ng phúc. Đấngđạ i nhânđượ c chính vị nên có thể làm tắ t cuộ c bĩ trong thiên hạ . Như ng vì cuộ c bĩchư a qua nên phả i tựră n mình."
    },
    {
      "hexagram_id": 7,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Cuộ c thái sắ p hế t, tình củ a kẻ trên ngườ i dướ i không thông nhau, dùng họ thì loạ n. Có ban lệ nh cũ ng không ai nghe. Cái việ c chuyể n nguy thành an, nế u không có tài thì sẽ không làm nỗ i. Bĩ nghiêng thì là thái rồ i.",
      "meaning_active": "Cuộ c thái sắ p hế t, tình củ a kẻ trên ngườ i dướ i không thông nhau, dùng họ thì loạ n. Có ban lệ nh cũ ng không ai nghe. Cái việ c chuyể n nguy thành an, nế u không có tài thì sẽ không làm nỗ i. Bĩ nghiêng thì là thái rồ i."
    },
    {
      "hexagram_id": 8,
      "line_number": 1,
      "relation": "",
      "meaning_static": "u ngườ i trên chư a tin, thì yên phậ n tự thủ. Dù mố i hạ i chư a rõ rệ t, quân tử có thể thấyđượ c cho nên mớiđi để tránh.",
      "meaning_active": "u ngườ i trên chư a tin, thì yên phậ n tự thủ. Dù mố i hạ i chư a rõ rệ t, quân tử có thể thấyđượ c cho nên mớiđi để tránh."
    },
    {
      "hexagram_id": 8,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Tuyở trên không cóứ ng việ n như ng lâu rồiắ t rõ, người trên phả i tự nhiên tìm nó và banơ n lộ c cho nó. Đấ ng quân tửbịkẻâm tố i làm hạ i như ng mà có cách tựxử , cho nênđượ c khỏ i mau chóng.",
      "meaning_active": "Tuyở trên không cóứ ng việ n như ng lâu rồiắ t rõ, người trên phả i tự nhiên tìm nó và banơ n lộ c cho nó. Đấ ng quân tửbịkẻâm tố i làm hạ i như ng mà có cách tựxử , cho nênđượ c khỏ i mau chóng."
    },
    {
      "hexagram_id": 8,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Thuậ n vớ i bề trên, cùng chí vớ i mọ i ngườ i, mọ i ngườ i tin theo, tố t. Không thể kíp chính, giế t kẻ đầ u ác và bài trừhủtụ c thì phải làm dầ n dầ n.",
      "meaning_active": "Thuậ n vớ i bề trên, cùng chí vớ i mọ i ngườ i, mọ i ngườ i tin theo, tố t. Không thể kíp chính, giế t kẻ đầ u ác và bài trừhủtụ c thì phải làm dầ n dầ n."
    },
    {
      "hexagram_id": 8,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Dùng cách bấ t chínhđể kiế m ngôi caođó là nguy. Kẻ gian tàđượ c lòng tin củ a vua là do cướp đượ c lòng họ . Biết che bớ t sự sáng củ a mình.",
      "meaning_active": "Dùng cách bấ t chínhđể kiế m ngôi caođó là nguy. Kẻ gian tàđượ c lòng tin củ a vua là do cướp đượ c lòng họ . Biết che bớ t sự sáng củ a mình."
    },
    {
      "hexagram_id": 8,
      "line_number": 5,
      "relation": "",
      "meaning_static": "n theo, nênđ em lòng thành thự c tin dùng thì tố t. Gỉ a cáchđ iênđể khỏ i bịhạ i. Tuy gặ p hoạ n nạ n mà sự sáng vẫn còn.",
      "meaning_active": "n theo, nênđ em lòng thành thự c tin dùng thì tố t. Gỉ a cáchđ iênđể khỏ i bịhạ i. Tuy gặ p hoạ n nạ n mà sự sáng vẫn còn."
    },
    {
      "hexagram_id": 9,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 9,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 9,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 9,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 9,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 9,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 10,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 10,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 10,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 10,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 10,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 10,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 11,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 11,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 11,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 11,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 11,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 11,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 12,
      "line_number": 1,
      "relation": "",
      "meaning_static": "i ta làm việ c,ắ t phả i cân nhắ c việcđó có thể làm rồimớ i quyế t. Đề phòng kẻ tiể u nhân từ lúc banđầ u thì nó không thể làm gì.",
      "meaning_active": "i ta làm việ c,ắ t phả i cân nhắ c việcđó có thể làm rồimớ i quyế t. Đề phòng kẻ tiể u nhân từ lúc banđầ u thì nó không thể làm gì."
    },
    {
      "hexagram_id": 12,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Lúc quân tử quyế t vớ i tiể u nhân, không thể quên sựrănngừ a. Kẻ \"gặ p\" khôngđượ c lòng thành, tứ c là trái vớiđạ o \"gặ p\". Khôngđế n phầ n khách",
      "meaning_active": "Lúc quân tử quyế t vớ i tiể u nhân, không thể quên sựrănngừ a. Kẻ \"gặ p\" khôngđượ c lòng thành, tứ c là trái vớiđạ o \"gặ p\". Khôngđế n phầ n khách"
    },
    {
      "hexagram_id": 12,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Nghe lờ i nói phả i mà biế t dùng, chỉ có kẻcươ ng minh mới làmđượ c. Làm ngườ i trên mà bịkẻd ướ i lìa bỏ,ắ t có hung biế n.",
      "meaning_active": "Nghe lờ i nói phả i mà biế t dùng, chỉ có kẻcươ ng minh mới làmđượ c. Làm ngườ i trên mà bịkẻd ướ i lìa bỏ,ắ t có hung biế n."
    },
    {
      "hexagram_id": 12,
      "line_number": 5,
      "relation": "",
      "meaning_static": "u qủ a quyế t mà quyế t vớ i nó, lạ i không làm sự quá dữ. Ngườ i hiềnởchốnẩ n cư , ngườ i trên nên lấyđạ o trung chính mà cầ u ngườ i hiề n.",
      "meaning_active": "u qủ a quyế t mà quyế t vớ i nó, lạ i không làm sự quá dữ. Ngườ i hiềnởchốnẩ n cư , ngườ i trên nên lấyđạ o trung chính mà cầ u ngườ i hiề n."
    },
    {
      "hexagram_id": 12,
      "line_number": 6,
      "relation": "",
      "meaning_static": "i quân tử đượ c thờ i, quyế t trừmộ t kẻ tiể u nhânđã nguycựcđiể m vậ y. Khôngđượ c gặ p kẻ đáng gặ p. Ngườ i ta gặ p nhau thì cầ n hòa thuậnđể tiế p nhau.",
      "meaning_active": "i quân tử đượ c thờ i, quyế t trừmộ t kẻ tiể u nhânđã nguycựcđiể m vậ y. Khôngđượ c gặ p kẻ đáng gặ p. Ngườ i ta gặ p nhau thì cầ n hòa thuậnđể tiế p nhau."
    },
    {
      "hexagram_id": 13,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 13,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 13,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 13,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 13,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 13,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 14,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 14,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 14,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 14,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 14,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 14,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 15,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 15,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 15,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 15,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 15,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 15,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 16,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 16,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 16,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 16,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 16,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 16,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 17,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 17,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 17,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 17,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 17,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 17,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 18,
      "line_number": 1,
      "relation": "",
      "meaning_static": "i hả m hiễ m, không thểtự mình vượ t qua,ắtđượcngườ i trên cứ u giúp thì có thểv ượ t qua sự khố n. Công dụ ng củ a giế ng doởnướ c nuôiđượ c ngườ i ta. Ngườ i tađươ ng lúc giúp cho mọ i ngườ i mà tài hèn thì bị đờ i ruồ ng bỏ vậ y.",
      "meaning_active": "i hả m hiễ m, không thểtự mình vượ t qua,ắtđượcngườ i trên cứ u giúp thì có thểv ượ t qua sự khố n. Công dụ ng củ a giế ng doởnướ c nuôiđượ c ngườ i ta. Ngườ i tađươ ng lúc giúp cho mọ i ngườ i mà tài hèn thì bị đờ i ruồ ng bỏ vậ y."
    },
    {
      "hexagram_id": 18,
      "line_number": 2,
      "relation": "",
      "meaning_static": "u màđấ ng quân tửvẫ n muố n là việ c làmơ n cho thiênhạ , khiế n cho thiên hạv ượ t qua cả nh khố n. Cuố i cùngđứccủ a họcũ ng thấ u tai ngườ i trên. Là kẻ có tài, có thể nuôi ngườ i giúp vậ t, mà phía trên không cóứ ng việ n, cho nên không thể đ i lên mà phảiđ i xuố ng, không thể dùngđượ c nữ a.",
      "meaning_active": "u màđấ ng quân tửvẫ n muố n là việ c làmơ n cho thiênhạ , khiế n cho thiên hạv ượ t qua cả nh khố n. Cuố i cùngđứccủ a họcũ ng thấ u tai ngườ i trên. Là kẻ có tài, có thể nuôi ngườ i giúp vậ t, mà phía trên không cóứ ng việ n, cho nên không thể đ i lên mà phảiđ i xuố ng, không thể dùngđượ c nữ a."
    },
    {
      "hexagram_id": 18,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Tiế n lui hayởlạiđề u khôngđượ c cả , chỉ còn có chế t mà thôi. Giế ng trong sạ ch mà khôngđượ c ngườ i dùngđế n tứ c là người có tài trí mà không đượ c dùng.",
      "meaning_active": "Tiế n lui hayởlạiđề u khôngđượ c cả , chỉ còn có chế t mà thôi. Giế ng trong sạ ch mà khôngđượ c ngườ i dùngđế n tứ c là người có tài trí mà không đượ c dùng."
    },
    {
      "hexagram_id": 18,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Tà không thể thắ ng chính Nế u chọ n kẻ thếlự c mà theo, thì là ác lớ n. Kẻ tài tuy khôngđủ thi thốrộ ng rãi, làm lợ i cho ngườ i, nhưng có thểtự giữlấ y mình.",
      "meaning_active": "Tà không thể thắ ng chính Nế u chọ n kẻ thếlự c mà theo, thì là ác lớ n. Kẻ tài tuy khôngđủ thi thốrộ ng rãi, làm lợ i cho ngườ i, nhưng có thểtự giữlấ y mình."
    },
    {
      "hexagram_id": 18,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Vua bị khố n vì thiên hạ không lạ i. Nế u có ngườ i cùng với thì không còn khố n. Giế ng phả i vọ t lên mớ i là thành công, chưa đế n bậ c trên thìchư a tớ i sự dùng.",
      "meaning_active": "Vua bị khố n vì thiên hạ không lạ i. Nế u có ngườ i cùng với thì không còn khố n. Giế ng phả i vọ t lên mớ i là thành công, chưa đế n bậ c trên thìchư a tớ i sự dùng."
    },
    {
      "hexagram_id": 18,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Dùng thành ýđể lôi kéo hiề n nhân thì không bị khố n nữ a. Thể theo công dụ ng củ a giế ng, raơ n rộ ng mà có thường độ , phibậ c ngườ i lớ n thì ai làm nỗ i?",
      "meaning_active": "Dùng thành ýđể lôi kéo hiề n nhân thì không bị khố n nữ a. Thể theo công dụ ng củ a giế ng, raơ n rộ ng mà có thường độ , phibậ c ngườ i lớ n thì ai làm nỗ i?"
    },
    {
      "hexagram_id": 19,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 19,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 19,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 19,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 19,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 19,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 20,
      "line_number": 1,
      "relation": "",
      "meaning_static": "có tài nế u không quanh co mà vộ i tiế n lên thì lâm vào tai nạ n. Chị u khó chờ thờ i. Phả i dùng hình phạ t trừ ng trịmớ i cở i mở cái gông cùmđượ c. Khi có kế t qủ a rồ i thì thôi,đừ ng quá dùng hình phạ t mà sẽânhậ n.",
      "meaning_active": "có tài nế u không quanh co mà vộ i tiế n lên thì lâm vào tai nạ n. Chị u khó chờ thờ i. Phả i dùng hình phạ t trừ ng trịmớ i cở i mở cái gông cùmđượ c. Khi có kế t qủ a rồ i thì thôi,đừ ng quá dùng hình phạ t mà sẽânhậ n."
    },
    {
      "hexagram_id": 20,
      "line_number": 2,
      "relation": "",
      "meaning_static": "(Khố n khổ , khó khă n nhưngườ i cở i ngự a còn dùng dằ ng,lẩ n quẩ n)",
      "meaning_active": "Đế n 10 nă m thì nạnđã lâu,ắ t phả i hanh thông. Bao dung kẻmờtố i, tố t. Dung nạ p hạ ng ngườ i nhu ám như đàn bà, tố t.Ở ngôi dướ i mà gánh vác việ c trên nhưngườ i con trai cai quả n việ c nhà."
    },
    {
      "hexagram_id": 20,
      "line_number": 3,
      "relation": "",
      "meaning_static": "i hươ u mà không có thợsă n giúp thì sẩ y vào rừng thôi.) Ngườ i quân tử hiể u cơsự ấ y thì bỏ đ i còn hơ n, cứ tiế p tụ c hànhđộ ng thì sẽhố i hậ n. Con gái theo ng ườ i phả i có chính lễ , vậ y mà ngườ i này thấ y kẻ nhiề u tiề n mà theo, không thể giữ đượ c thân mình, thì khôngđiđ âuđượ c lợ i.",
      "meaning_active": "i hươ u mà không có thợsă n giúp thì sẩ y vào rừng thôi.) Ngườ i quân tử hiể u cơsự ấ y thì bỏ đ i còn hơ n, cứ tiế p tụ c hànhđộ ng thì sẽhố i hậ n. Con gái theo ng ườ i phả i có chính lễ , vậ y mà ngườ i này thấ y kẻ nhiề u tiề n mà theo, không thể giữ đượ c thân mình, thì khôngđiđ âuđượ c lợ i."
    },
    {
      "hexagram_id": 20,
      "line_number": 4,
      "relation": "",
      "meaning_static": "c vớ i ngườ i trên mà tài không đủlướ t qua cảnh truân cho nên muố n tiế n lạ i thôi. Như ng nế u biế t người hiề n nhânởdướ i mà dùng, thì làm gì không đượ c? Chỉ nên tìm kẻcươ ng minh gầ n gũ i thì có thểvượ t qua. Hạng ngu tố i mà khôngđượ c gầ n ngườ i hiề n. 2",
      "meaning_active": "c vớ i ngườ i trên mà tài không đủlướ t qua cảnh truân cho nên muố n tiế n lạ i thôi. Như ng nế u biế t người hiề n nhânởdướ i mà dùng, thì làm gì không đượ c? Chỉ nên tìm kẻcươ ng minh gầ n gũ i thì có thểvượ t qua. Hạng ngu tố i mà khôngđượ c gầ n ngườ i hiề n. 2"
    },
    {
      "hexagram_id": 20,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Phả i lầ n lầ n chỉnhđố n các việ c nhỏ đã, nế u vộ i làm việclớ n thì hỏ ng. Trẻ thơchưađượ c mở mang, còn phả i nhờngườ i khác. Lấ y tư cách nhu thuậ n màở ngôi vua. Bỏ mình theo ngườ i.",
      "meaning_active": "Phả i lầ n lầ n chỉnhđố n các việ c nhỏ đã, nế u vộ i làm việclớ n thì hỏ ng. Trẻ thơchưađượ c mở mang, còn phả i nhờngườ i khác. Lấ y tư cách nhu thuậ n màở ngôi vua. Bỏ mình theo ngườ i."
    },
    {
      "hexagram_id": 20,
      "line_number": 6,
      "relation": "",
      "meaning_static": "c hiể m mà không có ng ườ i giúp. Cùng quẩn đếnnỗ i khóc ra máu mắt đầmđìa. Ở trên cùngđánh kẻtố i tă m. Như ng hànhđộ ng thái quá thìắt trởlạ i làm hạ i. Chỉ có ngă n sự cám dỗ bê nngoài,đểtừtừ xoadầ n nhữ ng mê muộ i bên trong. Lợ i vềsựchố ng giặ c, lài vì  kẻ trên ngườ i dướiđềuđồ ng thuậ n vớ i  mình.",
      "meaning_active": "c hiể m mà không có ng ườ i giúp. Cùng quẩn đếnnỗ i khóc ra máu mắt đầmđìa. Ở trên cùngđánh kẻtố i tă m. Như ng hànhđộ ng thái quá thìắt trởlạ i làm hạ i. Chỉ có ngă n sự cám dỗ bê nngoài,đểtừtừ xoadầ n nhữ ng mê muộ i bên trong. Lợ i vềsựchố ng giặ c, lài vì  kẻ trên ngườ i dướiđềuđồ ng thuậ n vớ i  mình."
    },
    {
      "hexagram_id": 21,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 21,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 21,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 21,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 21,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 21,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 22,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 22,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 22,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 22,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 22,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 22,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 23,
      "line_number": 1,
      "relation": "",
      "meaning_static": "đợ i vì gặ p chỗ hiể m, cho nênđợ i rồ i mớ i tiế n. Kẻ ởnơirộ ng xa, không dám xông pha vào chỗ hiể m nạ n màđ i. Nhu nhượcởdướ i, tài không thể kiệ n, dẫ u không kéo dài công việ c củ a mình, màđã kiệ n rồ i,ắ t có hạ i nhỏ , cho nên mắ c phải tai tiế ng.",
      "meaning_active": "đợ i vì gặ p chỗ hiể m, cho nênđợ i rồ i mớ i tiế n. Kẻ ởnơirộ ng xa, không dám xông pha vào chỗ hiể m nạ n màđ i. Nhu nhượcởdướ i, tài không thể kiệ n, dẫ u không kéo dài công việ c củ a mình, màđã kiệ n rồ i,ắ t có hạ i nhỏ , cho nên mắ c phải tai tiế ng."
    },
    {
      "hexagram_id": 23,
      "line_number": 2,
      "relation": "",
      "meaning_static": "n dầ n gầ n chỗ hiể m, tuy chư a phả i lo sợ , nhưngđã hơi có tiế ng luậ n bàn. Cươ ng trung mà biế t chờ đợ i thì sau chótđượ c tố t. Phả i trố n, là cố t tránh chỗ làm kẻ đốiđị ch. Từdướ i kiệ n lên, hoạ n nạ n tớ i. Khôngđượ c kiệ n.",
      "meaning_active": "n dầ n gầ n chỗ hiể m, tuy chư a phả i lo sợ , nhưngđã hơi có tiế ng luậ n bàn. Cươ ng trung mà biế t chờ đợ i thì sau chótđượ c tố t. Phả i trố n, là cố t tránh chỗ làm kẻ đốiđị ch. Từdướ i kiệ n lên, hoạ n nạ n tớ i. Khôngđượ c kiệ n."
    },
    {
      "hexagram_id": 23,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Phả i chờ đợ i rồ i sẽ tiế n. Không phả i là ră n ngườ i ta khôngđượ c tiế n, chỉ muố n khiế n cho ngườ i ta chớ đểlỗ i mấ t cơ nghi mà thôi. Lấyđứ c và nhân nghĩ a xửxự theo bả n lãnh sẵ n có củ a mình mà kiên cốtự giữ . Tuyởchỗ hiể m nghèo mà lo lắ ng thì sau chót đượ c tố t lành.",
      "meaning_active": "Phả i chờ đợ i rồ i sẽ tiế n. Không phả i là ră n ngườ i ta khôngđượ c tiế n, chỉ muố n khiế n cho ngườ i ta chớ đểlỗ i mấ t cơ nghi mà thôi. Lấyđứ c và nhân nghĩ a xửxự theo bả n lãnh sẵ n có củ a mình mà kiên cốtự giữ . Tuyởchỗ hiể m nghèo mà lo lắ ng thì sau chót đượ c tố t lành."
    },
    {
      "hexagram_id": 23,
      "line_number": 4,
      "relation": "",
      "meaning_static": "trong hiể m nạ n, không thểcố ở , cho nên tự hang chui ra. Xuôi thuậnđể nghe theo thờ i. Ở yên, giữ đượ c hòa thuậ n là tố t. Cứ ng mạ nh mà không trung chính, thì hay nóng nả y hànhđộ ng thì không yên.",
      "meaning_active": "trong hiể m nạ n, không thểcố ở , cho nên tự hang chui ra. Xuôi thuậnđể nghe theo thờ i. Ở yên, giữ đượ c hòa thuậ n là tố t. Cứ ng mạ nh mà không trung chính, thì hay nóng nả y hànhđộ ng thì không yên."
    },
    {
      "hexagram_id": 23,
      "line_number": 5,
      "relation": "",
      "meaning_static": "ở yên màđợ i. Nế u là ngườ i xử kiệ n thì là bậ c hiềnđứ c, nế u là ngườiđ i kiện thì gặ p quan tòa công minh, không gì tố t bằ ng.",
      "meaning_active": "ở yên màđợ i. Nế u là ngườ i xử kiệ n thì là bậ c hiềnđứ c, nế u là ngườiđ i kiện thì gặ p quan tòa công minh, không gì tố t bằ ng."
    },
    {
      "hexagram_id": 23,
      "line_number": 6,
      "relation": "",
      "meaning_static": "xem gặ p chỗ hãm hiể m, như ng vớ i nhữ ng ngườ i phi ý màđế n, cứ kính trọ ng màđãi lạ i họ , thì sauđượ c tố t. Kẻrấ t thích kiệ n và dù may mắ n thắ ng kiệ n thì chẳ ng bao lâusẽmấ t hế t. Kế t qủ a vẫ n là tay không.",
      "meaning_active": "xem gặ p chỗ hãm hiể m, như ng vớ i nhữ ng ngườ i phi ý màđế n, cứ kính trọ ng màđãi lạ i họ , thì sauđượ c tố t. Kẻrấ t thích kiệ n và dù may mắ n thắ ng kiệ n thì chẳ ng bao lâusẽmấ t hế t. Kế t qủ a vẫ n là tay không."
    },
    {
      "hexagram_id": 24,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 24,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 24,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 24,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 24,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 24,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 25,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 25,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 25,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 25,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 25,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 25,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 26,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 26,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 26,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 26,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 26,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 26,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 27,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 27,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 27,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 27,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 27,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 27,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 28,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 28,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 28,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 28,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 28,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 28,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 29,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Biế t ngă n sự tiế n mớiđượ c không lỗ i. Khônglượ ng tài lự c mà tiế n, rút lạ i, chư a thểtự mình tiế n lên.",
      "meaning_active": "Biế t ngă n sự tiế n mớiđượ c không lỗ i. Khônglượ ng tài lự c mà tiế n, rút lạ i, chư a thểtự mình tiế n lên."
    },
    {
      "hexagram_id": 29,
      "line_number": 2,
      "relation": "",
      "meaning_static": "y theo vậ t khác thì mấ t cái sở thủcủ a mình. Khôngchị u trọngđãi ngườ i hiềnđể thi hành cáiđạ o củ a mình.Chớ đuổ i, tự nhiên sẽ đượ c.Cứ ng quá thì hay xúc phạ m ngườ i trên.Đươ ng thì khó nhọ c, kẻ nhờcậyđượ c là bề tôi có tài, càng nên hế t lòng kính thuậ n.",
      "meaning_active": "y theo vậ t khác thì mấ t cái sở thủcủ a mình. Khôngchị u trọngđãi ngườ i hiềnđể thi hành cáiđạ o củ a mình.Chớ đuổ i, tự nhiên sẽ đượ c.Cứ ng quá thì hay xúc phạ m ngườ i trên.Đươ ng thì khó nhọ c, kẻ nhờcậyđượ c là bề tôi có tài, càng nên hế t lòng kính thuậ n."
    },
    {
      "hexagram_id": 29,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Việ c trong thiên hạ đã xong, màđ i xađánh kẻbạ o loạ n. Oai vũtớiđượ c, mà lấ y sựcứ u dân làm lòng. Chớ dùng kẻ tiể u nhân, vỉkẻ tiể u nhân có ý tham.Ởchỗ hiể m không cóđồ dùngđể ra chỗ hiể m màđ i thì hung.Ắ t phả i ra khỏ i chỗ hiểmđã, rồ i mớiđiđượ c. Kẻ đ i có thểvượtnướ c mà không thể đ i cạ n.",
      "meaning_active": "Việ c trong thiên hạ đã xong, màđ i xađánh kẻbạ o loạ n. Oai vũtớiđượ c, mà lấ y sựcứ u dân làm lòng. Chớ dùng kẻ tiể u nhân, vỉkẻ tiể u nhân có ý tham.Ởchỗ hiể m không cóđồ dùngđể ra chỗ hiể m màđ i thì hung.Ắ t phả i ra khỏ i chỗ hiểmđã, rồ i mớiđiđượ c. Kẻ đ i có thểvượtnướ c mà không thể đ i cạ n."
    },
    {
      "hexagram_id": 29,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Trọ n ngày ră n sợ , là thườ ng ngờrằ ng vạ lo sắ p tớ i. Làm cho thiên hạ quá sự gian nan, nế u không có tài lớ n thì không làm nỗ i.",
      "meaning_active": "Trọ n ngày ră n sợ , là thườ ng ngờrằ ng vạ lo sắ p tớ i. Làm cho thiên hạ quá sự gian nan, nế u không có tài lớ n thì không làm nỗ i."
    },
    {
      "hexagram_id": 29,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Thị nh soạ n không bằngđơ n sơ . Trố ng rỗ ng trong lòngđểcầ u kẻdướ i giúp mình.",
      "meaning_active": "Thị nh soạ n không bằngđơ n sơ . Trố ng rỗ ng trong lòngđểcầ u kẻdướ i giúp mình."
    },
    {
      "hexagram_id": 30,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 30,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 30,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 30,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 30,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 30,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 31,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 31,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 31,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 31,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 31,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 31,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 32,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 32,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 32,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 32,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 32,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 32,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 33,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 33,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 33,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 33,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 33,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 33,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 34,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 34,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 34,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 34,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 34,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 34,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 35,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 35,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 35,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 35,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 35,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 35,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 36,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 36,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 36,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 36,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 36,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 36,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 37,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 37,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 37,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 37,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 37,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 37,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 38,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 38,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 38,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 38,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 38,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 38,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 39,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 39,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 39,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 39,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 39,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 39,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 40,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Cuộ c tan cứ u vớ t từ lúcđầ u, thì dễ dùng sứ c, vì là thì thuậ n. Ră n nó giữ gìn cẩ n thậ n.",
      "meaning_active": "Cuộ c tan cứ u vớ t từ lúcđầ u, thì dễ dùng sứ c, vì là thì thuậ n. Ră n nó giữ gìn cẩ n thậ n."
    },
    {
      "hexagram_id": 40,
      "line_number": 2,
      "relation": "",
      "meaning_static": "ng thì lìa tan màở trong chỗ hiể m. Nế u mà có thể chạ y tớ i chỗ yên thì tố t. Sự dè dặ t bấ t chính, như keo cú vềsự dùng, nhút nhát về việc làm.",
      "meaning_active": "ng thì lìa tan màở trong chỗ hiể m. Nế u mà có thể chạ y tớ i chỗ yên thì tố t. Sự dè dặ t bấ t chính, như keo cú vềsự dùng, nhút nhát về việc làm."
    },
    {
      "hexagram_id": 40,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Tài không trung chính, lênở vào chỗ không ngôi, há cứu đượ c sự lìa tan trong thì mình mà để ơ n tớ i ngườ i ta? Chẳ ng dè dặ t thì than thởvậ y,ấ y là tự mình làm ra không thể đổlỗ i cho ai. Dè dặ t thì có thể khỏ i lỗ i.",
      "meaning_active": "Tài không trung chính, lênở vào chỗ không ngôi, há cứu đượ c sự lìa tan trong thì mình mà để ơ n tớ i ngườ i ta? Chẳ ng dè dặ t thì than thởvậ y,ấ y là tự mình làm ra không thể đổlỗ i cho ai. Dè dặ t thì có thể khỏ i lỗ i."
    },
    {
      "hexagram_id": 40,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Vua tôi hợ p sứcđểcứ u vớ t cuộ c tan cho thiên hạ . Lạ i nói tanđượcđàn nhỏ, để làm nênđàn lớ n, thìđó không phả i là việ c mà ngườ i tầ m thườ ng nghĩ đượ c tớ i nơ i. Nướ c tràn lên là không tiết độ , chẩ y xuố ng là có tiếtđộ . Không phả i gượ ng mà dè dặ t, tứ c là yên lòng vớ i sự dè dặ t.",
      "meaning_active": "Vua tôi hợ p sứcđểcứ u vớ t cuộ c tan cho thiên hạ . Lạ i nói tanđượcđàn nhỏ, để làm nênđàn lớ n, thìđó không phả i là việ c mà ngườ i tầ m thườ ng nghĩ đượ c tớ i nơ i. Nướ c tràn lên là không tiết độ , chẩ y xuố ng là có tiếtđộ . Không phả i gượ ng mà dè dặ t, tứ c là yên lòng vớ i sự dè dặ t."
    },
    {
      "hexagram_id": 40,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Vua tôi hợ p sứ c, nhún thuậ n chữ a cuộ c tan làđúng cáchrồ i, chỉcố t làm cho thấ m khắ p lòng ngườ i thì họ thuận theo. Ở mình thì yên lòng mà làm thiên hạ thìđẹ p lòng mà theo,đó là cuộ c dè dặ t ngọ t ngon. Sự dè dặ t lấ y vừ a phả i làm qúi.",
      "meaning_active": "Vua tôi hợ p sứ c, nhún thuậ n chữ a cuộ c tan làđúng cáchrồ i, chỉcố t làm cho thấ m khắ p lòng ngườ i thì họ thuận theo. Ở mình thì yên lòng mà làm thiên hạ thìđẹ p lòng mà theo,đó là cuộ c dè dặ t ngọ t ngon. Sự dè dặ t lấ y vừ a phả i làm qúi."
    },
    {
      "hexagram_id": 40,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Thì tan, lấ y sựhợpđượ c là có công, cho nên lấ y sự ra khỏ i cuộ c tan, xađượcđiề u hạ i là hay. Sự dè dặtđã khổ mà cố giữ thì hung.",
      "meaning_active": "Thì tan, lấ y sựhợpđượ c là có công, cho nên lấ y sự ra khỏ i cuộ c tan, xađượcđiề u hạ i là hay. Sự dè dặtđã khổ mà cố giữ thì hung."
    },
    {
      "hexagram_id": 41,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 41,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 41,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 41,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 41,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 41,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 42,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 42,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 42,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 42,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 42,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 42,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 43,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 43,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 43,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 43,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 43,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 43,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 44,
      "line_number": 1,
      "relation": "",
      "meaning_static": "m còn nông, chưa đủ tiế n lên. Cầ u ngườ i trên 1 cách sâu sắ c mà không biết đắnđ o tình thế.Đó là đạ o hung.",
      "meaning_active": "m còn nông, chưa đủ tiế n lên. Cầ u ngườ i trên 1 cách sâu sắ c mà không biết đắnđ o tình thế.Đó là đạ o hung."
    },
    {
      "hexagram_id": 44,
      "line_number": 2,
      "relation": "",
      "meaning_static": "i cóđứ c trung chính thì có thể ở yên nơ i chố n của mình vìđộ ng thì hung.  Kẻ nóng nả y thì làm cànđạ i. Biếtđượ c trọ ng khinh, cử độ ng chừ ng mự c thì không bị ă n nă n.",
      "meaning_active": "i cóđứ c trung chính thì có thể ở yên nơ i chố n của mình vìđộ ng thì hung.  Kẻ nóng nả y thì làm cànđạ i. Biếtđượ c trọ ng khinh, cử độ ng chừ ng mự c thì không bị ă n nă n."
    },
    {
      "hexagram_id": 44,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Có tánh cúng nóng, mà không biế t tự giữ mà chí lạ i thích theo ngườ i,ấ y là hèn thấ p vậ y. Đượ c chỗ thườ ng mà không chịuở thì sựhổnhụ c cũ ng tớ i.",
      "meaning_active": "Có tánh cúng nóng, mà không biế t tự giữ mà chí lạ i thích theo ngườ i,ấ y là hèn thấ p vậ y. Đượ c chỗ thườ ng mà không chịuở thì sựhổnhụ c cũ ng tớ i."
    },
    {
      "hexagram_id": 44,
      "line_number": 4,
      "relation": "",
      "meaning_static": "i tỏ cáiđạ o liề n muố n tính cái công ví  như thấyđứ a trẻ ngã vào trong giế ng, vừ a muố n cứ u nó, vừ a muố n cha mẹ nó khen mình tửtế , chưađượ c sáng lớ n vì không hợ p lẽtự nhiên. Sự làm củ a ngườ i ta hễ mà phảiđạ o thì lâu mãi sẽ thành công,nế u không phảiđạ o, dù lâu mà có ích gì?Ở không phả i ngôi, không phả i chỗ , dẫ u thườ ng theo giữ có ích gì?",
      "meaning_active": "i tỏ cáiđạ o liề n muố n tính cái công ví  như thấyđứ a trẻ ngã vào trong giế ng, vừ a muố n cứ u nó, vừ a muố n cha mẹ nó khen mình tửtế , chưađượ c sáng lớ n vì không hợ p lẽtự nhiên. Sự làm củ a ngườ i ta hễ mà phảiđạ o thì lâu mãi sẽ thành công,nế u không phảiđạ o, dù lâu mà có ích gì?Ở không phả i ngôi, không phả i chỗ , dẫ u thườ ng theo giữ có ích gì?"
    },
    {
      "hexagram_id": 44,
      "line_number": 5,
      "relation": "",
      "meaning_static": "u tráiđượ c lòng riêng, kẻcả m không phả i là người mìnhđã trông thấ y màđẹ p lòng, thìđượ c chínhđạ o. Tuy không vướ ng víu lòng riêng, như ng không thểcả m người thì chí củ a nó nhỏnhặ t lắ m. Đàn bà lấ y sự theo làmđạ o chính Nếuđấ ng trượ ng phu cũnglấ y sự thuậ n theo ngườ i ta làm nế t thườ ng, thì là mấ t sự chínhđính củ a mình, vậ y là hung.",
      "meaning_active": "u tráiđượ c lòng riêng, kẻcả m không phả i là người mìnhđã trông thấ y màđẹ p lòng, thìđượ c chínhđạ o. Tuy không vướ ng víu lòng riêng, như ng không thểcả m người thì chí củ a nó nhỏnhặ t lắ m. Đàn bà lấ y sự theo làmđạ o chính Nếuđấ ng trượ ng phu cũnglấ y sự thuậ n theo ngườ i ta làm nế t thườ ng, thì là mấ t sự chínhđính củ a mình, vậ y là hung."
    },
    {
      "hexagram_id": 44,
      "line_number": 6,
      "relation": "",
      "meaning_static": "m ngườ i bằ ng lờ i nói mà không có sự thậ t thì háđộngđượ c ngườ i. Xố c làđộ ng 1 cách nhanh chóng. Nế u mà nóngđộ ng bất thườ ng thì còn nênđượ c trò gì? Sự thườngđã cùng tộ t thànhbấ t thườ ng.",
      "meaning_active": "m ngườ i bằ ng lờ i nói mà không có sự thậ t thì háđộngđượ c ngườ i. Xố c làđộ ng 1 cách nhanh chóng. Nế u mà nóngđộ ng bất thườ ng thì còn nênđượ c trò gì? Sự thườngđã cùng tộ t thànhbấ t thườ ng."
    },
    {
      "hexagram_id": 45,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 45,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 45,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 45,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 45,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 45,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 46,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 46,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 46,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 46,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 46,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 47,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 47,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 47,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 47,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 47,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 47,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 48,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 48,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 48,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 48,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 48,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 48,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 49,
      "line_number": 1,
      "relation": "",
      "meaning_static": "đế n nơ i mà biế t lo hãi thì sẽ không có vạ lo, nhân sự lo sợ màđượ c phúc. Đángđậ u màđ i, không phả i là chính.",
      "meaning_active": "đế n nơ i mà biế t lo hãi thì sẽ không có vạ lo, nhân sự lo sợ màđượ c phúc. Đángđậ u màđ i, không phả i là chính."
    },
    {
      "hexagram_id": 49,
      "line_number": 2,
      "relation": "",
      "meaning_static": "i làđ i theo vậ t khác, thế là mấ t sựtự thủ , cho nên rănrằ ng chớ đuổ i. Nói không nghe, đạ o không thự c hành, cho nên lòng nó khôngs ướ ng.",
      "meaning_active": "i làđ i theo vậ t khác, thế là mấ t sựtự thủ , cho nên rănrằ ng chớ đuổ i. Nói không nghe, đạ o không thự c hành, cho nên lòng nó khôngs ướ ng."
    },
    {
      "hexagram_id": 49,
      "line_number": 3,
      "relation": "",
      "meaning_static": "u nhân sựnhứ c sợ mà biế t bỏ tà theo chính thì sẽ đượctố t. Cố đậ u không thể tiế n lui, lo vềsự hiể m nghèo thườ ng hunđốt trong lòng.",
      "meaning_active": "u nhân sựnhứ c sợ mà biế t bỏ tà theo chính thì sẽ đượctố t. Cố đậ u không thể tiế n lui, lo vềsự hiể m nghèo thườ ng hunđốt trong lòng."
    },
    {
      "hexagram_id": 49,
      "line_number": 4,
      "relation": "",
      "meaning_static": "không thểtự mình phấ n chấ n, cho nên nói \"chìm đắ m\", há có thể sáng. Không thể làm cho thiên hạ cùngđậ u, mà chỉ đậuđượ c thân mình, hàđủxứ ng ngôiđạ i thầ n?",
      "meaning_active": "không thểtự mình phấ n chấ n, cho nên nói \"chìm đắ m\", há có thể sáng. Không thể làm cho thiên hạ cùngđậ u, mà chỉ đậuđượ c thân mình, hàđủxứ ng ngôiđạ i thầ n?"
    },
    {
      "hexagram_id": 49,
      "line_number": 5,
      "relation": "",
      "meaning_static": "i lên thì nó vố n là mề m,đ i xuố ng thì phạ m vào kẻcứ ng.Kẻ xem không mấtđứ c giữ a, tuy có nguy cũ ng không sao. Cái mà ngườ i ta cầ n phả i cẩ n thậ n là nói và làm. Nói ra bằng cách khinh xuấ t thì xấ u.",
      "meaning_active": "i lên thì nó vố n là mề m,đ i xuố ng thì phạ m vào kẻcứ ng.Kẻ xem không mấtđứ c giữ a, tuy có nguy cũ ng không sao. Cái mà ngườ i ta cầ n phả i cẩ n thậ n là nói và làm. Nói ra bằng cách khinh xuấ t thì xấ u."
    },
    {
      "hexagram_id": 49,
      "line_number": 6,
      "relation": "",
      "meaning_static": "ngác là dáng tan tác. Biế t lo sợ trướ c khi nó chư a tới mình thì khôngđế n nỗ i cùng cự c. Sự đậ u củ a ngườ i ta có chỉ khó giữ lâu tớ i chót, cho nên tiết tháo khi về già thìđổ i, công việ c có khiđế n lâu thì hỏ ng.",
      "meaning_active": "ngác là dáng tan tác. Biế t lo sợ trướ c khi nó chư a tới mình thì khôngđế n nỗ i cùng cự c. Sự đậ u củ a ngườ i ta có chỉ khó giữ lâu tớ i chót, cho nên tiết tháo khi về già thìđổ i, công việ c có khiđế n lâu thì hỏ ng."
    },
    {
      "hexagram_id": 50,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 50,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 50,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 50,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 50,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 50,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 51,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 51,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 51,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 51,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 51,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 51,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 52,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Tiể u nhân lấ n quân tử thậ t là hung. Dùng gi ườ ng làm \"tượ ng\" tượ ng trư ng chỗ mìnhở.Đẽođế n góc giườ ng rồ i. Tuy lầ m lỗ i như ng chẳ ng bao lâu lạ i trởlạ i tố t lành ngay. Chưađ i xa màđã trởlạ i conđườ ng thiệ n thì tố t.",
      "meaning_active": "Tiể u nhân lấ n quân tử thậ t là hung. Dùng gi ườ ng làm \"tượ ng\" tượ ng trư ng chỗ mìnhở.Đẽođế n góc giườ ng rồ i. Tuy lầ m lỗ i như ng chẳ ng bao lâu lạ i trởlạ i tố t lành ngay. Chưađ i xa màđã trởlạ i conđườ ng thiệ n thì tố t."
    },
    {
      "hexagram_id": 52,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Tiể u nhân lấ n quân tử.Đươ ng lúc tiêu bác mà không có phe cánh, tựtồ n saođượ c. Biế t nhườ ng ngườ i nhânđứ c,đó là hànhđộ ng tốtđẹ p.",
      "meaning_active": "Tiể u nhân lấ n quân tử.Đươ ng lúc tiêu bác mà không có phe cánh, tựtồ n saođượ c. Biế t nhườ ng ngườ i nhânđứ c,đó là hànhđộ ng tốtđẹ p."
    },
    {
      "hexagram_id": 52,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Có bụ ng theo về đườ ng chính, như thế không lỗ i. Bỏ bèđả ng mà theo kẻ ngay là không lỗ i. Luôn luônđánh mấ t nên mớ i nguy, trởlạ i thì không sao.",
      "meaning_active": "Có bụ ng theo về đườ ng chính, như thế không lỗ i. Bỏ bèđả ng mà theo kẻ ngay là không lỗ i. Luôn luônđánh mấ t nên mớ i nguy, trởlạ i thì không sao."
    },
    {
      "hexagram_id": 52,
      "line_number": 4,
      "relation": "",
      "meaning_static": "o chân giườ ng dầ n dầnđế n da. Da là bề ngoài thân thể , tứ c là sắ p diệ t thân thể cho nên gọ i là hung. Đ i vớ i nhiề u ngườ i mà mộ t mình biế t theođườ ng thiệ n.",
      "meaning_active": "o chân giườ ng dầ n dầnđế n da. Da là bề ngoài thân thể , tứ c là sắ p diệ t thân thể cho nên gọ i là hung. Đ i vớ i nhiề u ngườ i mà mộ t mình biế t theođườ ng thiệ n."
    },
    {
      "hexagram_id": 52,
      "line_number": 5,
      "relation": "",
      "meaning_static": "t bà hoàng hậuđ em bầ y cung phi hầ u vua, không gì mà không lợ i. Phía dướ i không kẻ giúpđỡ , biế t dố c lòng phụ c thiệ n thì không phảiă n nă n.",
      "meaning_active": "t bà hoàng hậuđ em bầ y cung phi hầ u vua, không gì mà không lợ i. Phía dướ i không kẻ giúpđỡ , biế t dố c lòng phụ c thiệ n thì không phảiă n nă n."
    },
    {
      "hexagram_id": 52,
      "line_number": 6,
      "relation": "",
      "meaning_static": "u bọ n tiể u nhân phá sậ p nhàđó làđạ o quân tửbị tiêu diệ t, quố c gia suy vong. Cái gì cự c thị nh thì trởlạ i thăngbằngđểtựtồ n. Kẻ tiể u nhân hôn mêđế n cự c cùng, không biế t trởlạ i nên bị đủ tai vạ.Ở trên muố n dùng võ lựcđàn áp như ng rố t cuộ c bị đạibạ i, gây vạ chođấ t nướ c.",
      "meaning_active": "u bọ n tiể u nhân phá sậ p nhàđó làđạ o quân tửbị tiêu diệ t, quố c gia suy vong. Cái gì cự c thị nh thì trởlạ i thăngbằngđểtựtồ n. Kẻ tiể u nhân hôn mêđế n cự c cùng, không biế t trởlạ i nên bị đủ tai vạ.Ở trên muố n dùng võ lựcđàn áp như ng rố t cuộ c bị đạibạ i, gây vạ chođấ t nướ c."
    },
    {
      "hexagram_id": 53,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 53,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 53,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 53,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 53,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 53,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 54,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 54,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 54,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 54,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 54,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 54,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 55,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 55,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 55,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 55,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 55,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 55,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 56,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 56,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 56,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 56,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 56,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 56,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 57,
      "line_number": 1,
      "relation": "",
      "meaning_static": "i mà theo nhau thì sẽ làm nên cuộ c thị nh. Chung cùngvớ i ngườ i ta mà sứcđề u nhau thì cố t hạ mìnhđể tìm nhau. Ở thì kỵlữ , lạiở vào dướ i thấ p,ấ y là ngườ i nhu nhượ c. Người có bụ ng dạhẹ p hòi dễ làm chuyệ n bỉ ổ i,đưađế n rướ c nhụcvậ y.",
      "meaning_active": "i mà theo nhau thì sẽ làm nên cuộ c thị nh. Chung cùngvớ i ngườ i ta mà sứcđề u nhau thì cố t hạ mìnhđể tìm nhau. Ở thì kỵlữ , lạiở vào dướ i thấ p,ấ y là ngườ i nhu nhượ c. Người có bụ ng dạhẹ p hòi dễ làm chuyệ n bỉ ổ i,đưađế n rướ c nhụcvậ y."
    },
    {
      "hexagram_id": 57,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Cánh tay phả i là cái ngườ i ta hay dùng, nó bị gãy rồ i thì còn làm gìđượ c nữ a. Tự cao thì không thuậ n vớ i ngườ i trên. Họ đố t cháy chỗ trọ làmấ t chỗ yên. Quá cứ ng thì tàn bạ o vớ i kẻdướ i tứ c làm mất lòng họ.",
      "meaning_active": "Cánh tay phả i là cái ngườ i ta hay dùng, nó bị gãy rồ i thì còn làm gìđượ c nữ a. Tự cao thì không thuậ n vớ i ngườ i trên. Họ đố t cháy chỗ trọ làmấ t chỗ yên. Quá cứ ng thì tàn bạ o vớ i kẻdướ i tứ c làm mất lòng họ."
    },
    {
      "hexagram_id": 57,
      "line_number": 4,
      "relation": "",
      "meaning_static": "ngôi cao màđượ c ngườ i hiề n tài giúp thì tố t lắ m. Nếu không trung chính mà gặ p phả i vua nhu nhượ c thì nên xuố ng. Khôngđượ c lòng ngườ i trên mà chỉ đượ c lòng kẻdướ i thì không thể trổhế t tài mình.",
      "meaning_active": "ngôi cao màđượ c ngườ i hiề n tài giúp thì tố t lắ m. Nếu không trung chính mà gặ p phả i vua nhu nhượ c thì nên xuố ng. Khôngđượ c lòng ngườ i trên mà chỉ đượ c lòng kẻdướ i thì không thể trổhế t tài mình."
    },
    {
      "hexagram_id": 57,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Vua tuy ít tài như ng biế t gầ n bậ c hiề n tài thì vẫ n có thể làm phúc cho thiên hạ. Ông vua không nên có lữ hành vì nhưvậ y là mấ t ngôi. Vua cóđứ c thì lố i kéođượ c ngườ i chung quanh.",
      "meaning_active": "Vua tuy ít tài như ng biế t gầ n bậ c hiề n tài thì vẫ n có thể làm phúc cho thiên hạ. Ông vua không nên có lữ hành vì nhưvậ y là mấ t ngôi. Vua cóđứ c thì lố i kéođượ c ngườ i chung quanh."
    },
    {
      "hexagram_id": 57,
      "line_number": 6,
      "relation": "",
      "meaning_static": "mình tuyệ t vớ i ngườ i ta thì còn cùng vớ i, gầ n vớ i.Ở ngôi cao mà bị đơnđộ c. Nhún mề m ôn hòa mớ i giữ đượ c thân mình. Nế u quá cứ ng tự cao thì sẽmấ t chỗ yên.",
      "meaning_active": "mình tuyệ t vớ i ngườ i ta thì còn cùng vớ i, gầ n vớ i.Ở ngôi cao mà bị đơnđộ c. Nhún mề m ôn hòa mớ i giữ đượ c thân mình. Nế u quá cứ ng tự cao thì sẽmấ t chỗ yên."
    },
    {
      "hexagram_id": 58,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 58,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 58,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 58,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 58,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 58,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 59,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 59,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 59,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 59,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 59,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 59,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 60,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Có ít khảnă ng mà không cóứ ng việ n thì chư a thể tiếnđượ c. Nạnđã giả i rồ i thì nên yên tỉ nh nghỉngơ i.",
      "meaning_active": "Có ít khảnă ng mà không cóứ ng việ n thì chư a thể tiếnđượ c. Nạnđã giả i rồ i thì nên yên tỉ nh nghỉngơ i."
    },
    {
      "hexagram_id": 60,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Tuy gặ p khó khă n như ng chí muố n giúp ngườ i vượ t qua khó khă n nên về sau không bịlầ m lỗ i. Vua tin dùng kẻ gian tà thì ngườ i quân tử không làm gìđượ c. Trừbỏkẻ tà ác khiếnđạ o trung chính có thể thự c hànhđượ c.",
      "meaning_active": "Tuy gặ p khó khă n như ng chí muố n giúp ngườ i vượ t qua khó khă n nên về sau không bịlầ m lỗ i. Vua tin dùng kẻ gian tà thì ngườ i quân tử không làm gìđượ c. Trừbỏkẻ tà ác khiếnđạ o trung chính có thể thự c hànhđượ c."
    },
    {
      "hexagram_id": 60,
      "line_number": 3,
      "relation": "",
      "meaning_static": "p lúc khó khă n màđượ c lòng kẻdướ i thì có thểcầu đượ c yênổ n. Tài hèn thì không nên làm việ c lớ n.Đứ c không xứ ng vớiđồ dùng, thì giặ c cướpđế n là do mình mờ i nóđế n.",
      "meaning_active": "p lúc khó khă n màđượ c lòng kẻdướ i thì có thểcầu đượ c yênổ n. Tài hèn thì không nên làm việ c lớ n.Đứ c không xứ ng vớiđồ dùng, thì giặ c cướpđế n là do mình mờ i nóđế n."
    },
    {
      "hexagram_id": 60,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Biế t liên hợ p vớ i mọ i ngườ i làđạ o xử lý lúc khó khă n. Ở ngôi trên thì không nên gầ n gũ i kẻ tiể u nhân.Đượ c nhưvậy thì quân tử tìmđế n.",
      "meaning_active": "Biế t liên hợ p vớ i mọ i ngườ i làđạ o xử lý lúc khó khă n. Ở ngôi trên thì không nên gầ n gũ i kẻ tiể u nhân.Đượ c nhưvậy thì quân tử tìmđế n."
    },
    {
      "hexagram_id": 60,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Trên dướiđề u trung chính mà không v ượ t quađượ c khó khă n là vì tài chưa đủ . Nên cầ n ngườ i giúp. Kẻ tiể u nhân lui xuố ng thìđấ ng quân tử tiế n lên.",
      "meaning_active": "Trên dướiđề u trung chính mà không v ượ t quađượ c khó khă n là vì tài chưa đủ . Nên cầ n ngườ i giúp. Kẻ tiể u nhân lui xuố ng thìđấ ng quân tử tiế n lên."
    },
    {
      "hexagram_id": 60,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Trong lúc khó khă n nhiề u mà cóđứ c nên có ngườ i giúp màvượ t khóđượ c. Kẻ tiể u nhân là gố c sinh nạ n, cho nên sau khi giả i nạ n nên nghĩ việ c trừkẻxấ u. Nế u không trừ đượ c làđiềuđáng phả i lo sợ.",
      "meaning_active": "Trong lúc khó khă n nhiề u mà cóđứ c nên có ngườ i giúp màvượ t khóđượ c. Kẻ tiể u nhân là gố c sinh nạ n, cho nên sau khi giả i nạ n nên nghĩ việ c trừkẻxấ u. Nế u không trừ đượ c làđiềuđáng phả i lo sợ."
    },
    {
      "hexagram_id": 61,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Nhún nhườ ng mà vượ t qua các chỗ hiể m. Lợ i vềsự sang sông lớ n. Kẻ tiể u nhânđượ c ngườ i trên yêu thươ ng nên vui mừ ng quáđỗ i. Nông nổiắ t bị hung.",
      "meaning_active": "Nhún nhườ ng mà vượ t qua các chỗ hiể m. Lợ i vềsự sang sông lớ n. Kẻ tiể u nhânđượ c ngườ i trên yêu thươ ng nên vui mừ ng quáđỗ i. Nông nổiắ t bị hung."
    },
    {
      "hexagram_id": 61,
      "line_number": 2,
      "relation": "",
      "meaning_static": "m thuậ n trung chính, vì sự nhún nhườ ng mà có tiếngtă m. Đươ ng lúc vui mà biế t giữ đạ o trung chính. Nếu đắmđuố i về sự vui thì hóa ra lo.",
      "meaning_active": "m thuậ n trung chính, vì sự nhún nhườ ng mà có tiếngtă m. Đươ ng lúc vui mà biế t giữ đạ o trung chính. Nếu đắmđuố i về sự vui thì hóa ra lo."
    },
    {
      "hexagram_id": 61,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Có công lao mà biế t nhún nhườ ng, lạ i càng làm cho ng ười ta thấ y khó, cho nên sau chót vẫn đắ c thành. Các việcđề u nên hố i lạ i cho mau, nế u không sẽ có sự ă n nă n.",
      "meaning_active": "Có công lao mà biế t nhún nhườ ng, lạ i càng làm cho ng ười ta thấ y khó, cho nên sau chót vẫn đắ c thành. Các việcđề u nên hố i lạ i cho mau, nế u không sẽ có sự ă n nă n."
    },
    {
      "hexagram_id": 61,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Có công lao,đượ c ngườ i trên dùng, dân chúng tôn mà vẫn khiêm tốnđểnhườ ng cho ngườ i khác có công lao thì tố t. Ở vào ngôiđạ i thầ n, vâng thờ vua nhu nhượ c, kẻdướ i không giúp, cho nên phả i ngờ . Chỉ nên hế t lòng thành tín thì bè bạ n tụ họ p.",
      "meaning_active": "Có công lao,đượ c ngườ i trên dùng, dân chúng tôn mà vẫn khiêm tốnđểnhườ ng cho ngườ i khác có công lao thì tố t. Ở vào ngôiđạ i thầ n, vâng thờ vua nhu nhượ c, kẻdướ i không giúp, cho nên phả i ngờ . Chỉ nên hế t lòng thành tín thì bè bạ n tụ họ p."
    },
    {
      "hexagram_id": 61,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Nên dùng uyđố i vớ i ngườ i nào chư a phụ c mình, không phả i chỉ biế t nhu khiêm. Ông vua nhu nhượ c bị đè nén vớ i bề tôi chuyên quyề n. Cưỡi lên kẻcứ ng và bịkẻcứ ng bứ c như ng chư a bịchế t.",
      "meaning_active": "Nên dùng uyđố i vớ i ngườ i nào chư a phụ c mình, không phả i chỉ biế t nhu khiêm. Ông vua nhu nhượ c bị đè nén vớ i bề tôi chuyên quyề n. Cưỡi lên kẻcứ ng và bịkẻcứ ng bứ c như ng chư a bịchế t."
    },
    {
      "hexagram_id": 61,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Khiêm nhuđế n cùng cựcđượ c nhiề u ngườ i theo mình, có thểlấ y sứ c mạ nh ra quân mà trừnhữ ng kẻchố ng lạ i mình.Như ng vì tài kém sứ c yế u, nên cũ ng chỉ trị đượ c nhữ ng kẻ trongấ p mình mà thôi. Chư a thỏ a chíđượ c. Tố i tă m vềsự vui chođế n cùng chót, vạlỗ i sắ p sử a kéođế n, phả i nên thayđổ i cho mau. Sự hôn mêđã thành, nế u biế t biếnđổ i, thì có thể không lỗ i.",
      "meaning_active": "Khiêm nhuđế n cùng cựcđượ c nhiề u ngườ i theo mình, có thểlấ y sứ c mạ nh ra quân mà trừnhữ ng kẻchố ng lạ i mình.Như ng vì tài kém sứ c yế u, nên cũ ng chỉ trị đượ c nhữ ng kẻ trongấ p mình mà thôi. Chư a thỏ a chíđượ c. Tố i tă m vềsự vui chođế n cùng chót, vạlỗ i sắ p sử a kéođế n, phả i nên thayđổ i cho mau. Sự hôn mêđã thành, nế u biế t biếnđổ i, thì có thể không lỗ i."
    },
    {
      "hexagram_id": 62,
      "line_number": 1,
      "relation": "",
      "meaning_static": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 1 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 62,
      "line_number": 2,
      "relation": "",
      "meaning_static": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 2 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 62,
      "line_number": 3,
      "relation": "",
      "meaning_static": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 3 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 62,
      "line_number": 4,
      "relation": "",
      "meaning_static": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 4 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 62,
      "line_number": 5,
      "relation": "",
      "meaning_static": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 5 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 62,
      "line_number": 6,
      "relation": "",
      "meaning_static": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.",
      "meaning_active": "Hào vị thứ 6 đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung."
    },
    {
      "hexagram_id": 63,
      "line_number": 1,
      "relation": "",
      "meaning_static": "(Rồ ng lặ n chớ dùng)",
      "meaning_active": "Quân tửchư a gặ p thờ i thì nênẩn thân tíchđứ c, không nên cầ u danh lợ i."
    },
    {
      "hexagram_id": 63,
      "line_number": 2,
      "relation": "",
      "meaning_static": "(Rồ ng hiệ n ra ruộ ng, ra mắtđạ i nhân thì có lợ i)",
      "meaning_active": "Gặ p thờ i,đ em tài lự c giúp chođờ i ."
    },
    {
      "hexagram_id": 63,
      "line_number": 3,
      "relation": "",
      "meaning_static": "(Ngườ i quân tửtố i ngày hă ng hái tựcườ ng, gặ p nguycũ ng khôngđế n nỗ i tộ i lỗ i.",
      "meaning_active": "(Ngườ i quân tửtố i ngày hă ng hái tựcườ ng, gặ p nguycũ ng khôngđế n nỗ i tộ i lỗ i."
    },
    {
      "hexagram_id": 63,
      "line_number": 4,
      "relation": "",
      "meaning_static": "(Như con rồ ng có khi bay bổ ng, có khi nằ m trong vự c)",
      "meaning_active": "Phả i thậ n trọ ng xem xét thờ i cơ."
    },
    {
      "hexagram_id": 63,
      "line_number": 5,
      "relation": "",
      "meaning_static": "(Rồ ng bay lên trờ i, ra mắ t kẻlớ n thì có lợ i)",
      "meaning_active": "Hào tố t nhấ t. Tuy làđạ o làm tôi như ng là ngôi kẻ làm vua. Giữmứ c trung chính màởdướ i thì rấ t tố t."
    },
    {
      "hexagram_id": 63,
      "line_number": 6,
      "relation": "",
      "meaning_static": "(Rồ ng lên cao quá có hố i hậ n)",
      "meaning_active": "Không nên hoạt độ ng gì cả,sớ m rút luiđể giữ việ c an toàn và danh dự."
    }
  ],
  "tuong_co_ban": [
    {
      "chu_de": "cong_viec",
      "luc_than": "quan_quy",
      "luc_thu": null,
      "y_nghia": "KPI, áp lực công việc, sếp/quản lý, cơ hội thăng tiến, chức vụ, cạnh tranh"
    },
    {
      "chu_de": "cong_viec",
      "luc_than": "phu_mau",
      "luc_thu": null,
      "y_nghia": "Hợp đồng, giấy tờ, quy trình, đào tạo, tài liệu, server hệ thống, quy định công ty"
    },
    {
      "chu_de": "cong_viec",
      "luc_than": "huynh_de",
      "luc_thu": null,
      "y_nghia": "Đồng nghiệp cùng cấp, đối thủ nội bộ, hao phí chi phí, tranh chấp nguồn lực"
    },
    {
      "chu_de": "cong_viec",
      "luc_than": "the_tai",
      "luc_thu": null,
      "y_nghia": "Thu nhập, bonus, hoa hồng, khách hàng, tài nguyên dự án, ngân sách"
    },
    {
      "chu_de": "cong_viec",
      "luc_than": "tu_ton",
      "luc_thu": null,
      "y_nghia": "Nghỉ ngơi, giải tỏa áp lực, sáng tạo tự do, nhân viên cấp dưới, phúc lợi"
    },
    {
      "chu_de": "cong_viec",
      "luc_than": null,
      "luc_thu": "thanh_long",
      "y_nghia": "Tín hiệu tốt, cơ hội vàng, thăng chức rõ ràng, sếp ủng hộ, hợp đồng béo bở"
    },
    {
      "chu_de": "cong_viec",
      "luc_than": null,
      "luc_thu": "chu_tuoc",
      "y_nghia": "Email quan trọng, cuộc họp căng thẳng, tranh cãi quyết sách, tin đồn nội bộ"
    },
    {
      "chu_de": "cong_viec",
      "luc_than": null,
      "luc_thu": "cau_tran",
      "y_nghia": "Dự án bị trì hoãn, hành chính quan liêu, deadline kéo dài vô tận, thủ tục phức tạp"
    },
    {
      "chu_de": "cong_viec",
      "luc_than": null,
      "luc_thu": "dang_xa",
      "y_nghia": "Lo lắng mơ hồ về tương lai công việc, áp lực tâm lý không rõ nguồn gốc, dự án bí ẩn"
    },
    {
      "chu_de": "cong_viec",
      "luc_than": null,
      "luc_thu": "bach_ho",
      "y_nghia": "Tai nạn lao động, xung đột gay gắt, sa thải bất ngờ, áp lực đến mức burnout"
    },
    {
      "chu_de": "cong_viec",
      "luc_than": null,
      "luc_thu": "huyen_vu",
      "y_nghia": "Âm mưu nội bộ, đồng nghiệp phản bội, ăn cắp ý tưởng, thông tin bị rò rỉ"
    },
    {
      "chu_de": "tinh_yeu",
      "luc_than": "quan_quy",
      "luc_thu": null,
      "y_nghia": "Người yêu/chồng (nữ hỏi), sức hút mạnh mẽ, sự chiếm hữu, áp lực tình cảm, ghen tuông"
    },
    {
      "chu_de": "tinh_yeu",
      "luc_than": "phu_mau",
      "luc_thu": null,
      "y_nghia": "Hôn ước, cam kết chính thức, cha mẹ can thiệp, điều kiện cưới hỏi, tổ chức lễ cưới"
    },
    {
      "chu_de": "tinh_yeu",
      "luc_than": "huynh_de",
      "luc_thu": null,
      "y_nghia": "Tình địch, người thứ ba, bạn bè can thiệp, tranh giành người yêu, hao tình cảm"
    },
    {
      "chu_de": "tinh_yeu",
      "luc_than": "the_tai",
      "luc_thu": null,
      "y_nghia": "Người yêu/vợ (nam hỏi), vật chất trong tình yêu, quà tặng, đi du lịch cùng"
    },
    {
      "chu_de": "tinh_yeu",
      "luc_than": "tu_ton",
      "luc_thu": null,
      "y_nghia": "Niềm vui, hạnh phúc ngọt ngào, con cái, tình cảm nhẹ nhàng không ràng buộc"
    },
    {
      "chu_de": "tinh_yeu",
      "luc_than": null,
      "luc_thu": "thanh_long",
      "y_nghia": "Tin vui tình cảm, cầu hôn thành công, mối quan hệ thăng hoa, hôn nhân vui vẻ"
    },
    {
      "chu_de": "tinh_yeu",
      "luc_than": null,
      "luc_thu": "dang_xa",
      "y_nghia": "Mơ hồ trong tình cảm, không chắc chắn, hay lo âu vô cớ, tình cảm ảo"
    },
    {
      "chu_de": "tinh_yeu",
      "luc_than": null,
      "luc_thu": "bach_ho",
      "y_nghia": "Chia tay đau đớn, cãi vã lớn, bạo lực lời nói, tổn thương sâu trong lòng"
    },
    {
      "chu_de": "tinh_yeu",
      "luc_than": null,
      "luc_thu": "huyen_vu",
      "y_nghia": "Bí mật trong tình yêu, tình ngoài hôn nhân, người yêu giấu giếm điều gì đó"
    },
    {
      "chu_de": "suc_khoe",
      "luc_than": "quan_quy",
      "luc_thu": null,
      "y_nghia": "Bệnh tật cụ thể, mầm bệnh, tai nạn, bác sĩ điều trị, phẫu thuật"
    },
    {
      "chu_de": "suc_khoe",
      "luc_than": "phu_mau",
      "luc_thu": null,
      "y_nghia": "Đơn thuốc, hồ sơ bệnh án, chế độ ăn uống, nghỉ dưỡng theo chỉ dẫn"
    },
    {
      "chu_de": "suc_khoe",
      "luc_than": "huynh_de",
      "luc_thu": null,
      "y_nghia": "Căng thẳng hao tổn thể lực, nhiễm trùng chéo, tranh chấp nguồn sinh lực"
    },
    {
      "chu_de": "suc_khoe",
      "luc_than": "the_tai",
      "luc_thu": null,
      "y_nghia": "Chi phí thuốc men bệnh viện, suy kiệt thể lực vì lao lực"
    },
    {
      "chu_de": "suc_khoe",
      "luc_than": "tu_ton",
      "luc_thu": null,
      "y_nghia": "Thuốc men hiệu quả, sức đề kháng tốt, hồi phục nhanh, sức khỏe tốt"
    },
    {
      "chu_de": "suc_khoe",
      "luc_than": null,
      "luc_thu": "bach_ho",
      "y_nghia": "Xuất huyết, chấn thương nặng, phẫu thuật gấp, bệnh phát nhanh và nguy hiểm"
    },
    {
      "chu_de": "suc_khoe",
      "luc_than": null,
      "luc_thu": "dang_xa",
      "y_nghia": "Bệnh không rõ nguyên nhân, triệu chứng lạ, lo âu tâm lý, mất ngủ triền miên"
    },
    {
      "chu_de": "suc_khoe",
      "luc_than": null,
      "luc_thu": "chu_tuoc",
      "y_nghia": "Bệnh hô hấp, viêm họng, cần tư vấn chuyên gia y tế gấp"
    },
    {
      "chu_de": "kinh_doanh",
      "luc_than": "quan_quy",
      "luc_thu": null,
      "y_nghia": "Cơ quan quản lý, giấy phép, thuế, đối thủ cạnh tranh, rào cản pháp lý"
    },
    {
      "chu_de": "kinh_doanh",
      "luc_than": "phu_mau",
      "luc_thu": null,
      "y_nghia": "Vốn vay, hợp đồng đối tác, giấy phép, kế hoạch kinh doanh, công nghệ nền tảng"
    },
    {
      "chu_de": "kinh_doanh",
      "luc_than": "huynh_de",
      "luc_thu": null,
      "y_nghia": "Đối thủ tranh thị phần, đối tác phản bội, chi phí vô hình, hao tổn tài lực"
    },
    {
      "chu_de": "kinh_doanh",
      "luc_than": "the_tai",
      "luc_thu": null,
      "y_nghia": "Doanh thu, lợi nhuận, khách hàng chốt đơn, sản phẩm thành công, thị trường tiêu thụ"
    },
    {
      "chu_de": "kinh_doanh",
      "luc_than": "tu_ton",
      "luc_thu": null,
      "y_nghia": "Đội ngũ nhân viên trung thành, phúc lợi, giải quyết khủng hoảng, sáng kiến mới"
    },
    {
      "chu_de": "kinh_doanh",
      "luc_than": null,
      "luc_thu": "thanh_long",
      "y_nghia": "Đối tác chiến lược uy tín, hợp đồng lớn thành công, thị trường mở rộng tốt"
    },
    {
      "chu_de": "kinh_doanh",
      "luc_than": null,
      "luc_thu": "bach_ho",
      "y_nghia": "Phá sản rủi ro, kiện tụng thương mại, mất hợp đồng lớn, khủng hoảng nghiêm trọng"
    },
    {
      "chu_de": "kinh_doanh",
      "luc_than": null,
      "luc_thu": "huyen_vu",
      "y_nghia": "Gian lận hợp đồng, đối tác lừa đảo, tiền vốn biến mất, thao túng giá ngầm"
    },
    {
      "chu_de": "chung_khoan",
      "luc_than": "quan_quy",
      "luc_thu": null,
      "y_nghia": "Lực lượng thị trường lớn (big player), áp lực pháp lý, quy định UBCKNN, rủi ro hệ thống"
    },
    {
      "chu_de": "chung_khoan",
      "luc_than": "phu_mau",
      "luc_thu": null,
      "y_nghia": "Báo cáo tài chính, tin tức cơ bản, chỉ số phân tích, dữ liệu nền"
    },
    {
      "chu_de": "chung_khoan",
      "luc_than": "huynh_de",
      "luc_thu": null,
      "y_nghia": "Nhà đầu tư bán tháo, phí giao dịch hao tổn, đua lệnh thua lỗ, bẫy thanh khoản"
    },
    {
      "chu_de": "chung_khoan",
      "luc_than": "the_tai",
      "luc_thu": null,
      "y_nghia": "Cổ phiếu tăng giá, chốt lời thành công, tài sản sinh lời, margin hiệu quả"
    },
    {
      "chu_de": "chung_khoan",
      "luc_than": "tu_ton",
      "luc_thu": null,
      "y_nghia": "Cắt lỗ đúng thời điểm, quản lý rủi ro tốt, tâm lý điềm tĩnh, chiến lược bảo vệ vốn"
    },
    {
      "chu_de": "chung_khoan",
      "luc_than": null,
      "luc_thu": "bach_ho",
      "y_nghia": "Sàn sập, sell-off mạnh, tin xấu bất ngờ, margin call, mất vốn nghiêm trọng"
    },
    {
      "chu_de": "chung_khoan",
      "luc_than": null,
      "luc_thu": "thanh_long",
      "y_nghia": "Phá kháng cự, uptrend rõ, cổ phiếu có sóng, mua vào đúng thời điểm vàng"
    },
    {
      "chu_de": "chung_khoan",
      "luc_than": null,
      "luc_thu": "huyen_vu",
      "y_nghia": "Thao túng giá, cổ phiếu lừa đảo, thông tin nội gián âm thầm, bơm xả không rõ"
    },
    {
      "chu_de": "bat_dong_san",
      "luc_than": "quan_quy",
      "luc_thu": null,
      "y_nghia": "Quy hoạch nhà nước, pháp lý đất đai, tranh chấp sở hữu, áp lực vay thế chấp"
    },
    {
      "chu_de": "bat_dong_san",
      "luc_than": "phu_mau",
      "luc_thu": null,
      "y_nghia": "Sổ đỏ/sổ hồng, hợp đồng mua bán, giấy phép xây dựng, quy hoạch 1/500"
    },
    {
      "chu_de": "bat_dong_san",
      "luc_than": "huynh_de",
      "luc_thu": null,
      "y_nghia": "Đối thủ tranh mua, môi giới phản bội, chi phí phát sinh ngoài dự toán"
    },
    {
      "chu_de": "bat_dong_san",
      "luc_than": "the_tai",
      "luc_thu": null,
      "y_nghia": "Giá trị tài sản tăng, chốt lời BĐS, cho thuê có lợi, thanh khoản tốt"
    },
    {
      "chu_de": "bat_dong_san",
      "luc_than": "tu_ton",
      "luc_thu": null,
      "y_nghia": "Mua để ở yên ổn, nơi an cư lạc nghiệp, cải tạo nội thất, bảo vệ tài sản"
    }
  ],
  "tuong_da_tang": [
    {
      "hao_vi": 1,
      "luc_than": "the_tai",
      "luc_thu": "thanh_long",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Cơ hội tài chính mới xuất hiện ngay ở giai đoạn khởi đầu, rất thuận lợi để nhận dự án hoặc ký hợp đồng"
    },
    {
      "hao_vi": 1,
      "luc_than": "huynh_de",
      "luc_thu": "chu_tuoc",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Nội bộ xảy ra tranh cãi lúc mới bắt đầu, đồng nghiệp cạnh tranh hoặc lan truyền tin không tốt về bạn"
    },
    {
      "hao_vi": 1,
      "luc_than": "quan_quy",
      "luc_thu": "dang_xa",
      "than_sat": null,
      "trang_thai": "tuan_khong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Sếp hoặc áp lực cấp trên chưa thực sự hiện hữu, đây là lo lắng ảo, chưa có nguy cơ thực sự"
    },
    {
      "hao_vi": 2,
      "luc_than": "phu_mau",
      "luc_thu": "cau_tran",
      "than_sat": null,
      "trang_thai": "tuan_khong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Hợp đồng hoặc giấy tờ còn vướng mắc thủ tục, hiện tại chưa có hiệu lực hoặc chưa được duyệt"
    },
    {
      "hao_vi": 2,
      "luc_than": "the_tai",
      "luc_thu": "thanh_long",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Năng lực tài chính bản thân đang tốt, thu nhập tăng trưởng, nhận được khen thưởng xứng đáng"
    },
    {
      "hao_vi": 2,
      "luc_than": "huynh_de",
      "luc_thu": "huyen_vu",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Có người âm thầm phá hoại từ bên trong nội bộ, cẩn thận bị mạo danh hoặc lấy cắp thông tin"
    },
    {
      "hao_vi": 3,
      "luc_than": "quan_quy",
      "luc_thu": "chu_tuoc",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Áp lực cấp trên tăng mạnh, tranh cãi và thách thức trực tiếp, điểm bùng phát xung đột công việc"
    },
    {
      "hao_vi": 3,
      "luc_than": "quan_quy",
      "luc_thu": "dang_xa",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Lo lắng cực độ về vị trí công việc, áp lực tâm lý tích tụ lâu bùng phát, giai đoạn rất căng thẳng"
    },
    {
      "hao_vi": 3,
      "luc_than": "quan_quy",
      "luc_thu": "chu_tuoc",
      "than_sat": null,
      "trang_thai": "tuan_khong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Tranh chấp với cấp trên hiện tại còn là không trung, mâu thuẫn chưa bùng phát — hãy chủ động hóa giải"
    },
    {
      "hao_vi": 3,
      "luc_than": "huynh_de",
      "luc_thu": "bach_ho",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Đồng nghiệp hoặc đối thủ hành động quyết liệt gây tổn hại trực tiếp, thậm chí có thể mất việc"
    },
    {
      "hao_vi": 4,
      "luc_than": "quan_quy",
      "luc_thu": "thanh_long",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Cơ hội thăng tiến cụ thể từ cấp trên hoặc đối tác quan trọng bên ngoài, lời đề nghị có giá trị"
    },
    {
      "hao_vi": 4,
      "luc_than": "phu_mau",
      "luc_thu": "cau_tran",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Dự án bị kéo dài hoặc quy trình phê duyệt chậm, cần kiên nhẫn chờ đợi thủ tục bên ngoài"
    },
    {
      "hao_vi": 4,
      "luc_than": "the_tai",
      "luc_thu": "huyen_vu",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Khách hàng hoặc đối tác bên ngoài không minh bạch, có thể xảy ra gian lận hoặc trốn tránh thanh toán"
    },
    {
      "hao_vi": 5,
      "luc_than": "quan_quy",
      "luc_thu": "dang_xa",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Vị trí quản lý cấp cao đang chịu áp lực tinh thần cực lớn, quyết sách khó khăn, hoặc hệ thống gặp lỗi bất ngờ"
    },
    {
      "hao_vi": 5,
      "luc_than": "quan_quy",
      "luc_thu": "thanh_long",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Thăng tiến lên vị trí cao, được giao trọng trách, cấp trên tin tưởng và đề bạt chính thức"
    },
    {
      "hao_vi": 5,
      "luc_than": "phu_mau",
      "luc_thu": "chu_tuoc",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Văn bản chính sách quan trọng được ban hành, hợp đồng lớn cần thương thảo kỹ, trao đổi căng thẳng cấp cao"
    },
    {
      "hao_vi": 5,
      "luc_than": "huynh_de",
      "luc_thu": "bach_ho",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Đối thủ hoặc đồng nghiệp ngang cấp ra đòn quyết định, có thể xảy ra tranh giành vị trí cấp cao"
    },
    {
      "hao_vi": 5,
      "luc_than": "quan_quy",
      "luc_thu": "dang_xa",
      "than_sat": null,
      "trang_thai": "tuan_khong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Áp lực lãnh đạo hiện tại chỉ là lo sợ ảo, thực tế chưa có nguy cơ — tâm lý tự tạo áp lực không cần thiết"
    },
    {
      "hao_vi": 6,
      "luc_than": "phu_mau",
      "luc_thu": "cau_tran",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Hợp đồng hoặc dự án đến giai đoạn cuối nhưng bị trì hoãn, kết thúc không đúng kế hoạch"
    },
    {
      "hao_vi": 6,
      "luc_than": "quan_quy",
      "luc_thu": "bach_ho",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Kết cục cực đoan, có thể là sa thải, nghỉ việc bắt buộc, sự cố nghiêm trọng khi dự án vào giai đoạn cuối"
    },
    {
      "hao_vi": 6,
      "luc_than": "the_tai",
      "luc_thu": "thanh_long",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Phần thưởng và thành quả đến vào giai đoạn cuối chu kỳ, công sức được đền đáp xứng đáng"
    },
    {
      "hao_vi": null,
      "luc_than": "quan_quy",
      "luc_thu": null,
      "than_sat": null,
      "trang_thai": "nhap_mo",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Cơ hội thăng tiến hoặc trọng trách bị giam hãm, bế tắc không tiến lên được dù đã cố gắng rất nhiều"
    },
    {
      "hao_vi": null,
      "luc_than": "the_tai",
      "luc_thu": null,
      "than_sat": null,
      "trang_thai": "nhap_mo",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Thu nhập hoặc tài nguyên bị đóng băng, tiền đến tay rồi lại bị giữ lại hoặc tốn hết không rõ nguyên nhân"
    },
    {
      "hao_vi": null,
      "luc_than": "phu_mau",
      "luc_thu": null,
      "than_sat": null,
      "trang_thai": "nguyet_pha",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Hợp đồng hoặc kế hoạch bị phá vỡ hoàn toàn trong tháng này, không thể cứu vãn được"
    },
    {
      "hao_vi": null,
      "luc_than": "quan_quy",
      "luc_thu": null,
      "than_sat": null,
      "trang_thai": "am_dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Sếp hoặc áp lực công việc sẽ bùng phát rất nhanh và bất ngờ, cần phản ứng ngay lập tức"
    },
    {
      "hao_vi": null,
      "luc_than": "huynh_de",
      "luc_thu": null,
      "than_sat": null,
      "trang_thai": "am_dong",
      "chu_de": "cong_viec",
      "mo_ta_tuong": "Đồng nghiệp hoặc đối thủ sẽ bất ngờ hành động, không có thời gian chuẩn bị — phải đề phòng ngay"
    },
    {
      "hao_vi": 3,
      "luc_than": "huynh_de",
      "luc_thu": "chu_tuoc",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "tinh_yeu",
      "mo_ta_tuong": "Người thứ ba xuất hiện và gây ra tranh cãi công khai, mối quan hệ bị thử thách nghiêm trọng"
    },
    {
      "hao_vi": 5,
      "luc_than": "the_tai",
      "luc_thu": "thanh_long",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "tinh_yeu",
      "mo_ta_tuong": "Cầu hôn hoặc xác nhận mối quan hệ chính thức từ đối phương, tin vui tình cảm ở cấp độ cao nhất"
    },
    {
      "hao_vi": 5,
      "luc_than": "quan_quy",
      "luc_thu": "dang_xa",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "tinh_yeu",
      "mo_ta_tuong": "Người yêu (nữ hỏi) đang lo lắng ẩn giấu điều gì đó, tình cảm mơ hồ không chắc chắn"
    },
    {
      "hao_vi": 2,
      "luc_than": "the_tai",
      "luc_thu": "huyen_vu",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "tinh_yeu",
      "mo_ta_tuong": "Người yêu có bí mật riêng, âm thầm liên lạc với người khác, cần kiểm tra lại lòng chân thành"
    },
    {
      "hao_vi": null,
      "luc_than": "quan_quy",
      "luc_thu": null,
      "than_sat": null,
      "trang_thai": "tuan_khong",
      "chu_de": "tinh_yeu",
      "mo_ta_tuong": "Người yêu/chồng hiện tại chưa xuất hiện trong cuộc sống thực, hoặc mối quan hệ đang ở trạng thái hư ảo"
    },
    {
      "hao_vi": null,
      "luc_than": "quan_quy",
      "luc_thu": "bach_ho",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "suc_khoe",
      "mo_ta_tuong": "Bệnh tật phát nặng bất ngờ cần nhập viện hoặc phẫu thuật gấp, đây là dấu hiệu y tế khẩn cấp"
    },
    {
      "hao_vi": null,
      "luc_than": "tu_ton",
      "luc_thu": "thanh_long",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "suc_khoe",
      "mo_ta_tuong": "Thuốc đúng, phác đồ hiệu quả, cơ thể hồi phục nhanh chóng, tinh thần tốt dần lên"
    },
    {
      "hao_vi": null,
      "luc_than": "quan_quy",
      "luc_thu": "dang_xa",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "suc_khoe",
      "mo_ta_tuong": "Bệnh không rõ nguyên nhân, khó chẩn đoán, cần làm thêm xét nghiệm chuyên sâu hoặc đổi bác sĩ"
    },
    {
      "hao_vi": null,
      "luc_than": "the_tai",
      "luc_thu": "thanh_long",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "chung_khoan",
      "mo_ta_tuong": "Cổ phiếu phá kháng cự, tạo đỉnh mới, tín hiệu mua vào rất mạnh, uptrend xác nhận rõ ràng"
    },
    {
      "hao_vi": null,
      "luc_than": "the_tai",
      "luc_thu": "bach_ho",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "chung_khoan",
      "mo_ta_tuong": "Sell-off mạnh, cổ phiếu lao dốc nhanh, cần cắt lỗ ngay hoặc đứng ngoài thị trường"
    },
    {
      "hao_vi": null,
      "luc_than": "huynh_de",
      "luc_thu": "huyen_vu",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "chung_khoan",
      "mo_ta_tuong": "Thao túng giá, nhà đầu tư nhỏ lẻ bị bẫy vào để xả hàng, cẩn thận cổ phiếu làm giá ngầm"
    },
    {
      "hao_vi": null,
      "luc_than": "tu_ton",
      "luc_thu": null,
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "chung_khoan",
      "mo_ta_tuong": "Cắt lỗ đúng lúc bảo vệ vốn, hoặc chốt lời hợp lý trước khi thị trường đảo chiều"
    },
    {
      "hao_vi": null,
      "luc_than": "the_tai",
      "luc_thu": "thanh_long",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "bat_dong_san",
      "mo_ta_tuong": "Cơ hội mua BĐS tốt xuất hiện, giá hợp lý, pháp lý sạch, thanh khoản tốt — nên hành động"
    },
    {
      "hao_vi": null,
      "luc_than": "phu_mau",
      "luc_thu": "cau_tran",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "bat_dong_san",
      "mo_ta_tuong": "Sổ đỏ hoặc hợp đồng công chứng đang bị kẹt thủ tục, cần thêm thời gian để hoàn thiện giấy tờ"
    },
    {
      "hao_vi": null,
      "luc_than": "quan_quy",
      "luc_thu": "bach_ho",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "bat_dong_san",
      "mo_ta_tuong": "Tranh chấp pháp lý nghiêm trọng, nguy cơ mất tiền đặt cọc hoặc bị thu hồi tài sản, cần luật sư ngay"
    },
    {
      "hao_vi": null,
      "luc_than": "huynh_de",
      "luc_thu": "huyen_vu",
      "than_sat": null,
      "trang_thai": "dong",
      "chu_de": "bat_dong_san",
      "mo_ta_tuong": "Môi giới hoặc đối tác âm thầm gian lận, bán cùng lúc cho nhiều người, cần kiểm tra pháp lý độc lập"
    }
  ],
  "tuong_dong_bien": [
    {
      "luc_than_goc": "quan_quy",
      "luc_than_bien": "tu_ton",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Công việc ban đầu tưởng tốt nhưng về sau bị nhân viên cấp dưới hoặc đồng nghiệp cản trở, dẫn đến đổ vỡ thất bại hoàn toàn"
    },
    {
      "luc_than_goc": "the_tai",
      "luc_than_bien": "huynh_de",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Hợp đồng hoặc thu nhập tưởng chắc chắn nhưng bị đồng nghiệp tranh giành hoặc chi phí ăn hết lợi nhuận"
    },
    {
      "luc_than_goc": "phu_mau",
      "luc_than_bien": "quan_quy",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Hợp đồng ký xong lại trở thành gánh nặng áp lực, điều khoản bất lợi bộc lộ sau khi đã cam kết"
    },
    {
      "luc_than_goc": "huynh_de",
      "luc_than_bien": "phu_mau",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Đồng nghiệp hợp tác lúc đầu tốt đẹp nhưng về sau tạo ra ràng buộc, thủ tục phức tạp khó thoát ra"
    },
    {
      "luc_than_goc": "tu_ton",
      "luc_than_bien": "quan_quy",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Kế hoạch nghỉ ngơi hay dự án sáng tạo tự do lại dẫn đến áp lực mới và trách nhiệm nặng nề hơn"
    },
    {
      "luc_than_goc": "quan_quy",
      "luc_than_bien": "phu_mau",
      "huong_bien": "hoi_dau_sinh",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Áp lực công việc nặng nề lúc đầu nhưng tạo ra hợp đồng quý giá và kiến thức vững chắc về lâu dài"
    },
    {
      "luc_than_goc": "the_tai",
      "luc_than_bien": "tu_ton",
      "huong_bien": "hoi_dau_sinh",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Thu nhập có vẻ giảm ban đầu nhưng mang lại sự ổn định và phúc lợi lâu dài cho bản thân và đội nhóm"
    },
    {
      "luc_than_goc": "huynh_de",
      "luc_than_bien": "the_tai",
      "huong_bien": "hoi_dau_sinh",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Tranh chấp với đồng nghiệp lúc đầu căng thẳng nhưng cuối cùng lại sinh ra lợi ích và tài nguyên mới"
    },
    {
      "luc_than_goc": "phu_mau",
      "luc_than_bien": "tu_ton",
      "huong_bien": "hoi_dau_sinh",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Thủ tục giấy tờ lúc đầu phức tạp nhưng hoàn thiện xong tạo nền tảng vững chắc, giảm rủi ro lâu dài"
    },
    {
      "luc_than_goc": "the_tai",
      "luc_than_bien": "the_tai",
      "huong_bien": "hoa_tien",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Thu nhập và cơ hội tài chính ngày càng tăng trưởng, đang trên đà đi lên mạnh mẽ"
    },
    {
      "luc_than_goc": "quan_quy",
      "luc_than_bien": "quan_quy",
      "huong_bien": "hoa_tien",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Vị trí và quyền lực ngày càng được củng cố, thăng tiến đang trên đà tăng tốc rõ rệt"
    },
    {
      "luc_than_goc": "phu_mau",
      "luc_than_bien": "phu_mau",
      "huong_bien": "hoa_tien",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Dự án và hợp đồng ngày càng trưởng thành, mọi thủ tục đang đi đúng hướng và tiến triển tốt"
    },
    {
      "luc_than_goc": "the_tai",
      "luc_than_bien": "the_tai",
      "huong_bien": "hoa_thoai",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Thu nhập và cơ hội dần co lại, cần điều chỉnh chiến lược trước khi tình hình tệ hơn"
    },
    {
      "luc_than_goc": "quan_quy",
      "luc_than_bien": "quan_quy",
      "huong_bien": "hoa_thoai",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Quyền lực và ảnh hưởng đang suy giảm dần, vị trí không còn vững chắc như trước"
    },
    {
      "luc_than_goc": "phu_mau",
      "luc_than_bien": "phu_mau",
      "huong_bien": "hoa_thoai",
      "chu_de": "cong_viec",
      "mo_ta_bien": "Hợp đồng hoặc dự án đang mất đà, cần xem lại toàn bộ kế hoạch và điều kiện thực hiện"
    },
    {
      "luc_than_goc": "quan_quy",
      "luc_than_bien": "tu_ton",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "tinh_yeu",
      "mo_ta_bien": "Người yêu ban đầu cuốn hút mạnh nhưng về sau bị con cái hoặc người thân đối phương can thiệp gây chia rẽ"
    },
    {
      "luc_than_goc": "the_tai",
      "luc_than_bien": "huynh_de",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "tinh_yeu",
      "mo_ta_bien": "Tình cảm ban đầu nồng ấm nhưng người thứ ba xuất hiện hoặc bạn bè can thiệp phá vỡ mối quan hệ"
    },
    {
      "luc_than_goc": "quan_quy",
      "luc_than_bien": "phu_mau",
      "huong_bien": "hoi_dau_sinh",
      "chu_de": "tinh_yeu",
      "mo_ta_bien": "Tình cảm ban đầu có nhiều ràng buộc nhưng cuối cùng dẫn đến hôn nhân chính thức được gia đình chấp thuận"
    },
    {
      "luc_than_goc": "tu_ton",
      "luc_than_bien": "quan_quy",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "tinh_yeu",
      "mo_ta_bien": "Mối quan hệ nhẹ nhàng thoải mái lúc đầu bỗng trở nên ràng buộc và áp lực, dễ gây ngột ngạt"
    },
    {
      "luc_than_goc": "the_tai",
      "luc_than_bien": "tu_ton",
      "huong_bien": "hoi_dau_sinh",
      "chu_de": "tinh_yeu",
      "mo_ta_bien": "Tình cảm bắt đầu từ mục đích vật chất nhưng dần dần trở nên thuần khiết, hạnh phúc thực sự"
    },
    {
      "luc_than_goc": "the_tai",
      "luc_than_bien": "huynh_de",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "kinh_doanh",
      "mo_ta_bien": "Doanh thu ban đầu tưởng tốt nhưng đối thủ hoặc chi phí phát sinh ăn hết lợi nhuận, thực sự thua lỗ"
    },
    {
      "luc_than_goc": "phu_mau",
      "luc_than_bien": "quan_quy",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "kinh_doanh",
      "mo_ta_bien": "Vốn vay hoặc đầu tư ban đầu trở thành gánh nặng pháp lý và áp lực tài chính, nguy cơ vỡ nợ"
    },
    {
      "luc_than_goc": "the_tai",
      "luc_than_bien": "tu_ton",
      "huong_bien": "hoi_dau_sinh",
      "chu_de": "kinh_doanh",
      "mo_ta_bien": "Doanh thu giảm giai đoạn đầu nhưng đang xây dựng đội ngũ tốt và nền tảng vững cho tương lai"
    },
    {
      "luc_than_goc": "quan_quy",
      "luc_than_bien": "phu_mau",
      "huong_bien": "hoi_dau_sinh",
      "chu_de": "kinh_doanh",
      "mo_ta_bien": "Vượt qua rào cản pháp lý khó khăn lúc đầu giúp doanh nghiệp vận hành bền vững hơn về sau"
    },
    {
      "luc_than_goc": "quan_quy",
      "luc_than_bien": "tu_ton",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "suc_khoe",
      "mo_ta_bien": "Bệnh tình tưởng thuyên giảm nhưng thuốc không phù hợp gây phản ứng phụ hoặc bệnh khác phát sinh"
    },
    {
      "luc_than_goc": "tu_ton",
      "luc_than_bien": "quan_quy",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "suc_khoe",
      "mo_ta_bien": "Phương pháp điều trị ban đầu có vẻ ổn nhưng về sau gây biến chứng mới nghiêm trọng hơn"
    },
    {
      "luc_than_goc": "quan_quy",
      "luc_than_bien": "phu_mau",
      "huong_bien": "hoi_dau_sinh",
      "chu_de": "suc_khoe",
      "mo_ta_bien": "Bệnh tình phức tạp nhưng tìm được đúng bác sĩ và phác đồ, dần dần hồi phục theo đúng kế hoạch"
    },
    {
      "luc_than_goc": "tu_ton",
      "luc_than_bien": "phu_mau",
      "huong_bien": "hoa_tien",
      "chu_de": "suc_khoe",
      "mo_ta_bien": "Sức khỏe đang phục hồi tốt từng ngày, thuốc và chế độ dinh dưỡng đang phát huy hiệu quả rõ ràng"
    },
    {
      "luc_than_goc": "the_tai",
      "luc_than_bien": "huynh_de",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "chung_khoan",
      "mo_ta_bien": "Cổ phiếu tăng đẹp lúc đầu nhưng sau đó bị xả hàng mạnh, lãi chưa kịp chốt đã hóa thành thua lỗ"
    },
    {
      "luc_than_goc": "the_tai",
      "luc_than_bien": "tu_ton",
      "huong_bien": "hoi_dau_sinh",
      "chu_de": "chung_khoan",
      "mo_ta_bien": "Giai đoạn điều chỉnh ngắn hạn nhưng đây là cơ hội gom hàng tốt, về lâu dài cổ phiếu sẽ tăng bền vững"
    },
    {
      "luc_than_goc": "huynh_de",
      "luc_than_bien": "the_tai",
      "huong_bien": "hoi_dau_sinh",
      "chu_de": "chung_khoan",
      "mo_ta_bien": "Sau giai đoạn bán tháo và mất mát, thị trường đảo chiều và sinh lời bất ngờ cho những ai giữ vị thế"
    },
    {
      "luc_than_goc": "the_tai",
      "luc_than_bien": "huynh_de",
      "huong_bien": "hoi_dau_khac",
      "chu_de": "bat_dong_san",
      "mo_ta_bien": "BĐS tưởng có lời nhưng chi phí phát sinh và tranh chấp ăn hết giá trị, cuối cùng thua lỗ nặng"
    },
    {
      "luc_than_goc": "phu_mau",
      "luc_than_bien": "tu_ton",
      "huong_bien": "hoi_dau_sinh",
      "chu_de": "bat_dong_san",
      "mo_ta_bien": "Thủ tục pháp lý phức tạp ban đầu nhưng sau khi hoàn thiện, tài sản sinh lời ổn định và an toàn"
    }
  ],
  "templates": {
    "công việc": {
      "scenarios": {
        "CAT": {
          "summary": "Công việc vô cùng hanh thông, cơ hội thăng tiến rộng mở.",
          "detail": "Quẻ cát tường hiển thị Dụng thần Quan Quỷ vượng tướng và Hào Thế hưng vượng. Bản mệnh có đầy đủ thực lực và được quý nhân nâng đỡ. Đây là thời cơ chín muồi để hành động, chuyển đổi công tác hoặc đảm nhận trọng trách mới.",
          "advice": "Hãy chủ động nắm bắt cơ hội, khiêm tốn học hỏi và quyết đoán thực thi kế hoạch."
        },
        "HUNG": {
          "summary": "Công việc gặp nhiều trắc trở, áp lực lớn, đề phòng rủi ro.",
          "detail": "Hệ thống phát hiện Dụng thần bị tổn hại (hồi đầu khắc, tuần không hoặc nguyệt phá) hoặc Hào Thế bị hóa Quỷ. Điềm báo mưu sự bất thành, dễ có sự tranh chấp, hao tài hoặc chịu áp lực nặng nề từ cấp trên.",
          "advice": "Thời điểm này nên tĩnh không nên động. Hãy tạm dừng các dự án lớn, phòng tránh tiểu nhân gièm pha và tập trung củng cố nội lực."
        },
        "BINH": {
          "summary": "Công việc ở thế tiến thoái lưỡng nan, có cơ hội nhưng bản thân mệt mỏi.",
          "detail": "Dữ liệu phân tích chỉ ra tình trạng 'Dụng vượng Thế suy'. Cơ hội việc làm hoặc dự án bên ngoài có triển vọng tốt, nhưng bản thân bạn lực lượng chưa đủ hoặc đang chịu nhiều stress, lo lắng nên chưa thể gánh vác trọn vẹn.",
          "advice": "Cần bồi bổ sức khỏe, phân bổ công việc hợp lý và không nên ôm đồm quá nhiều việc cùng lúc."
        }
      }
    },
    "thi cử": {
      "scenarios": {
        "CAT": {
          "summary": "Công việc vô cùng hanh thông, cơ hội thăng tiến rộng mở.",
          "detail": "Quẻ cát tường hiển thị Dụng thần Quan Quỷ vượng tướng và Hào Thế hưng vượng. Bản mệnh có đầy đủ thực lực và được quý nhân nâng đỡ. Đây là thời cơ chín muồi để hành động, chuyển đổi công tác hoặc đảm nhận trọng trách mới.",
          "advice": "Hãy chủ động nắm bắt cơ hội, khiêm tốn học hỏi và quyết đoán thực thi kế hoạch."
        },
        "HUNG": {
          "summary": "Công việc gặp nhiều trắc trở, áp lực lớn, đề phòng rủi ro.",
          "detail": "Hệ thống phát hiện Dụng thần bị tổn hại (hồi đầu khắc, tuần không hoặc nguyệt phá) hoặc Hào Thế bị hóa Quỷ. Điềm báo mưu sự bất thành, dễ có sự tranh chấp, hao tài hoặc chịu áp lực nặng nề từ cấp trên.",
          "advice": "Thời điểm này nên tĩnh không nên động. Hãy tạm dừng các dự án lớn, phòng tránh tiểu nhân gièm pha và tập trung củng cố nội lực."
        },
        "BINH": {
          "summary": "Công việc ở thế tiến thoái lưỡng nan, có cơ hội nhưng bản thân mệt mỏi.",
          "detail": "Dữ liệu phân tích chỉ ra tình trạng 'Dụng vượng Thế suy'. Cơ hội việc làm hoặc dự án bên ngoài có triển vọng tốt, nhưng bản thân bạn lực lượng chưa đủ hoặc đang chịu nhiều stress, lo lắng nên chưa thể gánh vác trọn vẹn.",
          "advice": "Cần bồi bổ sức khỏe, phân bổ công việc hợp lý và không nên ôm đồm quá nhiều việc cùng lúc."
        }
      }
    },
    "kinh doanh": {
      "scenarios": {
        "CAT": {
          "summary": "Công việc vô cùng hanh thông, cơ hội thăng tiến rộng mở.",
          "detail": "Quẻ cát tường hiển thị Dụng thần Quan Quỷ vượng tướng và Hào Thế hưng vượng. Bản mệnh có đầy đủ thực lực và được quý nhân nâng đỡ. Đây là thời cơ chín muồi để hành động, chuyển đổi công tác hoặc đảm nhận trọng trách mới.",
          "advice": "Hãy chủ động nắm bắt cơ hội, khiêm tốn học hỏi và quyết đoán thực thi kế hoạch."
        },
        "HUNG": {
          "summary": "Công việc gặp nhiều trắc trở, áp lực lớn, đề phòng rủi ro.",
          "detail": "Hệ thống phát hiện Dụng thần bị tổn hại (hồi đầu khắc, tuần không hoặc nguyệt phá) hoặc Hào Thế bị hóa Quỷ. Điềm báo mưu sự bất thành, dễ có sự tranh chấp, hao tài hoặc chịu áp lực nặng nề từ cấp trên.",
          "advice": "Thời điểm này nên tĩnh không nên động. Hãy tạm dừng các dự án lớn, phòng tránh tiểu nhân gièm pha và tập trung củng cố nội lực."
        },
        "BINH": {
          "summary": "Công việc ở thế tiến thoái lưỡng nan, có cơ hội nhưng bản thân mệt mỏi.",
          "detail": "Dữ liệu phân tích chỉ ra tình trạng 'Dụng vượng Thế suy'. Cơ hội việc làm hoặc dự án bên ngoài có triển vọng tốt, nhưng bản thân bạn lực lượng chưa đủ hoặc đang chịu nhiều stress, lo lắng nên chưa thể gánh vác trọn vẹn.",
          "advice": "Cần bồi bổ sức khỏe, phân bổ công việc hợp lý và không nên ôm đồm quá nhiều việc cùng lúc."
        }
      }
    },
    "dự án": {
      "scenarios": {
        "CAT": {
          "summary": "Công việc vô cùng hanh thông, cơ hội thăng tiến rộng mở.",
          "detail": "Quẻ cát tường hiển thị Dụng thần Quan Quỷ vượng tướng và Hào Thế hưng vượng. Bản mệnh có đầy đủ thực lực và được quý nhân nâng đỡ. Đây là thời cơ chín muồi để hành động, chuyển đổi công tác hoặc đảm nhận trọng trách mới.",
          "advice": "Hãy chủ động nắm bắt cơ hội, khiêm tốn học hỏi và quyết đoán thực thi kế hoạch."
        },
        "HUNG": {
          "summary": "Công việc gặp nhiều trắc trở, áp lực lớn, đề phòng rủi ro.",
          "detail": "Hệ thống phát hiện Dụng thần bị tổn hại (hồi đầu khắc, tuần không hoặc nguyệt phá) hoặc Hào Thế bị hóa Quỷ. Điềm báo mưu sự bất thành, dễ có sự tranh chấp, hao tài hoặc chịu áp lực nặng nề từ cấp trên.",
          "advice": "Thời điểm này nên tĩnh không nên động. Hãy tạm dừng các dự án lớn, phòng tránh tiểu nhân gièm pha và tập trung củng cố nội lực."
        },
        "BINH": {
          "summary": "Công việc ở thế tiến thoái lưỡng nan, có cơ hội nhưng bản thân mệt mỏi.",
          "detail": "Dữ liệu phân tích chỉ ra tình trạng 'Dụng vượng Thế suy'. Cơ hội việc làm hoặc dự án bên ngoài có triển vọng tốt, nhưng bản thân bạn lực lượng chưa đủ hoặc đang chịu nhiều stress, lo lắng nên chưa thể gánh vác trọn vẹn.",
          "advice": "Cần bồi bổ sức khỏe, phân bổ công việc hợp lý và không nên ôm đồm quá nhiều việc cùng lúc."
        }
      }
    },
    "tình yêu": {
      "scenarios": {
        "CAT": {
          "summary": "Tình duyên tốt đẹp, tình cảm thăng hoa ngọt ngào.",
          "detail": "Quẻ cát tường chỉ ra sự cảm ứng sâu sắc giữa Thế và Dụng thần (Thê Tài/Quan Quỷ). Hai bạn thấu hiểu và nâng đỡ lẫn nhau, gia đình đôi bên ủng hộ, mối quan hệ tiến triển vững chắc hướng tới hôn nhân viên mãn.",
          "advice": "Hãy trân trọng nhân duyên, chia sẻ chân thành để thắt chặt thêm sự gắn kết."
        },
        "HUNG": {
          "summary": "Tình duyên bất hòa, đề phòng rạn nứt hoặc chia rẽ.",
          "detail": "Quẻ hiện điềm báo bất lợi, kỵ thần Huynh Đệ hoặc Tử Tôn phát động khắc chế Dụng thần, hoặc hào Thế biến suy bại. Mối quan hệ dễ nảy sinh hiểu lầm lớn, cãi vã vặt vãnh hoặc có sự can thiệp từ bên ngoài gây rạn nứt.",
          "advice": "Cần bình tĩnh lắng nghe, kiềm chế cái tôi nóng nảy và tránh đưa ra quyết định vội vã lúc giận dỗi."
        },
        "BINH": {
          "summary": "Tình duyên bình lặng, chưa có đột phá rõ rệt.",
          "detail": "Quẻ cho thấy tình trạng tĩnh lặng hoặc Dụng vượng Thế suy. Tình cảm đôi bên vẫn còn nhưng có khoảng cách địa lý hoặc tâm lý chưa sẵn sàng mở lòng trọn vẹn, có chút lo lắng mơ hồ.",
          "advice": "Hãy tạo cơ hội gặp gỡ chia sẻ nhiều hơn, đừng để sự im lặng kéo dài tạo khoảng cách."
        }
      }
    },
    "hôn nhân": {
      "scenarios": {
        "CAT": {
          "summary": "Tình duyên tốt đẹp, tình cảm thăng hoa ngọt ngào.",
          "detail": "Quẻ cát tường chỉ ra sự cảm ứng sâu sắc giữa Thế và Dụng thần (Thê Tài/Quan Quỷ). Hai bạn thấu hiểu và nâng đỡ lẫn nhau, gia đình đôi bên ủng hộ, mối quan hệ tiến triển vững chắc hướng tới hôn nhân viên mãn.",
          "advice": "Hãy trân trọng nhân duyên, chia sẻ chân thành để thắt chặt thêm sự gắn kết."
        },
        "HUNG": {
          "summary": "Tình duyên bất hòa, đề phòng rạn nứt hoặc chia rẽ.",
          "detail": "Quẻ hiện điềm báo bất lợi, kỵ thần Huynh Đệ hoặc Tử Tôn phát động khắc chế Dụng thần, hoặc hào Thế biến suy bại. Mối quan hệ dễ nảy sinh hiểu lầm lớn, cãi vã vặt vãnh hoặc có sự can thiệp từ bên ngoài gây rạn nứt.",
          "advice": "Cần bình tĩnh lắng nghe, kiềm chế cái tôi nóng nảy và tránh đưa ra quyết định vội vã lúc giận dỗi."
        },
        "BINH": {
          "summary": "Tình duyên bình lặng, chưa có đột phá rõ rệt.",
          "detail": "Quẻ cho thấy tình trạng tĩnh lặng hoặc Dụng vượng Thế suy. Tình cảm đôi bên vẫn còn nhưng có khoảng cách địa lý hoặc tâm lý chưa sẵn sàng mở lòng trọn vẹn, có chút lo lắng mơ hồ.",
          "advice": "Hãy tạo cơ hội gặp gỡ chia sẻ nhiều hơn, đừng để sự im lặng kéo dài tạo khoảng cách."
        }
      }
    }
  }
};
