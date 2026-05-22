import Dashboard from "../components/Dashboard";

function DashboardPage() {
  const logout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <Dashboard />
      </div>
    </div>
  );
}

export default DashboardPage;