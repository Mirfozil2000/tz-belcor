import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json();
    await new Promise((resolve) => setTimeout(resolve, 100));
    return NextResponse.json({
      success: true,
      message: `Команда "${command}" успешно выполнена`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Ошибка выполнения команды" },
      { status: 500 }
    );
  }
}
