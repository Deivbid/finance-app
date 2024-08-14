"use client";
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";

export default function Home() {
  const { onOpen } = useNewAccount();
  return (
    <div>
      homepage
      <Button onClick={onOpen}>Click me!</Button>
    </div>
  );
}
