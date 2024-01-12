import { render, screen } from "@testing-library/react";
import md5 from "md5";
import Icon from "./index";

describe("Icon component", () => {
    describe("When a icon is created with name twitch", () => {
        it("the icon contain this path hash value 327fbc38c8e878259c3ec35ef231517a", () => {
            render(<Icon name="twitch" />)
            expect(md5(screen.getByTestId("icon").getAttribute('d'))).toEqual('327fbc38c8e878259c3ec35ef231517a')
        });
    });
    // Test Unitaire
    describe("When a icon is created with name facebook", () => {
        it("the icon contain this path hash value bbea4c9e40773b969fdb6e406059f853", () => {
            // to complete
            // Rendre le composant Icon avec le nom 'facebook' en relation avec son data-testid
            render(<Icon name="facebook" />)
            // Examine que le hachage MD5 calculé de l'attribut 'd' correspond à la valeur attendue
            expect(md5(screen.getByTestId("icon").getAttribute('d'))).toEqual('bbea4c9e40773b969fdb6e406059f853')
        });
    });
})

