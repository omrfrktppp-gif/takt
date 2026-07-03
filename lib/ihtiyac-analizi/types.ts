export type QuestionType = "single" | "multi" | "text";

export type FormOption = {
  value: string;
  label: string;
};

export type FormQuestion = {
  id: string;
  label: string;
  type: QuestionType;
  required?: boolean;
  options?: FormOption[];
  placeholder?: string;
  optional?: boolean;
};

export type FormScreen = {
  id: string;
  title: string;
  description?: string;
  questions: FormQuestion[];
};

export type Answers = Record<string, string | string[]>;

export type ServiceBranchId =
  | "tasarim-gelistirme"
  | "analiz-hesaplama"
  | "uretim-danismanligi"
  | "arge-urge"
  | "tubitak-kosgeb"
  | "teknik-ekip"
  | "proje-danismanligi";

export type CtaChoice = "randevu" | "iletisim";

export type FormSubmissionPayload = {
  answers: Answers;
  primaryService: ServiceBranchId;
  secondaryServices: ServiceBranchId[];
  ctaChoice: CtaChoice;
  contact: {
    name: string;
    company: string;
    email: string;
    phone: string;
    city: string;
    companySize: string;
    sector: string;
  };
  kvkkAccepted: boolean;
  botcheck: string;
  summaryText: string;
};

export type PersistedFormState = {
  answers: Answers;
  screenHistory: string[];
  primaryService: ServiceBranchId | null;
};
