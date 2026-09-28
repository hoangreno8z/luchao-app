// In-memory sliding window rate limiter
const ipRequestMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 40;     // 40 requests / minute / IP

export function applySecurityHeaders(req, res) {
    const origin = req.headers.origin || req.headers.referer || '';
    
    // Set standard CORS & Security headers
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return false;
    }

    // Rate Limiting by IP
    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();
    const clientRecord = ipRequestMap.get(clientIp);

    if (!clientRecord || (now - clientRecord.timestamp > RATE_LIMIT_WINDOW_MS)) {
        ipRequestMap.set(clientIp, { timestamp: now, count: 1 });
    } else {
        clientRecord.count++;
        if (clientRecord.count > MAX_REQUESTS_PER_WINDOW) {
            res.setHeader('Retry-After', '60');
            res.status(429).json({ 
                error: 'Too Many Requests', 
                message: 'Bạn đã gửi qu� nhiều yêu cầu tính toán. Vui lòng chờ 1 phút trước khi thử lại.' 
            });
            return false;
        }
    }

    return true;
}