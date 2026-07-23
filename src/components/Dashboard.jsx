import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Server, 
  Layers, 
  ArrowUpRight,
  Clock,
  Filter
} from 'lucide-react';

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('24h');

  const stats = [
    { title: 'System Health', value: '99.98%', change: '+0.4%', icon: ShieldCheck, color: '#10b981' },
    { title: 'Flow Packet Rate', value: '42.8 K/s', change: '+12.6%', icon: Activity, color: '#6366f1' },
    { title: 'ML Inference Latency', value: '1.2 ms', change: '-18.2%', icon: Zap, color: '#ec4899' },
    { title: 'Active Flow Pipelines', value: '28 Active', change: '+4 New', icon: Layers, color: '#38bdf8' },
  ];

  const chartData = [
    { label: '00:00', val: 45 },
    { label: '04:00', val: 62 },
    { label: '08:00', val: 88 },
    { label: '12:00', val: 95 },
    { label: '16:00', val: 78 },
    { label: '20:00', val: 89 },
    { label: '24:00', val: 98 },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Telemetry & Performance Analytics</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Real-time system health & node throughput monitoring</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-tertiary)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          {['24h', '7d', '30d'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              style={{
                background: timeframe === t ? 'var(--accent-primary)' : 'transparent',
                color: timeframe === t ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Key Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel glass-panel-hover" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: `${stat.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={20} color={stat.color} />
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#34d399',
                    background: 'rgba(52, 211, 153, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                  }}
                >
                  {stat.change}
                </span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '4px' }}>{stat.value}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Interactive Bar Chart Section */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Throughput Load Distribution</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Peak event bandwidth measured across nodes ({timeframe})</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Event Volume</span>
          </div>
        </div>

        {/* SVG Gradient Bar Chart */}
        <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', padding: '0 20px' }}>
          {chartData.map((d, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{d.val}%</div>
              <div
                style={{
                  width: '100%',
                  maxWidth: '38px',
                  height: `${d.val}%`,
                  background: 'var(--accent-gradient)',
                  borderRadius: '10px 10px 4px 4px',
                  boxShadow: 'var(--glow-shadow)',
                  transition: 'height 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
