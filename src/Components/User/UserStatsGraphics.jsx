import React from 'react'
import styles from './UserStatsGraphs.module.css';
import {VictoryPie, VictoryChart, VictoryBar} from 'victory';

const UserStatsGraphics = ({data}) => {

    const [graph, setGraph] = React.useState([]);
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        const graphData = data.map((item) => {
            return {
                x: item.title,
                y: Number(item.acessos)
            }
        })

        setTotal(data.map(({acessos}) => Number(acessos)).reduce((a,b) => a+b, 0));
        setGraph(graphData);
    }, [data])

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie data={graph} innerRadius={50} padding={{top: 20, bottom: 20, left: 80, right: 80}} style={{data: {fillOpacity: .9, stroke: '#fff', strokeWidth: 2}, labels: {fontSize: 14, fill: '#333'}}}/>
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
            <VictoryBar alignment='start' data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  )
}

export default UserStatsGraphics
