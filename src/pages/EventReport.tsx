import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import { EVENTS } from "@/lib/events";

const EventReport = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = EVENTS.find((item) => item.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-black">
        <Navbar />
        <main className="flex-1 py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white">
              Event Not Found
            </h1>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              We couldn't find the event you were looking for.
            </p>
            <Link
              to="/Insights"
              className="mt-8 inline-flex rounded-full bg-green-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-white hover:bg-green-700"
            >
              Back to Reports
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Navbar />
      <main className="flex-1 pt-0 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-900 dark:bg-black">
          <div className="absolute inset-0">
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover  blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/95" />
          </div>

          <div className="container mx-auto px-4 py-24 relative">
            <div className="max-w-4xl">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-100 shadow-sm">
                {event.category} Insights
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl">
                {event.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                {event.purpose}
              </p>

              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white shadow-xl shadow-slate-950/20 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Date</p>
                  <p className="mt-3 text-lg font-semibold">{event.date}</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white shadow-xl shadow-slate-950/20 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Location</p>
                  <p className="mt-3 text-lg font-semibold">{event.location}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Images Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="rounded-[2.5rem] border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Event Images</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              A visual preview of the event captured during the sessions.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {event.images.map((src) => (
                <div
                  key={src}
                  className=" aspect-[16/14] overflow-hidden  rounded-[2rem] border border-slate-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <img
                    src={src}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-10"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Single Blog Box */}
        <section className="container mx-auto px-4 pb-16">
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            
            {/* Purpose */}
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.35em] text-green-600 dark:text-green-500">
                Purpose
              </p>
           
            </div>

            {/* Program Overview */}
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Program Overview
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                {event.programOverview}
              </p>
            </div>

            {/* Session Proceedings */}
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Session Proceedings
              </h2>
              <ul className="mt-6 space-y-3">
                {event.sessionProceedings.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                  >
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feedback Session */}
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Feedback Session
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                {event.feedbackSession}
              </p>
            </div>

            {/* Valediction */}
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Valediction
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                {event.valedictionSession}
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/Insights"
              className="inline-flex items-center justify-center rounded-full bg-green-600 px-7 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-green-700"
            >
              Back to Reports
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventReport;