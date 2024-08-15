import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)[":id"]["$patch"]
>["json"];

export const useEditCategory = (id?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories[":id"]["$patch"]({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "category updated",
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
        description: "Failed to edit category",
      });
    },
  });

  return mutation;
};
