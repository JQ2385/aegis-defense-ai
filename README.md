const scenarios = {
  normal: {
    title: 'Normal',
    risk: 22,
    armor: 82,
    signature: 74,
    entangle: 69,
    threat: 'Nominal',
    network: 0.18,
    health: 98,
    control: 'local',
    alert: 'Systems stable. Local control is performing within expected thresholds.'
  },
  attack: {
    title: 'Heavy attack',
    risk: 64,
    armor: 58,
    signature: 63,
    entangle: 72,
    threat: 'Elevated',
    network: 0.42,
    health: 83,
    control: 'guarded',
    alert: 'Attack pressure detected. Defensive layers are compensating at reduced efficiency.'
  },
  network: {
    title: 'Network drop',
    risk: 41,
    armor: 76,
    signature: 71,
    entangle: 80,
    threat: 'Intermittent',
    network: 0.76,
    health: 76,
    control: 'isolated',
    alert: 'Network links degraded. Local loop is taking over and isolating cloud-dependent decisions.'
  }
};

const modeProfiles = {
  local: {
    label: 'Local',
    note: 'Fully onboard',
    health: 100,
    network: 'None',
    riskBoost: 0,
    armorBoost: 4,
    signatureBoost: 5,
    entangleBoost: 3,
    safeColor: 'var(--safe)'
  },
  guarded: {
    label: 'Guarded',
    note: 'Hybrid monitoring',
    health: 92,
    network: 'Limited',
    riskBoost: 8,
    armorBoost: 8,
    signatureBoost: 8,
    entangleBoost: 10,
    safeColor: 'var(--warn)'
  },
  isolated: {
    label: 'Isolated',
    note: 'Offline essentials only',
    health: 88,
    network: 'Offline',
    riskBoost: 6,
    armorBoost: 12,
    signatureBoost: 12,
    entangleBoost: 18,
    safeColor: 'var(--iso)'
  },
  safe: {
    label: 'Safe Hold',
    note: 'Maximum defensive pause',
    health: 94,
    network: 'No cloud',
    riskBoost: -10,
    armorBoost: 18,
    signatureBoost: 16,
    entangleBoost: 20,
    safeColor: 'var(--safe)'
  }
};

const state = {
  time: 0,
  auto: false,
  mode: 'local',
  scenario: 'normal',
  nexusMode: 'local',
  risk: 22,
  armor: 82,
  signature: 74,
  entangle: 69,
  health: 98,
  networkReliance: 0.18,
  messageLog: [
    'AEGIS boot sequence complete.',
    'Local inference channel synchronized.',
    'Protection loops steady at baseline.'
  ]
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function logEvent(message) {
  state.messageLog.unshift(message);
  state.messageLog = state.messageLog.slice(0, 6);
  const log = document.getElementById('event-log');
  if (log) {
    log.innerHTML = state.messageLog.map((entry) => `• ${entry}`).join('<br>');
  }
}

function updateClock() {
  const clock = document.getElementById('clock');
  if (clock) {
    clock.textContent = `t = ${state.time.toFixed(1)}s`;
  }
}

function setBanner(id, text, active = true) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('active', active);
  const detail = document.getElementById(`${id.replace('-box', '')}-detail`)
    || document.getElementById(id.replace('box', 'detail'));
  if (detail) {
    detail.textContent = text;
  }
}

function renderNodeList() {
  const nodeList = document.getElementById('node-list');
  if (!nodeList) return;

  const nodes = [
    { name: 'Sentinel Mesh', meta: 'Threat intake', score: state.armor, label: state.armor > 70 ? 'safe' : 'warn', color: '#10b981' },
    { name: 'Control Sync', meta: 'Loop stability', score: state.health, label: state.health > 80 ? 'safe' : 'warn', color: '#0d9488' },
    { name: 'Signal Bloom', meta: 'Signature shaping', score: state.signature, label: state.signature > 65 ? 'iso' : 'warn', color: '#8b5cf6' },
    { name: 'Entangle Field', meta: 'Resilience', score: state.entangle, label: state.entangle > 70 ? 'ent' : 'warn', color: '#6366f1' }
  ];

  nodeList.innerHTML = nodes
    .map((node) => {
      const pct = clamp(node.score, 0, 100);
      const label = node.label === 'safe' ? 'Safe' : node.label === 'iso' ? 'Isolated' : node.label === 'ent' ? 'Entangled' : 'Watch';
      return `
        <div class="node">
          <div class="node-info">
            <div class="node-name">${node.name}</div>
            <div class="node-meta">${node.meta}</div>
            <div class="bar"><div style="width:${pct}%; background:${node.color};"></div></div>
          </div>
          <div class="node-right">
            <div class="score">${pct}</div>
            <span class="chip ${node.label}">${label}</span>
          </div>
        </div>
      `;
    })
    .join('');
}

