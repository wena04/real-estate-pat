import { FiMapPin } from 'react-icons/fi';

export default function ProjectCard({ project }) {
  const { displayName, program, city, neighborhood, status, units, image } = project;

  return (
    <div className="project-card h-100">
      <div className="project-card-img-wrap">
        {image ? (
          <img src={image} alt={displayName} loading="lazy" />
        ) : (
          <div className="img-placeholder">
            <FiMapPin />
          </div>
        )}
        <div className="project-card-overlay">
          {displayName} &mdash; {program} in {city}
        </div>
      </div>
      <div className="project-card-body">
        <span className="project-card-badge">{program}</span>
        <h6 className="fw-bold mb-1" style={{ color: 'var(--brand-navy)' }}>
          {displayName}
        </h6>
        <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>
          <FiMapPin size={12} className="me-1" />
          {neighborhood}, {city}
        </p>
        <p className="text-muted" style={{ fontSize: '0.82rem' }}>
          {units} unit{units !== 1 ? 's' : ''} &bull;{' '}
          <span
            className="fw-semibold"
            style={{ color: status === 'Completed' ? '#198754' : '#0a2342' }}
          >
            {status}
          </span>
        </p>
      </div>
    </div>
  );
}
