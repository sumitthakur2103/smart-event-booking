const Footer = () => {
  return (
    <footer className="border-t border-cyan-300/20 bg-[#05050a] shadow-[0_-18px_70px_rgba(34,211,238,0.08)]">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
        Built with <span style={{ color: "red" }}>❤</span> by{" "}
        <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text font-semibold text-transparent drop-shadow-[0_0_14px_rgba(168,85,247,0.4)]">
          Sumit Thakur
        </span>
      </div>
    </footer>
  );
};

export default Footer;
