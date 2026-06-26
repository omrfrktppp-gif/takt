/**
 * Web3Forms — istemci tarafı gönderim.
 * Ücretsiz planda sunucu IP'sinden POST engellenir; access_key tarayıcıdan gider.
 * Web3Forms panelinde takt.tr için domain kısıtı açın.
 */
export function getWeb3FormsAccessKey(): string {
  return process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";
}

export function isWeb3FormsConfigured(): boolean {
  return getWeb3FormsAccessKey().length > 0;
}

export type Web3FormsJsonPayload = {
  access_key: string;
  subject: string;
  from_name: string;
  name: string;
  email: string;
  phone?: string;
  replyto?: string;
  message: string;
};

export async function parseWeb3FormsResponse(response: Response): Promise<{
  success: boolean;
  message?: string;
}> {
  const text = await response.text();
  try {
    const result = JSON.parse(text) as { success?: boolean; message?: string };
    return {
      success: Boolean(result.success),
      message: result.message,
    };
  } catch {
    return {
      success: false,
      message: `Web3Forms yanıt hatası (HTTP ${response.status}).`,
    };
  }
}
