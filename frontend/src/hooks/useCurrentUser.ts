import { useEffect, useState } from "react";

import { User } from "@backend/types";
import { client } from "../utils/client";

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  const [refreshIdx, setRefreshIdx] = useState(0);

  useEffect(() => {
    let unmounted = false;
    client.getCurrentUser.query().then((data) => {
      if (unmounted) {
        return;
      }

      if (data) {
        setCurrentUser({
          ...data,
          membershipEndDate: data.membershipEndDate
            ? new Date(data.membershipEndDate)
            : null,
          createdAt: new Date(data.createdAt),
        });
      }
      setLoading(false);
    });

    return () => {
      unmounted = true;
    };
  }, [refreshIdx]);

  function refresh() {
    setRefreshIdx(refreshIdx + 1);
  }

  function hasMembership() {
    return (
      currentUser?.membershipEndDate &&
      currentUser.membershipEndDate > new Date()
    );
  }

  return { loading, currentUser, refresh, hasMembership };
}
