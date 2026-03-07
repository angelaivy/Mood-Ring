import { describe } from "vitest";
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import MoodRing from "../components/MoodRing";
import MoodCard from "../components/MoodCard";
import MoodMemories from "../components/MoodMemories";
import userEvent from '@testing-library/user-event'
import { addDoc, deleteDoc } from 'firebase/firestore';

vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    addDoc: vi.fn().mockResolvedValue({ id: '123' }),
    deleteDoc: vi.fn().mockResolvedValue(),
    doc: vi.fn().mockReturnValue({ id: 'mock-doc-ref' }),
    getDocs: vi.fn().mockResolvedValue({
      docs: [
        {
          id: '123',
          data: () => ({
            formData: { mood: '😀', note: 'Feeling good today' },
          })
        }
      ]
    }),
    collection: vi.fn().mockReturnValue({ id: 'mock-collection-ref' }),
    query: vi.fn(),
    orderBy: vi.fn(),
    onSnapshot: vi.fn((query, callback) => {
      callback({
        docs: [
          {
            id: '123',
            data: () => ({
              formData: { mood: '😀', note: 'Feeling good today' },
              timestamp: { toDate: () => new Date('2024-03-13') }
            })
          }
        ]
      });
      return vi.fn();
    }),
  };
});

const user = userEvent.setup();

describe('form adds, edits, and deletes mood entries', () => {

  it('should show confirmation and hide form on submit', async () => {
    render(<MoodRing />)

    const submitBtn = screen.getByRole('button', { name: /Submit Mood/i });
    // Form.
    expect(screen.getByText('How are you feeling today?')).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    // Confirmation.
    expect(screen.queryByRole('button', { name: /Add another mood/i })).not.toBeInTheDocument();
    expect(screen.queryByText('Mood Saved ✨')).not.toBeInTheDocument();

    // Click submit
    await user.click(screen.getByRole('radio', {name: /happy/i}))
    await user.click(submitBtn);
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /Submit Mood/i })).not.toBeInTheDocument();
    });

    // Form.
    expect(screen.queryByText('How are you feeling today?')).not.toBeInTheDocument();
    expect(submitBtn).not.toBeInTheDocument();
    // Confirmation.
    expect(screen.getByRole('button', { name: /Add another mood/i })).toBeInTheDocument();
    expect(screen.getByText('Mood Saved ✨')).toBeInTheDocument();
  }) 

  it('should call addDoc with correct form data on submit', async () => {
    render(<MoodRing />);

    await user.click(screen.getByRole('radio', { name: /happy/i }));
    await user.click(screen.getByRole('button', { name: /submit mood/i }));

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(
        // Placehodler for "collection".
        expect.anything(),
        expect.objectContaining({
          formData: { mood: '😀', note: '' }
        })
      );
    });
  });

  it('should hide entry and show form when editing', async () => {
    render(<MoodMemories />);
    expect(screen.getByText('😀')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /edit/i }));
    expect(screen.queryByText('Feeling good today')).not.toBeInTheDocument();
    expect(screen.getByText('How are you feeling today?')).toBeInTheDocument();
  });

  it('should remove entry on delete', async () => {
    render(<MoodCard id='123' date='Friday 13th' mood='😀' note='Feeling good today' />)
    expect(screen.getByText('😀')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(deleteDoc).toHaveBeenCalledWith(expect.anything());
    expect(screen.queryByText('😀')).not.toBeInTheDocument();
  });
})