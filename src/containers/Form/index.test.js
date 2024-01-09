import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Form from "./index";

// Activation des faux timer avant le test (simulation de temps)
jest.useFakeTimers();

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
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Avance le temps d'attente du timer provenant de mockContactApi
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
