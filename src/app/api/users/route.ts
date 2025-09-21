import poolDB from "@/lib/db";

export async function GET() {
    try {
        const [rows] = await poolDB.query("SELECT 1 AS result");
        return new Response(JSON.stringify({
            success: true,
            message: rows
        }), {
            status: 200,
            headers: {"Content-Type": 'application/json'},
        });
    } catch (err: any) {
        console.log(err);
        return new Response(JSON.stringify({
            success: false,
            error: err.message,
        }), {
            status: 500,
            headers: {"Content-Type": 'application/json'},
        });
    }
}

// export async function GET(request: Request) {
//     const users = [
//         {id: 1, name: "user_1"},
//         {id: 2, name: "user_2"},
//     ];
//     return new Response(JSON.stringify(users), {
//         status: 200,
//         headers: {'Content-Type': 'application/json'}
//     })
// }