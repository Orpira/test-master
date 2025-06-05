import { ImSpinner8 } from "react-icons/im";

export function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[120px]">
      <ImSpinner8 className="animate-spin text-5xl text-purple-500 drop-shadow-lg" />
      <span className="mt-4 text-lg text-purple-700 font-semibold animate-pulse tracking-wide">
        Cargando...
      </span>
      <div className="mt-2 w-32 h-2 bg-purple-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-gradient-x"
          style={{ width: "100%" }}
        ></div>
      </div>
      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 1.2s linear infinite alternate;
        }
      `}</style>
    </div>
  );
}
