import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const seedSqlPath = path.join(projectRoot, 'scratch', 'seed_hexagrams_lines.sql');
const schemaSqlPath = path.join(projectRoot, 'tuong_phap_schema.sql');
const outputDir = path.join(projectRoot, 'knowledge');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Bộ bóc tách thông minh hỗ trợ Bulk Insert nhiều dòng
function parseSqlInserts(sqlContent, tableName) {
    const results = [];
    // Regex lấy toàn bộ cụm VALUES của câu lệnh INSERT INTO
    const regex = new RegExp(`INSERT\\s+INTO\\s+${tableName}\\s*\\([^)]+\\)\\s*VALUES\\s*([\\s\\S]+?)(?:ON\\s+CONFLICT|;|\\r?\\n\\r?\\n|\\s*INSERT|$)`, 'gi');
    let match;

    while ((match = regex.exec(sqlContent)) !== null) {
        const valuesBlock = match[1].trim();
        // Phân tích các cặp ngoặc tròn chứa dòng giá trị
        let inString = false;
        let currentTuple = '';
        let braceCount = 0;
        
        for (let i = 0; i < valuesBlock.length; i++) {
            const char = valuesBlock[i];
            
            // Xử lý chuỗi nháy đơn
            if (char === "'" && valuesBlock[i - 1] !== '\\') {
                inString = !inString;
            }
            
            if (!inString) {
                if (char === '(') {
                    braceCount++;
                    if (braceCount === 1) {
                        currentTuple = '';
                        continue;
                    }
                }
                if (char === ')') {
                    braceCount--;
                    if (braceCount === 0) {
                        // Phân tích các cột trong dòng
                        const parsedTuple = parseSqlValues(currentTuple);
                        results.push(parsedTuple);
                        continue;
                    }
                }
            }
            if (braceCount > 0) {
                currentTuple += char;
            }
        }
    }
    return results;
}

function parseSqlValues(tupleStr) {
    const vals = [];
    let current = '';
    let inString = false;
    let i = 0;
    
    while (i < tupleStr.length) {
        const char = tupleStr[i];
        if (char === "'" && tupleStr[i - 1] !== '\\') {
            inString = !inString;
            i++;
            continue;
        }
        if (char === ',' && !inString) {
            vals.push(cleanVal(current));
            current = '';
        } else {
            current += char;
        }
        i++;
    }
    vals.push(cleanVal(current));
    return vals;
}

function cleanVal(str) {
    const trimmed = str.trim();
    if (trimmed.toUpperCase() === 'NULL') return null;
    if (!isNaN(trimmed) && trimmed !== '') {
        return Number(trimmed);
    }
    // Dọn dẹp dấu nháy đơn bọc chuỗi và comment SQL nếu có
    let clean = trimmed.replace(/\\'/g, "'");
    if (clean.startsWith("'") && clean.endsWith("'")) {
        clean = clean.substring(1, clean.length - 1);
    }
    return clean.trim();
}

try {
    console.log('--- KHỞI ĐỘNG TRÍCH XUẤT SQL SANG JSON DỮ LIỆU TĨNH ---');

    // 1. Phân tích seed_hexagrams_lines.sql
    if (fs.existsSync(seedSqlPath)) {
        const seedSql = fs.readFileSync(seedSqlPath, 'utf8');
        
        // --- 1.1 HEXAGRAMS ---
        const rawHexagrams = parseSqlInserts(seedSql, 'hexagrams');
        const hexagramsList = rawHexagrams.map(h => ({
            id: h[0],
            name: h[1],
            palace: h[2],
            vietnamese_meaning: h[3],
            overall_meaning: h[4],
            career_meaning: h[5],
            love_meaning: h[6],
            wealth_meaning: h[7],
            health_meaning: h[8]
        })).filter(h => h.id !== undefined && h.name);
        fs.writeFileSync(path.join(outputDir, 'hexagrams.json'), JSON.stringify(hexagramsList, null, 2), 'utf8');
        console.log(`✓ Đã trích xuất thành công ${hexagramsList.length} quẻ dịch sang hexagrams.json`);

        // --- 1.2 LINES ---
        const rawLines = parseSqlInserts(seedSql, 'lines');
        const linesList = rawLines.map(l => ({
            hexagram_id: l[0],
            line_number: l[1],
            relation: l[2],
            meaning_static: l[3],
            meaning_active: l[4]
        })).filter(l => l.hexagram_id !== undefined && l.line_number !== undefined);
        fs.writeFileSync(path.join(outputDir, 'lines.json'), JSON.stringify(linesList, null, 2), 'utf8');
        console.log(`✓ Đã trích xuất thành công ${linesList.length} hào từ sang lines.json`);
    }

    // 2. Phân tích tuong_phap_schema.sql
    if (fs.existsSync(schemaSqlPath)) {
        const schemaSql = fs.readFileSync(schemaSqlPath, 'utf8');

        // --- 2.1 TUONG_CO_BAN ---
        const rawCoBan = parseSqlInserts(schemaSql, 'tuong_co_ban');
        const coBanList = rawCoBan.map(cb => ({
            chu_de: cb[0],
            luc_than: cb[1],
            luc_thu: cb[2],
            y_nghia: cb[3]
        })).filter(cb => cb.chu_de);
        fs.writeFileSync(path.join(outputDir, 'tuong_co_ban.json'), JSON.stringify(coBanList, null, 2), 'utf8');
        console.log(`✓ Đã trích xuất thành công ${coBanList.length} tượng cơ bản sang tuong_co_ban.json`);

        // --- 2.2 TUONG_DA_TANG ---
        const rawDaTang = parseSqlInserts(schemaSql, 'tuong_da_tang');
        const daTangList = rawDaTang.map(dt => ({
            hao_vi: dt[0],
            luc_than: dt[1],
            luc_thu: dt[2],
            than_sat: dt[3],
            trang_thai: dt[4],
            chu_de: dt[5],
            mo_ta_tuong: dt[6]
        })).filter(dt => dt.luc_than && dt.trang_thai);
        fs.writeFileSync(path.join(outputDir, 'tuong_da_tang.json'), JSON.stringify(daTangList, null, 2), 'utf8');
        console.log(`✓ Đã trích xuất thành công ${daTangList.length} tượng đa tầng sang tuong_da_tang.json`);

        // --- 2.3 TUONG_DONG_BIEN ---
        const rawDongBien = parseSqlInserts(schemaSql, 'tuong_dong_bien');
        const dongBienList = rawDongBien.map(db => ({
            luc_than_goc: db[0],
            luc_than_bien: db[1],
            huong_bien: db[2],
            chu_de: db[3],
            mo_ta_bien: db[4]
        })).filter(db => db.luc_than_goc && db.luc_than_bien);
        fs.writeFileSync(path.join(outputDir, 'tuong_dong_bien.json'), JSON.stringify(dongBienList, null, 2), 'utf8');
        console.log(`✓ Đã trích xuất thành công ${dongBienList.length} tượng động biến sang tuong_dong_bien.json`);
    }

    console.log('✓ Hoàn tất trích xuất dữ liệu tĩnh Lục Hào!');

} catch (err) {
    console.error('❌ Thất bại khi trích xuất SQL:', err);
}
