import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"]
>;

export const useDeleteCategory = (id?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.categories[":id"].$delete({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "Category deleted",
      });
      queryClient.invalidateQueries({
        queryKey: ["category", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to delete category",
      });
    },
  });

  return mutation;
};
