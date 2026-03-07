import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactRequest {
    name: string;
    email: string;
    message: string;
}

interface ContactSuccessResponse {
    success: true;
}

interface ContactErrorResponse {
    error: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(
    request: NextRequest
): Promise<NextResponse<ContactSuccessResponse | ContactErrorResponse>> {
    let body: ContactRequest;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 }
        );
    }

    const { name, email, message } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
        return NextResponse.json(
            { error: "Name is required" },
            { status: 400 }
        );
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
        return NextResponse.json(
            { error: "Email is required" },
            { status: 400 }
        );
    }

    if (!EMAIL_REGEX.test(email)) {
        return NextResponse.json(
            { error: "Invalid email format" },
            { status: 400 }
        );
    }

    if (
        !message ||
        typeof message !== "string" ||
        message.trim().length === 0
    ) {
        return NextResponse.json(
            { error: "Message is required" },
            { status: 400 }
        );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL!,
            replyTo: email,
            subject: `Portfolio contact from ${name.trim()}`,
            text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}
