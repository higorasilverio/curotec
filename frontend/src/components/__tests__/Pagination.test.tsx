import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination", () => {
  const mockSetPage = vi.fn();

  it("renders pagination buttons", () => {
    render(<Pagination page={2} totalPages={5} setPage={mockSetPage} fetching={false} />);
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(7);
  });

  it("disables Prev and Next at boundaries", () => {
    render(<Pagination page={1} totalPages={1} setPage={mockSetPage} fetching={false} />);
    expect(screen.getByText("Prev")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
    expect(screen.getByText("1")).toBeDisabled();
  });

  it("calls setPage on number click", () => {
    render(<Pagination page={2} totalPages={3} setPage={mockSetPage} fetching={false} />);
    fireEvent.click(screen.getByText("1"));
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it("calls setPage when clicking Prev or Next", () => {
    render(<Pagination page={2} totalPages={3} setPage={mockSetPage} fetching={false} />);
    fireEvent.click(screen.getByText("Prev"));
    expect(mockSetPage).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText("Next"));
    expect(mockSetPage).toHaveBeenCalledWith(3);
  });

  it("disables all buttons when fetching", () => {
    render(<Pagination page={2} totalPages={3} setPage={mockSetPage} fetching={true} />);
    screen.getAllByRole("button").forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
