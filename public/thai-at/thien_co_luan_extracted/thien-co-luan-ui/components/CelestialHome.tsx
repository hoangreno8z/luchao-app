import Image from "next/image";

const systems = [
  ["Kinh Dịch","Lục Hào Cổ Bốc","/images/kinh-dich.webp","yang"],
  ["Tử Vi","Chiêm Tinh Vận Mệnh","/images/tu-vi.webp","star"],
  ["Bát Tự","Tứ Trụ Can Chi","/images/bat-tu.webp","five"],
  ["Thái Ất","Thiên Thời Quốc Vận","/images/thai-at.webp","orbit"],
];

export default function CelestialHome() {
  return (
    <main className="celestial-page">
      <div className="stars"/><div className="nebula nebula-a"/><div className="nebula nebula-b"/>
      <div className="orbit orbit-1"/><div className="orbit orbit-2"/>

      <section className="hero">
        <div className="hero-emblem">
          <div className="emblem-ring ring-outer"/><div className="emblem-ring ring-inner"/>
          <div className="trigram trigram-top">☰</div>
          <div className="taiji">☯</div>
          <div className="trigram trigram-bottom">☷</div>
        </div>
        <p className="eyebrow">THIÊN • NHÂN • ĐỊA • BIẾN</p>
        <h1>Thiên Cơ Luân</h1>
        <p className="author">NGUYỄN HUY HOÀNG</p>
        <p className="hero-subtitle">Kinh Dịch <span>•</span> Tử Vi <span>•</span> Bát Tự <span>•</span> Thái Ất</p>
        <button className="hero-button">KHÁM PHÁ THIÊN CƠ <span>→</span></button>
      </section>

      <section className="systems">
        {systems.map(([title, subtitle, image, kind]) => (
          <article className={`system-card ${kind}`} key={title}>
            <div className="system-art">
              <div className="art-glow"/>
              <Image src={image} alt={title} fill sizes="(max-width:700px) 88vw,25vw" className="system-image"/>
            </div>
            <div className="system-info">
              <h2>{title}</h2><p>{subtitle}</p><span className="system-arrow">↗</span>
            </div>
          </article>
        ))}
      </section>

      <section className="philosophy"><span/><p>ỨNG DỤNG TRI THỨC CỔ — KIẾN TẠO GIÁ TRỊ HIỆN ĐẠI</p><span/></section>

      <footer className="footer">
        <div><strong>HOÀNG</strong><small>Kinh Dịch • Tử Vi • Bát Tự • Thái Ất</small></div>
        <a href="https://zalo.me/0933116860">Zalo: 0933 116 860</a>
      </footer>
    </main>
  );
}
