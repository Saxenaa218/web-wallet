"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EthWallets } from "@/component/EthWallets";
import AuthComponent from "@/component/AuthComponent";

export default function Home() {
  // set passkey time to 1 hour
  if (!sessionStorage.getItem("passkeyTime")) {
    return <AuthComponent />;
  }
  const passkeyTime: number = parseInt(
    sessionStorage.getItem("passkeyTime") || "0"
  );
  if (passkeyTime && Date.now() - passkeyTime > 1000 * 60 * 60) {
    sessionStorage.removeItem("passkeyTime");
    return <AuthComponent />;
  }

  return (
    <div className="items-center justify-items-center min-h-screen p-10 gap-16">
      <main>
        <h1 className="text-4xl font-bold">Wallet</h1>
        <Tabs defaultValue="eth" className="w-full mt-8">
          <TabsList>
            <TabsTrigger value="eth">Ethereum</TabsTrigger>
            <TabsTrigger value="sol">Solana</TabsTrigger>
          </TabsList>
          <TabsContent value="eth" className="mt-4">
            <EthWallets />
          </TabsContent>
          <TabsContent value="sol">Comming Soon</TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
