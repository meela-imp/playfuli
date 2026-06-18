'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const INTEREST_TYPES = ['loves', 'has', 'wants', 'skip'] as const;
type InterestType = typeof INTEREST_TYPES[number];

const TYPE_LABELS: Record<InterestType, string> = {
  loves: '❤️ Loves',
  has: '✅ Already has',
  wants: '🌟 Wants',
  skip: '🚫 Please skip',
};

const TYPE_COLORS: Record<InterestType, { bg: string; text: string }> = {
  loves: { bg: '#E8C4C0', text: '#7A3A34' },
  has:   { bg: '#D2E0CA', text: '#2A4A2A' },
  wants: { bg: '#CDE8EF', text: '#1A5060' },
  skip:  { bg: '#F2D888', text: '#6A5210' },
};

function slugify(name: string) {
  const base = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base}-${suffix}`;
}

export default function NewProfilePage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [interests, setInterests] = useState<{ label: string; type: InterestType }[]>([]);
  const [input, setInput] = useState('');
  const [activeType, setActiveType] = useState<InterestType>('loves');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState<{ slug: string; name: string } | null>(null);

  function addInterest() {
    const label = input.trim();
    if (!label) return;
    setInterests(prev => [...prev, { label, type: activeType }]);
    setInput('');
  }

  function removeInterest(i: number) {
    setInterests(prev => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError('Not logged in.'); setLoading(false); return; }

    const slug = slugify(name);

    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .insert({ parent_id: user.id, name, birthday: birthday || null, slug })
      .select()
      .single();

    if (profileErr || !profile) { setError(profileErr?.message ?? 'Something went wrong.'); setLoading(false); return; }

    if (interests.length > 0) {
      await supabase.from('interests').insert(
        interests.map(i => ({ profile_id: profile.id, label: i.label, type: i.type }))
      );
    }

    setLoading(false);
    setDone({ slug: profile.slug, name: profile.name });
  }

  if (done) {
    return (
      <div className="new-profile-page">
        <div className="auth-card" style={{ maxWidth: 480 }}>
          <div style={{ fontSize: 56 }}>🎉</div>
          <h1 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 28, fontWeight: 600, color: '#084B6D', textAlign: 'center' }}>
            {done.name}&apos;s profile is ready!
          </h1>
          <p style={{ color: '#555', textAlign: 'center', fontSize: 15 }}>
            Share this link with guests so they can browse gift ideas.
          </p>
          <div className="done-slug-box">
            <span>playfuli.com/p/{done.slug}</span>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, width: '100%' }}>
            <a href="/dashboard" className="auth-btn" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>Back to dashboard</a>
            <a href={`/p/${done.slug}`} className="auth-btn" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', background: '#B0BDDF', color: '#084B6D' }} target="_blank" rel="noopener noreferrer">Preview ↗</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="new-profile-page">
      <div className="new-profile-card">
        <div className="new-profile-steps">
          <div className={`nps-step ${step >= 1 ? 'active' : ''}`}>1. Info</div>
          <div className="nps-line" />
          <div className={`nps-step ${step >= 2 ? 'active' : ''}`}>2. Interests</div>
        </div>

        {step === 1 && (
          <>
            <h1>Who&apos;s the birthday kid?</h1>
            <p className="new-profile-sub">This creates their gift profile. You can always edit it later.</p>
            <div className="auth-form" style={{ marginTop: 16 }}>
              <div className="auth-field">
                <label htmlFor="child-name">Child&apos;s first name</label>
                <input
                  id="child-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Mia"
                  autoFocus
                />
              </div>
              <div className="auth-field">
                <label htmlFor="birthday">Birthday <span style={{ fontWeight: 400, color: '#999' }}>(optional)</span></label>
                <input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={e => setBirthday(e.target.value)}
                />
              </div>
              <button
                className="auth-btn"
                disabled={!name.trim()}
                onClick={() => setStep(2)}
              >
                Next →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1>What does {name} love?</h1>
            <p className="new-profile-sub">Add things they love, already have, want, or what guests should skip. We&apos;ll use this to curate gift ideas.</p>

            <div className="interest-type-tabs">
              {INTEREST_TYPES.map(t => (
                <button
                  key={t}
                  className={`interest-tab ${activeType === t ? 'active' : ''}`}
                  style={activeType === t ? { background: TYPE_COLORS[t].bg, color: TYPE_COLORS[t].text } : {}}
                  onClick={() => setActiveType(t)}
                >
                  {TYPE_LABELS[t]}
                </button>
              ))}
            </div>

            <div className="interest-input-row">
              <input
                type="text"
                className="interest-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={`Add something ${name} ${activeType === 'has' ? 'already has' : activeType === 'skip' ? 'to skip' : activeType}…`}
                onKeyDown={e => e.key === 'Enter' && addInterest()}
              />
              <button className="interest-add-btn" onClick={addInterest}>Add</button>
            </div>

            <div className="interest-chips">
              {interests.map((item, i) => (
                <span
                  key={i}
                  className="interest-chip"
                  style={{ background: TYPE_COLORS[item.type].bg, color: TYPE_COLORS[item.type].text }}
                >
                  {item.label}
                  <button className="interest-chip-remove" onClick={() => removeInterest(i)}>×</button>
                </span>
              ))}
            </div>

            {error && <p className="auth-error">{error}</p>}

            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button className="auth-btn" style={{ background: '#B0BDDF', color: '#084B6D', flex: 1 }} onClick={() => setStep(1)}>← Back</button>
              <button className="auth-btn" style={{ flex: 2 }} disabled={loading} onClick={handleSave}>
                {loading ? 'Saving…' : interests.length === 0 ? 'Skip & create profile' : 'Create profile'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
