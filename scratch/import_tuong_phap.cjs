const fs = require('fs');
const path = require('path');

const jsonFile = path.join(__dirname, 'tuong_chan_extracted_rules.json');
const rules = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.log('Chưa cấu hình biến môi trường Supabase local. Sẽ bỏ qua import online và tích hợp thẳng vào code fallback.');
    process.exit(0);
}

async function importRules() {
    const headers = {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
    };

    console.log('Bắt đầu nạp quy tắc tượng pháp nâng cao vào Supabase...');

    for (let rule of rules) {
        const body = {
            chu_de: rule.chu_de,
            luc_than: rule.luc_than,
            trang_thai: rule.trang_thai,
            mo_ta_tuong: rule.mo_ta_tuong
        };

        try {
            const res = await fetch(`${supabaseUrl}/rest/v1/tuong_da_tang`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });
            if (res.ok) {
                console.log(`✓ Đã nạp tượng pháp: ${rule.luc_than}·${rule.trang_thai}`);
            } else {
                console.error('Lỗi khi nạp:', await res.text());
            }
        } catch (e) {
            console.error('Lỗi kết nối:', e.message);
        }
    }
}

importRules();
