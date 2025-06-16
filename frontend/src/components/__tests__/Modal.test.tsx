import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal", () => {
  const mockSetSelectedTaskId = vi.fn();

  const task = {
    id: 1,
    title: "Test Task",
    description: "This is a task",
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it("displays loading message", () => {
    render(
      <Modal
        loadingDetails={true}
        detailsError={null}
        taskDetails={null}
        setSelectedTaskId={mockSetSelectedTaskId}
      />
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(
      <Modal
        loadingDetails={false}
        detailsError="Something went wrong"
        taskDetails={null}
        setSelectedTaskId={mockSetSelectedTaskId}
      />
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("displays task details", () => {
    render(
      <Modal
        loadingDetails={false}
        detailsError={null}
        taskDetails={task}
        setSelectedTaskId={mockSetSelectedTaskId}
      />
    );
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("This is a task")).toBeInTheDocument();
    expect(screen.getByText("Completed:")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
  });

  it("calls setSelectedTaskId(null) when clicking outside modal", () => {
    render(
      <Modal
        loadingDetails={false}
        detailsError={null}
        taskDetails={task}
        setSelectedTaskId={mockSetSelectedTaskId}
      />
    );
    fireEvent.click(screen.getByText("Test Task").closest("div")!.parentElement!);
    expect(mockSetSelectedTaskId).toHaveBeenCalledWith(null);
  });

  it("calls setSelectedTaskId(null) when clicking close button", () => {
    render(
      <Modal
        loadingDetails={false}
        detailsError={null}
        taskDetails={task}
        setSelectedTaskId={mockSetSelectedTaskId}
      />
    );
    fireEvent.click(screen.getByText("Close"));
    expect(mockSetSelectedTaskId).toHaveBeenCalledWith(null);
  });
});
