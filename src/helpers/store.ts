import { create } from "zustand";
import { HDNodeWallet } from "ethers";

interface WalletStore {
  wallets: HDNodeWallet[];
  setWallets: (wallets: HDNodeWallet[]) => void;
  addWallet: (wallet: HDNodeWallet) => void;
  removeWallet: (wallet: HDNodeWallet) => void;
}

const getWalletsFromLocalStorage = () => {
  const wallets = localStorage.getItem("wallets");
  return wallets ? JSON.parse(wallets) : [];
};

export const useWalletStore = create<WalletStore>((set) => ({
  wallets: getWalletsFromLocalStorage(),
  setWallets: (wallets) => set({ wallets }),
  addWallet: (wallet) => {
    const wallets = getWalletsFromLocalStorage();
    localStorage.setItem("wallets", JSON.stringify([...wallets, wallet]));
    set({ wallets: [...wallets, wallet] });
  },
  removeWallet: (wallet) => {
    const wallets = getWalletsFromLocalStorage();
    const newWallets = wallets.filter(
      (w: HDNodeWallet) => w.address !== wallet.address
    );
    localStorage.setItem("wallets", JSON.stringify(newWallets));
    set({ wallets: newWallets });
  },
}));
