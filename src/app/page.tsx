"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EthWallets } from "@/component/EthWallets";
import AuthComponent from "@/component/AuthComponent";
import { PASSKEY_TIME, TIME_TO_INVALIDATE_PASSKEY } from "@/helpers/constants";
import {
  getSessionStorage,
  removeSessionStorage,
} from "@/helpers/clientStorage";

export default function Home() {
  // set passkey time to TIME_TO_INVALIDATE_PASSKEY
  if (!getSessionStorage(PASSKEY_TIME)) {
    return <AuthComponent />;
  }
  const passkeyTime: number = parseInt(getSessionStorage(PASSKEY_TIME) || "0");
  if (passkeyTime && Date.now() - passkeyTime > TIME_TO_INVALIDATE_PASSKEY) {
    removeSessionStorage(PASSKEY_TIME);
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
