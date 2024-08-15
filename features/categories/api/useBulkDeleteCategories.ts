import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.categories)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteCategories = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories["bulk-delete"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "Categories deleted",
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      //TODO: Invalidate Summaries too
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to delete categories",
      });
    },
  });

  return mutation;
};
