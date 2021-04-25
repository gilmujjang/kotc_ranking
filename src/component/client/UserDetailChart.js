import React from 'react'
import { Line } from 'react-chartjs-2'

const UserDetailChart = ({ chartMode, period, userName, allUsersByTime, userKey, userMatch }) => {
    // userMatch에서 rating 가져오기
    function getRating(STD_Date) {
        // const wanted = userMatch[userMatch.length - 1] ? userMatch.find(el => el.date - STD_Date <= 0) ? userMatch.find(el => el.date - STD_Date <= 0) : userMatch[userMatch.length - 1] : 0
        const wanted = userMatch.find(el => el.date - STD_Date <= 0) ? userMatch.find(el => el.date - STD_Date <= 0) : allUsersByTime[userKey].start_rating
        
        if(typeof wanted === 'number') {
            return Number(wanted)
        } else if(wanted.winners.includes(userName)) {
            return wanted.winnerRatingAfter[wanted.winners.indexOf(userName)]
        } else if(wanted.losers.includes(userName)) {
            return wanted.loserRatingAfter[wanted.losers.indexOf(userName)]
        }
    }

    
    // 랭킹은 게임기록에서 가져 올 수 없음
    // 랭킹은 게임기록에서 가져 올 수 없음
    // 랭킹은 게임기록에서 가져 올 수 없음
    // function getRanking(STD_Date) {
    //     return 1
    // }

    function getDate(std) {
        let year = std.getFullYear()
        let month = std.getMonth() + 1
        let day = std.getDate()

        month = month >= 10 ? month : `0${month}`
        day = day >= 10 ? day : `0${day}`

        return `${year}${month}${day}`
    }

    // 1월달에만 년도 출력하도록 변경하기
    // 1월달에만 년도 출력하도록 변경하기
    // 1월달에만 년도 출력하도록 변경하기
    function getNewDateForm(std) {
        return `${std.slice(4, 6)}월 ${std.slice(6)}일`
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

    function lastWeeks(week) {
        const date = new Date()
        const dayOfDate = date.getDate()

        date.setDate(dayOfDate - week * 7)

        return getDate(date)
    }

    function lastMonths(month) {
        const date = new Date()
        const monthOfDate = date.getMonth()

        date.setMonth(monthOfDate - month)

        return getDate(date)
    }

    const dataLabels = () => {
        switch(period) {
            case 'day':
                return [
                    getNewDateForm(lastDays(5)),
                    getNewDateForm(lastDays(4)),
                    getNewDateForm(lastDays(3)),
                    getNewDateForm(lastDays(2)),
                    getNewDateForm(lastDays(1)),
                    getNewDateForm(getToday())
                ]

            case 'week':
                return [
                    getNewDateForm(lastWeeks(5)),
                    getNewDateForm(lastWeeks(4)),
                    getNewDateForm(lastWeeks(3)),
                    getNewDateForm(lastWeeks(2)),
                    getNewDateForm(lastWeeks(1)),
                    getNewDateForm(getToday())
                ]

            case 'month':
                return [
                    getNewDateForm(lastMonths(5)),
                    getNewDateForm(lastMonths(4)),
                    getNewDateForm(lastMonths(3)),
                    getNewDateForm(lastMonths(2)),
                    getNewDateForm(lastMonths(1)),
                    getNewDateForm(getToday())
                ]
            default:
                break;
        }
    }

    const datas = () => {
        if(chartMode === 'rating') {
            switch(period) {
                case 'day':
                    return [
                        getRating(lastDays(5)),
                        getRating(lastDays(4)),
                        getRating(lastDays(3)),
                        getRating(lastDays(2)),
                        getRating(lastDays(1)),
                        getRating(getToday())
                    ]
                case 'week':
                    return [
                        getRating(lastWeeks(5)),
                        getRating(lastWeeks(4)),
                        getRating(lastWeeks(3)),
                        getRating(lastWeeks(2)),
                        getRating(lastWeeks(1)),
                        getRating(getToday())
                    ]
                case 'month':
                    return [
                        getRating(lastMonths(5)),
                        getRating(lastMonths(4)),
                        getRating(lastMonths(3)),
                        getRating(lastMonths(2)),
                        getRating(lastMonths(1)),
                        getRating(getToday())
                    ]
                default:
                    break;
            }
        } else {
            switch(period) {
                case 'day':
                case 'week':
                case 'month':
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
                    label: 'My First Dataset',
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