import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { EVENTS } from "@/lib/events";


const News = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <section className="py-16 bg-slate-50 dark:bg-zinc-950">
          <div className="container mx-auto px-4 text-center">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                AZENTRA GLOBAL <span className="text-green-600">EVENTS</span>
              </h1>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em] mt-3">
                Explore full event reports including purpose, program overview, proceedings, feedback, valediction, images and budget.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="container mx-auto px-4 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {EVENTS.map((event, idx) => (
              <Reveal key={event.id} delay={idx * 0.1}>
                <div className="group rounded-[2rem] overflow-hidden border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm transition hover:shadow-2xl">
                  <div className="aspect-[16/14] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.35em]">
                      {event.category}
                    </span>
                    <h2 className="mt-4 text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      {event.title}
                    </h2>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                      {event.date} • {event.location}
                    </p>
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {event.programOverview}
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button onClick={() => navigate(`/Insights/${event.id}`)} className="w-full sm:w-auto">
                        View In Detail
                      </Button>
                      {/* <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Budget: {event.budget}
                      </div> */}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>


      <Footer />
    </div>
  );
};

export default News;