import { DogProvider } from "./providers/DogProvider";
import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";

export function App() {
  return (
    <DogProvider>
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Functional)</h1>
        </header>
        <Section label={"Dogs: "}>
          <Dogs />
        </Section>
      </div>
    </DogProvider>
  );
}
