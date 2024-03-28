import AddMembersSelect from './AddMembersSelect';
import { render, screen } from '@/test/testConfig';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event'; // Import userEvent for simulating user input
import { mockChannel } from '@/test/mocks';
import { Dispatch, SetStateAction } from 'react';
import { ChannelType } from '@/types/Channel';


describe('AddMembersSelect Component', () => {
    let inputElement: HTMLInputElement;
    let setChannelList:Dispatch<SetStateAction<ChannelType>> = vi.fn()
    let toggleMemberForm = vi.fn()

    beforeEach(() => {
        setChannelList = vi.fn();
        render(
            <AddMembersSelect
                channel={mockChannel}
                setChannel={setChannelList as Dispatch<SetStateAction<ChannelType>>}
                toggleMemberForm={toggleMemberForm}
            />
        );
        inputElement = screen.getByPlaceholderText('Search for a friend...') as HTMLInputElement;
    });

    it('should render input field with placeholder', async () => {
        expect(inputElement).toBeTruthy();
    });

    it('should handle input change correctly', async () => {
        await userEvent.type(inputElement, 'John');
        expect(inputElement.value).toBe('John');
    });
});
