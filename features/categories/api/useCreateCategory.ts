import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories.$post>; // What is expectir to return
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"]; // What is expecting to accept

export const useCreateCategory = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "Category created",
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to create category",
      });
    },
  });

  return mutation;
};
