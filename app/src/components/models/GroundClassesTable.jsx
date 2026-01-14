import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GroundClassesTable = ({title = "", data = [], headHeaders = []}) => {
    
    return (
        <section className="my-5">
            <h1 className="font-bold text-center text-2xl mb-5">{title}</h1>
            <table>
                <thead>
                    <tr className="border-2 text-2xl text-center font-bold">
                        {
                            headHeaders.map((obj, index) => <td key={index} className="border-2 p-5 min-w-20 min-h-20">{obj}</td>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((obj) => 
                            <tr className="border-2 text-xl text-center font-bold" key={obj.id}>
                                <td className="border-2 p-5 min-w-20 min-h-20">{obj.class}</td>
                                {
                                    obj.converters.map((obj, index) => 
                                        <td className="border-2 p-5 min-w-20 min-h-20" key={index}>{obj}</td>
                                    )
                                }
                                <td className="p-5 min-w-20 min-h-20 flex gap-x-3">
                                    <button className="error-btn"><FontAwesomeIcon icon={faTrashCan}/> Usuń</button>
                                    <button className="edit-btn"><FontAwesomeIcon icon={faPen}/> Edytuj</button>
                                </td>
                                
                            </tr>
                        )
                        
                    }
                </tbody>
            </table>
        </section>
    )
}

export default GroundClassesTable;