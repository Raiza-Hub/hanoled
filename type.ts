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
    length?: number;
  };
}

export interface CreateSchoolError {
  success: false;
  message: string;
}

export interface CreateSubjectResponse {
  success: boolean;
  message: {
    id: string;
    organizationId: string;
    memberId: string;
    subjectName: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

 export interface School {
  message: {
    id: string
    name: string
    slug: string
    address: string
    city: string
    state: string
    country: string
    zipCode: string
    email: string
    logo: string
    metadata: string // e.g. phone number
    website: string
    category: string
    schoolType: string
    paymentStatus: boolean
    parentNo: number
    studentNo: number
    teacherNo: number
    createdAt: string
    socialLinks: {
      url: string
      type: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | string
    }[]
  }[]
}


 export interface SchoolMessage {
    id: string
    name: string
    slug: string
    address: string
    city: string
    state: string
    country: string
    zipCode: string
    email: string
    logo: string
    metadata: string // e.g. phone number
    website: string
    category: string
    schoolType: string
    paymentStatus: boolean
    parentNo: number
    studentNo: number
    teacherNo: number
    createdAt: string
    socialLinks: {
      url: string
      type: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | string
    }[]
 }


 export interface UniqueSchool {
  message: {
    address: string
    category: string
    city: string
    country: string
    createdAt: string // ISO date string
    email: string
    id: string
    logo: string
    members: Member[]
    phone: string // phone number as string
    name: string
    parentNo: number
    paymentStatus: boolean
    schoolType: string
    slug: string
    socialLinks: {
      url: string
      type: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | string
    }[]
    state: string
    studentNo: number
    teacherNo: number
    website: string
    zipCode: string
  }
  role: string[]
  success: boolean
}

export interface Member {
  id: string
  createdAt: string
  isAssigned: boolean
  organizationId: string
  role: string
  userId: string
  user: MemberUser
}

export interface MemberUser {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null
  createdAt: string
  updatedAt: string
}

export interface MemberResponse { 
  success: boolean
  message: Member[]
}

export interface ClassTeacherUser {
  user: MemberUser;
}

export interface UnassignedMemberItem {
  id: string;
  createdAt: string;
  isAssigned: boolean;
  organizationId: string;
  role: string;
  userId: string;
  user: MemberUser;
}

export interface UnassignedMember {
  success: boolean;
  message: UnassignedMemberItem[];
}


export interface ClassItem {
  id: string;
  class: string;
  level: string;
  limit: number;
  memberId: string;
  member: ClassTeacherUser;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
};


export type SubjectItem = string;

export type ApiResponse<T> = {
  message: T[];
  success: boolean;
};

export interface SubjectsResponse {
  message: string[];
  success: boolean;
}

export interface StudentResponse {
  success: boolean;
  message: Student[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
  image?: string | null;
}


export interface Student {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  admissionDate: string;
  classLevel: string;
  address: string;
  guardianFullName: string;
  guardianEmail: string;
  guardianPhone: string;
  image?: string | null;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParentStudent {
  parentId: string;
  studentId: string;
  student: Student;
}

export interface Parent {
  id: string;
  organizationId: string;
  role: string;
  createdAt: string;
  user: User;
  students: ParentStudent[];
}


export interface Student {
  id: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  image?: string | null;
  dateOfBirth: string;
  guardianFullName: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  classLevel: string;
  admissionDate: string;
  createdAt: string;
  updatedAt: string;
  parent: StudentParentRelation[];
}

export interface StudentParentRelation {
  parentId: string;
  studentId: string;
  parent: Parent;
}


export interface Parent {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  createdAt: string;
  users: ParentUser;
}

export interface ParentUser {
  name: string;
  email: string;
}