import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts.$post>; // What is expectir to return
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]; // What is expecting to accept

export const useCreateAccount = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "Account created",
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to create account",
      });
    },
  });

  return mutation;
};
