import { useOpenCategory } from "@/features/categories/hooks/useOpenCategory";
import { useOpenTransaction } from "@/features/transactions/hooks/useOpenTransaction";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

type CategoryColumnProps = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export const CategoryColumn = ({
  id,
  category,
  categoryId,
}: CategoryColumnProps) => {
  const { onOpen: onOpenAccount } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();
  const onClick = () => {
    if (categoryId) {
      onOpenAccount(categoryId);
    } else {
      if (id) {
        onOpenTransaction(id);
      }
    }
  };

  return (
    <div
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
      )}
      onClick={onClick}
    >
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category || "Uncategorized"}
    </div>
  );
};
