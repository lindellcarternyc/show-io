"use client";

import { useState } from "react";

import { type CreateCallData } from "~/schema/call-list.schema";
import CreateCall from "./create-call";

export default function CreateCallSheetForm() {
  const [calls, setCalls] = useState<CreateCallData[]>([]);
  const [isCreatingCall, setIsCreatingCall] = useState(false);

  const addCall = (data: CreateCallData) => {
    setCalls((currentCalls) => [...currentCalls, data]);
    setIsCreatingCall(false);
  };

  // const createCallSheet = ()

  return (
    <div className="flex w-full flex-col gap-4 border">
      <h2>Create Call Sheet</h2>
      <div className="flex flex-col items-start gap-2">
        <button type="button">Create Call Sheet</button>
        {isCreatingCall ? (
          <CreateCall
            onSubmit={addCall}
            onCancel={() => setIsCreatingCall(false)}
          />
        ) : (
          <button type="button" onClick={() => setIsCreatingCall(true)}>
            Add Call
          </button>
        )}
      </div>
      <ul className="border">
        {calls.map((call, idx) => (
          <li key={idx}>
            <pre>{JSON.stringify(call, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
