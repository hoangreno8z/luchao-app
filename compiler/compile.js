import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const knowledgeDir = path.join(projectRoot, 'knowledge');
const libDir = path.join(projectRoot, 'lib');
const apiDir = path.join(projectRoot, 'api');
const publicDir = path.join(projectRoot, 'public');

// Ensure lib and api folders exist
if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
}
if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
}

try {
    const deities = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'ontology', 'deities.json'), 'utf8'));
    const beasts = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'ontology', 'beasts.json'), 'utf8'));
    const rules = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'rules', 'luc_hao_rules.json'), 'utf8'));
    const workTemplate = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'templates', 'work.json'), 'utf8'));
    const loveTemplate = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'templates', 'love.json'), 'utf8'));

    // Load các file tri thức Lục Hào mới trích xuất
    const hexagrams = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'hexagrams.json'), 'utf8'));
    const lines = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'lines.json'), 'utf8'));
    const tuong_co_ban = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'tuong_co_ban.json'), 'utf8'));
    const tuong_da_tang = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'tuong_da_tang.json'), 'utf8'));
    const tuong_dong_bien = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'tuong_dong_bien.json'), 'utf8'));

    const compiledData = {
        ontology: { deities, beasts },
        rules: rules,
        hexagrams: hexagrams,
        lines: lines,
        tuong_co_ban: tuong_co_ban,
        tuong_da_tang: tuong_da_tang,
        tuong_dong_bien: tuong_dong_bien,
        templates: {
            'công việc': workTemplate,
            'thi cử': workTemplate,
            'kinh doanh': workTemplate,
            'dự án': workTemplate,
            'tình yêu': loveTemplate,
            'hôn nhân': loveTemplate
        }
    };

    // Đổi thư mục đầu ra sang thẳng thư mục api/ để Vercel không bị lỗi gom nhóm file
    const outputCode = `// Generated compiled knowledge file - DO NOT EDIT MANUALLY
export const COMPILED_KNOWLEDGE = ${JSON.stringify(compiledData, null, 2)};
`;

    fs.writeFileSync(path.join(libDir, 'compiled_knowledge.js'), outputCode, 'utf8');
    console.log('Successfully compiled knowledge files into lib/compiled_knowledge.js!');

    // HACK: Tự động tạo thư mục public và sao chép các tệp tĩnh sang để Vercel đóng gói thành công
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }
    
    // Sao chép các tệp giao diện tĩnh của phân hệ Trang Chủ & Kinh Dịch
    const staticFiles = ['index.html', 'app.js', 'style.css', 'iching_core.js', 'calendar.js', 'seal_stamp.jpg', 'og_cover.jpg', 'og_share_v2.png', 'biavipvercel.png', 'kinhdich.png', 'tuvi.png', 'battuicon.png', 'thaiat.png', 'mattroi.jpg', 'traidat.jpg', 'mattrang.jpg', 'nganha.jpg', 'lightning_bg.jpg', 'hoang_intro_card.png', 'robots.txt', 'sitemap.xml'];
    staticFiles.forEach(file => {
        const src = path.join(projectRoot, file);
        const dest = path.join(publicDir, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            console.log(`Copied ${file} to public/`);
        }
    });

    // Hàm sao chép đệ quy thư mục
    function copyDirRecursiveSync(src, dest) {
        if (!fs.existsSync(src)) return;
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (let entry of entries) {
            // Bỏ qua các thư mục & tệp phát triển không cần thiết
            const ignoredNames = ['node_modules', '.git', '.gitignore', 'scratch', 'docs', 'README.md', 'ThaiAt_ToanThu.md', '.DS_Store'];
            if (ignoredNames.includes(entry.name)) {
                continue;
            }
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            if (entry.isDirectory()) {
                copyDirRecursiveSync(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    // Sao chép đệ quy thư mục phân hệ Kinh Dịch sang public/kinh-dich
    const srcKinhDich = path.join(projectRoot, 'kinh-dich');
    const destKinhDich = path.join(publicDir, 'kinh-dich');
    if (fs.existsSync(srcKinhDich)) {
        copyDirRecursiveSync(srcKinhDich, destKinhDich);
        console.log('Successfully copied kinh-dich module recursively to public/kinh-dich!');
    }

    // Sao chép đệ quy thư mục phân hệ Thái Ất sang public/thai-at
    const srcThaiAt = path.join(projectRoot, 'thai-at');
    const destThaiAt = path.join(publicDir, 'thai-at');
    if (fs.existsSync(srcThaiAt)) {
        copyDirRecursiveSync(srcThaiAt, destThaiAt);
        console.log('Successfully copied thai-at module recursively to public/thai-at!');
    }

    // Sao chép đệ quy thư mục phân hệ Bát Tự sang public/bat-tu
    const srcBatTu = path.join(projectRoot, 'bat-tu');
    const destBatTu = path.join(publicDir, 'bat-tu');
    if (fs.existsSync(srcBatTu)) {
        copyDirRecursiveSync(srcBatTu, destBatTu);
        console.log('Successfully copied bat-tu module recursively to public/bat-tu!');
    }

    // Sao chép đệ quy thư mục phân hệ Tử Vi sang public/tu-vi
    const srcTuVi = path.join(projectRoot, 'tu-vi');
    const destTuVi = path.join(publicDir, 'tu-vi');
    if (fs.existsSync(srcTuVi)) {
        copyDirRecursiveSync(srcTuVi, destTuVi);
        console.log('Successfully copied tu-vi module recursively to public/tu-vi!');
    }

    // Sao chép đệ quy thư mục phân hệ Phong Thủy sang public/phong-thuy
    const srcPhongThuy = path.join(projectRoot, 'phong-thuy');
    const destPhongThuy = path.join(publicDir, 'phong-thuy');
    if (fs.existsSync(srcPhongThuy)) {
        copyDirRecursiveSync(srcPhongThuy, destPhongThuy);
        console.log('Successfully copied phong-thuy module recursively to public/phong-thuy!');
    }

    // Sao chép đệ quy thư mục lib sang public/lib để phục vụ browser nếu cần
    const destLib = path.join(publicDir, 'lib');
    if (fs.existsSync(libDir)) {
        copyDirRecursiveSync(libDir, destLib);
        console.log('Successfully copied lib directory recursively to public/lib!');
    }

    // Nếu tồn tại thư mục .vercel/output/static thì đồng bộ hóa luôn
    const vercelStaticDir = path.join(projectRoot, '.vercel', 'output', 'static');
    if (fs.existsSync(vercelStaticDir)) {
        copyDirRecursiveSync(publicDir, vercelStaticDir);
        console.log('Successfully synced public assets to .vercel/output/static!');
    }

} catch (err) {
    console.error('Compilation failed:', err);
    process.exit(1);
}
