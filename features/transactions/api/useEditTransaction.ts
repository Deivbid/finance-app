import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)[":id"]["$patch"]
>["json"];

export const useEditTransaction = (id?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions[":id"]["$patch"]({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "Transaction updated",
      });
      queryClient.invalidateQueries({
        queryKey: ["transaction", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      // TODO: Invalidate summary
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to edit Transaction",
      });
    },
  });

  return mutation;
};
