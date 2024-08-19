import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount";

type AccountColumnProps = {
  id: string;
  account: string;
  accountId: string;
};

export const AccountColumn = ({
  id,
  account,
  accountId,
}: AccountColumnProps) => {
  const { onOpen: onOpenAccount } = useOpenAccount();
  const onClick = () => {
    onOpenAccount(accountId);
  };

  return (
    <div
      className="flex items-center cursor-pointer hover:underline"
      onClick={onClick}
    >
      {account}
    </div>
  );
};
