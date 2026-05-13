import { useState } from "react";
import { Copy, Gift, Link2, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";

const CreateWish = () => {
      const [name, setName] = useState("");
      const [message, setMessage] = useState("");
      const [type, setType] = useState("birthday");
      const [from, setFrom] = useState("");
      const [copied, setCopied] = useState(false);

      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      const wishUrl = `${baseUrl}/wish?name=${encodeURIComponent(
            name,
      )}&message=${encodeURIComponent(
            message,
      )}&type=${encodeURIComponent(type)}&from=${encodeURIComponent(from)}`;

      const copyUrl = async () => {
            try {
                  await navigator.clipboard.writeText(wishUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
            } catch (error) {
                  console.error("Failed to copy:", error);
            }
      };

      return (
            <div className="min-h-screen bg-white">
                  <Navbar />
                  <section className="min-h-[calc(100vh-64px)] bg-white px-6 py-16 text-black">
                  <div className="mx-auto max-w-6xl">
                        {/* Header */}
                        <div className="mb-12 text-center">
                              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20">
                                    <Gift size={30} />
                              </div>

                              <h1 className="text-5xl font-black tracking-tight md:text-6xl">
                                    Create Your Wish
                              </h1>

                              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-500">
                                    Create emotional and beautiful digital wish
                                    pages with a shareable link.
                              </p>
                        </div>

                        {/* Main Grid */}
                        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                              {/* Form */}
                              <div className="rounded-4xl border border-black/10 bg-white p-7 shadow-2xl shadow-black/5 md:p-9">
                                    <div className="mb-8 flex items-center gap-3">
                                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                                                <Sparkles size={20} />
                                          </div>

                                          <div>
                                                <h2 className="text-2xl font-bold">
                                                      Wish Details
                                                </h2>

                                                <p className="text-sm text-zinc-500">
                                                      Fill all the details below
                                                </p>
                                          </div>
                                    </div>

                                    <form className="space-y-6">
                                          {/* Name */}
                                          <div>
                                                <label className="mb-2 block text-sm font-semibold">
                                                      Recipient Name
                                                </label>

                                                <input
                                                      type="text"
                                                      placeholder="e.g. Faah"
                                                      value={name}
                                                      onChange={(e) =>
                                                            setName(
                                                                  e.target
                                                                        .value,
                                                            )
                                                      }
                                                      className="w-full rounded-2xl border border-black/10 bg-zinc-50 px-5 py-4 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                                                />
                                          </div>

                                          {/* Message */}
                                          <div>
                                                <label className="mb-2 block text-sm font-semibold">
                                                      Your Message
                                                </label>

                                                <textarea
                                                      rows={6}
                                                      placeholder="Write your emotional message..."
                                                      value={message}
                                                      onChange={(e) =>
                                                            setMessage(
                                                                  e.target
                                                                        .value,
                                                            )
                                                      }
                                                      className="w-full resize-none rounded-2xl border border-black/10 bg-zinc-50 px-5 py-4 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                                                />
                                          </div>

                                          {/* Type + From */}
                                          <div className="grid gap-5 md:grid-cols-2">
                                                <div>
                                                      <label className="mb-2 block text-sm font-semibold">
                                                            Wish Type
                                                      </label>

                                                      <select
                                                            value={type}
                                                            onChange={(e) =>
                                                                  setType(
                                                                        e.target
                                                                              .value,
                                                                  )
                                                            }
                                                            className="w-full rounded-2xl border border-black/10 bg-zinc-50 px-5 py-4 outline-none transition-all duration-300 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                                                      >
                                                            <option value="birthday">
                                                                  Birthday
                                                            </option>

                                                            <option value="anniversary">
                                                                  Anniversary
                                                            </option>
                                                      </select>
                                                </div>

                                                <div>
                                                      <label className="mb-2 block text-sm font-semibold">
                                                            From
                                                      </label>

                                                      <input
                                                            type="text"
                                                            placeholder="Your name"
                                                            value={from}
                                                            onChange={(e) =>
                                                                  setFrom(
                                                                        e.target
                                                                              .value,
                                                                  )
                                                            }
                                                            className="w-full rounded-2xl border border-black/10 bg-zinc-50 px-5 py-4 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                                                      />
                                                </div>
                                          </div>
                                    </form>
                              </div>

                              {/* Preview */}
                              <div className="rounded-4xl border border-black/10 bg-zinc-50 p-7 shadow-2xl shadow-black/5 md:p-9">
                                    <div className="mb-7 flex items-center gap-3">
                                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                                                <Link2 size={20} />
                                          </div>

                                          <div>
                                                <h2 className="text-2xl font-bold">
                                                      Generated Link
                                                </h2>

                                                <p className="text-sm text-zinc-500">
                                                      Share it with anyone
                                                </p>
                                          </div>
                                    </div>

                                    {/* URL Box */}
                                    <div className="rounded-2xl border border-black/10 bg-white p-5">
                                          <p className="mb-3 text-sm font-semibold text-zinc-500">
                                                Wish URL
                                          </p>

                                          <p className="max-h-32 overflow-y-auto break-all text-sm leading-7 text-zinc-700">
                                                {wishUrl}
                                          </p>
                                    </div>

                                    {/* Copy Button */}
                                    <button
                                          type="button"
                                          onClick={copyUrl}
                                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-500 active:scale-[0.98] cursor-pointer"
                                    >
                                          <Copy size={18} />
                                          {copied ? "✓ Copied!" : "Copy Wish Link"}
                                    </button>

                                    {/* Live Preview */}
                                    <div className="mt-8 overflow-hidden rounded-4xl border border-black/10 bg-white">
                                          <div className="flex items-center gap-2 border-b border-black/5 px-5 py-4">
                                                <div className="h-3 w-3 rounded-full bg-red-400" />
                                                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                                <div className="h-3 w-3 rounded-full bg-green-400" />
                                          </div>

                                          <div className="p-7">
                                                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                                                      {type || "birthday"}
                                                </p>

                                                <h2 className="text-4xl font-black leading-tight">
                                                      Dear {name || "Someone"}{" "}
                                                      ✨
                                                </h2>

                                                <p className="mt-5 max-h-60 overflow-y-auto wrap-break-word whitespace-pre-wrap leading-8 text-zinc-600">
                                                      {message ||
                                                            "Your beautiful message preview will appear here..."}
                                                </p>

                                                <div className="mt-8 flex items-center gap-3">
                                                      <div className="h-11 w-11 rounded-full bg-indigo-600" />

                                                      <div>
                                                            <p className="text-sm text-zinc-500">
                                                                  From
                                                            </p>

                                                            <h4 className="font-semibold">
                                                                  {from ||
                                                                        "Your Name"}
                                                            </h4>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
            </div>
      );
};

export default CreateWish;
