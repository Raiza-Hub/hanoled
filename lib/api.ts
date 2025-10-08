import { SchoolResponse, SchoolsResponse, ValidatePasswordResponse } from '@/type';


export async function getSchool(slug: string): Promise<SchoolResponse> {
    const res = await fetch(`/api/school/${slug}`);

    if (!res.ok) {
        throw new Error("Failed to fetch schools");
    }

    const data = await res.json();
    console.log(data);
    

    return {
        ...data,
        message: data.message
            ? (() => {
                try {
                    return {
                        ...data.message,
                        metadata: data.message.metadata
                            ? JSON.parse(data.message.metadata)
                            : {},
                    };
                } catch {
                    console.warn(
                        `Invalid JSON in organization metadata for slug: ${slug}`,
                    );
                    return { ...data.message, metadata: {} };
                }
            })() : {}
    };
}

export async function getAllSchools(): Promise<SchoolsResponse> {
    const res = await fetch("/api/schools");

    if (!res.ok) {
        throw new Error("Failed to fetch schools");
    }

    const data = await res.json();

    return {
        ...data,
        message: data.message.map((school: { metadata?: string;[key: string]: unknown }) => ({
            ...school,
            metadata: school.metadata ? (() => {
                try {
                    return JSON.parse(school.metadata);
                } catch {
                    console.warn(`Invalid JSON in school metadata for school:`, school);
                    return {};
                }
            })() : {},
        })),
    };
}


export const validatePassword = async (password: string): Promise<ValidatePasswordResponse> => {
    if (!password || !password.trim()) {
     throw new Error("Please enter your password");
   }

    const response = await fetch('/api/validate-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
    if (!response.ok) {
        throw new Error('Incorrect password.');
    }
    return response.json();
};
