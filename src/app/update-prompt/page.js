import { Suspense } from "react";
import UpdatePrompt from "./UpdatePrompt"; 

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePrompt />
    </Suspense>
  );
}
