import { render, screen, fireEvent } from '@testing-library/react';
import { TaskRow } from '../TaskRow';
import type { Task } from '../../types/task';

describe('TaskRow', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test description',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const onToggle = vi.fn();
  const onDelete = vi.fn();
  const onSelect = vi.fn();

  it('renders task data correctly', () => {
    render(
      <table>
        <tbody>
          <TaskRow
            task={mockTask}
            onToggle={onToggle}
            onDelete={onDelete}
            onSelect={onSelect}
            disabled={false}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('handles checkbox toggle', () => {
    render(
      <table>
        <tbody>
          <TaskRow
            task={mockTask}
            onToggle={onToggle}
            onDelete={onDelete}
            onSelect={onSelect}
            disabled={false}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith(mockTask.id, true);
  });

  it('handles Details and Delete buttons', () => {
    render(
      <table>
        <tbody>
          <TaskRow
            task={mockTask}
            onToggle={onToggle}
            onDelete={onDelete}
            onSelect={onSelect}
            disabled={false}
          />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByText('Details'));
    expect(onSelect).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(mockTask.id);
  });
});
