const fs = require('fs');
const lines = fs.readFileSync('C:/Users/ADMIN/.gemini/antigravity/brain/82191e73-d2a0-4dc1-93fb-349cb9393866/.system_generated/logs/transcript_full.jsonl', 'utf-8').trim().split('\n');
for (let i = lines.length - 1; i >= 0; i--) {
    try {
        const data = JSON.parse(lines[i]);
        if (data.type === 'USER_INPUT' && data.content && data.content.includes('==Start of PDF==')) {
            let text = data.content;
            const startIndex = text.indexOf('==Start of PDF==') + 16;
            const endIndex = text.lastIndexOf('==End of PDF==');
            if (startIndex !== -1 && endIndex !== -1) {
                let pdfText = text.substring(startIndex, endIndex);
                pdfText = pdfText.replace(/==Screenshot for page \d+==/g, '');
                pdfText = pdfText.replace(/==Start of OCR for page \d+==/g, '');
                pdfText = pdfText.replace(/==End of OCR for page \d+==/g, '');
                let existing = fs.readFileSync('api/thai_at_knowledge.js', 'utf-8');
                existing = existing.replace(/`;\s*$/, '') + '\n\n// --- KIẾN THỨC BỔ SUNG TỪ PDF ---\n' + pdfText.replace(/`/g, '\\\\`') + '\n`;\n';
                fs.writeFileSync('api/thai_at_knowledge.js', existing);
                console.log('Success! Wrote ' + pdfText.length + ' chars.');
                process.exit(0);
            }
        }
    } catch(e) {}
}
console.log('Not found.');
