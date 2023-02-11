
async function requestWrapper(expectsData, req, res, successMsg, funcBody) {
    let failReason = "Failed to connect to DB";
    try {
        const pool = await require('./dbconnector');
        const conn = await pool.getConnection();
        try {
            if (expectsData) {
                // (!) always return data in json format
                const data = await funcBody(conn);
                
                if (data == null || data == undefined || data.length == 0) {
                    res.status(402).json({ "status": "failed", "reason": "No data were found" });
                    return;
                }

                res.status(200).json(data);
                console.log(successMsg);
            } else {
                await funcBody(conn);
                res.status(200).json({ "status": "OK" });
                console.log(successMsg);
            }
        } finally {
            conn.release();
            failReason = "Failed to execute DB query";
        }
    } catch (err) {
        res.status(500).json({ "status": "failed", "reason": failReason });
        console.log(err);
    }
}

module.exports.requestWrapper = requestWrapper;