function getStateSummary() {
  const risk = state.risk;
  const armor = state.armor;
  const sig = state.signature;
  const ent = state.entangle;
  const health = state.health;

  const status = risk >= 70 ? 'Critical' : risk >= 45 ? 'Elevated' : 'Stable';
  const posture = armor < 55 ? 'Reactive' : armor < 75 ? 'Adaptive' : 'Hardened';
  const signal = sig < 58 ? 'Diffused' : sig < 75 ? 'Tuned' : 'Locked';
  const ai = health < 75 ? 'Recovering' : 'Locked';

  document.getElementById('core-class').textContent = status;
  document.getElementById('core-posture').textContent = posture;
  document.getElementById('core-signal').textContent = signal;
  document.getElementById('core-ai').textContent = ai;

  document.getElementById('int-tempo').textContent = risk < 35 ? 'Smooth' : risk < 60 ? 'Adapting' : 'Under strain';
  document.getElementById('int-priority').textContent = state.nexusMode === 'hybrid' ? 'Hybrid inference' : state.nexusMode === 'edge' ? 'Edge assist' : 'Local inference';
  document.getElementById('int-sync').textContent = state.networkReliance > 0.5 ? 'Degraded' : 'Stable';
  document.getElementById('int-action').textContent = risk >= 70 ? 'Contain' : risk >= 45 ? 'Monitor' : 'Observe';
}

function renderMetrics() {
  const riskValue = clamp(state.risk, 0, 100);
  const unbreakValue = clamp(Math.round((state.armor + state.signature + state.entangle) / 3), 0, 100);
  const sigValue = clamp(state.signature, 0, 100);
  const entValue = clamp(state.entangle, 0, 100);

  const mRisk = document.getElementById('m-risk');
  const mUnbreak = document.getElementById('m-unbreak');
  const mSig = document.getElementById('m-sig');
  const mEnt = document.getElementById('m-ent');

  if (mRisk) {
    mRisk.textContent = `${riskValue}%`;
    mRisk.style.color = riskValue >= 70 ? 'var(--crit)' : riskValue >= 40 ? 'var(--warn)' : 'var(--safe)';
  }
  if (mUnbreak) mUnbreak.textContent = `${unbreakValue}%`;
  if (mSig) mSig.textContent = `${sigValue}%`;
  if (mEnt) mEnt.textContent = `${entValue}%`;
}

function setControlMode(mode) {
  state.mode = mode;
  const profile = modeProfiles[mode];

  const modeChips = document.querySelectorAll('.mode-chip[data-mode]');
  modeChips.forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.mode === mode);
  });

  document.getElementById('cc-mode').textContent = profile.label;
  document.getElementById('cc-mode-note').textContent = profile.note;
  document.getElementById('cc-health').textContent = `${state.health}%`;
  document.getElementById('cc-net').textContent = profile.network;

  state.armor = clamp(state.armor + profile.armorBoost, 0, 100);
  state.signature = clamp(state.signature + profile.signatureBoost, 0, 100);
  state.entangle = clamp(state.entangle + profile.entangleBoost, 0, 100);
  state.risk = clamp(state.risk + profile.riskBoost, 0, 100);
  state.health = clamp(profile.health + ((100 - state.networkReliance * 100) * 0.04), 0, 100);

  renderAll();
  logEvent(`${profile.label} control mode engaged.`);
}

