import Main from '../../pages/main/main';

const Settings = {
  cardsCount: 5
} as const;

export default function App(): JSX.Element {
  return (<Main cardsCount={Settings.cardsCount}/>);
}
