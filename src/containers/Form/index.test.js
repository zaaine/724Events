import { fireEvent, render, screen } from "@testing-library/react";
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
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});



// Mon test : 

  describe("and a click is triggered on the submit button", () => {
    it("the input form is empty after submission", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      const nomInput = screen.getByLabelText("Nom");
      const prenomInput = screen.getByLabelText("Prénom");
      const emailInput = screen.getByLabelText("Email");
      const messageInput = screen.getByLabelText("Message");

      console.log('nomInput:', nomInput);
      console.log('prenomInput:', prenomInput);
      console.log('emailInput:', emailInput);
      console.log('messageInput:', messageInput);

      fireEvent.change(nomInput, { target: { value: "zaaine" } });
      fireEvent.change(prenomInput, { target: { value: "aziz" } });
      fireEvent.change(emailInput, { target: { value: "aziz.Zed@gmail.com" } });
      fireEvent.change(messageInput, { target: { value: "Test message" } });

      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      await waitFor(() => expect(onSuccess).toHaveBeenCalled());

      // Vérifier que les champs du formulaire ont été réinitialisés
      expect(nomInput.value).toBe("");
      expect(prenomInput.value).toBe("");
      expect(emailInput.value).toBe("");
      expect(messageInput.value).toBe("");
    },)})