function cycleControlMode() {
  const order = ['local', 'guarded', 'isolated', 'safe'];
  const currentIndex = order.indexOf(state.mode);
  const nextMode = order[(currentIndex + 1) % order.length];
  setControlMode(nextMode);
}

function setNexusMode(mode) {
  state.nexusMode = mode;
  const buttons = ['nx-local', 'nx-edge', 'nx-hybrid'];
  buttons.forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.toggle('active', id === `nx-${mode === 'local' ? 'local' : mode === 'edge' ? 'edge' : 'hybrid'}`);
  });

  const labels = {
    local: ['Local-first', 'Onboard', 'No cloud required'],
    edge: ['Edge assist', 'Local + sync', 'Distributed edge available'],
    hybrid: ['Hybrid', 'Cloud assisted', 'Adaptive external links']
  };

  const [modeText, pathText, noteText] = labels[mode] || labels.local;
  document.getElementById('nexus-mode').textContent = modeText;
  document.getElementById('nexus-path').textContent = pathText;
  document.getElementById('nexus-path-note').textContent = noteText;
  document.getElementById('nexus-link').textContent = state.networkReliance > 0.55 ? 'Lagged' : 'Stable';

  if (mode === 'hybrid') {
    state.networkReliance = clamp(state.networkReliance + 0.08, 0, 1);
  } else if (mode === 'local') {
    state.networkReliance = clamp(state.networkReliance - 0.12, 0, 1);
  }

  renderAll();
  logEvent(`Nexus shifted to ${modeText.toLowerCase()} mode.`);
}

function loadScenario(name) {
  const profile = scenarios[name];
  if (!profile) return;

  state.scenario = name;
  state.risk = profile.risk;
  state.armor = profile.armor;
  state.signature = profile.signature;
  state.entangle = profile.entangle;
  state.health = profile.health;
  state.networkReliance = profile.network;

  setControlMode(profile.control);
  setBanner('alert-box', profile.alert, true);
  setBanner('control-box', `Scenario: ${profile.title}.`, true);
  setBanner('sig-box', `Signature drift ${profile.signature}%`, true);
  setBanner('armor-box', `Armor layer ${profile.armor}%`, true);
  setBanner('entangle-box', `Entanglement ${profile.entangle}%`, true);

  renderAll();
  logEvent(`Scenario loaded: ${profile.title}.`);
}

function computeRiskProfile() {
  const basis = scenarios[state.scenario] || scenarios.normal;
  const modeBonus = modeProfiles[state.mode];
  const risk = clamp(basis.risk + (state.networkReliance * 30) - modeBonus.riskBoost + (state.nexusMode === 'hybrid' ? 4 : 0), 0, 100);
  const armor = clamp(basis.armor + modeBonus.armorBoost + (state.nexusMode === 'local' ? 7 : 0), 0, 100);
  const signature = clamp(basis.signature + modeBonus.signatureBoost + (state.nexusMode === 'edge' ? 6 : 0), 0, 100);
  const entangle = clamp(basis.entangle + modeBonus.entangleBoost + (state.nexusMode === 'hybrid' ? 10 : 0), 0, 100);

  state.risk = risk;
  state.armor = armor;
  state.signature = signature;
  state.entangle = entangle;
  state.health = clamp(100 - risk * 0.5 + armor * 0.2, 0, 100);
}

function renderVigil() {
  const rec = document.getElementById('vigil-rec');
  const reason = document.getElementById('vigil-reason');
  const horizon = document.getElementById('vigil-horizon');

  if (state.risk >= 70) {
    rec.textContent = 'Contain';
    reason.textContent = 'Threat spike detected. Reduce exposure and tighten boundaries.';
    horizon.textContent = 'Next 2 steps';
  } else if (state.risk >= 45) {
    rec.textContent = 'Monitor';
    reason.textContent = 'Adaptive tactics recommended while preserving resilience.';
    horizon.textContent = '1 step';
  } else {
    rec.textContent = 'Observe';
    reason.textContent = 'Current defense posture is within acceptable operating limits.';
    horizon.textContent = '3 steps';
  }
}

