export function getLocalStorage(key: string): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
}

export function setLocalStorage(key: string, value: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
}

export function getSessionStorage(key: string): string | null {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function setSessionStorage(key: string, value: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, value);
  }
}

export function removeSessionStorage(key: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
}
