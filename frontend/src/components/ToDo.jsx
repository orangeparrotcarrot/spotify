import SideBar from "./SideBar"
import './Dashboard.css'
const ToDo = () => {

  const toDoList = [
    "Add refresh token",
    "Access Token out of local storage",
    "Dashboard",
    "Fix the selects",
  ]

  const done = [
    "Add duration to songs",
    "Give different time spans",
    "Top Artists",
    "eslint",
    "Learn more about songs"
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