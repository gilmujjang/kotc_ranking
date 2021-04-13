import React from 'react'
import { Line } from 'react-chartjs-2'

const UserChart = () => {
    return (
        <Line
            data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            }}
            // height={300}
            // width={400}
            options={{ maintainAspectRatio: false }}
        />
    )
}

export default UserChart