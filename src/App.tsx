import Hero from "./components/hero/Hero";
import CustomCursorProvider from "./contexts/CursorContext";

function App() {
  return (
    <CustomCursorProvider>
      <div className="page-wrapper flex min-h-screen flex-col items-center">
        <Hero />
      </div>
    </CustomCursorProvider>
  );
}

export default App;
