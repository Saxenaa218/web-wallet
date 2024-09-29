"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EthWallets } from "@/component/EthWallets";
// right now i'm creating a wallet using ethers and this rpc server: https://eth-mainnet.g.alchemy.com/v2/B3NmftdKm6YbcUttu5GruRthIQ0mltRC

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-10 gap-16">
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
          <TabsContent value="sol">Change your password here.</TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
