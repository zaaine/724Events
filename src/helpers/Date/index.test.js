import { getMonth } from "./index";

// Définition d'une suite de tests pour l'assistant de dates
describe("Date helper", () => {
    // Définition d'une suite de tests pour la fonction getMonth
    describe("When getMonth is called", () => {
        // Test : la fonction doit retourner 'janvier' pour la date 2022-01-01
        it("the function return janvier for 2022-01-01 as date", () => {
            // to implement
            // Création d'une instance de la classe Date avec la date '2022-01-01'
            const date = new Date('2022-01-01')
            // Vérification : la fonction doit retourner 'janvier' pour la date '2022-01-01'
            expect(getMonth(date)).toEqual('janvier')
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            // to implement
            const date = new Date('2022-07-08')
            expect(getMonth(date)).toEqual('juillet')
        });
    });
})

