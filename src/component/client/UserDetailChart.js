import React from 'react'
import { Line } from 'react-chartjs-2'

const UserDetailChart = ({ chartMode, period, userMatch, userDetailTarget }) => {
    // userMatch에서 rating 가져오기
    function getRating(STD_Date) {
        const wanted = userMatch.find(el => el.date - STD_Date <= 0) ? userMatch.find(el => el.date - STD_Date <= 0) : userDetailTarget.start_rating
        
        if(typeof wanted === 'number' || typeof wanted === 'string') {
            return Number(wanted)
        } else if(wanted.winners.includes(userDetailTarget.name)) {
            return wanted.winnerRatingAfter[wanted.winners.indexOf(userDetailTarget.name)]
        } else if(wanted.losers.includes(userDetailTarget.name)) {
            return wanted.loserRatingAfter[wanted.losers.indexOf(userDetailTarget.name)]
        }
    }

    // 랭킹은 게임기록에서 가져 올 수 없음
    // 랭킹은 게임기록에서 가져 올 수 없음
    // 랭킹은 게임기록에서 가져 올 수 없음
    // function getRanking(STD_Date) {
    //     return 1
    // }

    function getDate(STD_Date) {
        let year = STD_Date.getFullYear()
        let month = STD_Date.getMonth() + 1
        let day = STD_Date.getDate()

        month = month >= 10 ? month : `0${month}`
        day = day >= 10 ? day : `0${day}`

        return `${year}${month}${day}`
    }

    // 1월달에만 년도 출력하도록 변경하기
    // 1월달에만 년도 출력하도록 변경하기
    // 1월달에만 년도 출력하도록 변경하기
    function getNewDateForm(STD_Date) {
        return `${STD_Date.slice(4, 6)}월 ${STD_Date.slice(6)}일`
    }
    
    function getToday() {
        const date = new Date()

        return getDate(date)
    }

    function lastDays(day) {
        const date = new Date()
        const dayOfDate = date.getDate()

        date.setDate(dayOfDate - day)

        return getDate(date)
    }

    // period에 따라 labels array 생성
    const getDataLabels = (period) => {
        let dataLabels = []

        for(let i = 0; i < period; i++) {
            dataLabels.push(getNewDateForm(lastDays(period - i)))
        }
        dataLabels.push(getNewDateForm(getToday()))

        return dataLabels
    }

    // period에 따라 datas 생성
    const getDatas = (period) => {
        let datas = []

        for(let i = 0; i < period; i ++) {
            datas.push(getRating(lastDays(period - i)))
        }
        datas.push(getRating(getToday()))

        return datas
    }

    const dataLabels = () => {
        switch(period) {
            case '10':
                return getDataLabels(period)
            case '30':
                return getDataLabels(period)
            case '60':
                return getDataLabels(period)
            default:
                break;
        }
    }

    const datas = () => {
        if(chartMode === 'rating') {
            switch(period) {
                case '10':
                    return getDatas(period)
                case '30':
                    return getDatas(period)
                case '60':
                    return getDatas(period)
                default:
                    break;
            }
        } else {
            switch(period) {
                case '10':
                case '30':
                case '60':
                default:
                    break;
            }
        }
    }
    
    return (
        <Line
            data={{
                labels: dataLabels(),
                datasets: [{
                    label: 'Rating',
                    data: datas(),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }}
            options={{ maintainAspectRatio: false }}
        />
    )
}

export default UserDetailChart