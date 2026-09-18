"use client";

import {useEffect, useState} from "react";

export function useFormChallenge(endpoint: string) {
  const [token, setToken] = useState("");
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(endpoint, {cache: "no-store", signal: controller.signal})
      .then(async (response) => {
        if (!response.ok) throw new Error("Form unavailable");
        const data = await response.json();
        if (typeof data.token !== "string") throw new Error("Missing form token");
        setToken(data.token);
      })
      .catch((error) => { if (error.name !== "AbortError") setFailed(true); });
    return () => controller.abort();
  }, [endpoint]);
  return {token, failed};
}
