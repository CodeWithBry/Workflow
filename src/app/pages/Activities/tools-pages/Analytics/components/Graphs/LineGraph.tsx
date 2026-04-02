import s from "./styles.module.css";
import { Line } from 'react-chartjs-2';
import TasksContainer from "./TasksContainer";
import { useContext } from "react";
import { context } from "../../../../../../context/AppContext";

function LineGraph() {
    const { weekData, darkMode } = useContext(context) as Context;
    const labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dataSet = weekData ? [...weekData?.dataSets] : [];
    const largest = dataSet ? dataSet.sort((a, b) => a - b)[6] + 5 : 0;
    const data = {
        labels,
        datasets: [
            {
                label: 'Finished Tasks',
                data: weekData?.dataSets,
                fill: true, // This makes it an area chart
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area color
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
                tension: .3, // Smooth curve
            },
        ],
    };

    return (
        <div className={`${s.lineGraph} ${darkMode && s.dark}`}>
            <div className={s.graph}>
                <Line
                    options={{
                        responsive: true,
                        scales: {
                            y: {
                                min: 0,
                                max: largest,
                                ticks: {
                                    stepSize: .5
                                }
                            }
                        },
                        maintainAspectRatio: false,
                        layout: {
                            padding: -5,
                        },
                        interaction: {
                            mode: 'index',
                            intersect: false
                        },
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    font: {
                                        size: 10
                                    }
                                }
                            },
                            tooltip: {
                                enabled: true,
                            },
                            title: {
                                display: true,
                                text: 'Weekly Productivity Graph',
                            },
                        },
                    }}
                    data={data} />
            </div>
            <div className={s.details}>
                <h3>Finished Task(s) This Week</h3>
                <div className={s.container}>
                    <TasksContainer />
                </div>
            </div>
        </div>
    )
}

export default LineGraph