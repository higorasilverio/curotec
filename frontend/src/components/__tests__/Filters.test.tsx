import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../Filters";

describe("Filters", () => {
  it("renders and interacts with checkbox and input", () => {
    const setOnlyIncomplete = vi.fn();
    const setSearch = vi.fn();
    const setPage = vi.fn();

    render(
      <Filters
        onlyIncomplete={false}
        search="test"
        setOnlyIncomplete={setOnlyIncomplete}
        setSearch={setSearch}
        setPage={setPage}
        fetching={false}
      />
    );

    const checkbox = screen.getByLabelText(/only show incomplete/i);
    const input = screen.getByPlaceholderText("Search");
    const clearButton = screen.getByRole("button", { name: /clear/i });

    fireEvent.click(checkbox);
    expect(setOnlyIncomplete).toHaveBeenCalledWith(true);
    expect(setPage).toHaveBeenCalledWith(1);

    fireEvent.change(input, { target: { value: "new search" } });
    expect(setSearch).toHaveBeenCalledWith("new search");

    fireEvent.click(clearButton);
    expect(setSearch).toHaveBeenCalledWith("");
    expect(setPage).toHaveBeenCalledWith(1);
  });

  it("disables inputs when fetching is true", () => {
    render(
      <Filters
        onlyIncomplete={true}
        search="disabled"
        setOnlyIncomplete={() => {}}
        setSearch={() => {}}
        setPage={() => {}}
        fetching={true}
      />
    );

    expect(screen.getByLabelText(/only show incomplete/i)).toBeDisabled();
    expect(screen.getByPlaceholderText("Search")).toBeDisabled();
    expect(screen.getByRole("button", { name: /clear/i })).toBeDisabled();
  });
});
