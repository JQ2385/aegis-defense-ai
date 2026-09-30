:root {
  --bg: #faf8f6;
  --surface: #ffffff;
  --ink: #1a1625;
  --soft: #6b6578;
  --line: #e8e4ef;
  --wing-l: #c4b5fd;
  --wing-r: #f9a8d4;
  --accent: #8b5cf6;
  --safe: #10b981;
  --warn: #f59e0b;
  --crit: #ef4444;
  --iso: #a78bfa;
  --mig: #ec4899;
  --entangle: #6366f1;
  --control: #0d9488;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Outfit', system-ui, sans-serif;
  background: var(--bg);
  color: var(--ink);
  min-height: 100vh;
  line-height: 1.5;
}

.bg-wing {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 15% 20%, rgba(196,181,253,0.16), transparent),
    radial-gradient(ellipse 55% 45% at 85% 25%, rgba(249,168,212,0.14), transparent),
    radial-gradient(ellipse 40% 30% at 50% 95%, rgba(13,148,136,0.06), transparent);
}

.page {
  position: relative;
  z-index: 1;
  max-width: 1080px;
  margin: 0 auto;
  padding: 2.4rem 1.7rem 4rem;
}

header {
  text-align: center;
  margin-bottom: 2.2rem;
}

.mark {
  width: 54px;
  height: 54px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--wing-l), var(--wing-r));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.45rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 8px 28px rgba(139,92,246,0.22);
}

header h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.3rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.tagline {
  font-size: 0.92rem;
  color: var(--soft);
  margin-top: 0.3rem;
}

.offer {
  max-width: 560px;
  margin: 1.1rem auto 0;
  font-size: 0.9rem;
  color: var(--soft);
  line-height: 1.6;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 0.55rem;
  flex-wrap: wrap;
  margin: 1.5rem 0 1rem;
}

button {
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

button.primary {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border: none;
  color: #fff;
  box-shadow: 0 4px 16px rgba(139,92,246,0.28);
}

button.control-btn {
  background: linear-gradient(135deg, #0d9488, #14b8a6);
  border: none;
  color: #fff;
  box-shadow: 0 4px 16px rgba(13,148,136,0.25);
}

.clock {
  text-align: center;
  font-size: 0.74rem;
  color: var(--soft);
  margin-bottom: 1.3rem;
  letter-spacing: 0.04em;
}

.banner {
  display: none;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0.75rem 1.1rem;
  margin-bottom: 0.6rem;
  font-size: 0.84rem;
  align-items: center;
  gap: 0.55rem;
}

.banner.active {
  display: flex;
}

.banner.sig { border-left: 3px solid var(--mig); }
.banner.armor { border-left: 3px solid var(--iso); }
.banner.entangle { border-left: 3px solid var(--entangle); }
.banner.control { border-left: 3px solid var(--control); }
.banner.crit {
  border-left: 3px solid var(--crit);
  background: #fef2f2;
}

.control-center {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.4rem 1.5rem;
  margin-bottom: 1.5rem;
}

.control-center h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.25rem;
}

.control-center .subhead {
  text-align: center;
  font-size: 0.8rem;
  color: var(--soft);
  margin-bottom: 1.1rem;
}

.cc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem;
}

.cc-card {
  background: #f8fafb;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 1rem 1.05rem;
  text-align: center;
}

.cc-card .cc-label {
  font-size: 0.68rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--soft);
  margin-bottom: 0.35rem;
}

.cc-card .cc-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--control);
}

.cc-card .cc-note {
  font-size: 0.72rem;
  color: var(--soft);
  margin-top: 0.25rem;
}

.cc-modes {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1.1rem;
}

.mode-chip {
  font-size: 0.72rem;
  font-weight: 500;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--soft);
  cursor: pointer;
}

.mode-chip.active {
  background: rgba(13,148,136,0.1);
  border-color: var(--control);
  color: var(--control);
}

