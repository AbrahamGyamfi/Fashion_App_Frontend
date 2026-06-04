import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './AuditLogs.css';

/* ─────────── constants ─────────── */
const PAGE_SIZES = [10, 25, 50];

const ACTION_LABELS = {
  LOGIN_SUCCESS:      { label: 'Login',            color: 'green' },
  LOGIN_FAILED:       { label: 'Login Failed',      color: 'red'   },
  LOGOUT:             { label: 'Logout',            color: 'grey'  },
  USER_CREATED:       { label: 'User Created',      color: 'blue'  },
  USER_UPDATED:       { label: 'User Updated',      color: 'blue'  },
  USER_DELETED:       { label: 'User Deleted',      color: 'red'   },
  PRODUCT_CREATED:    { label: 'Product Created',   color: 'teal'  },
  PRODUCT_UPDATED:    { label: 'Product Updated',   color: 'teal'  },
  PRODUCT_DELETED:    { label: 'Product Deleted',   color: 'red'   },
  DESIGNER_APPROVED:  { label: 'Designer Approved', color: 'green' },
  DESIGNER_REJECTED:  { label: 'Designer Rejected', color: 'red'   },
  ROLE_ASSIGNED:      { label: 'Role Assigned',     color: 'purple'},
  PERMISSION_CHANGED: { label: 'Permission Changed',color: 'purple'},
  EXPORT_DATA:        { label: 'Data Exported',     color: 'amber' },
  ORDER_UPDATED:      { label: 'Order Updated',     color: 'teal'  },
};

const ROLE_LABELS = {
  super_admin: { label: 'Super Admin', color: 'purple' },
  hr_admin:    { label: 'HR Admin',    color: 'blue'   },
  vendor:      { label: 'Vendor',      color: 'teal'   },
  buyer:       { label: 'Buyer',       color: 'grey'   },
  guest:       { label: 'Guest',       color: 'red'    },
};

