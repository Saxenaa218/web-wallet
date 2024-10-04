"use client";

import { useParams } from "next/navigation";

const WalletViewer = () => {
  const { wallet } = useParams();
  return <div>{wallet}</div>;
};

export default WalletViewer;
