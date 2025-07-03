export async function typeEffect(
  term: any,
  lines: string[],
  delay = 20
): Promise<void> {
  for (const line of lines) {
    for (const char of line) {
      term.write(char);
      await new Promise((r) => setTimeout(r, delay));
    }
    term.write("\r\n");
  }
}
