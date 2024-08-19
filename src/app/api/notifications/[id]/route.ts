import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  const notification = await prisma.notification.update({
    where: {
      id: id,
    },
    data: {
      isRead: true,
    },
  });

  return NextResponse.json({
    data: notification,
  });
}
