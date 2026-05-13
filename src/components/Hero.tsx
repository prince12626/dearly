import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
      const navigate = useNavigate();

      return (
            <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-white px-6 py-20">
                  {/* Background */}
                  <div className="absolute inset-0">
                        <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-indigo-600/5 blur-3xl" />

                        <div className="absolute left-20 top-32 h-24 w-24 rounded-full border border-black/5" />
                        <div className="absolute bottom-32 right-20 h-40 w-40 rounded-full border border-black/5" />

                        <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-position-[60px_60px]" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
                        {/* Badge */}
                        <div className="mb-8 flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 shadow-sm">
                              <Sparkles size={15} className="text-indigo-600" />
                              <span className="text-sm font-medium text-black">
                                    Make your wishes unforgettable
                              </span>
                        </div>

                        {/* Heading */}
                        <h1 className="max-w-5xl text-5xl font-black leading-[1.05] tracking-tight text-black md:text-7xl">
                              Turn Your{" "}
                              <span className="text-indigo-600">Feelings</span>{" "}
                              Into Beautiful <br />
                              Digital Wishes
                        </h1>

                        {/* Description */}
                        <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-600 md:text-lg">
                              Create emotional, cinematic and interactive wish
                              pages for birthdays, memories, celebrations and
                              special moments.
                        </p>

                        {/* Buttons */}
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                              <button
                                    onClick={() => navigate("/create-wish")}
                                    className="group flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:scale-[1.03] hover:bg-indigo-500 active:scale-[0.98] cursor-pointer"
                              >
                                    Create Your Wish
                                    <ArrowRight
                                          size={18}
                                          className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                              </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3">
                              {[
                                    ["10K+", "Wishes Created"],
                                    ["4.9/5", "User Experience"],
                                    ["∞", "Emotions Delivered"],
                              ].map(([value, label]) => (
                                    <div
                                          key={label}
                                          className="rounded-3xl border border-black/10 bg-white/80 px-8 py-6 shadow-sm backdrop-blur-xl"
                                    >
                                          <h3 className="text-3xl font-black text-black">
                                                {value}
                                          </h3>

                                          <p className="mt-1 text-sm font-medium text-zinc-500">
                                                {label}
                                          </p>
                                    </div>
                              ))}
                        </div>

                        {/* Bottom Preview */}
                        <div className="relative mt-20 w-full max-w-5xl overflow-hidden rounded-4xl border border-black/10 bg-white shadow-2xl shadow-black/5">
                              <div className="flex items-center gap-2 border-b border-black/5 px-5 py-4">
                                    <div className="h-3 w-3 rounded-full bg-red-400" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                    <div className="h-3 w-3 rounded-full bg-green-400" />
                              </div>

                              <div className="relative flex h-96 flex-col items-center justify-center overflow-hidden bg-zinc-50 px-6">
                                    <Heart
                                          size={60}
                                          className="mb-5 fill-indigo-600 text-indigo-600"
                                    />

                                    <h2 className="text-center text-4xl font-bold tracking-tight text-black">
                                          Happy Birthday, Prince ✨
                                    </h2>

                                    <p className="mt-4 max-w-xl text-center text-zinc-500">
                                          Thank you for being the best part of
                                          my life. This little page holds some
                                          of my favorite memories with you.
                                    </p>

                                    <button
                                          onClick={() => navigate("/create-wish")}
                                          className="mt-8 rounded-full bg-black px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:bg-zinc-800"
                                    >
                                          Open Memories
                                    </button>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default Hero;
