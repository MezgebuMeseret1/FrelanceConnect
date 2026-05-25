import { useState } from "react";

// Layout
import MainLayout from "./shared/layouts/MainLayout";

// Router
import AppRouter from "./app/router";

// Global styles
import "./styles/global.css";

function App() {
  const [isReady] = useState(true);

  if (!isReady) {
    return (
      <div className="loader-screen">
        <p>Loading FrelanceConnect...</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  );
}

export default App;