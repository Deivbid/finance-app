import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$delete"]
>;

export const useDeleteAccount = (id?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.accounts[":id"].$delete({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "Account deleted",
      });
      queryClient.invalidateQueries({
        queryKey: ["account", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      // TODO: Invalidate summary
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to delete account",
      });
    },
  });

  return mutation;
};
