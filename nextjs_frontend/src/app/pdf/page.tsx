"use client";

import React, { useEffect } from "react";
import { downloadAgreement } from "@/services/agreementGenerator";

export default function Page() {
  useEffect(() => {
    downloadAgreement(0);
  }, []);

  return <div></div>;
}
