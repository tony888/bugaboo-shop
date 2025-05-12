import { NextRequest, NextResponse } from 'next/server'
import Redis from 'ioredis';
import configuration from '../../../../config/configuration';
const config = configuration();
const redis = new Redis({
    port: config.redis.port, // Redis port
    host: config.redis.url, // Redis host
    tls: {}
});
export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    const { email, otp } = body;
    const storedOtp = await redis.get(email);

    if (storedOtp === otp) {
        return NextResponse.json({
            message: 'OTP verified successfully',
        }, { status: 200 });

    } else {
        return NextResponse.json({
            error: 'Invalid or expired OTP',
        }, { status: 400 });
    }
}
