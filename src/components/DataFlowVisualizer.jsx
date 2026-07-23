import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  Plus, 
  RefreshCw, 
  Zap, 
  Database, 
  Cpu, 
  Globe, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  AlertCircle,
  SlidersHorizontal,
  Trash2,
  Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const INITIAL_NODES = [
  {
    id: 'node_1',
    title: 'API Event Stream',
    type: 'input',
    icon: Globe,
    x: 80,
    y: 120,
    status: 'active',
    rate: '1,420 req/s',
    color: '#38bdf8',
  },
  {
    id: 'node_2',
    title: 'Realtime Sanitizer',
    type: 'processor',
    icon: Cpu,
    x: 360,
    y: 80,
    status: 'active',
    rate: '0.4ms latency',
    color: '#6366f1',
  },
  {
    id: 'node_3',
    title: 'AI Pattern Matcher',
    type: 'processor',
    icon: Sparkles,
    x: 360,
    y: 260,
    status: 'active',
    rate: '99.2% confidence',
    color: '#ec4899',
  },
  {
    id: 'node_4',
    title: 'PostgreSQL Vault',
    type: 'output',
    icon: Database,
    x: 640,
    y: 170,
    status: 'active',
    rate: '14.8 GB sync',
    color: '#10b981',
  },
];

const INITIAL_CONNECTIONS = [
  { from: 'node_1', to: 'node_2' },
  { from: 'node_1', to: 'node_3' },
  { from: 'node_2', to: 'node_4' },
  { from: 'node_3', to: 'node_4' },
];

