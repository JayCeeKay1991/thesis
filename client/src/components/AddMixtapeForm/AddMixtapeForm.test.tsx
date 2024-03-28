import AddMixtapeForm from "./AddMixtapeForm";
import { render, screen } from '../../test/testConfig';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { channels } from "@/test/mocks";


describe('Form is correctly rendered', async () => {
  const setChannel = vi.fn();
  const channelId = channels[0]._id;
  const channel = channels[0];

  beforeEach(() => {
    render(
      <AddMixtapeForm
        channelId={channelId}
        channel={channel}
        setChannel={setChannel}
      />
    );
  });

  it('should render a button to choose files', async () => {
    const uploadButton = screen.getByTestId(
      'file-button'
    ) as HTMLButtonElement;
    expect(uploadButton).toBeInTheDocument();
  });

  it('should render a dropzone', async () => {
    const dropzone = screen.getByTestId('dropzone');
    expect(dropzone).toBeInTheDocument();
  });

  it('should generate a hidden input field', async () => {
    const input = screen.getByTestId('input-hidden') as HTMLInputElement;
    expect(input).toHaveClass('hidden');
  });

});
