import { Gift, Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type FloatingItemType = {
      id: number;
      left: number;
      delay: number;
      color: string;
      size: number;
      duration: number;
};

type ParticleType = {
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
      angle: number;
};

const WishPage = () => {
      const params = new URLSearchParams(window.location.search);

      const name = params.get("name") || "Someone";
      const message =
            params.get("message") ||
            "You are amazing and deserve all the happiness in the world.";
      const type = params.get("type") || "birthday";
      const from = params.get("from") || "Someone";

      const isBirthday = type === "birthday";

      const balloonColors = [
            { bg: "bg-red-500", shadow: "shadow-red-500/50" },
            { bg: "bg-blue-500", shadow: "shadow-blue-500/50" },
            { bg: "bg-yellow-400", shadow: "shadow-yellow-400/50" },
            { bg: "bg-green-500", shadow: "shadow-green-500/50" },
            { bg: "bg-purple-500", shadow: "shadow-purple-500/50" },
            { bg: "bg-pink-500", shadow: "shadow-pink-500/50" },
            { bg: "bg-orange-500", shadow: "shadow-orange-500/50" },
            { bg: "bg-indigo-500", shadow: "shadow-indigo-500/50" },
      ];

      const [items, setItems] = useState<FloatingItemType[]>([]);
      const [confetti, setConfetti] = useState<ParticleType[]>([]);
      const [particles, setParticles] = useState<ParticleType[]>([]);

      useEffect(() => {
            const generated = Array.from({ length: isBirthday ? 18 : 16 }, (_, i) => {
                  const colorObj = balloonColors[Math.floor(Math.random() * balloonColors.length)];
                  return {
                        id: i,
                        left: Math.random() * 100,
                        delay: Math.random() * 4,
                        color: colorObj.bg,
                        size: isBirthday ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 2) + 1,
                        duration: isBirthday ? Math.random() * 2 + 10 : Math.random() * 2 + 12,
                  };
            });

            setItems(generated);

            // Generate initial confetti for birthday
            if (isBirthday) {
                  const confettiParticles = Array.from({ length: 40 }, (_, i) => ({
                        id: i,
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        size: Math.random() * 4 + 2,
                        duration: Math.random() * 15 + 20,
                        angle: Math.random() * 360,
                  }));
                  setConfetti(confettiParticles);
            }
      }, []);

      const createBurstParticles = (x: number, y: number) => {
            const newParticles = Array.from({ length: 12 }, (_, i) => ({
                  id: Date.now() + i,
                  x,
                  y,
                  size: Math.random() * 3 + 1,
                  duration: Math.random() * 0.6 + 0.4,
                  angle: (360 / 12) * i + (Math.random() - 0.5) * 30,
            }));
            setParticles((prev) => [...prev, ...newParticles]);
            setTimeout(() => {
                  setParticles((prev) =>
                        prev.filter((p) => p.id !== newParticles[0].id && p.id !== newParticles[newParticles.length - 1].id),
                  );
            }, 700);
      };

      const removeItem = (id: number, e?: React.MouseEvent) => {
            if (e) {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  createBurstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
            setItems((prev) => prev.filter((item) => item.id !== id));
      };

      return (
            <section
                  className={`relative min-h-screen overflow-hidden px-6 py-16 ${
                        isBirthday
                              ? "bg-linear-to-br from-slate-950 via-black to-slate-900"
                              : "bg-linear-to-br from-slate-50 via-pink-50 to-rose-50"
                  }`}
            >
                  {/* Ambient background glow */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {isBirthday ? (
                              <>
                                    {/* Birthday glows */}
                                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl animate-pulse" />
                                    <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl animate-pulse animation-delay-2000" />
                                    <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl animate-pulse animation-delay-4000" />
                              </>
                        ) : (
                              <>
                                    {/* Anniversary glows */}
                                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-pink-300/20 blur-3xl animate-pulse" />
                                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-rose-300/15 blur-3xl animate-pulse animation-delay-2000" />
                              </>
                        )}
                  </div>

                  {/* Confetti particles (Birthday only) */}
                  {isBirthday && (
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                              {confetti.map((particle) => (
                                    <div
                                          key={particle.id}
                                          className="absolute animate-confetti"
                                          style={{
                                                left: `${particle.x}%`,
                                                top: `${particle.y}%`,
                                                width: `${particle.size}px`,
                                                height: `${particle.size}px`,
                                                background: balloonColors[Math.floor(Math.random() * balloonColors.length)].bg,
                                                animationDuration: `${particle.duration}s`,
                                          }}
                                    />
                              ))}
                        </div>
                  )}

                  {/* Pop burst particles */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        {particles.map((particle) => (
                              <div
                                    key={particle.id}
                                    className="absolute animate-burst rounded-full"
                                    style={{
                                          left: `${particle.x}px`,
                                          top: `${particle.y}px`,
                                          width: `${particle.size}px`,
                                          height: `${particle.size}px`,
                                          background: isBirthday ? "rgba(79, 70, 229, 0.6)" : "rgba(236, 72, 153, 0.6)",
                                          boxShadow: isBirthday
                                                ? "0 0 8px rgba(79, 70, 229, 0.8)"
                                                : "0 0 8px rgba(236, 72, 153, 0.8)",
                                          animationDuration: `${particle.duration}s`,
                                          "--angle": `${particle.angle}deg`,
                                    } as React.CSSProperties}
                              />
                        ))}
                  </div>

                  {/* Floating Items */}
                  <div className="absolute inset-0 overflow-visible pointer-events-none z-50">
                        {items.map((item) => (
                              <button
                                    key={item.id}
                                    onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          removeItem(item.id, e);
                                    }}
                                    onTouchStart={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                    }}
                                    onTouchEnd={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          const touch = e.changedTouches[0];
                                          const element = document.elementFromPoint(touch.clientX, touch.clientY);
                                          if (element === e.currentTarget) {
                                                removeItem(item.id, e as any);
                                          }
                                    }}
                                    className="pointer-events-auto absolute cursor-pointer transition-all hover:scale-110 active:scale-95 focus:outline-none group touch-none"
                                    style={{
                                          left: `${item.left}%`,
                                          bottom: "-120px",
                                          animation: `float ${item.duration}s linear infinite`,
                                          animationDelay: `${item.delay}s`,
                                          WebkitTouchCallout: "none",
                                          WebkitUserSelect: "none",
                                          willChange: "transform",
                                    }}
                              >
                                    {isBirthday ? (
                                          <div className="relative flex flex-col items-center">
                                                {/* Balloon with realistic glossy shape */}
                                                <div
                                                      className={`relative transition-all ${
                                                            item.size === 1
                                                                  ? "h-20 w-16"
                                                                  : item.size === 2
                                                                  ? "h-28 w-22"
                                                                  : "h-32 w-28"
                                                      } rounded-full ${item.color} shadow-2xl overflow-hidden group-hover:shadow-3xl`}
                                                      style={{
                                                            boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), inset -10px -10px 20px rgba(0, 0, 0, 0.2)`,
                                                      }}
                                                >
                                                      {/* Main glossy highlight */}
                                                      <div className="absolute top-4 left-1/3 h-1/3 w-1/3 rounded-full bg-white/40 blur-md" />
                                                      {/* Secondary subtle highlight */}
                                                      <div className="absolute top-2 left-1/4 h-1/4 w-1/4 rounded-full bg-white/25" />
                                                      {/* Internal shading */}
                                                      <div className="absolute inset-0 rounded-full bg-linear-to-b from-transparent via-transparent to-black/10" />
                                                </div>

                                                {/* String - curved */}
                                                <div
                                                      className="relative"
                                                      style={{
                                                            width: "2px",
                                                            height: `${item.size === 1 ? 24 : item.size === 2 ? 32 : 40}px`,
                                                            background: "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.1))",
                                                      }}
                                                />

                                                {/* Knot at bottom */}
                                                <div className="h-1.5 w-1.5 rounded-full bg-white/50 shadow-md" />
                                          </div>
                                    ) : (
                                          <div className="relative flex flex-col items-center">
                                                {/* Heart with glossy effect */}
                                                <div className="relative group/heart">
                                                      <Heart
                                                            size={item.size === 1 ? 50 : 70}
                                                            className="fill-pink-500 text-pink-500 drop-shadow-2xl transition-all group-hover/heart:drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] animate-pulse"
                                                      />
                                                      {/* Glow halo */}
                                                      <div className="absolute inset-0 rounded-full bg-pink-400/30 blur-2xl -z-10 group-hover/heart:blur-3xl transition-all" />
                                                </div>
                                          </div>
                                    )}
                              </button>
                        ))}
                  </div>

                  {/* Main Content */}
                  <div className="relative z-20 mx-auto flex min-h-[calc(100vh-128px)] max-w-5xl items-center justify-center animate-fadeIn">
                        <div
                              className={`w-full overflow-hidden rounded-3xl border p-8 md:p-14 transition-all duration-500 ${
                                    isBirthday
                                          ? "border-indigo-500/30 bg-black/40 backdrop-blur-3xl shadow-2xl hover:shadow-3xl hover:border-indigo-500/50 hover:bg-black/50"
                                          : "border-pink-200/60 bg-white/50 backdrop-blur-2xl shadow-2xl hover:shadow-3xl hover:border-pink-300/80 hover:bg-white/60"
                              }`}
                        >
                              {/* Badge */}
                              <div
                                    className={`mb-8 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold tracking-wide shadow-lg transition-all ${
                                          isBirthday
                                                ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white"
                                                : "bg-linear-to-r from-pink-500 to-rose-500 text-white"
                                    }`}
                              >
                                    {isBirthday ? (
                                          <Gift size={18} />
                                    ) : (
                                          <Heart size={18} className="fill-current" />
                                    )}
                                    {isBirthday ? "🎉 Happy Birthday" : "💕 Happy Anniversary"}
                              </div>

                              {/* Heading with animation */}
                              <h1
                                    className={`text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-2 transition-all ${
                                          isBirthday
                                                ? "text-transparent bg-clip-text bg-linear-to-r from-indigo-200 via-white to-purple-200"
                                                : "text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-pink-600 to-rose-600"
                                    }`}
                              >
                                    Dear {name}
                              </h1>

                              <div className="flex items-center gap-2 mb-8">
                                    <Sparkles
                                          size={32}
                                          className={`${
                                                isBirthday ? "text-indigo-400 animate-spin-slow" : "text-pink-400 animate-spin-slow"
                                          }`}
                                    />
                              </div>

                              {/* Message section */}
                              <div
                                    className={`mt-10 rounded-2xl border p-6 md:p-8 backdrop-blur-sm transition-all ${
                                          isBirthday
                                                ? "border-indigo-500/30 bg-indigo-600/5"
                                                : "border-pink-200/60 bg-pink-100/30"
                                    }`}
                              >
                                    <p
                                          className={`max-h-96 overflow-y-auto wrap-break-word whitespace-pre-wrap text-lg leading-9 font-medium ${
                                                isBirthday ? "text-slate-200" : "text-slate-700"
                                          } custom-scrollbar`}
                                    >
                                          {message}
                                    </p>
                              </div>

                              {/* Footer */}
                              <div className="mt-10 flex items-center gap-4 group/footer">
                                    <div
                                          className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold shadow-lg transition-all hover:scale-110 group-hover/footer:shadow-xl ${
                                                isBirthday
                                                      ? "bg-linear-to-br from-indigo-600 to-purple-600 text-white"
                                                      : "bg-linear-to-br from-pink-500 to-rose-500 text-white"
                                          }`}
                                    >
                                          {from.charAt(0).toUpperCase()}
                                    </div>

                                    <div>
                                          <p
                                                className={`text-sm font-semibold tracking-wide ${
                                                      isBirthday ? "text-indigo-300/70" : "text-pink-600/70"
                                                }`}
                                          >
                                                With love from
                                          </p>
                                          <h3
                                                className={`text-2xl font-black tracking-tight ${
                                                      isBirthday
                                                            ? "text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-purple-300"
                                                            : "text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-rose-600"
                                                }`}
                                          >
                                                {from}
                                          </h3>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Animations */}
                  <style>{`
                        @keyframes float {
                              0% {
                                    transform: translateY(0) translateX(0) rotate(0deg);
                                    opacity: 1;
                              }
                              25% {
                                    transform: translateY(-25vh) translateX(15px) rotate(15deg);
                              }
                              50% {
                                    transform: translateY(-60vh) translateX(-20px) rotate(-10deg);
                                    opacity: 0.8;
                              }
                              75% {
                                    transform: translateY(-90vh) translateX(25px) rotate(25deg);
                              }
                              100% {
                                    transform: translateY(-140vh) translateX(0) rotate(360deg);
                                    opacity: 0;
                              }
                        }

                        @keyframes confetti {
                              0% {
                                    transform: translateY(0) rotate(0deg);
                                    opacity: 1;
                              }
                              100% {
                                    transform: translateY(100vh) rotate(720deg);
                                    opacity: 0;
                              }
                        }

                        @keyframes burst {
                              0% {
                                    transform: translate(0, 0) scale(1);
                                    opacity: 1;
                              }
                              100% {
                                    transform: translate(calc(100px * cos(var(--angle))), calc(100px * sin(var(--angle)))) scale(0);
                                    opacity: 0;
                              }
                        }

                        @keyframes fadeIn {
                              0% {
                                    opacity: 0;
                                    transform: translateY(20px);
                              }
                              100% {
                                    opacity: 1;
                                    transform: translateY(0);
                              }
                        }

                        @keyframes spinSlow {
                              from {
                                    transform: rotate(0deg);
                              }
                              to {
                                    transform: rotate(360deg);
                              }
                        }

                        .animate-float {
                              animation: float 14s ease-in-out infinite;
                        }

                        .animate-confetti {
                              animation: confetti linear forwards;
                        }

                        .animate-burst {
                              animation: burst ease-out forwards;
                        }

                        .animate-fadeIn {
                              animation: fadeIn 0.8s ease-out;
                        }

                        .animate-spin-slow {
                              animation: spinSlow 3s linear infinite;
                        }

                        .animation-delay-2000 {
                              animation-delay: 2s;
                        }

                        .animation-delay-4000 {
                              animation-delay: 4s;
                        }

                        .custom-scrollbar {
                              scrollbar-width: thin;
                              scrollbar-color: rgba(79, 70, 229, 0.3) transparent;
                        }

                        .custom-scrollbar::-webkit-scrollbar {
                              width: 6px;
                        }

                        .custom-scrollbar::-webkit-scrollbar-track {
                              background: transparent;
                        }

                        .custom-scrollbar::-webkit-scrollbar-thumb {
                              background-color: rgba(79, 70, 229, 0.3);
                              border-radius: 3px;
                        }

                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                              background-color: rgba(79, 70, 229, 0.5);
                        }
                  `}</style>
            </section>
      );
};

export default WishPage;
