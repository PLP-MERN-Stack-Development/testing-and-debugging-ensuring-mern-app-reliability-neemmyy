import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import BugForm from "../../components/BugForm";

describe("BugForm Component", () => {
  test("renders form fields and submit button", () => {
    render(<BugForm onSubmit={vi.fn()} />);

    expect(screen.getByText("Report Bug")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Bug title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Bug description")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i }))
      .toBeInTheDocument();
  });

  test("allows user to type into inputs", () => {
    render(<BugForm onSubmit={vi.fn()} />);

    const titleInput = screen.getByPlaceholderText("Bug title");
    const descriptionInput =
      screen.getByPlaceholderText("Bug description");

    fireEvent.change(titleInput, {
      target: { value: "Login bug" },
    });

    fireEvent.change(descriptionInput, {
      target: { value: "Login button not responding" },
    });

    expect(titleInput.value).toBe("Login bug");
    expect(descriptionInput.value).toBe(
      "Login button not responding"
    );
  });

  test("calls onSubmit when form is submitted", () => {
    const mockSubmit = vi.fn();

    render(<BugForm onSubmit={mockSubmit} />);

    fireEvent.change(
      screen.getByPlaceholderText("Bug title"),
      { target: { value: "Crash bug" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Bug description"),
      { target: { value: "App crashes on load" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: /submit/i })
    );

    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
