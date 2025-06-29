import { Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-muted pt-6 text-sm text-textSecondary text-center">
      <p>
        NGINXDeck is an open source project created to simplify NGINX configuration management.
      </p>
      <p className="mt-1">
        Developed by Francisco Castagnaro, Jeronimo Ortíz and Tomás Cardozo.
      </p>
      <p className="mt-1 flex justify-center gap-4 items-center text-accent">
        <a
          href="https://github.com/FranciscoCastagnaro/NGINXDeck"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline"
        >
          <Github className="w-4 h-4" />
          View on GitHub
        </a>
        <span>•</span>
        <a
          href="mailto:francastagnaro@hotmail.com"
          className="flex items-center gap-1 hover:underline"
        >
          <Mail className="w-4 h-4" />
          Contact us
        </a>
      </p>
      <p className="mt-1 text-xs text-muted-foreground">© 2025 NGINXDeck</p>
    </footer>
  );
}
