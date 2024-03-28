import { useState, useEffect } from "react";
import { NotificationType } from "@/types/Notification";
import "./NotificationsCarousel.css";
interface NotificationsCarouselProps {
    notifications: NotificationType[];
}

const NotificationsCarousel = ({ notifications }: NotificationsCarouselProps) => {
    const [currentNotification, setCurrentNotification] = useState<NotificationType>(notifications[0]);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            if (index === notifications.length - 1) {
                setCurrentNotification(notifications[0]);
                setIndex(0);
            } else {
                const newIndex = index + 1;
                setCurrentNotification(notifications[newIndex]);
                setIndex(newIndex);
            }
        }, 10000);
        return () => clearInterval(timerId);
    }, [index, notifications]);

    return (
      <div
        id="carousel"
        className=" w-full h-[320px] p-[30px] carousel-wrapper flex flex-col justify-between rounded-full "
      >
        <h3 className="w-[120px] h-[40px] flex flex-row justify-center rounded-full items-center text-tapeWhite text-[15px] border-[1px] flex-none">
          What's new
        </h3>

        <div id="carousel-item" className="w-[600px] leading-[52px] mt-auto ">
          <p className="text-[45px] font-semibold">
            {currentNotification.message}
          </p>
          <h1></h1>
        </div>
      </div>
    );
};

export default NotificationsCarousel;
