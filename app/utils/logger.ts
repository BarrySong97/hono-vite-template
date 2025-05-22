import logo from "asciiart-logo";

export function printLogo() {
  console.log(
    logo({
      name: "HONO VITE",
      font: "ANSI Shadow",
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: "grey",
      logoColor: "bold-green",
      textColor: "green",
    }).render()
  );
}
export function printVersion() {
  console.log(
    logo({
      name: "HONO VITE",
      font: "ANSI Shadow",
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: "grey",
      logoColor: "bold-green",
      textColor: "green",
    })
      .emptyLine()
      .left(`port:3000`)
      .left(`hono v${import.meta.env.HONO_VERSION}`)
      .left(`vite v${import.meta.env.VITE_VERSION}`)
      .emptyLine()
      .render()
  );
}
