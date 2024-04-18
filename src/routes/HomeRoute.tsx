import { Link } from "react-router-dom";

export const HomeRoute = () => {
  return (
    <main>
      <p>Home</p>
      <Link to={"/adventure"}>Adventure!</Link>
    </main>
  );
};