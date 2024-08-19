import prisma from '@/lib/prisma';
import { createNotificationSchema } from '@/schema/create-notification.schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const payload = await request.json();

  const result = createNotificationSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      {
        error: result.error,
      },
      {
        status: 400,
      }
    );
  }

  const notification = await prisma.notification.create({
    data: result.data,
  });

  return NextResponse.json({
    data: notification,
  });
}

export async function GET(request: NextRequest) {
  const notifications = await prisma.notification.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json({
    data: notifications,
  });
}

export async function PUT() {
  await prisma.notification.updateMany({
    where: {
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
  return NextResponse.json({
    success: true,
  });
}
