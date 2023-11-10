import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      // Find the button and click it
      const submitButton = await screen.findByTestId("button-test-id");
      fireEvent.click(submitButton);

      // Wait for the button to show "En cours"
      await screen.findByText("En cours");

      // Wait for the mock API call to resolve and the state to update
      await waitFor(() => expect(screen.queryByText("Envoyer")).toBeInTheDocument());

      // Now that the mock API call has resolved, the onSuccess should have been called
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});