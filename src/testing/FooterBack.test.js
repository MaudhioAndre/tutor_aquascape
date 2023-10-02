import { render, screen } from "@testing-library/react"
import FooterBack from "../components/footer/FooterBack"

describe('footer back test', () => {
    test('footer back render correcly', () => {
        render(<FooterBack />)

        const footerText = screen.getByText("2023, Maudhio Andre");
        expect(footerText).toBeInTheDocument();
    })
})