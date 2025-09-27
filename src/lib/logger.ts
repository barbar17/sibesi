import type { PoolConnection } from "mysql2/promise";

export async function logger(conn: PoolConnection, user: string, message: string) {
    try {
        const [res] = await conn.execute(`INSERT INTO log (user, keterangan) VALUES (?, ?) `, [user, message]);

        return res;
    } catch (err: any) {
        return new Error(`Gagal menambahkan log, ${err.message || err}`);
    }
    
}