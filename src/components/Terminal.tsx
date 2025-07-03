import React, { useEffect, useRef } from "react";
import { Terminal as XTerm } from "xterm";
import "xterm/css/xterm.css";
import { handleCommand } from "../data/commands";
import { typeEffect } from "../utils/typeEffect";

const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const term = useRef<XTerm>();

  function rewriteCurrentLine(term: XTerm, input: string) {
    term.write("\x1b[2K\r"); // Clear current line
    term.write(`ajeet@cli:~$ ${input}`);
  }

  useEffect(() => {
    if (!term.current) {
      term.current = new XTerm({
        cursorStyle: "bar",
        cursorBlink: true,
        theme: {
          background: "#000000",
          foreground: "#00ff00",
        },
      });

      term.current.open(terminalRef.current!);

      const prompt = () => term.current?.write(`\r\najeet@cli:~$ `);

      (async () => {
        await typeEffect(term.current, [
          "Welcome to My Portfolio CLI 🚀",
          "Type 'help' to get started",
          "",
        ]);
        prompt();
        term.current?.focus();
      })();

      let input = "";
      const history: string[] = [];
      let historyIndex = -1;

      const commands = [
        "help",
        "ls",
        "clear",
        "projects",
        "cat about.txt",
        "cat resume.pdf",
        "cv",
        "about",
        "whoami",
        "contact",
        "blog",
      ];

      term.current.onKey(({ key, domEvent }) => {
        const printable =
          !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

        if (domEvent.key === "Enter") {
          term.current?.write("\r\n");
          const trimmed = input.trim();

          if (trimmed) {
            history.push(trimmed);
            historyIndex = history.length;

            const output = handleCommand(trimmed);
            if (output.includes("__CLEAR__")) {
              term.current?.clear();
            } else {
              output.forEach((line) => term.current?.writeln(line));
            }
          }

          input = "";
          prompt();
        } else if (domEvent.key === "Backspace") {
          if (input.length > 0) {
            term.current?.write("\b \b");
            input = input.slice(0, -1);
          }
        } else if (domEvent.key === "ArrowUp") {
          if (historyIndex > 0) {
            historyIndex--;
            input = history[historyIndex];
            rewriteCurrentLine(term.current!, input);
          }
        } else if (domEvent.key === "ArrowDown") {
          if (historyIndex < history.length - 1) {
            historyIndex++;
            input = history[historyIndex];
          } else {
            historyIndex = history.length;
            input = "";
          }
          rewriteCurrentLine(term.current!, input);
        } else if (domEvent.key === "Tab") {
          domEvent.preventDefault();
          const match = commands.find((cmd) => cmd.startsWith(input));
          if (match) {
            const rest = match.slice(input.length);
            term.current?.write(rest);
            input += rest;
          }
        } else if (printable) {
          term.current?.write(key);
          input += key;
        }
      });
    }
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
    />
  );
};

export default Terminal;
