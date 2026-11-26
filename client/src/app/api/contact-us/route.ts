import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(255),
    phone: z.string().max(30).optional(),
    subject: z.string().min(1).max(50),
    message: z.string().trim().min(10).max(2000),
});

export async function POST(request: Request) {
    try {
        const body: unknown = await request.json();

        const validation = contactSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Please provide valid contact information.',
                    errors: validation.error.flatten().fieldErrors,
                },
                { status: 400 },
            );
        }

        const backendUrl = process.env.GRIDCARE_API_URL;

        if (!backendUrl) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Contact service is not configured.',
                },
                { status: 503 },
            );
        }

        const response = await fetch(`${backendUrl}/contact-messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validation.data),
            cache: 'no-store',
        });

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: result.message || 'Unable to submit your message.',
                },
                { status: response.status },
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Your message has been submitted successfully.',
                data: result.data,
            },
            { status: 201 },
        );
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error. Please try again later.',
            },
            { status: 500 },
        );
    }
}
