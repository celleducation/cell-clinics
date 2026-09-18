"use client";

import {useEffect, useState} from "react";

export function useFormChallenge(endpoint: string) {
  const [token, setToken] = useState("");
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  function retry() {
    setFailed(false);
    setToken("");
    setAttempt((value) => value + 1);
  }
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(new Error("Form preparation timed out")), 15000);
    fetch(endpoint, {cache: "no-store", signal: controller.signal})
      .then(async (response) => {
        if (!response.ok) throw new Error("Form unavailable");
        const data = await response.json();
        if (typeof data.token !== "string" || !data.token) throw new Error("Missing form token");
        setToken(data.token);
        setFailed(false);
      })
      .catch((error) => { if (error.name !== "AbortError") setFailed(true); })
      .finally(() => window.clearTimeout(timeout));
    return () => { window.clearTimeout(timeout); controller.abort(); };
  }, [endpoint, attempt]);
  return {token, failed, retry};
}
