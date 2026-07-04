import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const knowledgeDir = path.join(projectRoot, 'knowledge');
const apiDir = path.join(projectRoot, 'api');
const publicDir = path.join(projectRoot, 'public');

// Ensure api folder exists
if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir);
}

try {
    const deities = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'ontology', 'deities.json'), 'utf8'));
    const beasts = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'ontology', 'beasts.json'), 'utf8'));
    const rules = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'rules', 'luc_hao_rules.json'), 'utf8'));
    const workTemplate = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'templates', 'work.json'), 'utf8'));
    const loveTemplate = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'templates', 'love.json'), 'utf8'));

    const compiledData = {
        ontology: { deities, beasts },
        rules: rules,
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

    fs.writeFileSync(path.join(apiDir, 'compiled_knowledge.js'), outputCode, 'utf8');
    console.log('Successfully compiled knowledge files into api/compiled_knowledge.js!');

    // HACK: Tự động tạo thư mục public và sao chép các tệp tĩnh sang để Vercel đóng gói thành công
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }
    
    // Sao chép các tệp giao diện tĩnh
    const staticFiles = ['index.html', 'app.js', 'style.css', 'iching_core.js', 'calendar.js'];
    staticFiles.forEach(file => {
        const src = path.join(projectRoot, file);
        const dest = path.join(publicDir, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            console.log(`Copied ${file} to public/`);
        }
    });

} catch (err) {
    console.error('Compilation failed:', err);
    process.exit(1);
}
