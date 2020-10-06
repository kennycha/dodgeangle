import React from 'react';
import { useSelector } from 'react-redux';
import AllyAnalysis from '../../components/main/AllyAnalysis';

const AllyAnalysisContainer = () => {
  const { teamMates } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
  }));
  const teamMatesNotMe = teamMates
    ? teamMates.filter((teamMate) => !teamMate.me)
    : null;

  return <AllyAnalysis teamMatesNotMe={teamMatesNotMe} />;
};

export default AllyAnalysisContainer;
