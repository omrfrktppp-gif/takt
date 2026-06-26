import { NextResponse } from "next/server";
import {
  baslangicFormuAsset,
  isPdfBuffer,
} from "@/lib/baslangic-formu";
import { isDriveUploadConfigured, uploadPdfToDrive } from "@/lib/google-drive";

export const runtime = "nodejs";

/** Yalnızca Google Drive yedeklemesi (e-posta Web3Forms istemci tarafında). */
export async function POST(request: Request) {
  if (!isDriveUploadConfigured()) {
    return NextResponse.json({ success: true, driveSaved: false });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, message: "Geçersiz istek." },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { success: false, message: "Dosya bulunamadı." },
      { status: 400 },
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (!isPdfBuffer(buffer)) {
    return NextResponse.json(
      { success: false, message: "Geçerli bir PDF değil." },
      { status: 400 },
    );
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const storedName = `takt-baslangic-formu_${timestamp}_${file.name || "form.pdf"}`;

  try {
    const driveResult = await uploadPdfToDrive({
      buffer,
      filename: storedName,
    });
    return NextResponse.json({
      success: true,
      driveSaved: Boolean(driveResult?.webViewLink),
      driveLink: driveResult?.webViewLink,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Drive kaydı başarısız." },
      { status: 502 },
    );
  }
}
