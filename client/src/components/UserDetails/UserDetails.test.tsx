import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, userEvent } from '../../test/testConfig';
import UserDetails from './UserDetails';
import { updateUser } from '@/services/UserClientService';

// Mock necessary functions and modules
vi.mock('../Context/Context', () => ({
  useMainContext: () => ({
    user: {
      _id: '123',
      userName: 'theDow',
      email: 'john@example.com',
      profilePic: '',
      channels: [],
      mixTapes: [],
    },
    setUser: vi.fn(),
  }),
}));

vi.mock('../../services/UserClientService', () => ({
  updateUser: vi.fn().mockResolvedValue({
    _id: '123',
    userName: 'theName',
    email: 'jane@example.com',
    profilePic: '',
    channels: [],
    mixTapes: [],
  }),
}));

describe('UserDetails component', () => {
  beforeEach(async () => {
    render(<UserDetails />);
  });

  it('allows editing the username', async () => {
    // Find the edit button and click it to enable the username input
    const editUsernameButton = screen.getByTestId('edit-username-button');
    await userEvent.click(editUsernameButton);

    // Find the username input, clear it, and type a new username
    const usernameInput = screen.getByTestId('username-input');
    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, 'JaneDoe');

    // Find the save button and click it to submit the form
    const saveButton = screen.getAllByText('save')[0]; // Assuming 'save' is the text on the save button
    await userEvent.click(saveButton);

    // Verify that updateUser was called with the expected parameters
    expect(updateUser).toHaveBeenCalledWith(expect.objectContaining({
      userName: 'JaneDoe',
    }));
  }
  );
  it('allows editing the email', async () => {
    const editEmailButton = screen.getByTestId('edit-email-button');
    await userEvent.click(editEmailButton);

    // Find the email input, clear it, and type a new email
    const emailInput = screen.getByTestId('email-input');
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'JaneDoe@mock.com');

    // Find the save button and click it to submit the form
    const saveButton = screen.getAllByText('save')[0]; // Assuming 'save' is the text on the save button
    await userEvent.click(saveButton);

    // Verify that updateUser was called with the expected parameters
    expect(updateUser).toHaveBeenCalledWith(expect.objectContaining({
      email: 'JaneDoe@mock.com',
    }));
  })
});
