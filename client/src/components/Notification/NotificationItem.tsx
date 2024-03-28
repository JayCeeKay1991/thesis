import { SetStateAction, useState, Dispatch } from 'react';
import { NotificationType } from '@/types/Notification';
import { IoIosNotificationsOutline } from "react-icons/io";
import { deleteNotifications } from '@/services/NotificationClientService';
import { useMainContext } from '../Context/Context';

interface NotificationsProps {
  notifications: NotificationType[];
  setNotifications: Dispatch<SetStateAction<NotificationType[]>>;
}

const Notifications = ({ notifications, setNotifications }: NotificationsProps) => {
  const [showDrop, setShowDrop] = useState<boolean>(false);
  const { user } = useMainContext()

  const handleClick = async () => {
    if (showDrop) {
      setShowDrop(false)
      if (notifications.length > 0) {
        setNotifications([])
        const res = await deleteNotifications(user._id);
        console.log(res);
      }
    }
    else {
      setShowDrop(true)
    }
  }

  return (
    <div>
      <div id="icon-wrapper" className='flex flex-row border-[1px] w-[45px] h-[45px] justify-center items-center rounded-full mr-[15px] hover:bg-tapeWhite hover:text-tapeDarkBlack'>
        <IoIosNotificationsOutline size={30} onClick={handleClick} />

        <p className='-ml-[8px]'>{notifications.length}</p>

        {showDrop && notifications.length > 0 ? (
          <div id="nots-dropdown" className='w-[300px] h-[300px] overflow-hidden flex flex-col z-40 absolute border-tapeDarkGrey bg-tapeBlack border-[2px] rounded-[20px] p-[20px] right-[0px] mt-[30px] '>
            <ul className='flex flex-col justify-center absolute right'>
              {notifications.map(not => (
                <li key={not._id} className='bg-tapeBlack hover:font-bold cursor-pointer'>
                  <div className='flex flex-row'>
                    <p>{not.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : <></>}
      </div>
    </div>
  )
}

export default Notifications;
