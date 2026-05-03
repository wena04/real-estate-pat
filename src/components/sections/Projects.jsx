import { Suspense, lazy, useState, useMemo } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import ProjectCard from '../ProjectCard';
import allProjects from '../../data/projects.json';

const ProjectMap = lazy(() => import('../ProjectMap'));

const PAGE_SIZE = 6;

const ALL_PROGRAMS = [...new Set(allProjects.map((p) => p.program))];

export default function Projects() {
  const [selected, setSelected] = useState([]); // active program filters
  const [page, setPage] = useState(1);

  function toggleProgram(prog) {
    setSelected((prev) =>
      prev.includes(prog) ? prev.filter((p) => p !== prog) : [...prev, prog]
    );
    setPage(1);
  }

  const filtered = useMemo(
    () =>
      selected.length === 0
        ? allProjects
        : allProjects.filter((p) => selected.includes(p.program)),
    [selected]
  );

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  return (
    <section id="projects" className="section-pad" style={{ background: '#f8f9fa' }}>
      <Container>
        {/* Heading */}
        <div className="text-center mb-5">
          <div className="gold-divider" />
          <h2 className="section-heading">Our Projects</h2>
          <p className="section-sub">
            A sample of completed and in-progress infill projects across the Puget Sound.
          </p>
        </div>

        {/* Program filters */}
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
          <Button
            size="sm"
            variant={selected.length === 0 ? 'dark' : 'outline-dark'}
            onClick={() => { setSelected([]); setPage(1); }}
          >
            All
          </Button>
          {ALL_PROGRAMS.map((prog) => (
            <Button
              key={prog}
              size="sm"
              variant={selected.includes(prog) ? 'dark' : 'outline-dark'}
              onClick={() => toggleProgram(prog)}
            >
              {prog}
              {selected.includes(prog) && (
                <Badge bg="light" text="dark" className="ms-1">✓</Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Cards grid */}
        <Row className="g-4 mb-4">
          {visible.map((project) => (
            <Col key={project.id} xs={12} sm={6} lg={4}>
              <ProjectCard project={project} />
            </Col>
          ))}
          {visible.length === 0 && (
            <Col xs={12} className="text-center text-muted py-5">
              No projects match the selected filters.
            </Col>
          )}
        </Row>

        {/* Show more */}
        {hasMore && (
          <div className="text-center mb-5">
            <Button
              variant="outline-dark"
              onClick={() => setPage((p) => p + 1)}
            >
              Show More
            </Button>
          </div>
        )}

        {/* Leaflet map – lazy loaded */}
        <Suspense fallback={<div style={{ height: 400, background: '#e9ecef', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6c757d' }}>Loading map…</div>}>
          <ProjectMap projects={filtered} />
        </Suspense>
      </Container>
    </section>
  );
}
