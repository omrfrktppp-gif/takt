import { Readable } from "node:stream";
import { google } from "googleapis";

export type DriveUploadResult = {
  fileId: string;
  webViewLink?: string;
};

function getDriveAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim();
  if (!email || !rawKey) return null;

  const key = rawKey.replace(/\\n/g, "\n");
  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });
}

export function isDriveUploadConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_DRIVE_FOLDER_ID?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim(),
  );
}

export async function uploadPdfToDrive({
  buffer,
  filename,
}: {
  buffer: Buffer;
  filename: string;
}): Promise<DriveUploadResult | null> {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID?.trim();
  const auth = getDriveAuth();
  if (!folderId || !auth) return null;

  const drive = google.drive({ version: "v3", auth });
  const stream = Readable.from(buffer);

  const created = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [folderId],
      mimeType: "application/pdf",
    },
    media: {
      mimeType: "application/pdf",
      body: stream,
    },
    fields: "id, webViewLink",
    supportsAllDrives: true,
  });

  const fileId = created.data.id;
  if (!fileId) return null;

  return {
    fileId,
    webViewLink: created.data.webViewLink ?? undefined,
  };
}
