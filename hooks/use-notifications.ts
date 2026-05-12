"use client";

import { useState, useEffect, useCallback } from "react";
import { getNotifications } from "@/lib/actions/user";
import { Notification } from "@prisma/client";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const data = await getNotifications();
        if (mounted) {
          setNotifications(data);
          setUnreadCount(data.filter(n => !n.read).length);
        }
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    }

    init();

    const interval = setInterval(() => {
      // Avoid polling while tab is hidden to reduce server load.
      if (document.visibilityState === "visible") {
        init();
      }
    }, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { notifications, unreadCount, refresh };
}
