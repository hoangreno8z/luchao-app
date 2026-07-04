import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const knowledgeDir = path.join(projectRoot, 'knowledge');
const generatedDir = path.join(projectRoot, 'generated');

// Ensure generated folder exists
if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir);
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

    // Generate ES module file for modern Vercel serverless environment
    const outputCode = `// Generated compiled knowledge file - DO NOT EDIT MANUALLY
export const COMPILED_KNOWLEDGE = ${JSON.stringify(compiledData, null, 2)};
`;

    fs.writeFileSync(path.join(generatedDir, 'compiled_knowledge.js'), outputCode, 'utf8');
    console.log('Successfully compiled knowledge files into generated/compiled_knowledge.js!');
} catch (err) {
    console.error('Compilation failed:', err);
    process.exit(1);
}
