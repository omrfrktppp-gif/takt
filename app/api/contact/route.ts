import { NextResponse } from "next/server";

/** @deprecated Formlar doğrudan Web3Forms HTML POST kullanır. */
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: "Bu uç nokta kaldırıldı. Sayfadaki formu kullanın.",
    },
    { status: 410 },
  );
}
