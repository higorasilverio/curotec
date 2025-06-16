import { render, screen } from '@testing-library/react';
import { TaskTable } from '../TaskTable';

describe('TaskTable component', () => {
  it('renders task table with rows', () => {
    render(
      <TaskTable />
    );

    expect(screen.getByText(/task manager/i)).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });
});
