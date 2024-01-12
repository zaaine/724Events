import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

// Activation des faux timer avant le test (simulation de temps)
jest.useFakeTimers();

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      
      // Avance le temps d'attente du timer
      jest.advanceTimersByTime(1000);

      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

// Définition d'une suite de tests pour une page créée
describe("When a page is created", () => {
  // Test : une liste d'événements doit être affichée
  it("a list of events is displayed", () => {
    // to implement
    // Rendu dans le composant 'Home'
    render(<Home/>);
    // Récupération de la liste d'événements par le test ID
    const events = screen.getByTestId('events.testid');
    // Vérification (expectation) : la liste dévénements doit être définie (non null)
    expect(events).toBeDefined();
  })
  it("a list a people is displayed", () => {
    // to implement
    render(<Home/>);
    const people = screen.getByTestId('people.testid');
    expect(people).toBeDefined();
  })
  it("a footer is displayed", () => {
    // to implement
    render(<Home/>);
    const footer = screen.getByTestId('footer.testid');
    expect(footer).toBeDefined();
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
    render(<Home/>);
    const last = screen.getByTestId('last.testid');
    expect(last).toBeDefined();
  })
});
