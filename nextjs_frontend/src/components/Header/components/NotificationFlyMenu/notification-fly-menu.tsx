import { Popover } from "@headlessui/react";
import Image from "next/image";
import NotificationCard from "../NotificationCard/notification-card";
import Styles from "./notification-fly-menu.module.scss";
import { INotification } from "@/types/notification.dto";

interface NotificationFlyMenuProps {
  notifications: INotification[];
  onRemoveCard: Function;
}

export default function NotificationFlyMenu({
  notifications,
  onRemoveCard
}: NotificationFlyMenuProps) {
  function handleRemoveCard(index: number) {
    onRemoveCard(index);
  }

  return (
    <Popover className="relative">
      <Popover.Button className="p-2 border rounded-full mr-20 hover:cursor-pointer hover:bg-slate-100">
        <Image src="/icons/notification_bell.svg" alt="Notifications" width={24} height={24} />
      </Popover.Button>
      <Popover.Panel className="absolute -translate-x-2/3 mt-2 z-20">
        <div className="absolute top-0.5 right-1/4 w-9 overflow-hidden inline-block">
          <div className="h-6 w-6 bg-white rotate-45 transform origin-bottom-left border-2 border-gray-200" />
        </div>
        <div className={Styles.notificationBox}>
          {notifications.map((notification, index) => (
            <NotificationCard
              key={index}
              type={notification.type}
              tenantName={notification.tenantName}
              condominiumName={notification.condominiumName}
              message={notification.message}
              onRemove={() => handleRemoveCard(index)}
            />
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
}
