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
