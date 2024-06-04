import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";
import { useNavigationContext } from "./hooks/api.hooks";

export function App() {
  const { currentView } = useNavigationContext();
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {currentView === "create dog" ? <CreateDogForm /> : <Dogs />}
      </Section>
    </div>
  );
}
