import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>["json"];

export const useBulkCreateTransactions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions["bulk-create"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "Transactions created",
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      //TODO: Invalidate Summaries too
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to create transactions",
      });
    },
  });

  return mutation;
};