export default function DataFlowVisualizer() {
  const { addToast } = useAuth();
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [connections, setConnections] = useState(INITIAL_CONNECTIONS);
  const [isRunning, setIsRunning] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedNode, setSelectedNode] = useState(INITIAL_NODES[0]);
  const [logs, setLogs] = useState([
    { id: 1, text: 'Flow Pipeline initialized successfully.', time: '18:50:02', type: 'info' },
    { id: 2, text: 'Node API Event Stream connected. Throughput: 1,420 req/s', time: '18:50:04', type: 'success' },
    { id: 3, text: 'AI Pattern Matcher processed 45,000 telemetry payloads.', time: '18:50:08', type: 'info' },
  ]);

  // Simulated live event logger
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      const events = [
        `Packet batch #${Math.floor(Math.random() * 9000 + 1000)} verified on ${randomNode.title}.`,
        `Throughput pulse stable: ${randomNode.rate}`,
        `Optimized node connection latency: ${(Math.random() * 2 + 0.1).toFixed(2)}ms`,
      ];
      const newLog = {
        id: Date.now(),
        text: events[Math.floor(Math.random() * events.length)],
        time: new Date().toLocaleTimeString(),
        type: 'info',
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 15)]);
    }, 2500 / speed);

    return () => clearInterval(interval);
  }, [isRunning, speed, nodes]);

  // Trigger test pipeline run with Confetti celebration
  const handleTriggerPipeline = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#ec4899', '#38bdf8', '#10b981'],
    });

    addToast('Pipeline execution test successful! All 4 nodes returned 200 OK.', 'success');
    setLogs((prev) => [
      { id: Date.now(), text: '⚡ MANUAL TEST RUN: 100% Data Packet Delivery Verified.', time: new Date().toLocaleTimeString(), type: 'success' },
      ...prev,
    ]);
  };

  const handleAddNode = () => {
    const types = [
      { name: 'GraphQL Gateway', type: 'input', icon: Globe, color: '#06b6d4' },
      { name: 'Vector Embedding ML', type: 'processor', icon: Sparkles, color: '#a855f7' },
      { name: 'Redis Cache Cluster', type: 'output', icon: Database, color: '#f59e0b' },
    ];
    const pick = types[Math.floor(Math.random() * types.length)];
    const newNode = {
      id: `node_${Date.now()}`,
      title: pick.name,
      type: pick.type,
      icon: pick.icon,
      x: Math.floor(Math.random() * 300 + 200),
      y: Math.floor(Math.random() * 200 + 100),
      status: 'active',
      rate: 'Live Stream',
      color: pick.color,
    };
    setNodes((prev) => [...prev, newNode]);
    // Connect to random existing node
    const target = nodes[Math.floor(Math.random() * nodes.length)];
    setConnections((prev) => [...prev, { from: target.id, to: newNode.id }]);
    addToast(`Added new node: ${newNode.title}`, 'success');
  };

  const handleDeleteNode = (id) => {
    if (nodes.length <= 2) {
      addToast('Flow requires at least 2 nodes.', 'warning');
      return;
    }
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setConnections((prev) => prev.filter((c) => c.from !== id && c.to !== id));
    if (selectedNode?.id === id) {
      setSelectedNode(nodes[0]);
    }
    addToast('Node removed from flow canvas.', 'info');
  };

  return (
    <div className="animate-fade-in">
      {/* Top Toolbar */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>DataFlow Studio</h2>
            <span className="badge badge-active">Live Engine Active</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Interactive node architecture & real-time telemetry visualizer
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Pause / Resume */}
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="btn-secondary"
            style={{ padding: '8px 14px' }}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            <span>{isRunning ? 'Pause Flow' : 'Resume Flow'}</span>
          </button>

          {/* Speed Selector */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-tertiary)', borderRadius: '10px', padding: '4px', border: '1px solid var(--border-color)' }}>
            {[1, 2, 4].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                style={{
                  background: speed === s ? 'var(--accent-primary)' : 'transparent',
                  color: speed === s ? '#fff' : 'var(--text-muted)',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Add Node Button */}
          <button onClick={handleAddNode} className="btn-secondary">
            <Plus size={16} /> Add Node
          </button>

          {/* Test Trigger */}
          <button onClick={handleTriggerPipeline} className="btn-primary">
            <Zap size={16} /> Run Execution
          </button>
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Interactive Visual Canvas */}
        <div
          className="glass-panel"
          style={{
            height: '520px',
            position: 'relative',
            overflow: 'hidden',
            background: 'radial-gradient(circle at 50% 50%, rgba(18, 21, 38, 0.6) 0%, rgba(10, 12, 22, 0.95) 100%)',
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            border: '1px solid var(--border-glow)',
          }}
        >
          {/* SVG Connections & Particle Pulses */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-primary)" />
                <stop offset="100%" stopColor="var(--accent-secondary)" />
              </linearGradient>
            </defs>

            {connections.map((conn, idx) => {
              const fromNode = nodes.find((n) => n.id === conn.from);
              const toNode = nodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const startX = fromNode.x + 110;
              const startY = fromNode.y + 45;
              const endX = toNode.x + 10;
              const endY = toNode.y + 45;

              // Cubic Bezier curve calculation
              const controlX1 = startX + (endX - startX) * 0.5;
              const controlX2 = startX + (endX - startX) * 0.5;
              const pathD = `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`;

              return (
                <g key={idx}>
                  {/* Connection Line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="rgba(147, 197, 253, 0.3)"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    style={{
                      animation: isRunning ? `dashFlow ${3 / speed}s linear infinite` : 'none',
                    }}
                  />
                  {/* Glowing Overlay Line */}
                  <path d={pathD} fill="none" stroke="url(#flowGrad)" strokeWidth="2" strokeOpacity="0.8" />
                </g>
              );
            })}
          </svg>

          {/* Interactive Nodes */}
          {nodes.map((node) => {
            const Icon = node.icon;
            const isSelected = selectedNode?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: '210px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  background: isSelected ? 'var(--bg-glass-hover)' : 'var(--bg-glass)',
                  backdropFilter: 'blur(16px)',
                  border: isSelected ? `2px solid ${node.color}` : '1px solid var(--border-color)',
                  boxShadow: isSelected ? `0 0 20px ${node.color}55` : 'var(--card-shadow)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      backgroundColor: `${node.color}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} color={node.color} />
                  </div>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: isRunning ? '#34d399' : '#fbbf24',
                      boxShadow: isRunning ? '0 0 8px #34d399' : 'none',
                    }}
                  />
                </div>

                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>{node.title}</h4>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>{node.rate}</p>
              </div>
            );
          })}
        </div>

        {/* Node Inspector & Live Console */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Selected Node Details */}
          {selectedNode && (
            <div className="glass-panel" style={{ padding: '20px', border: '1px solid var(--border-glow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>
                    {selectedNode.type.toUpperCase()} NODE
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginTop: '4px' }}>{selectedNode.title}</h3>
                </div>
                <button
                  onClick={() => handleDeleteNode(selectedNode.id)}
                  style={{
                    background: 'rgba(244, 63, 94, 0.1)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    color: '#f43f5e',
                    padding: '6px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                  title="Remove Node"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(10, 12, 22, 0.4)', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                  <span style={{ fontWeight: '600', color: '#34d399' }}>● Operational</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(10, 12, 22, 0.4)', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Telemetry Metric:</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{selectedNode.rate}</span>
                </div>
              </div>
            </div>
          )}

          {/* Live Telemetry Log Stream */}
          <div className="glass-panel" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Terminal size={16} color="var(--accent-primary)" />
              <h4 style={{ fontSize: '0.88rem', fontWeight: '700' }}>Telemetry Console Stream</h4>
            </div>

            <div
              style={{
                flex: 1,
                maxHeight: '220px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.74rem',
              }}
            >
              {logs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: log.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(10, 12, 22, 0.6)',
                    borderLeft: `3px solid ${log.type === 'success' ? '#34d399' : 'var(--accent-primary)'}`,
                  }}
                >
                  <span style={{ color: 'var(--text-muted)', marginRight: '8px' }}>[{log.time}]</span>
                  <span>{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
