interface IUser {
    username: string;
    email: string;
    isUser: boolean;
}

export default function LoginPage (props: IUser) {
    return (
      <div>
          <h1>Log In Page</h1>
      </div>)
}