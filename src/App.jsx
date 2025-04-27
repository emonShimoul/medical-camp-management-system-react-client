import "./App.css";

function App() {
  return (
    <div className="text-center">
      <h1 className="mt-8 mb-4 font-bold">Vite + React</h1>
      <div>
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
        <span className="loading loading-spinner text-neutral"></span>
        <span className="loading loading-spinner text-info"></span>
        <span className="loading loading-spinner text-success"></span>
        <span className="loading loading-spinner text-warning"></span>
        <span className="loading loading-spinner text-error"></span>
      </div>
    </div>
  );
}

export default App;
