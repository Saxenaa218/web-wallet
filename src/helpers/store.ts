import { create } from "zustand";
import { HDNodeWallet } from "ethers";
import { getLocalStorage, setLocalStorage } from "./clientStorage";
import { WALLETS } from "./constants";

interface WalletStore {
  wallets: HDNodeWallet[];
  setWallets: (wallets: HDNodeWallet[]) => void;
  addWallet: (wallet: HDNodeWallet) => void;
  removeWallet: (wallet: HDNodeWallet) => void;
}

const getWalletsFromLocalStorage = () => {
  const wallets = getLocalStorage(WALLETS);
  return wallets ? JSON.parse(wallets) : [];
};

export const useWalletStore = create<WalletStore>((set) => ({
  wallets: getWalletsFromLocalStorage(),
  setWallets: (wallets) => set({ wallets }),
  addWallet: (wallet) => {
    const wallets = getWalletsFromLocalStorage();
    setLocalStorage(WALLETS, JSON.stringify([...wallets, wallet]));
    set({ wallets: [...wallets, wallet] });
  },
  removeWallet: (wallet) => {
    const wallets = getWalletsFromLocalStorage();
    const newWallets = wallets.filter(
      (w: HDNodeWallet) => w.address !== wallet.address
    );
    setLocalStorage(WALLETS, JSON.stringify(newWallets));
    set({ wallets: newWallets });
  },
}));