function ask(topic) {
  let message = '';
  switch (topic) {
    case 'status':
      message = `AEGIS is ${state.risk >= 70 ? 'under pressure' : 'operating nominally'} with risk at ${state.risk}%, armor at ${state.armor}%, and network reliance at ${(state.networkReliance * 100).toFixed(0)}%.`;
      break;
    case 'control':
      message = `Control mode is ${modeProfiles[state.mode].label}. The loop is ${state.health >= 85 ? 'stable' : 'recovering'} and the system is ${state.networkReliance > 0.5 ? 'reserving offline control' : 'running in connected mode'}.`;
      break;
    case 'risk':
      message = `Terminal risk sits at ${state.risk}%. The current protective posture is ${state.armor >= 70 ? 'strong' : 'moderate'}, and the edge intelligence is compensating for environment stress.`;
      break;
    case 'signature':
      message = `Signature shaping is ${state.signature}%. The system is ${state.signature >= 70 ? 'hard to classify' : 'visible but manageable'} under the current scenario.`;
      break;
    case 'armor':
      message = `Armor integrity is ${state.armor}%. Defensive barrier efficiency is ${state.armor >= 75 ? 'durable' : 'degraded'} and should be tuned if attack pressure persists.`;
      break;
    case 'entangle':
      message = `Entanglement field holds at ${state.entangle}%. This layer is ${state.entangle >= 75 ? 'stabilizing the defense network' : 'adapting to active motion in the threat field'}.`;
      break;
    case 'network':
      message = `Network reliance is ${(state.networkReliance * 100).toFixed(0)}%. AEGIS is operating ${state.networkReliance > 0.5 ? 'with degraded external reach and resilient local autonomy' : 'with strong local continuity and manageable external dependence'}.`;
      break;
    case 'what':
      message = 'AEGIS offers adaptive defense posture, live system advisory, edge intelligence, local autonomy, and resilient network isolation for mission-critical environments.';
      break;
    default:
      message = 'I am listening. Request current status, risk, control mode, armor, signature, or network resilience.';
  }

  const answerBox = document.getElementById('answer-text');
  if (answerBox) answerBox.textContent = message;
  logEvent(`User queried: ${topic}.`);
}

function vigilLive(topic) {
  let response = '';
  const rec = state.risk >= 70 ? 'Contain and isolate' : state.risk >= 45 ? 'Monitor and reinforce' : 'Maintain and observe';

  switch (topic) {
    case 'status':
      response = `AEGIS status is ${state.risk >= 70 ? 'critical but controlled' : 'stable and adaptive'}. Risk remains at ${state.risk}% with ${state.health}% operational integrity.`;
      break;
    case 'risk':
      response = `Threat pressure is ${state.risk >= 70 ? 'high' : 'moderate'}. The current defense posture is protecting the system while the AI recommends ${rec.toLowerCase()}.`;
      break;
    case 'control':
      response = `Control mode is ${modeProfiles[state.mode].label}. Local loops are ${state.networkReliance > 0.5 ? 'preferentially isolated' : 'continuing in coordinated mode'}.`;
      break;
    case 'armor':
      response = `Armor remains at ${state.armor}%. ${state.armor >= 75 ? 'Barrier integrity is high.' : 'Barrier integrity is moderate and should be reinforced.'}`;
      break;
    case 'signature':
      response = `Signature shaping is ${state.signature}%. The trace footprint is ${state.signature >= 70 ? 'hardened' : 'still observable'} under the active scenario.`;
      break;
    case 'advice':
      response = `${rec}. Increase local autonomy, keep cloud dependency low, and prioritize the entanglement field before network transitions.`;
      break;
    default:
      response = 'Vigil is aligned with the current operating state. No immediate emergency action required.';
  }

  const text = document.getElementById('vigil-live-text');
  if (text) text.textContent = response;

  const status = document.getElementById('vigil-status');
  if (status) status.textContent = state.risk >= 70 ? 'Under watch' : 'Online';

  renderVigil();
  logEvent(`Vigil advisory: ${topic}.`);
}

