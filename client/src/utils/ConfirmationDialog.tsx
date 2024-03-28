type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmationDialog({
  isOpen,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div>
      <div
        className="w-[300px] flex flex-column rounded-[20px] border-tapeWhite bg-tapeBlack border-[1px] absolute right-[30px] z-40"
        id={`confirmation-dialog ${isOpen ? 'open' : ''}`}
      >
        <div id="confirmation-dialog-content" className="m-3">
          <p className="font-medium text-tapeWhite text-[20px]">
            Are you sure you want to delete this channel?
          </p>
          <div
            id="confirmation-dialog-button"
            className="flex flex-row justify-center gap-10"
          >
            <button
              className="border-none text-[20px] font-medium text-tapeWhite"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="border-none text-[20px] font-medium text-tapeWhite"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
