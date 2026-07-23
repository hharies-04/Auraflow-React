import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Tag, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  Trash2, 
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const INITIAL_TASKS = [
  { id: 1, title: 'Deploy WebGL Flow Node Shader', category: 'Architecture', priority: 'Critical', completed: true },
  { id: 2, title: 'Optimize Vector Search Latency (<1ms)', category: 'AI/ML', priority: 'High', completed: false },
  { id: 3, title: 'Implement Responsive Glassmorphic Theme Tokens', category: 'Design', priority: 'High', completed: true },
  { id: 4, title: 'Connect Realtime WebSocket Telemetry Adapter', category: 'Data', priority: 'Medium', completed: false },
  { id: 5, title: 'Audit Authentication Token Expiry Handlers', category: 'Architecture', priority: 'Low', completed: false },
];

export default function TaskFlow() {
  const { addToast } = useAuth();
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filterCategory, setFilterCategory] = useState('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Architecture');
  const [newTaskPriority, setNewTaskPriority] = useState('High');

  const categories = ['All', 'Architecture', 'AI/ML', 'Data', 'Design'];

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
            });
            addToast(`Task completed: "${t.title}"`, 'success');
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    addToast('New task added to matrix!', 'success');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    addToast('Task removed.', 'info');
  };

  const filteredTasks = tasks.filter(
    (t) => filterCategory === 'All' || t.category === filterCategory
  );

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100) || 0;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Progress Card */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Task Matrix & Milestones</h2>
            <span className="badge badge-accent">{progressPercent}% Completed</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Track and complete system implementation milestones
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '220px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Progress:</span>
            <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>{completedCount} / {tasks.length} Done</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'var(--accent-gradient)',
                borderRadius: '4px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* Add Task Form & Filters */}
      <div className="glass-panel" style={{ padding: '18px' }}>
        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Add a new milestone or flow task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="input-field"
            style={{ flex: 1, minWidth: '220px' }}
          />
          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value)}
            className="input-field"
            style={{ width: '140px' }}
          >
            {categories.filter((c) => c !== 'All').map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="input-field"
            style={{ width: '120px' }}
          >
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit" className="btn-primary">
            <Plus size={16} /> Add Task
          </button>
        </form>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                background: filterCategory === cat ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
                color: filterCategory === cat ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="glass-panel"
            style={{
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: task.completed ? 0.65 : 1,
              borderLeft: `4px solid ${
                task.priority === 'Critical' ? '#f43f5e' : task.priority === 'High' ? '#fb923c' : '#38bdf8'
              }`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                onClick={() => toggleTask(task.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
              >
                {task.completed ? (
                  <CheckCircle2 size={22} color="#34d399" />
                ) : (
                  <Circle size={22} color="var(--text-muted)" />
                )}
              </button>
              <div>
                <h4
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.title}
                </h4>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{task.category}</span>
                  <span style={{ fontSize: '0.65rem' }} className="badge badge-accent">{task.priority}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
