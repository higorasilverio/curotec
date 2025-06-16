import { render, screen, fireEvent } from "@testing-library/react";
import CreateForm from "../CreateForm";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("CreateForm", () => {
  it("renders inputs and calls callbacks correctly", () => {
    const mockSetTitle = vi.fn();
    const mockSetDescription = vi.fn();
    const mockHandleCreate = vi.fn();
    const titleRef = React.createRef<HTMLInputElement>();

    render(
      <CreateForm
        title="Test title"
        setTitle={mockSetTitle}
        description="Test description"
        setDescription={mockSetDescription}
        formError={null}
        fetching={false}
        handleCreate={mockHandleCreate}
        titleRef={titleRef}
      />
    );

    const titleInput = screen.getByLabelText("Title") as HTMLInputElement;
    const descInput = screen.getByLabelText("Description") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /add task/i });

    expect(titleInput.value).toBe("Test title");
    expect(descInput.value).toBe("Test description");

    fireEvent.change(titleInput, { target: { value: "New title" } });
    fireEvent.change(descInput, { target: { value: "New desc" } });
    fireEvent.click(button);

    expect(mockSetTitle).toHaveBeenCalledWith("New title");
    expect(mockSetDescription).toHaveBeenCalledWith("New desc");
    expect(mockHandleCreate).toHaveBeenCalled();
  });

  it("displays an error message when formError is set", () => {
    render(
      <CreateForm
        title=""
        setTitle={() => {}}
        description=""
        setDescription={() => {}}
        formError="Something went wrong"
        fetching={false}
        handleCreate={() => {}}
        titleRef={React.createRef<HTMLInputElement>()}
      />
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