.vigil-panel {
  border-color: #ddd6fe;
  background: linear-gradient(180deg, #faf5ff 0%, #fff 100%);
}

.nexus-panel {
  margin-bottom: 1.25rem;
  padding: 1.15rem 1.3rem;
  border-color: #c4b5fd;
  background: linear-gradient(180deg, #f5f3ff 0%, #fff 100%);
}

.ask {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.35rem 1.4rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.ask h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.ask .hint {
  font-size: 0.82rem;
  color: var(--soft);
  margin-bottom: 0.95rem;
}

.qs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 0.95rem;
}

.qs button {
  font-size: 0.72rem;
  padding: 0.36rem 0.75rem;
  background: #f5f3ff;
  border-color: #ddd6fe;
  color: #6d28d9;
}

.speak-main {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border: none;
  color: #fff;
  font-weight: 500;
  font-size: 0.84rem;
  cursor: pointer;
}

.pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  animation: softpulse 1.5s infinite;
}

@keyframes softpulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.reply {
  margin-top: 1rem;
  padding: 0.9rem 1.1rem;
  background: #faf5ff;
  border-radius: 12px;
  font-size: 0.86rem;
  text-align: left;
  min-height: 46px;
  border: 1px solid #ede9fe;
}

.reply .who {
  font-size: 0.64rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.06em;
  margin-bottom: 0.2rem;
}

.map {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.35rem 1.4rem;
  margin-bottom: 1.5rem;
}

.map h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.12rem;
  font-weight: 600;
  margin-bottom: 0.95rem;
  text-align: center;
}

.node {
  display: flex;
  align-items: center;
  gap: 0.95rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--line);
}

.node:last-child {
  border-bottom: none;
}

.node-info {
  flex: 1;
  min-width: 0;
}

.node-name {
  font-size: 0.84rem;
  font-weight: 500;
}

.node-meta {
  font-size: 0.68rem;
  color: var(--soft);
  margin-top: 0.06rem;
}

.bar {
  height: 4px;
  background: #f3f0f8;
  border-radius: 2px;
  margin-top: 0.32rem;
  overflow: hidden;
}

.bar > div {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s ease;
}

.node-right {
  text-align: right;
  min-width: 76px;
}

.score {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-weight: 600;
}

.chip {
  display: inline-block;
  font-size: 0.58rem;
  font-weight: 600;
  padding: 0.12rem 0.45rem;
  border-radius: 999px;
  margin-top: 0.15rem;
  letter-spacing: 0.03em;
}

.chip.safe { background: #ecfdf5; color: var(--safe); }
.chip.warn { background: #fffbeb; color: var(--warn); }
.chip.iso { background: #f5f3ff; color: var(--iso); }
.chip.mig { background: #fdf2f8; color: var(--mig); }
.chip.ent { background: #eef2ff; color: var(--entangle); }

.core {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.95rem;
  margin-bottom: 1.5rem;
}

.core-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 1.15rem 1.25rem;
}

.core-card h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--line);
}

.stat:last-child {
  border-bottom: none;
}

.stat span:last-child {
  font-weight: 500;
  color: var(--accent);
}

.footer {
  text-align: center;
  padding: 1.5rem 1.3rem;
  background: linear-gradient(180deg, #faf5ff 0%, #f0fdfa 100%);
  border: 1px solid #e9d5ff;
  border-radius: 20px;
}

.footer h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.footer p {
  font-size: 0.86rem;
  color: var(--soft);
  max-width: 540px;
  margin: 0 auto 0.85rem;
  line-height: 1.6;
}

.ideas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
}

.idea {
  font-size: 0.68rem;
  font-weight: 500;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #e9d5ff;
  color: #7c3aed;
}

.log {
  font-size: 0.66rem;
  color: var(--soft);
  max-height: 70px;
  overflow-y: auto;
  margin-top: 0.65rem;
  text-align: left;
}

@media (max-width: 720px) {
  .metrics {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .cc-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .core {
    grid-template-columns: 1fr;
  }
}
