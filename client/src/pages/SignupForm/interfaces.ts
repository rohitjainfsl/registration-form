export interface Errors {
  [key: string]: string;
}

export interface RegistrationFormValues {
  name: string;
  email: string;
  phone: string;
  dob?: Date;
  gender: string;
  fatherName: string;
  fatherPhone: string;
  localAddress: string;
  sameAsLocal: boolean;
  permanentAddress: string;
  aadharFront: string | null;
  aadharBack: string | null;
  profession: "student" | "professional";
  qualification: string;
  qualYear: string;
  college: string;
  designation: string;
  company: string;
  course: string;
  referral: string;
  friendName: string;
  tcAccepted: boolean;
}

export interface RegistrationPayload
  extends Omit<RegistrationFormValues, "dob"> {
  dob: string | null;
}
