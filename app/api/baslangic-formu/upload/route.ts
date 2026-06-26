import { NextResponse } from "next/server";

/** @deprecated İstemci doğrudan Web3Forms + /api/baslangic-formu/drive kullanır. */
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Bu uç nokta kaldırıldı. Sayfayı yenileyip tekrar deneyin.",
    },
    { status: 410 },
  );
}
