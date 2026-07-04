-- SQL Script to create Lục Hào Database on Supabase
-- Run this in Supabase -> SQL Editor -> New Query

-- 1. Bảng 64 Quẻ Dịch (hexagrams)
CREATE TABLE IF NOT EXISTS hexagrams (
    id INT PRIMARY KEY, -- ID từ 0 đến 63 (hoặc index quẻ)
    name VARCHAR(100) NOT NULL, -- Tên quẻ (ví dụ: Địa Thiên Thái)
    palace VARCHAR(50) NOT NULL, -- Họ quẻ (Càn, Khôn, Ly...)
    vietnamese_meaning TEXT, -- Ý nghĩa Hán Việt / dịch nghĩa
    overall_meaning TEXT, -- Luận giải tổng quan cát hung
    career_meaning TEXT, -- Luận giải về Công việc & Sự nghiệp
    love_meaning TEXT, -- Luận giải về Tình cảm & Gia đạo
    wealth_meaning TEXT, -- Luận giải về Tài lộc & Kinh doanh
    health_meaning TEXT, -- Luận giải về Sức khỏe & Tật bệnh
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng 384 Hào (lines)
CREATE TABLE IF NOT EXISTS lines (
    id SERIAL PRIMARY KEY,
    hexagram_id INT REFERENCES hexagrams(id) ON DELETE CASCADE,
    line_number INT CHECK (line_number BETWEEN 1 AND 6), -- Hào từ 1 đến 6
    relation VARCHAR(50), -- Lục thân mặc định (Huynh đệ, Quan quỷ...)
    meaning_static TEXT, -- Giải nghĩa khi hào tĩnh
    meaning_active TEXT, -- Giải nghĩa khi hào động (phát động)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (hexagram_id, line_number)
);

-- 3. Bảng Dụng Thần theo Chủ Đề (topics_rules)
CREATE TABLE IF NOT EXISTS topics_rules (
    id SERIAL PRIMARY KEY,
    topic_name VARCHAR(100) UNIQUE NOT NULL, -- Tên chủ đề (công việc, thi cử...)
    primary_deity VARCHAR(50) NOT NULL, -- Dụng Thần chính (Quan Quỷ, Phụ Mẫu...)
    secondary_deity VARCHAR(50), -- Kỵ Thần hoặc Hỷ Thần liên quan
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tạo Index để tối ưu tốc độ truy vấn
CREATE INDEX IF NOT EXISTS idx_lines_hexagram ON lines(hexagram_id);
CREATE INDEX IF NOT EXISTS idx_topics_rules_name ON topics_rules(topic_name);

-- 4. Bảng chứa văn bản bình giải theo mã hóa ngữ nghĩa (semantic_texts)
CREATE TABLE IF NOT EXISTS semantic_texts (
    code VARCHAR(150) PRIMARY KEY, -- Mã khóa của quy tắc (ví dụ: THE_TRI_HUYNH_DE, DUNG_STATUS_HOI_DAU_KHAC)
    vietnamese_text TEXT NOT NULL, -- Văn bản giải nghĩa chi tiết tương ứng
    topic VARCHAR(50) DEFAULT 'all', -- Chỉ áp dụng cho chủ đề này hoặc 'all'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_semantic_texts_code ON semantic_texts(code);

