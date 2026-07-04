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
