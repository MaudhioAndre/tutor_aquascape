import { render, screen } from "@testing-library/react"
import FooterFront from "../components/footer/FooterFront"

describe('footer front test', () => {
    test('footer front render correcly', () => {
        render(<FooterFront />)

        const footerText = screen.getByText("AQUASCAPE TUTORIAL");
        expect(footerText).toBeInTheDocument();

        const yearText = screen.getByText("2023");
        expect(yearText).toBeInTheDocument();
    })
})