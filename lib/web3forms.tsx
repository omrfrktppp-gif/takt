/** Web3Forms — doğrudan HTML form POST (resmi örnek). */
export const WEB3FORMS_SUBMIT_URL = "https://api.web3forms.com/submit";

export const WEB3FORMS_ACCESS_KEY = "01980218-5dbb-42ef-8b56-3fbc2c93d874";

export function web3formsRedirect(path: string): string {
  const base = "https://takt.tr";
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type HiddenFieldsProps = {
  redirect: string;
  subject: string;
  kaynak: string;
};

export function Web3FormsHiddenFields({
  redirect,
  subject,
  kaynak,
}: HiddenFieldsProps) {
  return (
    <>
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="redirect" value={redirect} />
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="kaynak" value={kaynak} />
    </>
  );
}
