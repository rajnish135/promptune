import { Suspense } from "react";
import UserProfile from "./UserProfile";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile />
    </Suspense>
  );
}
