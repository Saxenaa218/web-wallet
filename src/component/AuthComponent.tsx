import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { hashString } from "@/helpers/cryptoUtil";
import { PASSKEY } from "@/helpers/constants";
import { useRouter } from "next/navigation";
import { getSessionStorage, setSessionStorage } from "@/helpers/clientStorage";

const AuthComponent = () => {
  const router = useRouter();

  const [passkey, setPasskey] = useState<string>("");
  const [error, setError] = useState<{ message: string; hasError: boolean }>({
    message: "",
    hasError: false,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  const handleUnlock = () => {
    // need to hash the passkey
    if (passkey === "") {
      setError({ message: "Passkey is required", hasError: true });
      return;
    }
    setError({ message: "", hasError: false });
    const userInputHash = hashString(passkey);
    const savedHash = getSessionStorage(PASSKEY);
    if (userInputHash === savedHash) {
      setSessionStorage("passkeyTime", Date.now().toString());
      window.location.reload();
    } else {
      setError({ message: "Invalid passkey", hasError: true });
    }
  };

  const handleRedirect = () => {
    router.push("/reset-password");
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-w-[400px]">
        <section className="flex flex-col">
          <section className="flex flex-col gap-4">
            <AlertDialogTitle>Need to Authenticate first</AlertDialogTitle>
            <Input
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <Button onClick={handleUnlock}>Unlock</Button>
          </section>
          {error.hasError && <p className="text-red-500">{error.message}</p>}
          <Button variant="link" onClick={handleRedirect}>
            Forgot password?
          </Button>
        </section>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthComponent;
