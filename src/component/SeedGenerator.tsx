"use client";

import { ethers } from "ethers";
import { useState } from "react";

import { encrypt } from "@/helpers/cryptoUtil";
import { Button } from "@/components/ui/button";
import { setLocalStorage } from "@/helpers/clientStorage";
import { SEED } from "@/helpers/constants";

const SeedGenerator = () => {
  const [seedPhrase, setSeedPhrase] = useState<string | null>(null);
  const createSeedPhrase = async () => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic;
    setSeedPhrase(mnemonic!.phrase);
    const encrypted = encrypt(mnemonic!.phrase, "secret");
    setLocalStorage(SEED, encrypted);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {!seedPhrase && (
          <Button onClick={createSeedPhrase}>Create Seed Phrase</Button>
        )}
      </div>

      {seedPhrase && (
        <>
          <section className="flex flex-col gap-2">
            <section className="flex flex-wrap gap-2 border border-gray-200 rounded-md p-2">
              {seedPhrase?.split(" ").map((word) => (
                <span key={word} className="bg-gray-100 p-2 rounded-md">
                  {word}
                </span>
              ))}
            </section>
          </section>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-sm text-gray-500">
              <strong>Note:</strong>
              Please store this phrase in a secure location(write it down to a
              secured paper and store it in a locker or locks). this is the only
              way to recover your wallet, failure to do so will result in loss
              of funds, wallets, etc.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SeedGenerator;
