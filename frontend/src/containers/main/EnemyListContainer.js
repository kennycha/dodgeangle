import React from 'react';
import EnemyList from '../../components/main/EnemyList';
import { useSelector } from 'react-redux';

const EnemyListContainer = () => {
  const { enemies } = useSelector(({ enemies }) => ({
    enemies: enemies.enemies,
  }));
  return <EnemyList enemies={enemies} />;
};

export default EnemyListContainer;
