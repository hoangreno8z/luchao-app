export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        try {
            const { imgData, filename } = req.body || {};
            if (!imgData) {
                return res.status(400).json({ error: 'Missing imgData' });
            }

            const base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
            const imgBuffer = Buffer.from(base64Data, 'base64');
            const fname = filename || `que_luc_hao_${Date.now()}.png`;

            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Disposition', `inline; filename="${fname}"`);
            res.setHeader('Content-Length', imgBuffer.length);
            return res.status(200).send(imgBuffer);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
