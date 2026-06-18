import { createClient } from '@/utils/supabase/server';

const PASTELS = ['#CDE8EF', '#D2E0CA', '#F2D888', '#E8C4C0'];
const PASTEL_TEXT = ['#1A5060', '#2A4A2A', '#6A5210', '#7A3A34'];

function age(birthday: string | null) {
  if (!birthday) return null;
  const diff = Date.now() - new Date(birthday).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('parent_id', user!.id)
    .order('created_at', { ascending: true });

  const empty = !profiles || profiles.length === 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Your kids&apos; profiles</h1>
          <p className="dashboard-sub">Each profile generates a shareable gift page for guests.</p>
        </div>
        <a href="/dashboard/new" className="dashboard-add-btn">+ Add a profile</a>
      </div>

      {empty ? (
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">🎁</div>
          <h2>No profiles yet</h2>
          <p>Create your first profile and we&apos;ll curate gift ideas based on what your kid loves.</p>
          <a href="/dashboard/new" className="dashboard-add-btn">Create first profile</a>
        </div>
      ) : (
        <div className="profile-grid">
          {profiles.map((profile, i) => {
            const idx = i % PASTELS.length;
            const kidAge = age(profile.birthday);
            return (
              <div key={profile.id} className="profile-card">
                <div className="profile-card-swatch" style={{ background: PASTELS[idx] }}>
                  <span className="profile-card-initial" style={{ color: PASTEL_TEXT[idx] }}>
                    {profile.name[0].toUpperCase()}
                  </span>
                </div>
                <div className="profile-card-body">
                  <div className="profile-card-name">{profile.name}</div>
                  {kidAge !== null && (
                    <div className="profile-card-age">{kidAge} year{kidAge !== 1 ? 's' : ''} old</div>
                  )}
                  <div className="profile-card-actions">
                    <a href={`/dashboard/${profile.id}`} className="profile-card-btn-primary">Manage</a>
                    <a href={`/p/${profile.slug}`} className="profile-card-btn-secondary" target="_blank" rel="noopener noreferrer">Share link ↗</a>
                  </div>
                </div>
              </div>
            );
          })}
          <a href="/dashboard/new" className="profile-card profile-card-add">
            <span className="profile-card-add-icon">+</span>
            <span>Add a profile</span>
          </a>
        </div>
      )}
    </div>
  );
}
