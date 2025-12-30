"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomToast } from "../custom-toast";

interface UseSubmitHandlerProps {
    url: string;
    queryKeyValue: string
    slug?: string
}

export const useSubmitHandler = <T extends Record<string, unknown> | FormData>({
    url,
    queryKeyValue,
    slug
}: UseSubmitHandlerProps) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: T) => {
            const isFormData = data instanceof FormData;

            const res = await fetch(url, {
                method: "PATCH",
                credentials: "include",
                // Don't set Content-Type for FormData - browser sets it with boundary
                ...(isFormData ? {} : {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }),
                body: isFormData ? data : JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }

            return res.json();
        },
        onSuccess: (data) => {
            CustomToast({
                message: data.message,
            });
            if (slug) {
                queryClient.invalidateQueries({ queryKey: [queryKeyValue, slug] });
            } else {
                queryClient.invalidateQueries({ queryKey: [queryKeyValue] });
            }
        },
        onError: (error) => {
            CustomToast({
                variant: "error",
                message: error.message,
            });
        },
    });

    return mutation;
};
