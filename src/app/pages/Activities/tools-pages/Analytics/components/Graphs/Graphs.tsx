import { useContext } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../../context/AppContext'
import LineGraph from './LineGraph';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Graphs() {
  const { darkMode } = useContext(context) as Context;
  return (
    <div className={`${s.graphs} ${darkMode && s.dark}`}>
      <LineGraph />
    </div>
  )
}

export default Graphs