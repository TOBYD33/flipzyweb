export function Footer() {
  return (
    <footer className="border-t border-flipzy-ink/10 bg-white/80">
      <div className="section-shell flex flex-col gap-4 py-8 text-sm text-flipzy-ink/65 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Flipzy. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-flipzy-purple">
            @flipzyapp
          </a>
          <a href="#" className="hover:text-flipzy-purple">
            X
          </a>
          <a href="#" className="hover:text-flipzy-purple">
            Instagram
          </a>
          <a href="#" className="hover:text-flipzy-purple">
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}
