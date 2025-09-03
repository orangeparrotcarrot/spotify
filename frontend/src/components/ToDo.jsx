import SideBar from "./SideBar"
import './Dashboard.css'
const ToDo = () => {

    const toDoList = [
        "Learn more about songs",
        "Add refresh token",
        "Access Token out of local storage",
        "Add duration to songs",
        "Dashboard",
        "Fix the selects",
        "eslint"
    ]

    const done = [
        "Give different time spans",
        "Top Artists"
    ]
    const listItems = toDoList.map(item => <li>{item}</li>)
    const doneItems = done.map(item => <li>{item}</li>)
    return (
        <div className="dashboard">
            <SideBar />
            <main className="main-content">
                <div className="tracks">
                    To Do:
                    <ul>
                        {listItems}
                    </ul>

                    Done:
                    <ul>
                        {doneItems}
                    </ul>
                </div>
            </main>
        </div>
    )
}

export default ToDo;