function applyVigilAdvice() {
  const before = { armor: state.armor, signature: state.signature, entangle: state.entangle, risk: state.risk };
  state.armor = clamp(state.armor + 6, 0, 100);
  state.signature = clamp(state.signature + 7, 0, 100);
  state.entangle = clamp(state.entangle + 8, 0, 100);
  state.risk = clamp(state.risk - 8, 0, 100);

  const result = `Vigil applied posture update: armor ${before.armor}→${state.armor}, signature ${before.signature}→${state.signature}, entangle ${before.entangle}→${state.entangle}, risk ${before.risk}→${state.risk}.`;

  const text = document.getElementById('vigil-live-text');
  if (text) text.textContent = result;
  logEvent('Vigil advice applied.');
  renderAll();
}

function runStep() {
  state.time += 1.2;
  const drift = state.risk >= 60 ? 2.5 : 1.3;
  state.risk = clamp(state.risk + drift * (state.networkReliance > 0.5 ? 1.2 : 0.8) - (state.mode === 'safe' ? 3 : 1.5), 0, 100);
  state.armor = clamp(state.armor + (state.mode === 'isolated' ? 1.2 : 0.4), 0, 100);
  state.signature = clamp(state.signature + 0.7, 0, 100);
  state.entangle = clamp(state.entangle + (state.mode === 'safe' ? 1.8 : 0.9), 0, 100);
  state.health = clamp(state.health - (state.risk > 55 ? 1.5 : 0.6), 0, 100);

  if (state.risk > 80) {
    setBanner('alert-box', 'Circuit Breaker engaged — response path is rebalancing the threat surface.', true);
  } else {
    setBanner('alert-box', 'No critical breach — defense posture remains adaptive.', true);
  }

  renderAll();
  logEvent('Simulation step executed.');
}

function runDemo() {
  const sequence = ['normal', 'attack', 'network', 'normal'];
  let index = 0;
  const loop = () => {
    loadScenario(sequence[index]);
    index = (index + 1) % sequence.length;
  };
  loop();
  setInterval(loop, 3200);
}

function toggleAuto() {
  state.auto = !state.auto;
  const label = document.getElementById('auto-label');
  if (label) label.textContent = state.auto ? 'On' : 'Off';

  if (state.auto) {
    logEvent('Auto simulation enabled.');
    setInterval(() => {
      if (state.auto) {
        runStep();
      }
    }, 2000);
  }
}

function renderAll() {
  updateClock();
  renderMetrics();
  renderNodeList();
  renderVigil();
  getStateSummary();

  const mode = modeProfiles[state.mode];
  document.getElementById('cc-mode').textContent = mode.label;
  document.getElementById('cc-mode-note').textContent = mode.note;
  document.getElementById('cc-health').textContent = `${Math.round(state.health)}%`;
  document.getElementById('cc-net').textContent = mode.network;

  const controlMessage = state.risk > 75
    ? 'Threat surface elevated; isolate and tighten reply pathways.'
    : state.risk > 45
      ? 'Adaptive defense active; keep control loops local.'
      : 'Nominal response path; maintain resilience posture.';
  document.getElementById('control-detail').textContent = controlMessage;
  document.getElementById('sig-detail').textContent = `Signature ${state.signature}%`;
  document.getElementById('armor-detail').textContent = `Armor ${state.armor}%`;
  document.getElementById('entangle-detail').textContent = `Entanglement ${state.entangle}%`;
  document.getElementById('alert-detail').textContent = state.risk > 75 ? 'High-risk breach vector in view.' : 'No active breach detected.';

  document.getElementById('vigil-status').textContent = state.risk >= 70 ? 'Under watch' : 'Online';
}

window.addEventListener('DOMContentLoaded', () => {
  setBanner('alert-box', 'No active breach detected.', true);
  setBanner('control-box', 'Scenario: Normal. Systems stable.', true);
  setBanner('sig-box', 'Signature 74%', true);
  setBanner('armor-box', 'Armor 82%', true);
  setBanner('entangle-box', 'Entanglement 69%', true);
  renderAll();
  logEvent('AEGIS operational monitor is ready.');
});
