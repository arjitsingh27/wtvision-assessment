import { dummyList } from "@/app/constant/dummy-json-list";

export async function GET(req) {
    return new Response(JSON.stringify(dummyList), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