/* ─────────── helpers ─────────── */
function fmt(ts) {
  const d = new Date(ts);
  return d.toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function ActionBadge({ action }) {
  const meta = ACTION_LABELS[action] || { label: action, color: 'grey' };
  return <span className={`al-badge al-badge--${meta.color}`}>{meta.label}</span>;
}

function RoleBadge({ role }) {
  const meta = ROLE_LABELS[role] || { label: role, color: 'grey' };
  return <span className={`al-role al-role--${meta.color}`}>{meta.label}</span>;
}

function StateCell({ data }) {
  const [open, setOpen] = useState(false);
  if (!data) return <span className="al-null">—</span>;
  const preview = JSON.stringify(data).slice(0, 28);
  return (
    <span className="al-state">
      <button className="al-state-btn" onClick={() => setOpen(o => !o)}>
        {open ? '▾' : '▸'} {preview}{preview.length === 28 ? '…' : ''}
      </button>
      {open && (
        <pre className="al-state-json">{JSON.stringify(data, null, 2)}</pre>
      )}
    </span>
  );
}

/* ─────────── icons ─────────── */
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const RefreshIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════ */
function AuditLogs({ user }) {
  const isSuperAdmin = user?.email === 'gyamfiabraham95@gmail.com' || user?.role === 'super_admin';
  const isHRAdmin    = user?.user_type === 'hr_admin';

  const [logs,       setLogs]       = useState([]);
  const [total,      setTotal]      = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  /* filters */
  const [page,      setPage]      = useState(1);
  const [pageSize,  setPageSize]  = useState(25);
  const [search,    setSearch]    = useState('');
  const [action,    setAction]    = useState('');
  const [actor,     setActor]     = useState('');
  const [building,  setBuilding]  = useState('');
  const [dateFrom,  setDateFrom]  = useState('');
  const [dateTo,    setDateTo]    = useState('');

  const [actions,   setActions]   = useState([]);
  const [buildings, setBuildings] = useState([]);

  const [expanded, setExpanded] = useState(null);

  /* load filter options once */
  useEffect(() => {
    axios.get('/api/audit-logs/actions').then(r  => setActions(r.data)).catch(() => {});
    axios.get('/api/audit-logs/buildings').then(r => setBuildings(r.data)).catch(() => {});
  }, []);

  const fetchLogs = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const params = {
        page, pageSize, search, action, actor,
        building: isHRAdmin ? (user?.building || building) : building,
        dateFrom, dateTo,
        role: isSuperAdmin ? 'super_admin' : isHRAdmin ? 'hr_admin' : 'viewer',
      };
      const r = await axios.get('/api/audit-logs', { params });
      setLogs(r.data.logs);
      setTotal(r.data.total);
      setTotalPages(r.data.totalPages);
    } catch (e) {
      setError('Failed to load audit logs.');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, action, actor, building, dateFrom, dateTo, isSuperAdmin, isHRAdmin, user]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  /* reset to page 1 when filters change */
  useEffect(() => { setPage(1); }, [search, action, actor, building, dateFrom, dateTo, pageSize]);

  const handleExport = async () => {
    try {
      const r = await axios.get('/api/audit-logs/export', {
        params: { role: 'super_admin' },
        responseType: 'blob',
      });
      const url = URL.createObjectURL(r.data);
      const a = document.createElement('a');
      a.href = url; a.download = `audit-logs-${Date.now()}.csv`; a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Export failed.');
    }
  };

  const clearFilters = () => {
    setSearch(''); setAction(''); setActor('');
    setBuilding(''); setDateFrom(''); setDateTo('');
  };

  const hasFilters = search || action || actor || building || dateFrom || dateTo;

  const failedLoginCount = logs.filter(l => l.action === 'LOGIN_FAILED').length;

  return (
    <div className="al-page">
      {/* ── Header ── */}
      <div className="al-header">
        <div className="al-header-left">
          <div className="al-header-icon"><ShieldIcon /></div>
          <div>
            <h1 className="al-title">Audit Logs</h1>
            <p className="al-subtitle">
              {isSuperAdmin ? 'All locations · Immutable record of every access event'
                           : `${user?.building || 'Your location'} · Scoped to your location`}
            </p>
          </div>
        </div>
        <div className="al-header-right">
          {failedLoginCount > 0 && (
            <div className="al-alert-chip">
              <span className="al-alert-dot" />
              {failedLoginCount} failed login{failedLoginCount > 1 ? 's' : ''} on this page
            </div>
          )}
          <button className="al-btn al-btn--ghost" onClick={fetchLogs} title="Refresh">
            <RefreshIcon /> Refresh
          </button>
          {isSuperAdmin && (
            <button className="al-btn al-btn--primary" onClick={handleExport}>
              <DownloadIcon /> Export CSV
            </button>
          )}
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="al-filters">
        <div className="al-filter-row">
          <div className="al-search-wrap">
            <SearchIcon />
            <input
              className="al-search"
              type="text"
              placeholder="Search actor, entity, ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="al-clear-x" onClick={() => setSearch('')}>×</button>}
          </div>

          <div className="al-filter-group">
            <FilterIcon />
            <select className="al-select" value={action} onChange={e => setAction(e.target.value)}>
              <option value="">All Actions</option>
              {actions.map(a => (
                <option key={a} value={a}>{ACTION_LABELS[a]?.label || a}</option>
              ))}
            </select>
          </div>

          <input
            className="al-input"
            type="text"
            placeholder="Filter by employee…"
            value={actor}
            onChange={e => setActor(e.target.value)}
          />

          {isSuperAdmin && (
            <select className="al-select" value={building} onChange={e => setBuilding(e.target.value)}>
              <option value="">All Buildings</option>
              {buildings.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          )}
        </div>

        <div className="al-filter-row al-filter-row--secondary">
          <label className="al-date-label">From</label>
          <input type="date" className="al-input al-date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          <label className="al-date-label">To</label>
          <input type="date" className="al-input al-date" value={dateTo}   onChange={e => setDateTo(e.target.value)} />

          {hasFilters && (
            <button className="al-btn al-btn--ghost al-clear-btn" onClick={clearFilters}>
              Clear filters ×
            </button>
          )}

          <div className="al-pagination-info">
            {!loading && `${total.toLocaleString()} event${total !== 1 ? 's' : ''}`}
          </div>

          <div className="al-page-size">
            <span>Show</span>
            {PAGE_SIZES.map(s => (
              <button
                key={s}
                className={`al-ps-btn ${pageSize === s ? 'active' : ''}`}
                onClick={() => setPageSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="al-table-wrap">
        {error && <div className="al-error">{error}</div>}

        <table className="al-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Actor</th>
              <th>Role</th>
              <th>Action</th>
              <th>Entity</th>
              <th>ID</th>
              <th>Building</th>
              <th>Prev State</th>
              <th>New State</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="al-skeleton-row">
                  {Array.from({ length: 10 }).map((_, j) => (
                    <td key={j}><div className="al-skel shimmer" /></td>
                  ))}
                </tr>
              ))
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={10} className="al-empty">
                  No audit events match your filters
                </td>
              </tr>
            ) : (
              logs.map(log => {
                const isFailedLogin = log.action === 'LOGIN_FAILED';
                const isExpanded    = expanded === log.id;
                return (
                  <tr
                    key={log.id}
                    className={`al-row ${isFailedLogin ? 'al-row--failed' : ''} ${isExpanded ? 'al-row--expanded' : ''}`}
                    onClick={() => setExpanded(isExpanded ? null : log.id)}
                    title={isFailedLogin ? 'Failed login attempt' : undefined}
                  >
                    <td className="al-cell--ts">
                      <span className="al-ts-full">{fmt(log.timestamp)}</span>
                      <span className="al-ts-ago">{timeAgo(log.timestamp)}</span>
                    </td>
                    <td className="al-cell--actor">
                      <span className="al-actor-name">{log.actor_name || '—'}</span>
                      <span className="al-actor-email">{log.actor_email}</span>
                    </td>
                    <td><RoleBadge role={log.actor_role} /></td>
                    <td>
                      <div className="al-action-cell">
                        {isFailedLogin && <span className="al-warn-dot" title="Failed login" />}
                        <ActionBadge action={log.action} />
                      </div>
                    </td>
                    <td className="al-entity-type">{log.entity_type || '—'}</td>
                    <td className="al-entity-id">{log.entity_id || '—'}</td>
                    <td className="al-building">{log.building || '—'}</td>
                    <td><StateCell data={log.previous_state} /></td>
                    <td><StateCell data={log.new_state} /></td>
                    <td className="al-ip">{log.ip_address || '—'}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      {!loading && totalPages > 1 && (
        <div className="al-pagination">
          <button className="al-pg-btn" disabled={page <= 1} onClick={() => setPage(1)}>«</button>
          <button className="al-pg-btn" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>

          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            const p = totalPages <= 7 ? i + 1
              : page <= 4 ? i + 1
              : page >= totalPages - 3 ? totalPages - 6 + i
              : page - 3 + i;
            return (
              <button
                key={p}
                className={`al-pg-btn ${page === p ? 'active' : ''}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            );
          })}

          <button className="al-pg-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          <button className="al-pg-btn" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>

          <span className="al-pg-info">
            Page {page} of {totalPages} · {total.toLocaleString()} events
          </span>
        </div>
      )}

      {/* ── Immutability notice ── */}
      <div className="al-immutable-notice">
        <ShieldIcon />
        Audit logs are immutable — no record can be modified or deleted.
        {isSuperAdmin ? ' Export available to Super Admin only.' : ' You see events for your location only.'}
      </div>
    </div>
  );
}

export default AuditLogs;
