import React, { useEffect } from 'react';
import AllyList from '../../components/main/AllyList';
import { useSelector, useDispatch } from 'react-redux';
import { setMostChampions } from '../../modules/teamMates'

const AllyListContainer = () => {
  const dispatch = useDispatch();

  const { teamMates } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
  }));
  useEffect(() => {
    // 아래는 임시코드, 실제론 API 요청해서 받기
    const mostChampionsArray = [
      { id:0, champions: [{id:111, name: "카밀",     img: "Camille.png", winRate: 70}, {id:111, name: "아트록스", img: "Aatrox.png", winRate: 80}, {id:111, name: "아무무", img: "Amumu.png",   winRate: 90}], winRates: [45, 25, 35] },
      { id:1, champions: [{id:111, name: "티모",     img: "Teemo.png",   winRate: 11}, {id:111, name: "애쉬",     img: "Ashe.png",   winRate: 22}, {id:111, name: "카밀",   img: "Camille.png", winRate: 33}], winRates: [45, 25, 35] },
      { id:2, champions: [{id:111, name: "아지르",   img: "Azir.png",    winRate: 44}, {id:111, name: "티모",     img: "Teemo.png",  winRate: 55}, {id:111, name: "애쉬",   img: "Ashe.png",    winRate: 66}], winRates: [70, 27, 37] },
      { id:3, champions: [{id:111, name: "애쉬",     img: "Ashe.png",    winRate: 77}, {id:111, name: "아지르",   img: "Azir.png",   winRate: 88}, {id:111, name: "티모",   img: "Teemo.png",   winRate: 99}], winRates: [91, 29, 93] },
      { id:4, champions: [{id:111, name: "아트록스", img: "Aatrox.png",  winRate: 12}, {id:111, name: "아무무",   img: "Amumu.png",  winRate: 23}, {id:111, name: "티모",   img: "Teemo.png",   winRate: 34}], winRates: [55, 44, 33] },
    ]
    mostChampionsArray.map(arr => {
      dispatch(setMostChampions({
        id: arr.id,
        champions: arr.champions,
        // 기존 샘플 코드
        // champions: [0,1,2].map(idx =>
        //   [arr.champions[idx], arr.winRates[idx]]
        // )
      }))
    })
  }, [])
  return <AllyList teamMates={teamMates} />;
};

export default AllyListContainer;
