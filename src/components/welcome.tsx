export default function Welcome() {
  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center px-4 text-white bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}welcome.png)`,
      }}
    >
      <div className="relative z-10 text-center bg-transparent">
        <h1 className="text-4xl sm:text-6xl font-black bg-transparent animate-gradient-text-fade-in bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent tracking-tight drop-shadow-2xl">
          ¡Bienvenido!
        </h1>
        <p className="text-xl sm:text-2xl mt-6 max-w-2xl mx-auto text-center animate-fade-in-up font-sans tracking-wide text-white/90 shadow-lg px-4 py-2 rounded-xl backdrop-blur-md bg-black/30">
          Es hora de medir tus conocimientos.
        </p>
      </div>
    </div>
  );
}
