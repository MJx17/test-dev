import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import InfoSection from './infosection';
import { sections } from '../data/dummypage';

const InfoSectionPage: React.FC = () => {
  const { sectionPath } = useParams<{ sectionPath: string }>();

  // Find matching section by path param
  const section = sections.find(s => s.path === sectionPath);

  if (!section) {
    return <Navigate to="*" replace />;
  }

  // Make sure your section object includes `infoData` key with the combined array
  return <InfoSection {...section} />;
};

export default InfoSectionPage;
