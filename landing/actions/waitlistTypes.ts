export type EmailWaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export const initialEmailWaitlistState: EmailWaitlistState = {
  status: "idle"
};
