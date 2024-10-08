"use client";

import { ethers, HDNodeWallet } from "ethers";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { decrypt } from "@/helpers/cryptoUtil";
import { useWalletStore } from "@/helpers/store";
import SeedGenerator from "./SeedGenerator";

const createWalletsFromMnemonic = (
  phrase: string,
  count: number
): HDNodeWallet => {
  const path = `m/44'/60'/0'/0/${count}`;
  const wallet = ethers.HDNodeWallet.fromPhrase(phrase, path);
  return wallet;
};

export function EthWallets() {
  const [seedPhrase, setSeedPhrase] = useState<string | null>(null);
  const { wallets, addWallet, removeWallet } = useWalletStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const encrypted = localStorage.getItem("seed");
      if (encrypted) {
        const decrypted = decrypt(encrypted, "secret");
        setSeedPhrase(decrypted);
      }
    }
  }, []);

  const createWallets = () => {
    const wallet = createWalletsFromMnemonic(seedPhrase!, wallets.length);
    addWallet(wallet);
  };

  const deleteWallet = (wallet: HDNodeWallet) => {
    removeWallet(wallet);
  };

  return (
    <div className="w-full">
      {!seedPhrase && <SeedGenerator />}
      {seedPhrase && <Button onClick={createWallets}>Create Wallet</Button>}
      <section className="mt-4 grid grid-cols-2 gap-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.address}
            className="flex flex-col gap-2 p-4 text-sm text-gray-500 border border-gray-200 rounded-md cursor-pointer"
          >
            <p>
              <strong>Address:</strong>
              {wallet.address}
            </p>
            <p>
              <strong>Public Key:</strong>
              <span className="line-clamp-2">{wallet.publicKey}</span>
            </p>
            <div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteWallet(wallet);
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
