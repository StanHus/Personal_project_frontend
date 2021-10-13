import { useState } from "react"
import "../../css/style.css"
import LoginPage from "./LogMeIn"


export default function SignUp (){

    const [userName, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [completed, setCompleted] = useState(false)

    const onSubmitForm = async (e: any) => {
        setCompleted(true)
            e.preventDefault();
        try {
            await fetch("https://mysterious-reaches-13528.herokuapp.com/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userName: userName,
                email: email,
                password: password
              }),
          });
        } catch (err) {
          console.error(err);
        }
    }

return(
<div>
    {(!completed) &&
    <section>
      <h2 className = "subheader">Create an account</h2>
      <form className = "inputs" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Username"
          className="ex-input"
          value={userName}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          className="ex-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          className="ex-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className = "btn-success">Add</button>
      </form>
    </section>
    }
        {(completed) && 
        <div>
             <h1>You are signed up and logged in</h1>
             <h2>Your username is {userName}</h2>
             <LoginPage username ={userName} email ={email} isUser = {true}/>
        </div>}
    </div>
        )
}