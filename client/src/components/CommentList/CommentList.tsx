import { useState, useEffect } from "react";
import Comment from "../Comment/Comment";
import { ChannelType } from "../../types/Channel";
import { CommentsType } from "@/types/Comments";
import { addComment } from "../../services/ChannelClientService";
import { FiSend } from "react-icons/fi";
import { useMainContext } from "../Context/Context";

type propsType = {
  channel: ChannelType;
};

function CommentList({ channel }: propsType) {
  const { user } = useMainContext();
  const [formValue, setFormValue] = useState<string>("");
  const [comments, setComments] = useState<CommentsType[]>(channel.comments);

  // Set and sort comments
  useEffect(() => {
     const sortedComments = [...channel.comments].sort((a, b) =>
       b.date?.toString()?.localeCompare(a.date?.toString())
     );
     setComments(sortedComments);
  }, [channel]);

  // Handle comments form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
  };

  // Handle submission of form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const owner = user;
    const date = new Date();
    const message = formValue;
    const newComment = { owner, message, date };
    await addComment(channel._id, newComment);
    setComments([...comments, { ...newComment, owner: user }]);
    setFormValue("");
  };

  //Sort comments based on select value
  const sortComments = (e: React.FormEvent<HTMLSelectElement>) => {
    const selectVal = (e.target as HTMLSelectElement).value;
    const sortedComments = [...comments].sort((a, b) => {
      const dateA = a.date.toString();
      const dateB = b.date.toString();
      if (selectVal === "latest") {
        return dateB.localeCompare(dateA);
      } else {
        return dateA.localeCompare(dateB);
      }
    });
    setComments(sortedComments);
  };

  return (
    <div className="flex flex-col items-center w-full border-[px] rounded-[20px] p-[15px] mb-[30px] bg-tapeBlack relative">
      {comments.length > 0 ? (
        <div
          id="comments list"
          className="w-full flex flex-col items-center relative"
        >
          <div className="w-full flex flex-row">
            <div className="w-full mb-[10px]">
              <p className="text-tapeDarkGrey text-[12px] font-medium">
                {comments.length} Comments
              </p>
            </div>

            <form className="w-[80px]">
              <select
                id="underline_select"
                className=" w-full block px-0 text-[12px] text-tapeDarkGrey font-medium bg-tapeBlack border-tapeDarkGrey appearance-none dark:text-tapeDarkGrey dark:border-tapeGrey focus:outline-none focus:ring-0 focus:border-tapeGrey peer"
                defaultValue="latest"
                onChange={sortComments}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </form>
          </div>

          {comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      ) : (
        <p className="text-[20px] mb-[10px] text-tapeDarkGrey">No comments yet</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-row mt-auto items-center pl-[6px] pr-[6px] pb-[6px] pt-[5px] rounded-b-[17px]"
      >
        <input
          value={formValue}
          onChange={handleChange}
          className="bg-tapeBlack w-full  h-[40px] align-top leading-[0px] pl-[20px] text-tapeBlack border-[2px] border-tapeDarkGrey text-[12px] font-medium outline-none placeholder-tapeDarkGrey rounded-full"
        ></input>
        <button
          type="submit"
          className="w-[40px] h-[40px] flex-none flex flex-row justify-center items-center border-none text-tapeBlack text-[20px] text-semibold rounded-[60px]"
        >
          <FiSend className="text-tapeDarkGrey" size={20} />
        </button>
      </form>
    </div>
  );
}

export default CommentList;
