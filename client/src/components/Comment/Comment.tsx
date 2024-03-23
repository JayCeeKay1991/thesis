import { CommentsType } from "../../types/Comments";
import { TimePrettier } from "../../utils/timePrettifier";
import { User } from "../../types/User";
import { useMainContext } from "../Context/Context";

type propsType = {
  comment: CommentsType;
  user: User;
};

function Comment({ comment }: propsType) {

  return (
    <div className="bg-tapeBlack w-[700px] h-[120px] flex flex-row pl-[20px] rounded-[20px] p-[10px] mb-[50px] items-center border-tapeDarkGrey border-[1px]">
      <div
        id="comment-crop"
        className="w-[80px] h-[80px] overflow-hidden rounded-full mr-[40px] flex items-center justify-center"
      >
        <img
          src={comment.owner?.profilePic}
          className="w-full"
          alt="get a profile pic you dummy"
        />
      </div>
      <div className="flex flex-col leading-[30px] justify-start items-start">
        <div className=" flex flex-row">
          <p
            className="bg-tape font-semibold text-[25px] mr-[20px]"
            data-testid="comment-author"
          >
            {comment.owner?.userName || "Unknown User"}
          </p>
          <p className="font-medium text-[20px] text-tapeDarkGrey">
            {TimePrettier(comment.date)}
          </p>
        </div>
        <p
          className="text-[25px] whitespace-nowrap"
          data-testid="comment-content"
        >
          {comment.message}
        </p>
      </div>
    </div>
  );
}

export default Comment;
