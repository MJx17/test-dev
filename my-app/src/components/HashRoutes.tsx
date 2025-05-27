import { useEffect, useState } from 'react';
import InfoSection from './infosection'; // adjust path as needed
import { sections } from '../data/dummypage';

const HashBasedPage = () => {
  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#\//, ''); // strips '#/' from '#/personal'
      const found = sections.find((s) => s.path === hash);
      setActiveSection(found || sections[0]);
    };

    onHashChange(); // run on load
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return <InfoSection {...activeSection} />;
};

export default HashBasedPage;
