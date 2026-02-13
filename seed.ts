import { prisma } from "./db";

const articles = [
  {
    title: "The Art of Simplicity in Software Design",
    content: `There's a common misconception that complex problems require complex solutions. In reality, the best software is often the simplest. When we strip away unnecessary abstractions, remove redundant layers, and focus on what truly matters, we end up with systems that are easier to understand, maintain, and extend.

Think about the tools you use every day. The ones that feel effortless — that disappear into your workflow — are almost always built on simple foundations. They don't try to do everything. They do one thing exceptionally well.

The next time you sit down to architect a system, resist the urge to over-engineer. Start with the smallest possible solution that works. Add complexity only when the problem demands it, not when your instincts suggest it. Simplicity isn't a shortcut. It's a discipline.`,
  },
  {
    title: "Why Every Developer Should Write",
    content: `Writing isn't just for authors and journalists. For developers, writing is one of the most underrated skills you can cultivate. It sharpens your thinking, forces you to organize ideas, and helps you communicate more effectively with your team.

When you write about a technical concept, you quickly discover the gaps in your understanding. You can't hide behind vague hand-waving when the words are on the page. Writing demands precision — the same precision that makes great code.

Start a blog. Write documentation. Draft RFCs. Explain your pull requests in detail. Over time, you'll notice something remarkable: your ability to reason about problems will improve. Your code will become clearer. And the people you work with will understand your ideas faster.

The best engineers I know are also excellent writers. That's not a coincidence.`,
  },
  {
    title: "Lessons from Building My First Startup",
    content: `Two years ago, I left a comfortable job to build something of my own. I had a vision, a rough prototype, and the naive confidence that comes with not knowing what you don't know. Here's what I learned along the way.

First, speed matters more than perfection. The market doesn't care about your beautiful architecture. It cares about whether your product solves a real problem. Ship early, get feedback, iterate.

Second, talk to your users constantly. Not through surveys or analytics dashboards — through real conversations. The insights you gain from a 15-minute call with a frustrated user are worth more than a month of guessing.

Third, take care of yourself. Burnout is real, and it doesn't make you more productive. Sleep well, exercise, and step away from the screen regularly. The startup will still be there tomorrow.

Building something from nothing is one of the most rewarding things you can do. But it's also one of the hardest. Go in with your eyes open.`,
  },
  {
    title: "The Case for Boring Technology",
    content: `Every few months, a new framework appears that promises to change everything. It's faster, more elegant, more developer-friendly. The demos look incredible. The Twitter hype is real. And then, six months later, half the ecosystem has moved on to the next shiny thing.

There's immense value in choosing boring technology. PostgreSQL has been around for decades. It's battle-tested, well-documented, and understood by millions of developers. The same is true for tools like Linux, Nginx, and plain SQL.

Boring technology lets you focus on your actual product instead of fighting your tools. It means you can hire developers who already know the stack. It means when something breaks at 3 AM, there's a Stack Overflow answer waiting for you.

Innovation has its place. But for most projects, the biggest risk isn't using outdated tech — it's using unproven tech in production. Choose boring. Ship faster. Sleep better.`,
  },
  {
    title: "Designing for the Long Run",
    content: `Good design isn't about trends. It's about creating something that works well today and will still work well five years from now. This applies to visual design, system architecture, and everything in between.

When you design for the long run, you prioritize clarity over cleverness. You choose readable fonts, generous whitespace, and intuitive navigation over flashy animations and bold experiments. You build systems with clear boundaries, sensible defaults, and room to evolve.

The best products in the world share a common trait: restraint. Apple's hardware is defined as much by what's removed as by what's included. Dieter Rams built his career on the principle that good design is as little design as possible.

The next time you're tempted to add one more feature, one more gradient, or one more microservice — pause. Ask yourself: will this still make sense in a year? If the answer isn't a clear yes, leave it out.`,
  },
  {
    title: "What I Learned from Reading 50 Books This Year",
    content: `At the start of the year, I set a goal to read 50 books. Not to hit a number, but to build a habit of deep, focused learning in a world that rewards shallow skimming.

Here are the three biggest takeaways from the experience.

First, variety matters. I read fiction, history, science, philosophy, and business. Each genre exercised a different part of my thinking. Fiction built empathy. History offered perspective. Science sharpened my reasoning. The combination was far more valuable than going deep into a single category.

Second, taking notes changes everything. I started keeping a simple journal where I wrote down one key idea from each book. Months later, I can still recall those ideas clearly. Without notes, most books would have faded into a vague memory.

Third, reading is compounding. The more you read, the faster you read, and the more connections you see between ideas. Book 40 was infinitely richer than book 5, because I had 35 books of context to draw from.

If you're looking for one habit that will make you a better thinker, communicator, and human — start reading. Not articles. Not tweets. Books.`,
  },
];

async function seed() {
  console.log("Seeding 6 articles...\n");

  const userId = "user_39aWRKAaa5AB1hEJWrdrcbjRRO2";

  for (const article of articles) {
    const post = await prisma.post.create({
      data: {
        title: article.title,
        content: article.content,
        userId,
      },
    });
    console.log(`  Created: "${post.title}"`);
  }

  console.log("\nDone! 6 articles seeded.");
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
