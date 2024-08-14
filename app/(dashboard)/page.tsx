"use client";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";

export default function Home() {
  const { data: accounts } = useGetAccounts();
  return <div>homepage</div>;
}
