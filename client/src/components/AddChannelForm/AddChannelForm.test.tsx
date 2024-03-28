import AddChannelForm from './AddChannelForm';
import { render, screen, userEvent } from '@/test/testConfig';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { channels } from '@/test/mocks';

describe('User inputs are calling change handlers', async () => {
  const setShowForm = vi.fn();

  beforeEach(() => {
    render(
      <AddChannelForm
        setShowForm={setShowForm}
      />
    );
  });

  it('should generate a hidden input element', async () => {
    const input = screen.getByTestId(
      'input-hidden'
    )
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect(input).toHaveClass('hidden');
  });

  it('should handle changes when filling in form', async () => {
    const nameInput = screen.getByTestId('input-channel-name') as HTMLInputElement;
    await userEvent.type(nameInput, channels[0].name);
    expect(nameInput.value).toBe(channels[0].name);

  });
});
