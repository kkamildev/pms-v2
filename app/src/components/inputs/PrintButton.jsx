import { useRef } from "react";
import { useReactToPrint } from "react-to-print"

const PrintButton = ({children, documentTitle="dokument", printComponent}) => {
    const printComponentRef = useRef(null);

    const handlePrint = useReactToPrint({
        contentRef: printComponentRef,
        documentTitle:documentTitle
    });

    return (
    <>
        <section className="my-1">
            <button className="primary-btn" onClick={handlePrint}>{children}</button>
        </section>
        <section className="hidden">
            <section ref={printComponentRef}>
                {printComponent}
            </section>
        </section>
    
    </>
    )
}

export default PrintButton;