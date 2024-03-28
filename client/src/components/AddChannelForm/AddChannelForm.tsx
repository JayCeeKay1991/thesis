import { Dispatch, useState, SetStateAction, useRef } from 'react';
import { ChannelType } from '@/types/Channel';
import { useMainContext } from '../Context/Context';
import { createChannel } from '@/services/ChannelClientService';
import { postImageToCloudinary } from '@/services/CloudinaryService';
import { useDropzone } from 'react-dropzone';
import { PiUploadSimple } from "react-icons/pi";

type FormValues = Omit<ChannelType, '_id'>;
type propsType = {
  setShowForm: Dispatch<SetStateAction<boolean>>;
};

export default function AddChannelForm({
  setShowForm,
}: propsType) {
  const { user, setUser } = useMainContext();

  const initialState = {
    name: '',
    picture: '',
    owner: user,
    members: [],
    mixTapes: [],
    comments: [],
    notifications: [],
  };

  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      setPictureFile(files[0]); // Set the image file
    } else setFormValues({ ...formValues, [name]: value });
  };

  const { getRootProps } = useDropzone({
    // sets up the dropzone, to accept only one file of specified types
    maxFiles: 1,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp']
    },
    onDrop: async (acceptedFiles:File[]) => {
      if (acceptedFiles.length) {
        console.log(`File "${acceptedFiles[0].name}" dropped.`);
        try {
          setPictureFile(acceptedFiles[0]);
        } catch (error) {
          console.error("Error setting image:", error);
        }
      }
    },
  });

  // Handle choose file click
  const handleChooseFilesClick = () => {
    // simulates the clicking of the fileinput
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  // handle create channel click
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    let pictureUrl = '';
    if (pictureFile) {
      try {
        pictureUrl = await postImageToCloudinary({
          file: pictureFile,
        });
      } catch (error) {
        console.error(error);
      }
    }

    const newChannelData: Omit<ChannelType, '_id'> = {
      ...formValues,
      picture: pictureUrl,
    };

    try {
      const newChannel = await createChannel(newChannelData);
      setUser(prev =>( {...prev, channels: [...prev.channels, newChannel]}))
      setFormValues(initialState);
      setShowForm(false);
      setPictureFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="w-[350px] h-content flex flex-col z-40 absolute border-tapeDarkGrey bg-tapeBlack border-[2px] rounded-[20px] p-[20px] -left-[20px] top-[0px]">
      <h1 className="text-[22px] mb-[30px] text-center">Create a new channel</h1>
      <label>Name</label>
      <input
        name="name"
        value={formValues.name}
        type="text"
        onChange={changeHandler}
        placeholder="Channel title"
        className="h-[30px] mt-[5px] mb-[20px] p-[20px] text-sm border-tapeDarkGrey bg-tapeBlack border-[2px] text-[25px] text-tapeWhite font-small outline-none"
        data-testid="input-channel-name"
      ></input>
      <label>Image</label>

      <div {...getRootProps()} className="flex flex-col items-center ">
        <div>
          <div>
            <PiUploadSimple size={120} className="text-tapeDarkGrey m-5" />
          </div>
        </div>
        <p>Or</p>
        <button
          type="button"
          className="rounded-full border-[2px] border-tapeDarkGrey w-[150px] p-[5px] m-8"
          onClick={handleChooseFilesClick}
          disabled={!!pictureFile}
        >
          {pictureFile ? "File chosen" : "Choose file"}
        </button>
        <button
          onClick={handleSubmit}
          className="w-full rounded-[10px] pr-[20px] pl-[20px] pt-[15px] pb-[15px] text-[15px] text-tapeBlack bg-tapeWhite hover:bg-tapeBlack hover:text-tapeWhite border-[1px] border-tapeWhite"
          data-testid="create-button"
        >
          Create Channel
        </button>
        <input
          name="file"
          type="file"
          onChange={changeHandler}
          className="hidden"
          ref={fileInputRef}
          accept=".jpg, .jpeg, .svg, .png, .webp"
          data-testid="input-hidden"
        />
      </div>
    </form>
  );
}
