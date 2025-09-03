import SideBar from "./SideBar"
import './Dashboard.css'
const ToDo = () => {

    const toDoList = [
        "Learn more about songs",
        "Give different time spans - DONE",
        "Add refresh token"
    ]
    const listItems = toDoList.map(item => <li>{item}</li>)
    return (
        <div className="dashboard">
            <SideBar />
            <main className="main-content">
                <div className="tracks">
                    <ul>
            {listItems}
        </ul>
                </div>
            </main>
        </div>
    )
}

export default ToDo;