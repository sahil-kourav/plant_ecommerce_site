import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-background">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between w-full lg:w-1/2 bg-[#1B1B1B] text-white px-14 py-36 shadow-xl">
        <div className="space-y-8 max-w-lg mx-auto">
          <h1 className="text-4xl font-extrabold leading-tight text-white-100">
          VrakshEarth
          </h1>
          <p className="text-md text-white leading-relaxed">
            Discover the art of indoor greenery 🌿 <br />
            Breathe life into your space with elegant, air-purifying plants —
            <br />
            hand-picked for style, delivered with care.
          </p>
          <p className="text-md text-white leading-relaxed mt-2">
            At VrakshEarth, we believe that nature belongs in every home.
            Whether you're a seasoned plant parent or just beginning your
            journey, we offer a curated selection of vibrant, low-maintenance
            plants that bring beauty, balance, and clean air to your indoor
            spaces.
          </p>

          <p className="text-md text-white leading-relaxed mt-2">
            Join thousands of happy customers who’ve transformed their homes and
            workspaces into peaceful green retreats. It’s more than just plants
            — it’s a lifestyle.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:px-20 bg-white">
        <div className="w-full max-w-md space-y-8 rounded-xl shadow-md p-8 border border-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
