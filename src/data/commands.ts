export function handleCommand(command: string): string[] {
  const aliases: Record<string, string> = {
    cv: "cat resume.pdf",
    about: "cat about.txt",
    "download cv": "cv download",
    cls: "clear",
  };

  const resolved = aliases[command] || command;

  switch (resolved) {
    case "help":
      return [
        "Available commands:",
        " - help: Show this help message",
        " - ls: List files",
        " - whoami: Tells about me",
        " - cat about.txt: View about info",
        " - cat resume.pdf: Open resume preview",
        " - cv: Alias for resume",
        " - cv download: Download resume as PDF",
        // " - cv print: Open resume in print mode",
        " - projects: List my work",
        " - contact: Show contact information",
        " - blog: Show blog topics",
        " - clear: Clear the terminal",
      ];

    case "ls":
      return ["about.txt  resume.pdf"];
    case "cat resume.pdf":
      window.open(
        "https://drive.google.com/file/d/1Dt4RGr5cAAQg0C7yMHYcR9cOxkvmly5f/view?usp=sharing",
        "_blank"
      );
      return ["Opening resume in preview mode..."];
    case "cv download": {
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Ajeet_Singh_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return ['📥 Downloading resume as "Ajeet_Singh_Resume.pdf"...'];
    }
    // case "cv print": {
    //   window.open("/print-resume.html", "_blank");
    //   return ["🖨️ Opening resume in print window..."];
    // }

    case "projects":
      return [
        "📘 Granth Gyaan (Next.js 14, Tailwind, Vercel)",
        "→ https://granth-gyaan.vercel.app/",
        "Digital platform for Hindu religious texts with real-time full-text search.",

        "💊 HealthVibe (Python, Node.js, MongoDB)",
        "Health recommendation engine with AI-based personalization.",

        "💬 Realtime Chat (React, Node.js, Socket.io)",
        "End-to-end encrypted chat app with JWT auth and <100ms latency.",
      ];
    case "cat about.txt":
    case "whoami":
      return [
        "Ajeet Singh",
        "B.Tech CSE @ Lovely Professional University (CGPA: 8.95)",
        "Strong in Backend, Algorithms, and Competitive Programming.",
        "Skilled in Java, TypeScript, React, Node.js, Django, MongoDB, etc.",
        "Loves building real-time apps and exploring scalable architecture.",
        "LinkedIn: linkedin.com/in/ajeetsinghprayag/",
        "GitHub: github.com/tech-fear",
      ];

    case "contact":
      return [
        "📧 Email: ajeet.personal.mail@gmail.com",
        "🔗 LinkedIn: https://linkedin.com/in/ajeetsinghprayag",
        "💻 GitHub: https://github.com/tech-fear",
        "🔎 LeetCode: https://leetcode.com/u/tech_fear_404/",
        "🏆 Codeforces: https://codeforces.com/profile/onlineresearch634",
      ];

    case "blog":
      return [
        "📝 Latest blog content (coming soon):",
        "1. Building a Dev Portfolio as a Web CLI",
        "2. Deep Dive into Realtime Chat with WebSockets & JWT",
        "3. Scaling Next.js Projects for Speed & Readability",
        "🚀 Blog will be live soon at: https://ajeet.dev/blog (placeholder)",
      ];

    case "clear":
      return ["__CLEAR__"];
    case "nuke":
      return [
        "☢️  Initiating self-destruct sequence...",
        "Deleting portfolio in 3...",
        "2...",
        "1...",
        "💥 Boom! Just kidding 😄",
      ];
    case "sudo rm -rf /":
      return ["🛑 Nice try. You don’t have sudo privileges here."];

    default:
      return [`Command not found: ${resolved}`];
  }
}
