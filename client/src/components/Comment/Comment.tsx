import { CommentsType } from "../../types/Comments";
import { TimePrettier } from "../../utils/timePrettifier";

type propsType = {
  comment: CommentsType;
};

function Comment({ comment }: propsType) {

  return (
    <div className="w-full flex flex-row rounded-[20px] p-[10px] mb-[10px] items-center border-tapeOffBlack border-[0px]">
      <div
        id="img-crop"
        className="w-[60px] h-[60px] overflow-hidden rounded-full mr-[20px] flex items-center justify-center flex-none"
      >
        <img
          src={comment.owner?.profilePic}
          className="w-full"
          alt="get a profile pic you dummy"
        />
      </div>
      <div className="flex flex-col leading-[20px] justify-start items-start">
        <div className="flex flex-row">
          <p
            className="bg-tape text-[12px] mr-[20px]"
            data-testid="comment-author"
          >
            {comment.owner?.userName || "Unknown User"}
          </p>
          <p className="font-medium text-[10px] text-tapeDarkGrey">
            {TimePrettier(comment.date)}
          </p>
        </div>
        <p className="text-[12px] w-full text-wrap" data-testid="comment-content">
          {comment.message}
        </p>
      </div>
    </div>
  );
}

export default Comment;
