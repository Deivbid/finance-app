import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$delete"]
>;

export const useDeleteTransaction = (id?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.transactions[":id"].$delete({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "Transaction deleted",
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
        description: "Failed to delete transaction ",
      });
    },
  });

  return mutation;
};
