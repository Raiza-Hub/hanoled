export interface SchoolMetadata {
  country: string;
  state: string;
  city: string;
  address: string;
  phone_number: string;
}

export interface SchoolMessage {
  id: string;
  name: string;
  slug: string;
  logo: string;
  metadata: SchoolMetadata; 
  createdAt: string;
}

export interface SchoolsResponse {
  success: boolean;
  message: SchoolMessage[];
}


export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  lastActive: string;
}

export interface Member {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  createdAt: string;
  user: User;
}

export interface School {
  id: string;
  name: string;
  slug: string;
  logo: string;
  metadata: SchoolMetadata;
  createdAt: string;
  members: Member[];
}

export interface SchoolResponse {
  success: boolean;
  message: School;
  roles: string[];
}

export type ValidatePasswordResponse = {
  success: boolean;
};

export interface OtpResponse {
  success: boolean;
  message: string;
}

export interface GetNewOtpSuccess {
  message: string;
}
export interface GetNewOtpError {
  success: boolean;
  message: string;
}

export interface SignUpSuccess {
  success: true;
  result: {
    id: string;
    name: string;
    email: string;
    password: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface SignUpError {
  success: false;
  message: string;
}

export interface SignInResponse {
  success: false;
  message: string;
}

export interface ForgotPassword {
  message: string;
}

export interface CreateSchoolSuccess {
  success: boolean;
  message: {
    id: string;
    name: string;
    slug: string;
    logo: string;
    email: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    studentNo: number;
    teacherNo: number;
    parentNo: number;
    category: "primary" | "secondary" | "tertiary" | string;
    schoolType: "private" | "public" | "federal" | "state" | string;
    website: string;
    socialLinks: {
      twitter?: string;
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      [key: string]: string | undefined;
    };
    paymentStatus: boolean;
    metadata: string;
    createdAt: string;
  };
}

export interface CreateSchoolError {
  success: false;
  message: string;
}